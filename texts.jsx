
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addText (text, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization) {

    text = text.toString();

    if(text!= "") {

        var textLayer = app.activeDocument.artLayers.add();

        textLayer.kind = LayerKind.TEXT;
        textLayer.textItem.size = new UnitValue(fontSize, 'px');
        color = new SolidColor();
        color.rgb.hexValue = fontHexColor;
        textLayer.textItem.color = color;
        textLayer.textItem.font = fontName;
        textLayer.textItem.tracking = fontTracking;
        textLayer.textItem.justification = fontJustification;
        textLayer.textItem.capitalization = fontCapitalization;
        textLayer.textItem.contents = text;

        translateLayerTo(textLayer, xPosition, yPosition, anchorPosition);

        return app.activeDocument.activeLayer;

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Based on https://stackoverflow.com/questions/28990505/extendscript-how-to-check-whether-text-content-overflows-the-containing-rectang

function fitTextLayerToWidth (textLayer, targetWidth){

    textLayer.textItem.tracking = new UnitValue(50, "px");
    targetWidth = new UnitValue(targetWidth, "px");

    do {
        var size = textLayer.textItem.size;
        textLayer.textItem.size = size * 0.95; // To decrease iterations.
    }
    while(targetWidth < getRealTextLayerProperties(textLayer).width);

    do {
        var tracking = textLayer.textItem.tracking;
        textLayer.textItem.tracking = tracking * 1.05; // To decrease iterations.
    }
    while(targetWidth > getRealTextLayerProperties(textLayer).width);

    textLayer.textItem.tracking = tracking; //To ensure it fits.

    function getRealTextLayerProperties(textLayer) {

        var textLayerCopy = textLayer.duplicate(activeDocument, ElementPlacement.INSIDE);

        textLayerCopy.rasterize(RasterizeType.TEXTCONTENTS);

        var dimensions = getLayerDimensions(textLayerCopy);
        textLayerCopy.remove();

        return dimensions;

    }

    function getLayerDimensions(layer) {

        return { 
            width : layer.bounds[2] - layer.bounds[0],
            height : layer.bounds[3] - layer.bounds[1]
        }

    }
 
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Based on https://stackoverflow.com/questions/28990505/extendscript-how-to-check-whether-text-content-overflows-the-containing-rectang

function fitTextLayerToBox (textLayer, leftMargin, topMargin, rightMargin, bottomMargin) {

    // Make sure it is a centered paragraph text
    textLayer.textItem.kind = TextType.PARAGRAPHTEXT;
    textLayer.textItem.justification = Justification.CENTER;

    // Parameters
    leftMargin      = new UnitValue(    leftMargin,     'px');
    rightMargin     = new UnitValue(    rightMargin,    'px');
    topMargin       = new UnitValue(    topMargin,      'px');
    bottomMargin    = new UnitValue(    bottomMargin,   'px');

    // Resize text layer
    textLayer.textItem.width = rightMargin - leftMargin;
    textLayer.textItem.height = bottomMargin - topMargin;

    // Translate layer
    var centerX = (rightMargin + leftMargin) / 2;
    translateLayerTo(textLayer, centerX, topMargin, "topcenter");

    // Fit text in margins
    if(textLayer.textItem.contents != "") {
        textLayer.textItem.useAutoLeading = false;
        textLayer.textItem.leading = 60;
        var i = 0;

        do {
            var leading = textLayer.textItem.leading;
            textLayer.textItem.leading = leading * 1.05; // To decrease iterations.
            if(i>20) break;
        }
        while(textLayer.textItem.height > getRealTextLayerProperties(textLayer).height);

        textLayer.textItem.leading = leading; //To ensure it fits.

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getRealTextLayerProperties(textLayer) {

    var textLayerCopy = textLayer.duplicate(activeDocument, ElementPlacement.INSIDE);

    textLayerCopy.textItem.height = app.activeDocument.height;
    
    textLayerCopy.rasterize(RasterizeType.TEXTCONTENTS);

    var layerProperties = getLayerProperties(textLayerCopy);
    textLayerCopy.remove();

    return layerProperties;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functinon to change the text style of some characters withing a textItem

// https://community.adobe.com/t5/photoshop-ecosystem-discussions/read-and-change-specific-words-in-a-text-layer/m-p/9812864

function set_text_style(from, len, size, fontPostScriptName) {

    try {

        var d = new ActionDescriptor();

        var r = new ActionReference();

        r.putEnumerated(stringIDToTypeID("textLayer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));

        d.putReference(stringIDToTypeID("null"), r);

        var d1 = new ActionDescriptor();

        var list1 = new ActionList();

        var d2 = new ActionDescriptor();

        d2.putInteger(stringIDToTypeID("from"), from);

        d2.putInteger(stringIDToTypeID("to"), from+len);

        var d3 = new ActionDescriptor();

        d3.putString(stringIDToTypeID("fontPostScriptName"), fontPostScriptName);

        d3.putUnitDouble(stringIDToTypeID("size"), stringIDToTypeID("pointsUnit"), size);

        d2.putObject(stringIDToTypeID("textStyle"), stringIDToTypeID("textStyle"), d3);

        list1.putObject(stringIDToTypeID("textStyleRange"), d2);

        d1.putList(stringIDToTypeID("textStyleRange"), list1);

        d.putObject(stringIDToTypeID("to"), stringIDToTypeID("textLayer"), d1);

        executeAction(stringIDToTypeID("set"), d, DialogModes.NO);

        }

    catch (e) { throw(e); } 

}
