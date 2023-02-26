#target photoshop
#include utils.jsx
cropToActiveLayer();

// crop to selection
function cropToActiveLayer(){
    var activeLayerProperties = getLayerProperties(app.activeDocument.activeLayer);
    app.activeDocument.selection.select([activeLayerProperties.topleft, activeLayerProperties.topright, activeLayerProperties.bottomright, activeLayerProperties.bottomleft]);   
    executeAction( charIDToTypeID( "Crop" ), new ActionDescriptor(), DialogModes.NO );
    app.activeDocument.selection.deselect();
}