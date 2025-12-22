# DNS Configuration Guide

## For GitHub Pages (gooichand.github.io)

Since you're using GitHub Pages, you have limited DNS control. These records are mainly for custom domains.

## If You Get a Custom Domain:

### 1. SPF Record
**Type:** TXT  
**Name:** @ (root domain)  
**Value:** `v=spf1 include:_spf.google.com ~all`

### 2. DMARC Record  
**Type:** TXT  
**Name:** _dmarc  
**Value:** `v=DMARC1; p=quarantine; rua=mailto:Dandimenigopichand6@gmail.com`

## Steps to Configure:

1. **Purchase Custom Domain** (optional):
   - Example: gopichanddandimeni.com
   - Use providers like Namecheap, GoDaddy, or Cloudflare

2. **Configure GitHub Pages:**
   - Go to repository Settings > Pages
   - Add custom domain
   - Enable HTTPS

3. **Add DNS Records:**
   - Login to your domain provider
   - Go to DNS management
   - Add the TXT records above

4. **Verify Setup:**
   - Use tools like MXToolbox to verify SPF/DMARC
   - Check DNS propagation (24-48 hours)

## Current Status:
- Using GitHub Pages subdomain (no custom DNS needed)
- Email security records only needed with custom domain
- All other SEO optimizations are already implemented