#target photoshop

// Save current preferences
var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits = app.preferences.typeUnits;
var startTypeDialogs = app.displayDialogs;

// Set own preferences
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.displayDialogs = DialogModes.ERROR;


function getExifTagIndex(exifData, exifTag) {
  for (var i = 0; i < exifData.length; i++) {
    var exifItem = exifData[i];
    if (exifItem[2] == exifTag) {
        return i;
    }
  }
}

function MoveLayerTo(fLayer,fX,fY, anchorPosition) {
    
    var doc = activeDocument;
    doc.activeLayer = fLayer;

    var Position = fLayer.bounds;
    var Width = fLayer.bounds[2].value - fLayer.bounds[0].value;
    var Height = fLayer.bounds[3].value - fLayer.bounds[1].value;

    switch (anchorPosition) {
        case "middlecenter":
        Position[0] = fX - Position[0] + Width / 2;
        Position[1] = fY - Position[1] + Height / 2;
        break;

        case "middleleft":
        Position[0] = fX - Position[0];
        Position[1] = fY - Position[1] + Height / 2;
        break;

        case "middleright":
        Position[0] = fX - Position[0] + Width;
        Position[1] = fY - Position[1] + Height / 2;
        break;

        default:
        Position[0] = fX - Position[0]
        Position[1] = fY - Position[1]

    }
    

    fLayer.translate(-Position[0],-Position[1]);
}

// Based on https://stackoverflow.com/questions/28900505/extendscript-how-to-check-whether-text-content-overflows-the-containing-rectang
function increaseLeadingToFitBox(textLayer) {     
    textLayer.textItem.useAutoLeading = false;
    textLayer.textItem.leading = 300;

    var fitInsideBoxDimensions = getTextBoxDimensions(textLayer);

    do {
        var leading = parseInt(textLayer.textItem.leading);
        textLayer.textItem.leading = new UnitValue(leading * 1.2, "px"); // To decrease iterations.
    }
    while(fitInsideBoxDimensions.height * 300 / 72 > getRealTextLayerDimensions(textLayer).height);

    textLayer.textItem.leading = new UnitValue(leading * 0.9, "px"); //To ensure it fits.

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

function getTextBoxDimensions(layer) {
    return { 
        width : layer.textItem.width,
        height : layer.textItem.height
    };
}

function nameFile() {
    // get document and rename it
    var doc = activeDocument;
    doc.activeLayer.name = "photoParameters";
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
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

function makeDarkerNoisierBlurier() {// Document selection
    var doc = activeDocument;

    // Layer selection
    var targetLayer= doc.activeLayer;

    targetLayer.applyGaussianBlur(100);

    targetLayer.adjustCurves([[0,0],[253,127]]);

    targetLayer.applyAddNoise(10, NoiseDistribution.GAUSSIAN, true);

}

// Based on https://www.codeproject.com/Questions/882480/Place-Embedded-through-photoshop-scripting-Javascr
function addIcon (exifTag, targetGroupName, targetWidth) {
  
    var idPlc = charIDToTypeID( "Plc " ); 
    var desc11 = new ActionDescriptor();  
    var idnull = charIDToTypeID( "null" );
    
    // opens dialog to select file
    // var selectedFile = app.openDialog();

    // Be careful with the encoding for the "Ó": http://www.javascripter.net/faq/accentedcharacters.htm
    var selectedFilePath = "D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Icons/" + exifTag + ".svg";

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

    // Document Selection
    var doc = activeDocument;

    // Rename
    doc.activeLayer.name = exifTag + ' icon';

    // Resize image
    var imageWidth = doc.activeLayer.bounds[2].value - app.activeDocument.activeLayer.bounds[0].value;
    var resizeRatio = targetWidth / imageWidth * 180;
    doc.activeLayer.resize(resizeRatio, resizeRatio, AnchorPosition.MIDDLECENTER);

    // Move inside group
    doc.activeLayer.move(doc.layerSets.getByName(targetGroupName), ElementPlacement.INSIDE);

}

function addMetadataAsText (exifTag, targetGroupName, colorHexValue, fontName, fontSizePixels) {

    // Document selection
    var doc = activeDocument;

    // Group selection
    var layerGroup = doc.layerSets.getByName(targetGroupName);

    // Text layer creation
    var txtLayer = layerGroup.artLayers.add();
    txtLayer.kind = LayerKind.TEXT;

    // Name layer
    txtLayer.name = exifTag + ' value';

    // Text 
    var textItemRef = txtLayer.textItem;

    // Text color
    textColor = new SolidColor();
    textColor.rgb.hexValue = colorHexValue;
    textItemRef.color = textColor;

    // Text font
    textItemRef.font = fontName;

    // Font size. There is a bug. textItem.size always converts "px" to "pt". 
    // https://community.adobe.com/t5/photoshop-ecosystem-discussions/photoshop-script-change-textitem-size-javascript/td-p/11478075
    textItemRef.size = new UnitValue(fontSizePixels * 72 / doc.resolution, 'pt');

    // Finding the exif entry index (Variable and Value) for the desired exifTag 
    // as defined in https://web.archive.org/web/20190624045241if_/http://www.cipa.jp:80/std/documents/e/DC-008-Translation-2019-E.pdf
    var exifTagIndex = getExifTagIndex (doc.info.exif, exifTag);

    // Text content
    switch (exifTag) {
        // Location
        case 'location':
        if(doc.info.city == "" && doc.info.country == "") {
            textItemRef.contents = "Unknown";
        } else if (doc.info.city == "") {
            textItemRef.contents = doc.info.country;
        } else {
            textItemRef.contents = doc.info.city + ", " + doc.info.country;
        }
        break;

        // GPS
        case 'GPS':
        textItemRef.contents = doc.info.exif[2][1] + doc.info.exif[1][1] + doc.info.exif[4][1] +doc.info.exif[3][1];
        break;
        
        // Date 
        case 'date':

        if(doc.info.creationDate=="") {
            textItemRef.contents = "Unknown";
        } else {
            var dateString = doc.info.creationDate;
            var year = dateString.substring(0,4);
            var month = parseInt(dateString.substring(4,6));
            var day = parseInt(dateString.substring(6,8)).toString();

            textItemRef.contents = returnMonth(month) + " " + year;
        }

        break;

        // Headline
        case 'headline':
        textItemRef.contents = doc.info.headline;
        break;

        // Caption
        case 'caption':
        textItemRef.contents = doc.info.caption;
        break;

        // ISO
        case 34855:
        textItemRef.contents = "ISO " + doc.info.exif[exifTagIndex][1];
        break;

        // Other camera parameters
        default:
        textItemRef.contents = doc.info.exif[exifTagIndex][1];
    }

    // Text center
    //textItemRef.kind = TextType.PARAGRAPHTEXT;
    //var YCenterOffset = textItemRef.height / 2;
    //var textCenterOffset = textItemRef.size / 2;
    //textItemRef.baselineShift = textCenterOffset - YCenterOffset;

}

function addMetadataWithIcon(exifTag, size, metadataWithIconXPosition, metadataWithIconYPosition) {

    // Save current preferences
    var startRulerUnits = app.preferences.rulerUnits;
    var startTypeUnits = app.preferences.typeUnits;
    var startTypeDialogs = app.displayDialogs;

    // Set own preferences
    app.preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeUnits = TypeUnits.PIXELS;
    app.displayDialogs = DialogModes.ERROR;

    // Document size
    var doc = activeDocument;
    var docHeight = doc.height.value;
    var docWidth = doc.width.value;

    // Rows Height calculation. Computed based on number of entries
    var rowsHeight = size; // As percentage of Height
    var rowsHeightPixels = rowsHeight * docHeight; // Used as fontSizePixels for addMetadataAsText and as targetWidth for addIcon
    var iconHeightPixels = rowsHeightPixels;
    
    // X position - Static
    var exifIconXPosition = 0.45 * docWidth;
    var exifValueXPosition = 0.5 * docWidth;

    // Y Position - Static and equal for both
    var exifIconYPosition = 0.5 * docHeight;
    var exifValueYPosition = exifIconYPosition;

    // Group for both the image and the text
    var metadataWithIconGroup = app.activeDocument.layerSets.add();
    var metadataWithIconGroupName = exifTag + ' group';
    metadataWithIconGroup.name = metadataWithIconGroupName;

    // Add and move Icon
    addIcon (exifTag, metadataWithIconGroupName, iconHeightPixels);
    MoveLayerTo(doc.activeLayer, exifIconXPosition, exifIconYPosition, "middlecenter");

    // Add and move Metadata Value
    addMetadataAsText(exifTag, metadataWithIconGroupName, "FFFFFF", "Comfortaa-Bold", rowsHeightPixels);
    MoveLayerTo(doc.activeLayer, exifValueXPosition, exifValueYPosition, "middleleft");

    // Move group
    metadataWithIconXPosition *= docWidth;
    metadataWithIconYPosition *= docHeight;

    switch (exifTag) {
        case 'location':
        var metadataWithIconAnchorPosition = "middleleft";
        break;

        case 'date':
        var metadataWithIconAnchorPosition = "middleright";
        break;

        default:
        var metadataWithIconAnchorPosition = "middlecenter";
    }
    MoveLayerTo(metadataWithIconGroup, metadataWithIconXPosition, metadataWithIconYPosition, metadataWithIconAnchorPosition);

    // Reset application preferences
    app.preferences.rulerUnits = startRulerUnits;
    app.preferences.typeUnits = startTypeUnits;
    app.displayDialogs = startTypeDialogs;

}

function addMetadataAsParagraphText (exifTag, colorHexValue, fontName, fontSize, leftMargin, topMargin, rightMargin, bottomMargin) {

    // Document selection
    var doc = app.activeDocument;
    var docHeight = doc.height.value;
    var docWidth = doc.width.value;

    // Group for the metadata
    var metadataGroup = app.activeDocument.layerSets.add();
    var metadataGroupName = exifTag + ' group';
    metadataGroup.name = metadataGroupName;

    // Text layer creation
    var txtLayer = metadataGroup.artLayers.add();
    txtLayer.kind = LayerKind.TEXT;

    // Name layer
    txtLayer.name = exifTag + ' value';

    // Text 
    var textItemRef = txtLayer.textItem;
    textItemRef.kind = TextType.PARAGRAPHTEXT;

    // Doc parameters calculation
    var docHeight = doc.height.value;
    var docWidth = doc.width.value;
    var targetWidth = (1 - rightMargin - leftMargin)* docWidth;
    var targetHeight = (1 - bottomMargin - topMargin) * docHeight;

    // Resize text layer
    txtLayer.textItem.height = new UnitValue(targetHeight * 72 / doc.resolution, 'pt');
	txtLayer.textItem.width = new UnitValue(targetWidth * 72 / doc.resolution, 'pt');    

    // Text color
    textColor = new SolidColor();
    textColor.rgb.hexValue = colorHexValue;
    textItemRef.color = textColor;

    // Text font
    textItemRef.font = fontName;

    // Text justification
    textItemRef.justification = Justification.CENTER;

    // Font size. There is a bug. textItem.size always converts "px" to "pt". 
    // https://community.adobe.com/t5/photoshop-ecosystem-discussions/photoshop-script-change-textitem-size-javascript/td-p/11478075

    // To define acording to picture size
    var fontSizePixels = fontSize * docHeight;
    textItemRef.size = new UnitValue(fontSizePixels * 72 / doc.resolution, 'pt');
    

    // Finding the exif entry index (Variable and Value) for the desired exifTag 
    // as defined in https://web.archive.org/web/20190624045241if_/http://www.cipa.jp:80/std/documents/e/DC-008-Translation-2019-E.pdf
    var exifTagIndex = getExifTagIndex (doc.info.exif, exifTag);

    // Text content
    switch (exifTag) {
        // Location 
        case 'location':
        if(doc.info.city == "" && doc.info.country == "") {
            textItemRef.contents = "";
        } else if (doc.info.city == "") {
            textItemRef.contents = doc.info.country;
        } else {
            textItemRef.contents = doc.info.city + ", " + doc.info.country;
        }
        break;

        // GPS
        case 'GPS':
        textItemRef.contents = doc.info.exif[2][1] + doc.info.exif[1][1] + doc.info.exif[4][1] +doc.info.exif[3][1];
        break;
        
        // Date
        case 'date':
        textItemRef.contents = doc.info.creationDate;
        break;

        // Headline
        case 'headline':
        textItemRef.contents = doc.info.headline;
        break;

        // Caption
        case 'caption':
        textItemRef.contents = doc.info.caption;
        break;

        // ISO
        case 34855:
        textItemRef.contents = "ISO " + doc.info.exif[exifTagIndex][1];
        break;

        // Other camera parameters
        default:
        textItemRef.contents = doc.info.exif[exifTagIndex][1];
    }


    increaseLeadingToFitBox(doc.activeLayer);
    // Position - Static

    // Calculate image position using anchor center
    var exifValueXPosition = leftMargin * docWidth + targetWidth / 2;
    var exifValueYPosition = topMargin * docHeight + targetHeight / 2;
    var exifValueAnchorPosition = "middlecenter";

    doc.activeLayer = activeDocument.layerSets.getByName(metadataGroupName);

    MoveLayerTo(doc.activeLayer, exifValueXPosition, exifValueYPosition, exifValueAnchorPosition);

    // Text center
    //var YCenterOffset = textItemRef.height / 2;
    //var textCenterOffset = textItemRef.size / 2;
    //textItemRef.baselineShift = textCenterOffset - YCenterOffset;

}

function resizeLongEdgeAndExport(longEdgeLength, processName) {

    var doc = activeDocument;
    
    var fileName = doc.fullName.toString();
    if(fileName.lastIndexOf(".") >= 0) { fileName = fileName.substr(0, fileName.lastIndexOf("."));}
    fileName += "_lp+" + processName +".jpg".replace("l", longEdgeLength);

    var docHeight = doc.height.value;
    var docWidth = doc.width.value;
    var docAspectRatio = docWidth / docHeight;

    if (docWidth > docHeight) {
        var docNewWidth = longEdgeLength;
        var docNewHeight = longEdgeLength / docAspectRatio;
        doc.resizeImage(docNewWidth, docNewHeight, 300, ResampleMethod.AUTOMATIC);
    } else {
        var docNewWidth = longEdgeLength / docAspectRatio;
        var docNewHeight = longEdgeLength;
        doc.resizeImage(docNewWidth, docNewHeight, 300, ResampleMethod.AUTOMATIC);
    }

    var saveOptions = new ExportOptionsSaveForWeb;
    saveOptions.format = SaveDocumentType.JPEG;
    saveOptions.quality = 90;

    doc.exportDocument(new File(fileName), ExportType.SAVEFORWEB, saveOptions);

    doc.activeHistoryState = app.activeDocument.historyStates[0];

    //doc.close(SaveOptions.DONOTSAVECHANGES);

}

// Reset application preferences
app.preferences.rulerUnits = startRulerUnits;
app.preferences.typeUnits = startTypeUnits;
app.displayDialogs = startTypeDialogs;

// ExifTags selection
//37377 Shutter Speed
//37378 Aperture
//34855 ISO
//272 Camera Model
//42035 Lens Make
//42036 Lens Model
//37386 Lens Focal Length


nameFile();

makeDarkerNoisierBlurier();

addMetadataWithIcon('location', 0.035, 0.15, 0.2);

addMetadataWithIcon('date', 0.035, 0.85, 0.2);

addMetadataAsParagraphText ('caption', "FFFFFF", "Comfortaa-Bold", 0.035, 0.15, 0.3, 0.15, 0.15);

resizeLongEdgeAndExport(1080, "Caption");