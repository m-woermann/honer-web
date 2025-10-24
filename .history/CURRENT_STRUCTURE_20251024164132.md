# Website Structure - Updated

## Current Page Structure

- **`/` (index.astro)** → Main 3D viewer (landing page)
- **`/products`** → Product listing with 3D models
- **`/speaker-detail?model=...`** → Individual product view

## User Flow

```
1. Visit website (/)
   ↓
   Main 3D Viewer (Stack visualization)
   └─→ PRODUCTS banner link → /products

2. From /products
   ├─→ Click product → /speaker-detail?model=/speaker.glb
   ├─→ Back button → /
   └─→ HOME banner link → /

3. From /speaker-detail
   └─→ Back button → previous page
```

## Navigation Links

### Main Viewer (/)
- Bottom banner: **PRODUCTS** → `/products`
- Arrow navigation: Navigate between stacks

### Products Page (/products)
- Back button: **← Back** → `/`
- Bottom banner: 
  - **HOME** → `/`
  - **PRODUCTS** → `/products`

### Speaker Detail Page (/speaker-detail)
- Back button: **← Back** → Returns to previous page

## File Structure

```
src/
├── pages/
│   ├── index.astro          → Main 3D viewer (landing page)
│   ├── products.astro       → Product listing
│   └── speaker-detail.astro → Individual product view
├── components/
│   └── ThreeViewer.astro    → 3D viewer component
└── config/
    └── speakers.json        → Single source of truth for all content
```

## Configuration System

Everything loads from `src/config/speakers.json`:
- ✅ Product names, descriptions, specs
- ✅ 3D model paths
- ✅ Stack configurations
- ✅ Speaker positions
- ✅ **Zero hardcoded values**

## Quick Reference

### To Edit Content
Edit `src/config/speakers.json`

### To Add New Products
1. Add GLB file to `public/` folder
2. Add entry to `speakerTypes` in `speakers.json`
3. Done! Product automatically appears

### To Change Stack Configurations
Edit the `stacks` array in `speakers.json`

## Testing

1. **Main Viewer**: http://localhost:4323/
   - Should show speaker stacks
   - Arrow navigation works
   - Banner link to products

2. **Products**: http://localhost:4323/products
   - Lists 2 products
   - 3D models rotate
   - Clickable to detail page

3. **Detail**: http://localhost:4323/speaker-detail?model=/speaker.glb
   - Shows rotating model
   - Displays specs
   - Back button works

## Best Practices Implemented

✅ **Immediate Content**: Viewer loads immediately (no extra landing page)
✅ **Clean URLs**: Simple, memorable routes
✅ **Consistent Styling**: Dark theme across all pages
✅ **Config-Driven**: All content from single JSON file
✅ **Responsive**: Works on all screen sizes
✅ **SEO-Friendly**: Proper page titles and structure
