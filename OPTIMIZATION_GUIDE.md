# DNS and Performance Optimization Guide

## DNS Records (Configure with your domain provider)

### SPF Record
```
TXT Record: v=spf1 include:_spf.google.com ~all
```

### DMARC Record
```
TXT Record: v=DMARC1; p=quarantine; rua=mailto:Dandimenigopichand6@gmail.com
```

## Performance Optimization

### Mobile PageSpeed Improvements
1. Optimize images - compress to WebP format
2. Minify CSS and JavaScript files
3. Enable browser caching
4. Use CDN for static assets
5. Lazy load images below the fold

### Desktop PageSpeed Improvements
1. Reduce server response time
2. Eliminate render-blocking resources
3. Optimize critical rendering path
4. Use efficient cache policy

### Implementation Steps
1. Compress all images in /images/, /media/, /badges/ folders
2. Minify style.css and script.js
3. Add .htaccess file for caching (if using Apache)
4. Consider using GitHub Pages CDN optimization

## Google Analytics Setup
Replace 'G-XXXXXXXXXX' in index.html with your actual Google Analytics 4 tracking ID.

## Social Media Profile Setup
Update the social media links in index.html with your actual profile URLs:
- Facebook: https://facebook.com/gopichand.dandimeni
- Twitter: https://twitter.com/gopichand_dgc  
- Instagram: https://instagram.com/gopichand.dgc
- YouTube: https://youtube.com/@gopichanddgc