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
  var dX = new UnitValue(0, 'px');
  var dY = new UnitValue(0, 'px');
  var layerWidth = fLayer.bounds[2] - fLayer.bounds[0];
  var layerHeight = fLayer.bounds[3] - fLayer.bounds[1];

  switch (anchorPosition) {
    case "middlecenter":
    dX = fX - Position[0] - layerWidth / 2;
    dY = fY - Position[1] - layerHeight / 2;
    break;

    case "middleleft":
    dX = fX - Position[0];
    dY = fY - Position[1] - layerHeight / 2;
    break;

    case "middleright":
    dX = fX - Position[0];
    dY = fY - Position[1] + layerHeight / 2;
    break;

    default:
    dX = fX - Position[0];
    dY = fY - Position[1];

  }

  fLayer.translate(dX,dY);
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
  var imageWidth = new UnitValue(doc.activeLayer.bounds[2].value - app.activeDocument.activeLayer.bounds[0].value, 'px');
  
  var resizeRatio = targetWidth / imageWidth * 100;
  doc.activeLayer.resize(resizeRatio, resizeRatio, AnchorPosition.MIDDLECENTER);

  // Move inside 
  doc.activeLayer.move(doc.layerSets.getByName(targetGroupName), ElementPlacement.INSIDE);
    
}

function addMetadataAsText (exifTag, targetGroupName, colorHexValue, fontName, fontSizePixels, fontTracking) {

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
    textItemRef.tracking = fontTracking;

    // Font size. There is a bug. textItem.size always converts "px" to "pt". 
    // https://community.adobe.com/t5/photoshop-ecosystem-discussions/photoshop-script-change-textitem-size-javascript/td-p/11478075
    textItemRef.size = new UnitValue(fontSizePixels * 72 / doc.resolution, 'pt');

    // Finding the exif entry index (Variable and Value) for the desired exifTag 
    // as defined in https://web.archive.org/web/20190624045241if_/http://www.cipa.jp:80/std/documents/e/DC-008-Translation-2019-E.pdf
    var exifTagIndex = getExifTagIndex (doc.info.exif, exifTag);

    // Text content
    switch (exifTag) {

      case 34855:
      textItemRef.contents = "ISO " + doc.info.exif[exifTagIndex][1];
      break;

      // Camera model
      case 272:
      textItemRef.capitalization = TextCase.ALLCAPS;
      switch (doc.info.exif[exifTagIndex][1]) {

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
        textItemRef.contents = doc.info.exif[exifTagIndex][1];
        }
      break;

      // Lens Model
      case 42036:
      textItemRef.capitalization = TextCase.ALLCAPS;
      switch (doc.info.exif[exifTagIndex][1].replace(/(\r\n|\n|\r)/gm, "")) {
        
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
        textItemRef.contents = doc.info.exif[exifTagIndex][1];
      }
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

  var iconXPosition;
  var iconYPosition;


  // Item position definition
  for (var i=0; i<exifTagsArray.length; i++) {

    switch (i) {
      case 0:
      iconXPosition = new UnitValue(120, 'px');
      iconYPosition = new UnitValue(100, 'px');
      break;
      case 1:
      iconXPosition = new UnitValue(360, 'px');
      iconYPosition = new UnitValue(100, 'px');
      break;
      case 2:
      iconXPosition = new UnitValue(120, 'px');
      iconYPosition = new UnitValue(180, 'px');
      break;
      case 3:
      iconXPosition = new UnitValue(335, 'px');
      iconYPosition = new UnitValue(180, 'px');
      break;
      case 4:
      iconXPosition = new UnitValue(500, 'px');
      iconYPosition = new UnitValue(180, 'px');
      break;
      case 5:
      iconXPosition = new UnitValue(695, 'px');
      iconYPosition = new UnitValue(180, 'px');
      break;
    }

    var iconTextSeparation = new UnitValue(40, 'px');

    var textXPosition = iconXPosition + iconTextSeparation;
    var textYPosition = iconYPosition;

    // Group for both the image and the text
    var group = app.activeDocument.layerSets.add();
    group.name = exifTagsArray[i];

    // Be careful with the encoding for the "Ó": http://www.javascripter.net/faq/accentedcharacters.htm
    var selectedFilePath = "D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Icons/" + exifTagsArray[i] + ".png";
    addIcon (selectedFilePath, exifTagsArray[i], new UnitValue(32, 'px'));

    MoveLayerTo(doc.activeLayer, iconXPosition, iconYPosition, "middlecenter");

    addMetadataAsText(exifTagsArray[i], exifTagsArray[i], "FFFFFF", "WorkSansRoman-Light", new UnitValue(24, 'px'), 50);

    MoveLayerTo(doc.activeLayer, textXPosition, textYPosition, "middleleft");

  };

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

addMetadataWithIcons([272, 42036, 37377, 37378, 34855, 37386]);