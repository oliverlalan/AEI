// Calls
// #include ae-utils.jsx
// #include ae-style.jsx
// #include ae-defaultParameters.jsx
// #include ae-xmpNamespace.jsx
// #include ae-animation.jsx
// #include ae-texts.jsx
// #include ae-shapes.jsx
// #include ae-sliders.jsx
// #include ae-metadata.jsx
// #include ae-toneCurves.jsx

// var imageSettings = loadImageFromPath("/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram Photos/Scripts/Test/2022-11-23_13-19-00.xmp");
// createToneCurveGroupComposition(imageSettings.panels.toneCurve.groups.redChannel);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// TODO create a function for the parametric Curves
// TODO Take the parametric curves out of the tone curves in the xmpNamespace
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createToneCurveGroupComposition (settingsGroup, style) {

    var groupName = settingsGroup.displayName;
    var settings = settingsGroup.settings;

    // Reset reference position
    var groupReferencePosition = [0,0];

    // Initialize of the precomposition position in the group composition
    // var settingCompositionXPosition = panelCompositionParameters.padding.left;
    // var settingCompositionYPosition = panelCompositionParameters.padding.top;

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
    groupReferencePosition[0] += 225;
    groupReferencePosition[1] += groupTitleCompositionParameters.height;

    for (settingKey in settings) {

        // Create each precomposition
        var toneCurveGraphComposition = createToneCurveGraphComposition (settings[settingKey]);
        var toneCurveValuesComposition = createToneCurveValuesComposition (settings[settingKey]);

        // Store the precomposition in the corresponding folder
        toneCurveGraphComposition.parentFolder = groupCompositionsFolder;
        toneCurveValuesComposition.parentFolder = groupCompositionsFolder;

        // Include the precomposition created in the group composition
        var toneCurveGraphCompositionLayer = groupComposition.layers.add(toneCurveGraphComposition);
        var toneCurveValuesCompositionLayer = groupComposition.layers.add(toneCurveValuesComposition);

        // Position the precomposition in the group composition
        setAnchorPosition(toneCurveGraphCompositionLayer, toneCurveGraphCompositionParameters.anchorPosition);
        toneCurveGraphCompositionLayer.position.setValue(groupReferencePosition);
        
        groupReferencePosition[0] += toneCurveGraphComposition.width;

        setAnchorPosition(toneCurveValuesCompositionLayer, toneCurveGraphCompositionParameters.anchorPosition);
        toneCurveValuesCompositionLayer.position.setValue(groupReferencePosition);
        

        // Update Y position of the next precomposition
        // groupReferencePosition[1] += toneCurveGraphComposition.height;

    }

    return groupComposition;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createToneCurveGraphComposition (setting) {

    var compositionName = setting.displayName + " Graph Composition";

    // Check if composition already exist. If not, create the composition.
    if (selectCompositionByName(compositionName)) {
        return selectCompositionByName(compositionName);
    }
    
    // Create Tone Curve Composition
    var toneCurveComposition = project.items.addComp(compositionName, toneCurveGraphCompositionParameters.width, toneCurveGraphCompositionParameters.height, toneCurveGraphCompositionParameters.pixelAspect, toneCurveGraphCompositionParameters.duration, toneCurveGraphCompositionParameters.frameRate);
    
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
// Call: createSlidersGroupComposition (groups[groupKey], style);
// TODO: Compute setSpacing based on ammount of slider settings
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
    animateLayer (toneCurvePath, "Path", setting.animation.setting.keyTimes, [initialShape, finalShape]);
    // animateLayer(toneCurvePath, "Path", [1,2], [initialShape, finalShape]) // This works

    // Stroke
    var toneCurvePathStroke = toneCurvePathShape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
    toneCurvePathStroke.property("ADBE Vector Stroke Color").setValue(toneCurvePathParameters.stroke.color);
    toneCurvePathStroke.property("ADBE Vector Stroke Width").setValue(toneCurvePathParameters.stroke.width);
    toneCurvePathStroke.property("ADBE Vector Stroke Line Cap").setValue(toneCurvePathParameters.stroke.cap);

    // Add the Drop Shadow effect to the layer
    var toneCurvePathLayerShadow = toneCurvePathLayer.property("ADBE Effect Parade").addProperty("ADBE Drop Shadow");
    toneCurvePathLayerShadow.property("Opacity").setValue(toneCurvePathParameters.shadow.opacity);
    toneCurvePathLayerShadow.property("Direction").setValue(toneCurvePathParameters.shadow.direction);
    toneCurvePathLayerShadow.property("Distance").setValue(toneCurvePathParameters.shadow.distance);
    toneCurvePathLayerShadow.property("Softness").setValue(toneCurvePathParameters.shadow.softness);

    // Position
    var toneCurvePathPosition = toneCurvePathLayer.property("Position");
    toneCurvePathPosition.setValue([toneCurveGraphCompositionParameters.padding.left, toneCurveGraphCompositionParameters.padding.top]);

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createSlidersGroupComposition (groups[groupKey], style);
// TODO: Compute setSpacing based on ammount of slider settings
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    // reduce opacity
    // toneCurveBackgroundLayer.opacity.setValue(newOpacity);
    toneCurveBackgroundLayer.opacity.setValue(85);
    var toneCurveBackgroundFill = toneCurveBackgroundShape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
    toneCurveBackgroundFill.property("ADBE Vector Fill Color").setValue(toneCurveBackgroundParameters.fill);

    // Position
    // var toneCurveBackgroundPosition = toneCurveBackgroundLayer.property("Position");
    // toneCurveBackgroundPosition.setValue([toneCurveBackgroundParameters.width / 2, toneCurveBackgroundParameters.height / 2]);

    // Effects
    targetComposition.openInViewer();

    // Gradient
    if(setting.fillType == "gradient") {

        // Apply the Gradient Overlay effect to the layer
        var toneCurveBackgroundGradientRamp = toneCurveBackgroundLayer.effect.addProperty("ADBE Ramp");
        toneCurveBackgroundGradientRamp.property("Start of Ramp").setValue([toneCurveGraphCompositionParameters.padding.left, toneCurveGraphCompositionParameters.padding.top]);
        toneCurveBackgroundGradientRamp.property("Start Color").setValue(setting.gradientColors[0]);
        toneCurveBackgroundGradientRamp.property("End of Ramp").setValue([toneCurveGraphCompositionParameters.width - toneCurveGraphCompositionParameters.padding.right, toneCurveGraphCompositionParameters.height - toneCurveGraphCompositionParameters.padding.bottom]);
        toneCurveBackgroundGradientRamp.property("End Color").setValue(setting.gradientColors[1]);
        toneCurveBackgroundGradientRamp.property("Ramp Shape").setValue(1);
    
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createToneCurveGrid (targetComposition);
// TODO: Compute setSpacing based on ammount of slider settings
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createToneCurveGrid (targetComposition) {

    // Create group composition
    var toneCurveGridComposition = project.items.addComp("Tone Curve Grid", toneCurveBackgroundParameters.width, toneCurveBackgroundParameters.height, toneCurveGraphCompositionParameters.pixelAspect, toneCurveGraphCompositionParameters.duration, toneCurveGraphCompositionParameters.frameRate);

    // Store the precomposition in the corresponding folder
    // toneCurveGridComposition.parentFolder = groupCompositionsFolder;
    
    // Add layer
    var toneCurveGridLayer = toneCurveGridComposition.layers.addShape();
    toneCurveGridLayer.name = "Tone Curve Grid";

    // Add tone curve grid shape
    var toneCurveGridShape = toneCurveGridLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group"); // add a new rectangle shape
    toneCurveGridShape.name = "Tone Curve Grid Shape"; // set the shape name

    // Add tone curve grid path
    var toneCurveGridPath = toneCurveGridShape.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect");
    toneCurveGridPath.property("ADBE Vector Rect Size").setValue([toneCurveGridParameters.width, toneCurveGridParameters.height]);

    // Add grid effects
    var toneCurveGridEffect = toneCurveGridLayer.Effects.addProperty("Grid");
    toneCurveGridEffect.property("Anchor").setValue(toneCurveGridParameters.anchor);
    toneCurveGridEffect.property("Corner").setValue(toneCurveGridParameters.corner);
    toneCurveGridEffect.property("Border").setValue(toneCurveGridParameters.border);

    // Add the Drop Shadow effect to the layer
    var toneCurveGridLayerShadow = toneCurveGridLayer.property("ADBE Effect Parade").addProperty("ADBE Drop Shadow");
    toneCurveGridLayerShadow.property("Opacity").setValue(toneCurveGridParameters.shadow.opacity);
    toneCurveGridLayerShadow.property("Direction").setValue(toneCurveGridParameters.shadow.direction);
    toneCurveGridLayerShadow.property("Distance").setValue(toneCurveGridParameters.shadow.distance);
    toneCurveGridLayerShadow.property("Softness").setValue(toneCurveGridParameters.shadow.softness);

    // Add frame
    var toneCurveFrameLayer = createToneCurveFrame(toneCurveGridComposition);

    // Include the precomposition created in the group composition
    var toneCurveGridCompositionLayer = targetComposition.layers.add(toneCurveGridComposition);

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createToneCurveGrid (targetComposition);
// TODO: Compute setSpacing based on ammount of slider settings
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createToneCurveFrame (targetComposition) {
    
    // Add layer
    var toneCurveFrameLayer = targetComposition.layers.addShape();
    toneCurveFrameLayer.name = "Tone Curve Grid Frame";

    // Add tone curve frame shape
    var toneCurveFrameShape = toneCurveFrameLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group"); // add a new rectangle shape
    toneCurveFrameShape.name = "Tone Curve Grid Frame Shape"; // set the shape name

    // Add tone curve frame path
    var toneCurveFramePath = toneCurveFrameShape.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect");
    toneCurveFramePath.property("ADBE Vector Rect Size").setValue([toneCurveFrameParameters.width, toneCurveFrameParameters.height]);

    // Stroke
    var toneCurveFrameStroke = toneCurveFrameShape.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
    toneCurveFrameStroke.property("ADBE Vector Stroke Color").setValue(toneCurveFrameParameters.stroke.color);
    toneCurveFrameStroke.property("ADBE Vector Stroke Width").setValue(toneCurveFrameParameters.stroke.width);
    toneCurveFrameStroke.property("ADBE Vector Stroke Line Cap").setValue(toneCurveFrameParameters.stroke.cap);

    // Add offset effects
    var toneCurveFrameOffset = toneCurveFrameShape.property("ADBE Vectors Group").addProperty("ADBE Vector Filter - Offset");
    toneCurveFrameOffset.property("ADBE Vector Offset Amount").setValue(toneCurveFrameParameters.offset.amount);

    // Add the Drop Shadow effect to the layer
    var toneCurveFrameLayerShadow = toneCurveFrameLayer.property("ADBE Effect Parade").addProperty("ADBE Drop Shadow");
    toneCurveFrameLayerShadow.property("Opacity").setValue(toneCurveFrameParameters.shadow.opacity);
    toneCurveFrameLayerShadow.property("Direction").setValue(toneCurveFrameParameters.shadow.direction);
    toneCurveFrameLayerShadow.property("Distance").setValue(toneCurveFrameParameters.shadow.distance);
    toneCurveFrameLayerShadow.property("Softness").setValue(toneCurveFrameParameters.shadow.softness);

    return toneCurveFrameLayer;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createSlidersGroupComposition (groups[groupKey], style);
// TODO: Compute setSpacing based on ammount of slider settings
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        var anchorPointInitialPosition = [setting.defaultValue[a][0] / 256 * toneCurveBackgroundParameters.width + toneCurveGraphCompositionParameters.padding.left, - setting.defaultValue[a][1] / 256 * toneCurveBackgroundParameters.height + toneCurveBackgroundParameters.height + toneCurveGraphCompositionParameters.padding.top];
        var anchorPointFinalPosition = [setting.settingValue[a][0] / 256 * toneCurveBackgroundParameters.width + toneCurveGraphCompositionParameters.padding.left, - setting.settingValue[a][1] / 256 * toneCurveBackgroundParameters.height + toneCurveBackgroundParameters.height + toneCurveGraphCompositionParameters.padding.top] ;

        var toneCurveAnchorPointPosition = toneCurveAnchorPointLayer.property("Position"); // add the X position property to the layer
        toneCurveAnchorPointPosition.setValue([anchorPointInitialPosition[0] + toneCurveGraphCompositionParameters.padding.left, anchorPointInitialPosition[1] + toneCurveGraphCompositionParameters.padding.top]); // set the position to [100,100]

        // Animate slider circle
        animateLayer (toneCurveAnchorPointLayer, "Position", setting.animation.setting.keyTimes, [anchorPointInitialPosition, anchorPointFinalPosition]);

    }

    return toneCurveAnchorPointLayer;
    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createToneCurveValuesComposition (setting);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createToneCurveValuesComposition (setting) {

    var compositionName = setting.displayName + " Values Composition";

    // Check if composition already exist. If not, create the composition.
    if (selectCompositionByName(compositionName)) {
        return selectCompositionByName(compositionName);
    }
    
    // Initialize reference position
    var toneCurveValueReferencePosition = [toneCurveValuesCompositionParameters.padding.left, toneCurveValuesCompositionParameters.padding.top];

    // Compute spacing
    var toneCurveValuesSpacing = (toneCurveValuesCompositionParameters.height - toneCurveValuesCompositionParameters.padding.top - toneCurveValuesCompositionParameters.padding.bottom) / (setting.settingValue.length - 1);

    // Create folder to store each slider
    // var toneCurveValuesCompositionsFolder = project.items.addFolder(groupName + " Pre-Compositions");

    // Create group composition
    var toneCurveValuesComposition = project.items.addComp(compositionName, toneCurveValuesCompositionParameters.width, toneCurveValuesCompositionParameters.height, toneCurveValuesCompositionParameters.pixelAspect, toneCurveValuesCompositionParameters.duration, toneCurveValuesCompositionParameters.frameRate);

    // Create layers for each value
    for (var a = setting.settingValue.length - 1; a >= 0; a --) {

        // Create Tone Curve Value Layer
        var toneCurveValueLayer = createToneCurveValueLayer (toneCurveValuesComposition, [setting.settingValue[a][0], setting.settingValue[a][1]], setting.animation.setting.keyTimes, toneCurveValueReferencePosition, toneCurveValuesCompositionParameters.text.anchorPosition, toneCurveValuesCompositionParameters.text.justification);

        // var toneCurveValueLayer = createToneCurveValueLayer (toneCurveValuesComposition, [setting.defaultValue, setting.settingValue], setting.animation.setting.keyTimes, toneCurveValueReferencePosition, toneCurveValuesCompositionParameters.text.anchorPosition, toneCurveValuesCompositionParameters.text.justification);

        // Increase Y reference position
        toneCurveValueReferencePosition[1] += toneCurveValuesSpacing;

    }

    return toneCurveValuesComposition;

}