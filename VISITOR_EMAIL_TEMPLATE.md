# Enhanced Visitor Email Template for EmailJS

## Template Variables for Visitor Notification

Update your EmailJS template `template_x86m9hr` to include these variables:

### Basic Information
- `{{name}}` - Visitor's name
- `{{timestamp}}` - Visit timestamp

### Location Information (FREE via IP Geolocation)
- `{{country}}` - Country name
- `{{region}}` - State/Region
- `{{city}}` - City name
- `{{ip_address}}` - IP address
- `{{isp}}` - Internet Service Provider

### Device Information (Browser APIs - FREE)
- `{{browser}}` - Browser information
- `{{platform}}` - Operating system
- `{{language}}` - Browser language
- `{{screen_resolution}}` - Screen resolution
- `{{timezone}}` - User's timezone
- `{{cookie_enabled}}` - Cookie support status
- `{{online_status}}` - Online status

## Sample Email Template

```html
<h2>🎯 New Portfolio Visitor Alert!</h2>

<div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
    <h3>👤 Visitor Information</h3>
    <p><strong>Name:</strong> {{name}}</p>
    <p><strong>Visit Time:</strong> {{timestamp}}</p>
</div>

<div style="background: #e3f2fd; padding: 20px; border-radius: 10px; margin: 20px 0;">
    <h3>📍 Location Details</h3>
    <p><strong>Country:</strong> {{country}}</p>
    <p><strong>Region:</strong> {{region}}</p>
    <p><strong>City:</strong> {{city}}</p>
    <p><strong>IP Address:</strong> {{ip_address}}</p>
    <p><strong>ISP:</strong> {{isp}}</p>
</div>

<div style="background: #f3e5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
    <h3>💻 Device Information</h3>
    <p><strong>Browser:</strong> {{browser}}</p>
    <p><strong>Platform:</strong> {{platform}}</p>
    <p><strong>Language:</strong> {{language}}</p>
    <p><strong>Screen:</strong> {{screen_resolution}}</p>
    <p><strong>Timezone:</strong> {{timezone}}</p>
    <p><strong>Cookies:</strong> {{cookie_enabled}}</p>
    <p><strong>Online:</strong> {{online_status}}</p>
</div>

<div style="background: #fff3e0; padding: 20px; border-radius: 10px; margin: 20px 0;">
    <p>🚀 <strong>Portfolio:</strong> <a href="https://gooichand.github.io">Visit Portfolio</a></p>
</div>
```

## How to Update EmailJS Template

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Navigate to Email Templates
3. Edit template `template_x86m9hr`
4. Replace content with the sample above
5. Save the template

## Privacy Compliance

✅ **What we collect (FREE & Legal):**
- Public IP geolocation (country, city, ISP)
- Browser information (user agent, language, screen size)
- Basic device info (platform, timezone)

✅ **What we DON'T collect:**
- Exact GPS coordinates
- Personal files or data
- Browsing history
- Private information

## Data Sources Used

1. **IP Geolocation**: `ipapi.co` (Free tier: 1000 requests/day)
2. **Device Info**: Browser Navigator API (Free, built-in)
3. **Email Service**: EmailJS (Free tier: 200 emails/month)

All services used are completely FREE and privacy-compliant!