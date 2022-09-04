#target photoshop

function checkLayerGroupExistance(document, name) {
    var layerSets = document.layerSets;
    for (i=0; i<layerSets.length; i++) {
        if (layerSets[i].name==name) return true;
    }
    return false;
}

function placeInGroup (layer, targetGroupName) {
    // Document Selection
    var doc = app.activeDocument;

    // Check if LayerSet exists and, if not, create

    if(!checkLayerGroupExistance(doc, targetGroupName)){
        var layerGroup = app.activeDocument.layerSets.add();
        layerGroup.name = targetGroupName;
    }

    // Mover layer into targetGroupName;
    layer.move(doc.layerSets.getByName(targetGroupName), ElementPlacement.INSIDE);
}

// Based on https://www.codeproject.com/Questions/882480/Place-Embedded-through-photoshop-scripting-Javascr
function addIcon (selectedFilePath, targetGroupName, targetWidth) {
  
  var idPlc = charIDToTypeID( "Plc " ); 
  var desc11 = new ActionDescriptor();  
  var idnull = charIDToTypeID( "null" );
  
  // opens dialog to select file
  // var selectedFile = app.openDialog();

  desc11.putPath( idnull, new File(selectedFilePath) );
  var idFTcs = charIDToTypeID( "FTcs" ); 
  var idQCSt = charIDToTypeID( "QCSt" );   
  var idQcsa = charIDToTypeID( "Qcsa" ); 
  desc11.putEnumerated( idFTcs, idQCSt, idQcsa );
  var idOfst = charIDToTypeID( "Ofst" );     
  var desc12 = new ActionDescriptor();     
  var idHrzn = charIDToTypeID( "Hrzn" );    
  var idPxl = charIDToTypeID( "#Pxl" );      
  desc12.putUnitDouble( idHrzn, idPxl, 0.000000 );     
  var idVrtc = charIDToTypeID( "Vrtc" );    
  var idPxl = charIDToTypeID( "#Pxl" );    
  desc12.putUnitDouble( idVrtc, idPxl, 0.000000 );
  var idOfst = charIDToTypeID( "Ofst" );
  desc11.putObject( idOfst, idOfst, desc12 );
  executeAction( idPlc, desc11, DialogModes.NO );

}


Resize : Function to resize any layer
  // Document Selection
  var doc = app.activeDocument;

  // Resize image
  var itemWidth = doc.activeLayer.bounds[2].value - app.activeDocument.activeLayer.bounds[0].value;
  var resizeRatio = targetWidth / itemWidth * 180;
  doc.activeLayer.resize(resizeRatio, resizeRatio, AnchorPosition.MIDDLECENTER);

  // Move inside group
  placeInGroup(doc.activeLayer, targetGroupName);