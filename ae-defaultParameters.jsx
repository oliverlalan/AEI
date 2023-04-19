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

// Animation
var projectFPS = interpolationSteps =  30;
var tempo = 111;
var framesPerBeat = 30;
var referenceAnimationKeyFramesIncrement = framesPerBeat / projectFPS;
var framesPerEase = 8;
var referenceKeyTime = 0;
var referenceKeyTimeIncrement = framesPerBeat / projectFPS;
var nextKeyTime = referenceKeyTime + framesPerBeat;


var projectDuration = 30; //TODO Compute based on image data

// Dashboard Composition
var dashboardCompositionParameters = {
    width: 1080,
    height: 570,
    position: [0,0],
    pixelAspect: 1,
    duration: 12,
    frameRate: projectFPS,
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}

// Panel Composition
var panelCompositionParameters = {
    width: 1080,
    height: 570,
    position: [0,0],
    pixelAspect: 1,
    duration: 12,
    frameRate: projectFPS,
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
};

var panelTitleParameters = {
    width: 1080,
    height: 570,
    position: [panelCompositionParameters.width / 2, panelCompositionParameters.height / 2],
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    anchorPoint: "middleCenter",
    fontSize: 30, 
    fontColor: hexToRgb("FFFFFF"),
    fontName: "WorkSansRoman-Medium",
    fontTracking: 200,
    fontCapitalization: true,
    justification: ParagraphJustification.CENTER_JUSTIFY
};

// Group Composition
var groupCompositionParameters = {
    width: 1080,
    height: 570,
    position: [0,0],
    pixelAspect: 1,
    duration: 12,
    frameRate: projectFPS,
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}


var groupTitleParameters = {
    width: 1080,
    height: 3 * 45,
    padding: {
        top: 45,
        right: 0,
        bottom: 45,
        left: 0
    },
    position: [groupCompositionParameters.width / 2, 2 * 45],
    anchorPoint: "bottomCenter",
    fontSize: 24, 
    fontColor: hexToRgb("FFFFFF"),
    fontName: "WorkSansRoman-Medium",
    fontTracking: 200,
    fontCapitalization: true,
    justification: ParagraphJustification.CENTER_JUSTIFY
};


// Slider
var sliderCompositionParameters = {
    anchorPoint: "topLeft",
    pixelAspect: 1,
    duration: 12,
    frameRate: projectFPS,
    padding: {
        top: 0,
        right: 6 * 45,
        bottom: 0,
        left: 2 * 45
    }
};

var sliderTextParameters = {
    width: 5 * 45,
    position: [0,0],
    fontSize: 21, 
    fontColor: hexToRgb("FFFFFF"),
    fontName: "WorkSansRoman-Medium",
    fontTracking: 200,
    fontCapitalization: true,
    animation: {
        start: 2,
        end: 4
    }
};

var sliderCircleParameters = {
    diameter : 27,
    fill : {
        color: hexToRgb(circleSelectorFillColor)
    },
    stroke : {
        color: hexToRgb(circleSelectorStrokeColor),
        width: 1,
        opacity: 50
    },
    shadow: {
        opacity: 0.35 * 255,
        direction: 180,
        distance: 2,
        softness: 8,
    }
};

var sliderBarParameters = {
    position : [0, 0],
    fill: {
        color: hexToRgb(sliderBarSolidFillColor)
    },
    gradientOverlay: {
        angle: 0,
        style: 1
    },
    bevelAndEmboss: {
        style: 2,
        depth: 100,
        direction: 2,
        size: 8,
        angle: 90,
        altitude: 30,
        highlightOpacity: 50,
        shadowOpacity: 35
    },
    effects: {
        stroke: {
            color: hexToRgb(sliderBarStrokeColor),
            size: 1,
            opacity: 100,
            position: 1 // Outside
        }
    },
    stroke: {
        color: hexToRgb(sliderBarSolidFillColor),
        width: 9,
        cap: 2 // Rounded
    },
    padding: {
        top: 0,
        right: 15,
        bottom: 0,
        left: 15
    }
};



var toneCurveCompositionParameters = {
    width: 405,
    height: 261,
    anchorPoint: "topLeft",
    pixelAspect: 1,
    duration: 6,
    frameRate: projectFPS,
    padding: {
        top: 18,
        right: 90,
        bottom: 18,
        left: 90
    },
}

var toneCurveBackgroundParameters = {
    width: toneCurveCompositionParameters.width - toneCurveCompositionParameters.padding.left - toneCurveCompositionParameters.padding.right,
    height: toneCurveCompositionParameters.height - toneCurveCompositionParameters.padding.top - toneCurveCompositionParameters.padding.bottom,
    fill: hexToRgb(toneCurveSolidBackgroundcolor),
    opacity: 0.65 * 255
}

var toneCurveGridParameters = {
    width: toneCurveBackgroundParameters.width,
    height: toneCurveBackgroundParameters.height,
    anchor: [(toneCurveBackgroundParameters.width - 1) / 4, (toneCurveBackgroundParameters.width - 1) / 4], 
    corner: [0, 0], 
    border: 2
}

var toneCurvePathParameters = {
    stroke: {
        size: 4,
        color: hexToRgb(toneCurvePathStrokecolor),
        cap: 2
    },
    shadow: {
        opacity: 0.35 * 255,
        direction: 180,
        distance: 3,
        softness: 18,
    }
}

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

// border = choose
// anchor point = - (border / 2 )
// corner = width / splits

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



