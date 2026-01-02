
// --- AI Excel Analysis Logic ---

function generateExcelAIAnalysis(workbook, typesFound) {
    const analysis = {
        summary: [],
        critical_alerts: [],
        stats: {}
    };

    typesFound.forEach(type => {
        // Find the sheet that matches the type (simplification: find first matching sheet again or use cached data)
        // For performance, we'll re-scan quickly or just use the logic we know works.
        // Better: We should have stored the parsed data in the previous step, but for now we re-parse specific sheets.
        
        workbook.SheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            
            // Re-use detect logic from admin.js if available, or simplified version
            let detected = 'unknown';
            if (typeof detectDataType === 'function') {
                 detected = detectDataType(sheetName, XLSX.utils.sheet_to_json(worksheet));
            }

            if (detected === type) {
                const data = XLSX.utils.sheet_to_json(worksheet); // Parse properly
                
                if (type === 'violations') {
                    analyzeViolationsAI(data, analysis);
                } else if (type === 'licenses') {
                    analyzeLicensesAI(data, analysis);
                } else if (type === 'employees') {
                    analyzeEmployeesAI(data, analysis);
                }
            }
        });
    });

    return analysis;
}

function analyzeViolationsAI(data, analysis) {
    let highValueCount = 0;
    let totalAmount = 0;
    const criticalKeywords = ['غلق', 'تسمم', 'صحة', 'closure', 'poison', 'health', 'critical'];
    let criticalCount = 0;

    data.forEach(row => {
        // Amount detection
        const amount = parseFloat(findInRow(row, 'amount', 'fine', 'الغرامة', 'المبلغ')) || 0;
        totalAmount += amount;
        if (amount > 5000) highValueCount++;

        // Keyword detection
        const desc = JSON.stringify(row).toLowerCase();
        if (criticalKeywords.some(k => desc.includes(k))) {
            criticalCount++;
        }
    });

    if (highValueCount > 0) {
        analysis.critical_alerts.push(`⚠️ تم اكتشاف <b>${highValueCount}</b> مخالفات ذات قيمة عالية (> 5000 ريال).`);
    }
    if (criticalCount > 0) {
        analysis.critical_alerts.push(`🚫 تم اكتشاف <b>${criticalCount}</b> مخالفات حرجة قد تؤدي للإغلاق.`);
    }
    analysis.summary.push(`📉 تم تحليل <b>${data.length}</b> مخالفة بإجمالي غرامات <b>${totalAmount.toLocaleString()}</b> ريال.`);
}

function analyzeLicensesAI(data, analysis) {
    let expiredCount = 0;
    let expiringSoonCount = 0;
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    data.forEach(row => {
        const dateStr = findInRow(row, 'expiry', 'end', 'انتهاء', 'تاريخ');
        if (dateStr) {
            // Simple date parsing (assumes YYYY-MM-DD or standard format)
            const expiryDate = new Date(dateStr);
            if (!isNaN(expiryDate)) {
                if (expiryDate < today) expiredCount++;
                else if (expiryDate < thirtyDaysFromNow) expiringSoonCount++;
            }
        }
    });

    if (expiredCount > 0) {
        analysis.critical_alerts.push(`📅 يوجد <b>${expiredCount}</b> ترخيص منتهي الصلاحية يحتاج لتجديد فوري.`);
    }
    if (expiringSoonCount > 0) {
        analysis.summary.push(`⏳ هناك <b>${expiringSoonCount}</b> ترخيص ستنتهي صلاحيتها خلال 30 يوماً.`);
    } else {
        analysis.summary.push(`✅ تم فحص <b>${data.length}</b> ترخيص.`);
    }
}

function analyzeEmployeesAI(data, analysis) {
    // Check for missing critical fields (Iqama, Name)
    let incompleteRecords = 0;
    data.forEach(row => {
        const iqama = findInRow(row, 'iqama', 'id', 'هوية');
        const name = findInRow(row, 'name', 'اسم');
        if (!iqama || !name) incompleteRecords++;
    });

    if (incompleteRecords > 0) {
        analysis.summary.push(`⚠️ تم العثور على <b>${incompleteRecords}</b> سجلات موظفين غير مكتملة البيانات.`);
    } else {
        analysis.summary.push(`👥 تم تحليل بيانات <b>${data.length}</b> موظف بنجاح.`);
    }
}

function displayExcelAIReport(analysis) {
    const container = document.getElementById('excel-ai-report');
    const content = document.getElementById('excel-ai-content');
    
    if (!container || !content) return;

    let html = '';
    
    if (analysis.critical_alerts.length > 0) {
        html += `<div style="margin-bottom: 10px; color: #f87171;">${analysis.critical_alerts.join('<br>')}</div>`;
    }
    
    if (analysis.summary.length > 0) {
        html += `<div style="color: #cbd5e1;">${analysis.summary.join('<br>')}</div>`;
    }

    if (html === '') return; // Nothing to show

    content.innerHTML = html;
    container.style.display = 'block';
    
    // Add slide down animation
    container.animate([
        { opacity: 0, transform: 'translateY(-10px)' },
        { opacity: 1, transform: 'translateY(0)' }
    ], {
        duration: 400,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });
}

// Helper to find value by multiple keys (re-used from main script concept)
// Renamed to avoid conflict with admin.js global find function if it exists
function findInRow(row, ...keys) {
    const lowerKeys = keys.map(k => k.toLowerCase());
    for (const k of Object.keys(row)) {
        if (lowerKeys.some(lk => k.toLowerCase().includes(lk))) return row[k];
    }
    return null;
}
