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
// Call: createSliderTextValueLayer (sliderComposition, [setting.defaultValue, setting.settingValue], [sliderTextParameters.animation.start, sliderTextParameters.animation.end], sliderTextValueParameters.position, sliderTextValueParameters.anchorPoint, sliderTextValueParameters.justification)
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

    return textLayer;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createGroupTitleLayer (groupComposition, groupName)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createGroupTitleLayer (targetComposition, text)  {

    // Create a new text layer
    var textLayer = targetComposition.layers.addText(text.toString().toUpperCase());
    textLayer.name = "Group Title";

    // Set the font properties
    var textProperties = textLayer.property("Source Text").value;
    textProperties.resetCharStyle();
    textProperties.fontSize = groupTitleParameters.fontSize;
    textProperties.fillColor = groupTitleParameters.fontColor;
    textProperties.font = groupTitleParameters.fontName;
    textProperties.tracking = groupTitleParameters.fontTracking;

    // Set justification
    textProperties.justification = groupTitleParameters.justification;

    // Set the text properties back to the layer
    textLayer.property("Source Text").setValue(textProperties);

    // Set the position and anchor point
    setAnchorPoint(textLayer, groupTitleParameters.anchorPoint);
    textLayer.position.setValue(groupTitleParameters.position);

    groupCompositionParameters.position[1] += groupTitleParameters.height;

    return textLayer;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createAnimatedTextLayer (0, 100, 2, 4, [0,0],...)
// TODO: Define function: createPanelTitleComposition for consistency purposes
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createPanelTitleLayer (targetComposition, text)  {

    // Create a new text layer
    var textLayer = targetComposition.layers.addText(text.toString().toUpperCase());
    textLayer.name = "Panel Title";

    // Set the font properties
    var textProperties = textLayer.property("Source Text").value;
    textProperties.resetCharStyle();
    textProperties.fontSize = panelTitleParameters.fontSize;
    textProperties.fillColor = panelTitleParameters.fontColor;
    textProperties.font = panelTitleParameters.fontName;
    textProperties.tracking = panelTitleParameters.fontTracking;

    // Set justification
    textProperties.justification = panelTitleParameters.justification;

    // Set the text properties back to the layer
    textLayer.property("Source Text").setValue(textProperties);

    // Set the position and anchor point
    setAnchorPoint(textLayer, panelTitleParameters.anchorPoint);
    textLayer.position.setValue(panelTitleParameters.position);

    return textLayer;

}
