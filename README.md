# Wolves Editing Tools

Browser tools for Wolves worlds — tiling, wall snap, textures, name tags, colors, and reference lookups.

**Live site:** [https://lildvrkness.github.io/wolves-editing-tools/](https://lildvrkness.github.io/wolves-editing-tools/)

Everything runs locally in the browser. No accounts. Image tools never upload your files.

## Tools

| Tool | Page | What it does |
| --- | --- | --- |
| **Grid Snap Calculator** | `gridsnap.html` | Line up modular Unity walls from center position + scale using half-size math. Copy Left / Right / Front / Back / Top / Bottom / Center Align. |
| **Albedo Tile Calculator** | `albedo.html` | Convert wall X / Y into matching albedo tile values. |
| **Texture Workshop** | `textures.html` | Resize, convert PNG / JPEG / WebP, bake a normal map, tag DPI. |
| **Name Tag Gradients** | `nametags.html` | Build smooth `[color=#hex]` codes for in-game name tags. |
| **Fancy Text** | `fancy.html` | Unicode font styles plus click-to-copy text symbols. |
| **Color Codes** | `colors.html` | Color picker with hex, RGB, HSL, Unity, and tag copy. |
| **Submeshes** | `submeshes.html` | Searchable shop / editor / submesh / texture reference. |

## Usage

Open the live site and pick a tool from the hub.

Or clone the repo and open `index.html` in a browser.

## Grid snap formula

Walls are treated as 1-unit meshes with a center pivot.

```
half = scale / 2
```

90° and 270° Y rotation swap the X and Z extents.

Example, snap moving wall to the **left** of the reference wall:

```
moveX = refX − refHalfX − moveHalfX
moveY = refY
moveZ = refZ
```

Results are rounded to the selected grid (default `0.01`).

## Pages

- `index.html` — hub
- `gridsnap.html`
- `albedo.html`
- `textures.html`
- `nametags.html`
- `fancy.html`
- `colors.html`
- `submeshes.html`
- `theme.css` / `fx.js` — shared look and mouse parallax

Hub icons and wolf cutouts live in the repo root next to `index.html` (`tile.jpg`, `wolfcutout1.png`, …).
