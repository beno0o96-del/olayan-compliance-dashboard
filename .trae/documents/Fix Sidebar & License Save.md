I have addressed both the sidebar visual issues and the license saving problem.

### 🛠️ Fixes Applied:

1.  **Sidebar "Slide" Error:**
    *   Increased sidebar width to **300px** to accommodate longer Arabic text like "التحليل الاستراتيجي (AI)".
    *   Added `white-space: nowrap` to navigation items to prevent text from being cut off or wrapping awkwardly.
    *   Ensured the "Tasks" (المهام) item and others display correctly.

2.  **License Save Error:**
    *   Updated the `saveLicense` function to be more robust and handle missing elements gracefully.
    *   Fixed the HTML structure in `admin.html` to ensure `ApexCharts` and the main scripts are loaded correctly (updated version to `v=10` to force a browser refresh).
    *   This should resolve the "I couldn't save" issue by ensuring the correct code is running.

Please **refresh the page** (Ctrl+F5) to see the changes. The sidebar should now look correct, and the Save button should work.