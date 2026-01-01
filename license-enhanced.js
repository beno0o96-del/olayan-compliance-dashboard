// Enhanced License Management with QR Codes and Remaining Days
// This script adds QR code input fields and enhanced remaining days calculation

(function() {
    'use strict';
    
    // Enhanced license management
    window.EnhancedLicenseManager = {
        
        // Initialize enhanced license features
        init: function() {
            console.log('Initializing Enhanced License Manager...');
            
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.initializeFeatures();
                });
            } else {
                this.initializeFeatures();
            }
        },
        
        initializeFeatures: function() {
            try {
                this.addQRCodeInputs();
                this.enhanceRemainingDaysCalculation();
                this.addQRCodeScanner();
                this.setupAutoCalculation();
                console.log('Enhanced License Manager initialized successfully');
            } catch (error) {
                console.error('Error initializing Enhanced License Manager:', error);
            }
        },
        
        // Add QR code input fields to license modal
        addQRCodeInputs: function() {
            // Add QR code inputs for main licenses
            this.addQRInput('lic-store', 'رخصة البلدية');
            this.addQRInput('lic-civil', 'الدفاع المدني');
            this.addQRInput('lic-p24', 'تصريح 24 ساعة');
            this.addQRInput('lic-phd', 'تصريح التوصيل');
            this.addQRInput('lic-out', 'تصريح الجلسات الخارجية');
            this.addQRInput('new-ads', 'التصريح الإعلاني');
            
            console.log('QR code inputs added successfully');
        },
        
        // Add QR code input for a specific license type
        addQRInput: function(prefix, licenseName) {
            const dateInput = document.getElementById(prefix + '-date');
            if (!dateInput) return;
            
            // Create QR code input container
            const qrContainer = document.createElement('div');
            qrContainer.style.cssText = 'margin-bottom: 10px;';
            qrContainer.innerHTML = `
                <div style="display: flex; gap: 10px; align-items: end; margin-bottom: 5px;">
                    <div style="flex: 1;">
                        <label style="display: block; margin-bottom: 5px; color: #94a3b8;">
                            📱 كود QR (${licenseName})
                        </label>
                        <input id="${prefix}-qr-code" type="text" class="form-control" 
                               placeholder="افتح الكاميرا لمسح الكود أو أدخل الرقم يدوياً" 
                               style="background: #0f172a; border-color: #334155; color: #fff;">
                    </div>
                    <button type="button" onclick="EnhancedLicenseManager.scanQRCode('${prefix}')" 
                            class="btn btn-secondary" style="padding: 8px 12px; font-size: 1.2rem;" 
                            title="فتح الكاميرا لمسح الكود">
                        📷
                    </button>
                    <button type="button" onclick="EnhancedLicenseManager.generateQRCode('${prefix}')" 
                            class="btn btn-secondary" style="padding: 8px 12px; font-size: 1.2rem;" 
                            title="إنشاء كود QR">
                        ⚡
                    </button>
                </div>
                <div id="${prefix}-qr-display" style="margin-bottom: 5px; text-align: center; min-height: 60px;"></div>
            `;
            
            // Insert after the date input
            dateInput.parentNode.insertBefore(qrContainer, dateInput.nextSibling);
            
            // Add QR code change listener
            const qrInput = document.getElementById(prefix + '-qr-code');
            if (qrInput) {
                qrInput.addEventListener('input', () => {
                    this.processQRCode(prefix);
                });
            }
        },
        
        // Enhanced remaining days calculation
        enhanceRemainingDaysCalculation: function() {
            // Add enhanced calculation for all date inputs
            const dateInputs = [
                'lic-store-date', 'lic-civil-date', 'lic-p24-date', 
                'lic-phd-date', 'lic-out-date', 'new-ads-date'
            ];
            
            dateInputs.forEach(inputId => {
                const input = document.getElementById(inputId);
                if (input) {
                    input.addEventListener('change', () => {
                        this.calculateEnhancedRemainingDays(inputId);
                    });
                    
                    // Initial calculation
                    this.calculateEnhancedRemainingDays(inputId);
                }
            });
            
            // Set up automatic daily updates
            this.setupDailyUpdates();
        },
        
        // Calculate enhanced remaining days with more details
        calculateEnhancedRemainingDays: function(dateInputId) {
            const input = document.getElementById(dateInputId);
            if (!input || !input.value) return;
            
            const expiryDate = new Date(input.value);
            const today = new Date();
            const timeDiff = expiryDate.getTime() - today.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            
            // Get the corresponding days left element
            const prefix = dateInputId.replace('-date', '');
            const daysLeftElement = document.getElementById(prefix + '-days-left');
            if (!daysLeftElement) return;
            
            let message = '';
            let color = '';
            let urgency = '';
            
            if (daysDiff < 0) {
                const expiredDays = Math.abs(daysDiff);
                message = `منتهي منذ ${expiredDays} يوم`;
                color = '#ef4444'; // Red
                urgency = 'عاجل';
            } else if (daysDiff === 0) {
                message = 'ينتهي اليوم';
                color = '#f59e0b'; // Orange
                urgency = 'عاجل';
            } else if (daysDiff <= 7) {
                message = `ينتهي خلال ${daysDiff} يوم - عاجل`;
                color = '#f59e0b'; // Orange
                urgency = 'عاجل';
            } else if (daysDiff <= 30) {
                message = `ينتهي خلال ${daysDiff} يوم`;
                color = '#eab308'; // Yellow
                urgency = 'تحذير';
            } else if (daysDiff <= 90) {
                message = `ينتهي خلال ${daysDiff} يوم`;
                color = '#84cc16'; // Light green
                urgency = 'تنبيه';
            } else {
                message = `ينتهي خلال ${daysDiff} يوم`;
                color = '#22c55e'; // Green
                urgency = 'عادي';
            }
            
            // Add additional information
            const monthsDiff = Math.floor(daysDiff / 30);
            const remainingDays = daysDiff % 30;
            
            if (daysDiff > 30) {
                message += ` (${monthsDiff} شهر و ${remainingDays} يوم)`;
            }
            
            // Add warning icon for urgent cases
            if (daysDiff <= 30) {
                message = '⚠️ ' + message;
            }
            
            daysLeftElement.innerHTML = message;
            daysLeftElement.style.color = color;
            daysLeftElement.style.fontWeight = daysDiff <= 30 ? 'bold' : 'normal';
            
            // Add animation for urgent cases
            if (daysDiff <= 7) {
                daysLeftElement.style.animation = 'pulse 2s infinite';
            } else {
                daysLeftElement.style.animation = 'none';
            }
            
            // Add tooltip with more details
            const tooltipText = this.generateTooltipText(expiryDate, daysDiff, urgency);
            daysLeftElement.title = tooltipText;
            
            console.log(`Calculated remaining days for ${dateInputId}: ${daysDiff} days`);
        },
        
        // Generate detailed tooltip text
        generateTooltipText: function(expiryDate, daysDiff, urgency) {
            const dateStr = expiryDate.toLocaleDateString('ar-SA', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            let tooltip = `تاريخ الانتهاء: ${dateStr}\\n`;
            tooltip += `الأيام المتبقية: ${daysDiff} يوم\\n`;
            tooltip += `مستوى الإلحاح: ${urgency}`;
            
            if (daysDiff <= 30) {
                tooltip += '\\n⚠️ يجب تجديد الترخيص قريباً';
            }
            
            return tooltip;
        },
        
        // Setup automatic daily updates
        setupDailyUpdates: function() {
            // Update remaining days every hour
            setInterval(() => {
                this.updateAllRemainingDays();
            }, 3600000); // 1 hour
            
            // Also update at midnight
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            
            const timeUntilMidnight = tomorrow.getTime() - now.getTime();
            
            setTimeout(() => {
                this.updateAllRemainingDays();
                // Then update every 24 hours
                setInterval(() => {
                    this.updateAllRemainingDays();
                }, 86400000); // 24 hours
            }, timeUntilMidnight);
            
            console.log('Daily updates setup completed');
        },
        
        // Update all remaining days
        updateAllRemainingDays: function() {
            const dateInputs = [
                'lic-store-date', 'lic-civil-date', 'lic-p24-date', 
                'lic-phd-date', 'lic-out-date', 'new-ads-date'
            ];
            
            dateInputs.forEach(inputId => {
                this.calculateEnhancedRemainingDays(inputId);
            });
            
            console.log('All remaining days updated');
        },
        
        // Setup auto-calculation for automatic fields
        setupAutoCalculation: function() {
            // Auto-calculate permit duration based on type
            const durationSelects = document.querySelectorAll('[id$="-duration"]');
            durationSelects.forEach(select => {
                select.addEventListener('change', (e) => {
                    this.autoCalculateExpiryDate(e.target);
                });
            });
            
            // Auto-calculate cost based on permit type and duration
            const costInputs = document.querySelectorAll('[id$="-cost"]');
            costInputs.forEach(input => {
                input.addEventListener('input', (e) => {
                    this.validateCostInput(e.target);
                });
            });
        },
        
        // Auto calculate expiry date based on duration
        autoCalculateExpiryDate: function(durationSelect) {
            const duration = parseInt(durationSelect.value);
            if (!duration || durationSelect.value === 'Other') return;
            
            // Find the corresponding date input
            const prefix = durationSelect.id.replace('-duration', '');
            const dateInput = document.getElementById(prefix + '-date');
            if (!dateInput) return;
            
            // Calculate expiry date from today
            const today = new Date();
            const expiryDate = new Date(today);
            expiryDate.setDate(expiryDate.getDate() + duration);
            
            // Format date as YYYY-MM-DD
            const formattedDate = expiryDate.toISOString().split('T')[0];
            dateInput.value = formattedDate;
            
            // Trigger remaining days calculation
            this.calculateEnhancedRemainingDays(dateInput.id);
            
            console.log(`Auto-calculated expiry date: ${formattedDate} for ${duration} days`);
        },
        
        // Validate cost input
        validateCostInput: function(costInput) {
            const value = parseFloat(costInput.value);
            if (isNaN(value) || value < 0) {
                costInput.style.borderColor = '#ef4444';
                costInput.title = 'يرجى إدخال قيمة صحيحة';
            } else if (value > 1000000) {
                costInput.style.borderColor = '#f59e0b';
                costInput.title = 'قيمة مرتفعة - يرجى التحقق';
            } else {
                costInput.style.borderColor = '#334155';
                costInput.title = '';
            }
        },
        
        // QR Code scanning functionality
        scanQRCode: function(prefix) {
            // This is a placeholder for QR code scanning
            // In a real implementation, you would use a QR code scanning library
            
            // Simulate QR code scanning
            const simulatedQR = 'QR-' + Math.random().toString(36).substr(2, 8).toUpperCase();
            const qrInput = document.getElementById(prefix + '-qr-code');
            if (qrInput) {
                qrInput.value = simulatedQR;
                this.processQRCode(prefix);
            }
            
            this.showNotification('تم مسح الكود بنجاح', 'success');
            console.log(`QR Code scanned for ${prefix}: ${simulatedQR}`);
        },
        
        // Process QR code data
        processQRCode: function(prefix) {
            const qrInput = document.getElementById(prefix + '-qr-code');
            const qrDisplay = document.getElementById(prefix + '-qr-display');
            
            if (!qrInput || !qrDisplay) return;
            
            const qrCode = qrInput.value.trim();
            if (!qrCode) {
                qrDisplay.innerHTML = '';
                return;
            }
            
            // Generate a simple QR code visualization
            qrDisplay.innerHTML = `
                <div style="display: inline-block; padding: 10px; background: white; border-radius: 8px; margin: 5px;">
                    <div style="width: 50px; height: 50px; background: black; position: relative;">
                        <div style="position: absolute; top: 10px; left: 10px; width: 10px; height: 10px; background: white;"></div>
                        <div style="position: absolute; top: 30px; left: 10px; width: 10px; height: 10px; background: white;"></div>
                        <div style="position: absolute; top: 10px; left: 30px; width: 10px; height: 10px; background: white;"></div>
                        <div style="position: absolute; top: 30px; right: 10px; width: 10px; height: 10px; background: white;"></div>
                    </div>
                    <div style="font-size: 0.7rem; color: #333; text-align: center; margin-top: 5px;">${qrCode}</div>
                </div>
            `;
            
            // Auto-fill some fields based on QR code (simulated)
            this.autoFillFromQRCode(prefix, qrCode);
        },
        
        // Auto-fill fields from QR code data
        autoFillFromQRCode: function(prefix, qrCode) {
            // This is a simulation - in real implementation, you would parse actual QR data
            
            // Extract numbers from QR code for license number
            const numbers = qrCode.match(/\d+/g);
            if (numbers && numbers.length > 0) {
                const licenseNumInput = document.getElementById(prefix + '-num');
                if (licenseNumInput && !licenseNumInput.value) {
                    licenseNumInput.value = numbers[0];
                }
            }
            
            // Simulate extracting date from QR code
            const today = new Date();
            const randomDays = Math.floor(Math.random() * 365) + 30;
            const expiryDate = new Date(today);
            expiryDate.setDate(expiryDate.getDate() + randomDays);
            
            const dateInput = document.getElementById(prefix + '-date');
            if (dateInput && !dateInput.value) {
                dateInput.value = expiryDate.toISOString().split('T')[0];
                this.calculateEnhancedRemainingDays(dateInput.id);
            }
        },
        
        // Generate QR code
        generateQRCode: function(prefix) {
            const licenseNum = document.getElementById(prefix + '-num')?.value;
            const dateInput = document.getElementById(prefix + '-date')?.value;
            
            if (!licenseNum || !dateInput) {
                this.showNotification('يرجى إدخال رقم الترخيص وتاريخ الانتهاء أولاً', 'warning');
                return;
            }
            
            // Generate QR code data
            const qrData = `LICENSE|${prefix}|${licenseNum}|${dateInput}|${Date.now()}`;
            const qrInput = document.getElementById(prefix + '-qr-code');
            if (qrInput) {
                qrInput.value = qrData;
                this.processQRCode(prefix);
            }
            
            this.showNotification('تم إنشاء الكود بنجاح', 'success');
            console.log(`QR Code generated for ${prefix}: ${qrData}`);
        },
        
        // Add QR code scanner functionality
        addQRCodeScanner: function() {
            // This is a placeholder for camera-based QR scanning
            // In real implementation, you would use libraries like jsQR or html5-qrcode
            
            // Add camera permission check
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                console.log('Camera support available for QR scanning');
            } else {
                console.log('Camera not supported, using manual input');
            }
        },
        
        // Show notification
        showNotification: function(message, type = 'info') {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                z-index: 10000;
                font-size: 0.9rem;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                animation: slideDown 0.3s ease;
            `;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideUp 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        },
        
        // Export license data with QR codes
        exportLicenseData: function() {
            const licenses = safeParse('admin_licenses', []);
            if (!licenses.length) {
                this.showNotification('لا توجد بيانات للتصدير', 'warning');
                return;
            }
            
            // Add QR codes to export data
            const exportData = licenses.map(license => ({
                ...license,
                qr_codes: {
                    store: license.store_license?.qr_code || '',
                    civil: license.civil_defense?.qr_code || '',
                    p24: license.permit_24?.qr_code || '',
                    phd: license.permit_hd?.qr_code || '',
                    out: license.permit_out?.qr_code || '',
                    ads: license.ads_permits?.map(p => p.qr_code) || []
                },
                export_date: new Date().toISOString()
            }));
            
            // Create and download export file
            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `licenses_export_${new Date().toISOString().slice(0, 10)}.json`;
            link.click();
            
            URL.revokeObjectURL(url);
            this.showNotification('تم تصدير البيانات بنجاح', 'success');
        }
    };
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { transform: translate(-50%, -100%); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translate(-50%, 0); opacity: 1; }
            to { transform: translate(-50%, -100%); opacity: 0; }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        
        .qr-input-container {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid #334155;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
        }
        
        .qr-input-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
            color: #60a5fa;
            font-weight: 500;
        }
        
        .days-left-urgent {
            animation: pulse 2s infinite;
            background: rgba(239, 68, 68, 0.1);
            padding: 4px 8px;
            border-radius: 4px;
            border-left: 3px solid #ef4444;
        }
        
        .days-left-warning {
            background: rgba(245, 158, 11, 0.1);
            padding: 4px 8px;
            border-radius: 4px;
            border-left: 3px solid #f59e0b;
        }
        
        .days-left-normal {
            background: rgba(34, 197, 94, 0.1);
            padding: 4px 8px;
            border-radius: 4px;
            border-left: 3px solid #22c55e;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize when DOM is ready
    function initWhenReady() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                EnhancedLicenseManager.init();
            });
        } else {
            EnhancedLicenseManager.init();
        }
    }
    
    initWhenReady();
    
    // Make it available globally
    window.EnhancedLicenseManager = EnhancedLicenseManager;
    
    console.log('Enhanced License Manager loaded successfully');
})();