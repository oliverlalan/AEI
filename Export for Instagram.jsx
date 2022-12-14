#target photoshop

// Save current preferences
var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits = app.preferences.typeUnits;
var startTypeDialogs = app.displayDialogs;

// Set own preferences
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.displayDialogs = DialogModes.ERROR;

/* var docRef = activeDocument;
var docRefPath = activeDocument.path;
var docRefName = activeDocument.name;

var presetNamesList = ["SCF01", "SCF02", "SCF03", "SCF04", "SCF05", "SCF06", "SCF07", "SCF08", "SCF09", "SCF10", "SCF11", "SCF12", 
"SMF01", "SMF02", "SMF03", "SMF04", "SMF05"]; // TODO: Create a way of reading the list in the Presets Inventory


openAsLayer();
convertColorProfileToSRGB(activeDocument);
exportCopyAsPNG(docRef);
openUneditedRAW(docRef, "_unedited");
duplicateDocument(docRef, "_before-after");
copyActiveLayerFromSourceToTarget(app.documents.getByName(docRef + "_unedited"), app.documents.getByName(docRef + "_before-after"));
addMasks();
fillMask();
addFile("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Design/Template - Logo - TopRight.png");


addMetadataWithIcon('location', 0.027, 0.12, 0.13);
addMetadataWithIcon('date', 0.027, 0.88, 0.13);


// addMetadata (exifTag, colorHexValue, fontName, size, fontTracking)
addMetadata('location', new UnitValue(24, 'px'), "FFFFFF", "WorkSansRoman-Light", 50);
translateLayerTo();
addMetadata('caption', new UnitValue(24, 'px'), "FFFFFF", "WorkSansRoman-Light", 50);
resizeParagraphToFitBorders(0.12, 0.25, 0.12, 0.2);
translateLayerTo()

exportCopyAsPNG(activeDocument);
duplicateDocument(docRef, "_before-after");

resizeImageToFitCanvas(1080, 1350);


resizeImageToFillCanvas(1080,1350);


addMetadataAsParagraphText ('caption', "FFFFFF", "Fraunces9ptSuperSoft-Light", 0.027, 0.12, 0.25, 0.12, 0.2);

exportCopyAsPNG(activeDocument); */
var size = new UnitValue(32, 'px');
var color = "FFFFFF";
var font = "WorkSansRoman-Light";
var tracking = 50;

addMetadataWithIcon(37377, size, color, font, tracking);

// Reset application preferences
app.preferences.rulerUnits = startRulerUnits;
app.preferences.typeUnits = startTypeUnits;
app.displayDialogs = startTypeDialogs;


function openAsLayer() {
    var begDesc = "$$$/JavaScripts/OpenAsLayer/Description=Assign this to the open document event. This will promote a document with only a background layer to a layer with the document name." // endDesc


    // on localized builds we pull the $$$/Strings from a .dat file, see documentation for more details
    $.localize = true;

    var stripExtension = true;

    if ( app.documents.length > 0 ) {
        var doc = activeDocument;
        if ( doc.layers.length == 1 && doc.activeLayer.isBackgroundLayer ) {
            doc.activeLayer.isBackgroundLayer = false;
            var docNameNoExtension = doc.name;
            if (stripExtension) {
                var extensionIndex = docNameNoExtension.lastIndexOf (".");
                if (extensionIndex != -1) {
                    docNameNoExtension = docNameNoExtension.substr(0, extensionIndex);
                }
            }
            doc.activeLayer.name = docNameNoExtension;
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
        fileName = fileName + documentSuffix + fileExtension;
    }
    
    doc.duplicate(fileName);

    activeDocument.activeLayer.isBackgroundLayer = false;

}

function exportCopyAsPNG(selectedDocument, filePath, fileName) {
    if (filePath === undefined) {
       filePath = selectedDocument.path;
    }
    if (fileName === undefined) {
        fileName = selectedDocument.name.replace(/(?:\.[^.]*$|$)/, '');
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

}

function copyActiveLayerFromSourceToTarget(sourceDocument, targetDocument) {

    sourceDocument.activeLayer.duplicate(targetDocument.activeLayer, ElementPlacement.PLACEBEFORE);

}

function addMasks(){

    try{
        loadLayerSelection();
        addLayerMask();
        deleteLayerMask(true);
        } catch (e) {}
};

// =======================================================
function loadLayerSelection() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putProperty( s2t( "channel" ), s2t( "selection" ));
    descriptor.putReference( c2t( "null" ), reference );
    reference2.putEnumerated( s2t( "channel" ), s2t( "channel" ), s2t( "transparencyEnum" ));
    descriptor.putReference( s2t( "to" ), reference2 );
    executeAction( s2t( "set" ), descriptor, DialogModes.NO );
}

// =======================================================
function addLayerMask() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    descriptor.putClass( s2t( "new" ), s2t( "channel" ));
    reference.putEnumerated( s2t( "channel" ), s2t( "channel" ), s2t( "mask" ));
    descriptor.putReference( s2t( "at" ), reference );
    descriptor.putEnumerated( s2t( "using" ), c2t( "UsrM" ), s2t( "revealSelection" ));
    executeAction( s2t( "make" ), descriptor, DialogModes.NO );
}

// =======================================================
function deleteLayerMask(apply) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated( s2t( "channel" ), s2t( "channel" ), s2t( "mask" ));
    descriptor.putReference( c2t( "null" ), reference );
    descriptor.putBoolean( s2t( "apply" ), apply );
    executeAction( s2t( "delete" ), descriptor, DialogModes.NO );
}

function fillMask () {

    // Store doc dimensions
    var docRef = app.activeDocument;
    var docHeight = docRef.height;
    var docWidth = docRef.width;

    //(topleft, bottomleft, bottomright, topright)
    var shapeRef = [ [docWidth/2, 0], [docWidth/2, docHeight], [docWidth, docHeight], [docWidth, 0]];
    docRef.selection.select(shapeRef);

    var fillColor = new SolidColor;
    fillColor.rgb.hexValue = "000000";
    activeDocument.selection.fill(fillColor);

}

function resizeImageToFillCanvas(targetCanvasWidth, targetCanvasHeight) {

    var doc = activeDocument;

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

function resizeImageToFitCanvas(targetCanvasWidth, targetCanvasHeight) {

    var doc = activeDocument;

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

function addLightroomPresetOverlay () {
    var doc = activeDocument;
    var docPresetKeywords = findPresetNamesInKeywords (doc);

    if(docPresetKeywords.length==1){
        
        var selectedFilePath = getPresetOverlayPath(docPresetKeywords[0]);
        //app.openDialog();
        //var selectedFilePath = "D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Presets Overlays/" + docPresetKeywords[0] + ".png";

        try{
            addFile(selectedFilePath);
        } 

        catch (e)
        {
            alert('Cannot add overlay. File missing?');
        }

    } else {
        alert('None or more than one presetNames in doc.')
    }
}

function getPresetOverlayPath (presetName) {

    var availablePresetOverlaysPaths = Folder("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Presets Overlays/").getFiles("*.png");

    for (i=0; i < availablePresetOverlaysPaths.length; i++) {
        var presetOverlayFileName = availablePresetOverlaysPaths[i].displayName.match(/(.*)\.[^\.]+$/)[1];
        var presetOverlayFileName = presetOverlayFileName.substr(presetOverlayFileName.lastIndexOf('-')+2, presetOverlayFileName.length);
        if(presetOverlayFileName == presetName) {
            return availablePresetOverlaysPaths[i];
        }
    }

}

function findPresetNamesInKeywords (docRef) {

    var doc = activeDocument;
    var docKeywords = doc.info.keywords;
    var docPresetKeywords = [];

    for (var i=0; i<docKeywords.length; i++) {
        for (var j=0; j<presetNamesList.length; j++){
            if(docKeywords[i] == presetNamesList[j]) {
                docPresetKeywords.push(docKeywords[i]);
            }
        }
    }

    return docPresetKeywords;

}

function addFile (selectedFile) {

    var idPlc = charIDToTypeID( "Plc " ); 
    var desc11 = new ActionDescriptor();  
    var idnull = charIDToTypeID( "null" );

    desc11.putPath( idnull, new File(selectedFile) );
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


function getExifContentByExifTag (selectedDocument, exifTag) {
    exifData = selectedDocument.info.exif;
    for (var i = 0; i < exifData.length; i++) {
        var exifItem = exifData[i];
        if (exifItem[2] == exifTag) {
            return exifData[i][1];
        }
    }
}

function translateLayerTo(selectedLayer,finalX,finalY, anchorPosition) {

    var bounds = selectedLayer.bounds;
    var width = bounds[2] - bounds[0];
    var height = bounds[3] - bounds[1];

    var rightBound = ;
    var dY;

    switch (anchorPosition) {
        case "middlecenter":
        dX = finalX - bounds[0] + width / 2;
        dY = finalY - bounds[1] + height / 2;
        break;

        case "middleleft":
        dX = finalX - bounds[0];
        dY = finalY - bounds[1] + height / 2;
        break;

        case "middleright":
        dX = finalX - bounds[0] + width;
        dY = finalY - bounds[1] + height / 2;
        break;

        case "topcenter":
        dX = finalX - bounds[0] + width /2;
        dY = finalY - bounds[1];
        break;

        default:
        dX = finalX - bounds[0]
        dY = finalY - bounds[1]

    }
    
    selectedLayer.translate(-dX,-dY);
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

    // Look for group, if not defined, define.
    var metadataGroupName = exifTag + ' group';
    try {
        var metadataGroup = doc.layerSets.getByName(metadataGroupName);
    }
    catch (e) {
        var metadataGroup = doc.layerSets.add();
        metadataGroup.name = metadataGroupName;
    }

    // Move inside Group
    iconLayer.move(metadataGroup, ElementPlacement.INSIDE);

    /// Resize image
    var imageWidth = new UnitValue(iconLayer.bounds[2].value - iconLayer.bounds[0].value, 'px');
    var resizeRatio = targetWidth / imageWidth * 100;
    iconLayer.resize(resizeRatio, resizeRatio, AnchorPosition.MIDDLECENTER);

}

function addMetadata (exifTag, size, colorHexValue, fontName, fontTracking) {

    // Document selection
    var doc = activeDocument;

    // Layer definition
    var metadataLayer = doc.artLayers.add();
    metadataLayer.name = exifTag + ' metadata';
    metadataLayer.kind = LayerKind.TEXT;

    // Look for group, if not defined, define.
    var metadataGroupName = exifTag + ' group';
    try {
        var metadataGroup = doc.layerSets.getByName(metadataGroupName);
    }
    catch (e) {
        var metadataGroup = doc.layerSets.add();
        metadataGroup.name = metadataGroupName;
    }

    // Move inside Group
    metadataLayer.move(metadataGroup, ElementPlacement.INSIDE);

    // Text Item definition
    var textItemRef = metadataLayer.textItem;
    textItemRef.font = fontName;
    textItemRef.tracking = fontTracking;
    var textColor = new SolidColor();
    textColor.rgb.hexValue = colorHexValue;
    textItemRef.color = textColor;
    textItemRef.size = new UnitValue(size * 72 / doc.resolution, 'pt'); // There is a bug. textItem.size always converts "px" to "pt".  https://community.adobe.com/t5/photoshop-ecosystem-discussions/photoshop-script-change-textitem-size-javascript/td-p/11478075

    // Text content
    // Exif entry index (Variable and Value) for the desired exifTag as defined in https://web.archive.org/web/20190624045241if_/http://www.cipa.jp:80/std/documents/e/DC-008-Translation-2019-E.pdf
    var exifContent = getExifContentByExifTag(activeDocument, exifTag).replace(/(\r\n|\n|\r)/gm, "");

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
            textItemRef.contents = "Unknown";
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
            textItemRef.contents = "Sony A7IV";
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

function resizeParagraphToFitBorders(leftMargin, topMargin, rightMargin, bottomMargin) {
    // Doc parameters calculation
    var docHeight = doc.height.value;
    var docWidth = doc.width.value;
    var targetWidth = (1 - rightMargin - leftMargin)* docWidth;
    var targetHeight = (1 - bottomMargin - topMargin) * docHeight;

    // Resize text layer
    textItemRef.height = new UnitValue(targetHeight, 'pt');
	textItemRef.width = new UnitValue(targetWidth, 'pt');
    if(textItemRef.contents != " ") {
        increaseLeadingToFitBox(doc.activeLayer);
    }
    
}

// Based on https://stackoverflow.com/questions/28900505/extendscript-how-to-check-whether-text-content-overflows-the-containing-rectang
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

    textLayer.textItem.leading = new UnitValue(leading * 0.95, "px"); //To ensure it fits.

}

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

function addMetadataWithIcon (exifTag, size, colorHexValue, fontName, fontTracking) {

    var doc = activeDocument;

    addIcon(exifTag, size);
    var iconLayer = doc.layerSets.getByName(exifTag + ' group').layers.getByName(exifTag + ' icon');
    var iconWidth = iconLayer.bounds[2] - iconLayer.bounds[0];
    var iconHeight = iconLayer.bounds[3] - iconLayer.bounds[1];

    var iconXPosition = iconLayer.bounds[0] + iconWidth / 2;
    var iconYPosition = iconLayer.bounds[3] + iconHeight / 2;

    var iconTextSeparation = size * 0.8;

    var metadataXPosition = iconXPosition + iconTextSeparation;
    var metadataYPosition = iconYPosition;

    addMetadata(exifTag, size, colorHexValue, fontName, fontTracking);
    var metadataLayer = doc.layerSets.getByName(exifTag + ' group').layers.getByName(exifTag + ' metadata');

    // Move layers
    translateLayerTo(iconLayer, iconXPosition, iconYPosition, "middlecenter");
    translateLayerTo(metadataLayer, metadataXPosition, metadataYPosition, "middlecenter");

}

function moveMetadataGroup (exifTag) {

    var metadataGroup = activeDocument.layerSets.getByName(exifTag + ' group');

    switch (exifTag) {
        case 'location':
        metadataGroupXPosition = new UnitValue(120, 'px');
        metadataGroupYPosition = new UnitValue(100, 'px');
        break;
        case 'GPS':
        metadataGroupXPosition = new UnitValue(120, 'px');
        metadataGroupYPosition = new UnitValue(100, 'px');
        break;
        case 'date':
        metadataGroupXPosition = new UnitValue(120, 'px');
        metadataGroupYPosition = new UnitValue(100, 'px');
        break;
        case 'headline':
        metadataGroupXPosition = new UnitValue(120, 'px');
        metadataGroupYPosition = new UnitValue(100, 'px');
        break;
        case 'caption':
        metadataGroupXPosition = new UnitValue(120, 'px');
        metadataGroupYPosition = new UnitValue(100, 'px');
        break;
        case 272: // Camera model
        metadataGroupXPosition = new UnitValue(120, 'px');
        metadataGroupYPosition = new UnitValue(100, 'px');
        break;
        case 42036: // Lens Model
        metadataGroupXPosition = new UnitValue(360, 'px');
        metadataGroupYPosition = new UnitValue(100, 'px');
        break;
        case 37377: // Shutter Speed
        metadataGroupXPosition = new UnitValue(120, 'px');
        metadataGroupYPosition = new UnitValue(180, 'px');
        break;
        case 37378: // Aperture
        metadataGroupXPosition = new UnitValue(335, 'px');
        metadataGroupYPosition = new UnitValue(180, 'px');
        break;
        case 34855: // ISO
        metadataGroupXPosition = new UnitValue(500, 'px');
        metadataGroupYPosition = new UnitValue(180, 'px');
        break;
        case 37386: // Lens Focal Length
        metadataGroupXPosition = new UnitValue(695, 'px');
        metadataGroupYPosition = new UnitValue(180, 'px');
        break;
    }

    translateLayerTo(metadataGroup, metadataGroupXPosition, metadataGroupYPosition, "middleleft");

}
