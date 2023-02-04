#target photoshop

ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
var ns = XMPConst.NS_CAMERA_RAW //"http://ns.adobe.com/camera-raw-settings/1.0/"; // Found in xmp header

// Doc info
var docRef = app.activeDocument;
var docRefPath = docRef.path;
var docRefName = refLayerName = docRef.name.substr(0, docRef.name.lastIndexOf('.'));
docRef.activeLayer.name = docRefName;

// Preset info
var presetInfo = findPresetInfoInKeywords();
var presetName = presetInfo.presetName;
var presetPackName = presetInfo.presetPackName;

// Paths
var logosPath = "/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram%20Photos/Assets/Logos/"
var iconsPath = "/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram%20Photos/Assets/Icons/"
// var logosPath = activeDocument.path + "/../../Assets/Logos/";
// var iconsPath = activeDocument.path + "/../../Assets/Icons/";

// Default parameters
var anchorPosition = "topleft";
var fontSize = 18;
var fontHexColor = "FFFFFF";
var fontName = "WorkSansRoman-Medium";
var fontTracking = 100;
var fontJustification = Justification.LEFT;
var fontCapitalization = TextCase.ALLCAPS;

var fillColor = "8C8C8C";
var strokeColor = "FFFFFF";
var strokeWidth = 2;

var maskVisibleColor = "000000";
var maskInvisibleColor = "FFFFFF";

var darkGlassDesign = "full";

var panelBackgroundOpacity = 65;
var panelBackgroundDesign = "vertical-3/8";


var targetWidth = 1080;
var targetHeight = 1350;

var blurPixelRadius = targetWidth / 216;
var noiseAmount = 3;
var toneCurveMaxOutput = 90;


// Photo parameters
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
var toneCurve                     =  new Setting ( "Lum Tone Curve",       "ToneCurvePV2012",                     0,      +255    , [[0,0], [255,255]]);
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
var blueSaturationCalibration     =  new Setting ( "Blue Saturatmetersion",      "BlueSaturation",                      -100,   +100    , 0);




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Playground

// addPrintedPhoto(app.activeDocument.activeLayer);
// var refLayerName = "Layer 0"
// addBasicPanel();
// addColorMixerPanel();
// addColorGradingPanel();
// addToneCurvesPanel();
// exportDocumentsAsPNG(undefined, docRefPath);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Original
openAsLayer(docRef);
convertColorProfileToSRGB(docRef);

// Unedited
var uneditedFile = createUneditedCopy(docRef);
var docRef_unedited = app.open(targetFile, OpenDocumentType.CAMERARAW, false);
openAsLayer(docRef_unedited);
app.activeDocument.activeLayer.name = docRefName;
convertColorProfileToSRGB(docRef_unedited);

// Original - Instagram version
var docRef_before = duplicateDocument(docRef_unedited, "resizedToFit_before");
resizeImageToFitCanvas(docRef_before, targetWidth, targetHeight);

// Unedited - Instagram version
var docRef_after = duplicateDocument(docRef, "resizedToFit_after");
resizeImageToFitCanvas(docRef_after, targetWidth, targetHeight);

// Unedited - printedPhoto version
var docRef_printedPhoto = duplicateDocument(docRef, "printedPhoto");
resizeImageToFitCanvas(docRef_printedPhoto, targetWidth, targetHeight);
addPrintedPhoto(docRef_printedPhoto.activeLayer);

// Resize to desired working size
resizeImageToFillCanvas(docRef, targetWidth, targetHeight);
resizeImageToFillCanvas(docRef_unedited, targetWidth, targetHeight);

// Create beforeAfter_split_horizontal version
var docRef_beforeAfter_split_horizontal = duplicateDocument(docRef, "beforeAfter_split_horizontal");
copyActiveLayerFromSourceToTarget(docRef_unedited, docRef_beforeAfter_split_horizontal);
addMask('horizontal');
addBeforeAfterLabels ('horizontal');
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);

// Create beforeAfter_split_vertical version
var docRef_beforeAfter_split_vertical = duplicateDocument(docRef, "beforeAfter_split_vertical");
copyActiveLayerFromSourceToTarget(docRef_unedited, docRef_beforeAfter_split_vertical);
addMask('vertical');
addBeforeAfterLabels ('vertical');
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);

// Create beforeAfter_split_diagonal version
var docRef_beforeAfter_split_diagonal = duplicateDocument(docRef, "beforeAfter_split_diagonal");
copyActiveLayerFromSourceToTarget(docRef_unedited, docRef_beforeAfter_split_diagonal);
addMask('diagonal');
addBeforeAfterLabels ('diagonal');
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);

// Create beforeAfter_sideBySide_horizontal version
var docRef_beforeAfter_sideBySide_horizontal = duplicateDocument(docRef, "beforeAfter_sideBySide_horizontal");
resizeLayerToFillDimensions(activeDocument.activeLayer, targetWidth, targetHeight / 2);
translateLayerTo(activeDocument.activeLayer, targetWidth / 2, targetHeight * 3 / 4, "middlecenter");
copyActiveLayerFromSourceToTarget(docRef_unedited, docRef_beforeAfter_sideBySide_horizontal);
resizeLayerToFillDimensions(activeDocument.activeLayer, targetWidth, targetHeight / 2);
translateLayerTo(activeDocument.activeLayer, targetWidth / 2, targetHeight / 4, "middlecenter");
addMask('horizontal');
addBeforeAfterLabels ('horizontal');
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);

// Create beforeAfter_sideBySide_vertical version
var docRef_beforeAfter_sideBySide_vertical = duplicateDocument(docRef, "beforeAfter_sideBySide_vertical");
resizeLayerToFillDimensions(activeDocument.activeLayer, targetWidth / 2, targetHeight);
translateLayerTo(activeDocument.activeLayer, targetWidth * 3 / 4, targetHeight / 2, "middlecenter");
copyActiveLayerFromSourceToTarget(docRef_unedited, docRef_beforeAfter_sideBySide_vertical);
resizeLayerToFillDimensions(activeDocument.activeLayer, targetWidth / 2, targetHeight);
translateLayerTo(activeDocument.activeLayer, targetWidth / 4, targetHeight / 2, "middlecenter")
addMask('vertical');
addBeforeAfterLabels ('vertical');
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);

// Create panel_basic version
var docRef_panel_basic = duplicateDocument(docRef, "panel_basic");
addDarkGlassLayer(undefined, "leftsidebar");
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);
var basicPanelGroup = addBasicPanel();

// Create panel_toneCurve version
var docRef_panel_toneCurves = duplicateDocument(docRef, "panel_toneCurves");
addDarkGlassLayer(undefined, "leftsidebar");
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);
var toneCurvesPanelGroup = addToneCurvesPanel();

// Create panel_colorMixer version
var docRef_panel_colorMixer = duplicateDocument(docRef, "panel_colorMixer");
addDarkGlassLayer(undefined, "leftsidebar");
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);
var colorMixerPanelGroup = addColorMixerPanel();

// Create panel_colorGrading version
var docRef_panel_colorGrading = duplicateDocument(docRef, "panel_colorGrading");
addDarkGlassLayer(undefined, "leftsidebar");
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);
var colorGradingPanelGroup = addColorGradingPanel();

// Create panel_all version
var docRef_panel_all = duplicateDocument(docRef, "panel_all");
addDarkGlassLayer(undefined, "center");
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);
var allPanelsGroup = addAllPanels();

// Create preset_info version
var docRef_preset = duplicateDocument(docRef, "preset");
addDarkGlassLayer(undefined, "center");
var presetInfoGroup = addPresetInfo();

// Create photo_context version
var docRef_photoContext = duplicateDocument(docRef, "photoContext");
addDarkGlassLayer(undefined, "center");
var photoContextGroup = addPhotoContext();

// Create camera_settings version



// Edit metadata
// var docRef_metadata = duplicateDocument(docRef, "metadata");
// makeDarkerNoisierBlurier(docRef_metadata, 10, 2, 128);
// addMetadataList([272, 42036, 37377, 37378, 34855, 37386, 'location', 'date', 'caption'], fontSize, textColor, fontName, fontTracking);
// addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);
// exportCopyAsPNG(docRef_metadata, docRefPath, undefined,  "instagram_", undefined)


// Export copies
var docsToExport = [uneditedFile, docRef_before, docRef_after, docRef_beforeAfter_sideBySide_horizontal, docRef_beforeAfter_sideBySide_vertical, docRef_beforeAfter_split_diagonal, docRef_beforeAfter_split_horizontal, docRef_beforeAfter_split_vertical, docRef_panel_basic, docRef_panel_toneCurves, docRef_panel_colorGrading, docRef_panel_colorMixer];
exportDocumentsAsPNG(undefined, docRefPath);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getDocumentKeywords() {

    var lns = "http://ns.adobe.com/lightroom/1.0/";
    var xmpMeta = new XMPMeta(app.activeDocument.xmpMetadata.rawData);
    var keywords = [];

    for (var i = 1; i <= xmpMeta.countArrayItems(lns, "hierarchicalSubject"); i++) { 

        keywords.push(xmpMeta.getArrayItem(lns, "hierarchicalSubject", i).toString());

    }

    return keywords;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getDocumentProperty(propertyName) {

    var propertyValue;
    var doc = app.activeDocument;

    // Exif entry index (Variable and Value) for the desired propertyName as defined in https://web.archive.org/web/20190624045241if_/http://www.cipa.jp:80/std/documents/e/DC-008-Translation-2019-E.pdf
    try{

        var exifPropertyValue = getExifPropertyValueByExifPropertyName(propertyName);

    }   catch (e)   {}

    switch (propertyName) {

        case 'Location':

            if(doc.info.city == "" && doc.info.country == "") {

                propertyValue   = "";

            } else if (doc.info.city == "") {

                propertyValue   = doc.info.country;

            } else {

                propertyValue   = doc.info.city + ", " + doc.info.country;

            }

        break;

        case 'GPS':

            propertyValue   = getExifPropertyValueByExifPropertyName("GPS Latitude") + getExifPropertyValueByExifPropertyName("GPS Latitude Ref") + getExifPropertyValueByExifPropertyName("GPS Longitude") + getExifPropertyValueByExifPropertyName("GPS Longitude Ref");
        
        break;
        
        case 'Date':

            if(doc.info.creationDate=="") {
                
                propertyValue= "";

            } else {

                var dateString = doc.info.creationDate;
                var year = dateString.substring(0,4);
                var month = parseInt(dateString.substring(4,6));
                var day = parseInt(dateString.substring(6,8)).toString();

                propertyValue= returnMonth(month, "English") + " - " + year;

            }

        break;

        case 'Headline':
            propertyValue= doc.info.headline;
        break;

        case 'Caption':
            propertyValue= doc.info.caption;
        break;

        case "ISO Speed Ratings":
            propertyValue= "ISO " + exifPropertyValue;
        break;

        case "Model": // Camera model

            switch (exifPropertyValue) {

                case "ILCE-6400":
                    propertyValue= "Sony A6400";
                break;

                case "Sony A7IV":
                    propertyValue= "Sony A7 Mark IV";
                break;

                case "ILCE-7M4":
                    propertyValue= "Sony A7 Mark IV";
                break;

                case "NIKON D610":
                    propertyValue= "Nikon D610";
                break;

                default:
                    propertyValue= exifPropertyValue;
                break;

            }

        break;

        case "EXIF tag 42036": // Lens Model

            switch (exifPropertyValue) {
                
                case "E 17-28mm F2.8-2.8":
                    propertyValue= "Tamron 17-28 F2.8";
                break;

                case "SAMYANG AF 35mm F2.8":
                    propertyValue= "Samyang 35 F2.8";
                break;

                case "16mm F1.4 DC DN | Contemporary 017":
                    propertyValue= "Sigma 16 F1.4";
                break;

                case "FE 85mm F1.8":
                    propertyValue= "Sony 85 F1.8";
                break;

                case "E 35-150mm F2.0-F2.8 A058":
                    propertyValue= "Tamron 35-150 F2-2.8";
                break;

                case ("35.0 mm f/1.8" || "TAMRON SP 35mm F1.8 Di VC USD F012N"):
                    propertyValue= "Tamron 35 F1.8";
                break;

                case "50.0 mm f/1.4":
                    propertyValue= "Nikon 50 F1.4";
                break;

                case "11.0-16.0 mm f/2.8":
                    propertyValue= "Tokina 11-16 F2.8";
                break;

                case "24.0-70.0 mm f/2.8":
                    propertyValue= "Tamron 24-70 F2.8";
                break;

                case ("70.0-200.0 mm f/2.8" || "TAMRON SP 70-200mm F2.8 Di VC USD A009N"):
                    propertyValue= "Tamron 70-200 F2.8";
                break;

                default:
                    propertyValue= exifPropertyValue;
                break;
            }

        break;

        default: // Other camera parameters

            propertyValue = exifPropertyValue;

        break;

    }

    return propertyValue;

    function getExifPropertyValueByExifPropertyName ( targetPropertyName ) {
        
        exifProperties = app.activeDocument.info.exif;

        for (var i = 0; i < exifProperties.length; i++) {

            var exifProperty = exifProperties[i];
            var exifPropertyName = exifProperty[0];
            var exifPropertyValue = exifProperty[1].replace(/(\r\n|\n|\r)/gm, "");

            if (exifPropertyName == targetPropertyName) return exifPropertyValue;

        }

    }

    function returnMonth(monthNumber, language) {

        var month = new Array();

        switch(language) {

            case "Spanish":
                month[0] = "Unknown";
                month[1] = "Enero"	;
                month[2] = "Febrero";
                month[3] = "Marzo";
                month[4] = "Abril";
                month[5] = "Mayo";
                month[6] = "Junio";
                month[7] = "Julio";
                month[8] = "Agosto";
                month[9] = "Septiembre";
                month[10] = "Octubre";
                month[11] = "Noviembre";
                month[12] = "Diciembre";
            break;
            
            case "English":
                month[0] = "Unknown";
                month[1] = "January"	;
                month[2] = "February";
                month[3] = "March";
                month[4] = "April";
                month[5] = "May";
                month[6] = "June";
                month[7] = "July";
                month[8] = "August";
                month[9] = "September";
                month[10] = "October";
                month[11] = "November";
                month[12] = "December";
            break;

        }

        

        return month[monthNumber];

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function findPresetInfoInKeywords () {

    var docKeywords = getDocumentKeywords();

    for (var i=0; i<docKeywords.length; i++) {

        if(docKeywords[i].match("Preset")) var presetInfo = docKeywords[i] break;

    }

    if(presetInfo == undefined) {
        var presetPackName = "Unknown";
        var presetName = "Unknown";
    }   else{
        var presetPackName = presetInfo.split("|")[1];
        var presetName = presetInfo.split("|")[2];
    }


    return { 
        'presetPackName': presetPackName, 
        'presetName': presetName
    };

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Setting(displayName, crsName, min, max, defaultValue) {

    var xmpMeta = new XMPMeta(app.activeDocument.xmpMetadata.rawData);

    this.displayName = displayName;
    this.crsName = crsName;
    this.min = min;
    this.max = max;
    this.settingValue = [];
    this.defaultValue = [];
    this.interpolatedValues = [];

    if(this.crsName.match("ToneCurvePV2012")) {


        for (var i = 0; i < xmpMeta.countArrayItems(ns,this.crsName); i++) { 

            var inputValue  = parseInt(xmpMeta.getArrayItem(ns, this.crsName, i + 1).value.split(", ")[0]);
            var outputValue = parseInt(xmpMeta.getArrayItem(ns, this.crsName, i + 1).value.split(", ")[1]);
            this.settingValue.push([inputValue, outputValue]);

            var defaultInputValue = inputValue;
            var defaultOutputValue = defaultInputValue;
            this.defaultValue.push([defaultInputValue, defaultOutputValue]);

            var interpolatedInputValue = interpolateValues(defaultInputValue, inputValue, 30, 2);
            var interpolatedOutputValue = interpolateValues(defaultOutputValue, outputValue, 30, 2);
            this.interpolatedValues.push([interpolatedInputValue, interpolatedOutputValue]);

        }

        if (arraysEqual(this.settingValue, this.defaultValue)) {

            this.isCustom = false;

        } else {

            this.isCustom = true;

        }

    } else {
        
        this.settingValue = xmpMeta.getProperty(ns, this.crsName);
        this.defaultValue = defaultValue;
        this.interpolatedValues = interpolateValues(this.defaultValue, this.settingValue, 30, 2);

        if (this.settingValue == this.defaultValue) {

            this.isCustom = false;

        } else {

            this.isCustom = true;

        }

    }

    function interpolateValues (initialValue, finalValue, steps, interpolationAlpha) {

        var interpolatedValues = [];

        for(var i = 0; i < steps; i ++) {

            var step = i / (steps - 1);

            // ease-in-out function taken from math.stackexchange.com
            var interpolationFormula = Math.pow(step, interpolationAlpha) / (Math.pow(step, interpolationAlpha) + Math.pow((1 - step), interpolationAlpha));

            interpolatedValues[i] = initialValue + (finalValue - initialValue) * interpolationFormula;

        }  

        return interpolatedValues;
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

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function openAsLayer(docRef) {

    if ( app.documents.length > 0 ) {
        var doc = docRef;
        if ( doc.layers.length == 1 && doc.activeLayer.isBackgroundLayer ) {

            doc.activeLayer.isBackgroundLayer = false;
            doc.activeLayer.name = doc.name;

        }

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function convertColorProfileToSRGB (docRef) {

    docRef.convertProfile("sRGB IEC61966-2.1", Intent.RELATIVECOLORIMETRIC, true, false);

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function exportDocumentsAsPNG (documentsArray, path) {

    if(documentsArray == undefined) documentsArray = app.documents;

    for (var i = 0; i < documentsArray.length; i ++) {

        exportCopyAsPNG(documentsArray[i], docRefPath, undefined);

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function exportCopyAsPNG(selectedDocument, filePath, fileName, filePreffix, fileSuffix) {

    app.activeDocument = selectedDocument;

    if (filePath === undefined) {
       filePath = selectedDocument.path;
    }

    if (fileName === undefined) {
        fileName = selectedDocument.name;
    }

    if (fileSuffix !== undefined) {
        fileName = fileName + "_" + fileSuffix;
    }

    if (filePreffix !== undefined) {
        fileName = filePreffix + fileName;
    }

    convertColorProfileToSRGB(selectedDocument);

    var saveIn = File(filePath + "/" + fileName + ".png");

    var saveOptions = new ExportOptionsSaveForWeb;
    saveOptions.format = SaveDocumentType.PNG;
    saveOptions.PNG8 = false;
    saveOptions.transparency = true;
    saveOptions.interlaced = false;
    saveOptions.includeProfile = true;

    selectedDocument.exportDocument(saveIn, ExportType.SAVEFORWEB, saveOptions);

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createUneditedCopy (docRef) {

    var sourceFilePath = docRef.fullName.fsName;
    var sourceFileExtension = sourceFilePath.substr(sourceFilePath.lastIndexOf(".") + 1, sourceFilePath.length);
    sourceFile = new File(sourceFilePath);

    var targetFilePath = docRef.fullName.fsName.substr(0, docRef.fullName.fsName.lastIndexOf('.')) + '_unedited.' + sourceFileExtension;
    targetFile = new File(targetFilePath);

    sourceFile.copy(targetFile);

    if(sourceFileExtension != "dng") {

        var sourceSidecarFilePath = sourceFilePath.substr(0, sourceFilePath.lastIndexOf(".")) + '.xmp';
        sourceSidecarFile = new File(sourceSidecarFilePath);
        sourceSidecarFile.close();

        var targetSidecarFilePath = sourceFilePath.substr(0, sourceFilePath.lastIndexOf(".")) + '_unedited.xmp';
        targetSidecarFile = new File(targetSidecarFilePath);
        sourceSidecarFile.close();

        sourceSidecarFile.copy(targetSidecarFile);

    }

    // Update Values
    var resetParametersArray = [
        exposure,contrast,highlights,shadows,whites,blacks,
        texture,clarity,dehaze,vibrance,saturation,
        toneCurve, toneCurveRed, toneCurveGreen, toneCurveBlue,
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

    resetSettings ( targetFilePath, resetParametersArray );

    return targetFile;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function resetSettings (filePath, settingsArray) {

    var filePathExtension = filePath.substr(filePath.lastIndexOf(".") + 1, filePath.length);

    if(filePathExtension == "dng") {

        xmpMeta = new XMPMeta(app.activeDocument.xmpMetadata.rawData);

        for (i = 0; i < settingsArray.length; i ++) {

            if ( settingsArray[i].crsName.match("ToneCurvePV2012") ){

                for (j=0; j<settingsArray[i].settingValue.length; j++) {

                    xmpMeta.setArrayItem(ns, settingsArray[i].crsName, j+1, settingsArray[i].settingValue[j][0] + ", " + settingsArray[i].settingValue[j][0]);

                }

            } else {

                xmpMeta.setProperty(ns, settingsArray[i].crsName, settingsArray[i].defaultValue);

            }

            settingsArray[i].isCustom = false;

        }

        var xmpFile = new XMPFile (filePath, XMPConst.FILE_UNKNOWN, XMPConst.OPEN_FOR_UPDATE);

        xmpFile.putXMP(xmpMeta.serialize());
        xmpFile.closeFile();

    }   else    {

        var xmpFilePath = filePath.substr(0, filePath.lastIndexOf(".")) + '.xmp';
        xmpFile = new File(xmpFilePath);

        xmpFile.open('r');
        xmpFile.encoding = 'UTF8';
        xmpFile.lineFeed = 'unix';
        xmpFile.open('r', "TEXT", "????");

        var xmpInitial = xmpFile.read();
        xmpFile.close();

        xmpMeta = new XMPMeta (xmpInitial);

        for (i = 0; i < settingsArray.length; i ++) {

            if ( settingsArray[i].crsName.match("ToneCurvePV2012") ){

                for (j=0; j<settingsArray[i].settingValue.length; j++) {

                    xmpMeta.setArrayItem(ns, settingsArray[i].crsName, j+1, settingsArray[i].settingValue[j][0] + ", " + settingsArray[i].settingValue[j][0]);

                }

            } else {

                xmpMeta.setProperty(ns, settingsArray[i].crsName, settingsArray[i].defaultValue);

            }

            settingsArray[i].isCustom = false;

        }

        xmpFile.open('w');
        xmpFile.encoding = 'UTF8';
        xmpFile.lineFeed = 'unix';
        xmpFile.write(xmpMeta.serialize());
        xmpFile.close();

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function duplicateDocument (selectedDocument, documentSuffix) {

    var fullFileName = selectedDocument.name;
    var fileName = fullFileName.substr(0, fullFileName.lastIndexOf("."));
    var fileExtension = fullFileName.substr(fullFileName.lastIndexOf("."), fullFileName.length);
    
    if(documentSuffix) {

        fileName = fileName + "_" + documentSuffix;

    }
    
    var duplicatedDocument = selectedDocument.duplicate(fileName);
    duplicatedDocument.activeLayer.isBackgroundLayer = false;

    return duplicatedDocument;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function resizeImageToFillCanvas(selectedDocument, targetCanvasWidth, targetCanvasHeight) {

    var targetCanvasWidth = new UnitValue(targetCanvasWidth, 'px');
    var targetCanvasHeight = new UnitValue(targetCanvasHeight, 'px');

    activeDocument = selectedDocument;

    var doc = selectedDocument;

    var docHeight = doc.height.value;
    var docWidth = doc.width.value;
    var docAspectRatio = docWidth / docHeight;

    var targetCanvasAspectRatio = targetCanvasWidth / targetCanvasHeight; 

    if(targetCanvasAspectRatio < docAspectRatio) {
        var targetHeight = targetCanvasHeight;
        var targetWidth = targetHeight * docAspectRatio;
    } else {
        var targetWidth = targetCanvasWidth;
        var targetHeight = targetWidth / docAspectRatio;
    }

    doc.resizeImage(targetWidth, targetHeight, 72, ResampleMethod.AUTOMATIC);

    doc.resizeCanvas(targetCanvasWidth, targetCanvasHeight);

    runMenuItem(app.charIDToTypeID("FtOn"));

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function resizeImageToFitCanvas(selectedDocument, targetCanvasWidth, targetCanvasHeight) {

    activeDocument = selectedDocument;

    var doc = selectedDocument;

    var docHeight = doc.height.value;
    var docWidth = doc.width.value;
    var docAspectRatio = docWidth / docHeight;

    var targetCanvasAspectRatio = targetCanvasWidth / targetCanvasHeight; 

    if(targetCanvasAspectRatio > docAspectRatio) {
        var targetHeight = targetCanvasHeight;
        var targetWidth = targetHeight * docAspectRatio;
    } else {
        var targetWidth = targetCanvasWidth;
        var targetHeight = targetWidth / docAspectRatio;
    }

    doc.resizeImage(targetWidth, targetHeight, 72, ResampleMethod.AUTOMATIC);

    doc.resizeCanvas(targetCanvasWidth, targetCanvasHeight);

    runMenuItem(app.charIDToTypeID("FtOn"));

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function copyActiveLayerFromSourceToTarget(sourceDocument, targetDocument) {

    app.activeDocument = sourceDocument;

    sourceDocument.activeLayer.duplicate(targetDocument.activeLayer, ElementPlacement.PLACEBEFORE);

    app.activeDocument = targetDocument;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addMask(fillShape){

    try {

        makeSelection(fillShape);
        addLayerMask();

    }   catch (e)   {

        deleteLayerMask(true);

    }

    function makeSelection (fillDesign) {

        // Store doc dimensions
        var docRef = app.activeDocument;
        var docHeight = docRef.height;
        var docWidth = docRef.width;

        //(topleft, bottomleft, bottomright, topright)
        switch (fillDesign) {

            case 'horizontal':
            var shapeRef = [ [0, 0], [0, docHeight/2], [docWidth, docHeight / 2], [docWidth, 0]];
            break;

            case 'vertical':
            var shapeRef = [ [0, 0], [docWidth/2, 0], [docWidth/2, docHeight], [0, docHeight]];
            break;

            case 'diagonal':
            var shapeRef = [ [0, 0], [docWidth, 0], [0, docHeight]]; //TODO: path?
            break;

            case 'vertical-3/8':
            var shapeRef = [ [0, 0], [docWidth * 3 / 8, 0], [docWidth * 3 / 8, docHeight], [0, docHeight]];
            break;

        }
        
        app.activeDocument.selection.select(shapeRef);

    }

    function addLayerMask() {

        var descriptor = new ActionDescriptor();
        var reference = new ActionReference();

        descriptor.putClass( stringIDToTypeID( "new" ), stringIDToTypeID( "channel" ));
        reference.putEnumerated( stringIDToTypeID( "channel" ), stringIDToTypeID( "channel" ), stringIDToTypeID( "mask" ));
        descriptor.putReference( stringIDToTypeID( "at" ), reference );
        descriptor.putEnumerated( stringIDToTypeID( "using" ), charIDToTypeID( "UsrM" ), stringIDToTypeID( "revealSelection" ));
        executeAction( stringIDToTypeID( "make" ), descriptor, DialogModes.NO );

    }

    function deleteLayerMask(apply) {

        var descriptor = new ActionDescriptor();
        var reference = new ActionReference();

        reference.putEnumerated( stringIDToTypeID( "channel" ), stringIDToTypeID( "channel" ), stringIDToTypeID( "mask" ));
        descriptor.putReference( stringIDToTypeID("null"), reference );
        descriptor.putBoolean( stringIDToTypeID( "apply" ), apply );
        executeAction( stringIDToTypeID( "delete" ), descriptor, DialogModes.NO );

    }

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function makeClippingMask (selectedLayer) {

    app.activeDocument.activeLayer = selectedLayer;

    var desc = new ActionDescriptor();
    var ref = new ActionReference();

    ref.putEnumerated( charIDToTypeID( "Lyr " ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
    desc.putReference( charIDToTypeID( "null" ), ref );

    executeAction( charIDToTypeID( "GrpL" ), desc, DialogModes.NO );

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addFile (filePath) {

    file = new File(filePath);

    var desc = new ActionDescriptor();
    desc.putPath(charIDToTypeID('null'), file);
    executeAction(charIDToTypeID('Plc '), desc, DialogModes.NO);

    return app.activeDocument.activeLayer;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function placeFile(filePath, relativeTargetHeight, xPosition, yPosition, anchorPosition) {

    var file = new File(filePath);
    layer = addFile(file);

    /// Resize layer
    var layerRelativeHeight = new UnitValue(layer.bounds[3].value - layer.bounds[1].value, 'px') / app.activeDocument.height;
    var resizeRatio = relativeTargetHeight / layerRelativeHeight * 100 ;
    layer.resize(resizeRatio, resizeRatio, AnchorPosition.MIDDLECENTER);

    translateLayerTo(layer, xPosition, yPosition, anchorPosition);

    return layer;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Translates selectedLayer to given position

function translateLayerTo(selectedLayer, xPosition, yPosition, anchorPosition) {

    xPosition = new UnitValue (xPosition, 'px');
    yPosition = new UnitValue (yPosition, 'px');

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function resizeLayerToFillDimensions (selectedLayer, placeholderWidth, placeholderHeight) {

    var placeholderWidth = new UnitValue (placeholderWidth, 'px');
    var placeholderHeight = new UnitValue (placeholderHeight, 'px');
    var placeholderAspectRatio = placeholderWidth / placeholderHeight;

    // Resize layers
    var layerWidth = new UnitValue(selectedLayer.bounds[2].value - selectedLayer.bounds[0].value, 'px');
    var layerHeight = new UnitValue(selectedLayer.bounds[3].value - selectedLayer.bounds[1].value, 'px');
    var layerAspectRatio = layerWidth / layerHeight;

    if(placeholderAspectRatio < layerAspectRatio) {

        var resizeRatio = placeholderHeight / layerHeight * 100;

    } else {

        var resizeRatio = placeholderWidth / layerWidth * 100;

    }

    activeDocument.artLayers.add().remove();

    selectedLayer.resize(resizeRatio, resizeRatio, AnchorPosition.MIDDLECENTER);

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// resizeLayerToFitDimensions (app.activeDocument.activeLayer, 1000, 1000);

function resizeLayerToFitDimensions (selectedLayer, placeholderWidth, placeholderHeight) {

    var placeholderWidth = new UnitValue (placeholderWidth, 'px');
    var placeholderHeight = new UnitValue (placeholderHeight, 'px');
    var placeholderAspectRatio = placeholderWidth / placeholderHeight;

    // Resize layers
    var layerWidth = new UnitValue(selectedLayer.bounds[2].value - selectedLayer.bounds[0].value, 'px');
    var layerHeight = new UnitValue(selectedLayer.bounds[3].value - selectedLayer.bounds[1].value, 'px');
    var layerAspectRatio = layerWidth / layerHeight;

    if(placeholderAspectRatio > layerAspectRatio) {

        var resizeRatio = placeholderHeight / layerHeight * 100;

    } else {

        var resizeRatio = placeholderWidth / layerWidth * 100;

    }

    activeDocument.artLayers.add().remove();

    selectedLayer.resize(resizeRatio, resizeRatio, AnchorPosition.MIDDLECENTER);

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function makeDarkerNoisierBlurier(selectedLayer, blurPixelRadius, noiseAmount, toneCurveMaxOutput) {

    if(selectedLayer == undefined) { selectedLayer = app.activeDocument.activeLayer }

    selectedLayer.applyGaussianBlur(blurPixelRadius);

    selectedLayer.adjustCurves([[0, 0], [255, toneCurveMaxOutput]]);

    selectedLayer.applyAddNoise(noiseAmount, NoiseDistribution.GAUSSIAN, true);

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addMetadataList(metadataList, fontSize, textColor, fontName, fontTracking) {

    var doc = activeDocument;

    // Look for group, if not defined, define
    var cameraSettingsGroupName = "Camera Settings";

    try {

        var cameraSettingsGroup = doc.layerSets.getByName(cameraSettingsGroupName);

    }
    catch (e) {

        var cameraSettingsGroup = doc.layerSets.add();
        cameraSettingsGroup.name = cameraSettingsGroupName;

    }

    for (i=0; i<metadataList.length; i++) {

        // deselectLayers();
        app.activeDocument.activeLayer = null

        if (contains(['location', 'date', 'caption' , 'headline'], metadataList[i])) {

            var includeIcon = false

        } else { 
            
            var includeIcon = true
            
        };

        addMetadata(metadataList[i], fontSize, textColor, fontName, fontTracking, includeIcon);
        moveMetadataGroup(metadataList[i]);

        // Moving the metadata group inside the camera settings group. There is a bug: https://stackoverflow.com/questions/38307871/photoshop-scripting-move-one-group-inside-of-other
        var metadataGroup = doc.layerSets.getByName(metadataList[i] + ' group')
        var dummieGroup = cameraSettingsGroup.layerSets.add();
        metadataGroup.move(dummieGroup, ElementPlacement.PLACEBEFORE);
        dummieGroup.remove();
    }

    function contains(a, obj) {

        for (var i = 0; i < a.length; i++) {

            if (a[i] === obj) {

                return true;

            }

        }

        return false;

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addMetadata (exifTag, fontSize, textColor, fontName, fontTracking, includeIcon) {

    var doc = activeDocument;

    // Create group layer
    var metadataGroup = doc.layerSets.add();
    metadataGroup.name = exifTag + ' group';

    if(includeIcon == true) {
        // Add iconLayer
        placeFile
        addIcon(exifTag, fontSize * 1.5);
        var iconLayer = doc.layers.getByName(exifTag + ' icon');

        // Compute metadataLayer position
        var iconTextSeparation = fontSize * 1.5 * 1.5;

        var iconLayer = doc.layers.getByName(exifTag + ' icon');
        var iconWidth = iconLayer.bounds[2] - iconLayer.bounds[0];
        var iconHeight = iconLayer.bounds[3] - iconLayer.bounds[1];
        var iconXPosition = iconLayer.bounds[0] + iconWidth / 2;
        var iconYPosition = iconLayer.bounds[1] + iconHeight / 2;
        var metadataXPosition = iconXPosition + iconTextSeparation;
        var metadataYPosition = iconYPosition;
        iconLayer.move(metadataGroup, ElementPlacement.INSIDE);

        // Add metadataLayer
        addMetadataValue(exifTag, fontSize, textColor, fontName, fontTracking);
        var metadataLayer = doc.layers.getByName(exifTag + ' metadata');

        // Move layer
        translateLayerTo(iconLayer, iconXPosition, iconYPosition, "middleright");
        translateLayerTo(metadataLayer, metadataXPosition, metadataYPosition, "middleleft");

    } else {
        // Add metadataLayer
        addMetadataValue(exifTag, fontSize, textColor, fontName, fontTracking);
        var metadataLayer = doc.layers.getByName(exifTag + ' metadata');
    }
    
    metadataLayer.move(metadataGroup, ElementPlacement.INSIDE);

    // Based on https://www.codeproject.com/Questions/882480/Place-Embedded-through-photoshop-scripting-Javascr
    function addIcon (exifTag, targetWidth) {

        // Document definition
        var doc = activeDocument;

        // Layer definition and renaming
        addFile(iconsPath + exifTag + ".svg");
        var iconLayer = doc.activeLayer;
        iconLayer.name = exifTag + ' icon';

        // Resize image
        var imageWidth = new UnitValue(iconLayer.bounds[2].value - iconLayer.bounds[0].value, 'px');
        var resizeRatio = targetWidth / imageWidth * 100;
        iconLayer.resize(resizeRatio, resizeRatio, AnchorPosition.MIDDLECENTER);

    }

    function addMetadataValue (exifTag, fontSize, textColor, fontName, fontTracking) {

        // Document selection
        var doc = activeDocument;

        // Layer definition
        var metadataLayer = doc.artLayers.add();
        metadataLayer.name = exifTag + ' metadata';
        metadataLayer.kind = LayerKind.TEXT;

        // Text Item definition
        var textItemRef = metadataLayer.textItem;
        textItemRef.size = fontSize; // There is a bug. textItem.size always converts "px" to "pt".  https://community.adobe.com/t5/photoshop-ecosystem-discussions/photoshop-script-change-textitem-size-javascript/td-p/11478075
        textItemRef.color = textColor;
        textItemRef.font = fontName;
        textItemRef.tracking = fontTracking;

        // Text content
        textItemRef.content = getDocumentProperty(exifTag);
        

        function resizeParagraphToFitBorders(textItem, leftMargin, topMargin, rightMargin, bottomMargin) {
            // Doc parameters calculation (%)
            // var docHeight = doc.height.value;
            // var docWidth = doc.width.value;
            // var targetWidth = (1 - rightMargin - leftMargin)* docWidth;
            // var targetHeight = (1 - bottomMargin - topMargin) * docHeight;
            var targetWidth = rightMargin - leftMargin;
            var targetHeight = bottomMargin - topMargin;

            // Resize text layer
            textItem.height = new UnitValue(targetHeight, 'pt');
            textItem.width = new UnitValue(targetWidth, 'pt');

            // Fit text in margins
            if(textItem.contents != "") {
                increaseLeadingToFitBox(activeDocument.activeLayer);
            }

            // Based on https://stackoverflow.com/questions/28990505/extendscript-how-to-check-whether-text-content-overflows-the-containing-rectang
            function increaseLeadingToFitBox(textLayer) {     
                textLayer.textItem.useAutoLeading = false;
                textLayer.textItem.leading = 300;

                var textBoxDimensions = getTextBoxDimensions(textLayer);

                textLayer.textItem.leading = new UnitValue(20, "px");

                do {
                    var leading = parseInt(textLayer.textItem.leading);
                    textLayer.textItem.leading = new UnitValue(leading * 1.05, "px"); // To decrease iterations.
                }
                while(textBoxDimensions.height > getRealTextLayerProperties(textLayer).height);

                textLayer.textItem.leading = new UnitValue(leading, "px"); //To ensure it fits.

                function getTextBoxDimensions(layer) {
                    return { 
                        width : layer.textItem.width,
                        height : layer.textItem.height
                    };
                }

            }
            
        }

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addBeforeAfterLabels (fillDesign) {

    // var toneCurveBackgroundGradient = drawSquare(xPosition, yPosition, edgeLength, edgeLength); 
    //     fillShapeWithGradient("radial", gradientStops, 0, [0,0]);
    //     toneCurveBackgroundGradient.fillOpacity = 55;
    //     toneCurveBackgroundGradient.name = selectedSetting.displayName + 'Background Gradient';
    //     moveLayerInsideLayerset(toneCurveBackgroundGradient, toneCurveGroup);

    // Document parameters
    var docWidth = activeDocument.width.as('px');
    var docHeight = activeDocument.height.as('px');


    var gradientType = "radial";
    var gradientStops =  [{ color: "000000", opacity: 20 , midPoint: 50}, { color: "000000", opacity: 0 , midPoint: 50}];
    var gradientAngle = 0;
    var gradientOffset = [0, 0];
    var backgroundXPosition = 0;
    var backgroundYPosition = 0;
    var backgroundWidth = docWidth;
    var backgroundHeight = docHeight;

    switch (fillDesign) {

        case 'horizontal':
        var beforeLabelBackground = drawSquare(0, 0, docWidth, docHeight / 2);
        fillShapeWithGradient(gradientType, gradientStops, gradientAngle, [-50 ,-50]);
        var afterLabelBackground = drawSquare(0, docHeight / 2, docWidth, docHeight / 2);
        fillShapeWithGradient(gradientType, gradientStops, gradientAngle, [-50 ,-50]);
        addText ("Before"   , docWidth / 24 , docHeight / 30        , "topleft" , fontSize    , fontHexColor  , fontName    , fontTracking   , fontJustification    , fontCapitalization);
        addText ("After"    , docWidth / 24 , docHeight * 16 / 30   , "topleft" , fontSize    , fontHexColor  , fontName    , fontTracking   , fontJustification    , fontCapitalization);
        break;

        case 'vertical':
        var beforeLabelBackground = drawSquare(0, 0, docWidth / 2, docHeight);
        fillShapeWithGradient(gradientType, gradientStops, gradientAngle, [-50 ,-50]);
        var afterLabelBackground = drawSquare(docWidth / 2, 0, docWidth / 2, docHeight);
        fillShapeWithGradient(gradientType, gradientStops, gradientAngle, [-50 ,-50]);
        addText ("Before"   , docWidth / 24     , docHeight / 30    , "topleft" , fontSize    , fontHexColor  , fontName    , fontTracking   , fontJustification    , fontCapitalization);
        addText ("After"    , docWidth * 13 / 24, docHeight / 30    , "topleft" , fontSize    , fontHexColor  , fontName    , fontTracking   , fontJustification    , fontCapitalization);
        break;

        case 'diagonal':
        var beforeLabelBackground = drawSquare(0, 0, docWidth / 2, docHeight);
        fillShapeWithGradient(gradientType, gradientStops, gradientAngle, [-50 ,0]);
        var afterLabelBackground = drawSquare(docWidth / 2, 0, docWidth / 2, docHeight);
        fillShapeWithGradient(gradientType, gradientStops, gradientAngle, [+50 ,0]);
        addText ("Before"   , docWidth / 24     , docHeight *15 / 30    , "middleleft"  , fontSize    , fontHexColor  , fontName    , fontTracking   , fontJustification    , fontCapitalization);
        addText ("After"    , docWidth * 23 / 24, docHeight * 15 / 30   , "middleright" , fontSize    , fontHexColor  , fontName    , fontTracking   , fontJustification    , fontCapitalization);
        break;

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addGradient(gradientType, gradientAngle, gradientOffset, gradientStops) {  // [xPosition, yPosition], [[relativeLocation, hexColor, opacity]]

    var docWidth = activeDocument.width;
    var docHeight = activeDocument.height;

    // var gradientLength = Math.max(docHeight, docWidth);

    // =======================================================


        var desc10 = new ActionDescriptor();
            var ref1 = new ActionReference();
            ref1.putClass( idcontentLayer = stringIDToTypeID( "contentLayer" ) );
        desc10.putReference( stringIDToTypeID("null"), ref1 );
            var layerTypeDesc = new ActionDescriptor();
                var gradientDesc = new ActionDescriptor();
                gradientDesc.putBoolean( charIDToTypeID( "Dthr" ), true );
                gradientDesc.putUnitDouble( charIDToTypeID( "Angl" ), charIDToTypeID( "#Ang" ), gradientAngle );
                gradientDesc.putEnumerated( charIDToTypeID( "Type" ), charIDToTypeID( "GrdT" ), charIDToTypeID( gradientType ) ); // Rdl or Lnr
                    var gradientStopsDesc = new ActionDescriptor();
                    gradientStopsDesc.putString( charIDToTypeID( "Nm  " ), "Custom" );
                    gradientStopsDesc.putEnumerated( charIDToTypeID( "GrdF" ), charIDToTypeID( "GrdF" ), charIDToTypeID( "CstS" ) );
                    gradientStopsDesc.putDouble( charIDToTypeID( "Intr" ), 4096.000000 );
                        var stopListDesc = new ActionList();
                        // insert color stops;
                        for (var m = 0; m < gradientStops.length; m++) {
                            // Color stop
                            var hexColor = new SolidColor;
                            hexColor.rgb.hexValue = gradientStops[m][2];
                            var colorStopDesc = new ActionDescriptor();
                            colorStopDesc.putDouble( charIDToTypeID( "Rd  " ), hexColor.rgb.red );
                            colorStopDesc.putDouble( charIDToTypeID( "Grn " ), hexColor.rgb.green );
                            colorStopDesc.putDouble( charIDToTypeID( "Bl  " ), hexColor.rgb.blue );

                            var stopDesc = new ActionDescriptor();
                            stopDesc.putObject( charIDToTypeID( "Clr " ), charIDToTypeID( "RGBC" ), colorStopDesc );
                            stopDesc.putEnumerated( charIDToTypeID( "Type" ), charIDToTypeID( "Clry" ), charIDToTypeID( "UsrS" ) );
                            // Stop relative position
                            stopDesc.putInteger( charIDToTypeID( "Lctn" ), gradientStops[m][0] * 4096 );
                            // Midpoint position
                            stopDesc.putInteger( charIDToTypeID( "Mdpn" ), gradientStops[m][1] * 100);
                            stopListDesc.putObject( charIDToTypeID( "Clrt" ), stopDesc );
                        };
                    gradientStopsDesc.putList( charIDToTypeID( "Clrs" ), stopListDesc );
                        var stopListDesc = new ActionList();
                        // insert opacity stops;
                        for (var m = 0; m < gradientStops.length; m++) {
                            var stopDesc = new ActionDescriptor();
                            stopDesc.putUnitDouble( charIDToTypeID( "Opct" ), charIDToTypeID( "#Prc" ), gradientStops[m][3] * 100);
                            stopDesc.putInteger( charIDToTypeID( "Lctn" ), gradientStops[m][0] * 4096 );
                            stopDesc.putInteger( charIDToTypeID( "Mdpn" ), gradientStops[m][1] * 100);
                            stopListDesc.putObject( charIDToTypeID( "TrnS" ), stopDesc );
                        };
                    gradientStopsDesc.putList( charIDToTypeID( "Trns" ), stopListDesc );
                gradientDesc.putObject( charIDToTypeID( "Grad" ), charIDToTypeID( "Grdn" ), gradientStopsDesc );
                gradientDesc.putBoolean( charIDToTypeID( "Rvrs" ), false );
                gradientDesc.putBoolean( charIDToTypeID( "Algn" ), true );
                gradientDesc.putUnitDouble( charIDToTypeID( "Scl " ), charIDToTypeID( "#Prc" ), 100.000000 );
                    var desc494 = new ActionDescriptor();
                    desc494.putUnitDouble( charIDToTypeID( "Hrzn" ), charIDToTypeID( "#Prc" ), gradientOffset[0] );
                    desc494.putUnitDouble( charIDToTypeID( "Vrtc" ), charIDToTypeID( "#Prc" ), gradientOffset[1] );
                gradientDesc.putObject( charIDToTypeID( "Ofst" ), charIDToTypeID( "Pnt " ), desc494 );
            layerTypeDesc.putObject( charIDToTypeID( "Type" ), stringIDToTypeID( "gradientLayer" ), gradientDesc );
        desc10.putObject( charIDToTypeID( "Usng" ),  stringIDToTypeID( "contentLayer" ), layerTypeDesc );
    executeAction( charIDToTypeID( "Mk  " ), desc10, DialogModes.NO );
    return activeDocument.activeLayer
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addText (text, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization) {

    text = text.toString();

    if(text!= "") {

        var textLayer = app.activeDocument.artLayers.add();

        textLayer.kind = LayerKind.TEXT;
        textLayer.textItem.size = new UnitValue(fontSize, 'px');
        color = new SolidColor();
        color.rgb.hexValue = fontHexColor;
        textLayer.textItem.color = color;
        textLayer.textItem.font = fontName;
        textLayer.textItem.tracking = fontTracking;
        textLayer.textItem.justification = fontJustification;
        textLayer.textItem.capitalization = fontCapitalization;
        textLayer.textItem.contents = text;

        translateLayerTo(textLayer, xPosition, yPosition, anchorPosition);

        return app.activeDocument.activeLayer;

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addLogo (logoVariation, logoPosition, relativeTargetHeight) {

    var logoPosition = standardPosition (logoPosition);

    // Add group
    var logoGroup = activeDocument.layerSets.add();
    logoGroup.name = "Logo Group";

    // Document parameters
    var docWidth = app.activeDocument.width.as('px');
    var docHeight = app.activeDocument.height.as('px');

    // Add background
    var gradientType = "radial";
    var gradientStops =  [{ color: "000000", opacity: 35, midPoint: 50}, { color: "000000", opacity: 0 , midPoint: 25}];
    var gradientAngle = 0;
    var gradientOffset = [50, 50];
    var logoBackground = drawSquare(0, 0, docWidth, docHeight);
    fillShapeWithGradient(gradientType, gradientStops, gradientAngle, gradientOffset);
    logoBackground.name = "Logo Background";
    moveLayerInsideLayerset(logoBackground, logoGroup);

    // Add logo
    var logoLayer = placeFile(logosPath + logoVariation + ".ai", relativeTargetHeight, logoPosition.xPosition, logoPosition.yPosition, logoPosition.anchorPosition);
    logoLayer.name = "Logo";
    moveLayerInsideLayerset(logoLayer, logoGroup);

    return logoGroup;

    //TODO: Name layers and add them to group

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function standardPosition (standardPositionName) {

    var docWidth = app.activeDocument.width;
    var docHeight = app.activeDocument.height;

    switch (standardPositionName) {

        case 'topleft':
        var xPosition = docWidth / 24;
        var yPosition = docWidth / 24;
        var anchorPosition = "topleft";
        break;

        case 'topcenter':
        var xPosition = docWidth / 2;
        var yPosition = docWidth / 24;
        var anchorPosition = "topcenter";
        break;

        case 'topright':
        var xPosition = docWidth - docWidth * 2 / 24;
        var yPosition = docWidth / 24;
        var anchorPosition = "topright";
        break;

        case 'middleleft':
        var xPosition = docWidth / 24;
        var yPosition = docHeight / 2;
        var anchorPosition = "middleleft";
        break;

        case 'middlecenter':
        var xPosition = docWidth / 2;
        var yPosition = docHeight / 2;
        var anchorPosition = "middlecenter";
        break;

        case 'middleright':
        var xPosition = docWidth - docWidth * 2 / 24;
        var yPosition = docHeight / 2;
        var anchorPosition = "middleright";
        break;

        case 'bottomleft':
        var xPosition = docWidth / 24;
        var yPosition = docHeight - docWidth / 24;
        var anchorPosition = "bottomleft";
        break;

        case 'bottomcenter':
        var xPosition = docWidth / 2;
        var yPosition = docHeight - docWidth / 24;
        var anchorPosition = "bottomcenter";
        break;

        case 'bottomright':
        var xPosition = docWidth - docWidth * 2 / 24;
        var yPosition = docHeight - docWidth / 24;
        var anchorPosition = "bottomright";
        break;

        case 'center':
        var xPosition = docWidth / 2;
        var yPosition = docHeight / 2;
        var anchorPosition = "middlecenter";
        break;

        case 'leftsidebar':
        var xPosition = docWidth * 3 /8;
        var yPosition = docHeight / 2;
        var anchorPosition = "middleright";
        

    }

    return {
        'xPosition' : xPosition,
        'yPosition' : yPosition,
        'anchorPosition' : anchorPosition
    };

}

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

function addPanelBackground (maskVisibleColor, panelBackgroundOpacity, panelBackgroundDesign) {

    // Add group
    var panelBackgroundGroup = activeDocument.layerSets.add();
    panelBackgroundGroup.name = "Panel Background";

    // Add layer
    var panelBackgroundLayer = drawStandardShape(panelBackgroundDesign);
    setShapeSettings(true, maskVisibleColor, false);
    panelBackgroundLayer.opacity = panelBackgroundOpacity;
    panelBackgroundLayer.name = "Background";

    moveLayerInsideLayerset(panelBackgroundLayer, panelBackgroundGroup);

    return panelBackgroundGroup;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addDarkGlassLayer (selectedLayer, darkGlassDesign) {

    var docWidth = app.activeDocument.width;
    var docHeight = app.activeDocument.height;

    // Add Group
    var darkGlassGroup = activeDocument.layerSets.add();
    darkGlassGroup.name = "Dark Glass";

    // Add Mask
    var darkGlassMask = drawStandardShape("full");
    setShapeSettings(true, maskVisibleColor, false);
    darkGlassMask.name = "Dark Glass Mask";
    moveLayerInsideLayerset(darkGlassMask, darkGlassGroup);

    // Translate mask
    var darkGlassGroupPosition = standardPosition(darkGlassDesign)
    translateLayerTo(darkGlassMask, darkGlassGroupPosition.xPosition, darkGlassGroupPosition.yPosition, darkGlassGroupPosition.anchorPosition);

    // Add Glass
    if(selectedLayer == undefined) { selectedLayer = app.activeDocument.artLayers.getByName(docRefName) }
    var darkGlassLayer = selectedLayer.duplicate(darkGlassGroup, ElementPlacement.INSIDE);
    darkGlassLayer.name = "Dark Glass";

    // Apply Effects
    darkGlassLayer.applyGaussianBlur(blurPixelRadius);
    darkGlassLayer.adjustCurves([[0, 0], [255, toneCurveMaxOutput]]);
    darkGlassLayer.applyAddNoise(noiseAmount, NoiseDistribution.GAUSSIAN, true);

    // Apply mask
    makeClippingMask (darkGlassLayer);

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addHistograms(xPosition, yPosition, width, height, strokeWidth) {

    var redHistogram    = addHistogram("Red",     xPosition,      yPosition,      height,     width);
    setShapeSettings(true,   "c9430a",   false,  strokeColor, strokeWidth);
    activeDocument.activeLayer.blendMode = BlendMode.SCREEN;
    activeDocument.activeLayer.name = "Red Histogram";
    var greenHistogram  = addHistogram("Green",   xPosition,      yPosition,      height,     width);
    setShapeSettings(true,   "19804c",   false,  strokeColor, strokeWidth);
    activeDocument.activeLayer.blendMode = BlendMode.SCREEN;
    activeDocument.activeLayer.name = "Green Histogram";
    var blueHistogram   = addHistogram("Blue",    xPosition,      yPosition,      height,     width);
    setShapeSettings(true,   "0097c2",   false,  strokeColor, strokeWidth);
    activeDocument.activeLayer.blendMode = BlendMode.SCREEN;
    activeDocument.activeLayer.name = "Blue Histogram";

    var histogramsGroup = activeDocument.layerSets.add();
    histogramsGroup.name = 'Histograms';
    redHistogram.move(histogramsGroup, ElementPlacement.INSIDE);
    greenHistogram.move(histogramsGroup, ElementPlacement.INSIDE);
    blueHistogram.move(histogramsGroup, ElementPlacement.INSIDE);

    return histogramsGroup;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Source: https://community.adobe.com/t5/photoshop-ecosystem-discussions/histogram-passed-and-drawn-into-a-layer-done/m-p/9581663

function addHistogram(histogramType, xPosition, yPosition, histogramWidth, histogramHeight) {

    showSelectedLayer(refLayerName, true);

    var layerName = histogramType + " histogram"

    // it works only on RGB images
    if (activeDocument.mode == DocumentMode.RGB) {

        // if the image is 16bit/channel or more it sets 8bits/channel before read the histogram
        if (!activeDocument.bitsPerChannel == BitsPerChannelType.EIGHT) activeDocument.bitsPerChannel = BitsPerChannelType.EIGHT;
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
        // activeDocument.artLayers.add();
        // activeDocument.activeLayer.name = layerName;
        // activeDocument.activeLayer.move( activeDocument, ElementPlacement.PLACEATBEGINNING );
        // activeDocument.activeLayer.opacity = 100; // opacity 100%

        //

        var myHist = [];
        var histogramPoints = [];

        // find maxY for normalizing graph

        var maxY = 0;

        for ( i = 3; i <= 252; i++ ) {

            if (Math.floor(Math.max(hL[i], hR[i], hG[i], hB[i])) > maxY) maxY = Math.floor(Math.max(hL[i], hR[i], hG[i], hB[i]));

        }

        switch (histogramType) {
            case "Red":
            myHist = hR;
            break;

            case "Green":
            myHist = hG;
            break;

            case "Blue":
            myHist = hB;
            break;

            case "Lum":
            myHist = hL;
            break;

            case "Lab":
            myHist = hLab;
            break;

            case "MaxRGB":
            myHist = hL;
            break;

        }

        for ( i = 2; i <= 253; i++ ) {

            if (histogramType == "MaxRGB") {

                // var YYY = Math.floor(Math.max(hR[i], hG[i], hB[i])*histogramHeight/maxY);
                var YYY = (Math.floor(Math.max(hR[i-2], hG[i-2], hB[i-2])*histogramHeight/maxY) + Math.floor(Math.max(hR[i-1], hG[i-1], hB[i-1])*histogramHeight/maxY) + Math.floor(Math.max(hR[i], hG[i], hB[i])*histogramHeight/maxY) + Math.floor(Math.max(hR[i+1], hG[i+1], hB[i+1])*histogramHeight/maxY) + Math.floor(Math.max(hR[i+2], hG[i+2], hB[i+2])*histogramHeight/maxY)) / 5;

            } else {

                // var YYY = Math.floor(myHist[i]*histogramHeight/maxY);
                var YYY = (Math.floor(myHist[i-2]*histogramHeight/maxY) + Math.floor(myHist[i-1]*histogramHeight/maxY) + Math.floor(myHist[i]*histogramHeight/maxY) + Math.floor(myHist[i+1]*histogramHeight/maxY)+ Math.floor(myHist[i+2]*histogramHeight/maxY)) / 5;

            }

            YYY = Math.min(YYY, histogramHeight);
            histogramPoints.push([i * histogramWidth / 252, YYY]);

        }

        showAllLayers();

        drawSmoothHistogram(histogramPoints, xPosition, yPosition + histogramHeight);

        return app.activeDocument.activeLayer;

    } else {

        alert("Must be an RGB image");

    }

    function drawSmoothHistogram (histogramPoints, xPosition, yPosition) {

        var histogramPathPoints = new Array();
        
        for (i = 0; i < histogramPoints.length; i++) {

            histogramPathPoints[i] = new PathPointInfo
            histogramPathPoints[i].anchor = Array(xPosition + histogramPoints[i][0] - 1, yPosition - histogramPoints[i][1])
            histogramPathPoints[i].kind = PointKind.SMOOTHPOINT
            histogramPathPoints[i].leftDirection = histogramPathPoints[i].anchor
            histogramPathPoints[i].rightDirection = histogramPathPoints[i].anchor
        }

        histogramPathPoints[histogramPoints.length] = new PathPointInfo
        histogramPathPoints[histogramPoints.length].anchor = Array(xPosition + histogramWidth, yPosition)
        histogramPathPoints[histogramPoints.length].kind = PointKind.SMOOTHPOINT
        histogramPathPoints[histogramPoints.length].leftDirection = histogramPathPoints[histogramPoints.length].anchor
        histogramPathPoints[histogramPoints.length].rightDirection = histogramPathPoints[histogramPoints.length].anchor

        histogramPathPoints[histogramPoints.length + 1] = new PathPointInfo
        histogramPathPoints[histogramPoints.length + 1].anchor = Array(xPosition + 1, yPosition)
        histogramPathPoints[histogramPoints.length + 1].kind = PointKind.SMOOTHPOINT
        histogramPathPoints[histogramPoints.length + 1].leftDirection = histogramPathPoints[histogramPoints.length + 1].anchor
        histogramPathPoints[histogramPoints.length + 1].rightDirection = histogramPathPoints[histogramPoints.length + 1].anchor

        histogramPathPoints[histogramPoints.length + 2] = new PathPointInfo
        histogramPathPoints[histogramPoints.length + 2].anchor = Array(xPosition + histogramPoints[0][0] - 1, yPosition - histogramPoints[0][1])
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

    }

}

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addLayerToLayerSet (layer, layerSetPath) {

    var layerSetHierarchy = layerSetPath.split('/');

    var currentLayerSet = app.activeDocument;

    for (var i = 0; i < layerSetHierarchy.length; i ++) {

        var parentLayerSet = currentLayerSet;

        currentLayerSet = findLayerSet (parentLayerSet, layerSetHierarchy[i]);

        if (currentLayerSet == false )    {

            currentLayerSet = parentLayerSet.layerSets.add();
            currentLayerSet.name = layerSetHierarchy[i];

        }

    }

    // Move inside the layerset
    var dummieGroup = currentLayerSet.layerSets.add();
    layer.move(dummieGroup, ElementPlacement.PLACEBEFORE);
    dummieGroup.remove();

    return currentLayerSet;

    function findLayerSet (obj, layerSetName) { // obj is document or layerSet. One layerSet includes LayerSets
    
        for (var a = 0; a < obj.layerSets.length; a++) {

            if (String(obj.layerSets[a].name) == layerSetName) {

                return obj.layerSets.getByName(layerSetName);

            }

        }

        return false;

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function moveLayerInsideLayerset (sourceLayer, targetLayerSet) {

    var dummieGroup = targetLayerSet.layerSets.add();
    sourceLayer.move(dummieGroup, ElementPlacement.PLACEBEFORE);
    dummieGroup.remove();

    return targetLayerSet;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function findLayerSet (parentLayerSet, layerSetName)   {

    for (var i = 0; i < parentLayerSet.layerSets.length; i++) {

        if(foundedLayer) break;

        if(String(parentLayerSet.layerSets[i].name) == layerSetName) {
            
            return parentLayerSet.layerSets.getByName(layerSetName);

        }   else    {

            var foundedLayer = findLayerSet(parentLayerSet.layerSets[i], layerSetName)

        }

    }

    return foundedLayer;

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

function addBasicPanel(panelXPosition, panelYPosition) {

    // Group definition
    var basicPanelGroup = activeDocument.layerSets.add();
    basicPanelGroup.name = 'Basic Panel';

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
    

    // Parameters TODO: Define based in document layerProperties
    var sliderSettingsSetSpacing = 60;
    var sliderLineLength = histogramWidth = histogramHeigth =  docWidth * 5 / 24;
    var sliderStyle = "horizontal";

    // Add histogram
    var basicPanelHistogramGroup = addHistograms(groupXPosition, groupYPosition, histogramWidth, histogramHeigth, 2);
    moveLayerInsideLayerset(basicPanelHistogramGroup, basicPanelGroup);
    groupYPosition += 350;

    // Add basic tone settings
    var basicPanelToneGroup = addSliderSettingSet("Tone", [exposure, contrast, highlights, shadows, whites, blacks], groupXPosition, groupYPosition, sliderSettingsSetSpacing, sliderLineLength, sliderStyle);
    moveLayerInsideLayerset(basicPanelToneGroup, basicPanelGroup);
    groupYPosition += 435;

    // Add basic presence settings
    var basicPanelPresenceGroup = addSliderSettingSet("Presence", [texture, clarity, dehaze, vibrance,saturation], groupXPosition, groupYPosition, sliderSettingsSetSpacing, sliderLineLength, sliderStyle);
    moveLayerInsideLayerset(basicPanelPresenceGroup, basicPanelGroup);
    groupYPosition += 375;

    // Add grain settings
    // var basicPanelGrainGroup = addSliderSettingSet("Grain", [grainAmount, grainSize, grainFrequency], groupXPosition, groupYPosition, sliderSettingsSetSpacing, sliderLineLength, sliderStyle);
    // moveLayerInsideLayerset(basicPanelGrainGroup, basicPanelGroup);

    return basicPanelGroup;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addSliderSettingSet(setName, settingsSet, xPosition, yPosition, sliderSettingsSetSpacing, sliderLineLength, sliderStyle) {

    var settingsSetGroup = activeDocument.layerSets.add();
    settingsSetGroup.name = setName;

    for (var i = 0; i < settingsSet.length; i++) {

        var settingGroup = addSliderSetting(settingsSet[i], xPosition, yPosition, sliderLineLength, 6, sliderStyle, true, true);
        settingGroup.name = settingsSet[i].displayName;

        var dummieGroup = settingsSetGroup.layerSets.add();
        settingGroup.move(dummieGroup, ElementPlacement.PLACEBEFORE);
        dummieGroup.remove();

        yPosition += sliderSettingsSetSpacing;

    }

    return settingsSetGroup;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addSliderSetting (selectedSetting, xPosition, yPosition, sliderLineLength, sliderCircleRadius, sliderStyle, includeSettingTitle, includeSettingValue) {

    var sliderGroup = activeDocument.layerSets.add();
    sliderGroup.name = selectedSetting.displayName + " Slider";

    var strokeWidth = sliderCircleRadius / 3;
    var textSize = sliderCircleRadius * 3;
    
    var minSetting = selectedSetting.min;
    var maxSetting = selectedSetting.max;
    var textSize = textSize;
    var sliderCircleFillColor = findSettingHexColor(selectedSetting.displayName);

    switch (sliderStyle)  {
        case "vertical":
            var minSettingY = yPosition;
            var maxSettingY = yPosition + sliderLineLength; 
            var settingY = minSettingY + (selectedSetting.settingValue - minSetting) / (maxSetting-minSetting) * sliderLineLength;
            var minSettingX = maxSettingX = settingX = xPosition;

            var settingTitleXPosition = maxSettingX;
            var settingTitleYPosition = minSettingY - 1.5 * textSize;
            var settingTitleAnchorPosition = "bottomcenter";

            var settingValueXPosition = maxSettingX;
            var settingValueYPosition = maxSettingY + 1.5 * textSize;
            var settingValueAnchorPosition = "topcenter";
        break;

        case "horizontal":
            var minSettingX = xPosition;
            var maxSettingX = xPosition + sliderLineLength; 
            var settingX = minSettingX + (selectedSetting.settingValue - minSetting) / (maxSetting-minSetting) * sliderLineLength;
            var minSettingY = maxSettingY = settingY = yPosition;

            var settingTitleXPosition = minSettingX;
            var settingTitleYPosition = minSettingY - 1.5 * textSize;
            var settingTitleAnchorPosition = "topleft";

            var settingValueXPosition = maxSettingX
            var settingValueYPosition = minSettingY - 1.5 * textSize;
            var settingValueAnchorPosition = "topright";
        break;

        case "horizontalSide":
            var minSettingX = xPosition;
            var maxSettingX = xPosition + sliderLineLength * 7 / 10; 
            var settingX = minSettingX + (selectedSetting.settingValue - minSetting) / (maxSetting-minSetting) * sliderLineLength * 7 / 10;
            var minSettingY = maxSettingY = settingY = yPosition;

            var settingTitleXPosition = minSettingX;
            var settingTitleYPosition = minSettingY - 2 * textSize;
            var settingTitleAnchorPosition = "topleft";

            var settingValueXPosition = minSettingX + sliderLineLength;
            var settingValueYPosition = minSettingY;
            var settingValueAnchorPosition = "middleright";
        break;


    }
    
    if(includeSettingTitle) {
        var labelLayer = addText(selectedSetting.displayName, settingTitleXPosition, settingTitleYPosition, settingTitleAnchorPosition, fontSize, fontHexColor, fontName, fontTracking, Justification.LEFT, fontCapitalization); // selectedSetting, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization
        labelLayer.name = 'Text Label';
        labelLayer.move(sliderGroup, ElementPlacement.INSIDE);
    }

    if(includeSettingValue) {
        var valueLayer = addText(selectedSetting.settingValue, settingValueXPosition, settingValueYPosition, settingValueAnchorPosition, fontSize, fontHexColor, fontName, fontTracking, Justification.RIGHT, fontCapitalization);
        valueLayer.name = 'Text Value';
        valueLayer.move(sliderGroup, ElementPlacement.INSIDE);
    }
    
    // Add setting line
    var lineLayer = drawLine(minSettingX, minSettingY, maxSettingX, maxSettingY);
    setShapeSettings(false, strokeColor, true, strokeColor, strokeWidth);
    lineLayer.name = 'Slider Line';
    lineLayer.move(sliderGroup, ElementPlacement.INSIDE);

    // Add setting circle value
    var sliderCircleLayer = drawCircle(settingX, settingY, sliderCircleRadius); // xPosition, yPosition, sliderCircleRadius, fillEnabled, fillColor, strokeEnabled, strokeColor, strokeWidth
    setShapeSettings(true, sliderCircleFillColor, true, strokeColor, strokeWidth);
    sliderCircleLayer.name = 'Slider Circle';
    sliderCircleLayer.move(sliderGroup, ElementPlacement.INSIDE);

    return sliderGroup;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function findSettingHexColor(colorName) {

    var colorReferenceTable = [
        {colorName: "Red",      hexColor: "CA0000"},
        {colorName: "Orange",   hexColor: "FF6400"},
        {colorName: "Yellow",   hexColor: "FFE000"},
        {colorName: "Green",    hexColor: "009300"},
        {colorName: "Aqua",     hexColor: "00D3B8"},
        {colorName: "Blue",     hexColor: "0083F3"},
        {colorName: "Purple",   hexColor: "7400EF"},
        {colorName: "Magenta",  hexColor: "FF008A"},
    ]

    for (var i=0; i<colorReferenceTable.length; i++) {

        if(colorName.match(colorReferenceTable[i].colorName)){
            return colorReferenceTable[i].hexColor;
        }

    }

    return "8C8C8C";

}

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//TODO: Rewrite, return group, include style

function addHSLTablePanel (panelXPosition, panelYPosition, textLabels) {

    // Group definition
    var HSLTablePanel = activeDocument.layerSets.add();
    HSLTablePanel.name = "HSL Table Panel";

    // Document parameters
    var docWidth = app.activeDocument.width.as('px');
    var docHeight = app.activeDocument.height.as('px');

    // Initial position
    if(panelXPosition == undefined && panelYPosition == undefined) {
        var panelXPosition = docWidth * 2 / 24;
        var panelYPosition = docHeight / 2 - 585;
    }

    var labelCircleRadius = 8;
    var anchorPosition = "topright";
    var fontJustification = Justification.RIGHT;

    var groupXPosition = panelXPosition + labelCircleRadius * 2;
    var groupYPosition = panelYPosition;


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
                        var textLayer = addText(HSLTable[i][j], groupXPosition, groupYPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization);
                        textLayer.name = HSLTable[i][j] + ' Label';
                        textLayer.move(HSLTablePanel, ElementPlacement.INSIDE);

                    } else {

                        fillColor = findSettingHexColor(HSLTable[i][j]);
                        
                        // xPosition, yPosition, circleRadius
                        var labelCircleLayer = drawCircle(groupXPosition, groupYPosition + fontSize / 3, labelCircleRadius);
                        setShapeSettings(true, fillColor, true, strokeColor, 2 );
                        labelCircleLayer.name = HSLTable[i][j] + ' Label';
                        labelCircleLayer.move(HSLTablePanel, ElementPlacement.INSIDE);

                    }

                }

                groupXPosition += 80;
            
            } else {

                var textLayer = addText(HSLTable[i][j], groupXPosition, groupYPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization);  // text, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization

                if(i == 0) {

                    textLayer.name = HSLTable[i][j] + ' Label';
                    textLayer.move(HSLTablePanel, ElementPlacement.INSIDE);

                }   else    {

                    textLayer.name = HSLTable[i][0] + ' ' + HSLTable[0][j] + ': ' + textLayer.name;  
                    textLayer.move(HSLTablePanel, ElementPlacement.INSIDE);

                }

                groupXPosition += 65;    
            
            }

        } 

        groupXPosition = panelXPosition;
        groupYPosition += 45;

    }

    return HSLTablePanel;
    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addColorGradingPanel (panelXPosition, panelYPosition) {

    // Group definition
    var colorGradingPanelGroup = activeDocument.layerSets.add();
    colorGradingPanelGroup.name = "Color Grading Panel";

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

    var colorGradingCircleRadius = docWidth / 12;
    var sliderLineLength = docWidth * 5 / 24;
    var strokeWidth = docWidth / 540;

    var sliderSettingsSetSpacing = colorGradingCircleRadius * 11 / 18;
    
    // Add color grading groups
    var globalColorGradingGroup =     addColorGradingGroup(globalHue,         globalSat,          globalLum,     colorGradingCircleRadius,     groupXPosition,      groupYPosition,      strokeWidth,        "G",    "colorful",     "horizontal");
    groupYPosition += colorGradingCircleRadius * 10 / 3;
    moveLayerInsideLayerset(globalColorGradingGroup, colorGradingPanelGroup);

    var blendingColorGradingGroup = addSliderSettingSet("Blending Settings", [blending, balance], groupXPosition, groupYPosition, sliderSettingsSetSpacing, sliderLineLength, "horizontal");
    groupYPosition += colorGradingCircleRadius * 7 / 6;
    moveLayerInsideLayerset(blendingColorGradingGroup, colorGradingPanelGroup);

    var highlightColorGradingGroup =  addColorGradingGroup(highlightHue,      highlightSat,       highlightLum,  colorGradingCircleRadius,     groupXPosition,      groupYPosition,      strokeWidth,        "H",    "colorful",     "horizontal");
    groupYPosition += colorGradingCircleRadius * 3;
    moveLayerInsideLayerset(highlightColorGradingGroup, colorGradingPanelGroup);

    var midtoneColorGradingGroup =    addColorGradingGroup(midtoneHue,        midtoneSat,         midtoneLum,    colorGradingCircleRadius,     groupXPosition,      groupYPosition,      strokeWidth,        "M",    "colorful",     "horizontal");
    groupYPosition += colorGradingCircleRadius * 3;
    moveLayerInsideLayerset(midtoneColorGradingGroup, colorGradingPanelGroup);

    var shadowColorGradingGroup =     addColorGradingGroup(shadowHue,         shadowSat,          shadowLum,     colorGradingCircleRadius,     groupXPosition,      groupYPosition,      strokeWidth,        "S",    "colorful",     "horizontal");
    moveLayerInsideLayerset(shadowColorGradingGroup, colorGradingPanelGroup);

    return colorGradingPanelGroup;
    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addColorGradingGroup (hue, saturation, luminance, radius, xPosition, yPosition, strokeWidth, textLabel, colorGradingPalette, colorGradingDesign) { 

    // Group definition
    var colorGradingGroup = app.activeDocument.layerSets.add();
    colorGradingGroup.name = textLabel;

    // Style
    if(colorGradingDesign == "vertical")  {

        var colorGradingBackgroundXPosition = xPosition + radius;
        var colorGradingBackgroundYPosition = yPosition + radius;
        var colorGradingBackgroundRadius = radius * 0.75;

        var settingCircleValueRadius = radius / 15;

        var luminanceSliderXPosition = xPosition;
        var luminanceSliderYPosition = yPosition + radius * 13 / 6;
        var luminanceSliderLength = radius * 2;
        var luminanceSliderStyle = "horizontal";

        var titleTextValueXPosition = xPosition - radius / 2
        var titleTextValueYPosition = yPosition + radius
        var titleTextValueAnchorPosition = "topcenter";
        var titleTextValueRotation = -90;

        var hueTextValueXPosition = xPosition;
        var saturationTextValueXPosition = xPosition + radius;
        var luminanceTextValueXPosition = xPosition + radius * 2;
        var hueTextValueYPosition = saturationTextValueYPosition = luminanceTextValueYPosition = yPosition + radius * 2;
        var hueTextValueAnchorPosition = "topleft";
        var saturationTextValueAnchorPosition = "topcenter";
        var luminanceTextValueAnchorPosition = "topright";

    }    else if ( colorGradingDesign == "horizontal")    {

        var colorGradingBackgroundXPosition = xPosition + radius * 10 / 9;
        var colorGradingBackgroundYPosition = yPosition + radius;
        var colorGradingBackgroundRadius = radius * 0.9;

        var settingCircleValueRadius = radius / 15;

        var settingTextValueSize = radius / 5;

        var luminanceSliderXPosition = xPosition + radius * 5 / 2;
        var luminanceSliderYPosition = yPosition;
        var luminanceSliderLength = radius * 2;
        var luminanceSliderStyle = "vertical";

        var titleTextValueXPosition = xPosition;
        var titleTextValueYPosition = yPosition;
        var titleTextValueAnchorPosition = "topleft";
        var titleTextValueRotation = 0;

        var hueTextValueXPosition = xPosition + radius * 1 / 9;
        var saturationTextValueXPosition = hueTextValueXPosition + radius;
        var luminanceTextValueXPosition = saturationTextValueXPosition + radius;
        var hueTextValueYPosition = saturationTextValueYPosition = luminanceTextValueYPosition = yPosition + radius * 5 / 2;
        var hueTextValueAnchorPosition = "bottomleft";
        var saturationTextValueAnchorPosition = "bottomcenter";
        var luminanceTextValueAnchorPosition = "bottomright";

    }

    switch (textLabel)    {
        case "G": 
            var backgroundOverlayColor = "FFFFFF";
            var backgroundOverlayOpacity = 0;
        break;
        case "H": 
            var backgroundOverlayColor = "FFFFFF";
            var backgroundOverlayOpacity = 35;
        break;
        case "M": 
            var backgroundOverlayColor = "000000";
            var backgroundOverlayOpacity = 25;
        break;
        case "S": 
            var backgroundOverlayColor = "000000";
            var backgroundOverlayOpacity = 70;
        break;
    }

    // Add Color Grade Background with white gradient overlay
    var colorfulGradientStops = [
        { color: "ff3232",  opacity: 100 ,  midPoint: 50}, 
        { color: "ff00ff",  opacity: 100 ,  midPoint: 50}, 
        { color: "3232ff",  opacity: 100 ,  midPoint: 25},
        { color: "00ffff",  opacity: 100 ,  midPoint: 50},
        { color: "34ff34",  opacity: 100 ,  midPoint: 50},
        { color: "ffff00",  opacity: 100 ,  midPoint: 50},
        { color: "ff3232",  opacity: 100 ,  midPoint: 50}
    ];

    var colorGradingBackground = drawCircle(colorGradingBackgroundXPosition, colorGradingBackgroundYPosition, colorGradingBackgroundRadius);
    setShapeSettings(true, "FFFFFF", true, strokeColor, strokeWidth);
    fillShapeWithGradient("angle", colorfulGradientStops, 0, [0,0]);
    addGradientOverlay("radial", [0,0], 75, 0, [{ color: "FFFFFF",  opacity: 100 ,  midPoint: 50}, { color: "FFFFFF",  opacity:   0 ,  midPoint: 50}], "classic", "normal", 100);
    colorGradingBackground.fillOpacity = 55;
    colorGradingBackground.name = 'Background Circle';
    moveLayerInsideLayerset(colorGradingBackground, colorGradingGroup);

    // Add Frame and darkness overlay
    var colorGradingBackgroundOverlay = drawCircle(colorGradingBackgroundXPosition, colorGradingBackgroundYPosition, colorGradingBackgroundRadius);
    setShapeSettings(true, backgroundOverlayColor, false, strokeColor, strokeWidth);
    colorGradingBackgroundOverlay.name = 'Background Overlay';
    colorGradingBackgroundOverlay.fillOpacity = backgroundOverlayOpacity;
    moveLayerInsideLayerset(colorGradingBackgroundOverlay, colorGradingGroup);
    // addColorOverlay(backgroundOverlayColor, backgroundOverlayOpacity, "normal");

    // Add Saturation and Hue Circle
    var t_x = saturation.settingValue * radius / 100 * Math.cos(hue.settingValue * Math.PI / 180);
    var t_y = saturation.settingValue * radius / 100 * Math.sin(hue.settingValue * Math.PI / 180);
    var settingCircle = drawCircle(colorGradingBackgroundXPosition + t_x, colorGradingBackgroundYPosition - t_y, settingCircleValueRadius);
    setShapeSettings(true, "8C8C8C", true, strokeColor, strokeWidth);
    settingCircle.name = 'Saturation & Hue Circle';
    moveLayerInsideLayerset(settingCircle, colorGradingGroup);

    // Add Luminance bar
    var luminanceGroup = addSliderSetting (luminance, luminanceSliderXPosition, luminanceSliderYPosition, luminanceSliderLength, settingCircleValueRadius, luminanceSliderStyle, false, false);
    luminanceGroup.name = 'Luminance Bar';
    moveLayerInsideLayerset(luminanceGroup, colorGradingGroup);

    // Add Title
    var textLabel = addText(textLabel, titleTextValueXPosition, titleTextValueYPosition, titleTextValueAnchorPosition, fontSize, fontHexColor, fontName, fontTracking, Justification.RIGHT, fontCapitalization); // text, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization
    textLabel.rotate(titleTextValueRotation, AnchorPosition.TOPCENTER);
    moveLayerInsideLayerset(textLabel, colorGradingGroup);

    // Add Hue Saturation and Luminance Values
    var hueLabel = addText(hue.displayName + hue.settingValue, hueTextValueXPosition, hueTextValueYPosition, hueTextValueAnchorPosition, fontSize, fontHexColor, fontName, fontTracking, Justification.LEFT, fontCapitalization);
    moveLayerInsideLayerset(hueLabel, colorGradingGroup);

    var saturationLabel = addText(saturation.displayName + saturation.settingValue, saturationTextValueXPosition, saturationTextValueYPosition, saturationTextValueAnchorPosition, fontSize, fontHexColor, fontName, fontTracking, Justification.CENTER, fontCapitalization);
    moveLayerInsideLayerset(saturationLabel, colorGradingGroup);

    var luminanceLabel = addText(luminance.displayName + luminance.settingValue, luminanceTextValueXPosition, luminanceTextValueYPosition, luminanceTextValueAnchorPosition, fontSize, fontHexColor, fontName, fontTracking, Justification.RIGHT, fontCapitalization);
    moveLayerInsideLayerset(luminanceLabel, colorGradingGroup);

    return colorGradingGroup;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addColorMixerPanel(panelXPosition, panelYPosition) {

    // Group definition
    var colorMixerPanelGroup = activeDocument.layerSets.add();
    colorMixerPanelGroup.name = "Color Mixer Panel";

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

    var colorMixerHue = [redHue,orangeHue,yellowHue,greenHue,aquaHue,blueHue,purpleHue,magentaHue];
    var colorMixerSaturation = [redSaturation,orangeSaturation,yellowSaturation,greenSaturation,aquaSaturation,blueSaturation,purpleSaturation,magentaSaturation];
    var colorMixerLuminance = [redLuminance,orangeLuminance,yellowLuminance,greenLuminance,aquaLuminance,blueLuminance,purpleLuminance,magentaLuminance];

    // Add color mixer groups
    var hueColorMixerGroup = addColorMixerGroup("Hue", colorMixerHue, groupXPosition, groupYPosition);
    moveLayerInsideLayerset(hueColorMixerGroup, colorMixerPanelGroup);
    groupYPosition += 405;
    var saturationColorMixerGroup = addColorMixerGroup("Saturation", colorMixerSaturation, groupXPosition, groupYPosition);
    moveLayerInsideLayerset(saturationColorMixerGroup, colorMixerPanelGroup);
    groupYPosition += 405;
    var luminancecolorMixerGroup = addColorMixerGroup("Luminance", colorMixerLuminance, groupXPosition, groupYPosition);
    moveLayerInsideLayerset(luminancecolorMixerGroup, colorMixerPanelGroup);

    return colorMixerPanelGroup;

    function addColorMixerGroup (groupName, sectionArray, xPosition, yPosition) {

        // Group definition
        var colorMixerGroup = activeDocument.layerSets.add();
        colorMixerGroup.name = groupName + " Group";
        
        // Text parameters
        var anchorPosition = "bottomleft";

        // Slider parameters
        var sliderLineLength = 225;
        var sliderCircleRadius = 6;
        var sliderStyle = "horizontalSide";
        var includeSettingTitle = false;
        var includeSettingValue = true;
        
        // Add Title
        var colorMixerGroupTitle = addText(groupName, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization);
        colorMixerGroupTitle.name = groupName + " Group Title";
        moveLayerInsideLayerset(colorMixerGroupTitle, colorMixerGroup);
        yPosition += 36;

        // Add Slider Settings
        for (cg = 0; cg < sectionArray.length; cg++) {

            var colorMixerSliderSetting = addSliderSetting (sectionArray[cg], xPosition, yPosition, sliderLineLength, sliderCircleRadius, sliderStyle, includeSettingTitle, includeSettingValue);
            moveLayerInsideLayerset(colorMixerSliderSetting, colorMixerGroup);
            yPosition += 36;

        }

        return colorMixerGroup;

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addAllPanels(panelXPosition, panelYPosition) { //TODO: Define alternative versions

    // Group definition
    var allPanelsGroup = activeDocument.layerSets.add();
    allPanelsGroup.name = "All Panels";

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

    var groupXPositionIncrement = docWidth * 5 / 16;

    // Create panel_basic version
    var allPanelsBasicGroup = addBasicPanel(groupXPosition, groupYPosition);
    moveLayerInsideLayerset(allPanelsBasicGroup, allPanelsGroup);
    groupXPosition += groupXPositionIncrement;

    // Create panel_colorGrading version
    // var allPanelsColorGradingGroup = addColorGradingPanel(groupXPosition, groupYPosition);
    // moveLayerInsideLayerset(allPanelsColorGradingGroup, allPanelsGroup);
    // groupXPosition += groupXPositionIncrement;

    // Create panel_toneCurve version
    var allPanelsToneCurvesGroup = addToneCurvesPanel(groupXPosition, groupYPosition);
    moveLayerInsideLayerset(allPanelsToneCurvesGroup, allPanelsGroup);
    groupXPosition += groupXPositionIncrement;

    // Create panel_HSLTable version
    // var allPanelsHSLTableGroup = addHSLTablePanel( groupXPosition, groupYPosition, false);
    // moveLayerInsideLayerset(allPanelsHSLTableGroup, allPanelsGroup);
    // groupXPosition += groupXPositionIncrement;

    // Create panel_colorMixer version
    var allPanelsColorMixerGroup = addColorMixerPanel(groupXPosition, groupYPosition);
    moveLayerInsideLayerset(allPanelsColorMixerGroup, allPanelsGroup);
    groupXPosition += groupXPositionIncrement;

    return allPanelsGroup;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addPresetInfo() {

    // Group definition
    var presetInfoGroup = activeDocument.layerSets.add();
    presetInfoGroup.name = "Preset Info";

    // Document parameters
    var docWidth = app.activeDocument.width.as('px');
    var docHeight = app.activeDocument.height.as('px');

    var presetInfoColor = "FFFFFF";
    var strokeWidth = 4;

    // Preset info
    var presetNameLayer =           addText (presetName,     docWidth / 2, docHeight * 11 / 30, "bottomcenter", 200, fontHexColor, "WorkSansRoman-ExtraLight", 200,  Justification.CENTER, TextCase.ALLCAPS);
    fitTextLayerToWidth (presetNameLayer, docWidth * 16 / 24);
    translateLayerTo(presetNameLayer, docWidth / 2, docHeight * 11 / 30, "bottomcenter");
    moveLayerInsideLayerset(presetNameLayer, presetInfoGroup);

    // Preset Pack info
    var presetPackNameLayer =       addText (presetPackName, docWidth / 2, docHeight * 13 / 30, "bottomcenter", 46, fontHexColor, "WorkSansRoman-Bold", 900,  Justification.CENTER, TextCase.ALLCAPS);
    fitTextLayerToWidth (presetPackNameLayer, docWidth * 16 / 24);
    translateLayerTo(presetPackNameLayer, docWidth / 2, docHeight * 13 / 30, "bottomcenter");
    moveLayerInsideLayerset(presetPackNameLayer, presetInfoGroup);
    var presetPackNameLabelLayer =  addText ("Preset pack", docWidth / 2, docHeight * 14 / 30, "bottomcenter", 24, fontHexColor, "WorkSansRoman-Regular", 1000,  Justification.CENTER, TextCase.ALLCAPS);
    moveLayerInsideLayerset(presetPackNameLabelLayer, presetInfoGroup);

    // Made by
    var madeByTextLayer =           addText ("Made with \u2764 by", docWidth / 2, docHeight * 18 / 30, "topcenter", 24, fontHexColor, "WorkSansRoman-Regular", 150,  Justification.CENTER, TextCase.ALLCAPS);
    set_text_style(10, 1, 24, "EmojiOneColor");
    moveLayerInsideLayerset(madeByTextLayer, presetInfoGroup);
    var madeByLogoLayer =           placeFile(logosPath + "ChainCircle x Raleway_White - Vertical" + ".ai", 8 / 3 / 30, docWidth / 2, docHeight * 22 / 30, "bottomcenter");
    moveLayerInsideLayerset(madeByLogoLayer, presetInfoGroup);

    // Available for
    var availableForTextLayer =     addText ("Available for", docWidth * 3 / 24, docHeight * 26 / 30, "topleft", 24, fontHexColor, "WorkSansRoman-Regular", 150,  Justification.LEFT, TextCase.ALLCAPS);
    moveLayerInsideLayerset(availableForTextLayer, presetInfoGroup);
    var lightroomIconLayer =        placeFile(logosPath + "Adobe Lightroom Logo" + ".ai",           1 / 30, docWidth * 3 / 24, docHeight * 28 / 30, "bottomleft");
    moveLayerInsideLayerset(lightroomIconLayer, presetInfoGroup);
    var lightroomClassicIconLayer = placeFile(logosPath + "Adobe Lightroom Classic Logo" + ".ai",   1 / 30, docWidth * 5 / 24, docHeight * 28 / 30, "bottomcenter");
    moveLayerInsideLayerset(lightroomClassicIconLayer, presetInfoGroup);
    var photoshopIconLayer =        placeFile(logosPath + "Adobe Photoshop Logo" + ".ai",           1 / 30, docWidth * 7 / 24, docHeight * 28 / 30, "bottomright");
    moveLayerInsideLayerset(photoshopIconLayer, presetInfoGroup);
    // var availableForIconsLayerSet  =
    
    // Bookmark
    var bookmarkTextLayer =         addText ("save it", docWidth * 21 / 24, docHeight * 26 / 30, "topright", 24, fontHexColor, "WorkSansRoman-Regular", 150,  Justification.RIGHT, TextCase.ALLCAPS);
    moveLayerInsideLayerset(bookmarkTextLayer, presetInfoGroup);
    var bookmarkIconLayer =         placeFile(iconsPath + "Instagram - Bookmark Icon" + ".ai",           1 / 30,  docWidth * 21 / 24, docHeight * 28 / 30, "bottomright");
    moveLayerInsideLayerset(bookmarkIconLayer, presetInfoGroup);

    return presetInfoGroup;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addPhotoContext() {

    // Group definition
    var photoContextGroup = activeDocument.layerSets.add();
    photoContextGroup.name = "Photo Context";

    // Document parameters
    var docWidth = app.activeDocument.width.as('px');
    var docHeight = app.activeDocument.height.as('px');

    // Parameters
    fontSize = 30;
    fontName = "WorkSansRoman-Regular";
    fontCapitalization = TextCase.NORMAL;

    var margins = {
        left : 3 / 24 * docWidth, 
        top : 8 / 30 * docHeight, 
        right: 21 / 24 * docWidth, 
        bottom: 22 / 30 * docHeight
    };

    // Add location
    var locationContent = getDocumentProperty("Location");
    var photoContextLocation =  addText (locationContent, docWidth * 3 / 24, docHeight * 4.5 / 30, "topleft", fontSize, fontHexColor, fontName, fontTracking, Justification.LEFT, fontCapitalization)
    moveLayerInsideLayerset(photoContextLocation, photoContextGroup);

    // Add date
    var dateContent = getDocumentProperty("Date");
    var photoContextDate =      addText (dateContent, docWidth * 21 / 24, docHeight * 4.5 / 30, "topright", fontSize, fontHexColor, fontName, fontTracking, Justification.RIGHT, fontCapitalization)
    moveLayerInsideLayerset(photoContextDate, photoContextGroup);

    // Add caption
    var captionContent = getDocumentProperty("Caption");
    if(captionContent)  {
        var photoContextCaption =   addText (captionContent, docWidth * 3 / 24, docHeight * 8 / 30, "topleft", fontSize, fontHexColor, fontName, fontTracking, Justification.CENTER, fontCapitalization)
        fitTextLayerToBox (photoContextCaption, margins.left, margins.top, margins.right, margins.bottom);
        moveLayerInsideLayerset(photoContextCaption, photoContextGroup);
    }

    // Add logo
    var photoContextLogoLayer = placeFile(logosPath + "ChainCircle x Raleway_White - Vertical" + ".ai", 8 / 3 / 30, docWidth / 2, docHeight * 27 / 30, "bottomcenter");
    moveLayerInsideLayerset(photoContextLogoLayer, photoContextGroup);

    return photoContextGroup;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addPrintedPhoto(photoLayer) {

    // Group definition
    var printedPhotoGroup = activeDocument.layerSets.add();
    printedPhotoGroup.name = "PrintedPhoto";

    // Document parameters
    var docWidth = app.activeDocument.width.as('px');
    var docHeight = app.activeDocument.height.as('px');

    // Define global lighting
    setGlobalLighting(90, 30);

    // Add background
    var backgroundImagePath = "/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram%20Photos/Assets/Textures/marble-color.png" 
    var gradientType = "radial";
    var gradientStops = [{ color: "000000",  opacity: 0 ,    midPoint: 70}, { color: "000000",  opacity: 25 ,  midPoint: 70}];
    var gradientAngle = 0;
    var gradientOffset = [0,0];

    var backgroundImageLayer = placeFileRandomly(backgroundImagePath);
    backgroundImageLayer.name = "Background Image";
    moveLayerInsideLayerset(backgroundImageLayer, printedPhotoGroup);
    var backgroundGradientLayer = drawStandardShape("full");
    backgroundGradientLayer.name = "Background Gradient";
    fillShapeWithGradient(gradientType, gradientStops, gradientAngle, gradientOffset);
    moveLayerInsideLayerset(backgroundGradientLayer, printedPhotoGroup);

    // Resize photo to fit and add effects
    resizeLayerToFitDimensions(photoLayer, docWidth * 20 / 24, docHeight * 20 / 30);
    photoLayer.move(backgroundGradientLayer, ElementPlacement.PLACEBEFORE);
    addPhotoOnPaperStyle(photoLayer);

    // Add Paper 
    var photoPaperLayer = addPhotoPaper(photoLayer);
    photoPaperLayer.name = "Photo Paper";
    photoPaperLayer.move(photoLayer, ElementPlacement.PLACEAFTER);

    // Text Parameters
    var fontSize = 24;

    // Add camera info
    var cameraParametersContent = getDocumentProperty("Model") + "  |  " + getDocumentProperty("EXIF tag 42036") + "\r" + getDocumentProperty("Shutter Speed") + "  |  " + getDocumentProperty("Aperture Value") + "  |  " + getDocumentProperty("ISO Speed Ratings");
    var cameraParametersLayer = addText (cameraParametersContent, docWidth * 2 / 24, docWidth * 3 / 24, "bottomleft", fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization);
    cameraParametersLayer.name = "Camera Parameters";
    moveLayerInsideLayerset(cameraParametersLayer, printedPhotoGroup);

    // Add Settings info
    var settingsBannerLayer = addText ("Settings  \u25B7", docWidth * 22 / 24, docHeight * 28 / 30, "bottomright", fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization);
    settingsBannerLayer.name = "Settings Banner";
    moveLayerInsideLayerset(settingsBannerLayer, printedPhotoGroup);

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// https://community.adobe.com/t5/photoshop-ecosystem-discussions/read-and-change-specific-words-in-a-text-layer/m-p/9812864

function set_text_style(from, len, size, fontPostScriptName) {

    try {

        var d = new ActionDescriptor();

        var r = new ActionReference();

        r.putEnumerated(stringIDToTypeID("textLayer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));

        d.putReference(stringIDToTypeID("null"), r);

        var d1 = new ActionDescriptor();

        var list1 = new ActionList();

        var d2 = new ActionDescriptor();

        d2.putInteger(stringIDToTypeID("from"), from);

        d2.putInteger(stringIDToTypeID("to"), from+len);

        var d3 = new ActionDescriptor();

        d3.putString(stringIDToTypeID("fontPostScriptName"), fontPostScriptName);

        d3.putUnitDouble(stringIDToTypeID("size"), stringIDToTypeID("pointsUnit"), size);

        d2.putObject(stringIDToTypeID("textStyle"), stringIDToTypeID("textStyle"), d3);

        list1.putObject(stringIDToTypeID("textStyleRange"), d2);

        d1.putList(stringIDToTypeID("textStyleRange"), list1);

        d.putObject(stringIDToTypeID("to"), stringIDToTypeID("textLayer"), d1);

        executeAction(stringIDToTypeID("set"), d, DialogModes.NO);

        }

    catch (e) { throw(e); } 

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addColorOverlay(fillColor, opacity, blendMode) {

	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var layerDesc = new ActionDescriptor();
	var overlayDesc = new ActionDescriptor();
	var colorDesc = new ActionDescriptor();
	var reference = new ActionReference();

    // Color
    var hexColor = new SolidColor();
    hexColor.rgb.hexValue = fillColor;

	reference.putProperty( s2t( "property" ), s2t( "layerEffects" ));
	reference.putEnumerated( s2t( "layer" ), s2t( "ordinal" ), s2t( "targetEnum" ));
	descriptor.putReference( c2t( "null" ), reference );
	overlayDesc.putEnumerated( s2t( "mode" ), s2t( "blendMode" ), s2t( blendMode ));
	colorDesc.putDouble( charIDToTypeID( "Rd  " ), hexColor.rgb.red );
    colorDesc.putDouble( charIDToTypeID( "Grn " ), hexColor.rgb.green );
    colorDesc.putDouble( charIDToTypeID( "Bl  " ), hexColor.rgb.blue );
	overlayDesc.putObject( s2t( "color" ), s2t( "RGBColor" ), colorDesc );
	overlayDesc.putUnitDouble( s2t( "opacity" ), s2t( "percentUnit" ), opacity );
	layerDesc.putObject( s2t( "solidFill" ), s2t( "solidFill" ), overlayDesc );
	descriptor.putObject( s2t( "to" ), s2t( "layerEffects" ), layerDesc );
	executeAction( s2t( "set" ), descriptor, DialogModes.NO );
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addGradientOverlay( gradientType, gradientOffset, gradientScale, gradientAngle, gradientStops, gradientMethod, blendMode, gradientOpacity) {

	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var shapeStyleDesc = new ActionDescriptor();
	var gradientDesc = new ActionDescriptor();
	var gradientStopsDesc = new ActionDescriptor();
    var offsetDesc = new ActionDescriptor();

	var reference = new ActionReference();

	reference.putProperty( s2t( "property" ), s2t( "layerEffects" ));
	reference.putEnumerated( s2t( "layer" ), s2t( "ordinal" ), s2t( "targetEnum" ));
	descriptor.putReference( c2t( "null" ), reference );


                offsetDesc.putUnitDouble( charIDToTypeID( "Hrzn" ), charIDToTypeID( "#Prc" ), gradientOffset[0] );
                offsetDesc.putUnitDouble( charIDToTypeID( "Vrtc" ), charIDToTypeID( "#Prc" ), gradientOffset[1] );
            gradientDesc.putObject( charIDToTypeID( "Ofst" ), charIDToTypeID( "Pnt " ), offsetDesc );

            gradientDesc.putEnumerated( c2t( "gs99" ), s2t( "gradientInterpolationMethodType" ), s2t( gradientMethod ));
            gradientDesc.putEnumerated( s2t( "mode" ), s2t( "blendMode" ), s2t( blendMode ));
            gradientDesc.putUnitDouble( s2t( "opacity" ), s2t( "percentUnit" ), gradientOpacity );
            gradientDesc.putEnumerated( s2t( "type" ), s2t( "gradientType" ), s2t( gradientType ));
            gradientDesc.putUnitDouble( s2t( "angle" ), s2t( "angleUnit" ), gradientAngle );            
            gradientDesc.putBoolean( s2t( "reverse" ), false );
            gradientDesc.putBoolean( s2t( "dither" ), true );
            gradientDesc.putUnitDouble( s2t( "scale" ), s2t( "percentUnit" ), gradientScale );
	
                // Colors stops List
                gradientStopsDesc.putEnumerated( s2t( "gradientForm" ), s2t( "gradientForm" ), s2t( "customStops" ));
                gradientStopsDesc.putDouble( c2t( "Intr" ), 4096 );
                    //Stops
                    //Color
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
                        stopDesc.putObject(s2t( "color" ), s2t( "RGBColor" ), colorStopDesc);
                        stopDesc.putEnumerated( s2t( "type" ), s2t( "colorStopType" ), s2t( "userStop" ) );
                        stopDesc.putDouble(s2t( "location" ), 4096 * i / (gradientStops.length - 1));
                        stopDesc.putDouble(s2t( "midpoint" ), gradientStops[i].midPoint);
                        stopListDesc.putObject(s2t( "colorStop" ), stopDesc);
                    }

                gradientStopsDesc.putList( s2t( "colors" ), stopListDesc );


                    // Insert opacity stops
                    var stopListDesc = new ActionList();
                    for (var i = 0; i < gradientStops.length; i++) {
                        // Opacity stop
                        var stopDesc = new ActionDescriptor();
                        stopDesc.putUnitDouble( s2t( "opacity" ), s2t( "percentUnit" ), gradientStops[i].opacity);
                        stopDesc.putInteger( s2t( "location" ), 4096 * i / (gradientStops.length - 1));
                        stopDesc.putInteger( s2t( "midpoint" ), gradientStops[i].midPoint);
                        stopListDesc.putObject( c2t( "TrnS" ), stopDesc );
                    };

                gradientStopsDesc.putList( c2t( "Trns" ), stopListDesc );
            gradientDesc.putObject( s2t( "gradient" ), c2t( "Grdn" ), gradientStopsDesc );


        shapeStyleDesc.putObject( s2t( "gradientFill" ), s2t( "gradientFill" ), gradientDesc );

	descriptor.putObject( s2t( "to" ), s2t( "layerEffects" ), shapeStyleDesc );

	executeAction( s2t( "set" ), descriptor, DialogModes.NO );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showSelectedLayer( layerName, showOnlyThisLayer) {

    var actionDescriptor = new ActionDescriptor();
        var layerDescriptor = new ActionList();
            var reference = new ActionReference();
            if(layerName) {
                reference.putName( charIDToTypeID( "Lyr " ), layerName );
            }   else{
                reference.putEnumerated( charIDToTypeID( "Lyr " ), stringIDToTypeID("ordinal"), charIDToTypeID( "Trgt" ) );
            }
            layerDescriptor.putReference( reference );
        actionDescriptor.putList( stringIDToTypeID("null"), layerDescriptor );
    if(showOnlyThisLayer == true) {
        actionDescriptor.putBoolean( charIDToTypeID( "TglO" ), true );
    }
    
    executeAction( charIDToTypeID( "Shw " ), actionDescriptor, DialogModes.NO );

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function selectAllLayers() {

    var reference = new ActionReference();
    reference.putEnumerated( charIDToTypeID( "Lyr " ), stringIDToTypeID("ordinal"), charIDToTypeID( "Trgt" ) );

    var actionDescriptor = new ActionDescriptor();
    actionDescriptor.putReference( stringIDToTypeID("null"), reference );
    
    executeAction( stringIDToTypeID( "selectAllLayers" ), actionDescriptor, DialogModes.NO );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showLayers() {

    var reference = new ActionReference();
    reference.putEnumerated( charIDToTypeID( "Lyr " ), stringIDToTypeID("ordinal"), charIDToTypeID( "Trgt" ) );

    var listDescriptor = new ActionList();
    listDescriptor.putReference( reference );
    
    var actionDescriptor = new ActionDescriptor();
    actionDescriptor.putList( stringIDToTypeID("null"), listDescriptor );
    
    executeAction( charIDToTypeID( "Shw " ), actionDescriptor, DialogModes.NO );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showAllLayers() {

    var layer = app.activeDocument.activeLayer;

    selectAllLayers();
    showLayers();

    app.activeDocument.activeLayer = layer;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

function updateMetadata (setting, newValue) {
    xmpMeta = new XMPMeta(app.activeDocument.xmpMetadata.rawData);

    xmpMeta.setProperty(ns, setting.crsName, newValue);

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Based on https://stackoverflow.com/questions/28990505/extendscript-how-to-check-whether-text-content-overflows-the-containing-rectang

function fitTextLayerToWidth (textLayer, targetWidth){

    textLayer.textItem.tracking = new UnitValue(50, "px");
    targetWidth = new UnitValue(targetWidth, "px");

    do {
        var size = textLayer.textItem.size;
        textLayer.textItem.size = size * 0.95; // To decrease iterations.
    }
    while(targetWidth < getRealTextLayerProperties(textLayer).width);

    do {
        var tracking = textLayer.textItem.tracking;
        textLayer.textItem.tracking = tracking * 1.05; // To decrease iterations.
    }
    while(targetWidth > getRealTextLayerProperties(textLayer).width);

    textLayer.textItem.tracking = tracking; //To ensure it fits.

    function getRealTextLayerProperties(textLayer) {

        var textLayerCopy = textLayer.duplicate(activeDocument, ElementPlacement.INSIDE);

        textLayerCopy.rasterize(RasterizeType.TEXTCONTENTS);

        var dimensions = getLayerDimensions(textLayerCopy);
        textLayerCopy.remove();

        return dimensions;

    }

    function getLayerDimensions(layer) {

        return { 
            width : layer.bounds[2] - layer.bounds[0],
            height : layer.bounds[3] - layer.bounds[1]
        }

    }
 
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Based on https://stackoverflow.com/questions/28990505/extendscript-how-to-check-whether-text-content-overflows-the-containing-rectang

function fitTextLayerToBox (textLayer, leftMargin, topMargin, rightMargin, bottomMargin) {

    // Make sure it is a centered paragraph text
    textLayer.textItem.kind = TextType.PARAGRAPHTEXT;
    textLayer.textItem.justification = Justification.CENTER;

    // Parameters
    leftMargin      = new UnitValue(    leftMargin,     'px');
    rightMargin     = new UnitValue(    rightMargin,    'px');
    topMargin       = new UnitValue(    topMargin,      'px');
    bottomMargin    = new UnitValue(    bottomMargin,   'px');

    // Resize text layer
    textLayer.textItem.width = rightMargin - leftMargin;
    textLayer.textItem.height = bottomMargin - topMargin;

    // Translate layer
    var centerX = (rightMargin + leftMargin) / 2;
    translateLayerTo(textLayer, centerX, topMargin, "topcenter");

    // Fit text in margins
    if(textLayer.textItem.contents != "") {
        textLayer.textItem.useAutoLeading = false;
        textLayer.textItem.leading = 60;
        var i = 0;

        do {
            var leading = textLayer.textItem.leading;
            textLayer.textItem.leading = leading * 1.05; // To decrease iterations.
        }
        while((textLayer.textItem.height > getRealTextLayerProperties(textLayer).height) | (i < 20));

        textLayer.textItem.leading = leading; //To ensure it fits.

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getRealTextLayerProperties(textLayer) {

    var textLayerCopy = textLayer.duplicate(activeDocument, ElementPlacement.INSIDE);

    textLayerCopy.textItem.height = app.activeDocument.height;
    
    textLayerCopy.rasterize(RasterizeType.TEXTCONTENTS);

    var layerProperties = getLayerProperties(textLayerCopy);
    textLayerCopy.remove();

    return layerProperties;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getLayerProperties(layer) {

    return { 
        width : layer.bounds[2] - layer.bounds[0],
        height : layer.bounds[3] - layer.bounds[1],
        right: layer.bounds[2],
        left: layer.bounds[0],
        top: layer.bounds[1],
        bottom: layer.bounds[3]
    };
    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function placeFileRandomly(filePath)    {

    var layer = addFile(filePath);

    var docWidth = app.activeDocument.width;
    var docHeight = app.activeDocument.height;

    var layerProperties = getLayerProperties(layer);
    var layerWidth = layerProperties.width;
    var layerHeight = layerProperties.height;

    randomXPosition = - Math.floor(Math.random() * (layerWidth - docWidth));
    randomYPosition = - Math.floor(Math.random() * (layerHeight - docHeight));

    translateLayerTo(layer, randomXPosition, randomYPosition, "topleft");

    return layer;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addPhotoPaper (layer) {

    // Document parameters
    var docWidth = app.activeDocument.width.as('px');
    var docHeight = app.activeDocument.height.as('px');
    var photoMargin = docWidth / 24;

    var layerProperties = getLayerProperties(layer);
    var layerWidth = layerProperties.width.as('px');
    var layerHeight = layerProperties.height.as('px');
    var layerLeft = layerProperties.left.as('px');
    var layerTop = layerProperties.top.as('px');

    var paperLayer = drawSquare(layerLeft - photoMargin, layerTop - photoMargin, layerWidth + 2 * photoMargin, layerHeight + 2 * photoMargin);
    fillShapeWithPaperTexture ("Polaroid Paper", 5);
    addPaperStyle(100, true, true, true, 0, 0, 0, 65, true, 90, 4, 0, 5, 0, false, "Linear", true, true, true, true, 242.249024, 240.634248, 237.404664, 100, true, true, true, 255, 255, 255, 50, 0, 0, 0, 50, true, 90, 30, 100, 2, "Linear", false, 0, false, false);

    paperLayer.move(layer, ElementPlacement.PLACEAFTER);

    return paperLayer;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fillShapeWithPaperTexture(textureName, scale) {

    var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var descriptor2 = new ActionDescriptor();
	var descriptor3 = new ActionDescriptor();
	var descriptor5 = new ActionDescriptor();
	var descriptor6 = new ActionDescriptor();
	var reference = new ActionReference();

	reference.putEnumerated( s2t( "contentLayer" ), s2t( "ordinal" ), s2t( "targetEnum" ));
	descriptor.putReference( c2t( "null" ), reference );
	descriptor3.putUnitDouble( s2t( "scale" ), s2t( "percentUnit" ), scale );
	descriptor5.putString( s2t( "name" ), textureName );
	descriptor3.putObject( s2t( "pattern" ), s2t( "pattern" ), descriptor5 );
	descriptor2.putObject( s2t( "fillContents" ), s2t( "patternLayer" ), descriptor3 );
	descriptor6.putBoolean( s2t( "fillEnabled" ), true );
	descriptor2.putObject( s2t( "strokeStyle" ), s2t( "strokeStyle" ), descriptor6 );
	descriptor.putObject( s2t( "to" ), s2t( "shapeStyle" ), descriptor2 );
	executeAction( s2t( "set" ), descriptor, DialogModes.NO );

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addPaperStyle(scale, enabled, present, showInDialog, red, Grn, blue, opacity, useGlobalAngle, localLightingAngle, distance, chokeMatte, blur, noise, AntA, name2, layerConceals, enabled2, present2, showInDialog2, red2, Grn2, blue2, opacity2, enabled3, present3, showInDialog3, red3, Grn3, blue3, highlightOpacity, red4, Grn4, blue4, shadowOpacity, useGlobalAngle2, localLightingAngle2, localLightingAltitude, strengthRatio, blur2, name3, antialiasGloss, softness, useShape, useTexture) {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var descriptor2 = new ActionDescriptor();
	var descriptor3 = new ActionDescriptor();
	var descriptor4 = new ActionDescriptor();
	var descriptor5 = new ActionDescriptor();
	var descriptor6 = new ActionDescriptor();
	var descriptor7 = new ActionDescriptor();
	var descriptor8 = new ActionDescriptor();
	var descriptor9 = new ActionDescriptor();
	var descriptor10 = new ActionDescriptor();
	var descriptor11 = new ActionDescriptor();
	var reference = new ActionReference();

	reference.putProperty( s2t( "property" ), s2t( "layerEffects" ));
	reference.putEnumerated( s2t( "layer" ), s2t( "ordinal" ), s2t( "targetEnum" ));
	descriptor.putReference( c2t( "null" ), reference );
	descriptor2.putUnitDouble( s2t( "scale" ), s2t( "percentUnit" ), scale );
	descriptor3.putBoolean( s2t( "enabled" ), enabled );
	descriptor3.putBoolean( s2t( "present" ), present );
	descriptor3.putBoolean( s2t( "showInDialog" ), showInDialog );
	descriptor3.putEnumerated( s2t( "mode" ), s2t( "blendMode" ), s2t( "multiply" ));
	descriptor4.putDouble( s2t( "red" ), red );
	descriptor4.putDouble( c2t( "Grn " ), Grn );
	descriptor4.putDouble( s2t( "blue" ), blue );
	descriptor3.putObject( s2t( "color" ), s2t( "RGBColor" ), descriptor4 );
	descriptor3.putUnitDouble( s2t( "opacity" ), s2t( "percentUnit" ), opacity );
	descriptor3.putBoolean( s2t( "useGlobalAngle" ), useGlobalAngle );
	descriptor3.putUnitDouble( s2t( "localLightingAngle" ), s2t( "angleUnit" ), localLightingAngle );
	descriptor3.putUnitDouble( s2t( "distance" ), s2t( "pixelsUnit" ), distance );
	descriptor3.putUnitDouble( s2t( "chokeMatte" ), s2t( "pixelsUnit" ), chokeMatte );
	descriptor3.putUnitDouble( s2t( "blur" ), s2t( "pixelsUnit" ), blur );
	descriptor3.putUnitDouble( s2t( "noise" ), s2t( "percentUnit" ), noise );
	descriptor3.putBoolean( c2t( "AntA" ), AntA );
	descriptor5.putString( s2t( "name" ), name2 );
	descriptor3.putObject( c2t( "TrnS" ), c2t( "ShpC" ), descriptor5 );
	descriptor3.putBoolean( s2t( "layerConceals" ), layerConceals );
	descriptor2.putObject( s2t( "dropShadow" ), s2t( "dropShadow" ), descriptor3 );
	descriptor6.putBoolean( s2t( "enabled" ), enabled2 );
	descriptor6.putBoolean( s2t( "present" ), present2 );
	descriptor6.putBoolean( s2t( "showInDialog" ), showInDialog2 );
	descriptor6.putEnumerated( s2t( "mode" ), s2t( "blendMode" ), s2t( "multiply" ));
	descriptor7.putDouble( s2t( "red" ), red2 );
	descriptor7.putDouble( c2t( "Grn " ), Grn2 );
	descriptor7.putDouble( s2t( "blue" ), blue2 );
	descriptor6.putObject( s2t( "color" ), s2t( "RGBColor" ), descriptor7 );
	descriptor6.putUnitDouble( s2t( "opacity" ), s2t( "percentUnit" ), opacity2 );
	descriptor2.putObject( s2t( "solidFill" ), s2t( "solidFill" ), descriptor6 );
	descriptor8.putBoolean( s2t( "enabled" ), enabled3 );
	descriptor8.putBoolean( s2t( "present" ), present3 );
	descriptor8.putBoolean( s2t( "showInDialog" ), showInDialog3 );
	descriptor8.putEnumerated( s2t( "highlightMode" ), s2t( "blendMode" ), s2t( "screen" ));
	descriptor9.putDouble( s2t( "red" ), red3 );
	descriptor9.putDouble( c2t( "Grn " ), Grn3 );
	descriptor9.putDouble( s2t( "blue" ), blue3 );
	descriptor8.putObject( s2t( "highlightColor" ), s2t( "RGBColor" ), descriptor9 );
	descriptor8.putUnitDouble( s2t( "highlightOpacity" ), s2t( "percentUnit" ), highlightOpacity );
	descriptor8.putEnumerated( s2t( "shadowMode" ), s2t( "blendMode" ), s2t( "multiply" ));
	descriptor10.putDouble( s2t( "red" ), red4 );
	descriptor10.putDouble( c2t( "Grn " ), Grn4 );
	descriptor10.putDouble( s2t( "blue" ), blue4 );
	descriptor8.putObject( s2t( "shadowColor" ), s2t( "RGBColor" ), descriptor10 );
	descriptor8.putUnitDouble( s2t( "shadowOpacity" ), s2t( "percentUnit" ), shadowOpacity );
	descriptor8.putEnumerated( s2t( "bevelTechnique" ), s2t( "bevelTechnique" ), s2t( "softMatte" ));
	descriptor8.putEnumerated( s2t( "bevelStyle" ), s2t( "bevelEmbossStyle" ), s2t( "innerBevel" ));
	descriptor8.putBoolean( s2t( "useGlobalAngle" ), useGlobalAngle2 );
	descriptor8.putUnitDouble( s2t( "localLightingAngle" ), s2t( "angleUnit" ), localLightingAngle2 );
	descriptor8.putUnitDouble( s2t( "localLightingAltitude" ), s2t( "angleUnit" ), localLightingAltitude );
	descriptor8.putUnitDouble( s2t( "strengthRatio" ), s2t( "percentUnit" ), strengthRatio );
	descriptor8.putUnitDouble( s2t( "blur" ), s2t( "pixelsUnit" ), blur2 );
	descriptor8.putEnumerated( s2t( "bevelDirection" ), s2t( "bevelEmbossStampStyle" ), c2t( "In  " ));
	descriptor11.putString( s2t( "name" ), name3 );
	descriptor8.putObject( c2t( "TrnS" ), c2t( "ShpC" ), descriptor11 );
	descriptor8.putBoolean( s2t( "antialiasGloss" ), antialiasGloss );
	descriptor8.putUnitDouble( s2t( "softness" ), s2t( "pixelsUnit" ), softness );
	descriptor8.putBoolean( s2t( "useShape" ), useShape );
	descriptor8.putBoolean( s2t( "useTexture" ), useTexture );
	descriptor2.putObject( s2t( "bevelEmboss" ), s2t( "bevelEmboss" ), descriptor8 );
	descriptor.putObject( s2t( "to" ), s2t( "layerEffects" ), descriptor2 );
	executeAction( s2t( "set" ), descriptor, DialogModes.NO );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addPhotoOnPaperStyle(selectedlayer) {

    app.activeDocument.activeLayer = selectedlayer;

	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();
	reference.putProperty( s2t( "property" ), s2t( "layerEffects" ));
	reference.putEnumerated( s2t( "layer" ), s2t( "ordinal" ), s2t( "targetEnum" ));
	descriptor.putReference( c2t( "null" ), reference );
	var descriptor2 = new ActionDescriptor();
	descriptor2.putUnitDouble( s2t( "scale" ), s2t( "percentUnit" ), 100.000000 );
	var descriptor3 = new ActionDescriptor();
	descriptor3.putBoolean( s2t( "enabled" ), true );
	descriptor3.putBoolean( s2t( "present" ), true );
	descriptor3.putBoolean( s2t( "showInDialog" ), true );
	descriptor3.putEnumerated( s2t( "mode" ), s2t( "blendMode" ), s2t( "multiply" ));
	var descriptor4 = new ActionDescriptor();
	descriptor4.putDouble( s2t( "red" ), 0.000000 );
	descriptor4.putDouble( c2t( "Grn " ), 0.000000 );
	descriptor4.putDouble( s2t( "blue" ), 0.000000 );
	descriptor3.putObject( s2t( "color" ), s2t( "RGBColor" ), descriptor4 );
	descriptor3.putUnitDouble( s2t( "opacity" ), s2t( "percentUnit" ), 35.000000 );
	descriptor3.putBoolean( s2t( "useGlobalAngle" ), true );
	descriptor3.putUnitDouble( s2t( "localLightingAngle" ), s2t( "angleUnit" ), 90.000000 );
	descriptor3.putUnitDouble( s2t( "distance" ), s2t( "pixelsUnit" ), 3.000000 );
	descriptor3.putUnitDouble( s2t( "chokeMatte" ), s2t( "pixelsUnit" ), 0.000000 );
	descriptor3.putUnitDouble( s2t( "blur" ), s2t( "pixelsUnit" ), 7.000000 );
	descriptor3.putUnitDouble( s2t( "noise" ), s2t( "percentUnit" ), 0.000000 );
	descriptor3.putBoolean( c2t( "AntA" ), false );
	var descriptor5 = new ActionDescriptor();
	descriptor5.putString( s2t( "name" ), "Linear" );
	descriptor3.putObject( c2t( "TrnS" ), c2t( "ShpC" ), descriptor5 );
	descriptor2.putObject( s2t( "innerShadow" ), s2t( "innerShadow" ), descriptor3 );
	var descriptor6 = new ActionDescriptor();
	descriptor6.putBoolean( s2t( "enabled" ), true );
	descriptor6.putBoolean( s2t( "present" ), true );
	descriptor6.putBoolean( s2t( "showInDialog" ), true );
	descriptor6.putEnumerated( s2t( "highlightMode" ), s2t( "blendMode" ), s2t( "screen" ));
	var descriptor7 = new ActionDescriptor();
	descriptor7.putDouble( s2t( "red" ), 255.000000 );
	descriptor7.putDouble( c2t( "Grn " ), 255.000000 );
	descriptor7.putDouble( s2t( "blue" ), 255.000000 );
	descriptor6.putObject( s2t( "highlightColor" ), s2t( "RGBColor" ), descriptor7 );
	descriptor6.putUnitDouble( s2t( "highlightOpacity" ), s2t( "percentUnit" ), 0.000000 );
	descriptor6.putEnumerated( s2t( "shadowMode" ), s2t( "blendMode" ), s2t( "multiply" ));
	var descriptor8 = new ActionDescriptor();
	descriptor8.putDouble( s2t( "red" ), 0.000000 );
	descriptor8.putDouble( c2t( "Grn " ), 0.000000 );
	descriptor8.putDouble( s2t( "blue" ), 0.000000 );
	descriptor6.putObject( s2t( "shadowColor" ), s2t( "RGBColor" ), descriptor8 );
	descriptor6.putUnitDouble( s2t( "shadowOpacity" ), s2t( "percentUnit" ), 50.000000 );
	descriptor6.putEnumerated( s2t( "bevelTechnique" ), s2t( "bevelTechnique" ), s2t( "softMatte" ));
	descriptor6.putEnumerated( s2t( "bevelStyle" ), s2t( "bevelEmbossStyle" ), s2t( "innerBevel" ));
	descriptor6.putBoolean( s2t( "useGlobalAngle" ), true );
	descriptor6.putUnitDouble( s2t( "localLightingAngle" ), s2t( "angleUnit" ), 90.000000 );
	descriptor6.putUnitDouble( s2t( "localLightingAltitude" ), s2t( "angleUnit" ), 30.000000 );
	descriptor6.putUnitDouble( s2t( "strengthRatio" ), s2t( "percentUnit" ), 100.000000 );
	descriptor6.putUnitDouble( s2t( "blur" ), s2t( "pixelsUnit" ), 3.000000 );
	descriptor6.putEnumerated( s2t( "bevelDirection" ), s2t( "bevelEmbossStampStyle" ), c2t( "In  " ));
	var descriptor9 = new ActionDescriptor();
	descriptor9.putString( s2t( "name" ), "Linear" );
	descriptor6.putObject( c2t( "TrnS" ), c2t( "ShpC" ), descriptor9 );
	descriptor6.putBoolean( s2t( "antialiasGloss" ), false );
	descriptor6.putUnitDouble( s2t( "softness" ), s2t( "pixelsUnit" ), 3.000000 );
	descriptor6.putBoolean( s2t( "useShape" ), false );
	descriptor6.putBoolean( s2t( "useTexture" ), false );
	descriptor2.putObject( s2t( "bevelEmboss" ), s2t( "bevelEmboss" ), descriptor6 );
	descriptor2.putUnitDouble( s2t( "globalAltitude" ), s2t( "angleUnit" ), 45.000000 );
	descriptor.putObject( s2t( "to" ), s2t( "layerEffects" ), descriptor2 );
	executeAction( s2t( "set" ), descriptor, DialogModes.NO );

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setGlobalLighting(globalLightingAngle, globalAltitude) {

	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();
	reference.putProperty( s2t( "property" ), s2t( "globalAngle" ));
	reference.putEnumerated( s2t( "document" ), s2t( "ordinal" ), s2t( "targetEnum" ));
	descriptor.putReference( c2t( "null" ), reference );
	var descriptor2 = new ActionDescriptor();
	descriptor2.putUnitDouble( s2t( "globalLightingAngle" ), s2t( "angleUnit" ), globalLightingAngle );
	descriptor2.putUnitDouble( s2t( "globalAltitude" ), s2t( "angleUnit" ), globalAltitude );
	descriptor.putObject( s2t( "to" ), s2t( "globalAngle" ), descriptor2 );
	executeAction( s2t( "set" ), descriptor, DialogModes.NO );

}
