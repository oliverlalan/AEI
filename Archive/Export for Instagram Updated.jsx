#target photoshop

// Global variables
var presetNameList = ["SCF01", "SCF02", "SCF03", "SCF04", "SCF05", "SCF06", "SCF07", "SCF08", "SCF09", "SCF10", "SCF11", "SCF12", 
"SMF01", "SMF02", "SMF03", "SMF04", "SMF05"]; // TODO: Create a way of reading the list in the Presets Inventory
var presetPackList = ["Shugan Color Film", "Shugan Mono  Film"];

var targetWidth = 1080;
var targetHeight = 1350;

var fontSize = new UnitValue(30, 'px');
var textColor = new SolidColor();
textColor.rgb.hexValue = "FFFFFF";
var fontName = "WorkSansRoman-Light";
var fontTracking = 50;

var docRef = activeDocument;
var docRefPath = activeDocument.path;
var docRefName = activeDocument.name.replace(/(?:\.[^.]*$|$)/, '');



// // Open documents
// openAsLayer();
// var docRef_unedited = openUneditedRAW(docRef, "_unedited");


// // Convert color profile to sRGB
// convertColorProfileToSRGB(docRef);
// convertColorProfileToSRGB(docRef_unedited);

// // Export copy full size
// exportCopyAsPNG(docRef, docRefPath, undefined,  undefined, undefined);


// // Export instagram version
// var docRef_before = duplicateDocument(docRef_unedited, docRef.name + "_before");
// var docRef_after = duplicateDocument(docRef, "_after");
// resizeImageToFitCanvas(docRef_before, targetWidth, targetHeight);
// resizeImageToFitCanvas(docRef_after, targetWidth, targetHeight);
// // exportCopyAsPNG(docRef_after, docRefPath, undefined,  "instagram_", undefined)


// // Resize to desired working size
// resizeImageToFillCanvas(docRef_unedited, targetWidth, targetHeight);
// resizeImageToFillCanvas(docRef, targetWidth, targetHeight);


// // Create beforeAfter_split_horizontal overlays
// var docRef_beforeAfter_split_horizontal = duplicateDocument(docRef, "_beforeAfter_split_horizontal");
// copyActiveLayerFromSourceToTarget(docRef_unedited, docRef_beforeAfter_split_horizontal);
// addMask('horizontal');
// activeDocument = docRef_beforeAfter_split_horizontal;
// addFile("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Design Overlays/Overlay - beforeAfter_split_horizontal.png");
// translateLayerTo(activeDocument.activeLayer, UnitValue(0, 'px'), UnitValue(0, 'px'), "topleft");
// activeDocument = docRef_beforeAfter_split_horizontal;
// // placeFile("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Logos/ChainCircle x Raleway_White - Horizontal.ai", 1 / 30, 1035, 1305, "bottomright");
// // exportCopyAsPNG(docRef_beforeAfter_split_horizontal, docRefPath, undefined,  "instagram_", undefined)


// // Create beforeAfter_split_vertical overlays
// var docRef_beforeAfter_split_vertical = duplicateDocument(docRef, "_beforeAfter_split_vertical");
// copyActiveLayerFromSourceToTarget(docRef_unedited, docRef_beforeAfter_split_vertical);
// addMask('vertical');
// activeDocument = docRef_beforeAfter_split_vertical;
// addFile("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Design Overlays/Overlay - beforeAfter_split_vertical.png");
// translateLayerTo(activeDocument.activeLayer, UnitValue(0, 'px'), UnitValue(0, 'px'), "topleft");
// activeDocument = docRef_beforeAfter_split_vertical;
// // placeFile("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Logos/ChainCircle x Raleway_White - Horizontal.ai", 1 / 30, 1035, 1305, "bottomright");
// // exportCopyAsPNG(docRef_beforeAfter_split_vertical, docRefPath, undefined,  "instagram_", undefined)


// // Create beforeAfter_sideBySide_horizontal overlays
// var docRef_beforeAfter_sideBySide_horizontal = duplicateDocument(docRef, "_beforeAfter_sideBySide_horizontal");
// activeDocument = docRef_beforeAfter_sideBySide_horizontal;
// resizeLayerToFillDimensions(activeDocument.activeLayer, targetWidth, targetHeight / 2);
// translateLayerTo(activeDocument.activeLayer, targetWidth / 2, targetHeight * 3 / 4, "middlecenter");
// copyActiveLayerFromSourceToTarget(docRef_unedited, docRef_beforeAfter_sideBySide_horizontal);
// resizeLayerToFillDimensions(activeDocument.activeLayer, targetWidth, targetHeight / 2);
// translateLayerTo(activeDocument.activeLayer, targetWidth / 2, targetHeight / 4, "middlecenter");
// addMask('horizontal');
// activeDocument = docRef_beforeAfter_sideBySide_horizontal;
// addFile("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Design Overlays/Overlay - beforeAfter_sideBySide_horizontal.png");
// translateLayerTo(activeDocument.activeLayer, UnitValue(0, 'px'), UnitValue(0, 'px'), "topleft");
// activeDocument = docRef_beforeAfter_sideBySide_horizontal;
// // placeFile("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Logos/ChainCircle x Raleway_White - Horizontal.ai", 1 / 30, 1035, 1305, "bottomright");
// // exportCopyAsPNG(docRef_beforeAfter_sideBySide_horizontal, docRefPath, undefined,  "instagram_", undefined)


// // Create beforeAfter_sideBySide_vetical overlays
// var docRef_beforeAfter_sideBySide_vertical = duplicateDocument(docRef, "_beforeAfter_sideBySide_vertical");
// activeDocument = docRef_beforeAfter_sideBySide_vertical;
// resizeLayerToFillDimensions(activeDocument.activeLayer, targetWidth / 2, targetHeight);
// translateLayerTo(activeDocument.activeLayer, targetWidth * 3 / 4, targetHeight / 2, "middlecenter");
// copyActiveLayerFromSourceToTarget(docRef_unedited, docRef_beforeAfter_sideBySide_vertical);
// resizeLayerToFillDimensions(activeDocument.activeLayer, targetWidth / 2, targetHeight);
// translateLayerTo(activeDocument.activeLayer, targetWidth / 4, targetHeight / 2, "middlecenter")
// addMask('vertical');
// activeDocument = docRef_beforeAfter_sideBySide_vertical;
// addFile("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Design Overlays/Overlay - beforeAfter_sideBySide_vertical.png");
// translateLayerTo(activeDocument.activeLayer, UnitValue(0, 'px'), UnitValue(0, 'px'), "topleft");
// activeDocument = docRef_beforeAfter_sideBySide_vertical;
// // placeFile("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Logos/ChainCircle x Raleway_White - Horizontal.ai", 1 / 30, 1035, 1305, "bottomright");
// // exportCopyAsPNG(docRef_beforeAfter_sideBySide_vertical, docRefPath, undefined,  "instagram_", undefined)


// // Edit settings
// var docRef_settings = duplicateDocument(docRef, "_settings");
// activeDocument = docRef_settings;
// makeDarkerNoisierBlurier(10, 2, 128); //blur, noise, dark
// addPresetOverlay();
// placeFile("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Logos/ChainCircle x Raleway_White - Horizontal.ai", 1 / 30, 1035, 1305, "bottomright");
// // exportCopyAsPNG(docRef_settings, docRefPath, undefined,  "instagram_", undefined)


// // Edit metadata
// var docRef_metadata = duplicateDocument(docRef, "_metadata");
// activeDocument = docRef_metadata;
// makeDarkerNoisierBlurier(10, 2, 128);
// addMetadataList([272, 42036, 37377, 37378, 34855, 37386, 'location', 'date', 'caption'], fontSize, textColor, fontName, fontTracking);
// placeFile("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Logos/ChainCircle x Raleway_White - Horizontal.ai", 1 / 30, 1035, 1305, "bottomright");
// // exportCopyAsPNG(docRef_metadata, docRefPath, undefined,  "instagram_", undefined)


// //Preset info
// var docRef_presetInfo = duplicateDocument(docRef, "_preset");
// makeDarkerNoisierBlurier(0, 0, 128);
// addFile("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Design Overlays/Overlay - preset.png");
// addPresetInfo(activeDocument, "presetPack", 48, textColor, "WorkSansRoman-Bold", 300, 540, 585, "bottomcenter");
// addPresetInfo(activeDocument, "preset", 200, textColor, "WorkSansRoman-Thin", 200, 540, 315, "topcenter");
// // placeFile("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Logos/ChainCircle x Raleway_White - Vertical.ai", 1 / 30, 810, 1260, "topleft");


// // Expot copies target size
// for (selectedDocument = 2; selectedDocument<app.documents.length; selectedDocument++) {
//     exportCopyAsPNG (app.documents[selectedDocument], docRefPath, undefined,  "instagram_", undefined);
// }
// exportCopyAsPNG(docRef, docRefPath, undefined,  "instagram_", undefined);
// exportCopyAsPNG(docRef_unedited, docRefPath, undefined,  "instagram_", undefined);
// exportCopyAsPNG(docRef_beforeAfter_split_vertical, docRefPath, undefined,  "instagram_", undefined);
// exportCopyAsPNG(docRef_settings, docRefPath, undefined,  "instagram_", undefined);
// exportCopyAsPNG(docRef_metadata, docRefPath, undefined,  "instagram_", undefined);

function openAsLayer(docRef) {

    if ( app.documents.length > 0 ) {
        var doc = docRef;
        if ( doc.layers.length == 1 && doc.activeLayer.isBackgroundLayer ) {

            doc.activeLayer.isBackgroundLayer = false;
            doc.activeLayer.name = doc.name;

        }

    }

}

function convertColorProfileToSRGB (selectedDocument) {

    selectedDocument.convertProfile("sRGB IEC61966-2.1", Intent.RELATIVECOLORIMETRIC, true, false);

}

function duplicateDocument (selectedDocument, documentSuffix) {

    var doc = selectedDocument;
    var fullFileName = doc.name;
    var fileName = fullFileName.substr(0, fullFileName.lastIndexOf("."));
    var fileExtension = fullFileName.substr(fullFileName.lastIndexOf("."), fullFileName.length);
    
    if(documentSuffix) {
        fileName = fileName + documentSuffix;
    }
    
    doc.duplicate(fileName);

    activeDocument.activeLayer.isBackgroundLayer = false;

    return activeDocument;

}

function exportCopyAsPNG(selectedDocument, filePath, fileName, filePreffix, fileSuffix) {

    activeDocument = selectedDocument;

    if (filePath === undefined) {
       filePath = selectedDocument.path;
    }

    if (fileName === undefined) {
        fileName = selectedDocument.name.replace(/(?:\.[^.]*$|$)/, '');
    }

    if (fileSuffix !== undefined) {
        fileName = fileName + fileSuffix;
    }

    if (filePreffix !== undefined) {
        fileName = filePreffix + fileName;
    }

    convertColorProfileToSRGB(selectedDocument);

    var saveIn = File(filePath + "/" + fileName + ".png");

    var saveOptions = new ExportOptionsSaveForWeb;
    saveOptions.format = SaveDocumentType.PNG;
    saveOptions.PNG8 = true;
    saveOptions.transparency = true;
    saveOptions.interlaced = false;
    saveOptions.includeProfile = true;

    selectedDocument.exportDocument(saveIn, ExportType.SAVEFORWEB, saveOptions);

}

function openUneditedRAW(selectedDocument, documentSuffix) {

    selectedFile = new File(selectedDocument.fullName);

    var openRAWOptions = new CameraRAWOpenOptions;
    openRAWOptions.settings = CameraRAWSettingsType.CAMERA;

    var uneditedDocument = open(selectedFile, openRAWOptions, true);
    var uneditedDocumentName = selectedDocument.name.replace(/(?:\.[^.]*$|$)/, '') + documentSuffix;
    
    var uneditedLayer = uneditedDocument.activeLayer;
    uneditedLayer.name = uneditedDocumentName;
    uneditedDocument.duplicate((uneditedDocumentName), true);
    uneditedDocument.close(SaveOptions.DONOTSAVECHANGES); // (SaveOptions.SAVECHANGES)

    return activeDocument;

}

function copyActiveLayerFromSourceToTarget(sourceDocument, targetDocument) {

    app.activeDocument = sourceDocument;

    sourceDocument.activeLayer.duplicate(targetDocument.activeLayer, ElementPlacement.PLACEBEFORE);

    app.activeDocument = targetDocument;

}

function addMask(fillShape){

    try {

        makeSelection(fillShape);
        addLayerMask();

    }   catch (e)   {

        deleteLayerMask(true);

    }

    function makeSelection (fillDesign) {

        // Store doc dimensions
        var docRef = app.activeDocument;
        var docHeight = docRef.height;
        var docWidth = docRef.width;

        //(topleft, bottomleft, bottomright, topright)
        switch (fillDesign) {

            case 'horizontal':
            var shapeRef = [ [0, docHeight/2], [0, docHeight], [docWidth, docHeight], [docWidth, docHeight / 2]];
            break;

            case 'vertical':
            var shapeRef = [ [docWidth/2, 0], [docWidth/2, docHeight], [docWidth, docHeight], [docWidth, 0]];
            break;

            case 'diagonal':
            var shapeRef = [ [docWidth/2, 0], [docWidth/2, docHeight], [docWidth, docHeight], [docWidth, 0]]; //TODO: path?
            break;

        }
        
        app.activeDocument.selection.select(shapeRef);

    }

    function addLayerMask() {

        var descriptor = new ActionDescriptor();
        var reference = new ActionReference();

        descriptor.putClass( stringIDToTypeID( "new" ), stringIDToTypeID( "channel" ));
        reference.putEnumerated( stringIDToTypeID( "channel" ), stringIDToTypeID( "channel" ), stringIDToTypeID( "mask" ));
        descriptor.putReference( stringIDToTypeID( "at" ), reference );
        descriptor.putEnumerated( stringIDToTypeID( "using" ), charIDToTypeID( "UsrM" ), stringIDToTypeID( "revealSelection" ));
        executeAction( stringIDToTypeID( "make" ), descriptor, DialogModes.NO );

    }

    function deleteLayerMask(apply) {

        var descriptor = new ActionDescriptor();
        var reference = new ActionReference();

        reference.putEnumerated( stringIDToTypeID( "channel" ), stringIDToTypeID( "channel" ), stringIDToTypeID( "mask" ));
        descriptor.putReference( charIDToTypeID( "null" ), reference );
        descriptor.putBoolean( stringIDToTypeID( "apply" ), apply );
        executeAction( stringIDToTypeID( "delete" ), descriptor, DialogModes.NO );

    }

};

function resizeImageToFillCanvas(selectedDocument, targetCanvasWidth, targetCanvasHeight) {

    targetCanvasWidth = new UnitValue (targetCanvasWidth, 'px');
    targetCanvasHeight = new UnitValue (targetCanvasHeight, 'px');

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

}

function resizeImageToFitCanvas(selectedDocument, targetCanvasWidth, targetCanvasHeight) {

    targetCanvasWidth = new UnitValue (targetCanvasWidth, 'px');
    targetCanvasHeight = new UnitValue (targetCanvasHeight, 'px');

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

}

function addPresetOverlay () {
    var doc = activeDocument;
    var docPresetInfo = findPresetInfoInKeywords(doc);

    placeFile("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Logos/ChainCircle x Raleway_White - Horizontal.ai", 1 / 30, 1035, 1305, "bottomright");

    if(docPresetInfo.presetPackName && docPresetInfo.presetName){
        
        var selectedFiles = getPresetOverlayFiles(docPresetInfo.presetPackName, docPresetInfo.presetName);
        //app.openDialog();
        //var selectedFile = "D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Presets Overlays/" + docPresetPackNameKeywords[0] + ".png";

        for (i = 0; i < selectedFiles.length; i++) {
            addFile(selectedFiles[i]);
            
            if(selectedFiles.length - i > 1) {
                duplicateDocument(doc, doc.name + "-" + (i+1));
                activeDocument.layers[0].remove();
            }
        }

    } else {
        alert('None or more than one presetNames in doc.')
    }
}

function getPresetOverlayFiles (presetPack, presetName) {

    var availablePresetOverlaysPaths = Folder("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Lightroom Presets/Overlays/").getFiles("*.png");

    var presetOverlayPaths = [];

    for (i=0; i < availablePresetOverlaysPaths.length; i++) {
        var exp = new RegExp(presetPack + " - " + presetName, "g");
        
        if(availablePresetOverlaysPaths[i].displayName.match(exp) !== null){
            presetOverlayPaths.push(availablePresetOverlaysPaths[i]);
        }
    }

    return presetOverlayPaths;

}

function findPresetInfoInKeywords (docRef) {

    var doc = docRef;
    var docKeywords = doc.info.keywords;

    for (var i=0; i<docKeywords.length; i++) {
        for (var j=0; j<presetPackList.length; j++){
            if(docKeywords[i] == presetPackList[j]) {
                var docPresetPackName = docKeywords[i];
            }
        }
    }

    for (var i=0; i<docKeywords.length; i++) {
        for (var j=0; j<presetNameList.length; j++){
            if(docKeywords[i] == presetNameList[j]) {
                var docPresetName = docKeywords[i];
            }
        }
    }

    return { 
        'presetPackName': docPresetPackName, 
        'presetName': docPresetName};

}

function addFile (filePath) {

    file = new File(filePath);

    var desc = new ActionDescriptor();
    desc.putPath(charIDToTypeID('null'), file);
    desc.putEnumerated(charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa'));
        var offsetDesc = new ActionDescriptor();
        offsetDesc.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0.000000);
        offsetDesc.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0.000000);
    desc.putObject(charIDToTypeID('Ofst'),  charIDToTypeID('Ofst'), offsetDesc);
    executeAction(charIDToTypeID('Plc '), desc, DialogModes.NO);

    return app.activeDocument.activeLayer;

}


function getExifContentByExifTag (selectedDocument, exifTag) {
    exifData = selectedDocument.info.exif;
    for (var i = 0; i < exifData.length; i++) {
        var exifItem = exifData[i];
        if (exifItem[2] == exifTag) {
            return exifData[i][1];
        }
    }
}

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

function returnMonth(monthNumber) {
    var month = new Array();
    month[0] = "Unknown";
    month[1] = "Enero"	;
    month[2] = "Febrero";
    month[3] = "Marzo";
    month[4] = "Abril";
    month[5] = "Mayo";
    month[6] = "Junio";
    month[7] = "Julio";
    month[8] = "Agosto";
    month[9] = "Septiembre";
    month[10] = "Octubre";
    month[11] = "Noviembre";
    month[12] = "Diciembre";

    return month[monthNumber];

}

// Based on https://www.codeproject.com/Questions/882480/Place-Embedded-through-photoshop-scripting-Javascr
function addIcon (exifTag, targetWidth) {

    // Document definition
    var doc = activeDocument;

    // Layer definition and renaming
    addFile("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Icons/" + exifTag + ".svg");
    var iconLayer = doc.activeLayer;
    iconLayer.name = exifTag + ' icon';

    // Resize image
    var imageWidth = new UnitValue(iconLayer.bounds[2].value - iconLayer.bounds[0].value, 'px');
    var resizeRatio = targetWidth / imageWidth * 100;
    iconLayer.resize(resizeRatio, resizeRatio, AnchorPosition.MIDDLECENTER);

}

function addMetadataValue (exifTag, fontSize, textColor, fontName, fontTracking) {

    // Document selection
    var doc = activeDocument;

    // Layer definition
    var metadataLayer = doc.artLayers.add();
    metadataLayer.name = exifTag + ' metadata';
    metadataLayer.kind = LayerKind.TEXT;

    // Text Item definition
    var textItemRef = metadataLayer.textItem;
    textItemRef.size = fontSize; // There is a bug. textItem.size always converts "px" to "pt".  https://community.adobe.com/t5/photoshop-ecosystem-discussions/photoshop-script-change-textitem-size-javascript/td-p/11478075
    textItemRef.color = textColor;
    textItemRef.font = fontName;
    textItemRef.tracking = fontTracking;

    // Text content
    // Exif entry index (Variable and Value) for the desired exifTag as defined in https://web.archive.org/web/20190624045241if_/http://www.cipa.jp:80/std/documents/e/DC-008-Translation-2019-E.pdf
    try{
        var exifContent = getExifContentByExifTag(activeDocument, exifTag).replace(/(\r\n|\n|\r)/gm, "");
    } 
    catch (e) {}

    switch (exifTag) {

        case 'location':
        if(doc.info.city == "" && doc.info.country == "") {
            textItemRef.contents = "";
        } else if (doc.info.city == "") {
            textItemRef.contents = doc.info.country;
        } else {
            textItemRef.contents = doc.info.city + ", " + doc.info.country;
        }
        break;

        case 'GPS':
        textItemRef.contents = doc.info.exif[2][1] + doc.info.exif[1][1] + doc.info.exif[4][1] +doc.info.exif[3][1];
        break;
        
        case 'date':
        if(doc.info.creationDate=="") {
            textItemRef.contents = "";
        } else {
            var dateString = doc.info.creationDate;
            var year = dateString.substring(0,4);
            var month = parseInt(dateString.substring(4,6));
            var day = parseInt(dateString.substring(6,8)).toString();

            textItemRef.contents = returnMonth(month) + " del " + year;
        }
        break;

        case 'headline':
        textItemRef.contents = doc.info.headline;
        break;

        case 'caption':
        textItemRef.contents = doc.info.caption;
        textItemRef.kind = TextType.PARAGRAPHTEXT;
        textItemRef.justification = Justification.CENTER;
        if(textItemRef.contents != " ") {
            resizeParagraphToFitBorders(textItemRef, 135, 270, 945, 855);
        }
        break;

        case 34855: // ISO
        textItemRef.contents = "ISO " + exifContent;
        break;

        case 272: // Camera model
        textItemRef.capitalization = TextCase.ALLCAPS;
        switch (exifContent) {

            case "ILCE-6400":
            textItemRef.contents = "Sony A6400";
            break;

            case "Sony A7IV":
            textItemRef.contents = "Sony A7 Mark IV";
            break;

            case "NIKON D610":
            textItemRef.contents = "Nikon D610";
            break;

            default:
            textItemRef.contents = exifContent;
            }
        break;

        case 42036: // Lens Model
        textItemRef.capitalization = TextCase.ALLCAPS;
        switch (exifContent) {
            
            case "E 17-28mm F2.8-2.8":
            textItemRef.contents = "Tamron 17-28 F2.8";
            break;

            case "SAMYANG AF 35mm F2.8":
            textItemRef.contents = "Samyang 35 F2.8";
            break;

            case "16mm F1.4 DC DN | Contemporary 017":
            textItemRef.contents = "Sigma 16 F1.4";
            break;

            case "FE 85mm F1.8":
            textItemRef.contents = "Sony 85 F1.8";
            break;

            case "E 35-150mm F2.0-F2.8 A058":
            textItemRef.contents = "Tamron 35-150 F2-2.8";
            break;

            case ("35.0 mm f/1.8" || "TAMRON SP 35mm F1.8 Di VC USD F012N"):
            textItemRef.contents = "Tamron 35 F1.8";
            break;

            case "50.0 mm f/1.4":
            textItemRef.contents = "Nikon 50 F1.4";
            break;

            case "11.0-16.0 mm f/2.8":
            textItemRef.contents = "Tokina 11-16 F2.8";
            break;

            case "24.0-70.0 mm f/2.8":
            textItemRef.contents = "Tamron 24-70 F2.8";
            break;

            case ("70.0-200.0 mm f/2.8" || "TAMRON SP 70-200mm F2.8 Di VC USD A009N"):
            textItemRef.contents = "Tamron 70-200 F2.8";
            break;

            default:
            textItemRef.contents = exifContent;
        }
        break;

        default: // Other camera parameters
        textItemRef.contents = exifContent;
    }
}

function resizeParagraphToFitBorders(textItem, leftMargin, topMargin, rightMargin, bottomMargin) {
    // Doc parameters calculation (%)
    // var docHeight = doc.height.value;
    // var docWidth = doc.width.value;
    // var targetWidth = (1 - rightMargin - leftMargin)* docWidth;
    // var targetHeight = (1 - bottomMargin - topMargin) * docHeight;
    var targetWidth = rightMargin - leftMargin;
    var targetHeight = bottomMargin - topMargin;

    // Resize text layer
    textItem.height = new UnitValue(targetHeight, 'pt');
	textItem.width = new UnitValue(targetWidth, 'pt');

    // Fit text in margins
    if(textItem.contents != " ") {
        increaseLeadingToFitBox(activeDocument.activeLayer);
    }
    
}

// Based on https://stackoverflow.com/questions/28990505/extendscript-how-to-check-whether-text-content-overflows-the-containing-rectang
function increaseLeadingToFitBox(textLayer) {     
    textLayer.textItem.useAutoLeading = false;
    textLayer.textItem.leading = 300;

    var fitInsideBoxDimensions = getTextBoxDimensions(textLayer);

    textLayer.textItem.leading = new UnitValue(20, "px");

    do {
        var leading = parseInt(textLayer.textItem.leading);
        textLayer.textItem.leading = new UnitValue(leading * 1.05, "px"); // To decrease iterations.
    }
    while(fitInsideBoxDimensions.height > getRealTextLayerDimensions(textLayer).height);

    textLayer.textItem.leading = new UnitValue(leading, "px"); //To ensure it fits.

    function getTextBoxDimensions(layer) {
        return { 
            width : layer.textItem.width,
            height : layer.textItem.height
        };
    }

    function getRealTextLayerDimensions(textLayer) {
        var textLayerCopy = textLayer.duplicate(activeDocument, ElementPlacement.INSIDE);

        textLayerCopy.textItem.height = activeDocument.height;
        textLayerCopy.rasterize(RasterizeType.TEXTCONTENTS);

        var dimensions = getLayerDimensions(textLayerCopy);
        textLayerCopy.remove();

        return dimensions;
    }

    function getLayerDimensions(layer) {
        return { 
            width : layer.bounds[2] - layer.bounds[0],
            height : layer.bounds[3] - layer.bounds[1]
        };
    }

}

function addMetadata (exifTag, fontSize, textColor, fontName, fontTracking, includeIcon) {

    var doc = activeDocument;

    // Create group layer
    var metadataGroup = doc.layerSets.add();
    metadataGroup.name = exifTag + ' group';

    if(includeIcon == true) {
        // Add iconLayer
        addIcon(exifTag, fontSize * 1.5);
        var iconLayer = doc.layers.getByName(exifTag + ' icon');

        // Compute metadataLayer position
        var iconTextSeparation = fontSize * 1.5 * 1.5;

        var iconLayer = doc.layers.getByName(exifTag + ' icon');
        var iconWidth = iconLayer.bounds[2] - iconLayer.bounds[0];
        var iconHeight = iconLayer.bounds[3] - iconLayer.bounds[1];
        var iconXPosition = iconLayer.bounds[0] + iconWidth / 2;
        var iconYPosition = iconLayer.bounds[1] + iconHeight / 2;
        var metadataXPosition = iconXPosition + iconTextSeparation;
        var metadataYPosition = iconYPosition;
        iconLayer.move(metadataGroup, ElementPlacement.INSIDE);

        // Add metadataLayer
        addMetadataValue(exifTag, fontSize, textColor, fontName, fontTracking);
        var metadataLayer = doc.layers.getByName(exifTag + ' metadata');

        // Move layer
        translateLayerTo(iconLayer, iconXPosition, iconYPosition, "middleright");
        translateLayerTo(metadataLayer, metadataXPosition, metadataYPosition, "middleleft");

    } else {
        // Add metadataLayer
        addMetadataValue(exifTag, fontSize, textColor, fontName, fontTracking);
        var metadataLayer = doc.layers.getByName(exifTag + ' metadata');
    }
    
    metadataLayer.move(metadataGroup, ElementPlacement.INSIDE);

}

function moveMetadataGroup (exifTag) {

    var metadataGroup = activeDocument.layerSets.getByName(exifTag + ' group');

    switch (exifTag) {
        case 'location':
        metadataGroupXPosition = 135;
        metadataGroupYPosition = 135;
        anchorPosition = "topleft";
        break;
        case 'GPS':
        metadataGroupXPosition = 100;
        metadataGroupYPosition = 200;
        anchorPosition = "middleleft";
        break;
        case 'date':
        metadataGroupXPosition = 945;
        metadataGroupYPosition = 135;
        anchorPosition = "topright";
        break;
        case 'headline':
        metadataGroupXPosition = 100;
        metadataGroupYPosition = 100;
        anchorPosition = "middlecenter";
        break;
        case 'caption':
        metadataGroupXPosition = 540;
        metadataGroupYPosition = 270;
        anchorPosition = "topcenter";
        break;
        case 272: // Camera model
        metadataGroupXPosition = 135;
        metadataGroupYPosition = 968;
        anchorPosition = "middleleft";
        break;
        case 42036: // Lens Model
        metadataGroupXPosition = 135;
        metadataGroupYPosition = 1058;
        anchorPosition = "middleleft";
        break;
        case 37377: // Shutter Speed
        metadataGroupXPosition = 675;
        metadataGroupYPosition = 968;
        anchorPosition = "middleleft";
        break;
        case 37378: // Aperture
        metadataGroupXPosition = 675;
        metadataGroupYPosition = 1058;
        anchorPosition = "middleleft";
        break;
        case 34855: // ISO
        metadataGroupXPosition = 675;
        metadataGroupYPosition = 1148;
        anchorPosition = "middleleft";
        break;
        case 37386: // Lens Focal Length
        metadataGroupXPosition = 135;
        metadataGroupYPosition = 1148;
        anchorPosition = "middleleft";
        break;
        case 'presetName':
        metadataGroupXPosition = 135;
        metadataGroupYPosition = 1102.5;
        anchorPosition = "topcenter";
        break;
        case 'presetPack':
        metadataGroupXPosition = 135;
        metadataGroupYPosition = 1102.5;
        anchorPosition = "topcenter";
        break;

    }

    translateLayerTo(metadataGroup, metadataGroupXPosition, metadataGroupYPosition, anchorPosition);

}

function addMetadataList(metadataList, fontSize, textColor, fontName, fontTracking) {

    var doc = activeDocument;

    // Look for group, if not defined, define
    var cameraSettingsGroupName = "Camera Settings";

    try {

        var cameraSettingsGroup = doc.layerSets.getByName(cameraSettingsGroupName);

    }
    catch (e) {

        var cameraSettingsGroup = doc.layerSets.add();
        cameraSettingsGroup.name = cameraSettingsGroupName;

    }

    for (i=0; i<metadataList.length; i++) {

        // deselectLayers();
        app.activeDocument.activeLayer = null

        if (contains(['location', 'date', 'caption' , 'headline'], metadataList[i])) {

            var includeIcon = false

        } else { 
            
            var includeIcon = true
            
        };

        addMetadata(metadataList[i], fontSize, textColor, fontName, fontTracking, includeIcon);
        moveMetadataGroup(metadataList[i]);

        // Moving the metadata group inside the camera settings group. There is a bug: https://stackoverflow.com/questions/38307871/photoshop-scripting-move-one-group-inside-of-other
        var metadataGroup = doc.layerSets.getByName(metadataList[i] + ' group')
        var dummieGroup = cameraSettingsGroup.layerSets.add();
        dummieGroup.name = "dummy";
        metadataGroup.move(dummieGroup, ElementPlacement.PLACEBEFORE);
        dummieGroup.remove();
    }

}

function deselectLayers() { 

    var desc01 = new ActionDescriptor(); 
        var ref01 = new ActionReference(); 
        ref01.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') ); 
    desc01.putReference( charIDToTypeID('null'), ref01 ); 
    executeAction( stringIDToTypeID('selectNoLayers'), desc01, DialogModes.NO ); 

};

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

function placeFile(filePath, relativeTargetHeight, xPosition, yPosition, anchorPosition) {

    var file = new File(filePath);
    layer = addFile(file);

    /// Resize image
    var resizeRatio = relativeTargetHeight * 100;
    layer.resize(resizeRatio, resizeRatio, AnchorPosition.MIDDLECENTER);

    translateLayerTo(layer, xPosition, yPosition, anchorPosition);

}

function loadPresetsInventory () {

}

function makeDarkerNoisierBlurier(blur, noise, dark) {
    
    // Document selection
    var doc = activeDocument;

    // Layer selection
    var targetLayer= doc.activeLayer;

    targetLayer.duplicate(targetLayer, ElementPlacement.PLACEAFTER);

    targetLayer.applyGaussianBlur(blur);

    targetLayer.adjustCurves([[0,0],[255,dark]]);

    targetLayer.applyAddNoise(noise, NoiseDistribution.GAUSSIAN, true);

}

function addPresetInfo(selectedDocument, presetInfo, fontSize, textColor, fontName, fontTracking, xPosition, yPosition, anchorPosition) {

    var doc = selectedDocument;

    var docPresetInfo = findPresetInfoInKeywords(doc);

    // Layer definition
    var presetInfoLayer = doc.artLayers.add();
    presetInfoLayer.kind = LayerKind.TEXT;
    switch(presetInfo) {
        case 'presetPack':
        presetInfoLayer.name = 'presetPackName';
        presetInfoLayer.textItem.contents = docPresetInfo.presetPackName;
        break;
        case 'preset':
        presetInfoLayer.name = 'presetName';
        presetInfoLayer.textItem.contents = docPresetInfo.presetName;
        break;
        default:
        presetInfoLayer.name = 'undefined';
        presetInfoLayer.textItem.contents = "presetInfo missing";
        break;
    }

    // Text Item definition
    presetInfoLayer.textItem.size = new UnitValue(fontSize, 'px');
    presetInfoLayer.textItem.color = textColor;
    presetInfoLayer.textItem.font = fontName;
    presetInfoLayer.textItem.tracking = fontTracking;
    presetInfoLayer.textItem.justification = Justification.CENTER;
    presetInfoLayer.textItem.capitalization = TextCase.ALLCAPS;

    // Move layer to defined position
    translateLayerTo(activeDocument.layers.getByName(presetInfo + "Name"), xPosition,  yPosition, anchorPosition);
    
}


function resizeLayerToFillDimensions (selectedLayer, placeholderWidth, placeholderHeight) {

    placeholderWidth = UnitValue (placeholderWidth, 'px');
    placeholderHeight = UnitValue (placeholderHeight, 'px');
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

    selectedLayer.resize(resizeRatio, resizeRatio, AnchorPosition.MIDDLECENTER);

}