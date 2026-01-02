/**
 * Admin Page Diagnostic Tool
 * Helps identify and fix admin page issues
 */

// Diagnostic function to check admin page health
function diagnoseAdminPage() {
    console.log('🔍 Starting Admin Page Diagnosis...');
    
    const issues = [];
    
    // Check 1: Verify all required elements exist
    const requiredElements = [
        'login-section', 'admin-content', 'sidebar-toggle', 
        'page-title', 'logout', 'btn-control-menu'
    ];
    
    requiredElements.forEach(id => {
        const element = document.getElementById(id);
        if (!element) {
            issues.push(`❌ Missing element: ${id}`);
        } else {
            console.log(`✅ Found element: ${id}`);
        }
    });
    
    // Check 2: Verify required scripts are loaded
    const requiredScripts = ['app.js', 'admin.js'];
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    
    requiredScripts.forEach(scriptName => {
        const found = scripts.some(script => script.src.includes(scriptName));
        if (!found) {
            issues.push(`❌ Missing script: ${scriptName}`);
        } else {
            console.log(`✅ Found script: ${scriptName}`);
        }
    });
    
    // Check 3: Verify Firebase scripts
    const firebaseScripts = [
        'firebase-app-compat.js',
        'firebase-firestore-compat.js',
        'firebase-storage-compat.js',
        'firebase-auth-compat.js'
    ];
    
    firebaseScripts.forEach(scriptName => {
        const found = scripts.some(script => script.src.includes(scriptName));
        if (!found) {
            issues.push(`❌ Missing Firebase script: ${scriptName}`);
        } else {
            console.log(`✅ Found Firebase script: ${scriptName}`);
        }
    });
    
    // Check 4: Verify global functions exist
    const requiredFunctions = ['login', 'logout', 'showSection', 'toggleAdminSidebar'];
    
    requiredFunctions.forEach(funcName => {
        if (typeof window[funcName] !== 'function') {
            issues.push(`❌ Missing function: ${funcName}`);
        } else {
            console.log(`✅ Found function: ${funcName}`);
        }
    });
    
    // Check 5: Verify EnhancedLicenseManager (Removed)
    // if (typeof window.EnhancedLicenseManager === 'undefined') {
    //    issues.push('❌ EnhancedLicenseManager not loaded');
    // } else {
    //    console.log('✅ EnhancedLicenseManager found');
    // }
    
    // Check 6: Verify localStorage access
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        console.log('✅ localStorage accessible');
    } catch (error) {
        issues.push('❌ localStorage not accessible: ' + error.message);
    }
    
    // Report results
    console.log('\n📊 Diagnosis Results:');
    if (issues.length === 0) {
        console.log('✅ All checks passed! Admin page appears to be healthy.');
    } else {
        console.log('⚠️ Found ' + issues.length + ' issues:');
        issues.forEach(issue => console.log(issue));
    }
    
    return issues;
}

// Safe initialization function
function safeAdminInit() {
    try {
        console.log('🚀 Starting safe admin initialization...');
        
        // Wait for all scripts to load
        const checkInterval = setInterval(() => {
            if (document.readyState === 'complete') {
                clearInterval(checkInterval);
                
                // Run diagnosis
                const issues = diagnoseAdminPage();
                
                if (issues.length === 0) {
                    console.log('✅ Safe initialization completed successfully');
                    
                    // Try to initialize EnhancedLicenseManager (Skipped)
                    /*
                    if (window.EnhancedLicenseManager) {
                        try {
                            window.EnhancedLicenseManager.init();
                            console.log('✅ EnhancedLicenseManager initialized');
                        } catch (error) {
                            console.error('❌ Failed to initialize EnhancedLicenseManager:', error);
                        }
                    }
                    */
                    
                    // Show admin content if login section exists
                    const loginSection = document.getElementById('login-section');
                    const adminContent = document.getElementById('admin-content');
                    
                    if (loginSection && adminContent) {
                        // Check if user is already logged in
                        const currentUser = localStorage.getItem('current_admin');
                        if (currentUser) {
                            loginSection.style.display = 'none';
                            adminContent.style.display = 'flex';
                            console.log('✅ Auto-logged in from localStorage');
                        }
                    }
                    
                } else {
                    console.error('❌ Cannot initialize admin page due to issues:', issues);
                }
            }
        }, 100);
        
    } catch (error) {
        console.error('❌ Critical error during safe initialization:', error);
    }
}

// Auto-run diagnostic when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeAdminInit);
} else {
    safeAdminInit();
}

// Make diagnostic tool available globally
window.diagnoseAdminPage = diagnoseAdminPage;
window.safeAdminInit = safeAdminInit;

console.log('🔧 Admin Diagnostic Tool loaded');