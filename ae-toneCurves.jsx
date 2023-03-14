// Calls

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TODO create a function for the parametric Curves
// TODO Take the parametric curves out of the tone curves in the xmpNamespace

function createToneCurveGroupComposition (settingsGroup, setSpacing) {

    var groupName = settingsGroup.displayName;
    var settings = settingsGroup.settings;

    // Create folder to store each slider
    var groupCompositionsFolder = project.items.addFolder(groupName + " Pre-Compositions");

    // Create group composition
    var groupComposition = project.items.addComp(groupName, panelCompositionParameters.width, panelCompositionParameters.height, panelCompositionParameters.pixelAspect, panelCompositionParameters.duration, panelCompositionParameters.frameRate);

    // Initialize of the precomposition position in the group composition
    var settingCompositionXPosition = panelCompositionParameters.padding.left;
    var settingCompositionYPosition = panelCompositionParameters.padding.top;

    for (settingKey in settings) {

        // Create each precomposition
        var settingComposition = createToneCurveComposition (settings[settingKey]);

        // Store the precomposition in the corresponding foldre
        settingComposition.parentFolder = groupCompositionsFolder;

        // Include the precomposition created in the group composition
        var settingComposition = groupComposition.layers.add(settingComposition);

        // Position the precomposition in the group composition
        setAnchorPoint(settingComposition, sliderCompositionParameters.anchorPoint);
        settingComposition.position.setValue([settingCompositionXPosition, settingCompositionYPosition]);

        // Update Y position of the next precomposition
        settingCompositionYPosition = settingCompositionYPosition + settingComposition.height + setSpacing;

    }

    return groupComposition;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createToneCurveComposition (setting) {

    var compositionName = setting.displayName + " Composition";

    // Check if composition already exist. If not, create the composition.
    if (selectCompositionByName(compositionName)) {
        return selectCompositionByName(compositionName);
    }
    
    // Create Tone Curve Composition
    var toneCurveComposition = project.items.addComp(compositionName, toneCurveCompositionParameters.width, toneCurveCompositionParameters.height, toneCurveCompositionParameters.pixelAspect, toneCurveCompositionParameters.duration, toneCurveCompositionParameters.frameRate);
    
    // Create Tone Curve Background
    var toneCurveBackground = createToneCurveBackground(toneCurveComposition, setting);

    // Create Tone Curve Grid and Frame
    var toneCurveGrid = createToneCurveGrid (toneCurveComposition);
    
    // Create Tone Curve Curve Layer // TODO Animate with final values or call 
    var toneCurvePathLayer = createToneCurvePath(toneCurveComposition, setting);

    // Create Tone Curve Anchor Point Layers
    createToneCurveAnchorPoints(toneCurveComposition, setting)

    return toneCurveComposition;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createToneCurvePath(targetComposition, setting) {

    // Create a new shape layer
    var toneCurvePathLayer = targetComposition.layers.addShape();
    toneCurvePathLayer.name = "Tone Curve Path";

    // Create a new shape group
    var toneCurvePathShape = toneCurvePathLayer.property("Contents").addProperty("ADBE Vector Group");

    // Create a new shape path
    var toneCurvePath = toneCurvePathShape.property("Contents").addProperty("ADBE Vector Shape - Group");
    
    // Create initial shape point array
    var initialSmoothCurve = getSmoothCurve(setting.defaultValue);

    // Create finals shape point array
    var finalSmoothCurve = getSmoothCurve(setting.settingValue);
    
    // Create initial and final shape objects out of the point arrays
    var initialShape = new Shape();
    initialShape.vertices = initialSmoothCurve;
    initialShape.closed = false;

    var finalShape = new Shape();
    finalShape.vertices = finalSmoothCurve;
    finalShape.closed = false;

    // Set the new shape as the value of the shape property
    toneCurvePath.property("Path").setValue(initialShape);

    // Animate
    animateLayer(toneCurvePath, "Path", [1,2], [initialShape, finalShape])

    // Stroke
    var toneCurvePathStroke = toneCurvePathShape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
    toneCurvePathStroke.property("ADBE Vector Stroke Color").setValue(toneCurvePathParameters.stroke.color);
    toneCurvePathStroke.property("ADBE Vector Stroke Width").setValue(toneCurvePathParameters.stroke.size);

    // Add the Drop Shadow effect to the layer
    var toneCurvePathLayerShadow = toneCurvePathLayer.property("ADBE Effect Parade").addProperty("ADBE Drop Shadow");
    toneCurvePathLayerShadow.property("Opacity").setValue(toneCurvePathParameters.shadow.opacity);
    toneCurvePathLayerShadow.property("Direction").setValue(toneCurvePathParameters.shadow.direction);
    toneCurvePathLayerShadow.property("Distance").setValue(toneCurvePathParameters.shadow.distance);
    toneCurvePathLayerShadow.property("Softness").setValue(toneCurvePathParameters.shadow.softness);

    // Position
    var toneCurvePathPosition = toneCurvePathLayer.property("Position");
    toneCurvePathPosition.setValue([0, 0]);

    return toneCurvePathLayer;

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

        return smoothCurve

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
}

function createToneCurveBackground (targetComposition, setting) {

    // create a new shape layer
    var toneCurveBackgroundLayer = targetComposition.layers.addShape(); 
    toneCurveBackgroundLayer.name = "Tone Curve Background";

    // add a new rectangle shape
    var toneCurveBackgroundShape = toneCurveBackgroundLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
    toneCurveBackgroundShape.name = "Background Shape";

    // add a rectangular path
    var toneCurveBackgroundPath = toneCurveBackgroundShape.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect");
    toneCurveBackgroundPath.property("ADBE Vector Rect Size").setValue([toneCurveBackgroundParameters.width, toneCurveBackgroundParameters.height]);

    // add fill
    var toneCurveBackgroundFill = toneCurveBackgroundShape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
    toneCurveBackgroundFill.property("ADBE Vector Fill Color").setValue(toneCurveBackgroundParameters.fill);

    // Position
    var toneCurveBackgroundPosition = toneCurveBackgroundLayer.property("Position");
    toneCurveBackgroundPosition.setValue([toneCurveBackgroundParameters.width / 2, toneCurveBackgroundParameters.height / 2]);

    // Effects
    targetComposition.openInViewer();

    // Gradient
    if(setting.fillType == "Gradient") {

        // Apply the Gradient Overlay effect to the layer
        var toneCurveBackgroundGradientRamp = toneCurveBackgroundLayer.effect.addProperty("ADBE Ramp");
        toneCurveBackgroundGradientRamp.property("Start of Ramp").setValue([0,0]);
        toneCurveBackgroundGradientRamp.property("Start Color").setValue(setting.gradientColors[0]);
        toneCurveBackgroundGradientRamp.property("End of Ramp").setValue([225,225]);
        toneCurveBackgroundGradientRamp.property("End Color").setValue(setting.gradientColors[1]);
        toneCurveBackgroundGradientRamp.property("Ramp Shape").setValue(1);
    
    }

}

function createToneCurveGrid (targetComposition) {

    // Add layer
    var toneCurveGridLayer = targetComposition.layers.addShape();
    toneCurveGridLayer.name = "My Shape Layer";

    // Add tone curve grid shape
    var toneCurveGridShape = toneCurveGridLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group"); // add a new rectangle shape
    toneCurveGridShape.name = "Grid Shape"; // set the shape name

    // Add tone curve grid shape
    var toneCurveGridPath = toneCurveGridShape.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect");
    toneCurveGridPath.property("ADBE Vector Rect Size").setValue([toneCurveGridParameters.width, toneCurveGridParameters.height]);

    // Add grid effects
    var toneCurveGridEffect = toneCurveGridLayer.Effects.addProperty("Grid");
    toneCurveGridEffect.property("Anchor").setValue(toneCurveGridParameters.anchor);
    toneCurveGridEffect.property("Corner").setValue(toneCurveGridParameters.corner);
    toneCurveGridEffect.property("Border").setValue(toneCurveGridParameters.border);

}

function createToneCurveAnchorPoints (targetComposition, setting) {

    for (var a = 0; a < setting.settingValue.length; a ++){

        // Add layer
        var toneCurveAnchorPointLayer = targetComposition.layers.addShape(); // create a new shape layer
        toneCurveAnchorPointLayer.name = "Anchor Point [" + setting.settingValue[a][0] + ", " + setting.settingValue[a][1] + "]";
        
        // Add a new circle shape
        var toneCurveAnchorPointShape = toneCurveAnchorPointLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
        toneCurveAnchorPointShape.name = "Circle Shape";
        
        // Add an ellipse shape
        var toneCurveAnchorPointPath = toneCurveAnchorPointShape.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
        toneCurveAnchorPointPath.property("ADBE Vector Ellipse Size").setValue([toneCurveAnchorPointParameters.diameter, toneCurveAnchorPointParameters.diameter]);

        // Fill
        var toneCurveAnchorPointFill = toneCurveAnchorPointShape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
        toneCurveAnchorPointFill.property("ADBE Vector Fill Color").setValue(toneCurveAnchorPointParameters.fill);

        // Stroke
        // var toneCurveAnchorPointStroke = toneCurveAnchorPointShape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke"); // add a fill property
        // toneCurveAnchorPointStroke.property("ADBE Vector Stroke Color").setValue([0, 255, 0, 255]/255); // set the fill color to black

        // Add the Drop Shadow effect to the layer
        var toneCurveAnchorPointLayerShadow = toneCurveAnchorPointLayer.property("ADBE Effect Parade").addProperty("ADBE Drop Shadow");
        toneCurveAnchorPointLayerShadow.property("Opacity").setValue(toneCurveAnchorPointParameters.shadow.opacity);
        toneCurveAnchorPointLayerShadow.property("Direction").setValue(toneCurveAnchorPointParameters.shadow.direction);
        toneCurveAnchorPointLayerShadow.property("Distance").setValue(toneCurveAnchorPointParameters.shadow.distance);
        toneCurveAnchorPointLayerShadow.property("Softness").setValue(toneCurveAnchorPointParameters.shadow.softness);

        // Anchor Point
        // var toneCurveAnchorPointAnchor = toneCurveAnchorPointLayer.property("ADBE Transform Group").property("ADBE Anchor Point"); // get the anchor point property
        // toneCurveAnchorPointAnchor.setValue([0, 0]); // set the anchor point to 0,0

        // Normalize and invert Y
        var anchorPointInitialPosition = [setting.defaultValue[a][0] / 256 * toneCurveBackgroundParameters.width, - setting.defaultValue[a][1] / 256 * toneCurveBackgroundParameters.height + toneCurveBackgroundParameters.height];
        var anchorPointFinalPosition = [setting.settingValue[a][0] / 256 * toneCurveBackgroundParameters.width, - setting.settingValue[a][1] / 256 * toneCurveBackgroundParameters.height + toneCurveBackgroundParameters.height] ;

        var toneCurveAnchorPointPosition = toneCurveAnchorPointLayer.property("Position"); // add the X position property to the layer
        toneCurveAnchorPointPosition.setValue([anchorPointInitialPosition[0], anchorPointInitialPosition[1]]); // set the position to [100,100]

        // Animate slider circle
        animateLayer (toneCurveAnchorPointLayer, "Position", [toneCurveAnchorPointParameters.animation.start, toneCurveAnchorPointParameters.animation.end], [anchorPointInitialPosition, anchorPointFinalPosition]);

    }

    return toneCurveAnchorPointLayer;
    
}
