# دليل تحديث بيانات JSON

تُعرض الصفحات اعتماداً على هذه الملفات:
- training_data.json
- violations_data.json
- data.json

## training_data.json
مفاتيح مطلوبة:
- categories: مصفوفة نصوص للحالات
- training.counts: كائن بعدد كل حالة
- health_cards.counts: كائن بعدد كل حالة
- ops_data: [{ name, brand, count }]
- city_stats: [{ city, count, region }]
- cost_centers: [{ branch_name, cost_center }]

## violations_data.json
مفاتيح مطلوبة:
- summary: total_violations, total_amount, open_violations, closed_violations (أرقام)
- top_branches_frequency: [{ branch, count }]
- top_branches_risk: [{ branch, amount }]
- common_types: [{ type, count, icon, branches: [{ name, count }] }]

## data.json
مفاتيح مطلوبة:
- kpis: openViolations, closedViolations (أرقام)، totalFines, healthCards (نصوص)

للتحقق السريع افتح صفحة: validator.html
