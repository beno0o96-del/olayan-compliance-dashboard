
// --- AI Command Processor ---
function processAICommand() {
    const input = document.getElementById('ai-command-input');
    if (!input) return;
    const cmd = input.value.trim().toLowerCase();
    if (!cmd) return;

    // Simple NLP (Heuristic)
    if (cmd.includes('مخالفات') || cmd.includes('violations') || cmd.includes('غرامات')) {
        showSection('violations');
        showToast(getMsg('info_nav_violations'), 'info');
    } 
    else if (cmd.includes('موظف') || cmd.includes('employee') || cmd.includes('staff')) {
        showSection('employees');
        showToast(getMsg('info_nav_employees'), 'info');
    }
    else if (cmd.includes('تحليل') || cmd.includes('analysis') || cmd.includes('تقرير') || cmd.includes('report')) {
        showSection('master-upload'); // Where AI Analysis lives now
        // Scroll to analysis
        setTimeout(() => {
            const el = document.getElementById('section-analytics-inner');
            if(el) el.scrollIntoView({behavior: 'smooth'});
        }, 300);
        generateStrategicReport(); // Auto-run
    }
    else if (cmd.includes('خطة') || cmd.includes('plan') || cmd.includes('توصية')) {
        // Generate a plan
        showSection('master-upload');
        generateStrategicReport();
        setTimeout(() => {
            showToast(getMsg('success_ai_plan'), 'success');
        }, 2000);
    }
    else {
        showToast('⚠️ لم أفهم الأمر. جرب: "أظهر المخالفات"، "تحليل البيانات"، "بحث عن موظف"', 'warning');
    }

    input.value = '';
}
