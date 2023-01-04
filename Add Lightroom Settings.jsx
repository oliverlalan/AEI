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

// Basic parameters
var temperature                   =  new Setting ( "Temperature",          "Temperature",                         +1000,  +10000  );
var tint                          =  new Setting ( "Tint",                 "Tint",                                -150,   +150    );
                
var exposure                      =  new Setting ( "Exposure",             "Exposure2012",                        -5,     +5      );
var contrast                      =  new Setting ( "Contrast",             "Contrast2012",                        -100,   +100    );
var highlights                    =  new Setting ( "Highlights",           "Highlights2012",                      -100,   +100    );
var shadows                       =  new Setting ( "Shadows",              "Shadows2012",                         -100,   +100    );
var whites                        =  new Setting ( "Whites",               "Whites2012",                          -100,   +100    );
var blacks                        =  new Setting ( "Blacks",               "Blacks2012",                          -100,   +100    );
                
var texture                       =  new Setting ( "Texture",              "Texture",                             -100,   +100    );
var clarity                       =  new Setting ( "Clarity",              "Clarity2012",                         -100,   +100    );
var dehaze                        =  new Setting ( "Dehaze",               "Dehaze",                              -100,   +100    );
var vibrance                      =  new Setting ( "Vibrance",             "Vibrance",                            -100,   +100    );
var saturation                    =  new Setting ( "Saturation",           "Saturation",                          -100,   +100    );

// Tone Curve
var toneCurve                     =  new Setting ( "Tone Curve",           "ToneCurvePV2012",                     0,      +255    );
var toneCurveRed                  =  new Setting ( "Red Tone Curve",       "ToneCurvePV2012Red",                  0,      +255    );
var toneCurveGreen                =  new Setting ( "Green Tone Curve",     "ToneCurvePV2012Green",                0,      +255    );
var toneCurveBlue                 =  new Setting ( "Blue Tone Curve",      "ToneCurvePV2012Blue",                 0,      +255    );

// HSL
var redHue                        =  new Setting ( "Red Hue",              "HueAdjustmentRed",                    -100,   +100    );
var orangeHue                     =  new Setting ( "Orange Hue",           "HueAdjustmentOrange",                 -100,   +100    );
var yellowHue                     =  new Setting ( "Yellow Hue",           "HueAdjustmentYellow",                 -100,   +100    );
var greenHue                      =  new Setting ( "Green Hue",            "HueAdjustmentGreen",                  -100,   +100    );
var aquaHue                       =  new Setting ( "Aqua Hue",             "HueAdjustmentAqua",                   -100,   +100    );
var blueHue                       =  new Setting ( "Blue Hue",             "HueAdjustmentBlue",                   -100,   +100    );
var purpleHue                     =  new Setting ( "Purple Hue",           "HueAdjustmentPurple",                 -100,   +100    );
var magentaHue                    =  new Setting ( "Magenta Hue",          "HueAdjustmentMagenta",                -100,   +100    );
var redSaturation                 =  new Setting ( "Red Saturation",       "SaturationAdjustmentRed",             -100,   +100    );
var orangeSaturation              =  new Setting ( "Orange Saturation",    "SaturationAdjustmentOrange",          -100,   +100    );
var yellowSaturation              =  new Setting ( "Yellow Saturation",    "SaturationAdjustmentYellow",          -100,   +100    );
var greenSaturation               =  new Setting ( "Green Saturation",     "SaturationAdjustmentGreen",           -100,   +100    );
var aquaSaturation                =  new Setting ( "Aqua Saturation",      "SaturationAdjustmentAqua",            -100,   +100    );
var blueSaturation                =  new Setting ( "Blue Saturation",      "SaturationAdjustmentBlue",            -100,   +100    );
var purpleSaturation              =  new Setting ( "Purple Saturation",    "SaturationAdjustmentPurple",          -100,   +100    );
var magentaSaturation             =  new Setting ( "Magenta Saturation",   "SaturationAdjustmentMagenta",         -100,   +100    );
var redLuminance                  =  new Setting ( "Red Luminance",        "LuminanceAdjustmentRed",              -100,   +100    );
var orangeLuminance               =  new Setting ( "Orange Luminance",     "LuminanceAdjustmentOrange",           -100,   +100    );
var yellowLuminance               =  new Setting ( "Yellow Luminance",     "LuminanceAdjustmentYellow",           -100,   +100    );
var greenLuminance                =  new Setting ( "Green Luminance",      "LuminanceAdjustmentGreen",            -100,   +100    );
var aquaLuminance                 =  new Setting ( "Aqua Luminance",       "LuminanceAdjustmentAqua",             -100,   +100    );
var blueLuminance                 =  new Setting ( "Blue Luminance",       "LuminanceAdjustmentBlue",             -100,   +100    );
var purpleLuminance               =  new Setting ( "Purple Luminance",     "LuminanceAdjustmentPurple",           -100,   +100    );
var magentaLuminance              =  new Setting ( "Magenta Luminance",    "LuminanceAdjustmentMagenta",          -100,   +100    );
                
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
        
// Detail
// Sharpenning
var sharpeningAmount              =  new Setting ( "Amount",               "Sharpeness",                          0,      +150    );
var sharpeningRadius              =  new Setting ( "Radius",               "SharpenRadius",                       +0.5,   +3      );
var sharpeningDetail              =  new Setting ( "Detail",               "SharpenDetail",                       0,      +100    );
var sharpeningMasking             =  new Setting ( "Masking",              "SharpenEdgeMasking",                  0,      +100    );
// Noise Reduction
var luminanceNoiseReduction       =  new Setting ( "Luminance",            "LuminanceSmoothing",                  -100,   +100    );
// TODO Add missing detail and contrast
var colorNoiseReduction           =  new Setting ( "Color",                "ColorNoiseReduction",                 -100,   +100    );
var colorNoiseReductionDetail     =  new Setting ( "Detail",               "ColorNoiseReductionDetail",           -100,   +100    );
var colorNoiseReductionSmoothness =  new Setting ( "Smoothness",           "ColorNoiseReductionSmoothness",       -100,   +100    );

// Effects
// Vignetting
// Grain
var grainAmount                   =  new Setting ( "Amount",               "GrainAmount",                         -100,   +100    );
var grainSize                     =  new Setting ( "Size",                 "GrainSize",                           -100,   +100    );
var grainFrequency                =  new Setting ( "Roughness",            "GrainFrequency",                      -100,   +100    );

//Calibration
var shadowTintCalibration         =  new Setting ( "Shadow Tint",          "ShadowTint",                          -100,   +100    );
var redHueCalibration             =  new Setting ( "Red Hue",              "RedHue",                              -100,   +100    );
var redSaturationCalibration      =  new Setting ( "Red Saturation",       "RedSaturation",                       -100,   +100    );
var greenHueCalibration           =  new Setting ( "Green Hue",            "GreenHue",                            -100,   +100    );
var greenSaturationCalibration    =  new Setting ( "Green Saturation",     "GreenSaturation",                     -100,   +100    );
var blueHueCalibration            =  new Setting ( "Blue Hue",             "BlueHue",                             -100,   +100    );
var blueSaturationCalibration     =  new Setting ( "Blue Saturation",      "BlueSaturation",                      -100,   +100    );


// addAdjustmentLine(saturation, 100, 100, 225, 3, 4, 16);
// addAdjustmentBars([exposure, contrast, highlights, shadows, whites, blacks], 295);
// addAdjustmentBars([texture, clarity, dehaze, vibrance,saturation], 609);
// addAdjustmentBars([grainAmount, grainSize, grainFrequency, vibrance,saturation], 850);
// addAllCurves(540, 360, 135, 20) // xPosition, yPosition, edgeLength, strokeWidth
addCurve(toneCurve.settingValue, 30, 30, 135, 3, 201, 67, 10); //p, xPosition, yPosition, edgeLength, strokeWidth, c_r, c_g, c_b
// addHSLTable( 135, 825, "topright", 16, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.RIGHT, TextCase.ALLCAPS)
// addHistogram(false, false, false, 135); // this draws a layer with 8bit Luminosity RGB histogram 
// addHistogram(true, false, false, 135);

function addAdjustmentBars(parametersArray, yStartingPosition) {

    for (i = 0; i < parametersArray.length; i++) {

        if(i==0) {var yPosition = yStartingPosition}

        addAdjustmentBar(parametersArray[i], 90, yPosition, 225, 3, 4, 16);

        yPosition +=45; 

    }

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
                var idstrokeStyleLineWidth = stringIDToTypeID( "strokeStyleLineWidth" );
                var idPxl = charIDToTypeID( "#Pxl" );
                desc5.putUnitDouble( idstrokeStyleLineWidth, idPxl, strokeWidth );
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
                var idfillEnabled = stringIDToTypeID( "fillEnabled" );
                desc5.putBoolean( idfillEnabled, false );
            var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
            desc4.putObject( idstrokeStyle, idstrokeStyle, desc5 );
        var idshapeStyle = stringIDToTypeID( "shapeStyle" );
        desc3.putObject( idT, idshapeStyle, desc4 );
    executeAction( idsetd, desc3, DialogModes.NO );

    // var idsetd = charIDToTypeID( "setd" );
    //     var desc9 = new ActionDescriptor();
    //     var idnull = charIDToTypeID( "null" );
    //         var ref2 = new ActionReference();
    //         var idcontentLayer = stringIDToTypeID( "contentLayer" );
    //         var idOrdn = charIDToTypeID( "Ordn" );
    //         var idTrgt = charIDToTypeID( "Trgt" );
    //         ref2.putEnumerated( idcontentLayer, idOrdn, idTrgt );
    //     desc9.putReference( idnull, ref2 );
    //     var idT = charIDToTypeID( "T   " );
    //         var desc10 = new ActionDescriptor();
    //         var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
    //             var desc11 = new ActionDescriptor();
    //             var idstrokeStyleLineWidth = stringIDToTypeID( "strokeStyleLineWidth" );
    //             var idPxl = charIDToTypeID( "#Pxl" );
    //             desc11.putUnitDouble( idstrokeStyleLineWidth, idPxl, 20.000000 );
    //             var idstrokeStyleVersion = stringIDToTypeID( "strokeStyleVersion" );
    //             desc11.putInteger( idstrokeStyleVersion, 2 );
    //             var idstrokeEnabled = stringIDToTypeID( "strokeEnabled" );
    //             desc11.putBoolean( idstrokeEnabled, true );
    //         var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
    //         desc10.putObject( idstrokeStyle, idstrokeStyle, desc11 );
    //     var idshapeStyle = stringIDToTypeID( "shapeStyle" );
    //     desc9.putObject( idT, idshapeStyle, desc10 );
    // executeAction( idsetd, desc9, DialogModes.NO );
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

    // app.activeDocument.activeLayer.vectorMaskFeather = strokeWidth * 0.1;
    
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

//https://github.com/kuckir/CSPL.js/blob/master/CSPL.js
//https://blog.ivank.net/interpolation-with-cubic-splines.html

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


function addHSLTable (xPosition , yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization) {

    var HSLGroup = activeDocument.layerSets.add();
    HSLGroup.name = "HSL";
    
    var xInitialPosition = xPosition;
    var yInitialPosition = yPosition;
    var HSLTable = [["",            "Hue",                      "Sat",                           "Lum"                             ],
                    ["Red",         redHue.settingValue,         redSaturation.settingValue,      redLuminance.settingValue        ],
                    ["Orange",      orangeHue.settingValue,      orangeSaturation.settingValue,   orangeLuminance.settingValue     ],
                    ["Yellow",      yellowHue.settingValue,      yellowSaturation.settingValue,   yellowLuminance.settingValue     ],
                    ["Green",       greenHue.settingValue,       greenSaturation.settingValue,    greenLuminance.settingValue      ],
                    ["Aqua",        aquaHue.settingValue,        aquaSaturation.settingValue,     aquaLuminance.settingValue       ],
                    ["Blue",        blueHue.settingValue,        blueSaturation.settingValue,     blueLuminance.settingValue       ],
                    ["Purple",      purpleHue.settingValue,      purpleSaturation.settingValue,   purpleLuminance.settingValue     ],
                    ["Magenta",     magentaHue.settingValue,     magentaSaturation.settingValue,  magentaLuminance.settingValue    ]]

    for (i = 0; i < HSLTable.length; i ++) {

        for (j = 0; j < HSLTable[0].length; j ++) {

            var textLayer = addText(HSLTable[i][j], xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization);  // text, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization

            try {
                textLayer.move(HSLGroup, ElementPlacement.INSIDE);
            } catch (e) {};

            xPosition += 60;

        } 

        xPosition = xInitialPosition;

        yPosition += 30;

    }
    
}

// Source: https://community.adobe.com/t5/photoshop-ecosystem-discussions/histogram-passed-and-drawn-into-a-layer-done/m-p/9581663

///////////////////////////////  HISTOGRAM IN LAYER   ///////////////////////////////////

function addHistogram(RGB, Lab, MaxRGB, graphHeight) {

    ///////////////////////////////////////////////// createProgressWindow

    var createProgressWindow = function(title, message, hasCancelButton) {

      var win;

      if (title == null) title = "Work in progress";

      if (message == null) message = "Please wait...";

      if (hasCancelButton == null) hasCancelButton = false;

      win = new Window("palette", "" + title, undefined);

      win.bar = win.add("progressbar", {x: 20, y: 12, width: 300, height: 20 }, 0, 100);

      win.stMessage = win.add("statictext", { x: 10, y: 36, width: 320, height: 20 }, "" + message);

      win.stMessage.justify = 'center';  

      if (hasCancelButton) {

        win.cancelButton = win.add('button', undefined, 'Cancel');

        win.cancelButton.onClick = function() {

          win.close();

          throw new Error('User canceled the pre-processing!');

        };

      }

      this.reset = function(message) {

        win.bar.value = 0;

        win.stMessage.text = message;

        return win.update();

      };

      this.updateProgress = function(perc, message) {

        if (perc != null) win.bar.value = perc;

        if (message != null) win.stMessage.text = message;

        return win.update();

      };

      this.close = function() {

        return win.close();

      };

      win.center(win.parent);

      return win.show();

    };

    //

    // the other layer histograms, if exist, should be invisible so the reading is only on the pixels of the image itself

    if (getLayer("RGB histogram")) activeDocument.artLayers.getByName ("RGB histogram").visible = false;

    if (getLayer("Lightness Lab histogram")) activeDocument.artLayers.getByName ("Lightness Lab histogram").visible = false;

    if (getLayer("Luminosity RGB")) activeDocument.artLayers.getByName ("Luminosity RGB").visible = false;

    if (getLayer("Luminosity Max")) activeDocument.artLayers.getByName ("Luminosity Max").visible = false;

    //

    var layerName = (RGB) ? "RGB histogram" : ((Lab) ? "Lightness Lab histogram" : ((MaxRGB) ? "Luminosity Max" : "Luminosity RGB"));  

    //

    if (!getLayer(layerName)) {

        // it works only on RGB images

        if (activeDocument.mode == DocumentMode.RGB) {

            // if the image is 16bit/channel or more it sets 8bits/channel before read the histogram

            if (!activeDocument.bitsPerChannel == BitsPerChannelType.EIGHT) activeDocument.bitsPerChannel = BitsPerChannelType.EIGHT;

            var wasHereLayer = activeDocument.activeLayer;

            var unitsAntes = app.preferences.rulerUnits;

            var foregroundPreviousColor = app.foregroundColor;

            app.preferences.rulerUnits = Units.PIXELS; // importante

            activeDocument.quickMaskMode = false;

            activeDocument.selection.deselect();

            //

            // read histogram:

            var hL = activeDocument.histogram;

            var hR = activeDocument.channels["Red"].histogram;

            var hG = activeDocument.channels["Green"].histogram;

            var hB = activeDocument.channels["Blue"].histogram;

            // if you want the Luminosity of Lab, export it to Lab, read it, and revert it to RGB

            if (Lab) {

                activeDocument.changeMode (ChangeMode.LAB);

                // read Lightness channel histogram of Lab 

                var hL = activeDocument.channels["Lightness"].histogram;

                // revert to RGB

                activeDocument.changeMode (ChangeMode.RGB);

            } else {

                // read Luminosity composite channel histogram of RGB 

                var hL = activeDocument.histogram;

            }

            //

            var ww = activeDocument.width.as('px');

            var hh = activeDocument.height.as('px');

            var totalPixels = ww*hh;

            var totalPixels1Col = totalPixels/256;

            // 

            var pBar = new createProgressWindow("Histogram building...", "Please wait", false);

            // 

            activeDocument.artLayers.add();

            activeDocument.activeLayer.name = layerName;

            activeDocument.activeLayer.move( activeDocument, ElementPlacement.PLACEATBEGINNING );

            activeDocument.activeLayer.blendMode = BlendMode.NORMAL; // blending mode "normal"

            activeDocument.activeLayer.opacity = 100; // opacity 100%

            //

            var hhGraph = graphHeight;

            var hY = 400; // base y of graph

            var hX = 100; // base x of graph

            // base transparent

            app.foregroundColor.rgb.red = 0;

            app.foregroundColor.rgb.green = 0;

            app.foregroundColor.rgb.blue = 0;

            //

            drawSelectionScreen (hX-2, hY+2, 258+hX, hY-322);

            // fill (filltype [, mode] [, opacity] [, preserveTransparency])  // filltype: SolidColor  |  mode: ColorBlendMode  |  opacity: [1..100] 

            app.activeDocument.selection.fill(app.foregroundColor, ColorBlendMode.SCREEN, 0, false); // background 

            activeDocument.selection.deselect();

            //

            var myHist = [];

            //

            // find maxY for normalizing graph

            var maxY = 0;

            for ( i = 1; i <= 254; i++ ) {

                if (Math.floor(Math.max(hL[i], hR[i], hG[i], hB[i])) > maxY) maxY = Math.floor(Math.max(hL[i], hR[i], hG[i], hB[i]));

            }

            if (RGB) {

                for (var a in activeDocument.componentChannels) {

                    //  criar as 3 cores R, G e B e o graph da cada uma

                    (a==0) ? app.foregroundColor.rgb.red = 255 : app.foregroundColor.rgb.red = 0;

                    (a==1) ? app.foregroundColor.rgb.green = 255 : app.foregroundColor.rgb.green = 0;

                    (a==2) ? app.foregroundColor.rgb.blue = 255 : app.foregroundColor.rgb.blue = 0;

                    // 

                    if (a==0) myHist = hR;

                    if (a==1) myHist = hG;

                    if (a==2) myHist = hB;

                    //

                    for ( i = 2; i <= 253; i++ ) {

                        var col = i+hX;

                        // var YYY = Math.floor(myHist[i]*hhGraph/maxY);
                        // Smooth verstion 
                        var YYY = (Math.floor(myHist[i-2]*hhGraph/maxY) + Math.floor(myHist[i-1]*hhGraph/maxY) + Math.floor(myHist[i]*hhGraph/maxY) + Math.floor(myHist[i+1]*hhGraph/maxY)+ Math.floor(myHist[i+2]*hhGraph/maxY)) / 5;


                        drawSelectionScreen (col, hY, col+1, hY-YYY);

                        //

                        var percent = Math.floor(((i+1)+(a*256))*100/768);

                        pBar.updateProgress (percent, activeDocument.componentChannels[a].name.toUpperCase() + " Channel " + percent+ " % completed");

                    }

                    // fill (filltype [, mode] [, opacity] [, preserveTransparency])  // filltype: SolidColor  |  mode: ColorBlendMode  |  opacity: [1..100] 

                    // app.activeDocument.selection.fill(app.foregroundColor, ColorBlendMode.SCREEN, 100, false);

                    app.activeDocument.selection.stroke(app.foregroundColor, 2, StrokeLocation.INSIDE, ColorBlendMode.NORMAL, 100, false);

                    activeDocument.selection.deselect();

                }

            } else {

                app.foregroundColor.rgb.red = 255;

                app.foregroundColor.rgb.green = 255;

                app.foregroundColor.rgb.blue = 255;

                myHist = hL;


                for ( i = 2; i <= 253; i++ ) {

                    var col = i+hX;

                    if (MaxRGB) {

                        var YYY = Math.floor(Math.max(hR[i], hG[i], hB[i])*hhGraph/maxY);

                    } else {

                        // var YYY = Math.floor(myHist[i]*hhGraph/maxY);
                        // Smooth verstion 
                        var YYY = (Math.floor(myHist[i-2]*hhGraph/maxY) + Math.floor(myHist[i-1]*hhGraph/maxY) + Math.floor(myHist[i]*hhGraph/maxY) + Math.floor(myHist[i+1]*hhGraph/maxY)+ Math.floor(myHist[i+2]*hhGraph/maxY)) / 5;

                    }

                    drawSelectionScreen (col, hY, col+1, hY-YYY);

                    //

                    var percent = Math.floor((i+1)*100/256);

                    pBar.updateProgress (percent, "Luminosity Channel " + percent+ " % completed");

                }

                // fill (filltype [, mode] [, opacity] [, preserveTransparency])  // filltype: SolidColor  |  mode: ColorBlendMode  |  opacity: [1..100] 

                // app.activeDocument.selection.fill(app.foregroundColor, ColorBlendMode.SCREEN, 100, false);

                // feather (by) |   by: UnitValue

                // app.activeDocument.selection.feather(UnitValue(0.3, 'px'));

                // stroke ( strokeColor [, width] [, location] [, mode] [, opacity] [, preserveTransparency])   //    width: number |   location: StrokeLocation    |   mode: ColorBlendMode   |   opacity: [1..100]    | preserveTransparency: boolean
                
                app.activeDocument.selection.stroke(app.foregroundColor, 2, StrokeLocation.INSIDE, ColorBlendMode.NORMAL, 100, false);

                activeDocument.selection.deselect();

            }

            pBar.close();

            // activeDocument.activeLayer = wasHereLayer;

            app.preferences.rulerUnits = unitsAntes;

            app.foregroundColor = foregroundPreviousColor;

        } else {

            alert("Must be an RGB image");

        }

    } else {

        alert("Already has created this '" + layerName + "' layer!");

        return;

    }

    function drawSelectionScreen(x1, y1, x2, y2) {

        try {

            // SelectionType.SELECTEDAREA | DIMINISH | EXTEND | INTERSECT | REPLACE

            activeDocument.selection.select([[ x1, y1], [x2, y1], [x2, y2], [x1,y2]], SelectionType.EXTEND, 0, false);

        } catch(e) {}

    }

    function drawLineScreen(x1, y1, x2, y2, width, transparency) { 

        try {

            var desc = new ActionDescriptor();

            var lineDesc = new ActionDescriptor();

            var startDesc = new ActionDescriptor();

            startDesc.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), x1 );

            startDesc.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), y1 );

            lineDesc.putObject( charIDToTypeID('Strt'), charIDToTypeID('Pnt '), startDesc );

            var endDesc = new ActionDescriptor();

            endDesc.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), x2 );

            endDesc.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), y2 );

            lineDesc.putObject( charIDToTypeID('End '), charIDToTypeID('Pnt '), endDesc );

            lineDesc.putUnitDouble( charIDToTypeID('Wdth'), charIDToTypeID('#Pxl'), width ); // 

            desc.putObject( charIDToTypeID('Shp '), charIDToTypeID('Ln  '), lineDesc );

            desc.putEnumerated( charIDToTypeID( "Md  " ), charIDToTypeID( "BlnM" ), charIDToTypeID( "Scrn" ) ); // mode: Screen 

            desc.putUnitDouble( charIDToTypeID( "Opct" ), charIDToTypeID( "#Prc" ), transparency ); // [0-100] transparency

            desc.putBoolean( charIDToTypeID('AntA'), false ); // important antialias should be false

            executeAction( charIDToTypeID('Draw'), desc, DialogModes.NO );

        } catch(e) {}

    }

    //////////////////////////////////

    function getLayer(layername) {

        var result = false;

        for (var a=0; a<activeDocument.artLayers.length ; a++) {

            if (String(activeDocument.artLayers[a].name) == layername) {

                result = true;

                break;

            }

        }

        return result;

    }

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

function addAllCurves (xPosition, yPosition, edgeLength, strokeWidth) {

    var yIncrement = edgeLength * 4 / 3;
    // p, xPosition, yPosition, edgeLength, strokeWidth, c_r, c_g, c_b
    addCurve(toneCurve.settingValue, xPosition, yPosition, edgeLength, strokeWidth, 255, 255, 255);
    addCurve(toneCurveRed.settingValue, xPosition, yPosition + yIncrement, edgeLength, strokeWidth, 201, 67, 10);
    addCurve(toneCurveGreen.settingValue, xPosition, yPosition + 2 * yIncrement, edgeLength, strokeWidth, 25, 128, 76);
    addCurve(toneCurveBlue.settingValue, xPosition, yPosition + 3 * yIncrement, edgeLength, strokeWidth, 0, 151, 194);

}