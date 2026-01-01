/**
 * Enhanced Slider System
 * Modern, transparent, and light design with advanced features
 */

// Enhanced Slider System with modern design
document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedSlider();
});

function initializeEnhancedSlider() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsContainer');
    
    if (!slides.length) {
        console.warn('No slides found for enhanced slider');
        return;
    }

    let currentSlide = 0;
    let autoPlayInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    // Create modern dots
    createModernDots();
    
    // Initialize slider
    showSlide(currentSlide);
    startAutoPlay();

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', () => changeSlide(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => changeSlide(1));

    // Touch events for mobile
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('touchstart', handleTouchStart, { passive: true });
        heroSection.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);

    // Pause auto-play on hover
    const heroContainer = document.querySelector('.hero');
    if (heroContainer) {
        heroContainer.addEventListener('mouseenter', stopAutoPlay);
        heroContainer.addEventListener('mouseleave', startAutoPlay);
    }

    function createModernDots() {
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        dotsContainer.className = 'modern-dots-container';
        
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'modern-dot';
            dot.setAttribute('aria-label', `الانتقال إلى الشريحة ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    function showSlide(index) {
        // Hide all slides with smooth transition
        slides.forEach((slide, i) => {
            slide.style.opacity = '0';
            slide.style.transform = 'translateX(100%)';
            slide.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            slide.classList.remove('active');
        });

        // Show current slide
        setTimeout(() => {
            slides[index].style.opacity = '1';
            slides[index].style.transform = 'translateX(0)';
            slides[index].classList.add('active');
        }, 50);

        // Update dots
        updateDots(index);
        
        // Update navigation buttons
        updateNavButtons(index);
    }

    function updateDots(index) {
        const dots = document.querySelectorAll('.modern-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function updateNavButtons(index) {
        if (prevBtn) {
            prevBtn.style.opacity = index === 0 ? '0.5' : '1';
            prevBtn.style.cursor = index === 0 ? 'not-allowed' : 'pointer';
        }
        
        if (nextBtn) {
            nextBtn.style.opacity = index === slides.length - 1 ? '0.5' : '1';
            nextBtn.style.cursor = index === slides.length - 1 ? 'not-allowed' : 'pointer';
        }
    }

    function changeSlide(direction) {
        const newIndex = currentSlide + direction;
        if (newIndex >= 0 && newIndex < slides.length) {
            currentSlide = newIndex;
            showSlide(currentSlide);
            resetAutoPlay();
        }
    }

    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
        resetAutoPlay();
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => {
            changeSlide(1);
        }, 5000); // Change every 5 seconds
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                changeSlide(1);
            } else {
                // Swipe right - previous slide
                changeSlide(-1);
            }
        }
    }

    function handleKeyboard(e) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        } else if (e.key === 'Escape') {
            stopAutoPlay();
        }
    }

    // Add modern CSS styles
    addModernSliderStyles();
}

function addModernSliderStyles() {
    if (document.getElementById('modern-slider-styles')) return;

    const style = document.createElement('style');
    style.id = 'modern-slider-styles';
    style.textContent = `
        /* Modern Slider Styles */
        .hero {
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.6));
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }

        .slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            background: rgba(15, 23, 42, 0.3);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            margin: 20px;
            padding: 40px;
        }

        .slide.active {
            opacity: 1;
            transform: translateX(0);
        }

        .slide h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 20px;
            background: linear-gradient(135deg, #4facfe, #00f2fe);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .slide p {
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 15px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        /* Modern Navigation Buttons */
        .prev-btn, .next-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .prev-btn:hover, .next-btn:hover {
            background: rgba(79, 172, 254, 0.3);
            border-color: rgba(79, 172, 254, 0.5);
            transform: translateY(-50%) scale(1.1);
        }

        .prev-btn {
            left: 30px;
        }

        .next-btn {
            right: 30px;
        }

        /* Modern Dots */
        .modern-dots-container {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 12px;
            z-index: 10;
        }

        .modern-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.2);
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }

        .modern-dot:hover {
            background: rgba(79, 172, 254, 0.5);
            transform: scale(1.2);
        }

        .modern-dot.active {
            background: #4facfe;
            border-color: #4facfe;
            transform: scale(1.3);
            box-shadow: 0 0 10px rgba(79, 172, 254, 0.5);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .slide {
                margin: 10px;
                padding: 20px;
            }

            .slide h2 {
                font-size: 1.8rem;
            }

            .slide p {
                font-size: 1rem;
            }

            .prev-btn, .next-btn {
                width: 40px;
                height: 40px;
                font-size: 1.2rem;
            }

            .prev-btn {
                left: 15px;
            }

            .next-btn {
                right: 15px;
            }

            .modern-dots-container {
                bottom: 20px;
                gap: 8px;
            }

            .modern-dot {
                width: 10px;
                height: 10px;
            }
        }

        /* Animation for slide content */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .slide.active h2,
        .slide.active p {
            animation: fadeInUp 0.8s ease-out;
        }

        .slide.active p {
            animation-delay: 0.2s;
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize enhanced slider when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEnhancedSlider);
} else {
    initializeEnhancedSlider();
}

console.log('Enhanced modern slider system loaded with transparent, light design');