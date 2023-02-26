////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Draw Shapes
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawStandardShape (standardShapenName) {

    // Document parameters
    var docWidth = app.activeDocument.width.as('px');
    var docHeight = app.activeDocument.height.as('px');

    var shapePoints = [];

    switch (standardShapenName) {

        case 'full':
        shapePoints.push([0,0], [docWidth,0], [docWidth, docHeight], [0, docHeight]);
        break;

        case 'horizontal-1':
        shapePoints.push([0,0], [docWidth,0], [docWidth, docHeight/2], [0, docHeight/2]);
        break;

        case 'horizontal-2':
        shapePoints.push([0,docHeight/2], [docWidth,docHeight/2], [docWidth, docHeight], [0, docHeight]);
        break;

        case 'horizontal2-1':
        shapePoints.push([0,0], [docWidth,0], [docWidth, docHeight/3], [0, docHeight/3]);
        break;

        case 'horizontal2-2':
        shapePoints.push([0,docHeight/3], [docWidth,docHeight/3], [docWidth, docHeight*2/3], [0, docHeight*2/3]);
        break;

        case 'horizontal2-3':
        shapePoints.push([0,docHeight*2/3], [docWidth,docHeight*2/3], [docWidth, docHeight], [0, docHeight]);
        break;

        case 'vertical-1':
        shapePoints.push([0,0], [docWidth/2,0], [docWidth/2, docHeight], [0, docHeight]);
        break;

        case 'vertical-2':
        shapePoints.push([docWidth/2,0], [docWidth,0], [docWidth, docHeight], [docWidth/2, docHeight]);
        break;

        case 'diagonal-1':
        shapePoints.push([0,0], [docWidth,0], [0, docHeight]);
        break;

        case 'diagonal-2':
        shapePoints.push([docWidth,0], [docWidth,docHeight], [0, docHeight]);
        break;

        case 'vertical-3/8':
        shapePoints.push([0, 0], [docWidth * 3 / 8, 0], [docWidth * 3 / 8, docHeight], [0, docHeight]);
        break;

        case 'bookmark':
        shapePoints.push([0, 0], [36, 0], [36, 41], [18, 23], [0, 41]);
        break;

    }

    drawShape(shapePoints);

    return app.activeDocument.activeLayer;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawLine( x1, y1, x2, y2) {  // x1, y1, x2, y2

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

    var lineSubPathArray = new SubPathInfo()
    lineSubPathArray.operation = ShapeOperation.SHAPEXOR
    lineSubPathArray.closed = false
    lineSubPathArray.entireSubPath = lineArray

    //create the path item
    var myPathItem = activeDocument.pathItems.add("Line", [lineSubPathArray])
    var currentPathItem = app.activeDocument.pathItems.getByName("Line");
    convertPathtoShape();
    myPathItem.remove();

    return app.activeDocument.activeLayer;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawCircle(xPosition, yPosition, circleRadius) {

    try {

        var d = new ActionDescriptor();
        var r = new ActionReference();
        r.putClass(stringIDToTypeID("contentLayer"));
        d.putReference(charIDToTypeID('null'), r);
        var d1 = new ActionDescriptor();
        var d2 = new ActionDescriptor();
        var d3 = new ActionDescriptor();
        d3.putDouble(charIDToTypeID('Rd  '), 255);
        d3.putDouble(charIDToTypeID('Grn '), 255);
        d3.putDouble(charIDToTypeID('Bl  '), 255);
        d2.putObject(charIDToTypeID('Clr '), stringIDToTypeID("RGBColor"), d3);
        d1.putObject(charIDToTypeID('Type'), stringIDToTypeID("solidColorLayer"), d2);
        var d4 = new ActionDescriptor();
        d4.putUnitDouble(charIDToTypeID('Top '), charIDToTypeID('#Pxl'), yPosition - circleRadius);
        d4.putUnitDouble(charIDToTypeID('Left'), charIDToTypeID('#Pxl'), xPosition - circleRadius);
        d4.putUnitDouble(charIDToTypeID('Btom'), charIDToTypeID('#Pxl'), yPosition + circleRadius);
        d4.putUnitDouble(charIDToTypeID('Rght'), charIDToTypeID('#Pxl'), xPosition + circleRadius);
        d1.putObject(charIDToTypeID('Shp '), charIDToTypeID('Elps'), d4);
        d.putObject(charIDToTypeID('Usng'), stringIDToTypeID("contentLayer"), d1);
        executeAction(charIDToTypeID('Mk  '), d, DialogModes.NO);

    }   catch (e) { throw(e); }

    return app.activeDocument.activeLayer;
    
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawShape() {
    
    var lineArray = [];
    for (i = 0; i < arguments[0].length; i++) {
        lineArray[i] = new PathPointInfo;
        lineArray[i].kind = PointKind.SMOOTHPOINT;
        lineArray[i].anchor = arguments[0][i];
        lineArray[i].leftDirection = lineArray[i].anchor;
        lineArray[i].rightDirection = lineArray[i].anchor;
    }

    var lineSubPathArray = new SubPathInfo();
    lineSubPathArray.closed = true;
    lineSubPathArray.operation = ShapeOperation.SHAPEADD;
    lineSubPathArray.entireSubPath = lineArray;
    var myPathItem = app.activeDocument.pathItems.add("myPath", [lineSubPathArray]);

    var desc88 = new ActionDescriptor();
    var ref60 = new ActionReference();
    ref60.putClass(stringIDToTypeID("contentLayer"));
    desc88.putReference(charIDToTypeID("null"), ref60);
    var desc89 = new ActionDescriptor();
    var desc90 = new ActionDescriptor();
    var desc91 = new ActionDescriptor();
    desc91.putDouble(charIDToTypeID("Rd  "), 0.000000); // R
    desc91.putDouble(charIDToTypeID("Grn "), 0.000000); // G
    desc91.putDouble(charIDToTypeID("Bl  "), 0.000000); // B
    var id481 = charIDToTypeID("RGBC");
    desc90.putObject(charIDToTypeID("Clr "), id481, desc91);
    desc89.putObject(charIDToTypeID("Type"), stringIDToTypeID("solidColorLayer"), desc90);
    desc88.putObject(charIDToTypeID("Usng"), stringIDToTypeID("contentLayer"), desc89);
    executeAction(charIDToTypeID("Mk  "), desc88, DialogModes.NO);
    
    myPathItem.remove();

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawSquare(xPosition, yPosition, width, height) {

    drawShape([[xPosition, yPosition], [xPosition + width, yPosition], [xPosition + width, yPosition + height], [xPosition, yPosition + height]]);

    return app.activeDocument.activeLayer;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawGrid (x, y, width, height, columns, rows, strokeWidth, strokeColor) {

    var xIncrement = (width) / (columns);
    var yIncrement = (height) / (rows);

    var pX1 = x ;
    var pY1 = y;
    var pX2 = x ;
    var pY2 = y + height;


    for ( i = 0; i <= columns; i ++) {

        drawLine(pX1, pY1, pX2, pY2);
        setShapeSettings(false, "FFFFFF", true, strokeColor, strokeWidth);

        pX1 += xIncrement;
        pX2 += xIncrement;

        addLayerToLayerSet(app.activeDocument.activeLayer, "Grid");

    }

    pX1 = x;
    pY1 = y ;
    pX2 = x + width;
    pY2 = y ;

    for ( i = 0; i <= rows; i ++) {

        drawLine(pX1, pY1, pX2, pY2);
        setShapeSettings(false, "FFFFFF", true, strokeColor, strokeWidth);

        pY1 += yIncrement;
        pY2 += yIncrement;

        addLayerToLayerSet(app.activeDocument.activeLayer, "Grid");

    }

    return app.activeDocument.layerSets.getByName("Grid");

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Shape settings
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function convertPathtoShape() {

	var d = new ActionDescriptor();
	var d2 = new ActionDescriptor();
	var d3 = new ActionDescriptor();
	var d4 = new ActionDescriptor();
	var r = new ActionReference();
	r.putClass( stringIDToTypeID( "contentLayer" ));
	d.putReference( stringIDToTypeID("null"), r );
	d4.putDouble( charIDToTypeID( "Rd  " ), 255);
    d4.putDouble( charIDToTypeID( "Grn " ), 255);
    d4.putDouble( charIDToTypeID( "Bl  " ), 255);
    d3.putObject( charIDToTypeID( "Clr " ), charIDToTypeID( "RGBC" ), d4 );
    d2.putObject( charIDToTypeID( "Type" ), stringIDToTypeID( "solidColorLayer" ), d3 );
    d.putObject( charIDToTypeID( "Usng" ), stringIDToTypeID( "contentLayer" ), d2 );
    executeAction( charIDToTypeID( "Mk  " ), d, DialogModes.NO );

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setShapeSettings (fillEnabled, shapeFillColor, strokeEnabled, shapeStrokeColor, shapeStrokeWidth) {

    if(fillEnabled == undefined) {fillEnabled = false};
    if(shapeFillColor == undefined) {shapeFillColor = "8C8C8C"};
    if(strokeEnabled == undefined) {strokeEnabled = false};
    if(shapeStrokeColor == undefined) {shapeStrokeColor = "FFFFFF"};
    if(shapeStrokeWidth == undefined)  {shapeStrokeWidth = 1};

    try {

        var f = new SolidColor();
        f.rgb.hexValue = shapeFillColor;
        var s = new SolidColor();
        s.rgb.hexValue = shapeStrokeColor;

        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( stringIDToTypeID( "contentLayer" ), stringIDToTypeID("ordinal"), charIDToTypeID( "Trgt" ) );
            desc.putReference( stringIDToTypeID("null"), ref );
                var shapeStyleDesc = new ActionDescriptor();
                    var fillColorDesc = new ActionDescriptor();
                        var fillColorValuesDesc = new ActionDescriptor();
                        fillColorValuesDesc.putDouble(stringIDToTypeID('red'),   f.rgb.red);
                        fillColorValuesDesc.putDouble(stringIDToTypeID('green'), f.rgb.green);
                        fillColorValuesDesc.putDouble(stringIDToTypeID('blue'),  f.rgb.blue);
                    fillColorDesc.putObject( charIDToTypeID( "Clr " ), charIDToTypeID( "RGBC" ), fillColorValuesDesc );
                shapeStyleDesc.putObject( charIDToTypeID( "FlCn" ), stringIDToTypeID( "solidColorLayer" ), fillColorDesc );
                    var strokeStyleDesc = new ActionDescriptor();
                        var strokeColorDesc = new ActionDescriptor();
                            var strokeColorValuesDesc = new ActionDescriptor();
                            strokeColorValuesDesc.putDouble(stringIDToTypeID('red'),   s.rgb.red);
                            strokeColorValuesDesc.putDouble(stringIDToTypeID('green'), s.rgb.green);
                            strokeColorValuesDesc.putDouble(stringIDToTypeID('blue'),  s.rgb.blue);
                        strokeColorDesc.putObject( charIDToTypeID( "Clr " ), charIDToTypeID( "RGBC" ), strokeColorValuesDesc );
                    strokeStyleDesc.putObject( stringIDToTypeID( "strokeStyleContent" ), stringIDToTypeID( "solidColorLayer" ), strokeColorDesc );
                    strokeStyleDesc.putInteger( stringIDToTypeID( "strokeStyleVersion" ), 2 );
                    strokeStyleDesc.putBoolean( stringIDToTypeID( "strokeEnabled" ), strokeEnabled );
                    strokeStyleDesc.putUnitDouble( stringIDToTypeID( "strokeStyleLineWidth" ), charIDToTypeID( "#Pxl" ), shapeStrokeWidth );
                    strokeStyleDesc.putBoolean( stringIDToTypeID( "fillEnabled" ), fillEnabled );
                shapeStyleDesc.putObject( stringIDToTypeID( "strokeStyle" ), stringIDToTypeID( "strokeStyle" ), strokeStyleDesc );
            desc.putObject( charIDToTypeID( "T   " ), stringIDToTypeID( "shapeStyle" ), shapeStyleDesc );
        executeAction( charIDToTypeID( "setd" ), desc, DialogModes.NO );

    }   catch (e) { throw(e); }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fillShapeWithGradient(gradientType, gradientStops, gradientAngle, gradientOffset) {
    var shapeStyleDesc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( stringIDToTypeID( "contentLayer" ), stringIDToTypeID("ordinal"), charIDToTypeID( "Trgt" ) );
    shapeStyleDesc.putReference( stringIDToTypeID("null"), ref );
        var gradientLayerDesc = new ActionDescriptor();
            var gradientDesc = new ActionDescriptor();
            gradientDesc.putBoolean( charIDToTypeID( "Dthr" ), false );
            gradientDesc.putBoolean( charIDToTypeID( "Rvrs" ), false );
            gradientDesc.putUnitDouble( charIDToTypeID( "Angl" ), charIDToTypeID( "#Ang" ), gradientAngle );
            gradientDesc.putEnumerated( charIDToTypeID( "Type" ), charIDToTypeID( "GrdT" ), stringIDToTypeID( gradientType ) );
            gradientDesc.putUnitDouble( charIDToTypeID( "Scl " ), charIDToTypeID( "#Prc" ), 100.000000 );
                var offsetDesc = new ActionDescriptor();
                    offsetDesc.putUnitDouble( charIDToTypeID( "Hrzn" ), charIDToTypeID( "#Prc" ), gradientOffset[0] );
                    offsetDesc.putUnitDouble( charIDToTypeID( "Vrtc" ), charIDToTypeID( "#Prc" ), gradientOffset[1] );
            gradientDesc.putObject( charIDToTypeID( "Ofst" ), charIDToTypeID( "#Prc" ), offsetDesc );

            // Create the gradient descriptor
            var gradientStopsDesc = new ActionDescriptor();

                // Add the gradient stops to the gradient descriptor
                var stopListDesc = new ActionList();
                for (var i = 0; i < gradientStops.length; i++) {
                    // Color stop
                    var color = new SolidColor();
                    color.rgb.hexValue = gradientStops[i].color;
                    var colorStopDesc = new ActionDescriptor();
                    colorStopDesc.putDouble( charIDToTypeID( "Rd  " ), color.rgb.red );
                    colorStopDesc.putDouble( charIDToTypeID( "Grn " ), color.rgb.green );
                    colorStopDesc.putDouble( charIDToTypeID( "Bl  " ), color.rgb.blue );

                    var stopDesc = new ActionDescriptor();
                    stopDesc.putObject(charIDToTypeID("Clr "), charIDToTypeID("RGBC"), colorStopDesc);
                    stopDesc.putEnumerated( charIDToTypeID( "Type" ), charIDToTypeID( "Clry" ), charIDToTypeID( "UsrS" ) );
                    stopDesc.putDouble(charIDToTypeID("Lctn"), 4096 * i / (gradientStops.length - 1));
                    stopDesc.putDouble(charIDToTypeID("Mdpn"), gradientStops[i].midPoint);
                    stopListDesc.putObject(charIDToTypeID("Clrt"), stopDesc);
                }

            gradientStopsDesc.putList( charIDToTypeID( "Clrs" ), stopListDesc );

                // insert opacity stops;
                var stopListDesc = new ActionList();
                for (var i = 0; i < gradientStops.length; i++) {
                    // Opacity stop
                    var stopDesc = new ActionDescriptor();
                    stopDesc.putUnitDouble( charIDToTypeID( "Opct" ), charIDToTypeID( "#Prc" ), gradientStops[i].opacity);
                    stopDesc.putInteger( charIDToTypeID( "Lctn" ), 4096 * i / (gradientStops.length - 1));
                    stopDesc.putInteger( charIDToTypeID( "Mdpn" ), gradientStops[i].midPoint);
                    stopListDesc.putObject( charIDToTypeID( "TrnS" ), stopDesc );
                };

            gradientStopsDesc.putList( charIDToTypeID( "Trns" ), stopListDesc );

            gradientDesc.putObject( charIDToTypeID( "Grad" ), charIDToTypeID( "Grdn" ), gradientStopsDesc );
                
        gradientLayerDesc.putObject( charIDToTypeID( "FlCn" ), stringIDToTypeID( "gradientLayer" ), gradientDesc );
        
    shapeStyleDesc.putObject( charIDToTypeID( "T   " ), stringIDToTypeID( "shapeStyle" ), gradientLayerDesc );

    executeAction( charIDToTypeID( "setd" ), shapeStyleDesc, DialogModes.NO );

}



