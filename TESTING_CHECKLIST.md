# Testing and Validation Checklist

## 1. HTML Validation
**URL:** https://validator.w3.org/
**Steps:**
1. Go to W3C Markup Validator
2. Enter your website URL: https://gooichand.github.io
3. Click "Check"
4. Fix any errors or warnings shown

## 2. SEO Testing
**Tools to Use:**
- Google PageSpeed Insights
- GTmetrix  
- SEO Site Checkup
- Google Search Console

**Checklist:**
- [ ] Meta description appears in search results
- [ ] Title tag displays correctly (59 characters)
- [ ] H1 tag is present and unique
- [ ] All images have alt attributes
- [ ] Sitemap.xml is accessible
- [ ] Robots.txt is accessible
- [ ] Canonical tag prevents duplicate content

## 3. Social Media Testing
**Facebook Debugger:** https://developers.facebook.com/tools/debug/
**Twitter Card Validator:** https://cards-dev.twitter.com/validator

**Test:**
- [ ] Open Graph tags display correctly
- [ ] Twitter cards show proper preview
- [ ] Social media links work
- [ ] Profile images load correctly

## 4. Performance Testing
**Google PageSpeed Insights:** https://pagespeed.web.dev/

**Targets:**
- [ ] Mobile First Contentful Paint: <2.5s
- [ ] Desktop Performance Score: >90
- [ ] Largest Contentful Paint: <2.5s
- [ ] Cumulative Layout Shift: <0.1

## 5. Functionality Testing
**Manual Tests:**
- [ ] Contact form sends emails
- [ ] All navigation links work
- [ ] Mobile responsive design
- [ ] Weather effects display
- [ ] Image modals open/close
- [ ] Social media links open correctly
- [ ] Download CV link works

## 6. Browser Compatibility
**Test in:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)  
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS/Android)

## 7. Analytics Verification
**After GA4 Setup:**
- [ ] Google Analytics tracking works
- [ ] Real-time data appears
- [ ] Goals/events configured
- [ ] Search Console connected

## 8. Security Testing
**SSL Certificate:**
- [ ] HTTPS enabled (GitHub Pages automatic)
- [ ] No mixed content warnings
- [ ] Security headers present

## Common Issues to Fix:
1. **Missing alt attributes** - Add descriptive text
2. **Large image files** - Compress before upload
3. **Broken links** - Test all external links
4. **Console errors** - Check browser developer tools
5. **Mobile layout issues** - Test on actual devices

## Final Deployment Checklist:
- [ ] All placeholder content replaced
- [ ] Social media profiles created and linked
- [ ] Google Analytics configured
- [ ] Images optimized and compressed
- [ ] HTML validates without errors
- [ ] Performance scores meet targets
- [ ] All functionality tested and working