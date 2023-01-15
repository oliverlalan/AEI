#target photoshop

ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
var ns = XMPConst.NS_CAMERA_RAW //"http://ns.adobe.com/camera-raw-settings/1.0/"; // Found in xmp header

var rawFile = app.activeDocument.fullName;

var xmpMetaInitial = new XMPMeta(app.activeDocument.xmpMetadata.rawData); 

function Setting(displayName, crsName, min, max, defaultValue) {

    var xmpMeta = xmpMetaInitial;

    this.displayName = displayName;
    this.crsName = crsName;
    this.min = min;
    this.max = max;
    this.defaultValue = defaultValue;
    this.settingValue = [];

    if(this.crsName.match("ToneCurvePV2012")) {

        for (i=0; i<xmpMeta.countArrayItems(ns,this.crsName); i++) {

            var inputValue  = parseInt(xmpMeta.getArrayItem(ns, this.crsName, i + 1).value.split(", ")[0]);
            var outputValue = parseInt(xmpMeta.getArrayItem(ns, this.crsName, i + 1).value.split(", ")[1]);

            this.settingValue.push([inputValue, outputValue]);

        }

        if (arraysEqual(this.settingValue, this.defaultValue)) {

            this.isCustom = false;

        } else {

            this.isCustom = true;

        }

    } else {
        
        this.settingValue = xmpMeta.getProperty(ns, this.crsName);

        if (this.settingValue == this.defaultValue) {

            this.isCustom = false;

        } else {

            this.isCustom = true;

        }

    }

}

function arraysEqual (a, b) {
    if (a===b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; i++) {
        if ((a[i][0] !== b[i][0])||(a[i][1] !== b[i][1])) return false;
    }
    return true;
}


// Basic parameters
var temperature                   =  new Setting ( "Temperature",          "Temperature",                         +1000,  +10000  , 0);
var tint                          =  new Setting ( "Tint",                 "Tint",                                -150,   +150    , 0);
                
var exposure                      =  new Setting ( "Exposure",             "Exposure2012",                        -5,     +5      , 0);
var contrast                      =  new Setting ( "Contrast",             "Contrast2012",                        -100,   +100    , 0);
var highlights                    =  new Setting ( "Highlights",           "Highlights2012",                      -100,   +100    , 0);
var shadows                       =  new Setting ( "Shadows",              "Shadows2012",                         -100,   +100    , 0);
var whites                        =  new Setting ( "Whites",               "Whites2012",                          -100,   +100    , 0);
var blacks                        =  new Setting ( "Blacks",               "Blacks2012",                          -100,   +100    , 0);
                
var texture                       =  new Setting ( "Texture",              "Texture",                             -100,   +100    , 0);
var clarity                       =  new Setting ( "Clarity",              "Clarity2012",                         -100,   +100    , 0);
var dehaze                        =  new Setting ( "Dehaze",               "Dehaze",                              -100,   +100    , 0);
var vibrance                      =  new Setting ( "Vibrance",             "Vibrance",                            -100,   +100    , 0);
var saturation                    =  new Setting ( "Saturation",           "Saturation",                          -100,   +100    , 0);

// Tone Curve
var toneCurve                     =  new Setting ( "Tone Curve",           "ToneCurvePV2012",                     0,      +255    , [[0,0], [255,255]]);
var toneCurveRed                  =  new Setting ( "Red Tone Curve",       "ToneCurvePV2012Red",                  0,      +255    , [[0,0], [255,255]]);
var toneCurveGreen                =  new Setting ( "Green Tone Curve",     "ToneCurvePV2012Green",                0,      +255    , [[0,0], [255,255]]);
var toneCurveBlue                 =  new Setting ( "Blue Tone Curve",      "ToneCurvePV2012Blue",                 0,      +255    , [[0,0], [255,255]]);

// HSL
var redHue                        =  new Setting ( "Red Hue",              "HueAdjustmentRed",                    -100,   +100    , 0);
var orangeHue                     =  new Setting ( "Orange Hue",           "HueAdjustmentOrange",                 -100,   +100    , 0);
var yellowHue                     =  new Setting ( "Yellow Hue",           "HueAdjustmentYellow",                 -100,   +100    , 0);
var greenHue                      =  new Setting ( "Green Hue",            "HueAdjustmentGreen",                  -100,   +100    , 0);
var aquaHue                       =  new Setting ( "Aqua Hue",             "HueAdjustmentAqua",                   -100,   +100    , 0);
var blueHue                       =  new Setting ( "Blue Hue",             "HueAdjustmentBlue",                   -100,   +100    , 0);
var purpleHue                     =  new Setting ( "Purple Hue",           "HueAdjustmentPurple",                 -100,   +100    , 0);
var magentaHue                    =  new Setting ( "Magenta Hue",          "HueAdjustmentMagenta",                -100,   +100    , 0);
var redSaturation                 =  new Setting ( "Red Saturation",       "SaturationAdjustmentRed",             -100,   +100    , 0);
var orangeSaturation              =  new Setting ( "Orange Saturation",    "SaturationAdjustmentOrange",          -100,   +100    , 0);
var yellowSaturation              =  new Setting ( "Yellow Saturation",    "SaturationAdjustmentYellow",          -100,   +100    , 0);
var greenSaturation               =  new Setting ( "Green Saturation",     "SaturationAdjustmentGreen",           -100,   +100    , 0);
var aquaSaturation                =  new Setting ( "Aqua Saturation",      "SaturationAdjustmentAqua",            -100,   +100    , 0);
var blueSaturation                =  new Setting ( "Blue Saturation",      "SaturationAdjustmentBlue",            -100,   +100    , 0);
var purpleSaturation              =  new Setting ( "Purple Saturation",    "SaturationAdjustmentPurple",          -100,   +100    , 0);
var magentaSaturation             =  new Setting ( "Magenta Saturation",   "SaturationAdjustmentMagenta",         -100,   +100    , 0);
var redLuminance                  =  new Setting ( "Red Luminance",        "LuminanceAdjustmentRed",              -100,   +100    , 0);
var orangeLuminance               =  new Setting ( "Orange Luminance",     "LuminanceAdjustmentOrange",           -100,   +100    , 0);
var yellowLuminance               =  new Setting ( "Yellow Luminance",     "LuminanceAdjustmentYellow",           -100,   +100    , 0);
var greenLuminance                =  new Setting ( "Green Luminance",      "LuminanceAdjustmentGreen",            -100,   +100    , 0);
var aquaLuminance                 =  new Setting ( "Aqua Luminance",       "LuminanceAdjustmentAqua",             -100,   +100    , 0);
var blueLuminance                 =  new Setting ( "Blue Luminance",       "LuminanceAdjustmentBlue",             -100,   +100    , 0);
var purpleLuminance               =  new Setting ( "Purple Luminance",     "LuminanceAdjustmentPurple",           -100,   +100    , 0);
var magentaLuminance              =  new Setting ( "Magenta Luminance",    "LuminanceAdjustmentMagenta",          -100,   +100    , 0);
                
// Color grading                    
var midtoneHue                    =  new Setting ( "H",                    "ColorGradeMidtoneHue",                0,      +359    , 0);
var midtoneSat                    =  new Setting ( "S",                    "ColorGradeMidtoneSat",                0,      +100    , 0);
var midtoneLum                    =  new Setting ( "L",                    "ColorGradeMidtoneLum",                -100,   +100    , 0);
var shadowHue                     =  new Setting ( "H",                    "SplitToningShadowHue",                0,      +359    , 0);         
var shadowSat                     =  new Setting ( "S",                    "SplitToningShadowSaturation",         0,      +100    , 0);
var shadowLum                     =  new Setting ( "L",                    "ColorGradeShadowLum",                 -100,   +100    , 0);
var highlightHue                  =  new Setting ( "H",                    "SplitToningHighlightHue",             0,      +359    , 0);
var highlightSat                  =  new Setting ( "S",                    "SplitToningHighlightSaturation",      0,      +100    , 0);
var highlightLum                  =  new Setting ( "L",                    "ColorGradeHighlightLum",              -100,   +100    , 0);
var globalHue                     =  new Setting ( "H",                    "ColorGradeGlobalHue",                 0,      +359    , 0);
var globalSat                     =  new Setting ( "S",                    "ColorGradeGlobalSat",                 0,      +100    , 0);
var globalLum                     =  new Setting ( "L",                    "ColorGradeGlobalLum",                 -100,   +100    , 0);
var blending                      =  new Setting ( "Blending",             "ColorGradeBlending",                  0,      +100    , 50);
var balance                       =  new Setting ( "Balance",              "SplitToningBalance",                  -100,   +100    , 0);
        
// Detail
// Sharpenning
var sharpeningAmount              =  new Setting ( "Amount",               "Sharpeness",                          0,      +150    , +40);
var sharpeningRadius              =  new Setting ( "Radius",               "SharpenRadius",                       +0.5,   +3      , +1);
var sharpeningDetail              =  new Setting ( "Detail",               "SharpenDetail",                       0,      +100    , +25);
var sharpeningMasking             =  new Setting ( "Masking",              "SharpenEdgeMasking",                  0,      +100    , 0);
// Noise Reduction
var luminanceNoiseReduction       =  new Setting ( "Luminance",            "LuminanceSmoothing",                  -100,   +100    , 0);
// TODO Add missing detail and contrast
var colorNoiseReduction           =  new Setting ( "Color",                "ColorNoiseReduction",                 -100,   +100    , +25);
var colorNoiseReductionDetail     =  new Setting ( "Detail",               "ColorNoiseReductionDetail",           -100,   +100    , +50);
var colorNoiseReductionSmoothness =  new Setting ( "Smoothness",           "ColorNoiseReductionSmoothness",       -100,   +100    , +50);

// Effects
// Vignetting
// Grain
var grainAmount                   =  new Setting ( "Amount",               "GrainAmount",                         -100,   +100    , 0);
var grainSize                     =  new Setting ( "Size",                 "GrainSize",                           -100,   +100    , +25);
var grainFrequency                =  new Setting ( "Roughness",            "GrainFrequency",                      -100,   +100    , +50);

//Calibration
var shadowTintCalibration         =  new Setting ( "Shadow Tint",          "ShadowTint",                          -100,   +100    , 0);
var redHueCalibration             =  new Setting ( "Red Hue",              "RedHue",                              -100,   +100    , 0);
var redSaturationCalibration      =  new Setting ( "Red Saturation",       "RedSaturation",                       -100,   +100    , 0);
var greenHueCalibration           =  new Setting ( "Green Hue",            "GreenHue",                            -100,   +100    , 0);
var greenSaturationCalibration    =  new Setting ( "Green Saturation",     "GreenSaturation",                     -100,   +100    , 0);
var blueHueCalibration            =  new Setting ( "Blue Hue",             "BlueHue",                             -100,   +100    , 0);
var blueSaturationCalibration     =  new Setting ( "Blue Saturation",      "BlueSaturation",                      -100,   +100    , 0);


// addHistograms(90, 225, 135, 225); // xPosition, yPosition, height, width
// addSettingsSet("Basic Tone", [exposure, contrast, highlights, shadows, whites, blacks], 90, 295, 225);
// addSettingsSet("Basic Presence", [texture, clarity, dehaze, vibrance,saturation], 90, 609, 225);
// addHSLTable( 115, 855, "topright", 16, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.RIGHT, TextCase.ALLCAPS, false) // xPosition , yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization, textLabels
// // addSettingsSet("Grain", [grainAmount, grainSize, grainFrequency], 90, 850, 225);
// addAllCurves(540, 360, 180) // xPosition, yPosition, edgeLength
// addColorGrades (135, 90, 90, 2);
// resetSettings([exposure, contrast, highlights, shadows, blacks, whites]);
// setXmp(xmpFile, [exposure, contrast, highlights, shadows, blacks, whites]);
// placeFile(rawFile);

createUneditedCopy(app.activeDocument);
// setXmp(xmpFile, []);


function addSettingsSet(setName, settingsSet, xPosition, yPosition, lineLength) {

    var settingsSetGroup = activeDocument.layerSets.add();
    settingsSetGroup.name = setName;

    for (i = 0; i < settingsSet.length; i++) {

        var settingGroup = addSetting(settingsSet[i], xPosition, yPosition, lineLength, 4, true);

        settingGroup.name = settingsSet[i].displayName;

        var dummieGroup = settingsSetGroup.layerSets.add();

        settingGroup.move(dummieGroup, ElementPlacement.PLACEBEFORE);

        dummieGroup.remove();

        yPosition +=45;

    }

}

function addSetting (selectedSetting, x, y, lineLength, circleRadius, includeLabels) {

    var strokeWidth = circleRadius / 2;
    var labelSize = circleRadius * 4;
    
    var minSetting = selectedSetting.min;
    var maxSetting = selectedSetting.max;
    var labelSize = labelSize;
    
    var minSettingX = x;
    var maxSettingX = x + lineLength; 
    var settingX = minSettingX + (selectedSetting.settingValue - minSetting) / (maxSetting-minSetting) * lineLength;
    var minSettingY = maxSettingY = settingY = y;

    var settingGroup = activeDocument.layerSets.add();
    if(includeLabels) {
        var labelLayer = addText(selectedSetting.displayName, minSettingX, minSettingY - 1.5 * labelSize, "topleft", labelSize, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.LEFT, TextCase.ALLCAPS); // selectedSetting, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization
        labelLayer.name = 'Label';
        labelLayer.move(settingGroup, ElementPlacement.INSIDE);
        var valueLayer = addText(selectedSetting.settingValue, maxSettingX, minSettingY - 1.5 * labelSize, "topright", labelSize, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.RIGHT, TextCase.ALLCAPS);
        valueLayer.name = 'Value';
        valueLayer.move(settingGroup, ElementPlacement.INSIDE);
    }
    
    var lineLayer = drawLine(minSettingX, minSettingY, maxSettingX, maxSettingY);
    setShapeSettings(false, "FFFFFF", true, "FFFFFF", strokeWidth);
    lineLayer.name = 'Line';
    lineLayer.move(settingGroup, ElementPlacement.INSIDE);
    var circleLayer = drawCircle(settingX, settingY, circleRadius); // xPosition, yPosition, circleRadius, fillEnabled, fill_hex, strokeEnabled, stroke_hex, strokeWidth
    setShapeSettings(true, "FFFFFF", false, "FFFFFF", strokeWidth);
    circleLayer.name = 'Circle';
    circleLayer.move(settingGroup, ElementPlacement.INSIDE);

    return settingGroup;

}

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

function setShapeSettings(fillEnabled, fill_hex, strokeEnabled, stroke_hex, strokeWidth)    {

    // Define shape fill

    try {

        var f = new SolidColor();

        f.rgb.hexValue = fill_hex;

        var d = new ActionDescriptor();

        var r = new ActionReference();

        r.putEnumerated(stringIDToTypeID('contentLayer'), stringIDToTypeID('ordinal'), stringIDToTypeID('targetEnum'));

        d.putReference(stringIDToTypeID('null'), r);

        var d1 = new ActionDescriptor();

        var d2 = new ActionDescriptor();

        var d3 = new ActionDescriptor();

        d3.putDouble(stringIDToTypeID('red'),   f.rgb.red);

        d3.putDouble(stringIDToTypeID('green'), f.rgb.green);

        d3.putDouble(stringIDToTypeID('blue'),  f.rgb.blue);

        d2.putObject(stringIDToTypeID('color'), stringIDToTypeID('RGBColor'), d3);

        d1.putObject(stringIDToTypeID('fillContents'), stringIDToTypeID('solidColorLayer'), d2);

        d.putObject(stringIDToTypeID('to'), stringIDToTypeID('shapeStyle'), d1);

        executeAction(stringIDToTypeID('set'), d, DialogModes.NO);

    }   catch (e) { throw(e); }

    // define shape stroke

    try {

        var s = new SolidColor();

        s.rgb.hexValue = stroke_hex;

        var d = new ActionDescriptor();

        var r = new ActionReference();

        r.putEnumerated(stringIDToTypeID('contentLayer'), stringIDToTypeID('ordinal'), stringIDToTypeID('targetEnum'));

        d.putReference(stringIDToTypeID('null'), r);

        var d1 = new ActionDescriptor();

        var d2 = new ActionDescriptor();

        var d3 = new ActionDescriptor();

        var d4 = new ActionDescriptor();

        d4.putDouble(stringIDToTypeID('red'),   s.rgb.red);

        d4.putDouble(stringIDToTypeID('green'), s.rgb.green);

        d4.putDouble(stringIDToTypeID('blue'),  s.rgb.blue);

        d3.putObject(stringIDToTypeID('color'), stringIDToTypeID('RGBColor'), d4);

        d2.putObject(stringIDToTypeID('strokeStyleContent'), stringIDToTypeID('solidColorLayer'), d3);

        d2.putInteger( stringIDToTypeID( "strokeStyleVersion" ), 2 );

        d2.putUnitDouble( stringIDToTypeID( "strokeStyleLineWidth" ), charIDToTypeID( "#Pxl" ), strokeWidth );

        d2.putBoolean(stringIDToTypeID('strokeEnabled'), strokeEnabled);

        d2.putBoolean( stringIDToTypeID( "fillEnabled" ), fillEnabled );

        d1.putObject(stringIDToTypeID('strokeStyle'), stringIDToTypeID('strokeStyle'), d2);

        d.putObject(stringIDToTypeID('to'), stringIDToTypeID('shapeStyle'), d1);

        executeAction(stringIDToTypeID('set'), d, DialogModes.NO);

    }   catch (e) { throw(e); }

}

function addText (text, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization) {

    text = text.toString();

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

function addCurve(selectedSetting, xPosition, yPosition, edgeLength, stroke_hex) {

    var strokeWidth = edgeLength * 0.025;
    var circleRadius = edgeLength * 0.02;

    var curveGroup = activeDocument.layerSets.add();
    curveGroup.name = selectedSetting.displayName + ' Group';

    // Draw Tone Curve background grid
    var curveGrid = drawGrid (xPosition, yPosition, edgeLength, edgeLength, 4, 4, strokeWidth * 0.35, "A6A6A6", 100); // x, y, width, height, columns, rows, strokeWidth, c_r, c_g, c_b, opacity
    curveGrid.name = selectedSetting.displayName + ' Grid';
    curveGrid.move(curveGroup, ElementPlacement.INSIDE);

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
    setShapeSettings(false, "FFFFFF", true, stroke_hex, strokeWidth)

    app.activeDocument.activeLayer.name = selectedSetting.displayName;
    app.activeDocument.activeLayer.move(curveGroup, ElementPlacement.INSIDE);

    // Delete all pixels out of the grid frame.
    // app.activeDocument.selection.select([[xPosition, yPosition],[xPosition, yPosition + edgeLength], [xPosition + edgeLength, yPosition + edgeLength], [xPosition + edgeLength, yPosition]]);
    // app.activeDocument.selection.invert();
    // app.activeDocument.selection.clear();
    // app.activeDocument.selection.deselect();

    // Add anchor points, avoiding first and last anchor points, [0,0] and [255,255]

    var curveAnchorPointsGroup = activeDocument.layerSets.getByName(selectedSetting.displayName + ' Group').layerSets.add();
    curveAnchorPointsGroup.name = 'Anchor Points';

    for (i = 0; i < curveAnchorPoints.length; i ++) {

        if(!((curveAnchorPoints[i][0] == 0 && curveAnchorPoints[i][1] == 0) || (curveAnchorPoints[i][0] == 255 && curveAnchorPoints[i][1] == 255))) {

            // xPosition, yPosition, circleRadius
            var anchorPoint = drawCircle(xPosition + curveAnchorPoints[i][0] / 256 * edgeLength, yPosition + edgeLength - curveAnchorPoints[i][1] / 256 * edgeLength, circleRadius);
            setShapeSettings(true, "FFFFFF", false, "FFFFFF", strokeWidth);
            anchorPoint.name = '[' + curveAnchorPoints[i][0] + ' ,' + curveAnchorPoints[i][1] + ']';
            anchorPoint.move(curveAnchorPointsGroup, ElementPlacement.INSIDE);
        
        }

    }

    // Add anchor points labels

    // Compute text spacing based on number of anchor points, avoiding first and last anchor points, [0,0] and [255,255]

    var yIncrementsAmount = 0;

    for (i = 0; i < curveAnchorPoints.length; i ++) {

        if(!((curveAnchorPoints[i][0] == 0 && curveAnchorPoints[i][1] == 0) || (curveAnchorPoints[i][0] == 255 && curveAnchorPoints[i][1] == 255))) {

            yIncrementsAmount += 1;
        
        }

    }

    // Initialize text positions

    var inputXPosition = xPosition + edgeLength * 4 / 3;
    var outputXPosition = xPosition + edgeLength * 5 / 3;
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
            var anchorPointInputLabel = addText(curveAnchorPoints[i][0], inputXPosition, inputYPosition , "middleright", 16, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.LEFT, TextCase.ALLCAPS);
            anchorPointInputLabel.name = "Input: " + anchorPointInputLabel.name;
            anchorPointInputLabel.move(curveAnchorPointLabelGroup, ElementPlacement.INSIDE);

            var anchorPointOutputLabel = addText(curveAnchorPoints[i][1], outputXPosition, outputYPosition , "middleright", 16, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.LEFT, TextCase.ALLCAPS);
            anchorPointOutputLabel.name = "Output: " + anchorPointOutputLabel.name;
            anchorPointOutputLabel.move(curveAnchorPointLabelGroup, ElementPlacement.INSIDE);

            inputYPosition += yIncrement;
            outputYPosition += yIncrement;
        
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

    function printMat (A){ 
        for(var i=0; i<A.length; i++) {
            console.log(A[i]);
        }
    }

    function swapRows (m, k, l) {
        var p = m[k];
        m[k] = m[l];
        m[l] = p;
    }    
        
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

}


function addHSLTable (xPosition , yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization, textLabels) {

    var HSLGroup = activeDocument.layerSets.add();
    HSLGroup.name = "HSL";
    
    var xInitialPosition = xPosition;
    var yInitialPosition = yPosition;
    var fill_hex = "FFFFFF";
    var stroke_hex = "FFFFFF";

    var HSLTable = [
        ["",            "Hue",                      "Sat",                           "Lum"                             ],
        ["Red",         redHue.settingValue,         redSaturation.settingValue,      redLuminance.settingValue        ],
        ["Orange",      orangeHue.settingValue,      orangeSaturation.settingValue,   orangeLuminance.settingValue     ],
        ["Yellow",      yellowHue.settingValue,      yellowSaturation.settingValue,   yellowLuminance.settingValue     ],
        ["Green",       greenHue.settingValue,       greenSaturation.settingValue,    greenLuminance.settingValue      ],
        ["Aqua",        aquaHue.settingValue,        aquaSaturation.settingValue,     aquaLuminance.settingValue       ],
        ["Blue",        blueHue.settingValue,        blueSaturation.settingValue,     blueLuminance.settingValue       ],
        ["Purple",      purpleHue.settingValue,      purpleSaturation.settingValue,   purpleLuminance.settingValue     ],
        ["Magenta",     magentaHue.settingValue,     magentaSaturation.settingValue,  magentaLuminance.settingValue    ]
    ]

    for (i = 0; i < HSLTable.length; i ++) {

        for (j = 0; j < HSLTable[0].length; j ++) {

            if(j == 0) {

                if(i !=0 ){

                    if(textLabels == true) {

                        HSLTable[i][j] = HSLTable[i][j].substring(0,3);

                        var textLayer = addText(HSLTable[i][j], xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization);

                        textLayer.name = HSLTable[i][j] + ' Label';
                        
                        textLayer.move(HSLGroup, ElementPlacement.INSIDE);

                    } else {

                        switch (HSLTable[i][j]) {

                            case "Red":         fill_hex = "800000";    break;
                            case "Orange":      fill_hex = "CB7000";    break;
                            case "Yellow":      fill_hex = "FCDF03";    break;
                            case "Green":       fill_hex = "00730F";    break;
                            case "Aqua":        fill_hex = "00B3AA";    break;
                            case "Blue":        fill_hex = "009DE5";    break;
                            case "Purple":      fill_hex = "6802D9";    break;
                            case "Magenta":     fill_hex = "C9006F";    break;
                            default:            fill_hex = "FFFFFF";    break;

                        }
                        
                        // xPosition, yPosition, circleRadius

                        var circleLayer = drawCircle(xPosition, yPosition + fontSize / 3, 8);

                        setShapeSettings(true, fill_hex, true, stroke_hex, 1.5);

                        circleLayer.name = HSLTable[i][j] + ' Label';
                        
                        circleLayer.move(HSLGroup, ElementPlacement.INSIDE);

                    }

                }

                xPosition += 80;
            
            } else {

                var textLayer = addText(HSLTable[i][j], xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization);  // text, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization

                if(i == 0) {

                    textLayer.name = HSLTable[i][j] + ' Label';
                        
                    textLayer.move(HSLGroup, ElementPlacement.INSIDE);

                }   else    {

                    textLayer.name = HSLTable[i][0] + ' ' + HSLTable[0][j] + ': ' + textLayer.name;
                        
                    textLayer.move(HSLGroup, ElementPlacement.INSIDE);

                }

                xPosition += 60;    
            
            }

        } 

        xPosition = xInitialPosition;

        yPosition += 35;

    }
    
}

// Source: https://community.adobe.com/t5/photoshop-ecosystem-discussions/histogram-passed-and-drawn-into-a-layer-done/m-p/9581663

///////////////////////////////  HISTOGRAM IN LAYER   ///////////////////////////////////

function addHistograms(xPosition, yPosition, height, width) {

    var redHistogram = addHistogram("Red",     xPosition,      yPosition,      height,     width);
    var greenHistogram = addHistogram("Green",   xPosition,      yPosition,      height,     width);
    var blueHistogram = addHistogram("Blue",    xPosition,      yPosition,      height,     width);

    activeDocument.artLayers.getByName("Red histogram").visible = true;
    activeDocument.artLayers.getByName("Green histogram").visible = true;

    var histogramsGroup = activeDocument.layerSets.add();
    histogramsGroup.name = 'Histograms';
    redHistogram.move(histogramsGroup, ElementPlacement.INSIDE);
    greenHistogram.move(histogramsGroup, ElementPlacement.INSIDE);
    blueHistogram.move(histogramsGroup, ElementPlacement.INSIDE);

    // app.activeDocument.selection.select([[xPosition, yPosition],[xPosition, yPosition - height], [xPosition + width, yPosition - height], [xPosition + width, yPosition]]);
    // app.activeDocument.selection.invert();
    // app.activeDocument.selection.clear();
    // app.activeDocument.selection.deselect();

}

function addHistogram(histogramType, xPosition, yPosition, graphHeight, graphWidth) {

    // the other layer histograms, if exist, should be invisible so the reading is only on the pixels of the image itself

    if (getLayer("Red histogram")) activeDocument.artLayers.getByName ("Red histogram").visible = false;
    if (getLayer("Green histogram")) activeDocument.artLayers.getByName ("Green histogram").visible = false;
    if (getLayer("Blue histogram")) activeDocument.artLayers.getByName ("Blue histogram").visible = false;
    if (getLayer("Lum histogram")) activeDocument.artLayers.getByName ("Lum histogram").visible = false;
    if (getLayer("Lab histogram")) activeDocument.artLayers.getByName ("Lab histogram").visible = false;
    if (getLayer("MaxRGB histogram")) activeDocument.artLayers.getByName ("MaxRGB histogram").visible = false;

    var layerName = histogramType + " histogram"
    //

    if (!getLayer(layerName)) {

        // it works only on RGB images

        if (activeDocument.mode == DocumentMode.RGB) {

            // if the image is 16bit/channel or more it sets 8bits/channel before read the histogram

            if (!activeDocument.bitsPerChannel == BitsPerChannelType.EIGHT) activeDocument.bitsPerChannel = BitsPerChannelType.EIGHT;

            var wasHereLayer = activeDocument.activeLayer;

            var unitsAntes = app.preferences.rulerUnits;

            app.preferences.rulerUnits = Units.PIXELS; // importante

            activeDocument.quickMaskMode = false;

            activeDocument.selection.deselect();

            // read histogram:

            var hL = activeDocument.histogram;

            var hR = activeDocument.channels["Red"].histogram;

            var hG = activeDocument.channels["Green"].histogram;

            var hB = activeDocument.channels["Blue"].histogram;

            if (histogramType == "Lab") {

                activeDocument.changeMode (ChangeMode.LAB);

                var hLab = activeDocument.channels["Lightness"].histogram;

                activeDocument.changeMode (ChangeMode.RGB);

            }

            // add layer

            activeDocument.artLayers.add();

            activeDocument.activeLayer.name = layerName;

            activeDocument.activeLayer.move( activeDocument, ElementPlacement.PLACEATBEGINNING );

            activeDocument.activeLayer.blendMode = BlendMode.SCREEN; // blending mode "normal"

            activeDocument.activeLayer.opacity = 100; // opacity 100%

            //

            var myHist = [];

            var histogramPoints = [];

            var histogramHexColor = "FFFFFF";

            // find maxY for normalizing graph

            var maxY = 0;

            for ( i = 3; i <= 252; i++ ) {

                if (Math.floor(Math.max(hL[i], hR[i], hG[i], hB[i])) > maxY) maxY = Math.floor(Math.max(hL[i], hR[i], hG[i], hB[i]));

            }

            switch (histogramType) {
                case "Red":
                myHist = hR;
                fillEnabled = true;
                fill_hex = "c9430a";
                strokeEnabled = false;
                stroke_hex = "c9430a";
                break;

                case "Green":
                myHist = hG;
                fillEnabled = true;
                fill_hex = "19804c";
                strokeEnabled = false;
                stroke_hex = "19804c";
                break;

                case "Blue":
                myHist = hB;
                fillEnabled = true;
                fill_hex = "0097c2";
                strokeEnabled = false;
                stroke_hex = "0097c2";

                break;

                case "Lum":
                myHist = hL;
                fillEnabled = false;
                fill_hex = "FFFFFF";
                strokeEnabled = true;
                stroke_hex = "FFFFFF";

                break;

                case "Lab":
                myHist = hLab;
                fillEnabled = true;
                fill_hex = "FFFFFF";
                strokeEnabled = false;
                stroke_hex = "FFFFFF";
                break;

                case "MaxRGB":
                myHist = hL;
                fillEnabled = false;
                fill_hex = "FFFFFF";
                strokeEnabled = true;
                stroke_hex = "FFFFFF";
                break;

            }

            for ( i = 2; i <= 253; i++ ) {

                if (histogramType == "MaxRGB") {

                    // var YYY = Math.floor(Math.max(hR[i], hG[i], hB[i])*graphHeight/maxY);
                    var YYY = (Math.floor(Math.max(hR[i-2], hG[i-2], hB[i-2])*graphHeight/maxY) + Math.floor(Math.max(hR[i-1], hG[i-1], hB[i-1])*graphHeight/maxY) + Math.floor(Math.max(hR[i], hG[i], hB[i])*graphHeight/maxY) + Math.floor(Math.max(hR[i+1], hG[i+1], hB[i+1])*graphHeight/maxY) + Math.floor(Math.max(hR[i+2], hG[i+2], hB[i+2])*graphHeight/maxY)) / 5;

                } else {

                    // var YYY = Math.floor(myHist[i]*graphHeight/maxY);
                    var YYY = (Math.floor(myHist[i-2]*graphHeight/maxY) + Math.floor(myHist[i-1]*graphHeight/maxY) + Math.floor(myHist[i]*graphHeight/maxY) + Math.floor(myHist[i+1]*graphHeight/maxY)+ Math.floor(myHist[i+2]*graphHeight/maxY)) / 5;

                }

                YYY = Math.min(YYY, graphHeight);
                histogramPoints.push([i * graphWidth / 252, YYY]);

            }

            drawSmoothHistogram(histogramPoints, xPosition, yPosition, fillEnabled, fill_hex, strokeEnabled, stroke_hex, 2);

            app.preferences.rulerUnits = unitsAntes;

            return app.activeDocument.activeLayer;

        } else {

            alert("Must be an RGB image");

        }

    } else {

        alert("Already has created this '" + layerName + "' layer!");

        return;

    }

    function drawSmoothHistogram (histogramPoints, xPosition, yPosition, fillEnabled, fill_hex, strokeEnabled, stroke_hex, strokeWidth) {

        var histogramPathPoints = new Array();
        
        for (i = 0; i < histogramPoints.length; i++) {

            histogramPathPoints[i] = new PathPointInfo
            histogramPathPoints[i].anchor = Array(xPosition + histogramPoints[i][0], yPosition - histogramPoints[i][1])
            histogramPathPoints[i].kind = PointKind.SMOOTHPOINT
            histogramPathPoints[i].leftDirection = histogramPathPoints[i].anchor
            histogramPathPoints[i].rightDirection = histogramPathPoints[i].anchor
        }

        histogramPathPoints[histogramPoints.length] = new PathPointInfo
        histogramPathPoints[histogramPoints.length].anchor = Array(xPosition + graphWidth + 1, yPosition)
        histogramPathPoints[histogramPoints.length].kind = PointKind.SMOOTHPOINT
        histogramPathPoints[histogramPoints.length].leftDirection = histogramPathPoints[histogramPoints.length].anchor
        histogramPathPoints[histogramPoints.length].rightDirection = histogramPathPoints[histogramPoints.length].anchor

        histogramPathPoints[histogramPoints.length + 1] = new PathPointInfo
        histogramPathPoints[histogramPoints.length + 1].anchor = Array(xPosition + 2, yPosition)
        histogramPathPoints[histogramPoints.length + 1].kind = PointKind.SMOOTHPOINT
        histogramPathPoints[histogramPoints.length + 1].leftDirection = histogramPathPoints[histogramPoints.length + 1].anchor
        histogramPathPoints[histogramPoints.length + 1].rightDirection = histogramPathPoints[histogramPoints.length + 1].anchor

        histogramPathPoints[histogramPoints.length + 2] = new PathPointInfo
        histogramPathPoints[histogramPoints.length + 2].anchor = Array(xPosition + histogramPoints[0][0], yPosition - histogramPoints[0][1])
        histogramPathPoints[histogramPoints.length + 2].kind = PointKind.SMOOTHPOINT
        histogramPathPoints[histogramPoints.length + 2].leftDirection = histogramPathPoints[histogramPoints.length + 2].anchor
        histogramPathPoints[histogramPoints.length + 2].rightDirection = histogramPathPoints[histogramPoints.length + 2].anchor
 

        // Path definition
        var histogramCurvePathArray = new SubPathInfo()
        histogramCurvePathArray.operation = ShapeOperation.SHAPEXOR
        histogramCurvePathArray.closed = false
        histogramCurvePathArray.entireSubPath = histogramPathPoints;  
    
        //create the path item
        var myPathItem = activeDocument.pathItems.add("Histogram", [histogramCurvePathArray])
        var currentPathItem = app.activeDocument.pathItems.getByName("Histogram");
        convertPathtoShape();
        myPathItem.remove();

        setShapeSettings(fillEnabled, fill_hex, strokeEnabled, stroke_hex, strokeWidth);

    }

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

function drawGrid (x, y, width, height, columns, rows, strokeWidth, stroke_hex, opacity) {

    var pX1 = x + strokeWidth / 2;
    var pY1 = y;
    var pX2 = x + strokeWidth / 2;
    var pY2 = y + height;

    var xIncrement = (width - strokeWidth) / (columns - 1);
    var yIncrement = (height - strokeWidth) / (rows - 1);

    for ( i = 0; i < columns; i ++) {

        drawLine(pX1, pY1, pX2, pY2);
        setShapeSettings(false, "FFFFFF", true, stroke_hex, strokeWidth);
        app.activeDocument.activeLayer.rasterize(RasterizeType.SHAPE);

        pX1 += xIncrement;
        pX2 += xIncrement;

        if( i != 0 ) {  app.activeDocument.activeLayer.merge();}

    }

    pX1 = x;
    pY1 = y + strokeWidth / 2;
    pX2 = x + width;
    pY2 = y + strokeWidth / 2;

    for ( i = 0; i < rows; i ++) {

        drawLine(pX1, pY1, pX2, pY2, strokeWidth, stroke_hex, opacity);
        setShapeSettings(false, "FFFFFF", true, stroke_hex, strokeWidth);
        app.activeDocument.activeLayer.rasterize(RasterizeType.SHAPE);

        pY1 += yIncrement;
        pY2 += yIncrement;

        app.activeDocument.activeLayer.merge();

    }

    app.activeDocument.activeLayer.opacity = opacity;

    return app.activeDocument.activeLayer;

}

function addAllCurves (xPosition, yPosition, edgeLength) {
    
    var yIncrement = edgeLength * 4 / 3;
    // p, xPosition, yPosition, edgeLength, stroke_hex
    var allCurves = [toneCurve, toneCurveRed, toneCurveGreen, toneCurveBlue];

    for (c = 0; c < allCurves.length; c ++) {

        if(allCurves[c].isCustom) {

            switch (allCurves[c].displayName) {

                case "Red Tone Curve":
                var stroke_hex = "c9430a";
                break;

                case "Green Tone Curve":
                var stroke_hex = "19804c";
                break;

                case "Blue Tone Curve":
                var stroke_hex = "0097c2";
                break;

                default:
                var stroke_hex = "CCCCCC";

            }

            addCurve(allCurves[c], xPosition, yPosition, edgeLength, stroke_hex);

            yPosition += yIncrement;

        }

    }

}

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

function addColorGrades (xPosition, yPosition, radius, strokeWidth) {

    var colorGrades = [
        [highlightHue,      highlightSat,       highlightLum,   "Highlights"        ],
        [midtoneHue,        midtoneSat,         midtoneLum,     "Midtones"          ],
        [shadowHue,         shadowSat,          shadowLum,      "Shadows"           ],
        [globalHue,         globalSat,          globalLum,      "Global"            ]
    ]

    var colorGradesGroup = activeDocument.layerSets.add();
    colorGradesGroup.name = "Color Grading";

    for (cg = 0; cg < colorGrades.length; cg++) {

        var colorGradeGroup = addColorGrade(colorGrades[cg][0], colorGrades[cg][1], colorGrades[cg][2], radius, xPosition, yPosition, strokeWidth, colorGrades[cg][3]);

        var dummieGroup = colorGradesGroup.layerSets.add();

        colorGradeGroup.move(dummieGroup, ElementPlacement.PLACEBEFORE);

        dummieGroup.remove();

        yPosition += radius * 3;

    }

    addSettingsSet("Color Grading Balance", [blending, balance], radius * 1.5, 1195, 180);
    
}

function addColorGrade (hue, saturation, luminance, radius, xPosition, yPosition, strokeWidth, textLabel) { // hue, saturation, radius, xPosition, yPosition, strokeWidth

    var colorGradeGroup = app.activeDocument.layerSets.getByName('Color Grading').layerSets.add();
    colorGradeGroup.name = textLabel;

    var backgroundCircle = drawCircle(xPosition + radius, yPosition + radius, radius * 0.75); // xPosition, yPosition, circleRadius, fillEnabled, fill_hex, strokeEnabled, stroke_hex, strokeWidth
    setShapeSettings(false, "FFFFFF", true, "FFFFFF", strokeWidth);
    backgroundCircle.name = 'Background Circle';
    backgroundCircle.move(colorGradeGroup, ElementPlacement.INSIDE);
    
    // 0.9 to avoid overlap on the extreme
    var t_x = xPosition + saturation.settingValue * radius / 100 * Math.cos(hue.settingValue * Math.PI / 180);
    var t_y = yPosition - saturation.settingValue * radius / 100 * Math.sin(hue.settingValue * Math.PI / 180);

    var settingCircle = drawCircle(t_x + radius, t_y + radius, radius * 0.075);
    setShapeSettings(false, "FFFFFF", true, "FFFFFF", strokeWidth);
    settingCircle.name = 'Saturation & Hue Circle';
    settingCircle.move(colorGradeGroup, ElementPlacement.INSIDE);

    // Add luminance bar
    var settingGroup = addSetting (luminance, xPosition, yPosition  + radius * 13 / 6, radius * 2, 4, false);
    settingGroup.name = 'Luminance Bar';
    var dummieGroup = colorGradeGroup.layerSets.add();
    settingGroup.move(dummieGroup, ElementPlacement.PLACEBEFORE);
    dummieGroup.remove();

    // text, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization
    var textLabel = addText(textLabel, xPosition - radius / 2, yPosition + radius, "topcenter", 16, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.RIGHT, TextCase.ALLCAPS); // selectedSetting, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization
    textLabel.rotate(-90, AnchorPosition.TOPCENTER);
    textLabel.move(colorGradeGroup, ElementPlacement.INSIDE);
    var hueLabel = addText(hue.displayName + hue.settingValue, xPosition, yPosition + radius * 2.5, "topleft", 16, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.LEFT, TextCase.ALLCAPS);
    hueLabel.move(colorGradeGroup, ElementPlacement.INSIDE);
    var saturationLabel = addText(saturation.displayName + saturation.settingValue, xPosition + radius, yPosition + radius * 2.5, "topcenter", 16, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.CENTER, TextCase.ALLCAPS);
    saturationLabel.move(colorGradeGroup, ElementPlacement.INSIDE);
    var luminanceLabel = addText(luminance.displayName + luminance.settingValue, xPosition + radius * 2, yPosition + radius * 2.5, "topright", 16, "FFFFFF", "WorkSansRoman-Medium", 100, Justification.RIGHT, TextCase.ALLCAPS);
    luminanceLabel.move(colorGradeGroup, ElementPlacement.INSIDE);

    return colorGradeGroup;

}

function createUneditedCopy (docRef) {

    var sourceFilePath = docRef.fullName.fsName;
    var sourceFileExtension = sourceFilePath.substr(sourceFilePath.lastIndexOf(".") + 1, sourceFilePath.length);
    sourceFile = new File(sourceFilePath);

    var targetFilePath = docRef.fullName.fsName.substr(0, docRef.fullName.fsName.lastIndexOf('.')) + '_unedited.' + sourceFileExtension;
    targetFile = new File(targetFilePath);

    sourceFile.copy(targetFile);

    // Update Values
    var resetParametersArray = [
        temperature, tint, exposure,highlights,shadows,whites,blacks,
        texture,clarity,dehaze,vibrance,saturation,
        redHue,orangeHue,yellowHue,greenHue,aquaHue,blueHue,purpleHue,magentaHue,
        redSaturation,orangeSaturation,yellowSaturation,greenSaturation,aquaSaturation,blueSaturation,purpleSaturation,magentaSaturation,
        redLuminance,orangeLuminance,yellowLuminance,greenLuminance,aquaLuminance,blueLuminance,purpleLuminance,magentaLuminance,
        midtoneHue,midtoneSat,midtoneLum,shadowHue,shadowSat,shadowLum,highlightHue,highlightSat,highlightLum,
        globalHue,globalSat,globalLum,blending,balance,
        sharpeningAmount,sharpeningDetail,sharpeningMasking,sharpeningRadius,
        luminanceNoiseReduction,colorNoiseReduction,colorNoiseReductionDetail,colorNoiseReductionSmoothness,
        grainAmount,grainSize,grainFrequency,
        shadowTintCalibration,redHueCalibration,redSaturationCalibration,greenHueCalibration,greenSaturationCalibration,blueHueCalibration,blueSaturationCalibration
    ]

    if(sourceFileExtension == "dng"){

        resetSettings ( targetFilePath, resetParametersArray );

    }   else    {

        var sourceSidecarFilePath = sourceFilePath.substr(0, sourceFilePath.lastIndexOf(".")) + '.xmp';
        sourceSidecarFile = new File(sourceSidecarFilePath);
        sourceSidecarFile.close();

        var targetSidecarFilePath = sourceFilePath.substr(0, sourceFilePath.lastIndexOf(".")) + '_unedited.xmp';
        targetSidecarFile = new File(targetSidecarFilePath);
        sourceSidecarFile.close();

        sourceSidecarFile.copy(targetSidecarFile);

        resetSettings ( targetSidecarFilePath, resetParametersArray );

    }

    placeFile(targetFile);

}

function resetSettings (filePath, settingsArray) {


    

    var xmpMeta = xmpMetaInitial;

    for (i = 0; i < settingsArray.length; i ++) {
        
        var setting = settingsArray[i];

        xmpMeta.setProperty(ns, setting.crsName, setting.defaultValue);

        setting.isCustom = false;

    }

    var xmpFile = new XMPFile (filePath, XMPConst.FILE_UNKNOWN, XMPConst.OPEN_FOR_UPDATE);

    var canPut = xmpFile.canPutXMP(xmpMeta.serialize())

    xmpFile.putXMP(xmpMeta.serialize());
    xmpFile.closeFile();

}

function placeFile (file) {

    var desc = new ActionDescriptor();

    desc.putPath(charIDToTypeID('null'), file);

    desc.putEnumerated(charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa'));
        
        var offsetDesc = new ActionDescriptor();
        
        offsetDesc.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0.000000);
        
        offsetDesc.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0.000000);
    
    desc.putObject(charIDToTypeID('Ofst'),  charIDToTypeID('Ofst'), offsetDesc);
    
    executeAction(charIDToTypeID('Plc '), desc, DialogModes.NO);

}