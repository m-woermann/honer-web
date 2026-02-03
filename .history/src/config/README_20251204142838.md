# Speaker Configuration Guide

This file controls all speaker and subwoofer configurations for the 3D viewer without needing to modify the main code.

## File Location
`src/config/speakers.json`

## Configuration Structure

### Speaker Object
Each speaker configuration has the following properties:

```json
{
  "modelPath": "/speaker.glb",        // Path to the 3D model file
  "speakerType": "Top",                // Display name type (shown in overlay)
  "name": "8\" + 1\" Passive Monitor", // Full product name
  "description": "Product description text",
  "specs": {                           // Product specifications (key-value pairs)
    "Power": "500W RMS",
    "Frequency Response": "90Hz - 20kHz",
    // ... add any specs you want
  },
  "instances": [                       // Array of positions for this speaker model
    {
      "x": -1295,                      // X position in 3D space
      "y": 1210,                       // Y position (height)
      "z": 0,                          // Z position (depth)
      "rotationY": 1.5708,             // Rotation in radians (optional, default 0)
      "onGround": false,               // Whether placed on ground or elevated
      "comment": "Optional description" // Comment for your reference
    }
  ]
}
```

## Adding a New Speaker

1. Open `src/config/speakers.json`
2. Add a new object to the `speakers` array with all required fields
3. Save the file - the changes will be reflected on next page load

Example:
```json
{
  "modelPath": "/new-speaker.glb",
  "speakerType": "Mid",
  "name": "New Speaker Model",
  "description": "Description of the new speaker",
  "specs": {
    "Power": "300W RMS",
    "Frequency Response": "50Hz - 18kHz"
  },
  "instances": [
    { "x": 0, "y": 600, "z": 0, "onGround": false }
  ]
}
```

## Positioning Guide

### Coordinate System
- **X axis**: Left (-) to Right (+)
- **Y axis**: Down (-) to Up (+)
- **Z axis**: Back (-) to Front (+)

### Rotation
- `rotationY`: Rotation around vertical axis in radians
  - `0` = facing forward
  - `1.5708` (π/2) = facing right
  - `3.1416` (π) = facing backward
  - `4.7124` (3π/2) = facing left

### Ground Placement
- `onGround: true` - Places the speaker on the ground (Y=0), calculates height automatically
- `onGround: false` - Uses the exact Y coordinate you specify

## Tips

1. **Spacing**: The subwoofers are spaced 370 units apart in the example
2. **Stacking**: For speakers on top of subs, use `onGround: false` and set Y to the sub height (e.g., 1210)
3. **Comments**: Use the `comment` field to document your layout
4. **Testing**: After editing, refresh the page to see your changes

## Common Layouts

### Line Array (8 units)
```json
{ "x": -1295, "y": 0, "z": 0, "onGround": true },
{ "x": -925, "y": 0, "z": 0, "onGround": true },
{ "x": -555, "y": 0, "z": 0, "onGround": true },
{ "x": -185, "y": 0, "z": 0, "onGround": true },
{ "x": 185, "y": 0, "z": 0, "onGround": true },
{ "x": 555, "y": 0, "z": 0, "onGround": true },
{ "x": 925, "y": 0, "z": 0, "onGround": true },
{ "x": 1295, "y": 0, "z": 0, "onGround": true }
```

### Stereo Pair
```json
{ "x": -500, "y": 0, "z": 0, "onGround": true },
{ "x": 500, "y": 0, "z": 0, "onGround": true }
```

### Center + Sides
```json
{ "x": -800, "y": 0, "z": 0, "onGround": true },
{ "x": 0, "y": 0, "z": 0, "onGround": true },
{ "x": 800, "y": 0, "z": 0, "onGround": true }
```
