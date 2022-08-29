
#target photoshop

function getExifTagIndex(exifData, exifTag) {
  for (var i = 0; i < exifData.length; i++) {
    var exifItem = exifData[i];
    if (exifItem[2] == exifTag) {
        return i;
    }
  }
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
function addImage (selectedFilePath, xPosition, yPosition) {
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

    var doc = activeDocument;
    // TODO: Posicionar la imagen
    
}

function addMetadataAsText (exifTag, targetGroupName, colorHexValue, fontName, fontSize, xPosition, yPosition) {

    // Document selection
    var doc = activeDocument;

    // Group selection
    var layerGroup = doc.layerSets.getByName(targetGroupName);

    // Text layer creation
    var txtLayer = layerGroup.artLayers.add();
    txtLayer.kind = LayerKind.TEXT;

    // Text 
    var textItemRef = txtLayer.textItem;

    // Text position definition
    textItemRef.position = [xPosition, yPosition];

    // Text color
    textColor = new SolidColor();
    textColor.rgb.hexValue = colorHexValue;
    textItemRef.color = textColor;

    // Text font
    textItemRef.font = fontName;

    // Text size TODO: Find a way to define size based on canvas height
    textItemRef.size=fontSize;

    // Finding the exif entry index (Variable and Value) for the desired exifTag 
    // as defined in https://web.archive.org/web/20190624045241if_/http://www.cipa.jp:80/std/documents/e/DC-008-Translation-2019-E.pdf
    var exifTagIndex = getExifTagIndex (doc.info.exif, exifTag);

    // Text content
    switch (exifTag) {
        case 34855:
        textItemRef.contents = "ISO " + doc.info.exif[exifTagIndex][1];
        break;

        case 272:
        var textString = doc.info.exif[exifTagIndex][1];
        textItemRef.contents = toTitleCase(textString);
        break;

        default:
        textItemRef.contents = doc.info.exif[exifTagIndex][1];
    }

    // Text center
    //textItemRef.kind = TextType.PARAGRAPHTEXT;
    //var verticalCenterOffset = textItemRef.height / 2;
    //var textCenterOffset = textItemRef.size / 2;
    //textItemRef.baselineShift = textCenterOffset - verticalCenterOffset;

}

function addMetadataVerticallyDistributed (exifTagsArray, targetGroupName) {
    
    // Document size
    var doc = activeDocument;
    var docHeight = doc.height.value;
    var docWidth = doc.width.value;

    // Document Header and Footer Margins
    var docHeightMarginsAsPercentage = 0.3; // Defines percentage of margins, computed as (amount of pixels in header + footer) / document height. TODO: Define automatically
    var docHeightMarginsAsPixels = docHeightMarginsAsPercentage * docHeight;

    // Document Content
    var rowsHeightAsPercentageOfContent = 0.7; // Defines percentage of content, computed as (sum of rows height) / (sum of rows height + sum of rows indents height). TODO: Define automatically
    var docHeightContentAsPercentage = 1 - docHeightMarginsAsPercentage;

    // Number of rows 
    var exifItemsCount = exifTagsArray.length;

    // Rows Height calculation. Computed based on number of entries
    var rowsHeightAsPercentage = (1 - 2 * docHeightMarginsAsPercentage) * rowsHeightAsPercentageOfContent / exifItemsCount;
    var rowsHeightAsPixels = rowsHeightAsPercentage * docHeight;

    // Rows Indents calculation
    var rowIndentsHeightAsPercentage = (1 - 2 * docHeightMarginsAsPercentage) * (1 - rowsHeightAsPercentageOfContent) / (exifItemsCount - 1);
    var rowIndentsHeightAsPixels = rowIndentsHeightAsPercentage * docHeight;
    
    // Font size based on canvas size
    var fontSize = new UnitValue(rowsHeightAsPixels/10, "px");

    // Initial vertical position
    var exifItemInitialVerticalPosition = docHeightMarginsAsPixels + (rowsHeightAsPixels + rowIndentsHeightAsPixels) / 2;
    var exifItemVerticalPosition = exifItemInitialVerticalPosition;

    // Horizontal position - Static
    var exifItemHorizontalPosition = 0.5 * docWidth;

    // Group definition for the group
    var group = app.activeDocument.layerSets.add();
    group.name = targetGroupName;

    for (var i=0; i<exifTags.length; i++) {
        addMetadataAsText(exifTagsArray[i], targetGroupName, "FFFFFF", "Comfortaa-Bold", fontSize, exifItemHorizontalPosition, exifItemVerticalPosition);
        exifItemVerticalPosition = exifItemVerticalPosition + rowIndentsHeightAsPixels + rowsHeightAsPixels;
        // Guardar el id en un array para seleccionar todas las capas, agruparlas y alinearlas
        // doc.activeLayer.id
    };

    centerLayerGroupVertically(targetGroupName);

}


function addImageAndMetadata(exifTag) {

    // Document selection
    var doc = activeDocument;

    // Group selection
    var layerGroup = doc.layerSets.getByName(exifTag);

    addMetadataAsText(exifTag)

    


    // Be careful with the encoding for the "Ó": http://www.javascripter.net/faq/accentedcharacters.htm
    var selectedFilePath = "D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Icons/" + exifTag + ".svg";
    addImage (selectedFilePath);
}


// Based on https://morris-photographics.com/photoshop/scripts/downloads/Center%20Layer%201-1-0.jsx
function centerLayerGroupVertically(layerGroupName) {

    // get document attributes
    var doc = activeDocument;
    var docHeight = doc.height.value;

    // get layer group
    var layer = doc.layerSets.getByName("exifData");
    var bounds = layer.bounds;

    // get layer dimensions
	var layerHeight = Number(bounds[3] - bounds[1]);

	// calculate offsets
	var dY = (docHeight - layerHeight) / 2 - Number(bounds[1]);

	// centers the active layer
	layer.translate(0, dY);
}


function makeDarkerNoisierBlurier(targetLayer) {

    // Document selection
    var doc = activeDocument;

    // Layer selection
    var targetLayer= doc.layers.getByName(targetLayer);

    targetLayer.applyGaussianBlur(100);

    targetLayer.adjustCurves([[0,0],[253,127]]);

    targetLayer.applyAddNoise(8, NoiseDistribution.GAUSSIAN, true);

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


nameFile();

makeDarkerNoisierBlurier("photoParameters");

var exifTags = [37377, 37378, 34855, 37386]
addMetadataVerticallyDistributed(exifTags, "exifData");
