# Manual Replacement Guide for Updates Section

## Step 1: Locate the Old News Section
In your `index.html` file, find the section that starts with:
```html
<div class="news-card" id="newsCard">
```
And ends with:
```html
</div> <!-- End of floating-news-btn -->
```

## Step 2: Replace with New Modern Updates Showcase
Replace the entire old section with this new code:

```html
        <!-- Modern Updates Showcase -->
        <div class="updates-showcase">
            <div class="updates-header">
                <div class="pulse-dot"></div>
                <h3>Latest Updates</h3>
                <span class="live-indicator">LIVE</span>
            </div>
            
            <div class="updates-grid">
                <div class="update-card featured">
                    <div class="card-glow"></div>
                    <div class="update-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="update-content">
                        <div class="update-badge new">NEW</div>
                        <h4>🛡️ Cybersecurity Intern</h4>
                        <p>CyberWarLab (Dec 9, 2025 - Jan 23, 2026)</p>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 25%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="update-card">
                    <div class="card-glow"></div>
                    <div class="update-icon">
                        <i class="fas fa-snowflake"></i>
                    </div>
                    <div class="update-content">
                        <div class="update-badge hot">HOT</div>
                        <h4>❄️ Winter Consulting 2025</h4>
                        <p>4 weeks with IIT Guwahati</p>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 60%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="update-card">
                    <div class="card-glow"></div>
                    <div class="update-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <div class="update-content">
                        <div class="update-badge active">ACTIVE</div>
                        <h4>🔍 Cyber Forensics Specialist</h4>
                        <p>Cyber Privilege Internship</p>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 90%"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="updates-stats">
                <div class="stat-item">
                    <span class="stat-number">5</span>
                    <span class="stat-label">Active Projects</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">3</span>
                    <span class="stat-label">Internships</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">12+</span>
                    <span class="stat-label">Certificates</span>
                </div>
            </div>
        </div>
```

## Step 3: Remove Old JavaScript Functions
In your `script.js` file, remove or comment out these functions:
- `toggleNewsPopup()`
- `closeNewsPopup()`
- `showNewsOnHome()`

## Step 4: Verify
The new CSS file `updates-showcase.css` has already been created and linked to your HTML.

## Features of New Design:
✅ Modern glassmorphism design
✅ Animated progress bars
✅ Glowing effects and pulsing indicators
✅ 3D card hover effects
✅ Live statistics display
✅ No popup behavior - always visible
✅ Smooth animations
✅ Mobile responsive

The new design is fixed at the bottom-right corner and doesn't require clicking to open/close.