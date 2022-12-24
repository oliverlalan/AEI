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
var toneCurve                     =  new Setting ( "Tone Curve",           "ToneCurvePV2012",                     -0,     +255    );
var toneCurveRed                  =  new Setting ( "Red Tone Curve",       "ToneCurvePV2012Red",                  -0,     +255    );
var toneCurveGreen                =  new Setting ( "Green Tone Curve",     "ToneCurvePV2012Green",                -0,     +255    );
var toneCurveBlue                 =  new Setting ( "Blue Tone Curve",      "ToneCurvePV2012Blue",                 -0,     +255    );

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
addCurves(toneCurve.settingValue, 2, 255, 255, 255); // array of points | stroke width | rgb_red | rgb_green | rgb_blue
addCurves(toneCurveRed.settingValue, 2, 201, 67, 10);
addCurves(toneCurveGreen.settingValue, 2, 25, 128, 76);
addCurves(toneCurveBlue.settingValue, 2, 0, 151, 194);

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

function addCurves(p, w, c_r, c_g, c_b) {

    var pX = []         // x values
    var pY = []         // y values
    var pYs = []        // values for smooth y
    var pK =  []        // derivative values

    for (i = 0; i < p.length; i ++) {
        pX.push(p[i][0]);
        pY[i] = p[i][1];
        pK[i] = 1;
    }

    getNaturalKs(pX, pY, pK);

    for (i = 0; i < 256; i ++) {
        pYs.push(evalSpline (i, pX, pY, pK));
    }

    var smoothCurve = [];

    for (i = 0; i < 256; i ++) {
        smoothCurve.push([i, pYs[i]]);
    }

    // Store doc dimensions
    var docRef = app.activeDocument;
    var docHeight = docRef.height;
    var docWidth = docRef.width;

    // Path definition
    var toneCurvePathArray = new Array();

    var lineArray = new Array()

    for (i = 0; i < smoothCurve.length * 2 -1; i++) {

        if( i < smoothCurve.length ) {
            var curvePointIndex = i;
        } else {
            var curvePointIndex = 2 * (smoothCurve.length-1) - i + 1 ;
        }

        lineArray[i] = new PathPointInfo
        lineArray[i].kind = PointKind.SMOOTHPOINT
        lineArray[i].anchor = Array(smoothCurve[curvePointIndex][0], 255 - smoothCurve[curvePointIndex][1])
        lineArray[i].leftDirection = lineArray[i].anchor
        lineArray[i].rightDirection = lineArray[i].anchor
        lineArray[i+1] = new PathPointInfo
        lineArray[i+1].kind = PointKind.SMOOTHPOINT

        if( i < smoothCurve.length -1 ) {
            lineArray[i+1].anchor = Array(smoothCurve[curvePointIndex+1][0], 255 - smoothCurve[curvePointIndex+1][1])
        } else {
            lineArray[i+1].anchor = Array(smoothCurve[curvePointIndex-1][0], 255 - smoothCurve[curvePointIndex-1][1])
        }

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

    setStroke (c_r, c_g, c_b, w);
    
    myPathItem.remove();

    app.activeDocument.activeLayer.rasterize(RasterizeType.SHAPE);

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
