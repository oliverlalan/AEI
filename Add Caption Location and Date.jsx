#target photoshop

function getExifTagIndex(exifData, exifTag) {
  for (var i = 0; i < exifData.length; i++) {
    var exifItem = exifData[i];
    if (exifItem[2] == exifTag) {
        return i;
    }
  }
}

function moveLayerToAbsolutePosition(fLayer,fX,fY, anchorPosition) {

  var Position = fLayer.bounds;
  var Width = fLayer.bounds[2].value - fLayer.bounds[0].value;
  var Height = fLayer.bounds[3].value - fLayer.bounds[1].value;

  switch (anchorPosition) {
    case "middlecenter":
    Position[0] = fX - Position[0] + Width / 2;
    Position[1] = fY - Position[1] + Height / 2;
    break;

    case "middleleft":
    Position[0] = fX - Position[0]
    Position[1] = fY - Position[1] + Height / 2;
    break;

    case "middleright":
    Position[0] = fX - Position[0]
    Position[1] = fY - Position[1] - Height / 2;
    break;

    default:
    Position[0] = fX - Position[0]
    Position[1] = fY - Position[1]

  }
  

  fLayer.translate(-Position[0],-Position[1]);
}

function nameFile() {
    // get document and rename it
    var doc = app.activeDocument;
    doc.activeLayer.name = "photoStory";
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

  // Document Selection
  var doc = app.activeDocument;

  // Resize image
  var itemWidth = doc.activeLayer.bounds[2].value - app.activeDocument.activeLayer.bounds[0].value;
  var resizeRatio = targetWidth / itemWidth * 180;
  doc.activeLayer.resize(resizeRatio, resizeRatio, AnchorPosition.MIDDLECENTER);

  // Move inside group
  doc.activeLayer.move(doc.layerSets.getByName(targetGroupName), ElementPlacement.INSIDE);
}

function addMetadataAsText (exifTag, targetGroupName, colorHexValue, fontName, fontSizePixels) {

    // Document selection
    var doc = app.activeDocument;

    // Group selection
    var layerGroup = doc.layerSets.getByName(targetGroupName);

    // Layer creation
    var txtLayer = layerGroup.artLayers.add();
    txtLayer.kind = LayerKind.TEXT;

    // Text 
    var textItemRef = txtLayer.textItem;

    // Text color
    textColor = new SolidColor();
    textColor.rgb.hexValue = colorHexValue;
    textItemRef.color = textColor;

    // Text font
    textItemRef.font = fontName;

    if(exifTag == 'headline') {
        textItemRef.kind = TextType.PARAGRAPHTEXT;
    } else {
        textItemRef.kind = TextType.POINTTEXT;
    }

    // Font size. There is a bug. textItem.size always converts "px" to "pt". 
    // https://community.adobe.com/t5/photoshop-ecosystem-discussions/photoshop-script-change-textitem-size-javascript/td-p/11478075
    if(exifTag == 'headline') {
		textItemRef.size = new UnitValue(700, 'pt');
	} else {
		textItemRef.size = new UnitValue(fontSizePixels * 72 / doc.resolution, 'pt');
	}
	// TO-DO: Define LayerSize for TextType.PARAGRAHTEXT



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

function addLocation () {
    // Save current preferences
    var startRulerUnits = app.preferences.rulerUnits;
    var startTypeUnits = app.preferences.typeUnits;
    var startTypeDialogs = app.displayDialogs;

    // Set own preferences
    app.preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeUnits = TypeUnits.PIXELS;
    app.displayDialogs = DialogModes.ERROR;

    // Document size
    var doc = app.activeDocument;
    var docHeight = doc.height.value;
    var docWidth = doc.width.value;

    // Group for both the image and the text
    var group = app.activeDocument.layerSets.add();
    //group.name = ;

}


// Based on https://stackoverflow.com/questions/28900505/extendscript-how-to-check-whether-text-content-overflows-the-containing-rectang
function scaleTextToFitBox(textLayer) {     
    var fitInsideBoxDimensions = getLayerDimensions(textLayer);

    while(fitInsideBoxDimensions.height < getRealTextLayerDimensions(textLayer).height) {
        var fontSize = parseInt(textLayer.textItem.size);
        textLayer.textItem.size = new UnitValue(fontSize * 0.95, "px");
    }
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

function resizeToFit (leftMargin, topMargin, rightMargin, bottomMargin) {

    // Save current preferences
    var startRulerUnits = app.preferences.rulerUnits;
    var startTypeUnits = app.preferences.typeUnits;
    var startTypeDialogs = app.displayDialogs;

    // Set own preferences
    app.preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeUnits = TypeUnits.PIXELS;
    app.displayDialogs = DialogModes.ERROR;

    // Doc selection
    var doc = app.activeDocument;

    // Doc parameters calculation
    var docHeight = doc.height.value;
    var docWidth = doc.width.value;
    var targetWidth = (1 - rightMargin - leftMargin)* docWidth;
    var targetHeight = (1 - topMargin - bottomMargin) * docHeight;

    // Resize image
	if (doc.activeLayer.textItem.kind == TextType.POINTTEXT) {
		var itemWidth = doc.activeLayer.bounds[2].value - doc.activeLayer.bounds[0].value;
		var itemHeight = doc.activeLayer.bounds[3].value - doc.activeLayer.bounds[1].value;
		var widthResizeRatio = targetWidth / itemWidth * 100;
		var heightResizeRatio = targetHeight / itemHeight * 100;
		doc.activeLayer.resize(widthResizeRatio, heightResizeRatio, AnchorPosition.MIDDLECENTER);
	} else {
		doc.activeLayer.textItem.height = new UnitValue(targetHeight * 72 / doc.resolution, 'pt');
		doc.activeLayer.textItem.width = new UnitValue(targetWidth * 72 / doc.resolution, 'pt');

		// Resize text
		scaleTextToFitBox(doc.activeLayer);
	}


    // Calculate image position using anchor center
    var xPosition = leftMargin * docWidth + targetWidth / 2;
    var yPosition = topMargin * docHeight + targetHeight / 2;

    // Move image
    moveLayerToAbsolutePosition(doc.activeLayer, xPosition, yPosition, "middlecenter");

    // Reset application preferences
    app.preferences.rulerUnits = startRulerUnits;
    app.preferences.typeUnits = startTypeUnits;
    app.displayDialogs = startTypeDialogs;

}

function addMetadataWithIcons(exifTagsArray) {

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

  // Document Header and Footer Margins
  var docMarginsHeightProportion = 0.5; // Defines percentage of margins, computed as (amount of pixels in header + footer) / document height. TODO: Define automatically
  var docContentHeightProportion = 1 - docMarginsHeightProportion;

  // Document Content
  var rowsProportion = 0.35; // Defines percentage of content, computed as (sum of rows height) / (sum of rows height + sum of rows indents height). TODO: Define automatically
  var rowIndentsProportion = 1 - rowsProportion;

  // Number of rows 
  var exifItemsCount = exifTagsArray.length;

  // Rows Height calculation. Computed based on number of entries
  var rowsHeight = docContentHeightProportion * rowsProportion / exifItemsCount;
  var rowsHeightPixels = rowsHeight * docHeight; // Used as fontSizePixels for addMetadataAsText and as targetWidth for addIcon

  // Rows Indents calculation
  var rowIndentsHeight = docContentHeightProportion * rowIndentsProportion / (exifItemsCount - 1);
  var rowIndentsHeightPixels = rowIndentsHeight * docHeight;

  // Initial Y position
  var exifItemInitialYPosition = (docMarginsHeightProportion / 2  + rowsHeight / 2) * docHeight;
  var exifItemYPosition = exifItemInitialYPosition;

  // X position - Static
  var imageXPosition = 0.4 * docWidth;
  var exifDataXPosition = 0.5 * docWidth;

  for (var i=0; i<exifTagsArray.length; i++) {

    // Group for both the image and the text
    var group = app.activeDocument.layerSets.add();
    group.name = exifTagsArray[i];

    // Be careful with the encoding for the "Ó": http://www.javascripter.net/faq/accentedcharacters.htm
    var selectedFilePath = "D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Icons/" + exifTagsArray[i] + ".svg";

    var nonIconItems = ['headline', 'caption', 'GPS'];
    
    if (!(exifTagsArray[i] == 'headline' || exifTagsArray[i] == 'caption')) {
        addIcon (selectedFilePath, exifTagsArray[i], rowsHeightPixels);
        moveLayerToAbsolutePosition(doc.activeLayer, imageXPosition, exifItemYPosition, "middlecenter");
    }

    addMetadataAsText(exifTagsArray[i], exifTagsArray[i], "FFFFFF", "Comfortaa-Bold", rowsHeightPixels);
    moveLayerToAbsolutePosition(doc.activeLayer, exifDataXPosition, exifItemYPosition, "middleleft");

    // Next Y position
    exifItemYPosition = exifItemYPosition + rowIndentsHeightPixels + rowsHeightPixels;

  };

  // Reset application preferences
  app.preferences.rulerUnits = startRulerUnits;
  app.preferences.typeUnits = startTypeUnits;
  app.displayDialogs = startTypeDialogs;

}

// function makeDarkerNoisierBlurier(targetGroupName) {
// 
//     // Document selection
//     var doc = activeDocument;
// 
//     // Group definition
//     var layerGroup = app.activeDocument.layerSets.add();
//     layerGroup.name = targetGroupName;
// 
//     // Gaussian Blur adjustments
//     var gaussianBlurLayer = layerGroup.ArtLayers.add();
//     gaussianBlurLayer.kind = LayerKind.;
//     gaussianBlurLayer.applyGaussianBlur(100);
// 
//     // Curves adjustments
//     var adjustCurvesLayer = layerGroup.ArtLayers.add();
//     adjustCurvesLayer.kind = LayerKind.CURVES;
//     adjustCurvesLayer.adjustCurves([[0,0],[253,127]]);
// 
//     // Add Noise
//     var addNoiseLayer = layerGroup.ArtLayers.add();
//     addNoiseLayer.kind = LayerKind.;
//     addNoiseLayer.applyAddNoise(8, NoiseDistribution.GAUSSIAN, true);
// 
// }

// ExifTags selection
//37377 Shutter Speed
//37378 Aperture
//34855 ISO
//272 Camera Model
//42035 Lens Make
//42036 Lens Model
//37386 Lens Focal Length
// 'caption' Caption

//nameFile();

//addMetadataVerticallyDistributed([37377, 37378, 34855, 37386], "exifData");

addMetadataWithIcons(['headline']);


resizeToFit(0.2,0.3,0.2,0.3);
