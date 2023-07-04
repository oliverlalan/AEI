////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createSlidersGroupComposition (groups[groupKey], style);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createSlidersGroupComposition (settingsGroup, style) {

    var settings = settingsGroup.settings;

    // Reset reference position
    var groupReferencePosition = [0,0];

    // Create folder to store each slider
    var groupCompositionsFolder = project.items.addFolder(settingsGroup.displayName + " Pre-Compositions");

    // Define composition parameters
    var groupParameters = new GroupParameters (settingsGroup)

    // Create group composition 
    var groupComposition = project.items.addComp(groupParameters.composition.name, groupParameters.composition.width, groupParameters.composition.height, groupParameters.composition.pixelAspect, groupParameters.composition.duration, groupParameters.composition.frameRate);

    // Create background
    var groupBackgroundLayer = addShapeLayer (groupComposition, groupParameters.background);

    // Create title
    var groupTitleComposition = createGroupTitleComposition (groupParameters);

    // Include the precomposition created in the group composition
    var groupTitleCompositionLayer = groupComposition.layers.add(groupTitleComposition);

    // Position the precomposition in the group composition
    setAnchorPosition(groupTitleCompositionLayer, "topLeft");
    groupTitleCompositionLayer.position.setValue(groupReferencePosition);

    // Update Y position of the next precomposition
    groupReferencePosition[1] += groupParameters.title.height;

    for (settingKey in settings) {

        // Create each precomposition
        var settingComposition = createSliderComposition (settings[settingKey], style);

        // Store the precomposition in the corresponding folder
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createSliderComposition (setting, style) {

    //Define composition parameters based on style
    switch (style)  {

        case "horizontalSlider":
            var sliderParameters = new HorizontalSlider(810, 45, setting);
        break;

        case "horizontalStackedSlider":
            var sliderParameters = new HorizontalStackedSlider(270, 90, setting);
        break;

        case "horizontalSliderWithNoLabel":

        break;

        case "verticalSliderWithLabel":

        break;

    }

    var sliderComposition = selectCompositionByName(sliderParameters.composition.name);

    if (sliderComposition) {
        return sliderComposition;
    }

    // Crate Slider Composition
    var sliderComposition = project.items.addComp(sliderParameters.composition.name, sliderParameters.composition.width, sliderParameters.composition.height, sliderParameters.composition.pixelAspect, sliderParameters.composition.duration, sliderParameters.composition.frameRate);

    // Create Text Label layer
    var sliderTextLabelLayer = addTextLabelLayer (sliderComposition, sliderParameters.textLabel, setting);
 
    // Create Text Value Layer
    var sliderTextValueLayer = addTextValueLayer (sliderComposition, sliderParameters.textValue, setting);

    // Create Slider Bar Layer
    var sliderBarLayer = addShapeLayer(sliderComposition, sliderParameters.sliderBar);

    // Create Slider Circle Layer
    var sliderCircleLayer = addShapeLayer(sliderComposition, sliderParameters.sliderCircle);

    return sliderComposition;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DEPRECATED
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: 
// DEPRECATED
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function createSliderCircleLayer (targetComposition, setting, sliderCircleDiameter, sliderCirclePosition) {

//     // Create a new shape layer
//     var sliderCircleLayer = targetComposition.layers.addShape(); // create a new shape layer
//     sliderCircleLayer.name = "Slider Circle";
    
//     // Create a new shape group
//     var sliderCircleShape = sliderCircleLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group"); // add a new circle shape
//     sliderCircleShape.name = "Circle Shape"; // set the shape name
    
//     // Create a new shape path
//     var sliderCirclePath = sliderCircleShape.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse"); // add an ellipse shape
//     sliderCirclePath.property("ADBE Vector Ellipse Size").setValue([sliderCircleDiameter, sliderCircleDiameter]); // set the ellipse size

//     // Fill
//     var sliderCircleFill = sliderCircleShape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill"); // add a fill property
//     sliderCircleFill.property("ADBE Vector Fill Color").setValue(sliderCircleParameters.fill.color); // set the fill color to white

//     // Stroke
//     // var sliderCircleStroke = sliderCircleShape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke"); // add a fill property
//     // sliderCircleStroke.property("ADBE Vector Stroke Color").setValue([0, 255, 0, 255]/255); // set the fill color to black

//     // Add the Drop Shadow effect to the layer
//     var sliderCircleLayerShadow = sliderCircleLayer.property("ADBE Effect Parade").addProperty("ADBE Drop Shadow");
//     sliderCircleLayerShadow.property("Opacity").setValue(sliderCircleParameters.shadow.opacity);
//     sliderCircleLayerShadow.property("Direction").setValue(sliderCircleParameters.shadow.direction);
//     sliderCircleLayerShadow.property("Distance").setValue(sliderCircleParameters.shadow.distance);
//     sliderCircleLayerShadow.property("Softness").setValue(sliderCircleParameters.shadow.softness);
    
//     // Effects
//     // targetComposition.openInViewer();

//     // // Stroke
//     // app.executeCommand(app.findMenuCommandId("Stroke"));
//     // var sliderCircleStroke = sliderCircleLayer.property("Layer Styles").property("Stroke");
//     // sliderCircleStroke.property("Color").setValue(sliderCircleParameters.stroke.color);
//     // sliderCircleStroke.property("Size").setValue(sliderCircleParameters.stroke.width);
//     // sliderCircleStroke.property("Opacity").setValue(sliderCircleParameters.stroke.opacity);
//     // sliderCircleStroke.property("Position").setValue(sliderCircleParameters.stroke.position);

//     // Shadow
//     // app.executeCommand(app.findMenuCommandId("Drop Shadow")); // Returns wrong ID (the one for the effect, not the layer style)
//     // app.executeCommand(9000);
//     // var sliderCircleLayerShadow = sliderCircleLayer.property("Layer Styles").property("Drop Shadow");
//     // sliderCircleLayerShadow.property("Opacity").setValue(sliderCircleParameters.shadow.opacity); // set the shadow opacity
//     // sliderCircleLayerShadow.property("Angle").setValue(sliderCircleParameters.shadow.angle); // set the shadow opacity
//     // sliderCircleLayerShadow.property("Distance").setValue(sliderCircleParameters.shadow.distance); // set the shadow distance
//     // sliderCircleLayerShadow.property("Spread").setValue(sliderCircleParameters.shadow.spread); // set the shadow softness
//     // sliderCircleLayerShadow.property("Size").setValue(sliderCircleParameters.shadow.size); // set the shadow softness

//     // Anchor Point
//     // var sliderCircleAnchor = sliderCircleLayer.property("ADBE Transform Group").property("ADBE Anchor Point"); // get the anchor point property
//     // sliderCircleAnchor.setValue([0, 0]); // set the anchor point to 0,0

//     // Position
//     // Reset layer reference point
//     sliderCircleLayer.position.setValue([0,0]);
//     sliderCircleShape.property("ADBE Vector Transform Group").property("Anchor Point").setValue([0,0]);

//     // Set the position and anchor point
//     sliderCircleShape.property("ADBE Vector Transform Group").property("Position").setValue(sliderCirclePosition);

//     return sliderCircleLayer;

// }


// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Description: 
// // DEPRECATED
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function createSliderBarLayer (targetComposition, setting, sliderBarVertices, sliderBarAnchorPoint, sliderBarWidth) {

//     // Create a new shape layer
//     var sliderBarLayer = targetComposition.layers.addShape(); // create a new shape layer
//     sliderBarLayer.name = "Slider Bar";

//     // Create a new shape group
//     var sliderBarShape = sliderBarLayer.property("Contents").addProperty("ADBE Vector Group");
//     sliderBarShape.name = "Bar Shape"; // set the shape name

//     // Create a new shape path
//     var sliderBarPath = sliderBarShape.property("Contents").addProperty("ADBE Vector Shape - Group");

//     // Create initial and final shape objects out of the point arrays
//     var sliderBarPathShape = new Shape();
//     sliderBarPathShape.vertices = sliderBarVertices;
//     sliderBarPathShape.closed = false;

//     // Set the new shape as the value of the shape property
//     sliderBarPath.property("Path").setValue(sliderBarPathShape);

//     // Stroke
//     var sliderBarPathStroke = sliderBarShape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
//     sliderBarPathStroke.property("ADBE Vector Stroke Color").setValue(setting.solidColor);
//     sliderBarPathStroke.property("ADBE Vector Stroke Width").setValue(sliderBarWidth);
//     sliderBarPathStroke.property("ADBE Vector Stroke Line Cap").setValue(sliderBarParameters.stroke.cap);

//     // Position
//     // Reset layer reference point
//     sliderBarLayer.position.setValue([0,0]);

//     // Set the position and anchor point
//     sliderBarShape.property("ADBE Vector Transform Group").property("Position").setValue(sliderBarAnchorPoint);
//     sliderBarShape.property("ADBE Vector Transform Group").property("Anchor Point").setValue(sliderBarAnchorPoint);

//     // Effects
//     targetComposition.openInViewer();

//     // Gradient
//     if(setting.fillType == "gradient") {

//         // Apply the Gradient Overlay effect to the layer
//         var sliderBarGradientRamp = sliderBarLayer.effect.addProperty("ADBE Ramp");
//         sliderBarGradientRamp.property("Start of Ramp").setValue(sliderBarVertices[0]);
//         sliderBarGradientRamp.property("Start Color").setValue(setting.gradientColors[0]);
//         sliderBarGradientRamp.property("End of Ramp").setValue(sliderBarVertices[1]);
//         sliderBarGradientRamp.property("End Color").setValue(setting.gradientColors[1]);
//         sliderBarGradientRamp.property("Ramp Shape").setValue(1);
    
//     }

//     // Animate
//     // animateLayer(toneCurvePath, "Path", [1,2], [initialShape, finalShape])

//     // Bevel and Emboss
//     // app.executeCommand(app.findMenuCommandId("Bevel and Emboss"));
//     // var sliderBarBevelAndEmboss = sliderBarLayer.property("Layer Styles").property("Bevel and Emboss");
//     // sliderBarBevelAndEmboss.property("Style").setValue(sliderBarParameters.layerStyle.bevelAndEmboss.style);
//     // sliderBarBevelAndEmboss.property("Depth").setValue(sliderBarParameters.layerStyle.bevelAndEmboss.depth);
//     // sliderBarBevelAndEmboss.property("Direction").setValue(sliderBarParameters.layerStyle.bevelAndEmboss.direction);
//     // sliderBarBevelAndEmboss.property("Size").setValue(sliderBarParameters.layerStyle.bevelAndEmboss.size);
//     // sliderBarBevelAndEmboss.property("Angle").setValue(sliderBarParameters.layerStyle.bevelAndEmboss.angle);
//     // sliderBarBevelAndEmboss.property("Altitude").setValue(sliderBarParameters.layerStyle.bevelAndEmboss.altitude);
//     // sliderBarBevelAndEmboss.property("Highlight Opacity").setValue(sliderBarParameters.layerStyle.bevelAndEmboss.highlightOpacity);
//     // sliderBarBevelAndEmboss.property("Shadow Opacity").setValue(sliderBarParameters.layerStyle.bevelAndEmboss.shadowOpacity);

//     // Stroke
//     app.executeCommand(app.findMenuCommandId("Stroke"));
//     app.executeCommand(9008);
//     var sliderBarStroke = sliderBarLayer.property("Layer Styles").property("Stroke");
//     sliderBarStroke.property("Color").setValue(sliderBarParameters.effects.stroke.color);
//     sliderBarStroke.property("Size").setValue(sliderBarParameters.effects.stroke.size);
//     sliderBarStroke.property("Opacity").setValue(sliderBarParameters.effects.stroke.opacity);
//     sliderBarStroke.property("Position").setValue(sliderBarParameters.effects.stroke.position);

//     // Shadow
//     // app.executeCommand(app.findMenuCommandId("Drop Shadow"));
//     // var sliderBarShadow = sliderBarLayer.property("Layer Styles").property("Drop Shadow");
//     // sliderBarShadow.property("Use Global Light").setValue(true);

//     return sliderBarLayer;

// }
