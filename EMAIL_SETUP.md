# Email Setup Guide

## Overview
Your portfolio now has email functionality that will send you notifications when:
1. Someone enters their name on the splash screen
2. Someone fills out the contact form

## Files Added
- `send_email.php` - Backend script to handle email sending
- `config.php` - Configuration file for email settings
- `EMAIL_SETUP.md` - This setup guide

## Setup Instructions

### Option 1: Basic PHP Mail (Easiest)
1. Upload all files to a web server that supports PHP
2. Make sure your server has PHP mail() function enabled
3. Update `config.php` with your email address if needed
4. Test the forms on your live website

### Option 2: SMTP Configuration (Recommended for Gmail)
1. Edit `config.php` and uncomment the SMTP section
2. For Gmail, use these settings:
   ```php
   define('SMTP_HOST', 'smtp.gmail.com');
   define('SMTP_PORT', 587);
   define('SMTP_USERNAME', 'your-email@gmail.com');
   define('SMTP_PASSWORD', 'your-app-password'); // Not your regular password!
   define('SMTP_ENCRYPTION', 'tls');
   ```
3. Generate an App Password in your Gmail settings:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in the config

### Option 3: Alternative Services
You can also use services like:
- **Formspree** (formspree.io) - Just change the form action
- **Netlify Forms** - If hosting on Netlify
- **EmailJS** - Client-side email service

## Testing
1. Upload files to your web server
2. Visit your portfolio website
3. Enter a name on the splash screen
4. Fill out the contact form
5. Check your email for notifications

## Troubleshooting
- Make sure PHP is enabled on your server
- Check server error logs if emails aren't sending
- Verify email addresses in `config.php`
- Test with a simple PHP mail script first

## Security Notes
- Never commit real passwords to version control
- Use environment variables for sensitive data in production
- Consider rate limiting to prevent spam
- Validate and sanitize all input data