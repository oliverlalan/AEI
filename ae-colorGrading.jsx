////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createSlidersGroupComposition (groups[groupKey], style);
// TODO: Simplify the create group and add to folder
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createColorGradeGroupComposition (settingsGroup, style) {

    var settings = settingsGroup.settings;

    // Define composition parameters
    var groupParameters = new GroupParameters (settingsGroup)

    // Reset reference position
    var groupReferencePosition = [0,0];

    // Create folder to store each slider
    var groupCompositionsFolder = project.items.addFolder(settingsGroup.displayName + " Pre-Compositions");

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

    // Update reference position of the next precomposition
    groupReferencePosition[0] += 90;
    groupReferencePosition[1] += groupParameters.title.height + 4 * gridPixels;

    // Create precomposition
    var colorGradeCircleComposition = createColorGradeCircleComposition (settings);

    // Store the precomposition in the corresponding folder
    colorGradeCircleComposition.parentFolder = groupCompositionsFolder;

    // Include the precomposition created in the group composition
    var colorGradeCircleCompositionLayer = groupComposition.layers.add(colorGradeCircleComposition);

    // Position the precomposition in the group composition
    setAnchorPosition(colorGradeCircleCompositionLayer, "middleLeft");
    colorGradeCircleCompositionLayer.position.setValue(groupReferencePosition);

    // Update X position for the Sliders Composition
    groupReferencePosition[0] += colorGradeCircleComposition.width;

    // Create sliders composition
    var colorGradeSlidersComposition = createColorGradeSlidersComposition (settingsGroup);

    // Store the precomposition in the corresponding folder
    colorGradeSlidersComposition.parentFolder = groupCompositionsFolder;

    // Include the precomposition created in the group composition
    var colorGradeSlidersCompositionLayer = groupComposition.layers.add(colorGradeSlidersComposition);

    // Position the precomposition in the group composition
    setAnchorPosition(colorGradeSlidersCompositionLayer, "middleLeft");
    colorGradeSlidersCompositionLayer.position.setValue(groupReferencePosition);

    return groupComposition;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createSlidersGroupComposition (groups[groupKey], style);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createColorGradeCircleComposition (settings) {

    var compositionName = " Circle Composition";

    var colorGradeCircleParameters = new ColorGradeCircleParameters (315, 315, settings);

    // Check if composition already exist. If not, create the composition.
    // if (selectCompositionByName(compositionName)) {
    //     return selectCompositionByName(compositionName);
    // }
    
    // Create Color Grade Composition
    var colorGradeCircleComposition = project.items.addComp(compositionName, colorGradeCircleParameters.composition.width, colorGradeCircleParameters.composition.height, colorGradeCircleParameters.composition.pixelAspect, colorGradeCircleParameters.composition.duration, colorGradeCircleParameters.composition.frameRate);
    
    // Create Color Grade Background
    var colorGradeCircleBackground = addShapeLayer(colorGradeCircleComposition, colorGradeCircleParameters.background);

    // Create Color Grade Selector TODO addShapeLayer using colorGradeCircleParameters.selector
    var colorGradeCircleSelector = addShapeLayer (colorGradeCircleComposition, colorGradeCircleParameters.selector);

    return colorGradeCircleComposition;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createColorGradeSlidersComposition (groups[groupKey], style);
// TODO: Merge with createSlidersGroupComposition
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createColorGradeSlidersComposition (group, style) {

    var settings = group.settings;

    // Reset reference position
    var groupReferencePosition = [45,0];

    // Create folder to store each slider
    var groupCompositionsFolder = project.items.addFolder(group.displayName + " Pre-Compositions");

    // Create group composition 
    var groupComposition = project.items.addComp(group.displayName, 360, 270, colorGradeSlidersCompositionParameters.pixelAspect, colorGradeSlidersCompositionParameters.duration, colorGradeSlidersCompositionParameters.frameRate);

    for (settingKey in settings) {

        // Create each precomposition
        var colorGradeSlidersComposition = createSliderComposition (settings[settingKey], "horizontalStackedSlider");

        // Store the precomposition in the corresponding folder
        colorGradeSlidersComposition.parentFolder = groupCompositionsFolder;

        // Include the precomposition created in the group composition
        var colorGradeSlidersCompositionLayer = groupComposition.layers.add(colorGradeSlidersComposition);

        // Position the precomposition in the group composition
        setAnchorPosition(colorGradeSlidersCompositionLayer, "topLeft");
        colorGradeSlidersCompositionLayer.position.setValue(groupReferencePosition);

        groupReferencePosition[1] += colorGradeSlidersComposition.height;

    }

    return groupComposition;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DEPRECATED CODE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createColorGradeCircleSelector (targetComposition, style);
// DEPRECATED
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function createColorGradeCircleSelector (targetComposition, settings) {

//     // Compute positions
//     var center = [colorGradeCircleCompositionParameters.width / 2, colorGradeCircleCompositionParameters.height / 2];
//     var radius = colorGradeCircleBackgroundParameters.shape.width / 2;
//     var initialPosition = [center[0] + settings.saturation.defaultValue * radius / 100 * Math.cos(settings.hue.defaultValue * Math.PI / 180), center[1] - settings.saturation.defaultValue * radius / 100 * Math.sin(settings.hue.defaultValue * Math.PI / 180)];
//     var finalPosition = [center[0] + settings.saturation.settingValue * radius / 100 * Math.cos(settings.hue.settingValue * Math.PI / 180), center[1] - settings.saturation.settingValue * radius / 100 * Math.sin(settings.hue.settingValue * Math.PI / 180)];

//     // Add layer
//     var colorGradeCircleSelector = addShapeLayer(targetComposition, colorGradeCircleSelectorParameters);

//     // Animate
//     animateLayer (colorGradeCircleSelector, "Position", settings.hue.animation.setting.keyTimes, [initialPosition, finalPosition])

//     return colorGradeCircleSelector;

// }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createColorGradeSliderComposition (setting, style);
// DEPRECATED in favor of createSliderComposition
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function createColorGradeSliderComposition (setting, style) {

//     var compositionName = setting.displayName + " " + setting.group;

//     var colorGradeSliderComposition = selectCompositionByName(compositionName);

//     if (colorGradeSliderComposition) {
//         return colorGradeSliderComposition;
//     }

//     // Style
//     switch (style) {

//         case "horizontalStackedSlider":
//             var colorGradeSliderParameters = new HorizontalStackedSlider(270, 90, setting);
//         break;

//         case "horizontalSlider":
//             var colorGradeSliderParameters = new HorizontalSlider(270, 90, setting);
//         break;

//     }
    
//     // Crate Slider Composition
//     var colorGradeSliderComposition = project.items.addComp(compositionName, colorGradeSliderParameters.composition.width, colorGradeSliderParameters.composition.height, colorGradeSliderParameters.composition.pixelAspect, colorGradeSliderParameters.composition.duration, colorGradeSliderParameters.composition.frameRate);

//     // Create Text Label layer
//     var colorGradeSliderTextLabelLayer = addTextLabelLayer (colorGradeSliderComposition, colorGradeSliderParameters.textLabel, setting);
   
//     // Create Text Value Layer
//     var colorGradeSliderTextValueLayer = addTextValueLayer (colorGradeSliderComposition, colorGradeSliderParameters.textValue, setting);

//     // Create Slider Bar Layer
//     var colorGradeSliderBarLayer = addShapeLayer(colorGradeSliderComposition, colorGradeSliderParameters.sliderBar);

//     // Create Slider Circle Layer
//     var colorGradeSliderCircleLayer = addShapeLayer(colorGradeSliderComposition, colorGradeSliderParameters.sliderCircle);

//     return colorGradeSliderComposition;

// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// WIP
// DEPRECATED in favor of addShapeLayer
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function addColorGradeCircleBackground (targetComposition) {

//     // Check if composition already exist. If not, create the composition.
//     if (selectFootageByName("Color Grade Circle Background.png")) {
//         var colorGradeCircleBackgroundItem =  selectFootageByName("Color Grade Circle Background.png");
//     }

//     // Animate
//     // animateLayer (colorGradeCircleBackground, "Position", settings.hue.keyTimes, [initialPosition, finalPosition])

//     return colorGradeCircleBackground;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// WIP
// DEPRECATED in favor of addShapeLayer
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function addColorGradeCircleBackground(targetComposition, shapeLayerParameters) {

//     // Create a new shape layer
//     var shapeLayer = targetComposition.layers.addShape(); // create a new shape layer
//     shapeLayer.selected = true;
//     shapeLayer.name = shapeLayerParameters.name + " Layer";
    
//     // Create a new shape group
//     var shape = shapeLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group"); // add a new shape
//     shape.name = shapeLayerParameters.name + " Shape"; // set the shape name
    
//     // Shape
//     var shapePath = shape.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse"); // add an ellipse shape
//     shapePath.property("ADBE Vector Ellipse Size").setValue([shapeLayerParameters.shape.width, shapeLayerParameters.shape.height]); // set the ellipse size
       
//     // Position
//     if (shapeLayerParameters.position.hasOwnProperty('reference')) {
//         shapeLayer.position.setValue(shapeLayerParameters.position.reference);
//     }

//     // Preset
//     var gradientFFX = new File("/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram Photos/Design - Reel/Assets/" + shapeLayerParameters.shape.fill.gradient.name + ".ffx");
//     if (!gradientFFX.exists) {
//         throw new Error ('File does not exist at path ' + gradientFFX.fsName);
//     }
//     shape.selected = true;
//     shapeLayer.applyPreset(gradientFFX);

//     var shapeFill = shape.property("ADBE Vectors Group").property("Gradient Fill");
//     shapeFill.property("ADBE Vector Grad Start Pt").setValue(shapeLayerParameters.shape.fill.gradient.start);
//     shapeFill.property("ADBE Vector Grad End Pt").setValue(shapeLayerParameters.shape.fill.gradient.end);

//     return shapeLayer;

// }
// // }