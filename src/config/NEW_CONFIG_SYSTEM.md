# New Configuration System Documentation

## Overview

The speaker configuration system has been restructured for better modularity and maintainability.

### File Structure

```
src/config/speakers/      # Speaker metadata
└── [name].json           # Individual speaker configurations

public/                   # Browser-accessible assets
└── [name].glb            # 3D model files

src/config/
└── positioning.json      # Stack layouts and positioning
```

### Individual Speaker Configurations

Each speaker type has its own JSON file in `/src/config/speakers/` with matching GLB file in `/public/`:

**Example: `/src/config/speakers/sub.json`**
```json
{
    "name": "Subwoofer",
    "description": "2x12\" Passive",
    "specs": {
        "Power": "2000W RMS",
        "Frequency Response": "20Hz - 150Hz",
        "Drivers": "Dual 12\" Woofers",
        "Connections": "Speakon"
    },
    "category": "subwoofer",
    "type": "passive",
    "weight": "45kg",
    "dimensions": {
        "width": "600mm",
        "height": "500mm", 
        "depth": "700mm"
    }
}
```

### Positioning Configuration

The positioning file defines how speakers are arranged in different stack configurations:

**`/src/config/positioning.json`**
```json
{
    "stacks": [
        {
            "name": "Small System",
            "description": "4 Subwoofers with single top",
            "spacing": 3000,
            "speakers": [
                {
                    "model": "sub",
                    "x": -185,
                    "y": 0,
                    "z": 0,
                    "rotationY": 1.5707963267948966,
                    "onGround": true
                }
            ]
        }
    ]
}
```

### Adding New Speakers

1. **Create the 3D model**: Add `[name].glb` to `/public/`
2. **Create the configuration**: Add `[name].json` to `/src/config/speakers/`
3. **Use in positioning**: Reference by `"model": "[name]"` in positioning.json

### Migration Notes

- Speaker JSON configs are now in `/src/config/speakers/`
- GLB files remain in `/public/` for browser accessibility
- Model paths are automatically generated as `/[name].glb`
- Speaker metadata is loaded via Vite static imports