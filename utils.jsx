////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function openAsLayer(docRef) {

    if ( app.documents.length > 0 ) {
        var doc = docRef;
        if ( doc.layers.length == 1 && doc.activeLayer.isBackgroundLayer ) {

            doc.activeLayer.isBackgroundLayer = false;
            doc.activeLayer.name = doc.name;

        }

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function convertColorProfileToSRGB (docRef) {

    docRef.convertProfile("sRGB IEC61966-2.1", Intent.RELATIVECOLORIMETRIC, true, false);

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function exportDocumentsAsPNG (documentsArray, path) {

    if(documentsArray == undefined) documentsArray = app.documents;

    for (var i = 0; i < documentsArray.length; i ++) {

        exportCopyAsPNG(documentsArray[i], docRefPath, undefined);

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function exportCopyAsPNG(selectedDocument, filePath, fileName, filePreffix, fileSuffix) {

    app.activeDocument = selectedDocument;

    if (filePath === undefined) {
       filePath = selectedDocument.path;
    }

    if (fileName === undefined) {
        fileName = selectedDocument.name;
    }

    if (fileSuffix !== undefined) {
        fileName = fileName + "_" + fileSuffix;
    }

    if (filePreffix !== undefined) {
        fileName = filePreffix + fileName;
    }

    convertColorProfileToSRGB(selectedDocument);

    var saveIn = File(filePath + "/" + fileName + ".png");

    var saveOptions = new ExportOptionsSaveForWeb;
    saveOptions.format = SaveDocumentType.PNG;
    saveOptions.PNG8 = false;
    saveOptions.transparency = true;
    saveOptions.interlaced = false;
    saveOptions.includeProfile = true;

    selectedDocument.exportDocument(saveIn, ExportType.SAVEFORWEB, saveOptions);

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function duplicateDocument (selectedDocument, documentSuffix) {

    var fullFileName = selectedDocument.name;
    var fileName = fullFileName.substr(0, fullFileName.lastIndexOf("."));
    var fileExtension = fullFileName.substr(fullFileName.lastIndexOf("."), fullFileName.length);
    
    if(documentSuffix) {

        fileName = fileName + "_" + documentSuffix;

    }
    
    var duplicatedDocument = selectedDocument.duplicate(fileName);
    duplicatedDocument.activeLayer.isBackgroundLayer = false;

    return duplicatedDocument;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function resizeImageToFillCanvas(selectedDocument, targetCanvasWidth, targetCanvasHeight) {

    var targetCanvasWidth = new UnitValue(targetCanvasWidth, 'px');
    var targetCanvasHeight = new UnitValue(targetCanvasHeight, 'px');

    activeDocument = selectedDocument;

    var doc = selectedDocument;

    var docHeight = doc.height.value;
    var docWidth = doc.width.value;
    var docAspectRatio = docWidth / docHeight;

    var targetCanvasAspectRatio = targetCanvasWidth / targetCanvasHeight; 

    if(targetCanvasAspectRatio < docAspectRatio) {
        var targetHeight = targetCanvasHeight;
        var targetWidth = targetHeight * docAspectRatio;
    } else {
        var targetWidth = targetCanvasWidth;
        var targetHeight = targetWidth / docAspectRatio;
    }

    doc.resizeImage(targetWidth, targetHeight, 72, ResampleMethod.AUTOMATIC);

    doc.resizeCanvas(targetCanvasWidth, targetCanvasHeight);

    runMenuItem(app.charIDToTypeID("FtOn"));

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function resizeImageToFitCanvas(selectedDocument, targetCanvasWidth, targetCanvasHeight) {

    activeDocument = selectedDocument;

    var doc = selectedDocument;

    var docHeight = doc.height.value;
    var docWidth = doc.width.value;
    var docAspectRatio = docWidth / docHeight;

    var targetCanvasAspectRatio = targetCanvasWidth / targetCanvasHeight; 

    if(targetCanvasAspectRatio > docAspectRatio) {
        var targetHeight = targetCanvasHeight;
        var targetWidth = targetHeight * docAspectRatio;
    } else {
        var targetWidth = targetCanvasWidth;
        var targetHeight = targetWidth / docAspectRatio;
    }

    doc.resizeImage(targetWidth, targetHeight, 72, ResampleMethod.AUTOMATIC);

    doc.resizeCanvas(targetCanvasWidth, targetCanvasHeight);

    runMenuItem(app.charIDToTypeID("FtOn"));

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function copyActiveLayerFromSourceToTarget(sourceDocument, targetDocument) {

    app.activeDocument = sourceDocument;

    sourceDocument.activeLayer.duplicate(targetDocument.activeLayer, ElementPlacement.PLACEBEFORE);

    app.activeDocument = targetDocument;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function placeFile(filePath, relativeTargetHeight, xPosition, yPosition, anchorPosition) {

    var file = new File(filePath);
    layer = addFile(file);

    /// Resize layer
    var layerRelativeHeight = new UnitValue(layer.bounds[3].value - layer.bounds[1].value, 'px') / app.activeDocument.height;
    var resizeRatio = relativeTargetHeight / layerRelativeHeight * 100 ;
    layer.resize(resizeRatio, resizeRatio, AnchorPosition.MIDDLECENTER);

    translateLayerTo(layer, xPosition, yPosition, anchorPosition);

    return layer;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Translates selectedLayer to given position

function translateLayerTo(selectedLayer, xPosition, yPosition, anchorPosition) {

    xPosition = new UnitValue (xPosition, 'px');
    yPosition = new UnitValue (yPosition, 'px');

    var bounds = selectedLayer.bounds;
    var width = bounds[2] - bounds[0];
    var height = bounds[3] - bounds[1];

    switch (anchorPosition) {
        case "topleft":
        dX = xPosition - bounds[0];
        dY = yPosition - bounds[1];
        break;
        
        case "topcenter":
        dX = xPosition - bounds[0] - width /2;
        dY = yPosition - bounds[1];
        break;

        case "topright":
        dX = xPosition - bounds[0] - width;
        dY = yPosition - bounds[1];
        break;

        case "middleleft":
        dX = xPosition - bounds[0];
        dY = yPosition - bounds[1] - height / 2;
        break;

        case "middlecenter":
        dX = xPosition - bounds[0] - width / 2;
        dY = yPosition - bounds[1] - height / 2;
        break;

        case "middleright":
        dX = xPosition - bounds[0] - width;
        dY = yPosition - bounds[1] - height / 2;
        break;

        case "bottomleft":
        dX = xPosition - bounds[0];
        dY = yPosition - bounds[1] - height;
        break;
        
        case "bottomcenter":
        dX = xPosition - bounds[0] - width / 2;
        dY = yPosition - bounds[1] - height;
        break;

        case "bottomright":
        dX = xPosition - bounds[0] - width;
        dY = yPosition - bounds[1] - height;
        break;

        default:
        dX = xPosition - bounds[0] - width / 2;
        dY = yPosition - bounds[1] - height / 2;

    }
    
    selectedLayer.translate(dX,dY);
    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function resizeLayerToFillDimensions (selectedLayer, placeholderWidth, placeholderHeight) {

    var placeholderWidth = new UnitValue (placeholderWidth, 'px');
    var placeholderHeight = new UnitValue (placeholderHeight, 'px');
    var placeholderAspectRatio = placeholderWidth / placeholderHeight;

    // Resize layers
    var layerWidth = new UnitValue(selectedLayer.bounds[2].value - selectedLayer.bounds[0].value, 'px');
    var layerHeight = new UnitValue(selectedLayer.bounds[3].value - selectedLayer.bounds[1].value, 'px');
    var layerAspectRatio = layerWidth / layerHeight;

    if(placeholderAspectRatio < layerAspectRatio) {

        var resizeRatio = placeholderHeight / layerHeight * 100;

    } else {

        var resizeRatio = placeholderWidth / layerWidth * 100;

    }

    activeDocument.artLayers.add().remove();

    selectedLayer.resize(resizeRatio, resizeRatio, AnchorPosition.MIDDLECENTER);

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// resizeLayerToFitDimensions (app.activeDocument.activeLayer, 1000, 1000);

function resizeLayerToFitDimensions (selectedLayer, placeholderWidth, placeholderHeight) {

    var placeholderWidth = new UnitValue (placeholderWidth, 'px');
    var placeholderHeight = new UnitValue (placeholderHeight, 'px');
    var placeholderAspectRatio = placeholderWidth / placeholderHeight;

    // Resize layers
    var layerWidth = new UnitValue(selectedLayer.bounds[2].value - selectedLayer.bounds[0].value, 'px');
    var layerHeight = new UnitValue(selectedLayer.bounds[3].value - selectedLayer.bounds[1].value, 'px');
    var layerAspectRatio = layerWidth / layerHeight;

    if(placeholderAspectRatio > layerAspectRatio) {

        var resizeRatio = placeholderHeight / layerHeight * 100;

    } else {

        var resizeRatio = placeholderWidth / layerWidth * 100;

    }

    activeDocument.artLayers.add().remove();

    selectedLayer.resize(resizeRatio, resizeRatio, AnchorPosition.MIDDLECENTER);

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addLayerToLayerSet (layer, layerSetPath) {

    var layerSetHierarchy = layerSetPath.split('/');

    var currentLayerSet = app.activeDocument;

    for (var i = 0; i < layerSetHierarchy.length; i ++) {

        var parentLayerSet = currentLayerSet;

        currentLayerSet = findLayerSet (parentLayerSet, layerSetHierarchy[i]);

        if (currentLayerSet == false )    {

            currentLayerSet = parentLayerSet.layerSets.add();
            currentLayerSet.name = layerSetHierarchy[i];

        }

    }

    // Move inside the layerset
    var dummieGroup = currentLayerSet.layerSets.add();
    layer.move(dummieGroup, ElementPlacement.PLACEBEFORE);
    dummieGroup.remove();

    return currentLayerSet;

    function findLayerSet (obj, layerSetName) { // obj is document or layerSet. One layerSet includes LayerSets
    
        for (var a = 0; a < obj.layerSets.length; a++) {

            if (String(obj.layerSets[a].name) == layerSetName) {

                return obj.layerSets.getByName(layerSetName);

            }

        }

        return false;

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function moveLayerInsideLayerset (sourceLayer, targetLayerSet) {

    var dummieGroup = targetLayerSet.layerSets.add();
    sourceLayer.move(dummieGroup, ElementPlacement.PLACEBEFORE);
    dummieGroup.remove();

    return targetLayerSet;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function findLayerSet (parentLayerSet, layerSetName)   {

    for (var i = 0; i < parentLayerSet.layerSets.length; i++) {

        if(foundedLayer) break;

        if(String(parentLayerSet.layerSets[i].name) == layerSetName) {
            
            return parentLayerSet.layerSets.getByName(layerSetName);

        }   else    {

            var foundedLayer = findLayerSet(parentLayerSet.layerSets[i], layerSetName)

        }

    }

    return foundedLayer;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function findSettingHexColor(colorName) {

    var colorReferenceTable = [
        {colorName: "Red",      hexColor: "CA0000"},
        {colorName: "Orange",   hexColor: "FF6400"},
        {colorName: "Yellow",   hexColor: "FFE000"},
        {colorName: "Green",    hexColor: "009300"},
        {colorName: "Aqua",     hexColor: "00D3B8"},
        {colorName: "Blue",     hexColor: "0083F3"},
        {colorName: "Purple",   hexColor: "7400EF"},
        {colorName: "Magenta",  hexColor: "FF008A"},
    ]

    for (var i=0; i<colorReferenceTable.length; i++) {

        if(colorName.match(colorReferenceTable[i].colorName)){
            return colorReferenceTable[i].hexColor;
        }

    }

    return "8C8C8C";

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getLayerProperties(layer) {

    var layerProperties = new Object();

    layerProperties['width'] = layer.bounds[2] - layer.bounds[0];
    layerProperties['width'] = layer.bounds[2] - layer.bounds[0];
    layerProperties['width'] = layer.bounds[2] - layer.bounds[0];
    layerProperties['width'] = layer.bounds[2] - layer.bounds[0];
    layerProperties['width'] = layer.bounds[2] - layer.bounds[0];
    

    return { 
        width : layer.bounds[2] - layer.bounds[0],
        height : layer.bounds[3] - layer.bounds[1],
        right: layer.bounds[2],
        left: layer.bounds[0],
        top: layer.bounds[1],
        bottom: layer.bounds[3],
        topleft: Array(layer.bounds[0], layer.bounds[1]),
        topright: [layer.bounds[2], layer.bounds[1]],
        bottomleft: [layer.bounds[0], layer.bounds[3]],
        bottomright: [layer.bounds[2], layer.bounds[3]]
    };
    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function placeFileRandomly(filePath)    {

    var layer = addFile(filePath);

    translateLayerRandomly(layer);

    return layer;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function translateLayerRandomly(layer) {

    var layerRandomCoordinates = getLayerRandomCoordinates(layer);

    translateLayerTo(layer, layerRandomCoordinates.xPosition, layerRandomCoordinates.yPosition, "topleft");

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getLayerRandomCoordinates(layer) {

    var docWidth = app.activeDocument.width;
    var docHeight = app.activeDocument.height;

    var layerProperties = getLayerProperties(layer);
    var layerWidth = layerProperties.width;
    var layerHeight = layerProperties.height;

    randomXPosition = - Math.floor(Math.random() * (layerWidth - docWidth));
    randomYPosition = - Math.floor(Math.random() * (layerHeight - docHeight));

    return { 
        'xPosition': randomXPosition, 
        'yPosition': randomYPosition
    };

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showSelectedLayer( layerName, showOnlyThisLayer) {

    var actionDescriptor = new ActionDescriptor();
        var layerDescriptor = new ActionList();
            var reference = new ActionReference();
            if(layerName) {
                reference.putName( charIDToTypeID( "Lyr " ), layerName );
            }   else{
                reference.putEnumerated( charIDToTypeID( "Lyr " ), stringIDToTypeID("ordinal"), charIDToTypeID( "Trgt" ) );
            }
            layerDescriptor.putReference( reference );
        actionDescriptor.putList( stringIDToTypeID("null"), layerDescriptor );
    if(showOnlyThisLayer == true) {
        actionDescriptor.putBoolean( charIDToTypeID( "TglO" ), true );
    }
    
    executeAction( charIDToTypeID( "Shw " ), actionDescriptor, DialogModes.NO );

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function selectAllLayers() {

    var reference = new ActionReference();
    reference.putEnumerated( charIDToTypeID( "Lyr " ), stringIDToTypeID("ordinal"), charIDToTypeID( "Trgt" ) );

    var actionDescriptor = new ActionDescriptor();
    actionDescriptor.putReference( stringIDToTypeID("null"), reference );
    
    executeAction( stringIDToTypeID( "selectAllLayers" ), actionDescriptor, DialogModes.NO );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showLayers() {

    var reference = new ActionReference();
    reference.putEnumerated( charIDToTypeID( "Lyr " ), stringIDToTypeID("ordinal"), charIDToTypeID( "Trgt" ) );

    var listDescriptor = new ActionList();
    listDescriptor.putReference( reference );
    
    var actionDescriptor = new ActionDescriptor();
    actionDescriptor.putList( stringIDToTypeID("null"), listDescriptor );
    
    executeAction( charIDToTypeID( "Shw " ), actionDescriptor, DialogModes.NO );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showAllLayers() {

    var layer = app.activeDocument.activeLayer;

    selectAllLayers();
    showLayers();

    app.activeDocument.activeLayer = layer;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function standardPosition (standardPositionName) {

    var docWidth = app.activeDocument.width;
    var docHeight = app.activeDocument.height;

    switch (standardPositionName) {

        case 'topleft':
        var xPosition = docWidth / 24;
        var yPosition = docWidth / 24;
        var anchorPosition = "topleft";
        break;

        case 'topcenter':
        var xPosition = docWidth / 2;
        var yPosition = docWidth / 24;
        var anchorPosition = "topcenter";
        break;

        case 'topright':
        var xPosition = docWidth - docWidth * 2 / 24;
        var yPosition = docWidth / 24;
        var anchorPosition = "topright";
        break;

        case 'middleleft':
        var xPosition = docWidth / 24;
        var yPosition = docHeight / 2;
        var anchorPosition = "middleleft";
        break;

        case 'middlecenter':
        var xPosition = docWidth / 2;
        var yPosition = docHeight / 2;
        var anchorPosition = "middlecenter";
        break;

        case 'middleright':
        var xPosition = docWidth - docWidth * 2 / 24;
        var yPosition = docHeight / 2;
        var anchorPosition = "middleright";
        break;

        case 'bottomleft':
        var xPosition = docWidth / 24;
        var yPosition = docHeight - docWidth / 24;
        var anchorPosition = "bottomleft";
        break;

        case 'bottomcenter':
        var xPosition = docWidth / 2;
        var yPosition = docHeight - docWidth / 24;
        var anchorPosition = "bottomcenter";
        break;

        case 'bottomright':
        var xPosition = docWidth - docWidth * 2 / 24;
        var yPosition = docHeight - docWidth / 24;
        var anchorPosition = "bottomright";
        break;

        case 'center':
        var xPosition = docWidth / 2;
        var yPosition = docHeight / 2;
        var anchorPosition = "middlecenter";
        break;

        case 'leftsidebar':
        var xPosition = docWidth * 3 /8;
        var yPosition = docHeight / 2;
        var anchorPosition = "middleright";
        

    }

    return {
        'xPosition' : xPosition,
        'yPosition' : yPosition,
        'anchorPosition' : anchorPosition
    };

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addFile (filePath) {

    file = new File(filePath);

    var desc = new ActionDescriptor();
    desc.putPath(charIDToTypeID('null'), file);
    executeAction(charIDToTypeID('Plc '), desc, DialogModes.NO);

    return app.activeDocument.activeLayer;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// crop to selection
function cropToActiveLayer(){
    var activeLayerProperties = getLayerProperties(app.activeDocument.activeLayer);
    app.activeDocument.selection.select([activeLayerProperties.topleft, activeLayerProperties.topright, activeLayerProperties.bottomright, activeLayerProperties.bottomleft]);   
    executeAction( charIDToTypeID( "Crop" ), new ActionDescriptor(), DialogModes.NO );
    app.activeDocument.selection.deselect();
}
