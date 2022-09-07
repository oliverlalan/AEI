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

function cropFromHorizontalToVertical (document) {
    var docWidth = document.width;
    var docHeight = document.height;
    var aspectRatio = docWidth / docHeight;
    var targetHeight = docHeight;
    var targetWidth = targetHeight / aspectRatio;

    var newBounds = [
        docWidth / 2 - targetWidth /2,
        0,
        docWidth / 2 + targetWidth /2,
        docHeight];
    
    document.crop(newBounds);

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

function makeDarkerNoisierBlurier() {// Document selection
    var doc = activeDocument;

    // Layer selection
    var targetLayer= doc.activeLayer;

    targetLayer.applyGaussianBlur(100);

    targetLayer.adjustCurves([[0,0],[253,127]]);

    targetLayer.applyAddNoise(10, NoiseDistribution.GAUSSIAN, true);

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
  var doc = activeDocument;

  // Resize image
  var imageWidth = doc.activeLayer.bounds[2].value - app.activeDocument.activeLayer.bounds[0].value;
  var resizeRatio = targetWidth / imageWidth * 180;
  doc.activeLayer.resize(resizeRatio, resizeRatio, AnchorPosition.MIDDLECENTER);

  // Move inside 
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
    textItemRef.size = new UnitValue(fontSizePixels * 72 / doc.resolution, 'pt');;

    // Finding the exif entry index (Variable and Value) for the desired exifTag 
    // as defined in https://web.archive.org/web/20190624045241if_/http://www.cipa.jp:80/std/documents/e/DC-008-Translation-2019-E.pdf
    var exifTagIndex = getExifTagIndex (doc.info.exif, exifTag);

    // Text content
    switch (exifTag) {
        case 34855:
        textItemRef.contents = "ISO " + doc.info.exif[exifTagIndex][1];
        break;

        default:
        textItemRef.contents = doc.info.exif[exifTagIndex][1];
    }

    // Text center
    //textItemRef.kind = TextType.PARAGRAPHTEXT;
    //var YCenterOffset = textItemRef.height / 2;
    //var textCenterOffset = textItemRef.size / 2;
    //textItemRef.baselineShift = textCenterOffset - YCenterOffset;

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
  if(docWidth > docHeight) {
    var docMarginsHeightProportion = 0.5;
  } else {
    var docMarginsHeightProportion = 0.65;
  }
   // Defines percentage of margins, computed as (amount of pixels in header + footer) / document height. TODO: Define automatically
  var docContentHeightProportion = 1 - docMarginsHeightProportion;

  // Document Content
  if(docWidth > docHeight) {
    var rowsProportion = 0.35; // Defines percentage of content, computed as (sum of rows height) / (sum of rows height + sum of rows indents height). TODO: Define automatically
  } else {
    var rowsProportion = 0.35;
  }
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
  if(docWidth > docHeight) {
    var imageXPosition = 0.4 * docWidth;
  } else {
    var imageXPosition = 0.35 * docWidth;
  }
  
  var exifDataXPosition = 0.5 * docWidth;

  for (var i=0; i<exifTagsArray.length; i++) {

    // Group for both the image and the text
    var group = app.activeDocument.layerSets.add();
    group.name = exifTagsArray[i];

    // Be careful with the encoding for the "Ó": http://www.javascripter.net/faq/accentedcharacters.htm
    var selectedFilePath = "D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Icons/" + exifTagsArray[i] + ".svg";
    addIcon (selectedFilePath, exifTagsArray[i], rowsHeightPixels)

    MoveLayerTo(doc.activeLayer, imageXPosition, exifItemYPosition, "middlecenter");

    addMetadataAsText(exifTagsArray[i], exifTagsArray[i], "FFFFFF", "Comfortaa-Bold", rowsHeightPixels);

    MoveLayerTo(doc.activeLayer, exifDataXPosition, exifItemYPosition, "middleleft");

    // Next Y position
    exifItemYPosition = exifItemYPosition + rowIndentsHeightPixels + rowsHeightPixels;

  };

  // Reset application preferences
  app.preferences.rulerUnits = startRulerUnits;
  app.preferences.typeUnits = startTypeUnits;
  app.displayDialogs = startTypeDialogs;

}

function resizeLongEdgeAndExport(longEdgeLength, processName) {

  var doc = activeDocument;
  
  var fileName = doc.fullName.toString();
  if(fileName.lastIndexOf(".") >= 0) { fileName = fileName.substr(0, fileName.lastIndexOf("."));}
  if (processName == "") {
    fileName += "_" + longEdgeLength + "p.jpg";
  } else {
    fileName += "+" + processName + "_" + longEdgeLength + "p.jpg";
  }

  var docHeight = doc.height.value;
  var docWidth = doc.width.value;
  var docAspectRatio = docWidth / docHeight;

  if (docWidth > docHeight) {
      var docNewWidth = longEdgeLength;
      var docNewHeight = longEdgeLength / docAspectRatio;
      doc.resizeImage(docNewWidth, docNewHeight, 300, ResampleMethod.AUTOMATIC);
  } else {
      var docNewWidth = longEdgeLength * docAspectRatio;
      var docNewHeight = longEdgeLength;
      doc.resizeImage(docNewWidth, docNewHeight, 300, ResampleMethod.AUTOMATIC);
  }

  var saveOptions = new ExportOptionsSaveForWeb;
  saveOptions.format = SaveDocumentType.JPEG;
  saveOptions.quality = 90;

  doc.exportDocument(new File(fileName), ExportType.SAVEFORWEB, saveOptions);

  //doc.close(SaveOptions.DONOTSAVECHANGES);

}

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

if(activeDocument.height < activeDocument.width) {
    cropFromHorizontalToVertical(activeDocument);
    }

addMetadataWithIcons([37377, 37378, 34855, 37386]);

// resizeLongEdgeAndExport(2160, "Metadata");
resizeLongEdgeAndExport(1080, "Metadata");

activeDocument.activeHistoryState = app.activeDocument.historyStates[0];