////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createSliderSet (sliderSet, setName, setSpacing) {

    var sliderSetFolder = project.items.addFolder(setName + " ");

    var sliderSetComposition = project.items.addComp(setName, sliderSetCompositionParameters.width, sliderSetCompositionParameters.height, sliderSetCompositionParameters.pixelAspect, sliderSetCompositionParameters.duration, sliderSetCompositionParameters.frameRate);

    var xPosition = sliderSetCompositionParameters.padding.left;
    var yPosition = sliderSetCompositionParameters.padding.top;

    for (var slider = 0; slider < sliderSet.length; slider ++) {

        var sliderComposition = createSliderComposition (sliderSet[slider]);

        sliderComposition.parentFolder = sliderSetFolder;

        var sliderCompositionLayer = sliderSetComposition.layers.add(sliderComposition);

        // Set the position and anchor point
        setAnchorPoint(sliderCompositionLayer, "topLeft");
        sliderCompositionLayer.position.setValue([xPosition, yPosition]);

        yPosition = yPosition + sliderComposition.height + setSpacing;

    }

    return sliderSetComposition;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createSliderComposition (setting) {

    var compositionName = setting.displayName + " Composition";

    var sliderComposition = selectCompositionByName(compositionName);

    if (sliderComposition) {
        return sliderComposition;
    }
    
    // Create folder

    
    var sliderComposition = project.items.addComp(compositionName, sliderCompositionParameters.width, sliderCompositionParameters.height, sliderCompositionParameters.pixelAspect, sliderCompositionParameters.duration, sliderCompositionParameters.frameRate);
    
    // Label // TODO Parametrize position and anchor // Add padding and margins?
    createTextLayer(sliderComposition, setting.displayName, [0,0], "topLeft", ParagraphJustification.LEFT_JUSTIFY);
    createTextLayer(sliderComposition, setting.settingValue, [sliderCompositionParameters.width, 0], "topRight", ParagraphJustification.RIGHT_JUSTIFY);
    
    // Slider // TODO Convert to function
    var initialPosition = [];
    var finalPosition = [];

    var minSetting = setting.min;
    var maxSetting = setting.max;

    switch (sliderCompositionParameters.style)  {
        case "vertical":
            var minSettingY = yPosition;
            var maxSettingY = yPosition + sliderBarParameters.length; 
            var settingY = minSettingY + (setting.settingValue - minSetting) / (maxSetting-minSetting) * sliderBarParameters.length;
            var minSettingX = maxSettingX = settingX = xPosition;
        break;

        case "horizontal": // Parametrizar valores 
            var minSettingX = 0;
            var maxSettingX = 225 + sliderBarParameters.length; 
            var finalPositionX = minSettingX + (setting.settingValue - minSetting) / (maxSetting-minSetting) * sliderBarParameters.length;
            var minSettingY = maxSettingY = finalPositionY = 35;
            var finalPosition =[finalPositionX, finalPositionY];

            var minSettingX = 0;
            var maxSettingX = 225 + sliderBarParameters.length; 
            var initialPositionX = minSettingX + (setting.defaultValue - minSetting) / (maxSetting-minSetting) * sliderBarParameters.length;
            var minSettingY = maxSettingY = initialPositionY = 35;
            var initialPosition = [initialPositionX, initialPositionY];

        break;

        case "horizontalSide":
            var minSettingX = xPosition;
            var maxSettingX = xPosition + sliderBarParameters.length * 7 / 10; 
            var settingX = minSettingX + (selectedSetting.settingValue - minSetting) / (maxSetting-minSetting) * sliderBarParameters.length * 7 / 10;
            var minSettingY = maxSettingY = settingY = yPosition;
        break;


    }

    createSliderBar(sliderComposition);
    createSliderCircle(sliderComposition, initialPosition, finalPosition);

    return sliderComposition;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createSliderCircle (targetComposition, initialPosition, finalPosition) {

    if (targetComposition === undefined) {
        var targetComposition = project.activeItem;
    } 

    // Layer, shape and path
    var sliderCircleLayer = targetComposition.layers.addShape(); // create a new shape layer
    sliderCircleLayer.name = "Slider Circle";
    var sliderCircleShape = sliderCircleLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group"); // add a new circle shape
    sliderCircleShape.name = "Circle Shape"; // set the shape name
    var sliderCirclePath = sliderCircleShape.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse"); // add an ellipse shape
    sliderCirclePath.property("ADBE Vector Ellipse Size").setValue([sliderCircleParameters.diameter, sliderCircleParameters.diameter]); // set the ellipse size

    // Fill
    var sliderCircleFill = sliderCircleShape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill"); // add a fill property
    sliderCircleFill.property("ADBE Vector Fill Color").setValue(sliderCircleParameters.fill); // set the fill color to white

    // Stroke
    // var sliderCircleStroke = sliderCircleShape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke"); // add a fill property
    // sliderCircleStroke.property("ADBE Vector Stroke Color").setValue([0, 255, 0, 255]/255); // set the fill color to black
    
    // Effects
    targetComposition.openInViewer();

    // // Stroke
    app.executeCommand(app.findMenuCommandId("Stroke"));
    var sliderCircleStroke = sliderCircleLayer.property("Layer Styles").property("Stroke");
    sliderCircleStroke.property("Color").setValue(sliderCircleParameters.stroke.color);
    sliderCircleStroke.property("Size").setValue(sliderCircleParameters.stroke.size);
    sliderCircleStroke.property("Opacity").setValue(sliderCircleParameters.stroke.opacity);
    sliderCircleStroke.property("Position").setValue(sliderCircleParameters.stroke.position);

    // Shadow
    app.executeCommand(app.findMenuCommandId("Drop Shadow"));
    var sliderCircleLayerShadow = sliderCircleLayer.property("Layer Styles").property("Drop Shadow");
    sliderCircleLayerShadow.property("Opacity").setValue(sliderCircleParameters.shadow.opacity); // set the shadow opacity
    sliderCircleLayerShadow.property("Angle").setValue(sliderCircleParameters.shadow.angle); // set the shadow opacity
    sliderCircleLayerShadow.property("Distance").setValue(sliderCircleParameters.shadow.distance); // set the shadow distance
    sliderCircleLayerShadow.property("Spread").setValue(sliderCircleParameters.shadow.spread); // set the shadow softness
    sliderCircleLayerShadow.property("Size").setValue(sliderCircleParameters.shadow.size); // set the shadow softness

    // Anchor Point
    // var sliderCircleAnchor = sliderCircleLayer.property("ADBE Transform Group").property("ADBE Anchor Point"); // get the anchor point property
    // sliderCircleAnchor.setValue([0, 0]); // set the anchor point to 0,0

    // Position
    var sliderCirclePosition = sliderCircleLayer.property("Position"); // add the X position property to the layer
    // sliderCirclePosition.setValue([sliderCirclePosition.value[0], 35]); // set the position to [100,100]

    // Keyframes
    sliderCirclePosition.setValueAtTime(sliderCircleParameters.animation.start, initialPosition);
    sliderCirclePosition.setValueAtTime(sliderCircleParameters.animation.end, finalPosition);
    sliderCirclePosition.setTemporalEaseAtKey(1, [sliderCircleParameters.animation.easeIn], [sliderCircleParameters.animation.easeOut]); // set ease in/out for the second keyframe
    sliderCirclePosition.setTemporalEaseAtKey(2, [sliderCircleParameters.animation.easeIn], [sliderCircleParameters.animation.easeOut]); // set ease in/out for the fourth keyframe

    return sliderCircleLayer;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createSliderBar (targetComposition) {

    if (targetComposition === undefined) {
        var targetComposition = project.activeItem;
    } 

    var sliderBarLayer = targetComposition.layers.addShape(); // create a new shape layer
    sliderBarLayer.name = "Slider Bar";

    var sliderBarShape = sliderBarLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group"); // add a new rectangle shape
    sliderBarShape.name = "Bar Shape"; // set the shape name

    var sliderBarPath = sliderBarShape.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect"); // add a rectangular path
    sliderBarPath.property("ADBE Vector Rect Size").setValue([sliderBarParameters.width, sliderBarParameters.height]); // set the size of the rectangle

    var sliderBarFill = sliderBarShape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill"); // add a fill property
    sliderBarFill.property("ADBE Vector Fill Color").setValue(sliderBarParameters.fill); // set the fill color to black

    // var sliderBarStroke = sliderBarShape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke"); // add a fill property
    // sliderBarStroke.property("ADBE Vector Stroke Color").setValue(sliderBarParameters.stroke.color); // set the fill color to black
    // sliderBarStroke.property("ADBE Vector Stroke Width").setValue(sliderBarParameters.stroke.size); // set the fill color to black

    var sliderBarCornersRadius = sliderBarShape.property("ADBE Vectors Group").addProperty("ADBE Vector Filter - RC"); // add a round corners filter
    sliderBarCornersRadius.property("ADBE Vector RoundCorner Radius").setValue(sliderBarParameters.cornerRadius); // set the radius of the round corners

    // Anchor Point
    // var sliderBarAnchor = sliderBarLayer.property("ADBE Transform Group").property("ADBE Anchor Point"); // get the anchor point property
    // sliderBarAnchor.setValue([0, 0]); // set the anchor point to 0,0

    // Position
    var sliderBarPosition = sliderBarLayer.property("Position"); // get the position property
    sliderBarPosition.setValue([sliderBarPosition.value[0], 35]); // set the position to [100,100]

    // Effects
    targetComposition.openInViewer();

    // Bevel and Emboss
    app.executeCommand(app.findMenuCommandId("Bevel and Emboss"));
    var sliderBarBevelAndEmboss = sliderBarLayer.property("Layer Styles").property("Bevel and Emboss");
    sliderBarBevelAndEmboss.property("Style").setValue(sliderBarParameters.bevelAndEmboss.style);
    sliderBarBevelAndEmboss.property("Depth").setValue(sliderBarParameters.bevelAndEmboss.depth);
    sliderBarBevelAndEmboss.property("Direction").setValue(sliderBarParameters.bevelAndEmboss.direction);
    sliderBarBevelAndEmboss.property("Size").setValue(sliderBarParameters.bevelAndEmboss.size);
    sliderBarBevelAndEmboss.property("Angle").setValue(sliderBarParameters.bevelAndEmboss.angle);
    sliderBarBevelAndEmboss.property("Altitude").setValue(sliderBarParameters.bevelAndEmboss.altitude);
    sliderBarBevelAndEmboss.property("Highlight Opacity").setValue(sliderBarParameters.bevelAndEmboss.highlightOpacity);
    sliderBarBevelAndEmboss.property("Shadow Opacity").setValue(sliderBarParameters.bevelAndEmboss.shadowOpacity);

    // Stroke
    app.executeCommand(app.findMenuCommandId("Stroke"));
    var sliderBarStroke = sliderBarLayer.property("Layer Styles").property("Stroke");
    sliderBarStroke.property("Color").setValue(sliderBarParameters.stroke.color);
    sliderBarStroke.property("Size").setValue(sliderBarParameters.stroke.size);
    sliderBarStroke.property("Opacity").setValue(sliderBarParameters.stroke.opacity);
    sliderBarStroke.property("Position").setValue(sliderBarParameters.stroke.position);

    // Shadow
    // app.executeCommand(app.findMenuCommandId("Drop Shadow"));
    // var sliderBarShadow = sliderBarLayer.property("Layer Styles").property("Drop Shadow");
    // sliderBarShadow.property("Use Global Light").setValue(true);

    return sliderBarLayer;

}


