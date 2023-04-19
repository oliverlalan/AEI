////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function hexToRgb(hex, opacity) {
    var r = parseInt(hex.substring(0,2), 16)/255;
    var g = parseInt(hex.substring(2,4), 16)/255;
    var b = parseInt(hex.substring(4,6), 16)/255;
    
    if(opacity) {
        var o = opacity
        return [r, g, b, o];
    }

    return [r, g, b];
  
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setAnchorPoint(layer, position) {
    var layerBounds = layer.sourceRectAtTime(0, false);
    var anchorX, anchorY;

    switch (position) {
        case "topLeft":
            anchorX = layerBounds.left;
            anchorY = layerBounds.top;
            break;
        case "topCenter":
            anchorX = layerBounds.left + (layerBounds.width / 2);
            anchorY = layerBounds.top;
            break;
        case "topRight":
            anchorX = layerBounds.left + layerBounds.width;
            anchorY = layerBounds.top;
            break;
        case "middleLeft":
            anchorX = layerBounds.left;
            anchorY = layerBounds.top + (layerBounds.height / 2);
            break;
        case "middleCenter":
            anchorX = layerBounds.left + (layerBounds.width / 2);
            anchorY = layerBounds.top + (layerBounds.height / 2);
            break;
        case "middleRight":
            anchorX = layerBounds.left + layerBounds.width;
            anchorY = layerBounds.top + (layerBounds.height / 2);
            break;
        case "bottomLeft":
            anchorX = layerBounds.left;
            anchorY = layerBounds.top + layerBounds.height;
            break;
        case "bottomCenter":
            anchorX = layerBounds.left + (layerBounds.width / 2);
            anchorY = layerBounds.top + layerBounds.height;
            break;
        case "bottomRight":
            anchorX = layerBounds.left + layerBounds.width;
            anchorY = layerBounds.top + layerBounds.height;
            break;
        default:
            alert("Invalid anchor point position: " + position);
            return;
    }

    layer.property("Anchor Point").setValue([anchorX, anchorY, 0]);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function selectCompositionByName(name) {
  var proj = app.project;
  var items = proj.items;
  
  // Loop through all items in project
  for (var i = 1; i <= items.length; i++) {
    var item = items[i];
    
    // Check if item is a composition with a matching name
    if (item instanceof CompItem && item.name === name) {
      item.selected = true;
      return item;
    }
  }
  
  // Composition not found
  return false;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getCompositionByName(name) {

    var composition = selectCompositionByName(name);

    if (sliderComposition) {
        return composition;
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getFolderByName(name) {

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkIfCustom (object) {
  var custom = false;
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      if (object[key].isCustom == true) {
        custom = true;
        break;
      }
    }
  }
  object.isCustom = custom;
}