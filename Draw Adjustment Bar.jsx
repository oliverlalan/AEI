#target photoshop

function Setting(displayName, crsName, min, max) {
    this.displayName = displayName;
    this.crsName = crsName;
    this.value = 
    this.min = min;
    this.max = max;
}


// Basic parameters
var temperature  =  new Setting ( "Temperature", "Temperature",                     +1000,  +10000  );
var tint         =  new Setting ( "Tint",        "Tint",                            -150,   +150    );

var exposure     =  new Setting ( "Exposure",    "Exposure2012",                    -5,     +5      );
var contrast     =  new Setting ( "Contrast",    "Contrast2012",                    -100,   +100    );
var highlights   =  new Setting ( "Highlights",  "Highlights2012",                  -100,   +100    );
var shadows      =  new Setting ( "Shadows",     "Shadows2012",                     -100,   +100    );
var whites       =  new Setting ( "Whites",      "Whites2012",                      -100,   +100    );
var blacks       =  new Setting ( "Blacks",      "Blacks2012",                      -100,   +100    );

var texture      =  new Setting ( "Texture",     "Texture",                         -100,   +100    );
var clarity      =  new Setting ( "Clarity",     "Clarity2012",                     -100,   +100    );
var dehaze       =  new Setting ( "Dehaze",      "Dehaze",                          -100,   +100    );
var vibrance     =  new Setting ( "Vibrance",    "Vibrance",                        -100,   +100    );
var saturation   =  new Setting ( "Saturation",  "Saturation",                      -100,   +100    );

// Color grading
var midtoneHue   =  new Setting ( "H",           "ColorGradeMidtoneHue",            0,      +359    );
var midtoneSat   =  new Setting ( "S",           "ColorGradeMidtoneSat",            0,      +100    );
var midtoneLum   =  new Setting ( "L",           "ColorGradeMidtoneLum",            -100,   +100    );
var shadowHue    =  new Setting ( "H",           "SplitToningShadowHue",            0,      +359    );         
var shadowSat    =  new Setting ( "S",           "SplitToningShadowSaturation",     0,      +100    );
var shadowLum    =  new Setting ( "L",           "ColorGradeShadowLum",             -100,   +100    );
var highlightHue =  new Setting ( "H",           "SplitToningHighlightHue",         0,      +359    );
var highlightSat =  new Setting ( "S",           "SplitToningHighlightSaturation",  0,      +100    );
var highlightLum =  new Setting ( "L",           "ColorGradehighlightLum",          -100,   +100    );




var ns = "http://ns.adobe.com/camera-raw-settings/1.0/"; // Found in xmp header
ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
xmpMeta = new XMPMeta(app.activeDocument.xmpMetadata.rawData); 



// addAdjustmentLine(saturation, 100, 100, 225, 3, 4, 16);



function addAdjustmentBars(parametersArray, yStartingPosition) {

    for (i = 0; i < parametersArray.length; i++) {

        if(i==0) {var yPosition = yStartingPosition}

        addAdjustmentBar(parametersArray[i], 90, yPosition, 225, 3, 4, 16);

        yPosition +=45; 

    }

}

addAdjustmentBars([exposure, contrast, highlights, shadows, whites, blacks], 295);
addAdjustmentBars([texture, clarity, dehaze, vibrance,saturation], 609);



function addAdjustmentBar (selectedSetting, x, y, lineLength, strokeWidth, circleRadius, labelSize) {

    var settingValue = xmpMeta.getProperty(ns,selectedSetting.crsName);
    var minSetting = selectedSetting.min;
    var maxSetting = selectedSetting.max;
    var labelSize = labelSize;
    
    var minSettingX = x;
    var maxSettingX = x + lineLength;
    var settingX = minSettingX + lineLength / 2 + settingValue / (maxSetting - minSetting) * lineLength;
    var minSettingY = maxSettingY = settingY = y;

    var adjustmentGroup = activeDocument.layerSets.add();
    adjustmentGroup.name = selectedSetting.displayName + ' Group';
    var lineLayer = drawLine(selectedSetting, minSettingX, minSettingY, maxSettingX, maxSettingY, strokeWidth);
    lineLayer.move(adjustmentGroup, ElementPlacement.INSIDE);
    var circleLayer = drawCircle(selectedSetting, settingX, settingY, circleRadius);
    circleLayer.move(adjustmentGroup, ElementPlacement.INSIDE);
    var labelLayer = addSettingLabel(selectedSetting, minSettingX, minSettingY - 1.5 * labelSize, "topleft", labelSize, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.LEFT, TextCase.ALLCAPS); // selectedSetting, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization
    labelLayer.move(adjustmentGroup, ElementPlacement.INSIDE);
    var valueLayer = addSettingValue(selectedSetting, maxSettingX, minSettingY - 1.5 * labelSize, "topright", labelSize, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.RIGHT, TextCase.ALLCAPS);
    valueLayer.move(adjustmentGroup, ElementPlacement.INSIDE);


}


function drawLine(selectedSetting, x1, y1, x2, y2, strokeWidth) {
    
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

    setStroke (255, 255, 255, 2);
    
    myPathItem.remove();

    app.activeDocument.activeLayer.name = selectedSetting.displayName + " Line";

    return app.activeDocument.activeLayer;
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

// https://community.adobe.com/t5/photoshop-ecosystem-discussions/simpler-way-to-draw-a-circle-with-scripting/m-p/12052524#M544006


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

function addSettingLabel (selectedSetting, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization) {

    var labelLayer = app.activeDocument.artLayers.add();

    labelLayer.kind = LayerKind.TEXT;
    labelLayer.textItem.contents = selectedSetting.displayName;
    labelLayer.textItem.size = new UnitValue(fontSize, 'px');
    fontColor = new SolidColor();
    fontColor.rgb.hexValue = fontHexColor;
    labelLayer.textItem.color = fontColor;
    labelLayer.textItem.font = fontName;
    labelLayer.textItem.tracking = fontTracking;
    labelLayer.textItem.justification = fontJustification;
    labelLayer.textItem.capitalization = fontCapitalization;

    translateLayerTo(labelLayer, xPosition, yPosition, anchorPosition);

    labelLayer = selectedSetting.displayName + " Label";

    return app.activeDocument.activeLayer;

}

function addSettingValue (selectedSetting, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization) {

    var labelLayer = app.activeDocument.artLayers.add();

    labelLayer.kind = LayerKind.TEXT;
    labelLayer.textItem.contents = xmpMeta.getProperty(ns,selectedSetting.crsName);
    labelLayer.textItem.size = new UnitValue(fontSize, 'px');
    fontColor = new SolidColor();
    fontColor.rgb.hexValue = fontHexColor;
    labelLayer.textItem.color = fontColor;
    labelLayer.textItem.font = fontName;
    labelLayer.textItem.tracking = fontTracking;
    labelLayer.textItem.justification = fontJustification;
    labelLayer.textItem.capitalization = fontCapitalization;

    translateLayerTo(labelLayer, xPosition, yPosition, anchorPosition);

    labelLayer = selectedSetting.displayName + " Label";

    return app.activeDocument.activeLayer;


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