////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createSlidersGroupComposition (groups[groupKey], style);
// TODO: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createColorGradeGroupComposition (settingsGroup, style) {

    var groupName = settingsGroup.displayName;
    var settings = settingsGroup.settings;

    // Reset reference position
    var groupReferencePosition = [0,0];

    // Create folder to store each slider
    var groupCompositionsFolder = project.items.addFolder(groupName + " Pre-Compositions");

    // Create group composition
    var groupComposition = project.items.addComp(groupName, panelCompositionParameters.width, panelCompositionParameters.height, panelCompositionParameters.pixelAspect, panelCompositionParameters.duration, panelCompositionParameters.frameRate);

    // Create title
    var groupTitleComposition = createGroupTitleComposition (groupName);

    // Include the precomposition created in the group composition
    var groupTitleCompositionLayer = groupComposition.layers.add(groupTitleComposition);

    // Position the precomposition in the group composition
    setAnchorPosition(groupTitleCompositionLayer, "topLeft");
    groupTitleCompositionLayer.position.setValue(groupReferencePosition);

    // Update Y position of the next precomposition
    groupReferencePosition[0] += 180;
    groupReferencePosition[1] += groupTitleCompositionParameters.height;

    // Create each precomposition
    var colorGradeCircleComposition = createColorGradeCircleComposition (settings);

    // Store the precomposition in the corresponding folder
    colorGradeCircleComposition.parentFolder = groupCompositionsFolder;
    // colorGradeSlidersComposition.parentFolder = groupCompositionsFolder;

    // Include the precomposition created in the group composition
    var colorGradeCircleCompositionLayer = groupComposition.layers.add(colorGradeCircleComposition);
    // var colorGradeSlidersCompositionLayer = groupComposition.layers.add(colorGradeSlidersComposition);

    // Position the precomposition in the group composition
    setAnchorPosition(colorGradeCircleCompositionLayer, colorGradeCircleCompositionParameters.anchorPosition);
    colorGradeCircleCompositionLayer.position.setValue(groupReferencePosition);

    // Update X position for the Sliders Composition
    groupReferencePosition[0] += colorGradeCircleComposition.width;
    groupReferencePosition[1] += 45;

    // Create each precomposition
    var colorGradeSlidersComposition = createColorGradeSlidersComposition (settingsGroup);

    // Store the precomposition in the corresponding folder
    colorGradeSlidersComposition.parentFolder = groupCompositionsFolder;

    // Include the precomposition created in the group composition
    var colorGradeSlidersCompositionLayer = groupComposition.layers.add(colorGradeSlidersComposition);

    // Position the precomposition in the group composition
    setAnchorPosition(colorGradeSlidersCompositionLayer, colorGradeSlidersCompositionParameters.anchorPosition);
    colorGradeSlidersCompositionLayer.position.setValue(groupReferencePosition);


    // for (settingKey in settings) {

    //     // Create each precomposition
    //     var colorGradeCircleComposition = createColorGradeGraphComposition (settings[settingKey]);
    //     // var colorGradeSlidersComposition = createColorGradeSlidersComposition (settings[settingKey]);

    //     // Store the precomposition in the corresponding folder
    //     colorGradeCircleComposition.parentFolder = groupCompositionsFolder;
    //     // colorGradeSlidersComposition.parentFolder = groupCompositionsFolder;

    //     // Include the precomposition created in the group composition
    //     var colorGradeCircleCompositionLayer = groupComposition.layers.add(colorGradeCircleComposition);
    //     // var colorGradeSlidersCompositionLayer = groupComposition.layers.add(colorGradeSlidersComposition);

    //     // Position the precomposition in the group composition
    //     setAnchorPosition(colorGradeCircleCompositionLayer, colorGradeCircleCompositionParameters.anchorPosition);
    //     colorGradeCircleCompositionLayer.position.setValue(groupReferencePosition);
        
    //     // groupReferencePosition[0] += colorGradeCircleComposition.width;

    //     // setAnchorPosition(colorGradeSlidersCompositionLayer, colorGradeCircleCompositionParameters.anchorPosition);
    //     // colorGradeSlidersCompositionLayer.position.setValue(groupReferencePosition);

    //     // Update Y position of the next precomposition
    //     // groupReferencePosition[1] += colorGradeCircleComposition.height;

    // }

    return groupComposition;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createSlidersGroupComposition (groups[groupKey], style);
// TODO: addColorGradeCircleBackground()
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createColorGradeCircleComposition (settings) {

    var compositionName = " Circle Composition";

    // Check if composition already exist. If not, create the composition.
    // if (selectCompositionByName(compositionName)) {
    //     return selectCompositionByName(compositionName);
    // }
    
    // Create Color Grade Composition
    var colorGradeCircleComposition = project.items.addComp(compositionName, colorGradeCircleCompositionParameters.width, colorGradeCircleCompositionParameters.height, colorGradeCircleCompositionParameters.pixelAspect, colorGradeCircleCompositionParameters.duration, colorGradeCircleCompositionParameters.frameRate);
    
    // Create Color Grade Background
    var colorGradeCircleBackground = addColorGradeCircleBackground (colorGradeCircleComposition, colorGradeCircleBackgroundParameters);
    // var colorGradeCircleBackground = addShapeLayer(colorGradeCircleComposition, colorGradeCircleBackgroundParameters, [colorGradeCircleCompositionParameters.width / 2, colorGradeCircleCompositionParameters.height / 2]);

    // Create Color Grade Selector
    var colorGradeCircleSelector = createColorGradeCircleSelector (colorGradeCircleComposition, settings);

    return colorGradeCircleComposition;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// WIP
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function addColorGradeCircleBackground (targetComposition) {

//     // Check if composition already exist. If not, create the composition.
//     if (selectFootageByName("Color Grade Circle Background.png")) {
//         var colorGradeCircleBackgroundItem =  selectFootageByName("Color Grade Circle Background.png");
//     }

//     // Animate
//     // animateLayer (colorGradeCircleBackground, "Position", settings.hue.keyTimes, [initialPosition, finalPosition])

//     return colorGradeCircleBackground;

// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createColorGradeCircleSelector (targetComposition, style);
// TODO: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createColorGradeCircleSelector (targetComposition, settings) {

    // Compute positions
    var center = [colorGradeCircleCompositionParameters.width / 2, colorGradeCircleCompositionParameters.height / 2];
    var radius = colorGradeCircleBackgroundParameters.shape.width / 2;
    var initialPosition = [center[0] + settings.saturation.defaultValue * radius / 100 * Math.cos(settings.hue.defaultValue * Math.PI / 180), center[1] - settings.saturation.defaultValue * radius / 100 * Math.sin(settings.hue.defaultValue * Math.PI / 180)];
    var finalPosition = [center[0] + settings.saturation.settingValue * radius / 100 * Math.cos(settings.hue.settingValue * Math.PI / 180), center[1] - settings.saturation.settingValue * radius / 100 * Math.sin(settings.hue.settingValue * Math.PI / 180)];

    // Add layer
    var colorGradeCircleSelector = addShapeLayer(targetComposition, colorGradeCircleSelectorParameters, center);

    // Animate
    animateLayer (colorGradeCircleSelector, "Position", settings.hue.animation.setting.keyTimes, [initialPosition, finalPosition])

    return colorGradeCircleSelector;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createColorGradeSlidersComposition (groups[groupKey], style);
// TODO: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createColorGradeSlidersComposition (group, style) {

    var groupName = group.displayName;
    var settings = group.settings;

    // Reset reference position
    var groupReferencePosition = [45,0];

    // Create folder to store each slider
    var groupCompositionsFolder = project.items.addFolder(groupName + " Pre-Compositions");

    // Create group composition 
    var groupComposition = project.items.addComp(groupName, 405, 270, colorGradeSlidersCompositionParameters.pixelAspect, colorGradeSlidersCompositionParameters.duration, colorGradeSlidersCompositionParameters.frameRate);

    for (settingKey in settings) {

        // Create each precomposition
        var colorGradeSlidersComposition = createColorGradeSliderComposition (settings[settingKey], "horizontalStackedSlider");

        // Store the precomposition in the corresponding folder
        colorGradeSlidersComposition.parentFolder = groupCompositionsFolder;

        // Include the precomposition created in the group composition
        var colorGradeSlidersCompositionLayer = groupComposition.layers.add(colorGradeSlidersComposition);

        // Position the precomposition in the group composition
        setAnchorPosition(colorGradeSlidersCompositionLayer, "topLeft");
        colorGradeSlidersCompositionLayer.position.setValue(groupReferencePosition);

        groupReferencePosition[1] += 90;
        
        // groupReferencePosition[0] += colorGradeCircleComposition.width;

        // setAnchorPosition(colorGradeSlidersCompositionLayer, colorGradeCircleCompositionParameters.anchorPosition);
        // colorGradeSlidersCompositionLayer.position.setValue(groupReferencePosition);

        // Update Y position of the next precomposition
        // groupReferencePosition[1] += colorGradeCircleComposition.height;

    }

    return groupComposition;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createColorGradeSliderComposition (setting, style);
// TODO: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createColorGradeSliderComposition (setting, style) {

    var compositionName = setting.displayName + " " + setting.group;

    var colorGradeSliderComposition = selectCompositionByName(compositionName);

    if (colorGradeSliderComposition) {
        return colorGradeSliderComposition;
    }

    // Style
    switch (style) {

        case "horizontalStackedSlider":
            var colorGradeSliderParameters = new HorizontalStackedSlider(315, 90, setting);
        break;

        case "horizontalSlider":
            var colorGradeSliderParameters = new HorizontalSlider(315, 90, setting);
        break;

    }
    
    // Crate Slider Composition
    var colorGradeSliderComposition = project.items.addComp(compositionName, colorGradeSliderParameters.composition.width, colorGradeSliderParameters.composition.height, colorGradeSliderParameters.composition.pixelAspect, colorGradeSliderParameters.composition.duration, colorGradeSliderParameters.composition.frameRate);

    // Create Text Label layer
    var colorGradeSliderTextLabelLayer = addTextLabelLayer (colorGradeSliderComposition, colorGradeSliderParameters.textLabel, setting);
   
    // Create Text Value Layer
    var colorGradeSliderTextValueLayer = addTextValueLayer (colorGradeSliderComposition, colorGradeSliderParameters.textValue, setting);

    // Create Slider Bar Layer
    var colorGradeSliderBarLayer = addShapeLayer(colorGradeSliderComposition, colorGradeSliderParameters.sliderBar, setting);

    // Create Slider Circle Layer
    var colorGradeSliderCircleLayer = addShapeLayer(colorGradeSliderComposition, colorGradeSliderParameters.sliderCircle, setting);

    // Animate slider bar
    // animateLayer (sliderBarLayer, "Scale")
 
    // Animate slider circle
    // animateShape (colorGradeSliderCircleLayer, "Position", colorGradeSliderParameters.sliderCircle.position.animation.keyTimes, colorGradeSliderParameters.sliderCircle.position.animation.keyValues);

    // animateShape (colorGradeSliderCircleLayer, "Position", colorGradeSliderCircleParameters.animation.position.keyTimes, colorGradeSliderCircleParameters.animation.position.keyValues);
    // colorGradeSliderCircleLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vector Transform Group").property("Position").setValuesAtTimes(sliderCircleParameters.animation.position.keyTimes, sliderCircleParameters.animation.position.keyValues);

    return colorGradeSliderComposition;

}