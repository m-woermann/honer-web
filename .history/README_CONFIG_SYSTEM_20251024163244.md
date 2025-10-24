# Complete Configuration System Documentation

## ✅ **SYSTEM IS 100% CONFIG-DRIVEN**

All product information, 3D models, and specifications are loaded from `src/config/speakers.json`. **Nothing is hardcoded.**

---

## File Architecture

### Config File (Single Source of Truth)
```
src/config/speakers.json  ← Edit this file to change EVERYTHING
```

### Pages That Read From Config
```
src/components/ThreeViewer.astro   ← Main 3D viewer (stacks array)
src/pages/products.astro            ← Product listing (speakerTypes)
src/pages/speaker-detail.astro      ← Individual product view
```

### 3D Models
```
public/speaker.glb  ← Your GLB files go here
public/sub.glb
public/any-new-model.glb  ← Add new models here
```

---

## How Data Flows

### Products Page (`/products`)

```
speakers.json → products.astro → HTML → JavaScript → 3D Viewer
     ↓               ↓              ↓          ↓          ↓
speakerTypes    maps to      data-model   reads    loads GLB
                products      attribute   attribute  from path
```

**Code Flow:**
1. `import speakersData from '../config/speakers.json'`
2. `const products = Object.entries(speakersData.speakerTypes).map(...)`
3. `{products.map((product) => <div data-model={product.modelPath}>)}`
4. JavaScript: `container.getAttribute('data-model')`
5. Three.js: `loader.load(modelPath, ...)`

### Speaker Detail Page (`/speaker-detail?model=/speaker.glb`)

```
URL parameter → speaker-detail.astro → finds in config → displays
      ↓                  ↓                    ↓              ↓
  model path      loads config         matches path    shows specs
```

**Code Flow:**
1. `const modelPath = url.searchParams.get('model')`
2. `for (const [type, data] of Object.entries(speakersData.speakerTypes))`
3. `if (data.modelPath === modelPath) { speakerInfo = data }`
4. `<canvas data-model={speakerInfo.modelPath}>`
5. JavaScript loads the model

---

## Adding/Changing Products

### Example: Add a New Speaker

**Step 1:** Add GLB file to public folder
```
public/my-awesome-speaker.glb
```

**Step 2:** Edit `src/config/speakers.json`
```json
{
  "speakerTypes": {
    "top": { ... },
    "sub": { ... },
    "awesome": {
      "modelPath": "/my-awesome-speaker.glb",
      "name": "Awesome Speaker Pro",
      "description": "The most awesome speaker ever made",
      "specs": {
        "Power": "5000W RMS",
        "Frequency Response": "10Hz - 30kHz",
        "Drivers": "Triple 18\" Subwoofers",
        "Weight": "150kg",
        "Custom Spec": "Any value you want"
      }
    }
  }
}
```

**Step 3:** Save and refresh browser

**Result:**
- ✅ Automatically appears on products page
- ✅ Clickable with detail page
- ✅ All specs displayed
- ✅ 3D model renders with green edges

### Example: Change Existing Product

**Edit speakers.json:**
```json
"top": {
  "modelPath": "/new-top-speaker.glb",  ← Changed model
  "name": "Updated Name",                ← Changed name
  "description": "New description",      ← Changed description
  "specs": {
    "Power": "1000W RMS",                ← Changed value
    "New Spec": "Added new spec"         ← Added field
  }
}
```

**No code changes needed!** Everything updates automatically.

---

## Current Setup

### Products in Config (src/config/speakers.json)

**Product 1: Top Speaker**
- Model: `/speaker.glb`
- Name: `8" + 1" Passive Monitor`
- 5 specs defined

**Product 2: Subwoofer**
- Model: `/sub.glb`
- Name: `Dual 12" Passive Subwoofer`
- 4 specs defined

**Stack Configurations:**
- 3 stacks defined (Small, Medium, Large)
- Positions calculated from config
- No hardcoded positions

---

## Debugging

### Open Browser Console (F12) and check for:

#### ✅ Success Messages:
```
Products page script loaded
Found 2 product image containers
Container 0: Loading model from /speaker.glb
Container 0: Model loaded successfully!
Container 0: Model added to scene, starting animation
Container 1: Loading model from /sub.glb
Container 1: Model loaded successfully!
...
```

#### ❌ Error Messages:

**If you see:**
```
Found 0 product image containers
```
**Problem:** Products aren't rendering from config  
**Solution:** Check that speakers.json has speakerTypes defined

**If you see:**
```
404 (Not Found) /speaker.glb
```
**Problem:** GLB file doesn't exist  
**Solution:** Check that file exists in `public/` folder

**If you see:**
```
Cannot find module 'https://cdn.jsdelivr.net/...'
```
**Problem:** CDN blocked or offline  
**Solution:** Check internet connection or use local Three.js

**If you see:**
```
Error loading model: ...
```
**Problem:** GLB file corrupted or invalid  
**Solution:** Test GLB file in online viewer

---

## Browser Console Quick Tests

```javascript
// Test 1: Are containers created?
document.querySelectorAll('.product-image').length
// Expected: 2 (for top and sub)

// Test 2: Do they have model paths?
Array.from(document.querySelectorAll('.product-image')).map(el => el.getAttribute('data-model'))
// Expected: ["/speaker.glb", "/sub.glb"]

// Test 3: Were canvases added?
document.querySelectorAll('.product-image canvas').length
// Expected: 2

// Test 4: Is Three.js loaded?
typeof THREE
// Expected: "object"
```

---

## File Checklist

✅ **Config exists:**
- [ ] `src/config/speakers.json` exists
- [ ] Has `speakerTypes` object
- [ ] Has `stacks` array
- [ ] All JSON syntax is valid

✅ **Models exist:**
- [ ] `public/speaker.glb` exists
- [ ] `public/sub.glb` exists
- [ ] Files are valid GLB format

✅ **Pages exist:**
- [ ] `src/pages/products.astro` exists
- [ ] `src/pages/speaker-detail.astro` exists
- [ ] `src/components/ThreeViewer.astro` exists

---

## No Hardcoded Values - Verified

✅ **Main Viewer (`ThreeViewer.astro`):**
- Model paths: ❌ None (all from config)
- Stack positions: ❌ None (all calculated from config)
- Speaker names: ❌ None (all from config)

✅ **Products Page (`products.astro`):**
- Product list: ❌ None (mapped from config)
- Model paths: ❌ None (from config)
- Specs: ❌ None (from config)

✅ **Detail Page (`speaker-detail.astro`):**
- Model paths: ❌ None (from URL → config lookup)
- Specs: ❌ None (from config)
- Names: ❌ None (from config)

**Only fallbacks:**
- `/speaker.glb` is used as default if URL parameter is missing (safety fallback only)

---

## Success Criteria

When everything is working, you should see:

1. **Products Page** (`http://localhost:4323/products`)
   - 2 product cards (one for top, one for sub)
   - Each card has a rotating 3D model with green edges
   - Specs listed match your config exactly
   - Clicking a card navigates to detail page

2. **Speaker Detail Page** (`http://localhost:4323/speaker-detail?model=/speaker.glb`)
   - Rotating 3D model in top 1/3 of screen
   - Product name and description
   - All specs displayed as cards
   - Back button works

3. **Main Viewer** (`http://localhost:4323/`)
   - Shows stacks from config
   - Arrow navigation between stacks
   - All speakers positioned correctly

---

## Adding More Features

Want to add more data fields? Just edit the config:

```json
"speakerTypes": {
  "top": {
    "modelPath": "/speaker.glb",
    "name": "Speaker Name",
    "description": "Description",
    "price": "€499",              ← Add price
    "availability": "In Stock",   ← Add availability
    "rating": 5,                  ← Add rating
    "reviews": 123,               ← Add review count
    "specs": { ... },
    "images": ["/img1.jpg"],      ← Add images
    "videos": ["https://..."],    ← Add video links
    "manuals": ["/manual.pdf"]    ← Add documentation
  }
}
```

Then update the page templates to display these new fields!

---

## Support

If models still aren't showing:
1. Check browser console for errors
2. Verify GLB files exist in `public/` folder  
3. Test GLB files in online viewer (https://gltf-viewer.donmccurdy.com/)
4. Ensure internet connection (for CDN)
5. Clear browser cache
6. Restart dev server

The system is fully config-driven and working. Any issues are likely:
- Missing GLB files
- Invalid JSON syntax
- Browser console errors (check F12)
