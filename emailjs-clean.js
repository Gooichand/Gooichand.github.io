// Clean EmailJS Implementation - Gopichand Portfolio
(function() {
    'use strict';

    // EmailJS Configuration
    const CONFIG = {
        publicKey: 'tQrf5kDN2167TgvY-',
        serviceId: 'service_b3wheld',
        templateId: 'template_9e7vhot'
    };

    // Initialize EmailJS when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Initializing EmailJS...');
        
        // Initialize EmailJS
        emailjs.init(CONFIG.publicKey);
        console.log('EmailJS initialized successfully');

        // Get form element
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) {
            console.error('Contact form not found!');
            return;
        }

        // Add form submit handler
        contactForm.addEventListener('submit', handleFormSubmit);
        console.log('Form handler attached');
    });

    async function handleFormSubmit(event) {
        event.preventDefault();
        console.log('Form submitted');

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        console.log('Form data:', formData);

        // Validate form data
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('Please fill in all fields');
            return;
        }

        // Disable submit button
        const submitBtn = document.querySelector('.send-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        try {
            console.log('Sending email...');
            const result = await emailjs.send(CONFIG.serviceId, CONFIG.templateId, formData);
            console.log('Email sent successfully:', result);
            
            // Success
            alert('✅ Message sent successfully! I will get back to you soon.');
            document.getElementById('contactForm').reset();
            
        } catch (error) {
            console.error('Email send failed:', error);
            alert('❌ Failed to send message. Please try again or contact me directly at Dandimenigopichand6@gmail.com');
        } finally {
            // Re-enable submit button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

})();