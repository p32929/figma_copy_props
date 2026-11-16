# CopyProps: Figma property copier

CopyProps is a Figma plugin that copies the properties of a selected layer as clean, readable text. Figma's own "copy as" options give you CSS or code, and dev mode is not on every plan. CopyProps lets you tick exactly the properties you want and copies them in a simple `name: value` format you can paste into a ticket, a chat or your code.

**Install it from the Figma Community:** https://www.figma.com/community/plugin/1584270032926854878/copyprops

![CopyProps](https://res.cloudinary.com/p32929/image/upload/v1766252551/figma_copy_props/Screenshot_2025-12-20_at_9.23.31_PM_syrwmp.png)

## Features

1. **Every property at a glance:** select a layer and all its properties show in one table.
2. **Copy only what you need:** tick or untick each property, or use Select all and Deselect all.
3. **Remembers your choice:** the ticks you set stay the same next time you open the plugin.
4. **Easy to read:** unticked properties are faded and struck through, so you see what will be copied.
5. **Clean output, not JSON:** simple properties come out as `name: value`, and fills, strokes and effects come out on one line each.

## Install

The easiest way is the [Figma Community page](https://www.figma.com/community/plugin/1584270032926854878/copyprops). There is nothing to build.

To run it from the source code, you need [Node.js](https://nodejs.org/):

1. Clone this repository.
2. Run `npm install`.
3. Run `npm run build`.
4. In Figma, open **Plugins**, then **Development**, then **Import plugin from manifest**, and pick `manifest.json` from this folder.
5. Run it from **Plugins**, then **Development**, then **CopyProps**.

## How to use it

1. Select a layer in Figma.
2. Tick the properties you want to copy.
3. Click **Copy Selected Properties**. A small message tells you it worked.

Simple properties look like this:

```
name: Rectangle 1
width: 100
height: 50
opacity: 1
```

Lists and objects stay on one line each:

```
fills:
[0] type: SOLID, color: {"r":1,"g":0.5,"b":0}, opacity: 1

letterSpacing:
unit: PERCENT, value: 25
```

## For developers

1. `npm run watch` rebuilds on every change.
2. `npm run lint` checks the code.
3. `code.ts` runs inside Figma and reads the selected layer. `ui.html` is the table, the copy button and the saved ticks.

## License

MIT License. Copyright (c) 2025 Fayaz Bin Salam. See [LICENSE](LICENSE) for the full text.

## Contributing

Contributions are very welcome. Please open an issue first to talk about what you'd like to add or change, so we can agree on it before you spend time on a pull request. Thank you!

## Share

<a href="https://p32929.github.io/share/?repo=figma_copy_props"><picture><source media="(prefers-color-scheme: dark)" srcset="https://p32929.github.io/readme/share-dark.svg"><img src="https://p32929.github.io/readme/share-light.svg" alt="Share this with your friends in just a click" width="420"></picture></a>

## Support

<a href="https://p32929.github.io/support/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://p32929.github.io/readme/support-dark.svg"><img src="https://p32929.github.io/readme/support-light.svg" alt="If you like my works and want to support me, feel free to support" width="420"></picture></a>
