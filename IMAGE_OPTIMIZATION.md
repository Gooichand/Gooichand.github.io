# Image Optimization Guide

## Current Image Folders to Optimize:
- `/images/` - Profile and education images
- `/media/` - Gallery photos and videos  
- `/badges/` - Achievement badges

## Optimization Tools:

### Online Tools (Free):
1. **TinyPNG** (https://tinypng.com/)
   - Upload PNG/JPG files
   - Reduces file size by 60-80%
   - Maintains visual quality

2. **Squoosh** (https://squoosh.app/)
   - Google's image optimizer
   - Convert to WebP format
   - Advanced compression settings

### Batch Processing:
1. **ImageOptim** (Mac) / **FileOptimizer** (Windows)
2. **Bulk Resize Photos** (Online)

## Step-by-Step Process:

### 1. Backup Original Images
```bash
# Create backup folder
mkdir image_backups
cp -r images/ image_backups/
cp -r media/ image_backups/
cp -r badges/ image_backups/
```

### 2. Optimize Each Folder:

**Profile Images (images/):**
- Target size: < 200KB each
- Format: WebP or optimized JPG
- Dimensions: Max 800x600px

**Media Gallery (media/):**
- Target size: < 150KB each  
- Format: WebP preferred
- Dimensions: Max 600x400px

**Badges (badges/):**
- Target size: < 100KB each
- Format: PNG (for transparency)
- Dimensions: Max 300x300px

### 3. Implementation:
1. Download optimized images
2. Replace original files
3. Test website loading speed
4. Use browser dev tools to verify file sizes

## Expected Results:
- 50-70% reduction in image file sizes
- Faster First Contentful Paint (target: <2.5s)
- Better mobile performance scores
- Improved user experience

## Alternative: Lazy Loading
Add to images that are below the fold:
```html
<img src="image.jpg" loading="lazy" alt="description">
```