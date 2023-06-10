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

// Animation
var projectFPS = interpolationSteps =  30;
var tempo = 111;
var framesPerBeat = 30;
var referenceAnimationKeyFramesIncrement = framesPerBeat / projectFPS;
var framesPerEase = 8;
var referenceKeyFrame = 0;
var referenceKeyFramesIncrement = framesPerBeat;
var panelSwipeInFrames = 12;
var panelTitleHoldFrames = 22;
var groupSwipeInFrames = 12;
var groupHoldFrames = 12;
var settingAnimationFrames = 24; // Frames for animation
var settingHoldFrames = 6; // Frames to wait after setting animation
// var referenceSwipeTime = 9 / 30;
// var referenceHoldTime = 3 / 30;
// var referenceAnimationTime = 18 / 30;
// var nextKeyTime = referenceKeyTime + framesPerBeat;


var projectDuration = 50; //TODO Compute based on image data

