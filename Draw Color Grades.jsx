#target photoshop

// examples of a function call

// https://community.adobe.com/t5/photoshop-ecosystem-discussions/scripting-circles-with-js-photoshop-cc-2017-0-1/m-p/9497152#M129790


// circle(720, 1000, 1000, 8, "#FFFFFF");

//circle(100, 200, 300, 3, "yellow");

//circle(100, 200, 300, 3, "#0190F7");

//circle(100, 200, 300, 3, 100, 150, 180);

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
var highlightLum                  =  new Setting ( "L",                    "ColorGradehighlightLum",              -100,   +100    );
var globalHue                     =  new Setting ( "H",                    "ColorGradeGlobalHue",                 0,      +359    );
var globalSat                     =  new Setting ( "S",                    "ColorGradeGlobalSat",                 0,      +100    );
var globalLum                     =  new Setting ( "L",                    "ColorGradeGlobalLum",                 -100,   +100    );
var blending                      =  new Setting ( "Blending",             "ColorGradeBlending",                  0,      +100    );
var balance                       =  new Setting ( "Balance",              "SplitToningBalance",                  -100,   +100    );

////////////////////////////////////////////////////////////////////////////////////////////////////////

function circle(r, x, y, w, c_r, c_g, c_b)

    {

    try

        {

        select_layer_rgb();

      

        var d1 = new ActionDescriptor();

        var d2 = new ActionDescriptor();

        var r1 = new ActionReference();

        r1.putProperty( charIDToTypeID( "Path" ), charIDToTypeID( "WrPt" ) );

        d1.putReference( charIDToTypeID( "null" ), r1 );

        d2.putUnitDouble( charIDToTypeID( "Top " ), charIDToTypeID( "#Pxl" ), y-r );

        d2.putUnitDouble( charIDToTypeID( "Left" ), charIDToTypeID( "#Pxl" ), x-r );

        d2.putUnitDouble( charIDToTypeID( "Btom" ), charIDToTypeID( "#Pxl" ), y+r );

        d2.putUnitDouble( charIDToTypeID( "Rght" ), charIDToTypeID( "#Pxl" ), x+r );

        d1.putObject( charIDToTypeID( "T   " ), charIDToTypeID( "Elps" ), d2 );

        executeAction( charIDToTypeID( "setd" ), d1, DialogModes.NO );

        d1 = null;

        d2 = null;

        r1 = null;

        var idx = curr_path_idx();

        app.activeDocument.pathItems[idx].makeSelection(0, true, SelectionType.REPLACE);

        app.activeDocument.pathItems[idx].remove();

        var c = new SolidColor();

        with (c.rgb) { red = green = blue = 0; }

        if (c_r != undefined)

            {

            if (typeof(c_r) == "string")

                {

                if (c_r.indexOf("#") == 0)

                    {

                    c.rgb.hexValue = c_r.substr(1);

                    }

                else

                    {                  

                    switch (c_r.toLowerCase())

                        {

                        case "red":     c.rgb.red = 255; c.rgb.green=0;   c.rgb.blue=0;   break;

                        case "green":   c.rgb.red = 0;   c.rgb.green=255; c.rgb.blue=0;   break;

                        case "blue":    c.rgb.red = 0;   c.rgb.green=0;   c.rgb.blue=255; break;

                        case "yellow":  c.rgb.red = 255; c.rgb.green=255; c.rgb.blue=0;   break;

                        case "magenta": c.rgb.red = 255; c.rgb.green=0;   c.rgb.blue=255; break;

                        case "cyan":    c.rgb.red = 0;   c.rgb.green=255; c.rgb.blue=255; break;

                        case "black":   c.rgb.red = 0;   c.rgb.green=0;   c.rgb.blue=0;   break;

                        case "white":   c.rgb.red = 255; c.rgb.green=255; c.rgb.blue=255; break;

                        case "gray":    c.rgb.red = 128; c.rgb.green=128; c.rgb.blue=128; break;

                        default:        c.rgb.red = 0;   c.rgb.green=0;   c.rgb.blue=0;   break;

                        }

                    }

                }

            else if (typeof(c_r) == "number")

                {

                c.rgb.red   = c_r;

                c.rgb.green = c_g; 

                c.rgb.blue  = c_b;

                }  

            }

        stroke(w, c.rgb.red, c.rgb.green, c.rgb.blue);

        app.activeDocument.selection.deselect();

        }

    catch (e) { alert(e); }

    }

////////////////////////////////////////////////////////////////////////////////////////////

function select_layer_rgb()

    {

    try {

        var d = new ActionDescriptor();

        var r = new ActionReference();

        r.putEnumerated( charIDToTypeID( "Chnl" ), charIDToTypeID( "Chnl" ), charIDToTypeID( "RGB " ) );

        d.putReference( charIDToTypeID( "null" ), r );

        d.putBoolean( charIDToTypeID( "MkVs" ), false );

        executeAction( charIDToTypeID( "slct" ), d, DialogModes.NO );

        r = null;

        d = null;  

        }

    catch (e) { alert(e);  }

    }

////////////////////////////////////////////////////////////////////////////////////////////

function curr_path_idx()

    {

    try {

        var r = new ActionReference();

        r.putProperty( charIDToTypeID( "Prpr" ), stringIDToTypeID( "targetPathIndex" ) );

        r.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );

        r = executeActionGet(r);

        return  r.getInteger( stringIDToTypeID( 'targetPathIndex' ));

        }

    catch (e) { alert(e); return -1; }

    }

///////////////////////////////////////////////////////////////////////////////////////////////////

function stroke(size, r, g, b)

    { 

    try {

        var d1 = new ActionDescriptor();

        var d2 = new ActionDescriptor();

        d1.putInteger( charIDToTypeID( "Wdth" ), size );

        d1.putEnumerated( charIDToTypeID( "Lctn" ), charIDToTypeID( "StrL" ), charIDToTypeID( "Cntr" ) );

        d1.putUnitDouble( charIDToTypeID( "Opct" ), charIDToTypeID( "#Prc" ), 100.000000 );

        d1.putEnumerated( charIDToTypeID( "Md  " ), charIDToTypeID( "BlnM" ), charIDToTypeID( "Nrml" ) );

        d2.putDouble( charIDToTypeID( "Rd  " ), r );

        d2.putDouble( charIDToTypeID( "Grn " ), g );

        d2.putDouble( charIDToTypeID( "Bl  " ), b );

        d1.putObject( charIDToTypeID( "Clr " ), charIDToTypeID( "RGBC" ), d2 );

        executeAction( charIDToTypeID( "Strk" ), d1, DialogModes.NO );

        }

    catch (e) { alert(e); }

}


///////////////////////////////////////////////////////////////////////////////////////////////////
// hue angulo
// s radio
drawCircle(selectedSetting, x, y, radius)

function addColorGrade (hue, saturation, radius, xPosition, yPosition, strokeWidth) { // hue, saturation, radius, xPosition, yPosition, strokeWidth

    circle(radius, xPosition, yPosition, strokeWidth, "#FFFFFF");

    var saturation = radius * saturation / 100 * 0.9; // to avoid overlap on the extreme
    var t_x = xPosition + saturation * Math.cos(hue * Math.PI / 180);
    var t_y = yPosition - saturation * Math.sin(hue * Math.PI / 180);

    circle(radius/10, t_x, t_y, strokeWidth, "#FFFFFF");

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
    var lineLayer = drawLine(selectedSetting, minSettingX, minSettingY, maxSettingX, maxSettingY, strokeWidth, 255, 255, 255, 100);
    lineLayer.move(adjustmentGroup, ElementPlacement.INSIDE);
    var circleLayer = drawCircle(selectedSetting, settingX, settingY, circleRadius);
    circleLayer.move(adjustmentGroup, ElementPlacement.INSIDE);
    var labelLayer = addText(selectedSetting.displayName, minSettingX, minSettingY - 1.5 * labelSize, "topleft", labelSize, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.LEFT, TextCase.ALLCAPS); // selectedSetting, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization
    labelLayer.move(adjustmentGroup, ElementPlacement.INSIDE);
    var valueLayer = addText(xmpMeta.getProperty(ns,selectedSetting.crsName), maxSettingX, minSettingY - 1.5 * labelSize, "topright", labelSize, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.RIGHT, TextCase.ALLCAPS);
    valueLayer.move(adjustmentGroup, ElementPlacement.INSIDE);


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


var colorGrades = ["midtone", "shadow", "highlight", "global"];

addColorGrade(midtoneHue.settingValue, midtoneSat.settingValue, 90, 540, 675 ,2); // hue, saturation, radius, xPosition, yPosition, strokeWidth
drawLine(midtoneLum.settingValue, ) // selectedSetting, x, y, lineLength, strokeWidth, circleRadius, labelSize


var midtoneHue                    =  new Setting ( "H",                    "ColorGradeMidtoneHue",                0,      +359    );
var midtoneSat                    =  new Setting ( "S",                    "ColorGradeMidtoneSat",                0,      +100    );
var midtoneLum                    =  new Setting ( "L",                    "ColorGradeMidtoneLum",                -100,   +100    );





