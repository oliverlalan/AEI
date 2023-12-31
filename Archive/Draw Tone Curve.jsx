#target photoshop

function Setting(displayName, crsName, min, max) {
    this.displayName = displayName;
    this.crsName = crsName;
    this.min = min;
    this.max = max;
    this.settingValue = [];

    if(this.crsName.match("ToneCurvePV2012")) {

        for (i=0; i<xmpMeta.countArrayItems(ns,this.crsName); i++) {

            var inputValue  = xmpMeta.getArrayItem(ns, this.crsName, i + 1).value.split(", ")[0];
            var outputValue = xmpMeta.getArrayItem(ns, this.crsName, i + 1).value.split(", ")[1];

            this.settingValue.push([inputValue, outputValue]);

        }

    } else {
        
        this.settingValue = xmpMeta.getProperty(ns, this.crsName);

    }

}

var ns = "http://ns.adobe.com/camera-raw-settings/1.0/"; // Found in xmp header
ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
xmpMeta = new XMPMeta(app.activeDocument.xmpMetadata.rawData); 

// Tone Curve
var toneCurve                     =  new Setting ( "Tone Curve",           "ToneCurvePV2012",                     0,      +255    );
var toneCurveRed                  =  new Setting ( "Red Tone Curve",       "ToneCurvePV2012Red",                  0,      +255    );
var toneCurveGreen                =  new Setting ( "Green Tone Curve",     "ToneCurvePV2012Green",                0,      +255    );
var toneCurveBlue                 =  new Setting ( "Blue Tone Curve",      "ToneCurvePV2012Blue",                 0,      +255    );

addCurve(toneCurveGreen.settingValue, 300, 300, 135, 2, 255, 255, 255); // array of points | stroke width | rgb_red | rgb_green | rgb_blue

// drawGrid ( 540, 540, 225, 225, 4, 4, 2, 166, 166, 166, 65);  // x, y, width, height, columns, rows, strokeWidth, c_r, c_g, c_b, opacity

app.activeDocument.activeLayer.rasterize(RasterizeType.SHAPE);

function addCurve(p, xPosition, yPosition, edgeLength, strokeWidth, c_r, c_g, c_b) {

    drawGrid (xPosition, yPosition, edgeLength, edgeLength, 4, 4, 2, 166, 166, 166, 65);

    var pX = []         // x values
    var pY = []         // y values
    var pYs = []        // values for smooth y
    var pK =  []        // derivative values
    var smoothCurve = [];

    for (i = 0; i < p.length; i ++) {
        pX[i] = p[i][0];
        pY[i] = p[i][1];
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

    // Path definition
    var toneCurvePathArray = new Array();

    for (i = 0; i < smoothCurve.length * 2 - 2; i++) {

        if (i < smoothCurve.length - 1) {
            var smoothCuveStartIndex = i;
            var smoothCurveEndIndex = smoothCuveStartIndex + 1; 
        } else {
            var smoothCuveStartIndex = 2 * (smoothCurve.length-1) - i;
            var smoothCurveEndIndex = smoothCuveStartIndex -1;
        }

        var lineArray = new Array()
        lineArray[0] = new PathPointInfo
        lineArray[0].anchor = Array(xPosition + smoothCurve[smoothCuveStartIndex][0], yPosition + edgeLength - smoothCurve[smoothCuveStartIndex][1])
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
 
    //create the path item
    var myPathItem = activeDocument.pathItems.add("Line", toneCurvePathArray)

    var currentPathItem = app.activeDocument.pathItems.getByName("Line");

    convertPathtoShape();

    setStroke (strokeWidth, c_r, c_g, c_b);

    app.activeDocument.activeLayer.vectorMaskFeather = strokeWidth * 0.15;
    
    myPathItem.remove();

    app.activeDocument.activeLayer.merge();

    app.activeDocument.selection.select([[xPosition, yPosition],[xPosition, yPosition + edgeLength], [xPosition + edgeLength, yPosition + edgeLength], [xPosition + edgeLength, yPosition]]);
    app.activeDocument.selection.invert();
    app.activeDocument.selection.clear();
    app.activeDocument.selection.deselect();

    app.activeDocument.activeLayer.name = "Tone Curve";

    // Point Circles
    for (i = 0; i < p.length; i ++) {

        if(!((p[i][0] == 0 && p[i][1] == 0) || (p[i][0] == 255 && p[i][1] == 255))) {

            // selectedSetting, x, y, radius
            drawCircle(toneCurve, xPosition + p[i][0] / 256 * edgeLength, yPosition + edgeLength - p[i][1] / 256 * edgeLength, 3);
        
        }

    }

    // Point labels
    var yIncrementsAmount = 0;

    for (i = 0; i < p.length; i ++) {

        if(!((p[i][0] == 0 && p[i][1] == 0) || (p[i][0] == 255 && p[i][1] == 255))) {

            yIncrementsAmount += 1;
        
        }

    }

    var inputXPosition = xPosition + edgeLength * 4 / 3;
    var outputXPosition = xPosition + edgeLength * 5 / 3;
    var inputYPosition = yPosition + edgeLength * (0.6 - 0.1 * yIncrementsAmount);
    var yIncrement = edgeLength * 0.2 ;
    var outputYPosition = inputYPosition;

    for (i = 0; i < p.length; i ++) {

        if(!((p[i][0] == 0 && p[i][1] == 0) || (p[i][0] == 255 && p[i][1] == 255))) {

            // text, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization
            addText(p[i][0], inputXPosition, inputYPosition , "middleright", 16, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.LEFT, TextCase.ALLCAPS);
            addText(p[i][1], outputXPosition, outputYPosition , "middleright", 16, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.LEFT, TextCase.ALLCAPS);

            inputYPosition += yIncrement;
            outputYPosition += yIncrement;
        
        }

    }

}

function convertPathtoShape() {
	var d = new ActionDescriptor();
	var d2 = new ActionDescriptor();
	var d3 = new ActionDescriptor();
	var d4 = new ActionDescriptor();
	var r = new ActionReference();
	r.putClass( stringIDToTypeID( "contentLayer" ));
	d.putReference( charIDToTypeID( "null" ), r );
	d4.putDouble( charIDToTypeID( "Rd  " ), 255);
	d4.putDouble( charIDToTypeID( "Grn " ), 255);
	d4.putDouble( charIDToTypeID( "Bl  " ), 255);
	d3.putObject( charIDToTypeID( "Clr " ), charIDToTypeID( "RGBC" ), d4 );
	d2.putObject( charIDToTypeID( "Type" ), stringIDToTypeID( "solidColorLayer" ), d3 );
	d.putObject( charIDToTypeID( "Usng" ), stringIDToTypeID( "contentLayer" ), d2 );
	executeAction( charIDToTypeID( "Mk  " ), d, DialogModes.NO );
}

function setStroke(strokeWidth, c_r, c_g, c_b){
    var idsetd = charIDToTypeID( "setd" );
        var desc3 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref1 = new ActionReference();
            var idcontentLayer = stringIDToTypeID( "contentLayer" );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idTrgt = charIDToTypeID( "Trgt" );
            ref1.putEnumerated( idcontentLayer, idOrdn, idTrgt );
        desc3.putReference( idnull, ref1 );
        var idT = charIDToTypeID( "T   " );
            var desc4 = new ActionDescriptor();
            var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
                var desc5 = new ActionDescriptor();
                var idstrokeStyleContent = stringIDToTypeID( "strokeStyleContent" );
                    var desc6 = new ActionDescriptor();
                    var idClr = charIDToTypeID( "Clr " );
                        var desc7 = new ActionDescriptor();
                        var idCyn = charIDToTypeID( "Rd  " );
                        desc7.putDouble( idCyn, c_r );
                        var idMgnt = charIDToTypeID( "Grn " );
                        desc7.putDouble( idMgnt, c_g );
                        var idYlw = charIDToTypeID( "Bl  " );
                        desc7.putDouble( idYlw, c_b );
                    var idRGBC = charIDToTypeID( "RGBC" );
                    desc6.putObject( idClr, idRGBC, desc7 );
                var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
                desc5.putObject( idstrokeStyleContent, idsolidColorLayer, desc6 );
                var idstrokeStyleVersion = stringIDToTypeID( "strokeStyleVersion" );
                desc5.putInteger( idstrokeStyleVersion, 2 );
                var idstrokeEnabled = stringIDToTypeID( "strokeEnabled" );
                desc5.putBoolean( idstrokeEnabled, true );
                var idstrokeStyleLineWidth = stringIDToTypeID( "strokeStyleLineWidth" );
                var idPxl = charIDToTypeID( "#Pxl" );
                desc5.putUnitDouble( idstrokeStyleLineWidth, idPxl, strokeWidth );
                var idfillEnabled = stringIDToTypeID( "fillEnabled" );
                desc5.putBoolean( idfillEnabled, false );
            var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
            desc4.putObject( idstrokeStyle, idstrokeStyle, desc5 );
        var idshapeStyle = stringIDToTypeID( "shapeStyle" );
        desc3.putObject( idT, idshapeStyle, desc4 );
    executeAction( idsetd, desc3, DialogModes.NO );

    var idsetd = charIDToTypeID( "setd" );
        var desc9 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref2 = new ActionReference();
            var idcontentLayer = stringIDToTypeID( "contentLayer" );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idTrgt = charIDToTypeID( "Trgt" );
            ref2.putEnumerated( idcontentLayer, idOrdn, idTrgt );
        desc9.putReference( idnull, ref2 );
        var idT = charIDToTypeID( "T   " );
            var desc10 = new ActionDescriptor();
            var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
                var desc11 = new ActionDescriptor();
                var idstrokeStyleLineWidth = stringIDToTypeID( "strokeStyleLineWidth" );
                var idPxl = charIDToTypeID( "#Pxl" );
                desc11.putUnitDouble( idstrokeStyleLineWidth, idPxl, 2.000000 );
                var idstrokeStyleVersion = stringIDToTypeID( "strokeStyleVersion" );
                desc11.putInteger( idstrokeStyleVersion, 2 );
                var idstrokeEnabled = stringIDToTypeID( "strokeEnabled" );
                desc11.putBoolean( idstrokeEnabled, true );
            var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
            desc10.putObject( idstrokeStyle, idstrokeStyle, desc11 );
        var idshapeStyle = stringIDToTypeID( "shapeStyle" );
        desc9.putObject( idT, idshapeStyle, desc10 );
    executeAction( idsetd, desc9, DialogModes.NO );
}

// https://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas
function getCurvePoints(pts, tension, isClosed, numOfSegments) {

    // use input value if provided, or use a default value   
    tension = (typeof tension != 'undefined') ? tension : 0.5;
    isClosed = isClosed ? isClosed : false;
    numOfSegments = numOfSegments ? numOfSegments : 16;

    var _pts = [], res = [],    // clone array
        x, y,           // our x,y coords
        t1x, t2x, t1y, t2y, // tension vectors
        c1, c2, c3, c4,     // cardinal points
        st, t, i;       // steps based on num. of segments

    // clone array so we don't change the original
    //
    _pts = pts.slice(0);

    // The algorithm require a previous and next point to the actual point array.
    // Check if we will draw closed or open curve.
    // If closed, copy end points to beginning and first points to end
    // If open, duplicate first points to befinning, end points to end
    if (isClosed) {
        _pts.unshift(pts[pts.length - 1]);
        _pts.unshift(pts[pts.length - 2]);
        _pts.unshift(pts[pts.length - 1]);
        _pts.unshift(pts[pts.length - 2]);
        _pts.push(pts[0]);
        _pts.push(pts[1]);
    }
    else {
        _pts.unshift(pts[1]);   //copy 1. point and insert at beginning
        _pts.unshift(pts[0]);
        _pts.push(pts[pts.length - 2]); //copy last point and append
        _pts.push(pts[pts.length - 1]);
    }

    // ok, lets start..

    // 1. loop goes through point array
    // 2. loop goes through each segment between the 2 pts + 1e point before and after
    for (i=2; i < (_pts.length - 4); i+=2) {
        for (t=0; t <= numOfSegments; t++) {

            // calc tension vectors
            t1x = (_pts[i+2] - _pts[i-2]) * tension;
            t2x = (_pts[i+4] - _pts[i]) * tension;

            t1y = (_pts[i+3] - _pts[i-1]) * tension;
            t2y = (_pts[i+5] - _pts[i+1]) * tension;

            // calc step
            st = t / numOfSegments;

            // calc cardinals
            c1 =   2 * Math.pow(st, 3)  - 3 * Math.pow(st, 2) + 1; 
            c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2); 
            c3 =       Math.pow(st, 3)  - 2 * Math.pow(st, 2) + st; 
            c4 =       Math.pow(st, 3)  -     Math.pow(st, 2);

            // calc x and y cords with common control vectors
            x = c1 * _pts[i]    + c2 * _pts[i+2] + c3 * t1x + c4 * t2x;
            y = c1 * _pts[i+1]  + c2 * _pts[i+3] + c3 * t1y + c4 * t2y;

            //store points in array
            res.push(x);
            res.push(y);

        }
    }

    return res;
}


// https://math.stackexchange.com/questions/2675064/what-type-of-curve-does-photoshops-curves-use
// https://github.com/kuckir/CSPL.js/blob/master/CSPL.js
// https://blog.ivank.net/interpolation-with-cubic-splines.html

// gaussJ = {};
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
}
function zerosMat (r,c) {var A = []; for(var i=0; i<r; i++) {A.push([]); for(var j=0; j<c; j++) A[i].push(0);} return A;}
function printMat (A){ for(var i=0; i<A.length; i++) console.log(A[i]); }
function swapRows (m, k, l) {var p = m[k]; m[k] = m[l]; m[l] = p;}
    
    
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

function drawGrid (x, y, width, height, columns, rows, strokeWidth, c_r, c_g, c_b, opacity) {

    var pX1 = x + strokeWidth / 2;
    var pY1 = y;
    var pX2 = x + strokeWidth / 2;
    var pY2 = y + height;

    var xIncrement = (width - strokeWidth) / (columns - 1);
    var yIncrement = (height - strokeWidth) / (rows - 1);

    for ( i = 0; i < columns; i ++) {

        drawLine(pX1, pY1, pX2, pY2, strokeWidth, c_r, c_g, c_b, opacity);

        pX1 += xIncrement;
        pX2 += xIncrement;

        if( i != 0 ) {  app.activeDocument.activeLayer.merge();}

    }

    pX1 = x;
    pY1 = y + strokeWidth / 2;
    pX2 = x + width;
    pY2 = y + strokeWidth / 2;

    for ( i = 0; i < rows; i ++) {

        drawLine(pX1, pY1, pX2, pY2, strokeWidth, c_r, c_g, c_b, opacity);

        pY1 += yIncrement;
        pY2 += yIncrement;

        app.activeDocument.activeLayer.merge();

    }

}

function drawLine(x1, y1, x2, y2, strokeWidth, c_r, c_g, c_b, opacity) {
    
    var lineSubPathArray = new Array();

    //line 1--it’s a straight line so the coordinates for anchor, left, and right
    //for each point have the same coordinates
    var lineArray = new Array()
    lineArray[0] = new PathPointInfo
    lineArray[0].kind = PointKind.CORNERPOINT
    lineArray[0].anchor = Array(x1, y1)
    lineArray[0].leftDirection = lineArray[0].anchor
    lineArray[0].rightDirection = lineArray[0].anchor

    lineArray[1] = new PathPointInfo
    lineArray[1].kind = PointKind.CORNERPOINT
    lineArray[1].anchor = Array(x2, y2)
    lineArray[1].leftDirection = lineArray[1].anchor
    lineArray[1].rightDirection = lineArray[1].anchor

    lineSubPathArray[0] = new SubPathInfo()
    lineSubPathArray[0].operation = ShapeOperation.SHAPEXOR
    lineSubPathArray[0].closed = false
    lineSubPathArray[0].entireSubPath = lineArray


    //create the path item
    var myPathItem = activeDocument.pathItems.add("Line", lineSubPathArray)

    var currentPathItem = app.activeDocument.pathItems.getByName("Line");

    convertPathtoShape();

    setStroke (strokeWidth, c_r, c_g, c_b);
    
    myPathItem.remove();

    app.activeDocument.activeLayer.opacity = opacity;

    app.activeDocument.activeLayer.rasterize(RasterizeType.SHAPE);

    return app.activeDocument.activeLayer;

}

function addText (text, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization) {

    if(text!= "") {

        var textLayer = app.activeDocument.artLayers.add();

        textLayer.kind = LayerKind.TEXT;
        textLayer.textItem.contents = text;
        textLayer.textItem.size = new UnitValue(fontSize, 'px');
        fontColor = new SolidColor();
        fontColor.rgb.hexValue = fontHexColor;
        textLayer.textItem.color = fontColor;
        textLayer.textItem.font = fontName;
        textLayer.textItem.tracking = fontTracking;
        textLayer.textItem.justification = fontJustification;
        textLayer.textItem.capitalization = fontCapitalization;

        translateLayerTo(textLayer, xPosition, yPosition, anchorPosition);

        return app.activeDocument.activeLayer;

    }

}

function translateLayerTo(selectedLayer,xPosition,yPosition, anchorPosition) {

    var xPosition = new UnitValue (xPosition, 'px');
    var yPosition = new UnitValue (yPosition, 'px');

    var bounds = selectedLayer.bounds;
    var width = bounds[2] - bounds[0];
    var height = bounds[3] - bounds[1];

    switch (anchorPosition) {
        case "topleft":
        dX = xPosition - bounds[0];
        dY = yPosition - bounds[1];
        break;
        
        case "topcenter":
        dX = xPosition - bounds[0] - width /2;
        dY = yPosition - bounds[1];
        break;

        case "topright":
        dX = xPosition - bounds[0] - width;
        dY = yPosition - bounds[1];
        break;

        case "middleleft":
        dX = xPosition - bounds[0];
        dY = yPosition - bounds[1] - height / 2;
        break;

        case "middlecenter":
        dX = xPosition - bounds[0] - width / 2;
        dY = yPosition - bounds[1] - height / 2;
        break;

        case "middleright":
        dX = xPosition - bounds[0] - width;
        dY = yPosition - bounds[1] - height / 2;
        break;

        case "bottomleft":
        dX = xPosition - bounds[0];
        dY = yPosition - bounds[1] - height;
        break;
        
        case "bottomcenter":
        dX = xPosition - bounds[0] - width / 2;
        dY = yPosition - bounds[1] - height;
        break;

        case "bottomright":
        dX = xPosition - bounds[0] - width;
        dY = yPosition - bounds[1] - height;
        break;

        default:
        dX = xPosition - bounds[0] - width / 2;
        dY = yPosition - bounds[1] - height / 2;

    }
    
    selectedLayer.translate(dX,dY);
}

function drawCircle(selectedSetting, x, y, radius){

    // create path
    var d = new ActionDescriptor();
    var r = new ActionReference();
    r.putProperty(stringIDToTypeID("path"), stringIDToTypeID("workPath"));
    d.putReference(stringIDToTypeID("null"), r);
    var d1 = new ActionDescriptor();
    d1.putUnitDouble(stringIDToTypeID("top"), stringIDToTypeID("pixelsUnit"),    y - radius);
    d1.putUnitDouble(stringIDToTypeID("left"), stringIDToTypeID("pixelsUnit"),   x - radius);
    d1.putUnitDouble(stringIDToTypeID("bottom"), stringIDToTypeID("pixelsUnit"), y + radius);
    d1.putUnitDouble(stringIDToTypeID("right"), stringIDToTypeID("pixelsUnit"),  x + radius);
    d.putObject(stringIDToTypeID("to"), stringIDToTypeID("ellipse"), d1);
    executeAction(stringIDToTypeID("set"), d, DialogModes.NO);


    // create fill layer
    var d = new ActionDescriptor();
    var r = new ActionReference();
    r.putClass(stringIDToTypeID("contentLayer"));
    d.putReference(stringIDToTypeID("null"), r);
    var d1 = new ActionDescriptor();
    var d2 = new ActionDescriptor();
    var d3 = new ActionDescriptor();
    d3.putDouble(stringIDToTypeID("red"),   255);
    d3.putDouble(stringIDToTypeID("green"), 255);
    d3.putDouble(stringIDToTypeID("blue"),  255);
    d2.putObject(stringIDToTypeID("color"), stringIDToTypeID("RGBColor"), d3);
    d1.putObject(stringIDToTypeID("type"), stringIDToTypeID("solidColorLayer"), d2);
    d.putObject(stringIDToTypeID("using"), stringIDToTypeID("contentLayer"), d1);
    executeAction(stringIDToTypeID("make"), d, DialogModes.NO);

    app.activeDocument.activeLayer.name = selectedSetting.displayName + " Circle";

    return app.activeDocument.activeLayer;

}