////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createSlidersGroupComposition (groups[groupKey], style);
// TODO: Compute setSpacing based on ammount of slider settings
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createSlidersGroupComposition (settingsGroup, style) {

    var groupName = settingsGroup.displayName;
    var settings = settingsGroup.settings;

    // Reset reference position
    var groupReferencePosition = [0,0];

    // Create folder to store each slider
    var groupCompositionsFolder = project.items.addFolder(groupName + " Pre-Compositions");

    // Create group composition 
    var groupComposition = project.items.addComp(groupName, groupCompositionParameters.width, groupCompositionParameters.height, groupCompositionParameters.pixelAspect, groupCompositionParameters.duration, groupCompositionParameters.frameRate);

    // Create title
    var groupTitleComposition = createGroupTitleComposition (groupName);

    // Include the precomposition created in the group composition
    var groupTitleCompositionLayer = groupComposition.layers.add(groupTitleComposition);

    // Position the precomposition in the group composition
    setAnchorPosition(groupTitleCompositionLayer, "topLeft");
    groupTitleCompositionLayer.position.setValue(groupReferencePosition);

    // Update Y position of the next precomposition
    groupReferencePosition[1] += groupTitleCompositionParameters.height;

    for (settingKey in settings) {

        // Create each precomposition
        var settingComposition = createSliderComposition (settings[settingKey], style);

        // Store the precomposition in the corresponding foldre
        settingComposition.parentFolder = groupCompositionsFolder;

        // Include the precomposition created in the group composition
        var settingComposition = groupComposition.layers.add(settingComposition);

        // Position the precomposition in the group composition
        setAnchorPosition(settingComposition, "topLeft");
        settingComposition.position.setValue(groupReferencePosition);

        // Update Y position of the next precomposition
        groupReferencePosition[1] += settingComposition.height;

    }

    return groupComposition;

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: var settingComposition = createSliderComposition (settings[settingKey], style);
// TODO: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createSliderComposition (setting, style) {

    var compositionName = setting.displayName + " " + setting.group;

    var sliderComposition = selectCompositionByName(compositionName);

    if (sliderComposition) {
        return sliderComposition;
    }
    
    // Create folder

    
    //Define composition size based on style
    switch (style)  {

        case "horizontalSliderWithLabelOnLeft":

            // Define Composition Parameters
            sliderCompositionParameters.width = 1080; // Compute
            sliderCompositionParameters.height = 45; // Compute

            sliderBarParameters.width = 8 * 45;
            sliderBarParameters.stroke.length = sliderBarParameters.width - sliderBarParameters.padding.left - sliderBarParameters.padding.right - sliderBarParameters.stroke.width;
            sliderBarParameters.height = sliderTextParameters.height = sliderCompositionParameters.height;

            sliderBarParameters.vertices = [];
            sliderBarParameters.vertices[0] = [45 + sliderCompositionParameters.padding.left + sliderTextParameters.width + sliderBarParameters.padding.left + sliderBarParameters.stroke.width / 2, sliderBarParameters.height / 2];
            sliderBarParameters.vertices[1] = [sliderBarParameters.vertices[0][0] + sliderBarParameters.stroke.length, sliderBarParameters.height / 2];
            sliderBarParameters.anchorPoint = [sliderBarParameters.vertices[0][0] + (setting.defaultValue - setting.min) / (setting.max - setting.min) * sliderBarParameters.stroke.length, sliderBarParameters.vertices[0][1]];

            sliderCircleParameters.position = sliderBarParameters.anchorPoint;
            sliderCircleParameters.animation = {
                position: {
                keyTimes: setting.animation.setting.keyTimes,
                keyValues:[sliderBarParameters.anchorPoint, [sliderBarParameters.vertices[0][0] + (setting.settingValue - setting.min) / (setting.max - setting.min) * sliderBarParameters.stroke.length, sliderBarParameters.vertices[0][1]]]
                }
            };

            var sliderTextLabelParameters = {
                position: [sliderCompositionParameters.padding.left + sliderTextParameters.width, sliderBarParameters.height / 2],
                anchorPosition: "middleRight",
                justification: ParagraphJustification.RIGHT_JUSTIFY,
            };

            var sliderTextValueParameters = {
                position: [sliderCompositionParameters.width - sliderCompositionParameters.padding.right, sliderBarParameters.height / 2],
                anchorPosition: "middleRight",
                justification:  ParagraphJustification.RIGHT_JUSTIFY,
            };

            // Crate Slider Composition
            var sliderComposition = project.items.addComp(compositionName, sliderCompositionParameters.width, sliderCompositionParameters.height, sliderCompositionParameters.pixelAspect, sliderCompositionParameters.duration, sliderCompositionParameters.frameRate);

            // Create Text Label layer
            var sliderTextLabelLayer = createSliderTextLabelLayer (sliderComposition, setting, sliderTextLabelParameters.position, sliderTextLabelParameters.anchorPosition, sliderTextLabelParameters.justification);
            
            // Create Text Value Layer
            var sliderTextValueLayer = createSliderTextValueLayer (sliderComposition, [setting.defaultValue, setting.settingValue], setting.animation.setting.keyTimes, sliderTextValueParameters.position, sliderTextValueParameters.anchorPosition, sliderTextValueParameters.justification);

            // Create Slider Bar Layer
            var sliderBarLayer = createSliderBarLayer (sliderComposition, setting, sliderBarParameters.vertices, sliderBarParameters.anchorPoint, sliderBarParameters.stroke.width)

            // Create Slider Circle Layer
            var sliderCircleLayer = createSliderCircleLayer (sliderComposition, setting, sliderCircleParameters.diameter, sliderCircleParameters.position);

            // Animate slider bar
            // animateLayer (sliderBarLayer, "Scale")

            // Animate slider circle
            animateShape (sliderCircleLayer, "Position", sliderCircleParameters.animation.position.keyTimes, sliderCircleParameters.animation.position.keyValues);
            // sliderCircleLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vector Transform Group").property("Position").setValuesAtTimes(sliderCircleParameters.animation.position.keyTimes, sliderCircleParameters.animation.position.keyValues);

        break;

        case "horizontalSliderWithLabelOnTop":

        break;

        case "horizontalSliderWithNoLabel":

        break;

        case "verticalSliderWithLabel":

        break;

    }

    return sliderComposition;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: 
// TODO: Replace by addShape
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createSliderCircleLayer (targetComposition, setting, sliderCircleDiameter, sliderCirclePosition) {

    // Create a new shape layer
    var sliderCircleLayer = targetComposition.layers.addShape(); // create a new shape layer
    sliderCircleLayer.name = "Slider Circle";
    
    // Create a new shape group
    var sliderCircleShape = sliderCircleLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group"); // add a new circle shape
    sliderCircleShape.name = "Circle Shape"; // set the shape name
    
    // Create a new shape path
    var sliderCirclePath = sliderCircleShape.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse"); // add an ellipse shape
    sliderCirclePath.property("ADBE Vector Ellipse Size").setValue([sliderCircleDiameter, sliderCircleDiameter]); // set the ellipse size

    // Fill
    var sliderCircleFill = sliderCircleShape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill"); // add a fill property
    sliderCircleFill.property("ADBE Vector Fill Color").setValue(sliderCircleParameters.fill.color); // set the fill color to white

    // Stroke
    // var sliderCircleStroke = sliderCircleShape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke"); // add a fill property
    // sliderCircleStroke.property("ADBE Vector Stroke Color").setValue([0, 255, 0, 255]/255); // set the fill color to black

    // Add the Drop Shadow effect to the layer
    var sliderCircleLayerShadow = sliderCircleLayer.property("ADBE Effect Parade").addProperty("ADBE Drop Shadow");
    sliderCircleLayerShadow.property("Opacity").setValue(sliderCircleParameters.shadow.opacity);
    sliderCircleLayerShadow.property("Direction").setValue(sliderCircleParameters.shadow.direction);
    sliderCircleLayerShadow.property("Distance").setValue(sliderCircleParameters.shadow.distance);
    sliderCircleLayerShadow.property("Softness").setValue(sliderCircleParameters.shadow.softness);
    
    // Effects
    // targetComposition.openInViewer();

    // // Stroke
    // app.executeCommand(app.findMenuCommandId("Stroke"));
    // var sliderCircleStroke = sliderCircleLayer.property("Layer Styles").property("Stroke");
    // sliderCircleStroke.property("Color").setValue(sliderCircleParameters.stroke.color);
    // sliderCircleStroke.property("Size").setValue(sliderCircleParameters.stroke.width);
    // sliderCircleStroke.property("Opacity").setValue(sliderCircleParameters.stroke.opacity);
    // sliderCircleStroke.property("Position").setValue(sliderCircleParameters.stroke.position);

    // Shadow
    // app.executeCommand(app.findMenuCommandId("Drop Shadow")); // Returns wrong ID (the one for the effect, not the layer style)
    // app.executeCommand(9000);
    // var sliderCircleLayerShadow = sliderCircleLayer.property("Layer Styles").property("Drop Shadow");
    // sliderCircleLayerShadow.property("Opacity").setValue(sliderCircleParameters.shadow.opacity); // set the shadow opacity
    // sliderCircleLayerShadow.property("Angle").setValue(sliderCircleParameters.shadow.angle); // set the shadow opacity
    // sliderCircleLayerShadow.property("Distance").setValue(sliderCircleParameters.shadow.distance); // set the shadow distance
    // sliderCircleLayerShadow.property("Spread").setValue(sliderCircleParameters.shadow.spread); // set the shadow softness
    // sliderCircleLayerShadow.property("Size").setValue(sliderCircleParameters.shadow.size); // set the shadow softness

    // Anchor Point
    // var sliderCircleAnchor = sliderCircleLayer.property("ADBE Transform Group").property("ADBE Anchor Point"); // get the anchor point property
    // sliderCircleAnchor.setValue([0, 0]); // set the anchor point to 0,0

    // Position
    // Reset layer reference point
    sliderCircleLayer.position.setValue([0,0]);
    sliderCircleShape.property("ADBE Vector Transform Group").property("Anchor Point").setValue([0,0]);

    // Set the position and anchor point
    sliderCircleShape.property("ADBE Vector Transform Group").property("Position").setValue(sliderCirclePosition);

    return sliderCircleLayer;

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// TODO: if(setting.fillType == "gradient")
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createSliderBarLayer (targetComposition, setting, sliderBarVertices, sliderBarAnchorPoint, sliderBarWidth) {

    // Create a new shape layer
    var sliderBarLayer = targetComposition.layers.addShape(); // create a new shape layer
    sliderBarLayer.name = "Slider Bar";

    // Create a new shape group
    var sliderBarShape = sliderBarLayer.property("Contents").addProperty("ADBE Vector Group");
    sliderBarShape.name = "Bar Shape"; // set the shape name

    // Create a new shape path
    var sliderBarPath = sliderBarShape.property("Contents").addProperty("ADBE Vector Shape - Group");

    // Create initial and final shape objects out of the point arrays
    var sliderBarPathShape = new Shape();
    sliderBarPathShape.vertices = sliderBarVertices;
    sliderBarPathShape.closed = false;

    // Set the new shape as the value of the shape property
    sliderBarPath.property("Path").setValue(sliderBarPathShape);

    // Stroke
    var sliderBarPathStroke = sliderBarShape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
    sliderBarPathStroke.property("ADBE Vector Stroke Color").setValue(setting.solidColor);
    sliderBarPathStroke.property("ADBE Vector Stroke Width").setValue(sliderBarWidth);
    sliderBarPathStroke.property("ADBE Vector Stroke Line Cap").setValue(sliderBarParameters.stroke.cap);

    // Position
    // Reset layer reference point
    sliderBarLayer.position.setValue([0,0]);

    // Set the position and anchor point
    sliderBarShape.property("ADBE Vector Transform Group").property("Position").setValue(sliderBarAnchorPoint);
    sliderBarShape.property("ADBE Vector Transform Group").property("Anchor Point").setValue(sliderBarAnchorPoint);

    // Effects
    targetComposition.openInViewer();

    // Gradient
    if(setting.fillType == "gradient") {

        // Apply the Gradient Overlay effect to the layer
        var sliderBarGradientRamp = sliderBarLayer.effect.addProperty("ADBE Ramp");
        sliderBarGradientRamp.property("Start of Ramp").setValue(sliderBarVertices[0]);
        sliderBarGradientRamp.property("Start Color").setValue(setting.gradientColors[0]);
        sliderBarGradientRamp.property("End of Ramp").setValue(sliderBarVertices[1]);
        sliderBarGradientRamp.property("End Color").setValue(setting.gradientColors[1]);
        sliderBarGradientRamp.property("Ramp Shape").setValue(1);
    
    }

    // Animate
    // animateLayer(toneCurvePath, "Path", [1,2], [initialShape, finalShape])

    // Bevel and Emboss
    // app.executeCommand(app.findMenuCommandId("Bevel and Emboss"));
    // var sliderBarBevelAndEmboss = sliderBarLayer.property("Layer Styles").property("Bevel and Emboss");
    // sliderBarBevelAndEmboss.property("Style").setValue(sliderBarParameters.layerStyle.bevelAndEmboss.style);
    // sliderBarBevelAndEmboss.property("Depth").setValue(sliderBarParameters.layerStyle.bevelAndEmboss.depth);
    // sliderBarBevelAndEmboss.property("Direction").setValue(sliderBarParameters.layerStyle.bevelAndEmboss.direction);
    // sliderBarBevelAndEmboss.property("Size").setValue(sliderBarParameters.layerStyle.bevelAndEmboss.size);
    // sliderBarBevelAndEmboss.property("Angle").setValue(sliderBarParameters.layerStyle.bevelAndEmboss.angle);
    // sliderBarBevelAndEmboss.property("Altitude").setValue(sliderBarParameters.layerStyle.bevelAndEmboss.altitude);
    // sliderBarBevelAndEmboss.property("Highlight Opacity").setValue(sliderBarParameters.layerStyle.bevelAndEmboss.highlightOpacity);
    // sliderBarBevelAndEmboss.property("Shadow Opacity").setValue(sliderBarParameters.layerStyle.bevelAndEmboss.shadowOpacity);

    // Stroke
    app.executeCommand(app.findMenuCommandId("Stroke"));
    app.executeCommand(9008);
    var sliderBarStroke = sliderBarLayer.property("Layer Styles").property("Stroke");
    sliderBarStroke.property("Color").setValue(sliderBarParameters.effects.stroke.color);
    sliderBarStroke.property("Size").setValue(sliderBarParameters.effects.stroke.size);
    sliderBarStroke.property("Opacity").setValue(sliderBarParameters.effects.stroke.opacity);
    sliderBarStroke.property("Position").setValue(sliderBarParameters.effects.stroke.position);

    // Shadow
    // app.executeCommand(app.findMenuCommandId("Drop Shadow"));
    // var sliderBarShadow = sliderBarLayer.property("Layer Styles").property("Drop Shadow");
    // sliderBarShadow.property("Use Global Light").setValue(true);

    return sliderBarLayer;

}
