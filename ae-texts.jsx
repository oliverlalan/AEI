////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createSliderTextValueLayer (sliderComposition, [setting.defaultValue, setting.settingValue], [sliderTextParameters.animation.start, sliderTextParameters.animation.end], sliderTextValueParameters.position, sliderTextValueParameters.anchorPosition, sliderTextValueParameters.justification)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createToneCurveValueLayer (targetComposition, valuesInterval, timesInterval, position, anchorPosition, justification) {

    // Create a new text layer
    var textLayer = targetComposition.layers.addText("Tone Curve Value");

    // Set the font properties
    var textProperties = textLayer.property("Source Text").value;
    textProperties.resetCharStyle();
    textProperties.fontSize = toneCurveValuesCompositionParameters.text.fontSize;
    textProperties.fillColor = toneCurveValuesCompositionParameters.text.fontColor;
    textProperties.font = toneCurveValuesCompositionParameters.text.fontName;
    textProperties.tracking = toneCurveValuesCompositionParameters.text.fontTracking;

    // Set justification
    textProperties.justification = justification;

    // Set the text properties back to the layer
    textLayer.property("Source Text").setValue(textProperties);

    // Set the position and anchor point
    setAnchorPosition(textLayer, anchorPosition);
    textLayer.position.setValue(position);

    // Add an expression to the text layer's Source Text property
    var expression = "inputValue = " + valuesInterval[0] + "; inputValue = inputValue.toString(); while (inputValue.length < 3) { inputValue = '0' + inputValue; }; outputValue = Math.round(easeOut(time, " + timesInterval[0] + ", " + timesInterval[1] + ", " + valuesInterval[0] + ", " + valuesInterval[1] + ")).toString(); while (outputValue.length < 3) { outputValue = '0' + outputValue; }; '[' + inputValue + ':' + outputValue + ']';";
    textLayer.property("Source Text").expression = expression;

    // Select the text layer
    textLayer.selected = true;

    return textLayer;

}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createSliderTextValueLayer (sliderComposition, [setting.defaultValue, setting.settingValue], [sliderTextParameters.animation.start, sliderTextParameters.animation.end], sliderTextValueParameters.position, sliderTextValueParameters.anchorPosition, sliderTextValueParameters.justification)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createSliderTextValueLayer (targetComposition, valuesInterval, timesInterval, position, anchorPosition, justification) {

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
    setAnchorPosition(textLayer, anchorPosition);
    textLayer.position.setValue(position);

    // Add an expression to the text layer's Source Text property
    textLayer.property("Source Text").expression = "Math.round(easeOut(time, " + timesInterval[0] + ", " + timesInterval[1] + ", " + valuesInterval[0] + ", " + valuesInterval[1] + "))";

    // Select the text layer
    textLayer.selected = true;

    return textLayer;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: 
// addTextLabelLayer (app.project.activeItem, colorGradeSliderParameters.textLabel, {displayName: "Label"})
// TODO: Update code that uses createSliderTextLabelLayer to use this function instead
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addTextLabelLayer (targetComposition, textLayerParameters, setting) {

    var text = setting.displayName

    if(textLayerParameters.fontCapitalization) { text = text.toString().toUpperCase() };

    // Create a new text layer
    var textLayer = targetComposition.layers.addText(text);
    textLayer.name = setting.displayName + " Label";

    // Set the font properties
    var textProperties = textLayer.property("Source Text").value;
    textProperties.resetCharStyle();
    textProperties.fontSize = textLayerParameters.fontSize;
    textProperties.fillColor = textLayerParameters.fontColor;
    textProperties.font = textLayerParameters.fontName;
    textProperties.tracking = textLayerParameters.fontTracking;
    textProperties.justification = textLayerParameters.justification;

    // Set the text properties back to the layer
    textLayer.property("Source Text").setValue(textProperties);

    // Set the position and anchor point
    setAnchorPosition(textLayer, textLayerParameters.anchorPosition);
    textLayer.position.setValue(textLayerParameters.position.reference);

    return textLayer;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: addTextValueLayer (app.project.activeItem, colorGradeSliderParameters.textValue, {keyTimes: [0,3], defaultValue: 0, settingValue: 80})
// addTextValueLayer (app.project.activeItem, colorGradeSliderParameters.textValue, {keyTimes: [0,3], defaultValue: 0, settingValue: 80})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addTextValueLayer (targetComposition, textLayerParameters, setting) {

    // Create a new text layer
    var textLayer = targetComposition.layers.addText("Value");
    textLayer.name = setting.displayName + " Value";

    // Set the font properties
    var textProperties = textLayer.property("Source Text").value;
    textProperties.resetCharStyle();
    textProperties.fontSize = textLayerParameters.fontSize;
    textProperties.fillColor = textLayerParameters.fontColor;
    textProperties.font = textLayerParameters.fontName;
    textProperties.tracking = textLayerParameters.fontTracking;
    textProperties.justification = textLayerParameters.justification;

    // Set the text properties back to the layer
    textLayer.property("Source Text").setValue(textProperties);

    // Set the position and anchor point
    setAnchorPosition(textLayer, textLayerParameters.anchorPosition);
    textLayer.position.setValue(textLayerParameters.position.reference);

    // Add an expression to the text layer's Source Text property
    textLayer.property("Source Text").expression = "Math.round(easeOut(time, " + setting.animation.setting.keyTimes[0] + ", " + setting.animation.setting.keyTimes[1] + ", " + setting.defaultValue + ", " + setting.settingValue + "))";

    // Select the text layer
    // textLayer.selected = true;

    return textLayer;

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createGroupTitleComposition (groupParameters)
// TODO: Define universal function createTitleComposition (groupParameters)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createGroupTitleComposition (groupParameters) {

    // Create Title Composition
    var groupTitleComposition = project.items.addComp(groupParameters.title.name, groupParameters.title.width, groupParameters.title.height, groupParameters.composition.pixelAspect, groupParameters.composition.duration, groupParameters.composition.frameRate);

    // Create Title Layer
    var groupTitleLayer = createGroupTitleLayer (groupTitleComposition, groupParameters.title.name);

    // Set the position and anchor point
    setAnchorPosition(groupTitleLayer, groupParameters.title.anchorPosition);
    groupTitleLayer.position.setValue(groupParameters.title.position.reference);

    return groupTitleComposition;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createGroupTitleLayer (groupComposition, groupName)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createGroupTitleLayer (targetComposition, text)  {

    // Create a new text layer
    var textLayer = targetComposition.layers.addText(text.toString().toUpperCase());
    textLayer.name = "Title";

    // Set the font properties
    var textProperties = textLayer.property("Source Text").value;
    textProperties.resetCharStyle();
    textProperties.fontSize = groupTitleCompositionParameters.fontSize;
    textProperties.fillColor = groupTitleCompositionParameters.fontColor;
    textProperties.font = groupTitleCompositionParameters.fontName;
    textProperties.tracking = groupTitleCompositionParameters.fontTracking;

    // Set justification
    textProperties.justification = groupTitleCompositionParameters.justification;

    // Set the text properties back to the layer
    textLayer.property("Source Text").setValue(textProperties);

    return textLayer;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createDashboardTitleComposition (dashboardName)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createDashboardTitleComposition (dashboardName) {

    // Create Title Composition
    var dashboardCompositionName = "Title: " + dashboardName;
    var dashboardTitleComposition = project.items.addComp(dashboardCompositionName, dashboardCompositionParameters.width, dashboardCompositionParameters.height, dashboardCompositionParameters.pixelAspect, dashboardCompositionParameters.duration, dashboardCompositionParameters.frameRate);

    // Create Title Layer
    var dashboardTitleLayer = createDashboardTitleLayer (dashboardTitleComposition, dashboardName);

    // Set the position and anchor point
    setAnchorPosition(dashboardTitleLayer, panelTitleParameters.anchorPosition);
    dashboardTitleLayer.position.setValue(panelTitleParameters.position);

    return dashboardTitleComposition;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createDashboardTitleLayer (targetComposition, text)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createDashboardTitleLayer (targetComposition, text)  {

    // Create a new text layer
    var textLayer = targetComposition.layers.addText(text.toString().toUpperCase());
    textLayer.name = "Title";

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

    return textLayer;

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DEPRECATED CODE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function createSliderTextLabelLayer (targetComposition, setting, position, anchorPosition, justification) {

//     text = setting.displayName

//     if(sliderTextParameters.fontCapitalization) { text = text.toString().toUpperCase() };

//     // Create a new text layer
//     var textLayer = targetComposition.layers.addText(text);
//     textLayer.name = "Slider Label";

//     // Set the font properties
//     var textProperties = textLayer.property("Source Text").value;
//     textProperties.resetCharStyle();
//     textProperties.fontSize = sliderTextParameters.fontSize;
//     textProperties.fillColor = sliderTextParameters.fontColor;
//     textProperties.font = sliderTextParameters.fontName;
//     textProperties.tracking = sliderTextParameters.fontTracking;

//     // Set justification
//     textProperties.justification = justification;

//     // Set the text properties back to the layer
//     textLayer.property("Source Text").setValue(textProperties);

//     // Set the position and anchor point
//     setAnchorPosition(textLayer, anchorPosition);
//     textLayer.position.setValue(position);

//     return textLayer;

// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createGroupTitleComposition (groupName)
// DEPRECATED
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function createGroupTitleComposition (groupName) {

//     // Create Title Composition
//     var groupTitleCompositionName = "Title: " + groupName;
//     var groupTitleComposition = project.items.addComp(groupTitleCompositionName, groupTitleCompositionParameters.width, groupTitleCompositionParameters.height, groupTitleCompositionParameters.pixelAspect, groupTitleCompositionParameters.duration, groupTitleCompositionParameters.frameRate);

//     // Create Title Layer
//     var groupTitleLayer = createGroupTitleLayer (groupTitleComposition, groupName);

//     // Set the position and anchor point
//     setAnchorPosition(groupTitleLayer, groupTitleCompositionParameters.anchorPosition);
//     groupTitleLayer.position.setValue(groupTitleCompositionParameters.position);

//     return groupTitleComposition;

// }