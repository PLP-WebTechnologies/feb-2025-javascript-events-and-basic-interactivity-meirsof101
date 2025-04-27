// Wait for the DOM to fully load before running any JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initEventHandlers();
    initInteractiveElements();
    initFormValidation();
});

// ======== EVENT HANDLING SECTION ========
function initEventHandlers() {
    // Button click event
    const launchBtn = document.getElementById('launch-btn');
    launchBtn.addEventListener('click', function() {
        this.textContent = 'Launching... 🚀';
        this.style.backgroundColor = '#e74c3c';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            this.textContent = 'Launch Rocket';
            this.style.backgroundColor = '';
        }, 2000);
    });

    // Hover event
    const hoverArea = document.getElementById('hover-area');
    hoverArea.addEventListener('mouseenter', function() {
        this.textContent = 'Thrusters Activated! 🔥';
        this.style.backgroundColor = '#e67e22';
        this.classList.add('pulse');
    });
    
    hoverArea.addEventListener('mouseleave', function() {
        this.textContent = 'Hover over me to activate thrusters';
        this.style.backgroundColor = '';
        this.classList.remove('pulse');
    });

    // Keypress detection
    const keyOutput = document.getElementById('key-output');
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        keyOutput.textContent = `Alien signal detected: ${key}`;
        keyOutput.classList.add('shake');
        
        setTimeout(() => {
            keyOutput.classList.remove('shake');
        }, 500);
    });

    // Double-click event (BONUS)
    const doubleClickZone = document.getElementById('double-click-zone');
    doubleClickZone.addEventListener('dblclick', function() {
        document.body.classList.add('warp-speed');
        this.textContent = 'WARP SPEED ENGAGED!';
        
        setTimeout(() => {
            document.body.classList.remove('warp-speed');
            this.textContent = 'Double-click for warp speed!';
        }, 2000);
    });

    // Easter egg (secret long press)
    const header = document.querySelector('header h1');
    let pressTimer;
    
    header.addEventListener('mousedown', function() {
        pressTimer = window.setTimeout(function() {
            const easterEgg = document.getElementById('easter-egg');
            easterEgg.classList.remove('hidden');
            
            setTimeout(() => {
                easterEgg.classList.add('hidden');
            }, 3000);
        }, 1000); // Long press is 1 second
    });
    
    header.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
}

// ======== INTERACTIVE ELEMENTS SECTION ========
function initInteractiveElements() {
    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            tabBtns.forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to selected tab
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Image Gallery/Slideshow
    const thumbnails = document.querySelectorAll('.thumbnails img');
    const mainImage = document.getElementById('main-image');
    const imageCaption = document.getElementById('image-caption');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update main image and caption
            mainImage.src = this.src;
            imageCaption.textContent = this.getAttribute('data-caption');
            
            // Add a simple fade animation
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 100);
        });
    });

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't already open
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
}

// ======== FORM VALIDATION SECTION ========
function initFormValidation() {
    const form = document.getElementById('space-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const formResult = document.getElementById('form-result');
    
    // Real-time validation (BONUS)
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const nameValid = validateName();
        const emailValid = validateEmail();
        const passwordValid = validatePassword();
        
        // If all validations pass
        if (nameValid && emailValid && passwordValid) {
            formResult.textContent = `Application submitted successfully! Welcome aboard, ${nameInput.value}!`;
            formResult.className = 'success';
            formResult.style.display = 'block';
            
            // Reset form after successful submission
            setTimeout(() => {
                form.reset();
                clearErrors();
                formResult.style.display = 'none';
            }, 3000);
        } else {
            formResult.textContent = 'Please fix the errors in the form before submitting.';
            formResult.className = 'error';
            formResult.style.display = 'block';
            
            // Hide error message after a few seconds
            setTimeout(() => {
                formResult.style.display = 'none';
            }, 3000);
        }
    });
    
    function validateName() {
        const nameError = document.getElementById('name-error');
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            return false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    
    function validatePassword() {
        const passwordError = document.getElementById('password-error');
        
        if (passwordInput.value === '') {
            passwordError.textContent = 'Password is required';
            return false;
        } else if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters long';
            return false;
        } else {
            passwordError.textContent = '';
            return true;
        }
    }
    
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
    }
}