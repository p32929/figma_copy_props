// This plugin extracts properties from selected Figma elements
// and displays them in a table with checkboxes for selective copying

figma.showUI(__html__, { width: 400, height: 600 });

// Convert RGB (0-1 range) to hex color
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (v: number) => {
    const hex = Math.round(v * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// Format fills to readable strings
function formatFills(fills: readonly Paint[]): string[] {
  return fills.map(fill => {
    if (fill.type === 'SOLID') {
      const hex = rgbToHex(fill.color.r, fill.color.g, fill.color.b);
      const opacity = fill.opacity !== undefined && fill.opacity !== 1
        ? ` ${Math.round(fill.opacity * 100)}%` : '';
      return `SOLID ${hex}${opacity}`;
    }
    return fill.type;
  });
}

// Format strokes to readable strings
function formatStrokes(strokes: readonly Paint[]): string[] {
  return strokes.map(stroke => {
    if (stroke.type === 'SOLID') {
      const hex = rgbToHex(stroke.color.r, stroke.color.g, stroke.color.b);
      return `SOLID ${hex}`;
    }
    return stroke.type;
  });
}

// Format effects to readable strings
function formatEffects(effects: readonly Effect[]): string[] {
  return effects.map(effect => {
    if (effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW') {
      const hex = rgbToHex(effect.color.r, effect.color.g, effect.color.b);
      return `${effect.type} ${hex} ${effect.offset.x}x${effect.offset.y} blur:${effect.radius}`;
    }
    return effect.type;
  });
}

// Calculate distance between two nodes (center to center and edge distances)
function calculateDistance(node1: SceneNode, node2: SceneNode): Record<string, any> {
  const distance: Record<string, any> = {};

  if ('x' in node1 && 'y' in node1 && 'width' in node1 && 'height' in node1 &&
      'x' in node2 && 'y' in node2 && 'width' in node2 && 'height' in node2) {

    // Center points
    const center1X = node1.x + node1.width / 2;
    const center1Y = node1.y + node1.height / 2;
    const center2X = node2.x + node2.width / 2;
    const center2Y = node2.y + node2.height / 2;

    // Center to center distance
    const dx = center2X - center1X;
    const dy = center2Y - center1Y;
    distance.horizontalDistance = Math.round(dx * 100) / 100;
    distance.verticalDistance = Math.round(dy * 100) / 100;
    distance.directDistance = Math.round(Math.sqrt(dx * dx + dy * dy) * 100) / 100;

    // Edge to edge gaps (positive = gap, negative = overlap)
    const horizontalGap = node1.x < node2.x
      ? node2.x - (node1.x + node1.width)  // node2 is to the right
      : node1.x - (node2.x + node2.width); // node1 is to the right
    const verticalGap = node1.y < node2.y
      ? node2.y - (node1.y + node1.height)  // node2 is below
      : node1.y - (node2.y + node2.height); // node1 is below

    distance.horizontalGap = Math.round(horizontalGap * 100) / 100;
    distance.verticalGap = Math.round(verticalGap * 100) / 100;
  }

  return distance;
}

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

  // Fills - formatted as "SOLID #FFFFFF"
  if ('fills' in node && Array.isArray(node.fills)) {
    const formatted = formatFills(node.fills as readonly Paint[]);
    properties.fills = formatted.length === 1 ? formatted[0] : formatted.join(', ');
  }

  // Strokes - formatted as "SOLID #FFFFFF"
  if ('strokes' in node && Array.isArray(node.strokes)) {
    const formatted = formatStrokes(node.strokes as readonly Paint[]);
    properties.strokes = formatted.length === 0 ? '[]' : formatted.length === 1 ? formatted[0] : formatted.join(', ');
  }
  if ('strokeWeight' in node) properties.strokeWeight = node.strokeWeight;
  if ('strokeAlign' in node) properties.strokeAlign = node.strokeAlign;

  // Effects (shadows, blur, etc.) - formatted
  if ('effects' in node && Array.isArray(node.effects)) {
    const formatted = formatEffects(node.effects as readonly Effect[]);
    properties.effects = formatted.length === 0 ? '[]' : formatted.length === 1 ? formatted[0] : formatted.join(', ');
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
    // Format fontName as "Family Style"
    if (node.fontName !== figma.mixed) {
      properties.fontName = `${node.fontName.family} ${node.fontName.style}`;
    } else {
      properties.fontName = 'mixed';
    }
    properties.textAlignHorizontal = node.textAlignHorizontal;
    properties.textAlignVertical = node.textAlignVertical;
    // Format letterSpacing as "0px" or "5%"
    if (node.letterSpacing !== figma.mixed) {
      const ls = node.letterSpacing;
      properties.letterSpacing = ls.unit === 'PIXELS' ? `${ls.value}px` : `${ls.value}%`;
    } else {
      properties.letterSpacing = 'mixed';
    }
    // Format lineHeight as "auto", "24px", or "130%"
    if (node.lineHeight !== figma.mixed) {
      const lh = node.lineHeight;
      if (lh.unit === 'AUTO') {
        properties.lineHeight = 'auto';
      } else if (lh.unit === 'PIXELS') {
        properties.lineHeight = `${Math.round(lh.value * 100) / 100}px`;
      } else {
        properties.lineHeight = `${Math.round(lh.value)}%`;
      }
    } else {
      properties.lineHeight = 'mixed';
    }
    properties.characters = node.characters;
  }

  // Constraints - format as "HORIZONTAL, VERTICAL"
  if ('constraints' in node) {
    properties.constraints = `${node.constraints.horizontal}, ${node.constraints.vertical}`;
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
