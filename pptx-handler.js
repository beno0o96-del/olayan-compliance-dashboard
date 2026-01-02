
// --- PPTX Processing Logic with AI Analysis ---

let uploadedPptxFiles = [];

document.addEventListener('DOMContentLoaded', () => {
    const pptxInput = document.getElementById('pptx-upload');
    if (pptxInput) {
        pptxInput.addEventListener('change', handlePptxUpload);
    }
    renderPptxFileList();
});

async function handlePptxUpload(e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const statusEl = document.getElementById('pptx-upload-status');
    statusEl.textContent = 'جاري المعالجة... (Extraction & AI Analysis)';
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
            const text = await parsePptxFile(file);
            const analysis = analyzeTextWithAI(text, file.name);
            
            uploadedPptxFiles.push({
                name: file.name,
                size: (file.size / 1024).toFixed(1) + ' KB',
                content: text,
                analysis: analysis,
                date: new Date().toLocaleString()
            });
            
            showToast(`✅ تم قراءة وتحليل الملف: ${file.name}`, 'success');
        } catch (err) {
            console.error(err);
            showToast(`❌ فشل قراءة الملف: ${file.name}`, 'error');
        }
    }

    statusEl.textContent = 'تمت العملية';
    renderPptxFileList();
    generateCombinedAiReport();
    
    // Clear input
    e.target.value = '';
}

function renderPptxFileList() {
    const container = document.getElementById('pptx-files-container');
    const list = document.getElementById('pptx-files-list');
    
    if (uploadedPptxFiles.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    list.innerHTML = uploadedPptxFiles.map((file, index) => `
        <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.2rem;">📊</span>
                <div>
                    <div style="color: #fff; font-weight: bold;">${file.name}</div>
                    <div style="color: #94a3b8; font-size: 0.8rem;">${file.size} • ${file.date}</div>
                </div>
            </div>
            <button onclick="removePptxFile(${index})" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 1.2rem;">&times;</button>
        </div>
    `).join('');
}

function removePptxFile(index) {
    uploadedPptxFiles.splice(index, 1);
    renderPptxFileList();
    generateCombinedAiReport();
}

function clearPptxData() {
    if(confirm('هل أنت متأكد من مسح جميع ملفات البوربوينت المرفوعة؟')) {
        uploadedPptxFiles = [];
        renderPptxFileList();
        document.getElementById('pptx-ai-report').style.display = 'none';
        document.getElementById('pptx-upload-status').textContent = '';
    }
}

// --- "AI" Analysis Logic (Heuristic Based) ---
function analyzeTextWithAI(text, fileName) {
    const analysis = {
        risks: [],
        deadlines: [],
        tasks: [],
        summary: ""
    };

    // 1. Detect Risks (Keywords: Risk, Delay, Issue, Late, Problem, Danger, Critical)
    const riskKeywords = ['risk', 'delay', 'issue', 'late', 'problem', 'danger', 'critical', 'مخاطرة', 'تأخير', 'مشكلة', 'خطر', 'حرج'];
    const lines = text.split('\n');
    
    lines.forEach(line => {
        const lower = line.toLowerCase();
        
        // Risks
        if (riskKeywords.some(k => lower.includes(k))) {
            if (line.length < 100) analysis.risks.push(line.trim());
        }

        // Deadlines (Simple Date Detection: YYYY-MM-DD or DD/MM/YYYY or words like Due, Deadline)
        if (lower.includes('due') || lower.includes('deadline') || lower.includes('date') || lower.includes('تاريخ') || lower.includes('موعد')) {
            // Check for date pattern
            if (/\d{4}-\d{2}-\d{2}/.test(line) || /\d{2}\/\d{2}\/\d{4}/.test(line)) {
                analysis.deadlines.push(line.trim());
            }
        }
        
        // Tasks (Keywords: Action, Task, Todo, Required, مطلوب, مهمة)
        if (lower.includes('action') || lower.includes('task') || lower.includes('todo') || lower.includes('required') || lower.includes('مطلوب') || lower.includes('مهمة')) {
            analysis.tasks.push(line.trim());
        }
    });

    // Summary Generation
    analysis.summary = `
        تم تحليل الملف <b>${fileName}</b>.<br>
        • تم العثور على <b>${analysis.risks.length}</b> مخاطر محتملة.<br>
        • تم العثور على <b>${analysis.deadlines.length}</b> تواريخ استحقاق.<br>
        • تم العثور على <b>${analysis.tasks.length}</b> مهام مطلوبة.<br>
    `;

    return analysis;
}

function generateCombinedAiReport() {
    const reportContainer = document.getElementById('pptx-ai-report');
    const contentEl = document.getElementById('pptx-ai-content');
    
    if (uploadedPptxFiles.length === 0) {
        reportContainer.style.display = 'none';
        return;
    }
    
    let combinedHtml = "";
    
    uploadedPptxFiles.forEach(file => {
        const a = file.analysis;
        combinedHtml += `
            <div style="margin-bottom: 20px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 15px;">
                <h5 style="color: #60a5fa; margin: 0 0 10px 0;">📄 ${file.name}</h5>
                <div style="margin-bottom: 10px;">${a.summary}</div>
                
                ${a.risks.length > 0 ? `<div style="color: #f87171; font-weight: bold;">⚠️ المخاطر المكتشفة:</div><ul style="margin: 5px 0 10px 20px; list-style-type: disc;">${a.risks.map(r => `<li>${r}</li>`).join('')}</ul>` : ''}
                
                ${a.deadlines.length > 0 ? `<div style="color: #fbbf24; font-weight: bold;">📅 التواريخ المهمة:</div><ul style="margin: 5px 0 10px 20px; list-style-type: disc;">${a.deadlines.map(d => `<li>${d}</li>`).join('')}</ul>` : ''}
                
                ${a.tasks.length > 0 ? `<div style="color: #34d399; font-weight: bold;">✅ المهام المقترحة:</div><ul style="margin: 5px 0 10px 20px; list-style-type: disc;">${a.tasks.map(t => `<li>${t}</li>`).join('')}</ul>` : ''}
            </div>
        `;
    });
    
    contentEl.innerHTML = combinedHtml;
    reportContainer.style.display = 'block';
}

function saveAiReportToAdmin() {
    // This function saves the AI report to localStorage so it can be viewed in the main dashboard or tasks list
    const report = uploadedPptxFiles.map(f => f.analysis);
    localStorage.setItem('admin_ai_pptx_report', JSON.stringify(report));
    showToast('💾 تم حفظ تقرير الذكاء الاصطناعي في سجلات النظام.', 'success');
}

// --- JSZip & XML Parsing Logic (Existing) ---
async function parsePptxFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const zip = new JSZip();
                const content = await zip.loadAsync(e.target.result);
                
                let fullText = "";
                
                // Find slide files
                const slideFiles = Object.keys(content.files).filter(name => name.startsWith("ppt/slides/slide") && name.endsWith(".xml"));
                
                // Sort naturally (slide1, slide2, ..., slide10)
                slideFiles.sort((a, b) => {
                    const numA = parseInt(a.match(/slide(\d+)\.xml/)[1]);
                    const numB = parseInt(b.match(/slide(\d+)\.xml/)[1]);
                    return numA - numB;
                });

                for (const slideName of slideFiles) {
                    const slideXml = await content.files[slideName].async("string");
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(slideXml, "text/xml");
                    
                    // Extract text from <a:t> tags
                    const textNodes = xmlDoc.getElementsByTagName("a:t");
                    let slideText = [];
                    for (let i = 0; i < textNodes.length; i++) {
                        slideText.push(textNodes[i].textContent);
                    }
                    
                    if (slideText.length > 0) {
                        fullText += `[Slide ${slideName.match(/slide(\d+)/)[1]}]: ${slideText.join(' ')}\n`;
                    }
                }
                
                resolve(fullText);
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = (err) => reject(err);
        reader.readAsArrayBuffer(file);
    });
}
