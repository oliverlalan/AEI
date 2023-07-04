var groupCompositionWidth = 810;
var gridPixels = 45;


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
};


// Panel Composition
var panelCompositionParameters = {
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
};

var panelTitleParameters = {
    width: 1080,
    height: 1920,
    position: [panelCompositionParameters.width / 2, panelCompositionParameters.height / 2],
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    anchorPosition: "topLeft",
    fontSize: 30, 
    fontColor: hexToRgb("FFFFFF"),
    fontName: "WorkSansRoman-Medium",
    fontTracking: 200,
    fontCapitalization: true,
    justification: ParagraphJustification.CENTER_JUSTIFY
};

// Group Composition
var groupCompositionParameters = {
    width: 810,
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


var groupTitleCompositionParameters = {
    pixelAspect: 1,
    duration: projectDuration,
    frameRate: projectFPS,
    width: 810,
    height: 3 * 45,
    padding: {
        top: 45,
        right: 0,
        bottom: 45,
        left: 0
    },
    position: [groupCompositionParameters.width / 2, 2 * 45],
    anchorPosition: "middleCenter",
    fontSize: 24, 
    fontColor: hexToRgb("FFFFFF"),
    fontName: "WorkSansRoman-Medium",
    fontTracking: 200,
    fontCapitalization: true,
    justification: ParagraphJustification.CENTER_JUSTIFY
};


function GridParameters (compositionWidth, compositionHeight) {

    this.composition = {
        name: "Tone Curve Grid",
        width: compositionWidth,
        height: compositionHeight,
        position: {
            reference: [0,0]
        },
        pixelAspect: 1,
        frameRate: projectFPS,
        duration: projectDuration,

    }

    this.grid = {
        name: "Grid",
        anchorPosition: "middleCenter",
        position: {
            reference: [compositionWidth / 2, compositionHeight / 2]
        },
        shape: {
            type: "rectangle",
            width: compositionWidth,
            height: compositionHeight,
            fill: {
                type: "solid",
                color: hexToRgb(toneCurveSolidBackgroundcolor),
                opacity: 0
            }
        },
        effects: {
            grid: {
                anchor: [(toneCurveBackgroundParameters.width) / gridSections - 0.5, (toneCurveBackgroundParameters.width) / gridSections - 0.5],
                corner: [-1, -1],
                border: 2
            },
            shadow: {
                opacity: 0.45 * 255,
                direction: 180,
                distance: 1,
                softness: 4,
            }
        }
    }

}

function ToneCurveGraphParameters (compositionWidth, compositionHeight, setting) {

    var compositionPadding = {
        top: 25,
        right: 45,
        bottom: 25, 
        left: 45
    }

    var background = {
        width:compositionWidth - compositionPadding.left - compositionPadding.right,
        height: compositionHeight - compositionPadding.top - compositionPadding.bottom
    }

    this.composition = {
        name: setting.displayName + " Graph",
        width: compositionWidth,
        height: compositionHeight,
        position: {
            reference: [0,0]
        },
        pixelAspect: 1,
        frameRate: projectFPS,
        duration: projectDuration,
    }

    this.background = {
        name: "Background",
        anchorPosition: "middleCenter",
        position: {
            reference: [compositionWidth / 2, compositionHeight / 2]
        },
        shape: {
            type: "rectangle",
            width: background.width,
            height: background.height,
            roundness: 15,
            ffx: setting.ffx,
            fill: {
                type: "gradient",
                gradient: {
                    type: 1,
                    start: [-compositionWidth / 2, -compositionWidth / 2],
                    end: [compositionWidth / 2, compositionWidth / 2]
                },
                color: hexToRgb(toneCurveSolidBackgroundcolor),
                opacity: 100
            }
        }
    }

    this.frame = {
        name: "Frame",
        anchorPosition: "middleCenter",
        position: {
            reference: [compositionWidth / 2, compositionHeight / 2]
        },
        shape: {
            type: "rectangle",
            width: background.width,
            height: background.height,
            roundness: 15,
            fill: {
                type: "solid",
                color: hexToRgb(toneCurveSolidBackgroundcolor),
                opacity: 0
            },
            stroke: {
                color: hexToRgb(toneCurvePathStrokecolor),
                opacity: 100,
                width: 3,
                cap: 2
            },
            offset: {
                amount: -1
            }
        },
        effects: {
            shadow: {
                opacity: 0.35 * 255,
                direction: 180,
                distance: 3,
                softness: 7,
            }
        }
    }

    this.path = {
        name: "Path",
        anchorPosition: "middleCenter",
        position: {
            reference: [compositionPadding.left, compositionPadding.top]
        },
        shape: {
            type: "path",
            path: setting.defaultValue,
            animation: {
                keyTimes: setting.animation.setting.keyTimes,
                keyValues: [setting.defaultValue, setting.settingValue]
            },
            position: {

                reference: [compositionWidth / 2, compositionHeight / 2],
            },
            fill: {
                type: "none",
            },
            stroke: {
                color: hexToRgb(toneCurvePathStrokecolor),
                opacity: 100,
                width: 6,
                cap: 2
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
    }

    // Compute keyValues
    this.anchorPoints = [];

    for (var v = 0; v < setting.defaultValue.length; v++) {

        // Compute animation
        var anchorPointInitialPosition = [setting.defaultValue[v][0] / 256 * background.width + compositionPadding.left, - setting.defaultValue[v][1] / 256 * background.height + background.height + compositionPadding.top];
        var anchorPointFinalPosition = [setting.settingValue[v][0] / 256 * background.width + compositionPadding.left, - setting.settingValue[v][1] / 256 * background.height + background.height + compositionPadding.top] ;

        this.anchorPoints[v] = {
            name: "Anchor Point [" + setting.settingValue[v][0] + ", " + setting.settingValue[v][1] + "]",
            anchorPosition: "middleCenter",
            position: {
                reference: [compositionPadding.left, compositionPadding.top],
                animation: {
                    keyTimes: setting.animation.setting.keyTimes,
                    keyValues: [anchorPointInitialPosition, anchorPointFinalPosition]
                }
            },
            shape: {
                type: "ellipse",
                width: 21,
                height: 21,
                fill: {
                    type: "solid",
                    color: hexToRgb(circleSelectorFillColor),
                    opacity: 100
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

        }

    }

}

function ToneCurveValuesParameters (compositionWidth, compositionHeight, setting) {

    this.composition = {
        name: setting.displayName + " Values",
        width: compositionWidth,
        height: compositionHeight,
        position: {
            reference: [0,0]
        },
        padding: {
            top: 50,
            right: 45,
            bottom: 50,
            left: 45
        },
        pixelAspect: 1,
        frameRate: projectFPS,
        duration: projectDuration
    }

    this.textValues = [];

    for (var a = setting.settingValue.length - 1; a >= 0; a --) {

        this.textValues[a] = {
            type: "dynamic",
            keyTimes: setting.animation.setting.keyTimes,
            keyValues: [setting.settingValue[a][0], setting.settingValue[a][1]],
            anchorPosition: "middleLeft",
            justification: ParagraphJustification.CENTER_JUSTIFY,
            fontSize: 21, 
            fontColor: hexToRgb("FFFFFF"),
            fontName: "NotoSansMono-Bold",
            fontTracking: 200
        }

    }

}


// Color Grade Circle

function ColorGradeCircleParameters (compositionWidth, compositionHeight, settings) {

    // Composition

    // Compute positions
    var center = [compositionWidth / 2, compositionHeight / 2];
    var radius = compositionWidth / 2 - 17; //-17 to make the selector fit the composition
    var initialPosition = [center[0] + settings.saturation.defaultValue * radius / 100 * Math.cos(settings.hue.defaultValue * Math.PI / 180), center[1] - settings.saturation.defaultValue * radius / 100 * Math.sin(settings.hue.defaultValue * Math.PI / 180)];
    var finalPosition = [center[0] + settings.saturation.settingValue * radius / 100 * Math.cos(settings.hue.settingValue * Math.PI / 180), center[1] - settings.saturation.settingValue * radius / 100 * Math.sin(settings.hue.settingValue * Math.PI / 180)];

    this.composition = {
        name: "Color Grade Composition",
        width: compositionWidth,
        height: compositionHeight,
        position: {
            reference: [0,0]
        },
        pixelAspect: 1,
        frameRate: projectFPS,
        duration: projectDuration
    }

    this.background = {
        name: "Color Grade Circle Background",
        position: {
            reference:[compositionWidth / 2, compositionHeight / 2]
        },
        shape: {
            type: "ellipse",
            width: compositionWidth,
            height: compositionHeight,
            ffx: ["rainbow-circleBackground"],
            fill: {
                type: "gradient",
                gradient: {
                    type: 1,
                    start: [0, 0],
                    end: [compositionWidth / 2, 0]
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
        effects: {
            // shadow: {
            //     opacity: 0.35 * 255,
            //     direction: 180,
            //     distance: 2,
            //     softness: 8,
            // }
        }

    }

    this.selector = {

        name: "Color Grading Selector",
        anchorPosition: "middleCenter",
        anchorPoint: center,
        position: {
            reference: [compositionWidth / 2, compositionHeight / 2],
            animation: {
                keyTimes: settings.saturation.animation.setting.keyTimes,
                keyValues: [initialPosition, finalPosition]
            }
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

}


// Group Parameters

function GroupParameters (group) {
    
    // Composition
    var compositionPadding = {
        top: gridPixels,
        right: gridPixels * 2,
        bottom: gridPixels,
        left: gridPixels * 2
    };

    // Title
    var titleHeight = gridPixels;



    // Style
    switch(group.groupType) {
    
        case "Slider":
            var contentHeight = group.items * gridPixels;
            var titlePosition = [10 * gridPixels, titleHeight];
        break;

        case "Tone Curve":
            var contentHeight = 8 * gridPixels;
        break;

        case "Color Mixer":
            var contentHeight = group.items * gridPixels;
        break;

        case "Color Grading":
            var contentHeight = 8 * gridPixels;
        break;

    }
    
    var compositionHeight = compositionPadding.top + titleHeight + contentHeight + compositionPadding.bottom;
    var compositionWidth = compositionPadding.left + 14 * gridPixels + compositionPadding.right;

    // Background
    var roundness = 15;
    var shapeStrokeWidth = 2;

    // Font
    var titleFontSize = compositionHeight * 8/30; // 2/9
    
    this.composition = {
        name: group.displayName + " Group Composition",
        width: compositionWidth,
        height: compositionHeight,
        position: {
            reference: [0,0]
        },
        pixelAspect: 1,
        frameRate: projectFPS,
        duration: projectDuration,
        padding: compositionPadding
    }

    this.background = {
        name: "Group Background",
        anchorPosition: "middleCenter",
        // anchorPoint: ,
        position: {
            reference: [compositionWidth / 2, compositionHeight / 2]
        },
        // vertices: sliderBarVertices,
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        shape: {
            type: "rectangle",
            width: compositionWidth,
            height: compositionHeight,
            roundness: roundness,
            // ffx: ['groupComposition-background-dark'],
            fill: {
                type: "solid",
                gradient: {
                    type: 1,
                    start: [-compositionWidth / 2, 0],
                    end: [compositionWidth / 2, 0]
                },
                color: hexToRgb(sliderBarSolidFillColor),
                opacity: 35
            },
            stroke: {
                color: hexToRgb(sliderBarStrokeColor),
                opacity: 100,
                width: shapeStrokeWidth,
                cap: 2
            },
            offset: {
                amount: - shapeStrokeWidth / 2
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
    }

    this.title = {
        name: group.displayName,
        width: 18 * gridPixels,
        height: 2 * gridPixels,
        anchorPosition: "topCenter",
        position: {
            reference: [10 * gridPixels, titleHeight]
        },
        fontSize: titleFontSize, 
        fontColor: hexToRgb("FFFFFF"),
        fontName: "WorkSansRoman-SemiBold",
        fontTracking: 200,
        fontCapitalization: true,
        justification: ParagraphJustification.CENTER_JUSTIFY

    }
    

}

// Slider

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
    var sliderStrokeWidth = 2;

    // Slider Circle
    var sliderCircleDiameter = compositionHeight * 3/10;
    var sliderCircleAnchorPoint = sliderBarAnchorPoint;

    // Font
    var labelFontSize = compositionHeight * 7/30; // 2/9
    var valueFontSize = labelFontSize * 19.5/21;

    // Object
    this.composition = {
        name: setting.displayName + " " + setting.group,
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
        }
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
            ffx: setting.ffx,
            fill: {
                type: "gradient",
                gradient: {
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

function HorizontalSlider(compositionWidth, compositionHeight, setting) {

    // Composition
    var verticalReference = Math.round(compositionHeight * 1/2);

    // Text Label
    var textLabel = {
        width: 6 * gridPixels,
        height: gridPixels,
        position: [6 * gridPixels, verticalReference],
        padding:  {
            top: 0,
            right: gridPixels,
            bottom: 0,
            left: 0
        }
    }

    // Text Value
    var textValue = {
        width: 4 * gridPixels,
        height: gridPixels,
        position: [18 * gridPixels, verticalReference],
        padding: {
            top: 0,
            right: 2 * gridPixels,
            bottom: 0,
            left: 0
        }
    }
    
    // Slider Bar
    var sliderBar = {
        width: 8 * gridPixels, // Composition width, not shape width
        height: gridPixels,
        position: [10 * gridPixels, verticalReference],
        padding: {
            top: 0,
            right: gridPixels * 4/10,
            bottom: 0,
            left: gridPixels * 4/10
        }
    }

    var sliderBarWidth = compositionHeight * 2/9; // 1/9
    var sliderBarRadius = sliderBarWidth / 2;
    var sliderBarVertices = [[textLabel.width + sliderBar.padding.left + sliderBarRadius, verticalReference], [textLabel.width + sliderBar.width - sliderBar.padding.right - sliderBarRadius, verticalReference]]
    var sliderBarLength = sliderBar.width - sliderBar.padding.left - sliderBar.padding.right - sliderBarWidth;
    var sliderBarAnchorPoint = [sliderBarVertices[0][0] + (setting.defaultValue - setting.min) / (setting.max - setting.min) * sliderBarLength, verticalReference]
    var sliderStrokeWidth = 2;

    // Slider Circle
    var sliderCircleDiameter = compositionHeight * 6/10;
    var sliderCircleAnchorPoint = sliderBarAnchorPoint;

    // Font
    var labelFontSize = compositionHeight * 14/30; // 2/9
    var valueFontSize = labelFontSize * 19.5/21;

    // Object
    this.composition = {
        name: setting.displayName + " " + setting.group,
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
        width: 6 * 45,
        anchorPosition: "middleRight",
        position: {
            reference: textLabel.position - textLabel.padding.right
        },
        fontSize: labelFontSize, 
        fontColor: hexToRgb("FFFFFF"),
        fontName: "WorkSansRoman-SemiBold",
        fontTracking: 200,
        fontCapitalization: true,
        justification: ParagraphJustification.RIGHT_JUSTIFY
    },
    this.textValue = {
        name: "Text Value",
        width: 4 * 45,
        anchorPosition: "middleRight",
        position: {
            reference: textValue.position - textValue.padding.right
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
            reference: sliderBar.position
        },
        vertices: sliderBarVertices,
        padding: sliderBar.padding,
        shape: {
            type: "rectangle",
            width: sliderBarLength + sliderBarWidth,
            height: sliderBarWidth,
            roundness: sliderBarRadius,
            ffx: setting.ffx,
            fill: {
                type: "gradient",
                gradient: {
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
            reference: [compositionWidth / 2, verticalReference],
            animation: {
                keyTimes: setting.animation.setting.keyTimes,
                keyValues: [sliderBarAnchorPoint, [sliderBarVertices[0][0] + (setting.settingValue - setting.min) / (setting.max - setting.min) * sliderBarLength, verticalReference]]
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

var defaultAnimationParameters = {
    easeIn: new KeyframeEase(0, 90),
    easeOut: new KeyframeEase(0, 20)
};




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DEPRECATED CODE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Default shape parameters
// var circleShapeDefaultParameters = {
//     name: "Default Circle",
//     anchorPosition: "middleCenter",
//     position: [0,0],
//     padding: {
//         top: 0,
//         right: 0,
//         bottom: 0,
//         left: 0
//     },
//     shape: {
//         type: "ellipse",
//         width: 27,
//         height: 27,
//         fill: {
//             color: hexToRgb(circleSelectorFillColor),
//             opacity: 100,
//         },
//         stroke: {
//             color: hexToRgb(circleSelectorStrokeColor),
//             opacity: 100,
//             width: 1,
//             cap: 2
//         },
//         offset: {
//             amount: -0.5
//         }
//     },
//     effects: {
//         shadow: {
//             opacity: 0.35 * 255,
//             direction: 180,
//             distance: 2,
//             softness: 8,
//         }
//     }
//     // layerStyle: {
//     //     stroke: {
//     //         color: hexToRgb(sliderBarStrokeColor),
//     //         size: 1,
//     //         opacity: 100,
//     //         position: 2 // Inside
//     //     }

//     // }
// };

// var rectangleShapeDefaultParameters = {
//     name: "Default Circle",
//     shape: {
//         type: "rectangle",
//         width: 27,
//         height: 27,
//         fill: {
//             color: hexToRgb(circleSelectorFillColor)
//         },
//         stroke: {
//             color: hexToRgb(circleSelectorStrokeColor),
//             width: 1,
//             opacity: 50
//         }
//     },
//     effects: {
//         shadow: {
//             opacity: 0.35 * 255,
//             direction: 180,
//             distance: 2,
//             softness: 8,
//         }
//     }
// };


// // Slider
// var sliderCompositionParameters = {
//     anchorPosition: "topLeft",
//     pixelAspect: 1,
//     duration: projectDuration,
//     frameRate: projectFPS,
//     padding: {
//         top: 0,
//         right: 6 * 45,
//         bottom: 0,
//         left: 2 * 45
//     }
// };

// var sliderTextParameters = {
//     width: 5 * 45,
//     position: [0,0],
//     fontSize: 21, 
//     fontColor: hexToRgb("FFFFFF"),
//     fontName: "WorkSansRoman-Medium",
//     fontTracking: 200,
//     fontCapitalization: true,
//     animation: {
//         start: 2,
//         end: 4
//     }
// };

// var sliderCircleParameters = {
//     diameter: 27,
//     fill: {
//         color: hexToRgb(circleSelectorFillColor)
//     },
//     // stroke: {
//     //     color: hexToRgb(circleSelectorStrokeColor),
//     //     width: 1,
//     //     opacity: 50
//     // },
//     shadow: {
//         opacity: 0.35 * 255,
//         direction: 180,
//         distance: 2,
//         softness: 8,
//     }
// };



// var sliderBarParameters = {
//     position: [0, 0],
//     fill: {
//         color: hexToRgb(sliderBarSolidFillColor)
//     },
//     stroke: {
//         color: hexToRgb(sliderBarSolidFillColor),
//         width: 9,
//         cap: 2 // Rounded
//     },
//     gradientOverlay: {
//         angle: 0,
//         style: 1
//     },
//     layerStyle: {
//         bevelAndEmboss: {
//             style: 2,
//             depth: 100,
//             direction: 2,
//             size: 15,
//             angle: 90,
//             altitude: 30,
//             highlightOpacity: 0,
//             shadowOpacity: 35
//         }
//     },
//     effects: {
//         stroke: {
//             color: hexToRgb(sliderBarStrokeColor),
//             size: 1,
//             opacity: 100,
//             position: 1 // Outside
//         }
//     },
//     padding: {
//         top: 0,
//         right: 15,
//         bottom: 0,
//         left: 15
//     }
// };

// var colorGradeCircleCompositionParameters = {
//     anchorPosition: "topLeft",
//     width: 360,
//     height: 360,
//     pixelAspect: 1,
//     duration: projectDuration,
//     frameRate: projectFPS,
//     padding: {
//         top: 25,
//         right: 25,
//         bottom: 25,
//         left: 25
//     }
// }

// var colorGradeCircleBackgroundParameters = {
//     name: "Color Grade Circle Background",
//     position: {
//         reference:[colorGradeCircleCompositionParameters.width / 2, colorGradeCircleCompositionParameters.height / 2]
//     },
//     shape: {
//         type: "ellipse",
//         width: colorGradeCircleCompositionParameters.width - colorGradeCircleCompositionParameters.padding.right - colorGradeCircleCompositionParameters.padding.left,
//         height: colorGradeCircleCompositionParameters.height - colorGradeCircleCompositionParameters.padding.bottom - colorGradeCircleCompositionParameters.padding.top,
//         ffx: ["rainbow-circleBackground"],
//         fill: {
//             type: "gradient",
//             gradient: {
//                 type: 1,
//                 start: [0, 0],
//                 end: [155, 0]
//             },
//             color: hexToRgb(circleSelectorFillColor),
//             opacity: 100
//         },
//         // stroke: {
//         //     color: hexToRgb(circleSelectorStrokeColor),
//         //     opacity: 100,
//         //     width: 2,
//         //     cap: 2
//         // }
//     },
//     effects: {
//         // shadow: {
//         //     opacity: 0.35 * 255,
//         //     direction: 180,
//         //     distance: 2,
//         //     softness: 8,
//         // }
//     }
// }

// var colorGradeCircleSelectorParameters = {
//     name: "Color Grading Selector",
//     position: {
//         reference:[colorGradeCircleCompositionParameters.width / 2, colorGradeCircleCompositionParameters.height / 2]
//     },
//     shape: {
//         type: "ellipse",
//         width: 27,
//         height: 27,
//         fill: {
//             type: "solid",
//             color: hexToRgb(circleSelectorFillColor),
//             opacity: 100
//         },
//         // stroke: {
//         //     color: hexToRgb(circleSelectorStrokeColor),
//         //     opacity: 50
//         //     width: 1,
//         //     cap:2
//         // }
//     },
//     effects: {
//         shadow: {
//             opacity: 0.35 * 255,
//             direction: 180,
//             distance: 2,
//             softness: 8,
//         }
//     }
// }

// var colorGradeSlidersCompositionParameters = {
//     width: 405,
//     height: 270,
//     anchorPosition: "topLeft",
//     pixelAspect: 1,
//     duration: projectDuration,
//     frameRate: projectFPS
// }

// var toneCurveGraphCompositionParameters = {
//     width: 400,
//     height: 360,
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


// var toneCurveBackgroundParameters = {
//     width: toneCurveGraphCompositionParameters.width - toneCurveGraphCompositionParameters.padding.left - toneCurveGraphCompositionParameters.padding.right,
//     height: toneCurveGraphCompositionParameters.height - toneCurveGraphCompositionParameters.padding.top - toneCurveGraphCompositionParameters.padding.bottom,
//     fill: hexToRgb(toneCurveSolidBackgroundcolor),
//     opacity: 0.65 * 255
// }

// var toneCurveGridParameters = {
//     width: toneCurveBackgroundParameters.width,
//     height: toneCurveBackgroundParameters.height,
//     anchor: [(toneCurveBackgroundParameters.width) / gridSections, (toneCurveBackgroundParameters.width) / gridSections], 
//     corner: [0, 0], 
//     border: 2,
//     shadow: {
//         opacity: 0.45 * 255,
//         direction: 180,
//         distance: 1,
//         softness: 4,
//     }
// }

// var toneCurveFrameParameters = {
//     width: toneCurveBackgroundParameters.width,
//     height: toneCurveBackgroundParameters.height,
//     anchor: [(toneCurveBackgroundParameters.width) / gridSections, (toneCurveBackgroundParameters.width) / gridSections], 
//     corner: [0, 0], 
//     stroke: {
//         width: 6,
//         color: hexToRgb(toneCurvePathStrokecolor),
//         cap: 2
//     },
//     shadow: {
//         opacity: 0.35 * 255,
//         direction: 180,
//         distance: 3,
//         softness: 7,
//     },
//     offset: {
//         amount: -1
//     }
// }

// var toneCurvePathParameters = {
//     stroke: {
//         width: 6,
//         color: hexToRgb(toneCurvePathStrokecolor),
//         cap: 2
//     },
//     shadow: {
//         opacity: 0.35 * 255,
//         direction: 180,
//         distance: 2,
//         softness: 8,
//     }
// }

// var toneCurveAnchorPointParameters = {
//     diameter: 18.25, 
//     fill: hexToRgb(toneCurveAnchorPointFillColor),
//     stroke: {
//         color: hexToRgb(toneCurveAnchorPointStrokeColor),
//         size: 1,
//         opacity: 50,
//         position: 2 // Inside
//     },
//     shadow: {
//         opacity: 0.35 * 255,
//         direction: 180,
//         distance: 3,
//         softness: 7,
//     },
//     animation: {
//         start: 1,
//         end: 2
//     }
// }

// var toneCurveValuesCompositionParameters = {
//     width: 290,
//     height: toneCurveGraphCompositionParameters.height,
//     anchorPosition: "topLeft",
//     pixelAspect: 1,
//     duration: projectDuration,
//     frameRate: projectFPS,
//     padding: {
//         top: 50,
//         right: 45,
//         bottom: 50,
//         left: 45
//     },
//     text: {
//         anchorPosition: "middleLeft",
//         justification: ParagraphJustification.CENTER_JUSTIFY,
//         fontSize: 21, 
//         fontColor: hexToRgb("FFFFFF"),
//         fontName: "NotoSansMono-Bold",
//         fontTracking: 200,
//     }
// }

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
