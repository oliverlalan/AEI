// Calls
#include ae-defaultParameters.jsx
#include ae-components.jsx
#include ae-testData.jsx
#include ae-utils.jsx

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: addShapeLayer(targetComposition, shapeLayerParameters, [0,0])

// var colorGradeSliderParameters = new HorizontalSlider(16*45, 45, settingTest.temperature);
// var colorGradeSliderParameters = new HorizontalStackedSlider(315, 90, settingTest.temperature);
// addShapeLayer(app.project.activeItem, colorGradeSliderParameters.sliderBar)
// addShapeLayer(app.project.activeItem, colorGradeSliderParameters.sliderCircle)
// var groupParameters = new GroupParameters(groupTest)
// var image = loadImageFromPath("/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram Photos/Scripts/Test/2022-11-23_13-19-00.xmp");
// var x = 3;
// TODO: Use setting variable to determine de kind of fill: Use animation preset for complex gradients: https://community.adobe.com/t5/after-effects-discussions/add-a-layer-style-stroke/m-p/10490919#M86764
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addShapeLayer(targetComposition, shapeLayerParameters) {

    // Create a new shape layer
    var shapeLayer = targetComposition.layers.addShape(); // create a new shape layer
    shapeLayer.selected = true;
    shapeLayer.name = shapeLayerParameters.name;
    
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

        case "path":

            // Create a new shape path
            var shapePath = shape.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Group");

            // Create shape object
            var smoothCurve = getSmoothCurve(shapeLayerParameters.shape.path);
            var smoothPath = new Shape();
            smoothPath.vertices = smoothCurve;
            smoothPath.closed = false;

            // Set the new shape as the value of the shape property
            shapePath.property("Path").setValue(smoothPath);

        break;

    }

    // Position
    if (shapeLayerParameters.position.hasOwnProperty('reference')) {

        shapeLayer.position.setValue(shapeLayerParameters.position.reference);
        
    }

    // Animate Layer
    if (shapeLayerParameters.position.hasOwnProperty('animation')) {

        // Animate
        shapeLayer.position.setValuesAtTimes(shapeLayerParameters.position.animation.keyTimes, shapeLayerParameters.position.animation.keyValues);
        
        // Ease
        for (var i = 1; i <= shapeLayerParameters.position.animation.keyTimes.length; i++) {
            shapeLayer.position.setTemporalEaseAtKey(i, [defaultAnimationParameters.easeIn], [defaultAnimationParameters.easeOut]); // set ease in/out for the second keyframe
        }

    }

    // Animate Shape
    // try {

        if (shapeLayerParameters.shape.hasOwnProperty('animation')) {

            // Create initial shape object
            var initialSmoothCurve = getSmoothCurve(shapeLayerParameters.shape.animation.keyValues[0]);
            var initialShape = new Shape();
            initialShape.vertices = initialSmoothCurve;
            initialShape.closed = false;

            // Create final shape object 
            var finalSmoothCurve = getSmoothCurve(shapeLayerParameters.shape.animation.keyValues[1]);
            var finalShape = new Shape();
            finalShape.vertices = finalSmoothCurve;
            finalShape.closed = false;

            // Animate
            shapePath.property("Path").setValuesAtTimes(shapeLayerParameters.shape.animation.keyTimes, [initialShape, finalShape]);
            
            // Ease
            for (var i = 1; i <= shapeLayerParameters.shape.animation.keyTimes.length; i++) {
                shapePath.property("Path").setTemporalEaseAtKey(i, [defaultAnimationParameters.easeIn], [defaultAnimationParameters.easeOut]); // set ease in/out for the second keyframe
            }

        }

    // } catch(e) {}
    

    // Fill
    switch (shapeLayerParameters.shape.fill.type) {

        case "solid":
            var shapeFill = shape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill"); // add a fill property
            shapeFill.property("ADBE Vector Fill Color").setValue(shapeLayerParameters.shape.fill.color); // set the fill color to white
            shapeFill.property("ADBE Vector Fill Opacity").setValue(shapeLayerParameters.shape.fill.opacity);
        break;

        case "gradient":
            var shapeFill = shape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - G-Fill");
            shapeFill.property("ADBE Vector Grad Start Pt").setValue(shapeLayerParameters.shape.fill.gradient.start);
            shapeFill.property("ADBE Vector Grad End Pt").setValue(shapeLayerParameters.shape.fill.gradient.end);
        break;

        case "none":
        break;

    }

    // FFX
    if (shapeLayerParameters.shape.hasOwnProperty('ffx')) {

        for (f = 0; f < shapeLayerParameters.shape.ffx.length; f++) {

            // Add ffx effect
            var ffxFillName = loadFFXFile("/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram Photos/Design - Reel/Assets/", shapeLayerParameters.shape.ffx[f]);
            var gradientFFX = new File("/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram Photos/Design - Reel/Assets/" + ffxFillName);
            if (!gradientFFX.exists) {
                throw new Error ('File does not exist at path ' + gradientFFX.fsName);
            }
            shapeFill.selected = true;
            shapeLayer.applyPreset(gradientFFX);

            // Recompute gradient start and end
            if (shapeLayerParameters.shape.fill.hasOwnProperty("gradient")) {
                var shapeFill = shape.property("ADBE Vectors Group").property("Gradient Fill");
                shapeFill.property("ADBE Vector Grad Start Pt").setValue(shapeLayerParameters.shape.fill.gradient.start);
                shapeFill.property("ADBE Vector Grad End Pt").setValue(shapeLayerParameters.shape.fill.gradient.end);
            }

        }
        
    }

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
    try {

        if (shapeLayerParameters.effects.hasOwnProperty('shadow')) {

            var shapeLayerShadow = shapeLayer.property("ADBE Effect Parade").addProperty("ADBE Drop Shadow");
            shapeLayerShadow.property("Opacity").setValue(shapeLayerParameters.effects.shadow.opacity);
            shapeLayerShadow.property("Direction").setValue(shapeLayerParameters.effects.shadow.direction);
            shapeLayerShadow.property("Distance").setValue(shapeLayerParameters.effects.shadow.distance);
            shapeLayerShadow.property("Softness").setValue(shapeLayerParameters.effects.shadow.softness);

        }
    
    } catch(e) {}

    // Grid
    try {
    
        if (shapeLayerParameters.effects.hasOwnProperty('grid')) {

            var shapeLayerGrid = shapeLayer.property("ADBE Effect Parade").addProperty("ADBE Grid");
            shapeLayerGrid.property("Anchor").setValue(shapeLayerParameters.effects.grid.anchor);
            shapeLayerGrid.property("Corner").setValue(shapeLayerParameters.effects.grid.corner);
            shapeLayerGrid.property("Border").setValue(shapeLayerParameters.effects.grid.border);

        }

    } catch(e) {}

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


function getSmoothCurve(pointsArray) {

    // Create points Array
    var pX = []                 // x values
    var pY = []                 // y values
    var pYs = []                // values for smooth y
    var pK =  []                // derivative values
    var smoothCurve = [];  // smooth curve

    // Split points by dimension, and add a third array with the first derivative = 1 for each point.
    for (i = 0; i < pointsArray.length; i ++) {
        pX[i] = pointsArray[i][0];
        pY[i] = pointsArray[i][1];
        pK[i] = 1;
    }

    // Get the natural Ks
    getNaturalKs(pX, pY, pK);

    // Compute the smooth curve using the natural Ks
    for (i = 0; i < 256; i ++) {

        var smoothPoint = evalSpline (i, pX, pY, pK);

        // Caps and floors for the values
        if (smoothPoint < 0 )  {
            smoothPoint = 0;
        } else if (smoothPoint > 254) {
            smoothPoint = 254;
        }

        // Normalize values according to the size of the composition and invert Y
        smoothCurve.push([i / 256 * toneCurveBackgroundParameters.width, - smoothPoint / 256 * toneCurveBackgroundParameters.height + toneCurveBackgroundParameters.height]);

    }

    return smoothCurve;

}

//https://github.com/kuckir/CSPL.js/blob/master/CSPL.js
//https://blog.ivank.net/interpolation-with-cubic-splines.html        
function getNaturalKs (xs, ys, ks)	// in x values, in y values, out k values
{
    var n = xs.length-1;
    var A = zerosMat(n+1, n+2);
        
    for(var i=1; i<n; i++)	// rows
    {
        A[i][i-1] = 1/(xs[i] - xs[i-1]);
        
        A[i][i  ] = 2 * (1/(xs[i] - xs[i-1]) + 1/(xs[i+1] - xs[i])) ;
        
        A[i][i+1] = 1/(xs[i+1] - xs[i]);
        
        A[i][n+1] = 3*( (ys[i]-ys[i-1])/((xs[i] - xs[i-1])*(xs[i] - xs[i-1]))  +  (ys[i+1]-ys[i])/ ((xs[i+1] - xs[i])*(xs[i+1] - xs[i])) );
    }
    
    A[0][0  ] = 2/(xs[1] - xs[0]);
    A[0][1  ] = 1/(xs[1] - xs[0]);
    A[0][n+1] = 3 * (ys[1] - ys[0]) / ((xs[1]-xs[0])*(xs[1]-xs[0]));
    
    A[n][n-1] = 1/(xs[n] - xs[n-1]);
    A[n][n  ] = 2/(xs[n] - xs[n-1]);
    A[n][n+1] = 3 * (ys[n] - ys[n-1]) / ((xs[n]-xs[n-1])*(xs[n]-xs[n-1]));
        
    solve(A, ks);

    function solve (A, x)	// in Matrix, out solutions
    {
        var m = A.length;
        for(var k=0; k<m; k++)	// column
        {
            // pivot for column
            var i_max = 0; var vali = Number.NEGATIVE_INFINITY;
            for(var i=k; i<m; i++) if(Math.abs(A[i][k])>vali) { i_max = i; vali = Math.abs(A[i][k]);}
            swapRows(A, k, i_max);
            
            //if(A[k][k] == 0) console.log("matrix is singular!");
            
            // for all rows below pivot
            for(var i=k+1; i<m; i++)
            {
                var cf = (A[i][k] / A[k][k]);
                for(var j=k; j<m+1; j++)  A[i][j] -= A[k][j] * cf;
            }
        }
        
        for(var i=m-1; i>=0; i--)	// rows = columns
        {
            var v = A[i][m] / A[i][i];
            x[i] = v;
            for(var j=i-1; j>=0; j--)	// rows
            {
                A[j][m] -= A[j][i] * v;
                A[j][i] = 0;
            }
        }

        function swapRows (m, k, l) {
            var p = m[k];
            m[k] = m[l];
            m[l] = p;
        }

    }

    function zerosMat (r,c) {
        var A = []; 
        for(var i=0; i<r; i++) {
            A.push([]); 
            for(var j=0; j<c; j++) {
                A[i].push(0);
            }
        } 
        return A;
    }

}

function evalSpline (x, xs, ys, ks) {
    var i = 1;
    while(xs[i]<x) i++;
    
    var t = (x - xs[i-1]) / (xs[i] - xs[i-1]);
    
    var a =  ks[i-1]*(xs[i]-xs[i-1]) - (ys[i]-ys[i-1]);
    var b = -ks[i  ]*(xs[i]-xs[i-1]) + (ys[i]-ys[i-1]);
    
    var q = (1-t)*ys[i-1] + t*ys[i] + t*(1-t)*(a*(1-t)+b*t);
    return q;
}

