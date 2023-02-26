#target photoshop

#include defaultParameters.jsx
#include utils.jsx
#include metadata.jsx
#include effects.jsx
#include colorGrading.jsx
#include colorMixer.jsx
#include histograms.jsx
#include hslTable.jsx
#include photoPrint.jsx
#include shapes.jsx
#include sliders.jsx
#include texts.jsx
#include toneCurves.jsx

// TODO Convert all photo parameters and reference doc to a function that returns an object
ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
var ns = XMPConst.NS_CAMERA_RAW //"http://ns.adobe.com/camera-raw-settings/1.0/"; // Found in xmp header

// Doc info
var docRef = app.activeDocument;
var docRefPath = docRef.path;
var docRefName = refLayerName = docRef.name.substr(0, docRef.name.lastIndexOf('.'));

// Preset info
var presetInfo = findPresetInfoInKeywords();
var presetName = presetInfo.presetName;
var presetPackName = presetInfo.presetPackName;

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
// addHistograms(100, 100, 256, 256, 2);
// exportDocumentsAsPNG(undefined, docRefPath);


// addPrintedPhoto(app.activeDocument.activeLayer);
// var refLayerName = "Layer 0"
// addBasicPanel();
// addColorMixerPanel();
// addColorGradingPanel();
// addToneCurvesPanel();
// exportDocumentsAsPNG(undefined, docRefPath);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Edited and unedited documents
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Edited
openAsLayer(docRef);
convertColorProfileToSRGB(docRef);

// Before
var fileRef_unedited = createUneditedCopy(docRef, "_unedited");
var docRef_unedited = app.open(fileRef_unedited, OpenDocumentType.CAMERARAW, false);
openAsLayer(docRef_unedited);
app.activeDocument.activeLayer.name = docRefName;
convertColorProfileToSRGB(docRef_unedited);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Reference documents
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TODO Convert to function. Arguments (referenceDocument)

// Unresized - Before
var unresized_before = app.documents.add(docRef.width, docRef.height, targetResolution, docRefName + "_unresized_before");
var unresized_before = duplicateDocument(docRef_unedited, docRefName + "_unresized_before");

// Unresized - Edited
var unresized_after = duplicateDocument(docRef, docRefName + "_unresized_after");

// Fitted - Before
var fitted_before = duplicateDocument(docRef_unedited, docRefName + "_" + targetWidth + "x" + targetHeight + "fitted_before");
resizeImageToFitCanvas(fitted_before, targetWidth, targetHeight);

// Fitted - Edited
var fitted_after = duplicateDocument(docRef, docRefName + "_" + targetWidth + "x" + targetHeight + "fitted_after");
resizeImageToFitCanvas(fitted_after, targetWidth, targetHeight);

// Filled - Before
var filled_before = duplicateDocument(docRef_unedited, docRefName + "_" + targetWidth + "x" + targetHeight + "filled_before");
resizeImageToFillCanvas(filled_before, targetWidth, targetHeight);

// Filled - Edited
var filled_after = duplicateDocument(docRef, docRefName + "_" + targetWidth + "x" + targetHeight + "filled_after");
resizeImageToFillCanvas(filled_after, targetWidth, targetHeight);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Playground

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Unedited - printedPhoto version
var docRef_printedPhoto = duplicateDocument(filled_after, docRefName + "_printedPhoto");
resizeImageToFitCanvas(docRef_printedPhoto, targetWidth, targetHeight);
addPrintedPhoto(docRef_printedPhoto.activeLayer);

// Create beforeAfter_split_horizontal version
var docRef_beforeAfter_split_horizontal = duplicateDocument(filled_after, docRefName + "_beforeAfter_split_horizontal");
copyActiveLayerFromSourceToTarget(filled_before, docRef_beforeAfter_split_horizontal);
addMask('horizontal');
addBeforeAfterLabels ('horizontal');
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);

// Create beforeAfter_split_vertical version
var docRef_beforeAfter_split_vertical = duplicateDocument(filled_after, docRefName + "_beforeAfter_split_vertical");
copyActiveLayerFromSourceToTarget(filled_before, docRef_beforeAfter_split_vertical);
addMask('vertical');
addBeforeAfterLabels ('vertical');
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);

// Create beforeAfter_split_diagonal version
var docRef_beforeAfter_split_diagonal = duplicateDocument(filled_after, docRefName + "_beforeAfter_split_diagonal");
copyActiveLayerFromSourceToTarget(filled_before, docRef_beforeAfter_split_diagonal);
addMask('diagonal');
addBeforeAfterLabels ('diagonal');
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);

// Create beforeAfter_sideBySide_horizontal version
var docRef_beforeAfter_sideBySide_horizontal = duplicateDocument(filled_after, docRefName + "_beforeAfter_sideBySide_horizontal");
resizeLayerToFillDimensions(activeDocument.activeLayer, targetWidth, targetHeight / 2);
translateLayerTo(activeDocument.activeLayer, targetWidth / 2, targetHeight * 3 / 4, "middlecenter");
copyActiveLayerFromSourceToTarget(filled_before, docRef_beforeAfter_sideBySide_horizontal);
resizeLayerToFillDimensions(activeDocument.activeLayer, targetWidth, targetHeight / 2);
translateLayerTo(activeDocument.activeLayer, targetWidth / 2, targetHeight / 4, "middlecenter");
addMask('horizontal');
addBeforeAfterLabels ('horizontal');
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);

// Create beforeAfter_sideBySide_vertical version
var docRef_beforeAfter_sideBySide_vertical = duplicateDocument(filled_after, docRefName + "_beforeAfter_sideBySide_vertical");
resizeLayerToFillDimensions(activeDocument.activeLayer, targetWidth / 2, targetHeight);
translateLayerTo(activeDocument.activeLayer, targetWidth * 3 / 4, targetHeight / 2, "middlecenter");
copyActiveLayerFromSourceToTarget(filled_before, docRef_beforeAfter_sideBySide_vertical);
resizeLayerToFillDimensions(activeDocument.activeLayer, targetWidth / 2, targetHeight);
translateLayerTo(activeDocument.activeLayer, targetWidth / 4, targetHeight / 2, "middlecenter")
addMask('vertical');
addBeforeAfterLabels ('vertical');
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);

// Create beforeAfter_detail_horizontal version
var docRef_beforeAfter_detail_horizontal = app.documents.add(targetWidth, targetHeight, targetResolution, docRefName + "_beforeAfter_detail_horizontal");

copyActiveLayerFromSourceToTarget(unresized_after, docRef_beforeAfter_detail_horizontal);
translateLayerTo(activeDocument.activeLayer, targetWidth / 2, targetHeight * 3 / 4, "middlecenter");

copyActiveLayerFromSourceToTarget(unresized_before, docRef_beforeAfter_detail_horizontal);
translateLayerTo(activeDocument.activeLayer, targetWidth / 2, targetHeight / 4, "middlecenter");

addMask('horizontal');
addBeforeAfterLabels ('horizontal');
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);

// Create panel_basic version
var docRef_panel_basic = duplicateDocument(filled_after, docRefName + "_panel_basic");
addDarkGlassLayer(undefined, "leftsidebar");
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);
var basicPanelGroup = addBasicPanel();

// Create panel_toneCurve version
var docRef_panel_toneCurves = duplicateDocument(filled_after, docRefName + "_panel_toneCurves");
addDarkGlassLayer(undefined, "leftsidebar");
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);
var toneCurvesPanelGroup = addToneCurvesPanel();

// Create panel_colorMixer version
var docRef_panel_colorMixer = duplicateDocument(filled_after, docRefName + "_panel_colorMixer");
addDarkGlassLayer(undefined, "leftsidebar");
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);
var colorMixerPanelGroup = addColorMixerPanel();

// Create panel_colorGrading version
var docRef_panel_colorGrading = duplicateDocument(filled_after, docRefName + "_panel_colorGrading");
addDarkGlassLayer(undefined, "leftsidebar");
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);
var colorGradingPanelGroup = addColorGradingPanel();

// Create panel_all version
var docRef_panel_all = duplicateDocument(filled_after, docRefName + "_panel_all");
addDarkGlassLayer(undefined, "center");
addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);
var allPanelsGroup = addAllPanels();

// Create preset_info version
var docRef_preset = duplicateDocument(filled_after, docRefName + "_preset");
addDarkGlassLayer(undefined, "center");
var presetInfoGroup = addPresetInfo();

// Create photo_context version
var docRef_photoContext = duplicateDocument(filled_after, docRefName + "_photoContext");
addDarkGlassLayer(undefined, "center");
var photoContextGroup = addPhotoContext();

// Create camera_settings version



// Edit metadata
// var docRef_metadata = duplicateDocument(filled_after, "metadata");
// makeDarkerNoisierBlurier(docRef_metadata, 10, 2, 128);
// addMetadataList([272, 42036, 37377, 37378, 34855, 37386, 'location', 'date', 'caption'], fontSize, textColor, fontName, fontTracking);
// addLogo("ChainCircle x Raleway_White - Horizontal", "bottomright", 1 / 30);
// exportCopyAsPNG(docRef_metadata, docRefPath, undefined,  "instagram_", undefined)


// Export copies
// var docsToExport = [defaultFile, docRef_unedited, docRef_after, docRef_beforeAfter_sideBySide_horizontal, docRef_beforeAfter_sideBySide_vertical, docRef_beforeAfter_split_diagonal, docRef_beforeAfter_split_horizontal, docRef_beforeAfter_split_vertical, docRef_panel_basic, docRef_panel_toneCurves, docRef_panel_colorGrading, docRef_panel_colorMixer];
exportDocumentsAsPNG(undefined, docRefPath);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createUneditedCopy (docRef, documentSuffix) {

    var sourceFilePath = docRef.fullName.fsName;
    var sourceFileExtension = sourceFilePath.substr(sourceFilePath.lastIndexOf(".") + 1, sourceFilePath.length);
    sourceFile = new File(sourceFilePath);

    var targetFilePath = docRef.fullName.fsName.substr(0, docRef.fullName.fsName.lastIndexOf('.')) + documentSuffix + '.' + sourceFileExtension;
    targetFile = new File(targetFilePath);

    sourceFile.copy(targetFile);

    if(sourceFileExtension != "dng") {

        var sourceSidecarFilePath = sourceFilePath.substr(0, sourceFilePath.lastIndexOf(".")) + '.xmp';
        sourceSidecarFile = new File(sourceSidecarFilePath);
        sourceSidecarFile.close();

        var targetSidecarFilePath = sourceFilePath.substr(0, sourceFilePath.lastIndexOf(".")) + documentSuffix + '.xmp';
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

        xmpMeta.setProperty(ns, "AlreadyApplied", false);

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
    var photoContextCaption =   addText (captionContent, docWidth * 3 / 24, docHeight * 8 / 30, "topleft", fontSize, fontHexColor, fontName, fontTracking, Justification.CENTER, fontCapitalization)
    if(captionContent && captionContent.length>50)  {
        fitTextLayerToBox (photoContextCaption, margins.left, margins.top, margins.right, margins.bottom);
    }
    moveLayerInsideLayerset(photoContextCaption, photoContextGroup);

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