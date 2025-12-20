# CopyProps - Figma Property Copier

A Figma plugin that allows you to selectively copy element properties in a clean, readable format.

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

[Add your license here]
