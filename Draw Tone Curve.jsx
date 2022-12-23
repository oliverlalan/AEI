#target photoshop

drawToneCurve([[0,36], [44,68], [118,129], [255,250]]);

function drawToneCurve(curvePoints) {

// Save the current preferences

    // Store doc dimensions
    var docRef = app.activeDocument;
    var docHeight = docRef.height;
    var docWidth = docRef.width;

    // Path definition
    var toneCurvePathArray = new Array();

    var lineArray = new Array()

    for (i = 0; i<curvePoints.length-1; i++) {

        
        lineArray[i] = new PathPointInfo
        lineArray[i].kind = PointKind.CORNERPOINT
        lineArray[i].anchor = Array(curvePoints[i][0], 255 - curvePoints[i][1])
        lineArray[i].leftDirection = lineArray[i].anchor
        lineArray[i].rightDirection = lineArray[i].anchor
        lineArray[i+1] = new PathPointInfo
        lineArray[i+1].kind = PointKind.CORNERPOINT
        lineArray[i+1].anchor = Array(curvePoints[i+1][0], 255 - curvePoints[i+1][1])
        lineArray[i+1].leftDirection = lineArray[i+1].anchor
        lineArray[i+1].rightDirection = lineArray[i+1].anchor
        toneCurvePathArray[i] = new SubPathInfo()
        toneCurvePathArray[i].operation = ShapeOperation.SHAPEXOR
        toneCurvePathArray[i].closed = false
        toneCurvePathArray[i].entireSubPath = lineArray

    }
    
    //create the path item
    var myPathItem = activeDocument.pathItems.add("Line", toneCurvePathArray)

    var currentPathItem = app.activeDocument.pathItems.getByName("Line");

    convertPathtoShape();
    

    setStroke (255, 255, 255, 2);
    // app.activeDocument.selection.fill(app.foregroundColor, ColorBlendMode.SCREEN, 0, false);
    
    myPathItem.remove();

    app.activeDocument.activeLayer.name = "Tone Curve";

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

function setStroke(r, g, b, strokeWidth){
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
                        desc7.putDouble( idCyn, r );
                        var idMgnt = charIDToTypeID( "Grn " );
                        desc7.putDouble( idMgnt, g );
                        var idYlw = charIDToTypeID( "Bl  " );
                        desc7.putDouble( idYlw, b );
                    var idRGBC = charIDToTypeID( "RGBC" );
                    desc6.putObject( idClr, idRGBC, desc7 );
                var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
                desc5.putObject( idstrokeStyleContent, idsolidColorLayer, desc6 );
                var idstrokeStyleVersion = stringIDToTypeID( "strokeStyleVersion" );
                desc5.putInteger( idstrokeStyleVersion, strokeWidth );
                var idstrokeEnabled = stringIDToTypeID( "strokeEnabled" );
                desc5.putBoolean( idstrokeEnabled, true );
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
