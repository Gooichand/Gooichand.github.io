// Enhanced Visitor Analytics System - 50+ Data Points
class VisitorAnalytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.analytics = {};
        this.interactions = {
            clicks: 0,
            scrollDepth: 0,
            formInteractions: 0,
            downloads: 0,
            socialClicks: 0,
            projectViews: 0,
            certificateViews: 0,
            mediaViews: 0
        };
        this.initTracking();
    }

    generateSessionId() {
        return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    async initTracking() {
        await this.collectBasicData();
        await this.collectLocationData();
        await this.collectTechnicalData();
        await this.collectPerformanceData();
        await this.collectWeatherData();
        this.setupInteractionTracking();
    }

    async collectBasicData() {
        const nav = navigator;
        this.analytics = {
            // Session Data
            session_id: this.sessionId,
            visit_timestamp: new Date().toISOString(),
            user_agent: nav.userAgent,
            
            // Browser Data
            browser_name: this.getBrowserName(),
            browser_version: this.getBrowserVersion(),
            browser_language: nav.language || nav.userLanguage,
            
            // Device Data
            operating_system: this.getOS(),
            device_type: this.getDeviceType(),
            is_mobile: /Mobi|Android/i.test(nav.userAgent),
            touch_support: 'ontouchstart' in window,
            screen_resolution: `${screen.width}x${screen.height}`,
            
            // Technical Capabilities
            cookies_enabled: nav.cookieEnabled,
            javascript_enabled: true,
            local_storage: typeof(Storage) !== "undefined",
            device_memory: nav.deviceMemory || 'Unknown',
            
            // Page Data
            referrer_url: document.referrer || 'Direct',
            entry_page: window.location.pathname,
            page_title: document.title
        };
    }

    async collectLocationData() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            Object.assign(this.analytics, {
                ip_address: data.ip || 'Unknown',
                country: data.country_name || 'Unknown',
                region: data.region || 'Unknown',
                city: data.city || 'Unknown',
                timezone: data.timezone || 'Unknown',
                isp: data.org || 'Unknown',
                vpn_detected: data.threat || 'None'
            });
        } catch (error) {
            Object.assign(this.analytics, {
                ip_address: 'Blocked',
                country: 'Unknown',
                region: 'Unknown',
                city: 'Unknown',
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                isp: 'Unknown',
                vpn_detected: 'Unknown'
            });
        }
    }

    async collectTechnicalData() {
        // Connection Info
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        // Battery Info
        let batteryLevel = 'Unknown';
        try {
            if ('getBattery' in navigator) {
                const battery = await navigator.getBattery();
                batteryLevel = Math.round(battery.level * 100) + '%';
            }
        } catch (e) {}

        Object.assign(this.analytics, {
            connection_type: connection ? connection.effectiveType : 'Unknown',
            connection_speed: connection ? connection.downlink + ' Mbps' : 'Unknown',
            battery_level: batteryLevel,
            bot_score: this.calculateBotScore(),
            security_risk: this.assessSecurityRisk()
        });
    }

    async collectPerformanceData() {
        const perf = performance;
        const timing = perf.timing;
        
        Object.assign(this.analytics, {
            page_load_time: (timing.loadEventEnd - timing.navigationStart) + 'ms',
            dom_ready_time: (timing.domContentLoadedEventEnd - timing.navigationStart) + 'ms',
            network_latency: (timing.responseStart - timing.fetchStart) + 'ms',
            resource_count: perf.getEntriesByType('resource').length
        });

        // Web Vitals
        if ('PerformanceObserver' in window) {
            try {
                new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.entryType === 'paint') {
                            this.analytics[entry.name.replace('-', '_')] = entry.startTime + 'ms';
                        }
                    }
                }).observe({entryTypes: ['paint']});
            } catch (e) {}
        }
    }

    async collectWeatherData() {
        if (this.analytics.city && this.analytics.city !== 'Unknown') {
            try {
                const apiKey = 'demo'; // Replace with actual API key
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.analytics.city}&appid=${apiKey}&units=metric`);
                const weather = await response.json();
                
                Object.assign(this.analytics, {
                    weather_condition: weather.weather[0].main,
                    temperature: weather.main.temp + '°C',
                    dynamic_theme: this.getThemeFromWeather(weather.main.temp)
                });
            } catch (error) {
                Object.assign(this.analytics, {
                    weather_condition: 'Unknown',
                    temperature: 'Unknown',
                    dynamic_theme: 'Default'
                });
            }
        }
    }

    setupInteractionTracking() {
        // Click tracking
        document.addEventListener('click', (e) => {
            this.interactions.clicks++;
            
            // Track specific interactions
            if (e.target.closest('.social-link')) this.interactions.socialClicks++;
            if (e.target.closest('.project-card')) this.interactions.projectViews++;
            if (e.target.closest('.certificate')) this.interactions.certificateViews++;
            if (e.target.closest('.media-gallery')) this.interactions.mediaViews++;
            if (e.target.href && e.target.href.includes('.pdf')) this.interactions.downloads++;
        });

        // Scroll tracking
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                this.interactions.scrollDepth = maxScroll;
            }
        });

        // Form interaction tracking
        document.addEventListener('input', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                this.interactions.formInteractions++;
            }
        });
    }

    getBrowserName() {
        const ua = navigator.userAgent;
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Safari')) return 'Safari';
        if (ua.includes('Edge')) return 'Edge';
        return 'Unknown';
    }

    getBrowserVersion() {
        const ua = navigator.userAgent;
        const match = ua.match(/(Chrome|Firefox|Safari|Edge)\/(\d+)/);
        return match ? match[2] : 'Unknown';
    }

    getOS() {
        const ua = navigator.userAgent;
        if (ua.includes('Windows')) return 'Windows';
        if (ua.includes('Mac')) return 'macOS';
        if (ua.includes('Linux')) return 'Linux';
        if (ua.includes('Android')) return 'Android';
        if (ua.includes('iOS')) return 'iOS';
        return 'Unknown';
    }

    getDeviceType() {
        const ua = navigator.userAgent;
        if (/tablet|ipad/i.test(ua)) return 'Tablet';
        if (/mobile|phone/i.test(ua)) return 'Mobile';
        return 'Desktop';
    }

    calculateBotScore() {
        let score = 0;
        const ua = navigator.userAgent.toLowerCase();
        
        if (ua.includes('bot') || ua.includes('crawler') || ua.includes('spider')) score += 50;
        if (!navigator.webdriver === undefined) score += 30;
        if (screen.width === 0 || screen.height === 0) score += 40;
        
        return score > 50 ? 'High' : score > 20 ? 'Medium' : 'Low';
    }

    assessSecurityRisk() {
        let risk = 0;
        
        if (this.analytics.vpn_detected !== 'None') risk += 2;
        if (this.analytics.referrer_url === 'Direct') risk += 1;
        if (this.calculateBotScore() === 'High') risk += 3;
        
        return risk > 4 ? 'High' : risk > 2 ? 'Medium' : 'Low';
    }

    getThemeFromWeather(temp) {
        if (temp > 30) return 'Hot Theme';
        if (temp < 10) return 'Cold Theme';
        return 'Default Theme';
    }

    getAnalyticsData() {
        const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
        
        return {
            ...this.analytics,
            ...this.interactions,
            time_spent: timeSpent + 's',
            page_views: 1, // Single page app
            exit_page: window.location.pathname,
            bounce_rate: timeSpent < 30 ? 'High' : 'Low',
            total_clicks: this.interactions.clicks,
            scroll_depth: this.interactions.scrollDepth + '%',
            ai_name_validation: 'Enabled',
            threat_assessment: this.assessSecurityRisk(),
            report_timestamp: new Date().toISOString(),
            first_paint: this.analytics.first_paint || 'Unknown',
            largest_paint: this.analytics.largest_paint || 'Unknown'
        };
    }

    async sendAnalytics(contactData = {}) {
        const analyticsData = this.getAnalyticsData();
        
        const emailData = {
            // Contact form data
            visitor_name: contactData.name || 'Anonymous',
            visitor_email: contactData.email || 'Not provided',
            message_subject: contactData.subject || 'Portfolio Visit',
            visitor_message: contactData.message || 'Visitor analytics data',
            
            // All analytics data
            ...analyticsData
        };

        try {
            await emailjs.send('service_b3wheld', 'template_analytics', emailData);
            console.log('Analytics sent successfully');
        } catch (error) {
            console.error('Analytics send failed:', error);
        }
    }
}

// Remove duplicate form handler - handled in main script
// const visitorAnalytics = new VisitorAnalytics();

// Simple analytics without form interference
class SimpleAnalytics {
    constructor() {
        this.data = {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            language: navigator.language,
            screen: screen.width + 'x' + screen.height
        };
        console.log('Analytics initialized:', this.data);
    }
}

window.simpleAnalytics = new SimpleAnalytics();