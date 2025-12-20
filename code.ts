// This plugin extracts properties from selected Figma elements
// and displays them in a table with checkboxes for selective copying

figma.showUI(__html__, { width: 400, height: 600 });

// Function to extract properties from a selected node
function extractProperties(node: SceneNode): Record<string, any> {
  const properties: Record<string, any> = {
    name: node.name,
    type: node.type,
    visible: node.visible,
    locked: node.locked,
  };

  // Position and size (for most nodes)
  if ('x' in node) properties.x = Math.round(node.x * 100) / 100;
  if ('y' in node) properties.y = Math.round(node.y * 100) / 100;
  if ('width' in node) properties.width = Math.round(node.width * 100) / 100;
  if ('height' in node) properties.height = Math.round(node.height * 100) / 100;
  if ('rotation' in node) properties.rotation = Math.round(node.rotation * 100) / 100;

  // Opacity
  if ('opacity' in node) properties.opacity = node.opacity;

  // Blend mode
  if ('blendMode' in node) properties.blendMode = node.blendMode;

  // Corner radius
  if ('cornerRadius' in node && typeof node.cornerRadius === 'number') {
    properties.cornerRadius = node.cornerRadius;
  } else if ('topLeftRadius' in node) {
    properties.topLeftRadius = node.topLeftRadius;
    properties.topRightRadius = node.topRightRadius;
    properties.bottomLeftRadius = node.bottomLeftRadius;
    properties.bottomRightRadius = node.bottomRightRadius;
  }

  // Fills
  if ('fills' in node && Array.isArray(node.fills)) {
    properties.fills = JSON.stringify(node.fills);
  }

  // Strokes
  if ('strokes' in node && Array.isArray(node.strokes)) {
    properties.strokes = JSON.stringify(node.strokes);
  }
  if ('strokeWeight' in node) properties.strokeWeight = node.strokeWeight;
  if ('strokeAlign' in node) properties.strokeAlign = node.strokeAlign;

  // Effects (shadows, blur, etc.)
  if ('effects' in node && Array.isArray(node.effects)) {
    properties.effects = JSON.stringify(node.effects);
  }

  // Layout properties (Auto-layout)
  if ('layoutMode' in node) {
    properties.layoutMode = node.layoutMode;
    if (node.layoutMode !== 'NONE') {
      properties.primaryAxisAlignItems = node.primaryAxisAlignItems;
      properties.counterAxisAlignItems = node.counterAxisAlignItems;
      properties.primaryAxisSizingMode = node.primaryAxisSizingMode;
      properties.counterAxisSizingMode = node.counterAxisSizingMode;
      properties.paddingLeft = node.paddingLeft;
      properties.paddingRight = node.paddingRight;
      properties.paddingTop = node.paddingTop;
      properties.paddingBottom = node.paddingBottom;
      properties.itemSpacing = node.itemSpacing;
    }
  }

  // Text properties
  if (node.type === 'TEXT') {
    properties.fontSize = node.fontSize;
    properties.fontName = JSON.stringify(node.fontName);
    properties.textAlignHorizontal = node.textAlignHorizontal;
    properties.textAlignVertical = node.textAlignVertical;
    properties.letterSpacing = node.letterSpacing;
    properties.lineHeight = JSON.stringify(node.lineHeight);
    properties.characters = node.characters;
  }

  // Constraints
  if ('constraints' in node) {
    properties.constraints = JSON.stringify(node.constraints);
  }

  return properties;
}

// Send properties when selection changes
figma.on('selectionchange', () => {
  const selection = figma.currentPage.selection;

  if (selection.length === 1) {
    const properties = extractProperties(selection[0]);
    figma.ui.postMessage({
      type: 'selection-changed',
      properties: properties
    });
  } else if (selection.length === 0) {
    figma.ui.postMessage({
      type: 'no-selection'
    });
  } else {
    figma.ui.postMessage({
      type: 'multiple-selection',
      count: selection.length
    });
  }
});

// Send initial selection on plugin load
const initialSelection = figma.currentPage.selection;
if (initialSelection.length === 1) {
  const properties = extractProperties(initialSelection[0]);
  figma.ui.postMessage({
    type: 'selection-changed',
    properties: properties
  });
}

// Handle messages from UI
figma.ui.onmessage = (msg) => {
  if (msg.type === 'close') {
    figma.closePlugin();
  }
};
