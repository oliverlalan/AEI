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

// Color grading                    
var midtoneHue                    =  new Setting ( "H",                    "ColorGradeMidtoneHue",                0,      +359    );
var midtoneSat                    =  new Setting ( "S",                    "ColorGradeMidtoneSat",                0,      +100    );
var midtoneLum                    =  new Setting ( "L",                    "ColorGradeMidtoneLum",                -100,   +100    );
var shadowHue                     =  new Setting ( "H",                    "SplitToningShadowHue",                0,      +359    );         
var shadowSat                     =  new Setting ( "S",                    "SplitToningShadowSaturation",         0,      +100    );
var shadowLum                     =  new Setting ( "L",                    "ColorGradeShadowLum",                 -100,   +100    );
var highlightHue                  =  new Setting ( "H",                    "SplitToningHighlightHue",             0,      +359    );
var highlightSat                  =  new Setting ( "S",                    "SplitToningHighlightSaturation",      0,      +100    );
var highlightLum                  =  new Setting ( "L",                    "ColorGradeHighlightLum",              -100,   +100    );
var globalHue                     =  new Setting ( "H",                    "ColorGradeGlobalHue",                 0,      +359    );
var globalSat                     =  new Setting ( "S",                    "ColorGradeGlobalSat",                 0,      +100    );
var globalLum                     =  new Setting ( "L",                    "ColorGradeGlobalLum",                 -100,   +100    );
var blending                      =  new Setting ( "Blending",             "ColorGradeBlending",                  0,      +100    );
var balance                       =  new Setting ( "Balance",              "SplitToningBalance",                  -100,   +100    );


function drawCircle(xPosition, yPosition, circleRadius, fillEnabled, fill_hex, strokeEnabled, stroke_hex, strokeWidth) {

    var c = new SolidColor();
    
    c.rgb.hexValue = fill_hex;

    var d = new ActionDescriptor();

    var r = new ActionReference();
    
    r.putClass(stringIDToTypeID("contentLayer"));
    
    d.putReference(charIDToTypeID('null'), r);
    
    var d1 = new ActionDescriptor();
    
    var d2 = new ActionDescriptor();
    
    var d3 = new ActionDescriptor();
    
    d3.putDouble(charIDToTypeID('Rd  '), c.rgb.red);
    
    d3.putDouble(charIDToTypeID('Grn '), c.rgb.green);
    
    d3.putDouble(charIDToTypeID('Bl  '), c.rgb.blue);
    
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

    try {

        var c = new SolidColor();

        c.rgb.hexValue = stroke_hex;

        var d = new ActionDescriptor();

        var r = new ActionReference();

        r.putEnumerated(stringIDToTypeID('contentLayer'), stringIDToTypeID('ordinal'), stringIDToTypeID('targetEnum'));

        d.putReference(stringIDToTypeID('null'), r);

        var d1 = new ActionDescriptor();

        var d2 = new ActionDescriptor();

        var d3 = new ActionDescriptor();

        var d4 = new ActionDescriptor();

        d4.putDouble(stringIDToTypeID('red'),   c.rgb.red);

        d4.putDouble(stringIDToTypeID('green'), c.rgb.green);

        d4.putDouble(stringIDToTypeID('blue'),  c.rgb.blue);

        d3.putObject(stringIDToTypeID('color'), stringIDToTypeID('RGBColor'), d4);

        d2.putObject(stringIDToTypeID('strokeStyleContent'), stringIDToTypeID('solidColorLayer'), d3);

        d2.putUnitDouble( stringIDToTypeID( "strokeStyleLineWidth" ), charIDToTypeID( "#Pxl" ), strokeWidth );

        d2.putBoolean(stringIDToTypeID('strokeEnabled'), strokeEnabled);

        d2.putBoolean( stringIDToTypeID( "fillEnabled" ), fillEnabled );

        d1.putObject(stringIDToTypeID('strokeStyle'), stringIDToTypeID('strokeStyle'), d2);

        d.putObject(stringIDToTypeID('to'), stringIDToTypeID('shapeStyle'), d1);

        executeAction(stringIDToTypeID('set'), d, DialogModes.NO);

        }

    catch (e) { throw(e); }

    return app.activeDocument.activeLayer;
    
};

addColorGrades (360, 90, 90, 2);

///////////////////////////////////////////////////////////////////////////////////////////////////
// hue angulo
// s radio

function addColorGrades (xPosition, yPosition, radius, strokeWidth) {

    var xIncrement = radius * 8 / 3;
    var yIncrement = radius * 3.5;
    
    addColorGrade(globalHue,        globalSat,      globalLum,      radius,   xPosition,                    yPosition,     strokeWidth,      "G"); // hue, saturation, radius, xPosition, yPosition, strokeWidth
    addColorGrade(shadowHue,        shadowSat,      shadowLum,      radius,   xPosition + xIncrement,       yPosition,     strokeWidth,      "S"); // hue, saturation, radius, xPosition, yPosition, strokeWidth
    addColorGrade(midtoneHue,       midtoneSat,     midtoneLum,     radius,   xPosition + xIncrement * 2,   yPosition,     strokeWidth,      "M"); // hue, saturation, radius, xPosition, yPosition, strokeWidth
    addColorGrade(highlightHue,     highlightSat,   highlightLum,   radius,   xPosition + xIncrement * 3,   yPosition,     strokeWidth,      "H"); // hue, saturation, radius, xPosition, yPosition, strokeWidth

}

function addColorGrade (hue, saturation, luminance, radius, xPosition, yPosition, strokeWidth, textLabel) { // hue, saturation, radius, xPosition, yPosition, strokeWidth

    drawCircle(xPosition + radius, yPosition + radius, radius, false, "FFFFFF", true, "FFFFFF", strokeWidth); // xPosition, yPosition, circleRadius, fillEnabled, fill_hex, strokeEnabled, stroke_hex, strokeWidth
    
    // 0.9 to avoid overlap on the extreme
    var t_x = xPosition + saturation.settingValue * radius / 100 * 0.9 * Math.cos(hue.settingValue * Math.PI / 180);
    var t_y = yPosition - saturation.settingValue * radius / 100 * 0.9 * Math.sin(hue.settingValue * Math.PI / 180);

    drawCircle(t_x + radius, t_y + radius, radius/10, false, "FFFFFF", true, "FFFFFF", strokeWidth);

    addAdjustmentBar (luminance, xPosition, yPosition  + radius * 7 / 3, radius * 2, 2, 4, undefined);

    // text, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization
    addText(textLabel, xPosition, yPosition, "bottomright", 16, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.RIGHT, TextCase.ALLCAPS); // selectedSetting, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization
    addText(hue.displayName + hue.settingValue, xPosition, yPosition + radius * 8 / 3, "topleft", 16, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.LEFT, TextCase.ALLCAPS);
    addText(saturation.displayName + saturation.settingValue, xPosition + radius, yPosition + radius * 8 / 3, "topcenter", 16, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.CENTER, TextCase.ALLCAPS);
    addText(luminance.displayName + luminance.settingValue, xPosition + radius * 2, yPosition + radius * 8 / 3, "topright", 16, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.RIGHT, TextCase.ALLCAPS);

}

function addAdjustmentBar (selectedSetting, x, y, lineLength, strokeWidth, circleRadius, labelSize) {
    
    var minSetting = selectedSetting.min;
    var maxSetting = selectedSetting.max;
    var labelSize = labelSize;
    
    var minSettingX = x;
    var maxSettingX = x + lineLength;
    var settingX = minSettingX + lineLength / 2 + selectedSetting.settingValue / (maxSetting - minSetting) * lineLength;
    var minSettingY = maxSettingY = settingY = y;

    var adjustmentGroup = activeDocument.layerSets.add();
    adjustmentGroup.name = selectedSetting.displayName + ' Group';
    var lineLayer = drawLine(minSettingX, minSettingY, maxSettingX, maxSettingY, strokeWidth, 255, 255, 255, 100);
    lineLayer.move(adjustmentGroup, ElementPlacement.INSIDE);
    var circleLayer = drawCircle(settingX, settingY, circleRadius, true, "FFFFFF", false, "FFFFFF", strokeWidth); // xPosition, yPosition, circleRadius, fillEnabled, fill_hex, strokeEnabled, stroke_hex, strokeWidth
    circleLayer.move(adjustmentGroup, ElementPlacement.INSIDE);
    if(labelSize != undefined) {
        var labelLayer = addText(selectedSetting.displayName, minSettingX, minSettingY - 1.5 * labelSize, "topleft", labelSize, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.LEFT, TextCase.ALLCAPS); // selectedSetting, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization
        labelLayer.move(adjustmentGroup, ElementPlacement.INSIDE);
        var valueLayer = addText(xmpMeta.getProperty(ns,selectedSetting.crsName), maxSettingX, minSettingY - 1.5 * labelSize, "topright", labelSize, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.RIGHT, TextCase.ALLCAPS);
        valueLayer.move(adjustmentGroup, ElementPlacement.INSIDE);
    }

}

function drawLine( x1, y1, x2, y2, strokeWidth, c_r, c_g, c_b, opacity) {  // x1, y1, x2, y2, strokeWidth, c_r, c_g, c_b, opacity
    
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
        var desc3 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated( stringIDToTypeID( "contentLayer" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
        desc3.putReference( charIDToTypeID( "null" ), ref1 );
            var desc4 = new ActionDescriptor();
                var desc5 = new ActionDescriptor();
                desc5.putUnitDouble( stringIDToTypeID( "strokeStyleLineWidth" ), charIDToTypeID( "#Pxl" ), strokeWidth );
                    var desc6 = new ActionDescriptor();
                        var desc7 = new ActionDescriptor();
                        desc7.putDouble( charIDToTypeID( "Rd  " ), c_r );
                        desc7.putDouble( charIDToTypeID( "Grn " ), c_g );
                        desc7.putDouble( charIDToTypeID( "Bl  " ), c_b );
                    desc6.putObject( charIDToTypeID( "Clr " ), charIDToTypeID( "RGBC" ), desc7 );
                desc5.putObject( stringIDToTypeID( "strokeStyleContent" ), stringIDToTypeID( "solidColorLayer" ), desc6 );
                desc5.putInteger( stringIDToTypeID( "strokeStyleVersion" ), 2 );
                desc5.putBoolean( stringIDToTypeID( "strokeEnabled" ), true );
                desc5.putBoolean( stringIDToTypeID( "fillEnabled" ), false );
            desc4.putObject( stringIDToTypeID( "strokeStyle" ), stringIDToTypeID( "strokeStyle" ), desc5 );
        desc3.putObject( charIDToTypeID( "T   " ), stringIDToTypeID( "shapeStyle" ), desc4 );
    executeAction( charIDToTypeID( "setd" ), desc3, DialogModes.NO );
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


var colorGrades = ["midtone", "shadow", "highlight", "global"];
// drawLine(midtoneLum.settingValue, ) // selectedSetting, x, y, lineLength, strokeWidth, circleRadius, labelSize


var midtoneHue                    =  new Setting ( "H",                    "ColorGradeMidtoneHue",                0,      +359    );
var midtoneSat                    =  new Setting ( "S",                    "ColorGradeMidtoneSat",                0,      +100    );
var midtoneLum                    =  new Setting ( "L",                    "ColorGradeMidtoneLum",                -100,   +100    );