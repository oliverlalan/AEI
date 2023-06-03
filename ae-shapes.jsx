// Calls
#include ae-defaultParameters.jsx
#include ae-testData.jsx

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: addShapeLayer(targetComposition, shapeLayerParameters, [0,0])
// var colorGradeSliderParameters = new HorizontalStackedSlider(315, 90, settingTest.temperature);
// addShapeLayer(app.project.activeItem, colorGradeSliderParameters.sliderCircle)
// TODO: Use setting variable to determine de kind of fill: Use animation preset for complex gradients: https://community.adobe.com/t5/after-effects-discussions/add-a-layer-style-stroke/m-p/10490919#M86764
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addShapeLayer(targetComposition, shapeLayerParameters) {

    // Create a new shape layer
    var shapeLayer = targetComposition.layers.addShape(); // create a new shape layer
    shapeLayer.selected = true;
    shapeLayer.name = shapeLayerParameters.name + " Layer";
    
    // Create a new shape group
    var shape = shapeLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group"); // add a new shape
    shape.name = shapeLayerParameters.name + " Shape"; // set the shape name
    
    // Create a new shape path
    switch (shapeLayerParameters.shape.type) {
        case "ellipse":
            var shapePath = shape.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse"); // add an ellipse shape
            shapePath.property("ADBE Vector Ellipse Size").setValue([shapeLayerParameters.shape.width, shapeLayerParameters.shape.height]); // set the ellipse size
        break;
        case "rectangle":
            var shapePath = shape.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect"); // add a rectangle shape
            shapePath.property("ADBE Vector Rect Size").setValue([shapeLayerParameters.shape.width, shapeLayerParameters.shape.height]); // set the rectangle size
            if (shapeLayerParameters.shape.hasOwnProperty('roundness')){
                shapePath.property("ADBE Vector Rect Roundness").setValue(shapeLayerParameters.shape.roundness);
            }
        break;
    }

    // Position
    if (shapeLayerParameters.position.hasOwnProperty('reference')) {
        shapeLayer.position.setValue(shapeLayerParameters.position.reference);
    }

    // Animation // TODO: updated ease with something specific
    if (shapeLayerParameters.position.hasOwnProperty('animation')) {
        shapeLayer.position.setValuesAtTimes(shapeLayerParameters.position.animation.keyTimes, shapeLayerParameters.position.animation.keyValues);
        
        for (var i = 1; i <= shapeLayerParameters.position.animation.keyTimes.length; i++) {
            shapeLayer.position.setTemporalEaseAtKey(i, [defaultAnimationParameters.easeIn], [defaultAnimationParameters.easeOut]); // set ease in/out for the second keyframe
        }

    }

    // Fill
    switch (shapeLayerParameters.shape.fill.type) { 
        case "solid":
            var shapeFill = shape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill"); // add a fill property
            shapeFill.property("ADBE Vector Fill Color").setValue(shapeLayerParameters.shape.fill.color); // set the fill color to white
            shapeFill.property("ADBE Vector Fill Opacity").setValue(shapeLayerParameters.shape.fill.opacity);
        break;
        case "gradient":
            var gradientFFX = new File("/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram Photos/Design - Reel/Assets/" + shapeLayerParameters.shape.fill.gradient.name + ".ffx");
            if (!gradientFFX.exists) {
                throw new Error ('File does not exist at path ' + gradientFFX.fsName);
            }
            shape.selected = true;
            shapeLayer.applyPreset(gradientFFX);

            var shapeFill = shape.property("ADBE Vectors Group").property("Gradient Fill");
            shapeFill.property("ADBE Vector Grad Start Pt").setValue(shapeLayerParameters.shape.fill.gradient.start);
            shapeFill.property("ADBE Vector Grad End Pt").setValue(shapeLayerParameters.shape.fill.gradient.end);

        break;
    }

    // if (shapeLayerParameters.shape.hasOwnProperty('fill')) {
    //     var shapeFill = shape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill"); // add a fill property
    //     shapeFill.property("ADBE Vector Fill Color").setValue(shapeLayerParameters.shape.fill.color); // set the fill color to white
    //     shapeFill.property("ADBE Vector Fill Opacity").setValue(shapeLayerParameters.shape.fill.opacity);
    // }

    // Stroke
    if (shapeLayerParameters.shape.hasOwnProperty('stroke')) {
        var shapeStroke = shape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke"); // add a fill property
        shapeStroke.property("ADBE Vector Stroke Color").setValue(shapeLayerParameters.shape.stroke.color); // set the fill color to black
        shapeStroke.property("ADBE Vector Stroke Opacity").setValue(shapeLayerParameters.shape.stroke.opacity);
        shapeStroke.property("ADBE Vector Stroke Width").setValue(shapeLayerParameters.shape.stroke.width);
        shapeStroke.property("ADBE Vector Stroke Line Cap").setValue(shapeLayerParameters.shape.stroke.cap);
    }

    // Offset
    if (shapeLayerParameters.shape.hasOwnProperty('offset')) {
        var shapeOffset = shape.property("ADBE Vectors Group").addProperty("ADBE Vector Filter - Offset");
        shapeOffset.property("ADBE Vector Offset Amount").setValue(shapeLayerParameters.shape.offset.amount);
    }

    // EFFECTS
    // Drop Shadow
    if (shapeLayerParameters.effects.hasOwnProperty('shadow')) {
        var shapeLayerShadow = shapeLayer.property("ADBE Effect Parade").addProperty("ADBE Drop Shadow");
        shapeLayerShadow.property("Opacity").setValue(shapeLayerParameters.effects.shadow.opacity);
        shapeLayerShadow.property("Direction").setValue(shapeLayerParameters.effects.shadow.direction);
        shapeLayerShadow.property("Distance").setValue(shapeLayerParameters.effects.shadow.distance);
        shapeLayerShadow.property("Softness").setValue(shapeLayerParameters.effects.shadow.softness);
    }

    // Gradient Ramp
    // if(shapeLayerParameters.effects.hasOwnProperty('gradientRamp')) {
    //     var sliderBarGradientRamp = shapeLayer.property("ADBE Effect Parade").addProperty("ADBE Ramp");
    //     sliderBarGradientRamp.property("Start of Ramp").setValue(shapeLayerParameters.effects.gradientRamp.startPosition);
    //     sliderBarGradientRamp.property("Start Color").setValue(shapeLayerParameters.effects.gradientRamp.startColor);
    //     sliderBarGradientRamp.property("End of Ramp").setValue(shapeLayerParameters.effects.gradientRamp.endPosition);
    //     sliderBarGradientRamp.property("End Color").setValue(shapeLayerParameters.effects.gradientRamp.endColor);
    //     sliderBarGradientRamp.property("Ramp Shape").setValue(shapeLayerParameters.effects.gradientRamp.shape);
    // }
    
    // LAYER STYLES
    // Load in order to make it work
    // targetComposition.openInViewer();

    // Stroke
    // if (shapeLayerParameters.layerStyle.hasOwnProperty('stroke')) {
    //     app.executeCommand(app.findMenuCommandId("Stroke"));
    //     var shapeLayerStroke = shapeLayer.property("Layer Styles").property("Stroke");
    //     shapeLayerStroke.property("Color").setValue(shapeLayerParameters.layerStyle.stroke.color);
    //     shapeLayerStroke.property("Size").setValue(shapeLayerParameters.layerStyle.stroke.size);
    //     shapeLayerStroke.property("Opacity").setValue(shapeLayerParameters.layerStyle.stroke.opacity);
    //     shapeLayerStroke.property("Position").setValue(shapeLayerParameters.layerStyle.stroke.position);
    // }

    // Shadow
    // if (shapeLayerParameters.layerStyle.hasOwnProperty('shadow')) {
    //     app.executeCommand(app.findMenuCommandId("Drop Shadow")); // Returns wrong ID (the one for the effect, not the layer style)
    //     app.executeCommand(9000);
    //     var shapeLayerShadow = shapeLayer.property("Layer Styles").property("Drop Shadow");
    //     shapeLayerShadow.property("Opacity").setValue(shapeLayerParameters.effects.shadow.opacity); // set the shadow opacity
    //     shapeLayerShadow.property("Angle").setValue(shapeLayerParameters.effects.shadow.angle); // set the shadow opacity
    //     shapeLayerShadow.property("Distance").setValue(shapeLayerParameters.effects.shadow.distance); // set the shadow distance
    //     shapeLayerShadow.property("Spread").setValue(shapeLayerParameters.effects.shadow.spread); // set the shadow softness
    //     shapeLayerShadow.property("Size").setValue(shapeLayerParameters.effects.shadow.size); // set the shadow softness
    // }

    // Anchor Point
    // var shapeAnchor = shapeLayer.property("ADBE Transform Group").property("ADBE Anchor Point"); // get the anchor point property
    // shapeAnchor.setValue([0, 0]); // set the anchor point to 0,0

    // Set the shape anchor point and position to animate 
    // shape.property("ADBE Vector Transform Group").property("Anchor Point").setValue(shapeLayerParameters.position.reference);
    // shape.property("ADBE Vector Transform Group").property("Position").setValue(shapeLayerParameters.position.reference);

    return shapeLayer;

}

function addColorGradeCircleBackground(targetComposition, shapeLayerParameters) {

    // Create a new shape layer
    var shapeLayer = targetComposition.layers.addShape(); // create a new shape layer
    shapeLayer.selected = true;
    shapeLayer.name = shapeLayerParameters.name + " Layer";
    
    // Create a new shape group
    var shape = shapeLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group"); // add a new shape
    shape.name = shapeLayerParameters.name + " Shape"; // set the shape name
    
    // Shape
    var shapePath = shape.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse"); // add an ellipse shape
    shapePath.property("ADBE Vector Ellipse Size").setValue([shapeLayerParameters.shape.width, shapeLayerParameters.shape.height]); // set the ellipse size
       
    // Position
    if (shapeLayerParameters.position.hasOwnProperty('reference')) {
        shapeLayer.position.setValue(shapeLayerParameters.position.reference);
    }

    // Preset
    var gradientFFX = new File("/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram Photos/Design - Reel/Assets/" + shapeLayerParameters.shape.fill.gradient.name + ".ffx");
    if (!gradientFFX.exists) {
        throw new Error ('File does not exist at path ' + gradientFFX.fsName);
    }
    shape.selected = true;
    shapeLayer.applyPreset(gradientFFX);

    var shapeFill = shape.property("ADBE Vectors Group").property("Gradient Fill");
    shapeFill.property("ADBE Vector Grad Start Pt").setValue(shapeLayerParameters.shape.fill.gradient.start);
    shapeFill.property("ADBE Vector Grad End Pt").setValue(shapeLayerParameters.shape.fill.gradient.end);

    return shapeLayer;

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addGradientFill(shapeLayer, color1, color2) {
    // create a new fill object
    var fill = shapeLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Graphic - Fill");

    // set the fill type to Gradient
    fill.property("ADBE Vector Fill Rule").setValue(2);

    // create a new gradient object
    var gradient = fill.property("ADBE Vector Fill Gradient").addProperty("ADBE Vector Gradient2");

    // set the colors of the gradient
    gradient.property("ADBE Vector Gradient Color A").setValue(color1);
    gradient.property("ADBE Vector Gradient Color B").setValue(color2);
}
