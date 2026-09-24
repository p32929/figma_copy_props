# CopyProps - Figma Property Copier

A Figma plugin that lets you tick exactly which properties of a selected element you want, and copies them out in a clean, readable format instead of raw JSON.

**Install from the Figma Community:** https://www.figma.com/community/plugin/1584270032926854878/copyprops

![Screenshot](https://res.cloudinary.com/p32929/image/upload/v1766252551/figma_copy_props/Screenshot_2025-12-20_at_9.23.31_PM_syrwmp.png)

## Features

- **Automatic Property Extraction**: Instantly view all properties of any selected Figma element
- **Selective Copying**: Use checkboxes to choose which properties to copy
- **Persistent Preferences**: Your checkbox selections are remembered across sessions
- **Visual Feedback**: Unchecked properties are visually indicated with strikethrough and fade effect
- **Clean Output Format**: Properties are copied in a human-readable format, not JSON
- **Nested Object Support**: Complex properties (fills, strokes, effects) are formatted as single-line, comma-separated values
- **Scrollable Table**: Smooth scrolling for long property lists while keeping controls fixed
- **GitHub Integration**: Quick access to the repository directly from the plugin UI

## Installation

Easiest: install it from the [Figma Community page](https://www.figma.com/community/plugin/1584270032926854878/copyprops) — no build step.

To run it from source instead:

### Prerequisites

First, download Node.js which comes with NPM:
- https://nodejs.org/en/download/

### Setup

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the plugin:
   ```bash
   npm run build
   ```
4. In Figma, go to `Plugins → Development → Import plugin from manifest`
5. Select the `manifest.json` file from this directory
6. Run the plugin from `Plugins → Development → CopyProps`

## Usage

1. **Select an element** in Figma
2. The plugin will display all properties in a scrollable table with checkboxes
3. **Check/uncheck** properties you want to include or exclude
   - Unchecked properties appear with strikethrough and faded out
   - Use "Select All" or "Deselect All" for quick toggling
4. Click **"Copy Selected Properties"** to copy to clipboard
   - A success toast notification will appear
5. Your checkbox preferences are automatically saved and will persist across sessions
6. Click the **GitHub icon** in the header to visit the repository

### Output Format

Simple properties:
```
name: Rectangle 1
width: 100
height: 50
opacity: 1
```

Nested properties (arrays):
```
fills:
[0] type: SOLID, color: {"r":1,"g":0.5,"b":0}, opacity: 1
```

Nested properties (objects):
```
letterSpacing:
unit: PERCENT, value: 25
```

## Development

### Build
```bash
npm run build
```

### Watch mode (auto-rebuild on changes)
```bash
npm run watch
```

### Lint
```bash
npm run lint
```

## Technology Stack

- TypeScript
- Figma Plugin API
- HTML/CSS/JavaScript (UI)
- localStorage (for persistent preferences)

## How It Works

- **code.ts**: Main plugin code that runs in Figma's context. Listens for selection changes and extracts properties from selected elements.
- **ui.html**: Plugin UI that displays properties in a table with checkboxes, handles copying to clipboard, and manages user preferences.
- **manifest.json**: Plugin configuration file.

## Repository

https://github.com/p32929/figma_copy_props

## License

MIT License — Copyright (c) 2025 Fayaz Bin Salam. See [LICENSE](LICENSE) for the full text.

## Contributing

Contributions are warmly welcomed and greatly appreciated! Whether it's a bug fix, new feature, or improvement, your input helps make this project better for everyone.

Before submitting a pull request, please:

1. Create an issue describing the feature or bug fix you'd like to work on
2. Wait for discussion and approval to ensure alignment with project goals
3. Fork the repository and create your feature branch
4. Submit your pull request with a clear description of changes

This approach helps avoid duplicate efforts and ensures smooth collaboration. Thank you for considering contributing!

## Share

Sharing this repository with your friends is just one click away from here

[![facebook](https://user-images.githubusercontent.com/6418354/179013321-ac1d1452-0689-493f-9066-940cf2302b6e.png)](https://www.facebook.com/sharer/sharer.php?u=https://github.com/p32929/figma_copy_props/)
[![twitter](https://user-images.githubusercontent.com/6418354/179013351-7d8d6d1c-4ce2-46ab-bef8-4c4765a1b888.png)](https://twitter.com/intent/tweet?url=https://github.com/p32929/figma_copy_props/)
[![tumblr](https://user-images.githubusercontent.com/6418354/179013343-3111f55a-3b90-40c7-8487-9777348672b0.png)](https://www.tumblr.com/share?v=3&u=https://github.com/p32929/figma_copy_props/)
[![pocket](https://user-images.githubusercontent.com/6418354/179013334-b095c45f-becf-49f4-9ee1-5a731a9b1f85.png)](https://getpocket.com/save?url=https://github.com/p32929/figma_copy_props/)
[![pinterest](https://user-images.githubusercontent.com/6418354/179013331-44cd9206-11b1-4b65-becb-5863b61c828f.png)](https://pinterest.com/pin/create/button/?url=https://github.com/p32929/figma_copy_props/)
[![reddit](https://user-images.githubusercontent.com/6418354/179013338-7416ae3f-73ba-4522-86e1-1374d7082d22.png)](https://www.reddit.com/submit?url=https://github.com/p32929/figma_copy_props/)
[![linkedin](https://user-images.githubusercontent.com/6418354/179013327-ca7b7102-1da8-4b1c-858f-1a6e5f21bd70.png)](https://www.linkedin.com/shareArticle?mini=true&url=https://github.com/p32929/figma_copy_props/)
[![whatsapp](https://user-images.githubusercontent.com/6418354/179013353-f477fa0b-3e6f-4138-a357-c9991b23ff88.png)](https://api.whatsapp.com/send?text=https://github.com/p32929/figma_copy_props/)

<!-- hire-block -->

---

## 💼 Using this at a company?

I do fixed-price delivery work on my own projects. One invoice, one date, no hourly billing:

| | |
|---|---|
| **White-label build** — this project rebranded, extended and deployed as yours | **$6,500** · 3 weeks |
| **Custom app from scratch** on my own stack, signed and auto-updating | **$12,500** · 6 weeks |
| **Production-hardening sprint** — 72 hours on this project, for your load and your security review | **$999** |
| **Ongoing capacity** — one project-week of my time reserved every month | **$9,000 / month** |

Full details → **[p32929.github.io/hire](https://p32929.github.io/hire/)** · Email **[fayazbinsalam@uberip.com](mailto:fayazbinsalam@uberip.com)** — scoping and quotes are free and I answer within one business day.
