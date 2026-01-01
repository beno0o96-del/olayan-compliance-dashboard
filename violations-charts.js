/**
 * Violations Charts and Analytics
 * Enhanced with centralized data system integration
 */

// Wait for DOM and data to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait for centralized data to be available
    const checkData = setInterval(() => {
        if (window.OlayanData && window.OlayanData.violations) {
            clearInterval(checkData);
            initializeViolationsCharts();
        }
    }, 100);
});

function initializeViolationsCharts() {
    const violations = window.OlayanData.violations || [];
    
    if (violations.length === 0) {
        console.warn('No violations data available for charts');
        return;
    }

    // Process data for charts
    const chartData = processViolationsData(violations);
    
    // Render frequency chart
    renderFrequencyChart(chartData.frequency);
    
    // Render regional chart
    renderRegionalChart(chartData.regional);
    
    // Render risk chart
    renderRiskChart(chartData.risk);
    
    // Update KPI cards
    updateKPIs(chartData.summary);
    
    // Render regional comparison table
    renderRegionalComparison(chartData.regionalComparison);
}

function processViolationsData(violations) {
    const frequency = {};
    const regional = {};
    const risk = {};
    let totalAmount = 0;
    let totalCount = violations.length;
    
    violations.forEach(violation => {
        // Frequency by branch
        const branch = violation.branch || 'Unknown';
        frequency[branch] = (frequency[branch] || 0) + 1;
        
        // Regional distribution
        const region = violation.region || 'Unknown';
        regional[region] = (regional[region] || 0) + 1;
        
        // Risk by amount
        const amount = parseFloat(violation.amount) || 0;
        totalAmount += amount;
        risk[branch] = (risk[branch] || 0) + amount;
    });
    
    // Get top 15 for frequency
    const topFrequency = Object.entries(frequency)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 15)
        .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});
    
    // Get top 15 for risk (amount)
    const topRisk = Object.entries(risk)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 15)
        .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});
    
    // Regional comparison data
    const regionalComparison = Object.entries(regional).map(([region, count]) => {
        const regionAmount = violations
            .filter(v => (v.region || 'Unknown') === region)
            .reduce((sum, v) => sum + (parseFloat(v.amount) || 0), 0);
        
        // Find most common violation type for this region
        const types = {};
        violations
            .filter(v => (v.region || 'Unknown') === region)
            .forEach(v => {
                const type = v.violation || 'Unknown';
                types[type] = (types[type] || 0) + 1;
            });
        
        const mostCommonType = Object.entries(types)
            .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Unknown';
        
        // Determine risk level
        let riskLevel = 'منخفض';
        if (count > 10 || regionAmount > 50000) riskLevel = 'عالي';
        else if (count > 5 || regionAmount > 20000) riskLevel = 'متوسط';
        
        return {
            region,
            count,
            amount: regionAmount,
            riskLevel,
            mostCommonType
        };
    }).sort((a, b) => b.amount - a.amount);
    
    // Find top branches
    const topFreqBranch = Object.entries(frequency).sort(([,a], [,b]) => b - a)[0]?.[0] || 'Unknown';
    const topRiskBranch = Object.entries(risk).sort(([,a], [,b]) => b - a)[0]?.[0] || 'Unknown';
    
    return {
        frequency: topFrequency,
        regional,
        risk: topRisk,
        summary: {
            totalCount,
            totalAmount,
            topFreqBranch,
            topRiskBranch
        },
        regionalComparison
    };
}

function renderFrequencyChart(data) {
    const container = document.getElementById('chart-freq');
    if (!container) return;
    
    container.innerHTML = '';
    const maxVal = Math.max(...Object.values(data));
    
    Object.entries(data).forEach(([branch, count]) => {
        const percent = maxVal > 0 ? (count / maxVal) * 100 : 0;
        
        const bar = document.createElement('div');
        bar.className = 'bar-chart-bar';
        bar.style.cssText = `
            width: 100%;
            height: 20px;
            background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
            margin: 5px 0;
            position: relative;
            border-radius: 4px;
        `;
        
        const fill = document.createElement('div');
        fill.style.cssText = `
            width: ${percent}%;
            height: 100%;
            background: rgba(255,255,255,0.2);
            border-radius: 4px;
            position: relative;
        `;
        
        const label = document.createElement('div');
        label.style.cssText = `
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: white;
            font-size: 0.8rem;
            font-weight: bold;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        `;
        label.textContent = `${branch} (${count})`;
        
        bar.appendChild(fill);
        bar.appendChild(label);
        container.appendChild(bar);
    });
}

function renderRegionalChart(data) {
    const container = document.getElementById('chart-region');
    if (!container) return;
    
    container.innerHTML = '';
    const maxVal = Math.max(...Object.values(data));
    
    Object.entries(data).forEach(([region, count]) => {
        const percent = maxVal > 0 ? (count / maxVal) * 100 : 0;
        
        const bar = document.createElement('div');
        bar.className = 'bar-chart-bar';
        bar.style.cssText = `
            width: 100%;
            height: 25px;
            background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
            margin: 8px 0;
            position: relative;
            border-radius: 6px;
        `;
        
        const fill = document.createElement('div');
        fill.style.cssText = `
            width: ${percent}%;
            height: 100%;
            background: rgba(255,255,255,0.2);
            border-radius: 6px;
            position: relative;
        `;
        
        const label = document.createElement('div');
        label.style.cssText = `
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: white;
            font-size: 0.9rem;
            font-weight: bold;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        `;
        label.textContent = `${region} (${count})`;
        
        bar.appendChild(fill);
        bar.appendChild(label);
        container.appendChild(bar);
    });
}

function renderRiskChart(data) {
    const container = document.getElementById('chart-risk');
    if (!container) return;
    
    container.innerHTML = '';
    const maxVal = Math.max(...Object.values(data));
    
    Object.entries(data).forEach(([branch, amount]) => {
        const percent = maxVal > 0 ? (amount / maxVal) * 100 : 0;
        
        const bar = document.createElement('div');
        bar.className = 'bar-chart-bar';
        bar.style.cssText = `
            width: 100%;
            height: 22px;
            background: linear-gradient(90deg, #ff6b6b 0%, #ee5a24 100%);
            margin: 6px 0;
            position: relative;
            border-radius: 5px;
        `;
        
        const fill = document.createElement('div');
        fill.style.cssText = `
            width: ${percent}%;
            height: 100%;
            background: rgba(255,255,255,0.2);
            border-radius: 5px;
            position: relative;
        `;
        
        const label = document.createElement('div');
        label.style.cssText = `
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: white;
            font-size: 0.85rem;
            font-weight: bold;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        `;
        label.textContent = `${branch} (${amount.toLocaleString()} ريال)`;
        
        bar.appendChild(fill);
        bar.appendChild(label);
        container.appendChild(bar);
    });
}

function updateKPIs(summary) {
    // Update total violations count
    const totalElement = document.getElementById('v-total-count');
    if (totalElement) {
        totalElement.textContent = summary.totalCount.toLocaleString();
    }
    
    // Update total amount
    const amountElement = document.getElementById('v-total-amount');
    if (amountElement) {
        amountElement.textContent = summary.totalAmount.toLocaleString() + ' ريال';
    }
    
    // Update top frequency branch
    const freqElement = document.getElementById('v-top-freq-branch');
    if (freqElement) {
        freqElement.textContent = summary.topFreqBranch;
    }
    
    // Update top risk branch
    const riskElement = document.getElementById('v-top-risk-branch');
    if (riskElement) {
        riskElement.textContent = summary.topRiskBranch;
    }
}

function renderRegionalComparison(data) {
    const container = document.getElementById('region-comparison-table');
    if (!container) return;
    
    const tbody = container.querySelector('tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    data.forEach(region => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${region.region}</td>
            <td>${region.count}</td>
            <td>${region.amount.toLocaleString()} ريال</td>
            <td><span class="risk-badge risk-${region.riskLevel}">${region.riskLevel}</span></td>
            <td>${region.mostCommonType}</td>
        `;
        tbody.appendChild(row);
    });
    
    // Add some basic styling for risk badges
    if (!document.getElementById('violations-charts-styles')) {
        const style = document.createElement('style');
        style.id = 'violations-charts-styles';
        style.textContent = `
            .risk-badge {
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 0.8rem;
                font-weight: bold;
            }
            .risk-منخفض { background: rgba(76, 175, 80, 0.2); color: #4caf50; }
            .risk-متوسط { background: rgba(255, 152, 0, 0.2); color: #ff9800; }
            .risk-عالي { background: rgba(244, 67, 54, 0.2); color: #f44336; }
        `;
        document.head.appendChild(style);
    }
}

// Export functionality for violations data
window.exportViolationsData = function(format = 'json') {
    const violations = window.OlayanData?.violations || [];
    
    if (violations.length === 0) {
        alert('لا توجد بيانات مخالفات للتصدير');
        return;
    }
    
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `violations-data-${timestamp}`;
    
    if (format === 'json') {
        const dataStr = JSON.stringify(violations, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        downloadFile(dataBlob, `${filename}.json`);
    } else if (format === 'csv') {
        const csv = convertToCSV(violations);
        const csvBlob = new Blob([csv], { type: 'text/csv' });
        downloadFile(csvBlob, `${filename}.csv`);
    }
};

function convertToCSV(data) {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => {
            const value = row[header] || '';
            return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }).join(','))
    ].join('\n');
    
    return csvContent;
}

function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Add some utility functions for interactive features
window.showViolationDetails = function(violationId) {
    const violations = window.OlayanData?.violations || [];
    const violation = violations.find(v => v.id === violationId);
    
    if (!violation) {
        alert('المخالفة غير موجودة');
        return;
    }
    
    const modal = document.getElementById('violation-modal');
    if (modal) {
        const title = document.getElementById('modal-title');
        const body = document.getElementById('modal-body');
        
        if (title) title.textContent = `تفاصيل المخالفة - ${violation.branch}`;
        if (body) {
            body.innerHTML = `
                <div style="text-align: right;">
                    <p><strong>الفرع:</strong> ${violation.branch || 'غير محدد'}</p>
                    <p><strong>المنطقة:</strong> ${violation.region || 'غير محددة'}</p>
                    <p><strong>نوع المخالفة:</strong> ${violation.violation || 'غير محدد'}</p>
                    <p><strong>المبلغ:</strong> ${(violation.amount || 0).toLocaleString()} ريال</p>
                    <p><strong>التاريخ:</strong> ${violation.date || 'غير محدد'}</p>
                    <p><strong>الحالة:</strong> ${violation.status || 'غير محددة'}</p>
                </div>
            `;
        }
        
        modal.style.display = 'flex';
    }
};

console.log('Violations Charts system loaded with centralized data integration');