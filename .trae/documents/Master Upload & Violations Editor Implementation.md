I have implemented the **Master Upload** feature and the **Manual Violations Editor** as requested.

### 1. Master Data Upload (الرفع الموحد)
- Added a new section in the Admin Dashboard: **"إدارة البيانات المركزية (Master Data)"**.
- **Single Upload Button**: You can now upload one Excel file containing multiple sheets (e.g., `Employees`, `Violations`, `Licenses`).
- **Automatic Distribution**: The system detects the data type based on the sheet name (or content) and updates the respective sections automatically.
- **Region Separation**: Violations are automatically categorized into **Western**, **Riyadh**, and **Eastern** based on the data.

### 2. Manual Violations Editor (تعديل المخالفات يدوياً)
- Added a **Manual Editor Table** below the upload button.
- You can now **edit**, **delete**, or **add** violation records directly from the admin panel without needing to re-upload the Excel file.
- Changes are saved instantly and reflect on the Dashboard and Charts.

### 3. Technical Improvements
- **Data Persistence**: Raw violation data is now saved locally, allowing for editing.
- **Localization**: Updated the system to correctly display "Riyadh Region" (منطقة الرياض) in charts and tables.
- **Robust Parsing**: improved Excel parsing to handle Arabic/English headers better.

The system is now ready for you to try uploading your Master Excel file.