// Enhanced EmailJS with Visitor Analytics - Gopichand Portfolio
(function() {
    'use strict';

    // EmailJS Configuration
    const CONFIG = {
        publicKey: 'tQrf5kDN2167TgvY-',
        serviceId: 'service_b3wheld',
        contactTemplateId: 'template_9e7vhot',
        visitorTemplateId: 'template_x86m9hr'
    };

    // Simple analytics collector
    const analytics = {
        startTime: Date.now(),
        clicks: 0,
        scrollDepth: 0,
        
        collect() {
            return {
                // Contact data (will be filled by form)
                name: '',
                email: '',
                subject: '',
                message: '',
                
                // Basic analytics
                visit_timestamp: new Date().toISOString(),
                session_id: 'session_' + Math.random().toString(36).substr(2, 9),
                time_spent: Math.round((Date.now() - this.startTime) / 1000) + 's',
                browser_name: this.getBrowser(),
                operating_system: this.getOS(),
                device_type: this.getDevice(),
                screen_resolution: screen.width + 'x' + screen.height,
                browser_language: navigator.language,
                user_agent: navigator.userAgent,
                referrer_url: document.referrer || 'Direct',
                page_views: 1,
                total_clicks: this.clicks,
                scroll_depth: this.scrollDepth + '%',
                cookies_enabled: navigator.cookieEnabled,
                javascript_enabled: true,
                is_mobile: /Mobi|Android/i.test(navigator.userAgent),
                touch_support: 'ontouchstart' in window,
                
                // Location (will be filled by IP API)
                ip_address: 'Unknown',
                country: 'Unknown',
                city: 'Unknown',
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            };
        },
        
        getBrowser() {
            const ua = navigator.userAgent;
            if (ua.includes('Chrome')) return 'Chrome';
            if (ua.includes('Firefox')) return 'Firefox';
            if (ua.includes('Safari')) return 'Safari';
            if (ua.includes('Edge')) return 'Edge';
            return 'Unknown';
        },
        
        getOS() {
            const ua = navigator.userAgent;
            if (ua.includes('Windows')) return 'Windows';
            if (ua.includes('Mac')) return 'macOS';
            if (ua.includes('Linux')) return 'Linux';
            if (ua.includes('Android')) return 'Android';
            if (ua.includes('iOS')) return 'iOS';
            return 'Unknown';
        },
        
        getDevice() {
            const ua = navigator.userAgent;
            if (/tablet|ipad/i.test(ua)) return 'Tablet';
            if (/mobile|phone/i.test(ua)) return 'Mobile';
            return 'Desktop';
        }
    };

    // Track interactions
    document.addEventListener('click', () => analytics.clicks++);
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > analytics.scrollDepth) analytics.scrollDepth = scrollPercent;
    });

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Initializing Enhanced EmailJS...');
        
        emailjs.init(CONFIG.publicKey);
        console.log('EmailJS initialized');

        const contactForm = document.getElementById('contactForm');
        if (!contactForm) {
            console.error('Contact form not found!');
            return;
        }

        contactForm.addEventListener('submit', handleFormSubmit);
        console.log('Form handler attached');
        
        // Get location data
        getLocationData();
    });

    async function getLocationData() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            Object.assign(analytics, {
                ip_address: data.ip || 'Unknown',
                country: data.country_name || 'Unknown',
                city: data.city || 'Unknown',
                region: data.region || 'Unknown',
                timezone: data.timezone || analytics.timezone,
                isp: data.org || 'Unknown'
            });
        } catch (error) {
            console.log('Location data unavailable');
        }
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        console.log('Form submitted');

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('Please fill in all fields');
            return;
        }

        const submitBtn = document.querySelector('.send-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        try {
            // Send contact form
            console.log('Sending contact form...');
            await emailjs.send(CONFIG.serviceId, CONFIG.contactTemplateId, formData);
            
            // Send visitor analytics
            console.log('Sending visitor analytics...');
            const analyticsData = analytics.collect();
            analyticsData.name = formData.name;
            analyticsData.email = formData.email;
            analyticsData.subject = formData.subject;
            analyticsData.message = formData.message;
            
            await emailjs.send(CONFIG.serviceId, CONFIG.visitorTemplateId, analyticsData);
            
            alert('✅ Message sent successfully! I will get back to you soon.');
            document.getElementById('contactForm').reset();
            
        } catch (error) {
            console.error('Send failed:', error);
            alert('❌ Failed to send message. Please try again or contact me directly.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

})();