////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createSliderTextLabelLayer (targetComposition, setting, position, anchorPoint, justification) {

    text = setting.displayName

    if(sliderTextParameters.fontCapitalization) { text = text.toString().toUpperCase() };

    // Create a new text layer
    var textLayer = targetComposition.layers.addText(text);
    textLayer.name = "Slider Label";

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
// Call: createAnimatedTextLayer (0, 100, 2, 4, [0,0],...)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createSliderTextValueLayer (targetComposition, valuesInterval, timesInterval, position, anchorPoint, justification) {

    // Create a new text layer
    var textLayer = targetComposition.layers.addText("Slider Value");

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

    // Add an expression to the text layer's Source Text property
    textLayer.property("Source Text").expression = "Math.round(ease(time, " + timesInterval[0] + ", " + timesInterval[1] + ", " + valuesInterval[0] + ", " + valuesInterval[1] + "))";

    // Select the text layer
    textLayer.selected = true;

}
