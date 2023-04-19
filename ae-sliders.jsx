////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createSlidersPanelComposition (panel, style) {

    var panelName = panel.displayName;
    var groups = panel.groups;

    // Reset reference position
    panelCompositionParameters.position[1] = 0;

    // Create folder to store each slider
    var panelCompositionsFolder = project.items.addFolder(panelName + " Pre-Compositions");

    // Create group composition 
    // TODO Compute dimensions based on entries
    var panelComposition = project.items.addComp(panelName, panelCompositionParameters.width, panelCompositionParameters.height, panelCompositionParameters.pixelAspect, panelCompositionParameters.duration, panelCompositionParameters.frameRate);

    // Create title
    var panelTitleLayer = createPanelTitleLayer (panelComposition, panelName);

    for (groupKey in groups) {

        // Create each precomposition
        var groupComposition = createSlidersGroupComposition (groups[groupKey], style);

        // Store the precomposition in the corresponding foldre
        groupComposition.parentFolder = panelCompositionsFolder;

        // Include the precomposition created in the group composition
        var groupComposition = panelComposition.layers.add(groupComposition);

        // Position the precomposition in the group composition
        setAnchorPoint(groupComposition, "topLeft");
        groupComposition.position.setValue(panelCompositionParameters.position);

        // Update Y position of the next precomposition
        panelCompositionParameters.position[1] += groupComposition.height;

    }

    return panelComposition;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// TODO Compute setSpacing based on ammount of slider settings
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createSlidersGroupComposition (settingsGroup, style) {

    var groupName = settingsGroup.displayName;
    var settings = settingsGroup.settings;

    // Reset reference position
    groupCompositionParameters.position[1] = 0;

    // Create folder to store each slider
    var groupCompositionsFolder = project.items.addFolder(groupName + " Pre-Compositions");

    // Create group composition 
    // TODO Compute dimensions based on entries
    var groupComposition = project.items.addComp(groupName, groupCompositionParameters.width, groupCompositionParameters.height, groupCompositionParameters.pixelAspect, groupCompositionParameters.duration, groupCompositionParameters.frameRate);

    // Create title
    var groupTitle = createGroupTitleLayer (groupComposition, groupName);

    for (settingKey in settings) {

        // Create each precomposition
        var settingComposition = createSliderComposition (settings[settingKey], style);

        // Store the precomposition in the corresponding foldre
        settingComposition.parentFolder = groupCompositionsFolder;

        // Include the precomposition created in the group composition
        var settingComposition = groupComposition.layers.add(settingComposition);

        // Position the precomposition in the group composition
        setAnchorPoint(settingComposition, "topLeft");
        settingComposition.position.setValue(groupCompositionParameters.position);

        // Update Y position of the next precomposition
        groupCompositionParameters.position[1] += settingComposition.height;

    }

    return groupComposition;

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createSliderComposition (setting, style) {

    var compositionName = setting.displayName + " " + setting.group + " Composition";

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
                keyTimes: [2,4],
                keyValues:[sliderBarParameters.anchorPoint, [sliderBarParameters.vertices[0][0] + (setting.settingValue - setting.min) / (setting.max - setting.min) * sliderBarParameters.stroke.length, sliderBarParameters.vertices[0][1]]]
                }
            };

            var sliderTextLabelParameters = {
                position: [sliderCompositionParameters.padding.left + sliderTextParameters.width, sliderBarParameters.height / 2],
                anchorPoint: "middleRight",
                justification: ParagraphJustification.RIGHT_JUSTIFY,
            };

            var sliderTextValueParameters = {
                position: [sliderCompositionParameters.width - sliderCompositionParameters.padding.right, sliderBarParameters.height / 2],
                anchorPoint: "middleRight",
                justification:  ParagraphJustification.RIGHT_JUSTIFY,
            };

            // Crate Slider Composition
            var sliderComposition = project.items.addComp(compositionName, sliderCompositionParameters.width, sliderCompositionParameters.height, sliderCompositionParameters.pixelAspect, sliderCompositionParameters.duration, sliderCompositionParameters.frameRate);

            // Create Text Label layer
            var sliderTextLabelLayer = createSliderTextLabelLayer (sliderComposition, setting, sliderTextLabelParameters.position, sliderTextLabelParameters.anchorPoint, sliderTextLabelParameters.justification);
            
            // Create Text Value Layer
            var sliderTextValueLayer = createSliderTextValueLayer (sliderComposition, [setting.defaultValue, setting.settingValue], [sliderTextParameters.animation.start, sliderTextParameters.animation.end], sliderTextValueParameters.position, sliderTextValueParameters.anchorPoint, sliderTextValueParameters.justification);

            // Create Slider Bar Layer
            var sliderBarLayer = createSliderBarLayer (sliderComposition, setting, sliderBarParameters.vertices, sliderBarParameters.anchorPoint, sliderBarParameters.stroke.width)

            // Create Slider Circle Layer
            var sliderCircleLayer = createSliderCircleLayer (sliderComposition, setting, sliderCircleParameters.diameter, sliderCircleParameters.position);

            // Animate slider bar
            // animateLayer (sliderBarLayer, "Scale")

            // Animate slider circle
            sliderCircleLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vector Transform Group").property("Position").setValuesAtTimes(sliderCircleParameters.animation.position.keyTimes, sliderCircleParameters.animation.position.keyValues);

        break;

        // case "horizontalSliderWithLabelOnTop":

        //     // Define Composition Parameters
        //     var sliderCompositionParameters = {
        //         width: 261,
        //         height: 75,
        //         anchorPoint: "topLeft",
        //         pixelAspect: 1,
        //         duration: 6,
        //         frameRate: projectFPS,
        //         padding: {
        //             top: 5,
        //             right: 18,
        //             bottom: 10,
        //             left: 18
        //         }
        //     };

        //     var sliderBarParameters = {
        //         position : [0, 0],
        //         fill: {
        //             color: hexToRgb(sliderBarSolidFillColor)
        //         },
        //         gradientOverlay: {
        //             angle: 0,
        //             style: 1
        //         },
        //         bevelAndEmboss: {
        //             style: 2,
        //             depth: 100,
        //             direction: 2,
        //             size: 8,
        //             angle: 90,
        //             altitude: 30,
        //             highlightOpacity: 50,
        //             shadowOpacity: 35
        //         },
        //         effects: {
        //             stroke: {
        //                 color: hexToRgb(sliderBarStrokeColor),
        //                 size: 1,
        //                 opacity: 100,
        //                 position: 1 // Outside
        //             }
        //         },
        //         stroke: {
        //             color: hexToRgb(sliderBarStrokeColor),
        //             width: 4,
        //             cap: 2 // Rounded
        //         }
        //     };

        //     sliderBarParameters.width = sliderCompositionParameters.width - sliderCompositionParameters.padding.right - sliderCompositionParameters.padding.left;
        //     sliderBarParameters.height = sliderCompositionParameters.height - sliderCompositionParameters.padding.top - sliderCompositionParameters.padding.bottom;
        //     sliderBarParameters.stroke.length = sliderBarParameters.width - sliderBarParameters.stroke.width;
        //     sliderBarParameters.vertices = [];
        //     sliderBarParameters.vertices[0] = [sliderCompositionParameters.padding.left + sliderBarParameters.stroke.width / 2, sliderCompositionParameters.padding.top + sliderBarParameters.height * 6 / 10];
        //     sliderBarParameters.vertices[1] = [sliderCompositionParameters.padding.left + sliderBarParameters.stroke.width / 2 + sliderBarParameters.stroke.length, sliderCompositionParameters.padding.top + sliderBarParameters.height * 6 / 10];
        //     sliderBarParameters.anchorPoint = [sliderBarParameters.vertices[0][0] + (setting.defaultValue - setting.min) / (setting.max - setting.min) * sliderBarParameters.stroke.length, sliderBarParameters.vertices[0][1]];

        //     var sliderCircleParameters = {
        //         position: sliderBarParameters.anchorPoint,
        //         diameter : 18,
        //         fill : {
        //             color: hexToRgb(circleSelectorFillColor)
        //         },
        //         stroke : {
        //             color: hexToRgb(circleSelectorStrokeColor),
        //             width: 1,
        //             opacity: 50
        //         },
        //         shadow: {
        //             opacity: 0.35 * 255,
        //             direction: 180,
        //             distance: 3,
        //             softness: 18,
        //         },
        //         animation: {
        //             position: {
        //                 keyTimes: [2,4],
        //                 keyValues:[sliderBarParameters.anchorPoint, [sliderBarParameters.vertices[0][0] + (setting.settingValue - setting.min) / (setting.max - setting.min) * sliderBarParameters.stroke.length, sliderBarParameters.vertices[0][1]]]
        //             }
        //         }
        //     };

        //     var sliderTextParameters = {
        //         position: [0,0],
        //         fontSize: 18,
        //         fontColor: hexToRgb("FFFFFF"),
        //         fontName: "WorkSansRoman-Medium",
        //         fontTracking: 100,
        //         fontCapitalization: true,
        //         animation: {
        //             start: 2,
        //             end: 4
        //         }
        //     };

        //     var sliderTextLabelParameters = {
        //         position: [sliderCompositionParameters.padding.left, sliderCompositionParameters.padding.top],
        //         anchorPoint: "topLeft",
        //         justification: ParagraphJustification.LEFT_JUSTIFY,
        //     };

        //     var sliderTextValueParameters = {
        //         position: [sliderCompositionParameters.width - sliderCompositionParameters.padding.right, sliderCompositionParameters.padding.top],
        //         anchorPoint: "topRight",
        //         justification:  ParagraphJustification.RIGHT_JUSTIFY,
        //     };

        //     // Crate Slider Composition
        //     var sliderComposition = project.items.addComp(compositionName, sliderCompositionParameters.width, sliderCompositionParameters.height, sliderCompositionParameters.pixelAspect, sliderCompositionParameters.duration, sliderCompositionParameters.frameRate);

        //     // Create Text Label layer
        //     var sliderTextLabelLayer = createSliderTextLabelLayer (sliderComposition, setting, sliderTextLabelParameters.position, sliderTextLabelParameters.anchorPoint, sliderTextLabelParameters.justification);
            
        //     // Create Text Value Layer
        //     var sliderTextValueLayer = createSliderTextValueLayer (sliderComposition, [setting.defaultValue, setting.settingValue], [sliderTextParameters.animation.start, sliderTextParameters.animation.end], sliderTextValueParameters.position, sliderTextValueParameters.anchorPoint, sliderTextValueParameters.justification);

        //     // Create Slider Bar Layer
        //     var sliderBarLayer = createSliderBarLayer (sliderComposition, setting, sliderBarParameters.vertices, sliderBarParameters.anchorPoint, sliderBarParameters.stroke.width)

        //     // Create Slider Circle Layer
        //     var sliderCircleLayer = createSliderCircleLayer (sliderComposition, setting, sliderCircleParameters.diameter, sliderCircleParameters.position);

        //     // Animate slider bar
        //     // animateLayer (sliderBarLayer, "Scale")

        //     // Animate slider circle
        //     sliderCircleLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vector Transform Group").property("Position").setValuesAtTimes(sliderCircleParameters.animation.position.keyTimes, sliderCircleParameters.animation.position.keyValues);

        // break;

        // case "horizontalSliderWithNoLabel":

        //     // Define Composition Parameters
        //     var sliderCompositionParameters = {
        //         width: 261,
        //         height: 36,
        //         anchorPoint: "topLeft",
        //         pixelAspect: 1,
        //         duration: 6,
        //         frameRate: projectFPS,
        //         padding: {
        //             top: 0,
        //             right: 18,
        //             bottom: 0,
        //             left: 18
        //         }
        //     };

        //     var sliderBarParameters = {
        //         position : [0, 0],
        //         fill: {
        //             color: hexToRgb(sliderBarSolidFillColor)
        //         },
        //         gradientOverlay: {
        //             angle: 0,
        //             style: 1
        //         },
        //         bevelAndEmboss: {
        //             style: 2,
        //             depth: 100,
        //             direction: 2,
        //             size: 8,
        //             angle: 90,
        //             altitude: 30,
        //             highlightOpacity: 50,
        //             shadowOpacity: 35
        //         },
        //         effects: {
        //             stroke: {
        //                 color: hexToRgb(sliderBarStrokeColor),
        //                 size: 1,
        //                 opacity: 100,
        //                 position: 1 // Outside
        //             }
        //         },
        //         stroke: {
        //             color: hexToRgb(sliderBarStrokeColor),
        //             width: 4,
        //             cap: 2 // Rounded
        //         }
        //     };

        //     sliderBarParameters.width = (sliderCompositionParameters.width - sliderCompositionParameters.padding.right - sliderCompositionParameters.padding.left) * 8 /10;
        //     sliderBarParameters.height = sliderCompositionParameters.height - sliderCompositionParameters.padding.top - sliderCompositionParameters.padding.bottom;
        //     sliderBarParameters.stroke.length = sliderBarParameters.width - sliderBarParameters.stroke.width;
        //     sliderBarParameters.vertices = [];
        //     sliderBarParameters.vertices[0] = [sliderCompositionParameters.padding.left + sliderBarParameters.stroke.width / 2, sliderCompositionParameters.padding.top + sliderBarParameters.height / 2];
        //     sliderBarParameters.vertices[1] = [sliderCompositionParameters.padding.left + sliderBarParameters.stroke.width / 2 + sliderBarParameters.stroke.length, sliderCompositionParameters.padding.top + sliderBarParameters.height / 2];
        //     sliderBarParameters.anchorPoint = [sliderBarParameters.vertices[0][0] + (setting.defaultValue - setting.min) / (setting.max - setting.min) * sliderBarParameters.stroke.length, sliderBarParameters.vertices[0][1]];

        //     var sliderCircleParameters = {
        //         position: sliderBarParameters.anchorPoint,
        //         diameter : 18,
        //         fill : {
        //             color: hexToRgb(circleSelectorFillColor)
        //         },
        //         stroke : {
        //             color: hexToRgb(circleSelectorStrokeColor),
        //             width: 1,
        //             opacity: 50
        //         },
        //         shadow: {
        //             opacity: 0.35 * 255,
        //             direction: 180,
        //             distance: 3,
        //             softness: 18,
        //         },
        //         animation: {
        //             position: {
        //                 keyTimes: [2,4],
        //                 keyValues:[sliderBarParameters.anchorPoint, [sliderBarParameters.vertices[0][0] + (setting.settingValue - setting.min) / (setting.max - setting.min) * sliderBarParameters.stroke.length, sliderBarParameters.vertices[0][1]]]
        //             }
        //         }
        //     };

        //     var sliderTextParameters = {
        //         position: [0,0],
        //         fontSize: 18,
        //         fontColor: hexToRgb("FFFFFF"),
        //         fontName: "WorkSansRoman-Medium",
        //         fontTracking: 100,
        //         fontCapitalization: true,
        //         animation: {
        //             start: 2,
        //             end: 4
        //         }
        //     };

        //     var sliderTextLabelParameters = {
        //         position: [sliderCompositionParameters.padding.left, sliderCompositionParameters.padding.top],
        //         anchorPoint: "topLeft",
        //         justification: ParagraphJustification.LEFT_JUSTIFY,
        //     };

        //     var sliderTextValueParameters = {
        //         position: [sliderCompositionParameters.width - sliderCompositionParameters.padding.right, sliderCompositionParameters.height / 2],
        //         anchorPoint: "middleRight",
        //         justification:  ParagraphJustification.RIGHT_JUSTIFY,
        //     };

        //     // Create Slider Composition
        //     var sliderComposition = project.items.addComp(compositionName, sliderCompositionParameters.width, sliderCompositionParameters.height, sliderCompositionParameters.pixelAspect, sliderCompositionParameters.duration, sliderCompositionParameters.frameRate);

        //     // Create Text Value Layer
        //     var sliderTextValueLayer = createSliderTextValueLayer (sliderComposition, [setting.defaultValue, setting.settingValue], [sliderTextParameters.animation.start, sliderTextParameters.animation.end], sliderTextValueParameters.position, sliderTextValueParameters.anchorPoint, sliderTextValueParameters.justification);

        //     // Create Slider Bar Layer
        //     var sliderBarLayer = createSliderBarLayer (sliderComposition, setting, sliderBarParameters.vertices, sliderBarParameters.anchorPoint, sliderBarParameters.stroke.width)

        //     // Create Slider Circle Layer
        //     var sliderCircleLayer = createSliderCircleLayer (sliderComposition, setting, sliderCircleParameters.diameter, sliderCircleParameters.position);

        //     // Animate slider bar
        //     // animateLayer (sliderBarLayer, "Scale")

        //     // Animate slider circle
        //     sliderCircleLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vector Transform Group").property("Position").setValuesAtTimes(sliderCircleParameters.animation.position.keyTimes, sliderCircleParameters.animation.position.keyValues);

        // break;

        case "verticalSliderWithLabel":

        break;

    }

    return sliderComposition;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
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

    // // Set the position and anchor point
    sliderBarShape.property("ADBE Vector Transform Group").property("Position").setValue(sliderBarAnchorPoint);
    sliderBarShape.property("ADBE Vector Transform Group").property("Anchor Point").setValue(sliderBarAnchorPoint);

    // Effects
    targetComposition.openInViewer();

    // Gradient
    if(setting.fillType == "Gradient") {

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
    // sliderBarBevelAndEmboss.property("Style").setValue(sliderBarParameters.bevelAndEmboss.style);
    // sliderBarBevelAndEmboss.property("Depth").setValue(sliderBarParameters.bevelAndEmboss.depth);
    // sliderBarBevelAndEmboss.property("Direction").setValue(sliderBarParameters.bevelAndEmboss.direction);
    // sliderBarBevelAndEmboss.property("Size").setValue(sliderBarParameters.bevelAndEmboss.size);
    // sliderBarBevelAndEmboss.property("Angle").setValue(sliderBarParameters.bevelAndEmboss.angle);
    // sliderBarBevelAndEmboss.property("Altitude").setValue(sliderBarParameters.bevelAndEmboss.altitude);
    // sliderBarBevelAndEmboss.property("Highlight Opacity").setValue(sliderBarParameters.bevelAndEmboss.highlightOpacity);
    // sliderBarBevelAndEmboss.property("Shadow Opacity").setValue(sliderBarParameters.bevelAndEmboss.shadowOpacity);

    // Stroke
    // app.executeCommand(app.findMenuCommandId("Stroke"));
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
