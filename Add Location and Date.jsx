#target photoshop

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

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

function nameFile() {
    // get document and rename it
    var doc = activeDocument;
    doc.activeLayer.name = "photoParameters";
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


// ExifTags selection
//37377 Shutter Speed
//37378 Aperture
//34855 ISO
//272 Camera Model
//42035 Lens Make
//42036 Lens Model
//37386 Lens Focal Length


//nameFile();

//addMetadataVerticallyDistributed([37377, 37378, 34855, 37386], "exifData");

addMetadataWithIcon('location', 0.035, 0.15, 0.2);

addMetadataWithIcon('date', 0.035, 0.85, 0.2);

//addMetadataWithIcon('date', 0.4, 0.8, 0.2);