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

// Main composition: Includes the photo edit animation and the dashboard
var mainCompositionParameters = {
    width: 1080,
    height: 1920,
    position: [0,0],
    pixelAspect: 1,
    duration: projectDuration,
    frameRate: projectFPS,
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}

// Dashboard Composition: Composition that works as placeholder to show all the panels sliding
var dashboardCompositionParameters = {
    width: 1080,
    height: 570,
    position: [0,0],
    pixelAspect: 1,
    duration: projectDuration,
    frameRate: projectFPS,
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    layerStyle: {
        bevelAndEmboss: {
            style: 2,
            depth: 100,
            direction: 2,
            size: 15,
            angle: 90,
            altitude: 30,
            highlightOpacity: 0,
            shadowOpacity: 35
        }
    }

}

// Panels Composition: Composition in which all the panels are included
var panelsCompositionParameters = {
    width: 1080,
    height: 570,
    position: [0,0],
    pixelAspect: 1,
    duration: projectDuration,
    frameRate: projectFPS,
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
};


// Panel Composition
var panelCompositionParameters = {
    width: 1080,
    height: 570,
    position: [0,0],
    pixelAspect: 1,
    duration: projectDuration,
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
    anchorPosition: "bottomCenter",
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
    duration: projectDuration,
    frameRate: projectFPS,
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}


var groupTitleCompositionParameters = {
    pixelAspect: 1,
    duration: projectDuration,
    frameRate: projectFPS,
    width: 1080,
    height: 3 * 45,
    padding: {
        top: 45,
        right: 0,
        bottom: 45,
        left: 0
    },
    position: [groupCompositionParameters.width / 2, 2 * 45],
    anchorPosition: "bottomCenter",
    fontSize: 24, 
    fontColor: hexToRgb("FFFFFF"),
    fontName: "WorkSansRoman-Medium",
    fontTracking: 200,
    fontCapitalization: true,
    justification: ParagraphJustification.CENTER_JUSTIFY
};


// Default shape parameters
var circleShapeDefaultParameters = {
    name: "Default Circle",
    anchorPosition: "middleCenter",
    position: [0,0],
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    shape: {
        type: "ellipse",
        width: 27,
        height: 27,
        fill: {
            color: hexToRgb(circleSelectorFillColor),
            opacity: 100,
        },
        stroke: {
            color: hexToRgb(circleSelectorStrokeColor),
            opacity: 100,
            width: 1,
            cap: 2
        },
        offset: {
            amount: -0.5
        }
    },
    effects: {
        shadow: {
            opacity: 0.35 * 255,
            direction: 180,
            distance: 2,
            softness: 8,
        }
    }
    // layerStyle: {
    //     stroke: {
    //         color: hexToRgb(sliderBarStrokeColor),
    //         size: 1,
    //         opacity: 100,
    //         position: 2 // Inside
    //     }

    // }
};

var rectangleShapeDefaultParameters = {
    name: "Default Circle",
    shape: {
        type: "rectangle",
        width: 27,
        height: 27,
        fill: {
            color: hexToRgb(circleSelectorFillColor)
        },
        stroke: {
            color: hexToRgb(circleSelectorStrokeColor),
            width: 1,
            opacity: 50
        }
    },
    effects: {
        shadow: {
            opacity: 0.35 * 255,
            direction: 180,
            distance: 2,
            softness: 8,
        }
    }
};


// Slider
var sliderCompositionParameters = {
    anchorPosition: "topLeft",
    pixelAspect: 1,
    duration: projectDuration,
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
    diameter: 27,
    fill: {
        color: hexToRgb(circleSelectorFillColor)
    },
    // stroke: {
    //     color: hexToRgb(circleSelectorStrokeColor),
    //     width: 1,
    //     opacity: 50
    // },
    shadow: {
        opacity: 0.35 * 255,
        direction: 180,
        distance: 2,
        softness: 8,
    }
};



var sliderBarParameters = {
    position: [0, 0],
    fill: {
        color: hexToRgb(sliderBarSolidFillColor)
    },
    stroke: {
        color: hexToRgb(sliderBarSolidFillColor),
        width: 9,
        cap: 2 // Rounded
    },
    gradientOverlay: {
        angle: 0,
        style: 1
    },
    layerStyle: {
        bevelAndEmboss: {
            style: 2,
            depth: 100,
            direction: 2,
            size: 15,
            angle: 90,
            altitude: 30,
            highlightOpacity: 0,
            shadowOpacity: 35
        }
    },
    effects: {
        stroke: {
            color: hexToRgb(sliderBarStrokeColor),
            size: 1,
            opacity: 100,
            position: 1 // Outside
        }
    },
    padding: {
        top: 0,
        right: 15,
        bottom: 0,
        left: 15
    }
};

var toneCurveGraphCompositionParameters = {
    width: 400,
    height: 360,
    anchorPosition: "topLeft",
    pixelAspect: 1,
    duration: projectDuration,
    frameRate: projectFPS,
    padding: {
        top: 25,
        right: 45,
        bottom: 25,
        left: 45
    }
}

var toneCurveValuesCompositionParameters = {
    width: 290,
    height: toneCurveGraphCompositionParameters.height,
    anchorPosition: "topLeft",
    pixelAspect: 1,
    duration: projectDuration,
    frameRate: projectFPS,
    padding: {
        top: 50,
        right: 45,
        bottom: 50,
        left: 45
    },
    text: {
        anchorPosition: "middleLeft",
        justification: ParagraphJustification.CENTER_JUSTIFY,
        fontSize: 21, 
        fontColor: hexToRgb("FFFFFF"),
        fontName: "NotoSansMono-Bold",
        fontTracking: 200,
    }
}

// var toneCurveValueCompositionParameters = {
//     width: toneCurveValuesCompositionParameters.width,
//     height: toneCurveValuesCompositionParameters.height,
//     anchorPosition: "topLeft",
//     pixelAspect: 1,
//     duration: projectDuration,
//     frameRate: projectFPS,
//     padding: {
//         top: 25,
//         right: 45,
//         bottom: 25,
//         left: 45
//     }
// }

// var toneCurveGraphCompositionParameters = {
//     width: 405,
//     height: 261,
//     anchorPosition: "topLeft",
//     pixelAspect: 1,
//     duration: projectDuration,
//     frameRate: projectFPS,
//     padding: {
//         top: 18,
//         right: 90,
//         bottom: 18,
//         left: 90
//     },
// }

var toneCurveBackgroundParameters = {
    width: toneCurveGraphCompositionParameters.width - toneCurveGraphCompositionParameters.padding.left - toneCurveGraphCompositionParameters.padding.right,
    height: toneCurveGraphCompositionParameters.height - toneCurveGraphCompositionParameters.padding.top - toneCurveGraphCompositionParameters.padding.bottom,
    fill: hexToRgb(toneCurveSolidBackgroundcolor),
    opacity: 0.65 * 255
}

var toneCurveGridParameters = {
    width: toneCurveBackgroundParameters.width,
    height: toneCurveBackgroundParameters.height,
    anchor: [(toneCurveBackgroundParameters.width) / gridSections, (toneCurveBackgroundParameters.width) / gridSections], 
    corner: [0, 0], 
    border: 2,
    shadow: {
        opacity: 0.45 * 255,
        direction: 180,
        distance: 1,
        softness: 4,
    }
}

var toneCurveFrameParameters = {
    width: toneCurveBackgroundParameters.width,
    height: toneCurveBackgroundParameters.height,
    anchor: [(toneCurveBackgroundParameters.width) / gridSections, (toneCurveBackgroundParameters.width) / gridSections], 
    corner: [0, 0], 
    stroke: {
        width: 6,
        color: hexToRgb(toneCurvePathStrokecolor),
        cap: 2
    },
    shadow: {
        opacity: 0.35 * 255,
        direction: 180,
        distance: 3,
        softness: 7,
    },
    offset: {
        amount: -1
    }
}

var toneCurvePathParameters = {
    stroke: {
        width: 6,
        color: hexToRgb(toneCurvePathStrokecolor),
        cap: 2
    },
    shadow: {
        opacity: 0.35 * 255,
        direction: 180,
        distance: 2,
        softness: 8,
    }
}

var toneCurveAnchorPointParameters = {
    diameter: 18.25, 
    fill: hexToRgb(toneCurveAnchorPointFillColor),
    stroke: {
        color: hexToRgb(toneCurveAnchorPointStrokeColor),
        size: 1,
        opacity: 50,
        position: 2 // Inside
    },
    shadow: {
        opacity: 0.35 * 255,
        direction: 180,
        distance: 3,
        softness: 7,
    },
    animation: {
        start: 1,
        end: 2
    }
}

// Color Grade Circle
// TODO: Update to compute based on composition parameters

var colorGradeCircleCompositionParameters = {
    anchorPosition: "topLeft",
    width: 360,
    height: 360,
    pixelAspect: 1,
    duration: projectDuration,
    frameRate: projectFPS,
    padding: {
        top: 25,
        right: 25,
        bottom: 25,
        left: 25
    }
}

var colorGradeCircleBackgroundParameters = {
    name: "Color Grade Circle Background",
    position: {
        reference:[colorGradeCircleCompositionParameters.width / 2, colorGradeCircleCompositionParameters.height / 2]
    },
    shape: {
        type: "ellipse",
        width: colorGradeCircleCompositionParameters.width - colorGradeCircleCompositionParameters.padding.right - colorGradeCircleCompositionParameters.padding.left,
        height: colorGradeCircleCompositionParameters.height - colorGradeCircleCompositionParameters.padding.bottom - colorGradeCircleCompositionParameters.padding.top,
        fill: {
            type: "gradient",
            gradient: {
                name: "rainbowCircle",
                type: 2,
                start: [0,0],
                end: [(colorGradeCircleCompositionParameters.width - colorGradeCircleCompositionParameters.padding.right * 2) / 2, 0]
            },
            color: hexToRgb(circleSelectorFillColor),
            opacity: 100
        },
        // stroke: {
        //     color: hexToRgb(circleSelectorStrokeColor),
        //     opacity: 100,
        //     width: 2,
        //     cap: 2
        // }
    },
    // effects: {
    //     shadow: {
    //         opacity: 0.35 * 255,
    //         direction: 180,
    //         distance: 2,
    //         softness: 8,
    //     }
    // }
}

var colorGradeCircleSelectorParameters = {
    name: "Color Grading Selector",
    position: {
        reference:[colorGradeCircleCompositionParameters.width / 2, colorGradeCircleCompositionParameters.height / 2]
    },
    shape: {
        type: "ellipse",
        width: 27,
        height: 27,
        fill: {
            type: "solid",
            color: hexToRgb(circleSelectorFillColor),
            opacity: 100
        },
        // stroke: {
        //     color: hexToRgb(circleSelectorStrokeColor),
        //     opacity: 50
        //     width: 1,
        //     cap:2
        // }
    },
    effects: {
        shadow: {
            opacity: 0.35 * 255,
            direction: 180,
            distance: 2,
            softness: 8,
        }
    }
}

var colorGradeSlidersCompositionParameters = {
    width: 405,
    height: 270,
    anchorPosition: "topLeft",
    pixelAspect: 1,
    duration: projectDuration,
    frameRate: projectFPS
}

// Color Grade Slider
// TODO: Use setting parameter to compute vertices, anchorPositions 

function HorizontalStackedSlider(compositionWidth, compositionHeight, setting) {

    // Composition
    var compositionHorizontalPadding = compositionHeight * 2/10;
    var textVerticalPosition = compositionHeight * 4/10;
    var sliderVerticalPosition = compositionHeight * 7/10;
    
    // Slider Bar
    var sliderBarWidth = compositionHeight * 1/9; // 1/9
    var sliderBarRadius = sliderBarWidth / 2;
    var sliderBarVertices = [[compositionHorizontalPadding + sliderBarRadius, sliderVerticalPosition],[compositionWidth - compositionHorizontalPadding - sliderBarRadius, sliderVerticalPosition]]
    var sliderBarLength = compositionWidth - compositionHorizontalPadding * 2 - sliderBarWidth;
    var sliderBarAnchorPoint = [sliderBarVertices[0][0] + (setting.defaultValue - setting.min) / (setting.max - setting.min) * sliderBarLength, sliderVerticalPosition]
    var sliderBarGradientFill = setting.gradientFill;
    var sliderStrokeWidth = 2;

    // Slider Circle
    var sliderCircleDiameter = compositionHeight * 3/10;
    var sliderCircleAnchorPoint = sliderBarAnchorPoint;

    // Font
    var labelFontSize = compositionHeight * 7/30; // 2/9
    var valueFontSize = labelFontSize * 19.5/21;

    // Object
    this.composition = {
        name: "Color Grade Slider Composition",
        width: compositionWidth,
        height: compositionHeight,
        position: {
            reference: [0,0]
        },
        pixelAspect: 1,
        frameRate: projectFPS,
        duration: projectDuration,
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
    },
    this.textLabel = {
        name: "Text Label",
        width: 5 * 45,
        anchorPosition: "bottomLeft",
        position: {
            reference: [compositionHorizontalPadding + sliderBarRadius, textVerticalPosition]
        },
        fontSize: labelFontSize, 
        fontColor: hexToRgb("FFFFFF"),
        fontName: "WorkSansRoman-SemiBold",
        fontTracking: 200,
        fontCapitalization: true,
        justification: ParagraphJustification.LEFT_JUSTIFY
    },
    this.textValue = {
        name: "Text Value",
        width: 2 * 45,
        anchorPosition: "bottomRight",
        position: {
            reference: [compositionWidth - compositionHorizontalPadding - sliderBarRadius, textVerticalPosition]
        },
        fontSize: valueFontSize, 
        fontColor: hexToRgb("FFFFFF"),
        fontName: "NotoSansMono-Bold",
        fontTracking: 200,
        fontCapitalization: true,
        justification: ParagraphJustification.RIGHT_JUSTIFY
    },
    this.sliderBar = {
        name: "Slider Bar",
        anchorPosition: "middleCenter",
        anchorPoint: sliderBarAnchorPoint,
        position: {
            reference: [compositionWidth / 2, sliderVerticalPosition]
        },
        vertices: sliderBarVertices,
        padding: {
            top: 0,
            right: compositionHorizontalPadding,
            bottom: 0,
            left: compositionHorizontalPadding
        },
        shape: {
            type: "rectangle",
            width: sliderBarLength + sliderBarWidth,
            height: sliderBarWidth,
            roundness: sliderBarRadius,
            fill: {
                type: "gradient",
                gradient: {
                    name: sliderBarGradientFill,
                    type: 1,
                    start: [-sliderBarLength / 2, 0],
                    end: [sliderBarLength / 2, 0]
                },
                color: hexToRgb(sliderBarSolidFillColor),
                opacity: 100
            },
            stroke: {
                color: hexToRgb(sliderBarStrokeColor),
                opacity: 100,
                width: sliderStrokeWidth,
                cap: 2
            },
            offset: {
                amount: - sliderStrokeWidth / 2
            }
        },
        effects: {
            gradientRamp: {
                startPosition: [-sliderBarLength / 2, 0],
                endPosition: [sliderBarLength / 2, 0],
                shape: 1
            }
            // shadow: {
            //     opacity: 0.35 * 255,
            //     direction: 180,
            //     distance: 2,
            //     softness: 8,
            // },
            // stroke: {
            //     color: hexToRgb(sliderBarStrokeColor),
            //     size: 1,
            //     opacity: 100,
            //     position: 2 // Inside
            // }
        },
        layerStyle: {
            // bevelAndEmboss: {
            //     style: 2,
            //     depth: 100,
            //     direction: 2,
            //     size: 15,
            //     angle: 90,
            //     altitude: 30,
            //     highlightOpacity: 0,
            //     shadowOpacity: 35
            // },
            // gradientOverlay: {
            //     angle: 0,
            //     style: 1
            // },
            // stroke: {
            //     color: hexToRgb(sliderBarStrokeColor),
            //     size: 1,
            //     opacity: 100,
            //     position: 2 // Inside
            // }
        }
    },
    this.sliderCircle = {
        name: "Slider Circle",
        anchorPosition: "middleCenter",
        anchorPoint: sliderCircleAnchorPoint,
        position: {
            reference: [compositionWidth / 2, sliderVerticalPosition],
            animation: {
                keyTimes: setting.animation.setting.keyTimes,
                keyValues: [sliderBarAnchorPoint, [sliderBarVertices[0][0] + (setting.settingValue - setting.min) / (setting.max - setting.min) * sliderBarLength, sliderVerticalPosition]]
            }
        },
        vertices: sliderBarVertices,
        shape: {
            type: "ellipse",
            width: sliderCircleDiameter,
            height: sliderCircleDiameter,
            fill: {
                type: "solid",
                color: hexToRgb(circleSelectorFillColor),
                opacity: 100
            },
            // stroke: {
            //     color: hexToRgb(circleSelectorStrokeColor),
            //     width: 1,
            //     opacity: 50
            // }
        },
        effects: {
            shadow: {
                opacity: 0.35 * 255,
                direction: 180,
                distance: 2,
                softness: 8,
            }
        }
    }
}

// TODO: Update parameters

function HorizontalSlider(compositionWidth, compositionHeight) {

    // Composition
    var compositionHorizontalPadding = compositionHeight * 2/10;
    var textVerticalPosition = compositionHeight * 4/10;
    var sliderVerticalPosition = compositionHeight * 7/10;
    
    // Slider Bar
    var sliderBarWidth = compositionHeight * 1/10; // 1/9
    var sliderBarRadius = sliderBarWidth / 2;
    var sliderBarVertices = [[compositionHorizontalPadding + sliderBarRadius, sliderVerticalPosition],[compositionWidth - compositionHorizontalPadding - sliderBarRadius, sliderVerticalPosition]]
    var sliderBarLength = compositionWidth - compositionHorizontalPadding * 2 - sliderBarWidth;

    // Slider Circle
    var sliderCircleDiameter = compositionHeight * 3/10;

    // Font
    var fontSize = compositionHeight * 2/10; // 2/9

    // Object
    this.composition = {
        name: "Color Grade Slider Composition",
        width: compositionWidth,
        height: compositionHeight,
        position: [0,0],
        pixelAspect: 1,
        frameRate: projectFPS,
        duration: projectDuration,
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
    },
    this.textLabel = {
        name: "Text Label",
        width: 5 * 45,
        anchorPosition: "bottomLeft",
        position: [compositionHorizontalPadding + sliderBarRadius, textVerticalPosition],
        fontSize: fontSize, 
        fontColor: hexToRgb("FFFFFF"),
        fontName: "WorkSansRoman-SemiBold",
        fontTracking: 200,
        fontCapitalization: true,
        justification: ParagraphJustification.LEFT_JUSTIFY
    },
    this.textValue = {
        name: "Text Value",
        width: 2 * 45,
        anchorPosition: "bottomRight",
        position: [compositionWidth - compositionHorizontalPadding - sliderBarRadius, textVerticalPosition],
        fontSize: fontSize, 
        fontColor: hexToRgb("FFFFFF"),
        fontName: "NotoSansMono-Bold",
        fontTracking: 200,
        fontCapitalization: true,
        justification: ParagraphJustification.RIGHT_JUSTIFY
    },
    this.sliderBar = {
        name: "Slider Bar",
        anchorPosition: "middleCenter",
        position: [compositionWidth / 2, sliderVerticalPosition],
        vertices: sliderBarVertices,
        padding: {
            top: 0,
            right: compositionHorizontalPadding,
            bottom: 0,
            left: compositionHorizontalPadding
        },
        shape: {
            type: "rectangle",
            width: sliderBarLength + sliderBarWidth,
            height: sliderBarWidth,
            roundness: sliderBarRadius,
            fill: {
                color: hexToRgb(sliderBarSolidFillColor)
            }
        },
        effects: {
            gradientRamp: {
                startPosition: sliderBarVertices[0],
                endPosition: sliderBarVertices[1],
                shape: 1
            }
            // shadow: {
            //     opacity: 0.35 * 255,
            //     direction: 180,
            //     distance: 2,
            //     softness: 8,
            // },
            // stroke: {
            //     color: hexToRgb(sliderBarStrokeColor),
            //     size: 1,
            //     opacity: 100,
            //     position: 2 // Inside
            // }
        },
        layerStyle: {
            // bevelAndEmboss: {
            //     style: 2,
            //     depth: 100,
            //     direction: 2,
            //     size: 15,
            //     angle: 90,
            //     altitude: 30,
            //     highlightOpacity: 0,
            //     shadowOpacity: 35
            // },
            gradientOverlay: {
                angle: 0,
                style: 1
            },
            stroke: {
                color: hexToRgb(sliderBarStrokeColor),
                size: 1,
                opacity: 100,
                position: 2 // Inside
            }
        }
    },
    this.sliderCircle = {
        name: "Slider Circle",
        anchorPosition: "middleCenter",
        position: [compositionWidth / 2, sliderVerticalPosition],
        vertices: sliderBarVertices,
        shape: {
            type: "ellipse",
            width: sliderCircleDiameter,
            height: sliderCircleDiameter,
            fill: {
                color: hexToRgb(circleSelectorFillColor)
            },
            // stroke: {
            //     color: hexToRgb(circleSelectorStrokeColor),
            //     width: 1,
            //     opacity: 50
            // }
        },
        effects: {
            shadow: {
                opacity: 0.35 * 255,
                direction: 180,
                distance: 2,
                softness: 8,
            }
        }
    }
}



// border = choose
// anchor point = - (border / 2 )
// corner = width / splits

var defaultAnimationParameters = {
    easeIn: new KeyframeEase(0, 90),
    easeOut: new KeyframeEase(0, 20)
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




