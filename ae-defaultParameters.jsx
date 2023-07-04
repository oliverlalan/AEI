#include ae-utils.jsx
// #include ae-style.jsx

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: Default Parameters
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// var settingsArray = [
//     exposure,contrast,highlights,shadows,whites,blacks,
//     texture,clarity,dehaze,vibrance,saturation,
//     parametricShadows, parametricDarks, parametricLights, parametricHighlights, parametricShadowSplit, parametricMidtoneSplit, parametricHighlightSplit,
//     toneCurve, toneCurveRed, toneCurveGreen, toneCurveBlue,
//     redHue,orangeHue,yellowHue,greenHue,aquaHue,blueHue,purpleHue,magentaHue,
//     redSaturation,orangeSaturation,yellowSaturation,greenSaturation,aquaSaturation,blueSaturation,purpleSaturation,magentaSaturation,
//     redLuminance,orangeLuminance,yellowLuminance,greenLuminance,aquaLuminance,blueLuminance,purpleLuminance,magentaLuminance,
//     midtoneHue,midtoneSat,midtoneLum,shadowHue,shadowSat,shadowLum,highlightHue,highlightSat,highlightLum,
//     globalHue,globalSat,globalLum,blending,balance,
//     sharpeningAmount,sharpeningDetail,sharpeningMasking,sharpeningRadius,
//     luminanceNoiseReduction,colorNoiseReduction,colorNoiseReductionDetail,colorNoiseReductionSmoothness,
//     postCropVignetteStyle, postCropVignetteAmount, postCropVignetteMidpoint, postCropVignetteRoundness, postCropVignetteFeather, postCropVignetteHighlightContrast,
//     grainAmount,grainSize,grainFrequency,
//     shadowTintCalibration,redHueCalibration,redSaturationCalibration,greenHueCalibration,greenSaturationCalibration,blueHueCalibration,blueSaturationCalibration
// ]

// load library
if ( ExternalObject.AdobeXMPScript == undefined ) {
    ExternalObject.AdobeXMPScript = new ExternalObject( "lib:AdobeXMPScript");
}

var ns = XMPConst.NS_CAMERA_RAW //"http://ns.adobe.com/camera-raw-settings/1.0/";


// Reference parameters
var referenceKeyFrame = 0;

// Required parameters
var musicBPM = 120;
var projectFPS = 30;
var projectDuration = 70; //TODO Compute based on image data

var framesPerBeat = 30; // TODO Refine framesPerBeat = projectFPS / (musicBPS * 60)

// TODO Compute animation times based on proportions for groups and settings.

// Animation
var panelSwipeToHoldRatio = 2;
var panelSwipeInFrames = (panelSwipeToHoldRatio * framesPerBeat) / (panelSwipeToHoldRatio + 1);
var panelTitleHoldFrames = framesPerBeat - panelSwipeInFrames;

var groupSwipeToHoldRatio = 2;
var groupSwipeInFrames = (groupSwipeToHoldRatio * framesPerBeat) / (groupSwipeToHoldRatio + 1);
var groupHoldFrames = framesPerBeat - groupSwipeInFrames;

var settingAnimationToHoldRatio = 2;
var settingAnimationFrames = (settingAnimationToHoldRatio * framesPerBeat) / (settingAnimationToHoldRatio + 1); // Frames for animation
var settingHoldFrames = framesPerBeat - settingAnimationFrames; // Frames to wait after setting animation
