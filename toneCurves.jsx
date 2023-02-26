////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addToneCurvesPanel ( panelXPosition, panelYPosition, includeAnchorPointsLabels, toneCurveStyle) {

    // Group definition
    var toneCurvesPanelGroup = activeDocument.layerSets.add();
    toneCurvesPanelGroup.name = "Tone Curves Panel";

    // Document parameters
    var docWidth = app.activeDocument.width.as('px');
    var docHeight = app.activeDocument.height.as('px');

    // Initial position
    if(panelXPosition == undefined && panelYPosition == undefined) {
        var panelXPosition = docWidth * 2 / 24;
        var panelYPosition = docHeight / 2 - 585;
    }

    var groupXPosition = panelXPosition;
    var groupYPosition = panelYPosition;

    // Parameters definition
    var allCurves = [toneCurve, toneCurveRed, toneCurveGreen, toneCurveBlue];
    var edgeLength = docWidth * 5 / 24;
    var yIncrement = edgeLength * 4 / 3;

    // Style
    if(includeAnchorPointsLabels == undefined) includeAnchorPointsLabels = false;
    if(toneCurveStyle == undefined) toneCurveStyle = "colorful"

    // Add tone curves
    for (var curve = 0; curve < allCurves.length; curve ++) {

        var toneCurveGroup = addToneCurveGroup(allCurves[curve], groupXPosition, groupYPosition, edgeLength, includeAnchorPointsLabels, toneCurveStyle);
        moveLayerInsideLayerset(toneCurveGroup, toneCurvesPanelGroup);
        groupYPosition += yIncrement;

    }

    return toneCurvesPanelGroup;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addToneCurveGroup(selectedSetting, xPosition, yPosition, edgeLength, includeAnchorPointsLabels, toneCurveStyle) { // Change strokeColor by "style". Two styles: BW and colorful

    // Group definition
    var toneCurveGroup = activeDocument.layerSets.add();
    toneCurveGroup.name = selectedSetting.displayName + ' Group';

    // Parameters
    var toneCurveStrokeColor = "FFFFFF";
    var frameStrokeColor = "FFFFFF";
    var gridStrokeColor = "8C8C8C";
    var strokeWidth = Math.floor(edgeLength * 4 / 225);
    var anchorPointCircleRadius = Math.floor(strokeWidth * 1.25);


    // Add gradient background
    if(toneCurveStyle == "colorful") {

        // Add gradient background
        switch(selectedSetting.displayName.split(" ")[0]) {

            case "Lum": 
                var gradientStops = [{ color: "333333", opacity: 100 , midPoint: 50}, { color: "8b8b8b", opacity: 100 , midPoint: 50}];
            break;

            case "Red": 
                var gradientStops = [{ color: "c33f2e", opacity: 100 , midPoint: 50}, { color: "737373", opacity: 100 , midPoint: 50}, { color: "21c6b3", opacity: 100 , midPoint: 50}];
            break;

            case "Green": 
                var gradientStops = [{ color: "55ab55", opacity: 100 , midPoint: 50}, { color: "737373", opacity: 100 , midPoint: 50}, { color: "b0469d", opacity: 100 , midPoint: 50}];
            break;

            case "Blue": 
                var gradientStops = [{ color: "306cbf", opacity: 100 , midPoint: 50}, { color: "737373", opacity: 100 , midPoint: 50}, { color: "b2b147", opacity: 100 , midPoint: 50}];
            break;

        }

        var toneCurveBackgroundGradient = drawSquare(xPosition, yPosition, edgeLength, edgeLength); 
        fillShapeWithGradient("linear", gradientStops, -45, [0,0]);
        toneCurveBackgroundGradient.fillOpacity = 55;
        toneCurveBackgroundGradient.name = selectedSetting.displayName + 'Background Gradient';
        moveLayerInsideLayerset(toneCurveBackgroundGradient, toneCurveGroup);

    } else if ( toneCurveStyle == "Simple") { //TODO: Review Pending

        switch (slectedSetting.displayName) {

            case "Lum Tone Curve":
            var toneCurveStrokeColor = "FFFFFF";
            break;

            case "Red Tone Curve":
            var toneCurveStrokeColor = "c9430a";
            break;

            case "Green Tone Curve":
            var toneCurveStrokeColor = "19804c";
            break;

            case "Blue Tone Curve":
            var toneCurveStrokeColor = "0097c2";
            break;

            default:
            var toneCurveStrokeColor = "CCCCCC";

        }

        var toneCurve = addToneCurve(allCurves[c], xPosition, yPosition, edgeLength, toneCurveStrokeColor, includeAnchorPointsLabels); //TODO Define addToneCurve as an independent function
        moveLayerInsideLayerset(toneCurve, toneCurveGroup);

        yPosition += yIncrement;
        
    }

    // Add solid background
    var toneCurveBackground = drawSquare(xPosition, yPosition, edgeLength, edgeLength); 
    setShapeSettings(true, "000000", false, strokeColor, strokeWidth); //fillEnabled, fillColor, strokeEnabled, strokeColor, strokeWidth, opacity
    toneCurveBackground.opacity = 25;
    toneCurveBackground.name = selectedSetting.displayName + ' Background Overlay';
    moveLayerInsideLayerset(toneCurveBackground, toneCurveGroup);

    // Add histogram
    switch(selectedSetting.displayName.split(" ")[0]) {
        case "Lum": 
            var histogramFillColor = histrogramStrokeColor = "FFFFFF";
        break;
        case "Red": 
            var histogramFillColor = histrogramStrokeColor = "c9430a";
        break;
        case "Green": 
            var histogramFillColor = histrogramStrokeColor = "00b200";
        break;
        case "Blue": 
            var histogramFillColor = histrogramStrokeColor = "0097c2";
        break;

    }

    var toneCurveBackgroundHistogram = addHistogram(selectedSetting.displayName.split(" ")[0],     xPosition,      yPosition,      edgeLength,     edgeLength);
    setShapeSettings(true,   histogramFillColor,   true,  histrogramStrokeColor, strokeWidth / 2);
    addColorOverlay("000000", 15, "hardMix");
    // addGradientOverlay("linear", [0,0], 100, 90, [{color:"000000", opacity:100, midPoint:50}, {color:"000000", opacity:0, midPoint:50}], "perceptual", "overlay", 25);
    toneCurveBackgroundHistogram.fillOpacity = 25;
    toneCurveBackgroundHistogram.name = selectedSetting.displayName + ' Background Histogram';
    moveLayerInsideLayerset(toneCurveBackgroundHistogram, toneCurveGroup);
    
    // Draw Tone Curve background grid
    var toneCurveBackgroundGrid = drawGrid (xPosition, yPosition, edgeLength, edgeLength, 3, 3, strokeWidth / 2, gridStrokeColor); // x, y, width, height, columns, rows, strokeWidth, c_r, c_g, c_b, opacity
    toneCurveBackgroundGrid.name = selectedSetting.displayName + ' Grid';
    moveLayerInsideLayerset(toneCurveBackgroundGrid, toneCurveGroup);

    // Add Frame
    var toneCurveBackgroundFrame = drawSquare(xPosition, yPosition, edgeLength, edgeLength);
    setShapeSettings(false, "FFFFFF", true, frameStrokeColor, strokeWidth / 2);
    toneCurveBackgroundFrame.name = selectedSetting.displayName + ' Background Frame';
    moveLayerInsideLayerset(toneCurveBackgroundFrame, toneCurveGroup);

    var pX = []         // x values
    var pY = []         // y values
    var pYs = []        // values for smooth y
    var pK =  []        // derivative values
    var smoothCurve = [];

    var curveAnchorPoints = selectedSetting.settingValue;

    for (i = 0; i < curveAnchorPoints.length; i ++) {
        pX[i] = curveAnchorPoints[i][0];
        pY[i] = curveAnchorPoints[i][1];
        pK[i] = 1;
    }

    getNaturalKs(pX, pY, pK);

    for (i = 0; i < 256; i ++) {

        var smoothPoint = evalSpline (i, pX, pY, pK);

        if (smoothPoint < 0 )  {
            smoothPoint = 0;
        } else if (smoothPoint > 254) {
            smoothPoint = 254;
        }

        smoothCurve.push([i / 256 * edgeLength, smoothPoint / 256 * edgeLength]);

    }

    // Path points calculation
    var toneCurvePathArray = new Array();

    for (i = 0; i < smoothCurve.length * 2 - 2; i++) {

        if (i < smoothCurve.length - 1) {
            var smoothCurveStartIndex = i;
            var smoothCurveEndIndex = smoothCurveStartIndex + 1; 
        } else {
            var smoothCurveStartIndex = 2 * (smoothCurve.length-1) - i;
            var smoothCurveEndIndex = smoothCurveStartIndex -1;
        }

        var lineArray = new Array()
        lineArray[0] = new PathPointInfo
        lineArray[0].anchor = Array(xPosition + smoothCurve[smoothCurveStartIndex][0], yPosition + edgeLength - smoothCurve[smoothCurveStartIndex][1])
        lineArray[0].kind = PointKind.SMOOTHPOINT
        lineArray[0].leftDirection = lineArray[0].anchor
        lineArray[0].rightDirection = lineArray[0].anchor
        lineArray[1] = new PathPointInfo
        lineArray[1].anchor = Array(xPosition + smoothCurve[smoothCurveEndIndex][0] , yPosition + edgeLength - smoothCurve[smoothCurveEndIndex][1])
        lineArray[1].kind = PointKind.SMOOTHPOINT
        lineArray[1].leftDirection = lineArray[1].anchor
        lineArray[1].rightDirection = lineArray[1].anchor

        toneCurvePathArray[i] = new SubPathInfo()
        toneCurvePathArray[i].operation = ShapeOperation.SHAPEXOR
        toneCurvePathArray[i].closed = false
        toneCurvePathArray[i].entireSubPath = lineArray

    }
 
    // Create the path item
    var myPathItem = activeDocument.pathItems.add(selectedSetting.displayName, toneCurvePathArray)
    var currentPathItem = app.activeDocument.pathItems.getByName(selectedSetting.displayName);
    convertPathtoShape();
    myPathItem.remove();
    setShapeSettings(false, "FFFFFF", true, toneCurveStrokeColor, strokeWidth)

    app.activeDocument.activeLayer.name = selectedSetting.displayName;
    app.activeDocument.activeLayer.move(toneCurveGroup, ElementPlacement.INSIDE);

    // Delete all pixels out of the grid frame.
    // app.activeDocument.selection.select([[xPosition, yPosition],[xPosition, yPosition + edgeLength], [xPosition + edgeLength, yPosition + edgeLength], [xPosition + edgeLength, yPosition]]);
    // app.activeDocument.selection.invert();
    // app.activeDocument.selection.clear();
    // app.activeDocument.selection.deselect();

    // Add anchor points
    var curveAnchorPointsGroup = activeDocument.layerSets.getByName(selectedSetting.displayName + ' Group').layerSets.add();
    curveAnchorPointsGroup.name = 'Anchor Points';

    for (i = 0; i < curveAnchorPoints.length; i ++) {

        // xPosition, yPosition, anchorPointCircleRadius
        var anchorPoint = drawCircle(xPosition + curveAnchorPoints[i][0] / 256 * edgeLength, yPosition + edgeLength - curveAnchorPoints[i][1] / 256 * edgeLength, anchorPointCircleRadius);
        setShapeSettings(true, "8C8C8C", true, strokeColor, strokeWidth / 2);
        anchorPoint.name = '[' + curveAnchorPoints[i][0] + ' ,' + curveAnchorPoints[i][1] + ']';
        anchorPoint.move(curveAnchorPointsGroup, ElementPlacement.INSIDE);

    }

    // Add anchor points labels

    if (includeAnchorPointsLabels){

        // Compute text spacing based on number of anchor points, avoiding first and last anchor points, [0,0] and [255,255]
        var yIncrementsAmount = 0;

        for (i = 0; i < curveAnchorPoints.length; i ++) {

            if(!((curveAnchorPoints[i][0] == 0 && curveAnchorPoints[i][1] == 0) || (curveAnchorPoints[i][0] == 255 && curveAnchorPoints[i][1] == 255))) {

                yIncrementsAmount += 1;
            
            }

        }

        // Initialize text positions
        var inputXPosition = xPosition + edgeLength * 4 / 3;
        var outputXPosition = inputXPosition + edgeLength / 20;
        var inputYPosition = yPosition + edgeLength * (0.6 - 0.1 * yIncrementsAmount);
        var yIncrement = edgeLength * 0.2 ;
        var outputYPosition = inputYPosition;

        // Add text labels
        var curveAnchorPointsLabelsGroup = activeDocument.layerSets.getByName(selectedSetting.displayName + ' Group').layerSets.add();
        curveAnchorPointsLabelsGroup.name = 'Anchor Points Labels';

        for (i = 0; i < curveAnchorPoints.length; i ++) {

            if(!((curveAnchorPoints[i][0] == 0 && curveAnchorPoints[i][1] == 0) || (curveAnchorPoints[i][0] == 255 && curveAnchorPoints[i][1] == 255))) {

                var curveAnchorPointLabelGroup = activeDocument.layerSets.getByName(selectedSetting.displayName + ' Group').layerSets.getByName('Anchor Points Labels').layerSets.add();
                curveAnchorPointLabelGroup.name = '[' + curveAnchorPoints[i][0] + ' ,' + curveAnchorPoints[i][1] + ']';

                // text, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization
                var anchorPointInputLabel = addText(curveAnchorPoints[i][0], inputXPosition, inputYPosition , "middleright", fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization);
                anchorPointInputLabel.name = "Input: " + anchorPointInputLabel.name;
                anchorPointInputLabel.move(curveAnchorPointLabelGroup, ElementPlacement.INSIDE);

                var anchorPointOutputLabel = addText(curveAnchorPoints[i][1], outputXPosition, outputYPosition , "middleleft", fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization);
                anchorPointOutputLabel.name = "Output: " + anchorPointOutputLabel.name;
                anchorPointOutputLabel.move(curveAnchorPointLabelGroup, ElementPlacement.INSIDE);

                inputYPosition += yIncrement;
                outputYPosition += yIncrement;
            
            }

        }

    }

    return toneCurveGroup;

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
        
    function evalSpline (x, xs, ys, ks)
    {
        var i = 1;
        while(xs[i]<x) i++;
        
        var t = (x - xs[i-1]) / (xs[i] - xs[i-1]);
        
        var a =  ks[i-1]*(xs[i]-xs[i-1]) - (ys[i]-ys[i-1]);
        var b = -ks[i  ]*(xs[i]-xs[i-1]) + (ys[i]-ys[i-1]);
        
        var q = (1-t)*ys[i-1] + t*ys[i] + t*(1-t)*(a*(1-t)+b*t);
        return q;
    }

}