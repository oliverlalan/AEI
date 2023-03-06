////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createTextLayer(targetComposition, text, position, anchorPoint, justification) {

    if (targetComposition === undefined) {
        var targetComposition = project.activeItem;
    } 

    if(sliderTextParameters.fontCapitalization) { text = text.toString().toUpperCase() };

    // Create a new text layer
    var textLayer = targetComposition.layers.addText(text);

    // Set the font properties
    var textProperties = textLayer.property("Source Text").value;
    textProperties.resetCharStyle();
    textProperties.fontSize = sliderTextParameters.fontSize;
    textProperties.fillColor = sliderTextParameters.fontColor;
    textProperties.font = sliderTextParameters.fontName;
    textProperties.tracking = sliderTextParameters.fontTracking;

    // Set justification
    textProperties.justification = justification;

    // Set the text properties back to the layer
    textLayer.property("Source Text").setValue(textProperties);

    // Set the position and anchor point
    setAnchorPoint(textLayer, anchorPoint);
    textLayer.position.setValue(position);

    return textLayer;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////