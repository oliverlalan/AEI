#include ae-utils.jsx
#include ae-style.jsx

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

var interpolationSteps = 30;

var panelCompositionParameters = {
    width: 405,
    height: 1350,
    pixelAspect: 1,
    duration: 12,
    frameRate: 30,
    padding: {
        top: 90,
        right: 72,
        bottom: 90,
        left: 72
    }
};


var toneCurveCompositionParameters = {
    width: 225,
    height: 225,
    anchorPoint: "topLeft",
    pixelAspect: 1,
    duration: 6,
    frameRate: 30,
    padding: {
        top: 45,
        right: 0,
        bottom: 0,
        left: 0
    },
}

var toneCurvePathParameters = {
    stroke: {
        size: 4,
        color: hexToRgb(toneCurvePathStrokecolor)
    },
    shadow: {
        opacity: 0.35 * 255,
        direction: 180,
        distance: 3,
        softness: 18,
    }
}

var toneCurveBackgroundParameters = {
    width: 225,
    height: 225,
    fill: hexToRgb(toneCurveSolidBackgroundcolor)
}

var toneCurveGridParameters = {
    width: 180,
    height: 180,
    anchor: [44.75, 44.75], 
    corner: [0, 0], 
    border: 2
}

// border = choose
// anchor point = - (border / 2 )
// corner = width / splits

var toneCurveAnchorPointParameters = {
    diameter : 12, 
    fill : hexToRgb(toneCurveAnchorPointFillColor),
    stroke : {
        color: hexToRgb(toneCurveAnchorPointStrokeColor),
        size: 1,
        opacity: 50,
        position: 2 // Inside
    },
    shadow: {
        opacity: 0.35 * 255,
        direction: 180,
        distance: 3,
        softness: 18,
    },
    animation: {
        start: 1,
        end: 2
    }
}

var defaultAnimationParameters = {
    easeIn: new KeyframeEase(0.5, 33.3333),
    easeOut: new KeyframeEase(0.5, 33.3333)
};

// Calls
// Test value
// var exposure = {
//     displayName: "Exposure",
//     defaultValue: 0,
//     min: -100,
//     max:  100,
//     settingValue: +35,
//     gradientColor1: hexToRgb("737373"),
//     gradientColor2: hexToRgb("737373")

// };

// var contrast = {
//     displayName: "Contrast",
//     defaultValue: 0,
//     min: -100,
//     max:  100,
//     settingValue: +80,
//     gradientColor1: hexToRgb("737373"),
//     gradientColor2: hexToRgb("737373")

// }



