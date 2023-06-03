
//TODO
// vibrance, saturation, color grading values gradient Colors

// structure

// var object1 = {
//     name: ,
//     path: ,
//     xmpMeta: , 
//     panels: {
//         length:, 
//         panel: {
//             displayName: , 
//             groups: {
//                 group: {
//                     displayName: ,
//                     groupType: ,
//                     settings: {
//                         setting: {
//                             displayName: ,
//                             crsName: ,
//                             min: ,
//                             max: ,
//                             defaultValue: ,
//                             panel: , 
//                             group: ,
//                             fillType: , 
//                             solidColor: ,
//                             gradientColors: 
//                         },
//                         ...
//                     }
//                 },
//                 ...
//             }
//         },
//         ...
//     }
// }

var lightroomPanels = {
    basic: {
        displayName: "Basic",
        groups: {
            whiteBalance: {
                displayName: "White Balance",
                groupType: "Slider",
                settings: {
                    temperature: {
                        displayName:    "Temperature",    
                        crsName:        "Temperature",
                        min:            +1000,
                        max:            +10000,
                        defaultValue:   +4500,
                        panel:          "Basic",
                        group:          "White Balance",
                        fillType:       "gradient",
                        gradientFill:   "whiteBalance",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["006cff", "ffc800"]
                    },
                    tint: {
                        displayName:    "Tint",    
                        crsName:        "Tint",
                        min:            -150,
                        max:            +150,
                        defaultValue:   0,
                        panel:          "Basic",
                        group:          "White Balance",
                        fillType:       "gradient",
                        gradientFill:   "tint",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["00d904", "ff0099"]
                    }
                }
            },
            tone: {
                displayName: "Tone",
                groupType: "Slider",
                settings: {
                    exposure: {
                        displayName:    "Exposure",    
                        crsName:        "Exposure2012",
                        min:            -5,
                        max:            +5,
                        defaultValue:   0,
                        panel:          "Basic",
                        group:          "Tone",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    },
                    contrast: {
                        displayName:    "Contrast",    
                        crsName:        "Contrast2012",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Basic",
                        group:          "Tone",
                        fillType:       "gradient",
                        gradientFill:   "HMS",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarLightFillColor, sliderBarDarkFillColor]
                    },
                    highlights: {
                        displayName:    "Highlights",    
                        crsName:        "Highlights2012",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Basic",
                        group:          "Tone",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    },
                    shadows: {
                        displayName:    "Shadows",    
                        crsName:        "Shadows2012",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        group:          "Tone",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    },
                    whites: {
                        displayName:    "Whites",    
                        crsName:        "Whites2012",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Basic",
                        group:          "Tone",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    },
                    blacks: {
                        displayName:    "Blacks",    
                        crsName:        "Blacks2012",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Basic",
                        group:          "Tone",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    }
                }
            },
            presence: {
                displayName: "Presence",
                groupType: "Slider",
                settings: {
                    texture: {
                        displayName:    "Texture",    
                        crsName:        "Texture",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Basic",
                        group:          "Presence",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    },
                    clarity: {
                        displayName:    "Clarity",    
                        crsName:        "Clarity2012",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Basic",
                        group:          "Presence",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    },
                    vibrance: {
                        displayName:    "Vibrance",    
                        crsName:        "Vibrance",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Basic",
                        group:          "Presence",
                        fillType:       "gradient",
                        gradientFill:   "saturation",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor] // TODO
                    },
                    saturation: {
                        displayName:    "Saturation",    
                        crsName:        "Saturation",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Basic",
                        group:          "Presence",
                        fillType:       "gradient",
                        gradientFill:   "saturation",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor] // TODO
                    }
                }
            }
        }
    },
    toneCurve: {
        displayName: "Tone Curve",
        groups: {
            // parametricCurve: {
            //     displayName: "Parametric Curve",
            //     groupType: "Tone Curve",
            //     settings: {
            //         parametricShadows: {
            //             displayName:    "Parametric Shadows",    
            //             crsName:        "ParametricShadows",
            //             min:            -100,
            //             max:            +100,
            //             defaultValue:   0,
            //             panel:          "Tone Curve",
            //             group:          "Parametric Curve",
            //             fillType:       "gradient",
            //             gradientFill:   "",
            //             solidColor:     sliderBarSolidFillColor,
            //             gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
            //         },
            //         parametricDarks: {
            //             displayName:    "Parametric Darks",    
            //             crsName:        "ParametricDarks",
            //             min:            -100,
            //             max:            +100,
            //             defaultValue:   0,
            //             panel:          "Tone Curve",
            //             group:          "Parametric Curve",
            //             fillType:       "gradient",
            //             gradientFill:   "",
            //             solidColor:     sliderBarSolidFillColor,
            //             gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
            //         },
            //         parametricLights: {
            //             displayName:    "Parametric Lights",    
            //             crsName:        "ParametricLights",
            //             min:            -100,
            //             max:            +100,
            //             defaultValue:   0,
            //             panel:          "Tone Curve",
            //             group:          "Parametric Curve",
            //             fillType:       "gradient",
            //             gradientFill:   "",
            //             solidColor:     sliderBarSolidFillColor,
            //             gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
            //         },
            //         parametricHighlights: {
            //             displayName:    "Parametric Highlights",    
            //             crsName:        "ParametricHighlights",
            //             min:            -100,
            //             max:            +100,
            //             defaultValue:   0,
            //             panel:          "Tone Curve",
            //             group:          "Parametric Curve",
            //             fillType:       "gradient",
            //             gradientFill:   "",
            //             solidColor:     sliderBarSolidFillColor,
            //             gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
            //         }
            //     }
            // },
            // parametricRegion: {
            //     displayName: "Parametric Region",
            //     groupType: "Slider",
            //     settings: {
            //         parametricShadowSplit: {
            //             displayName:    "Parametric Shadow Split",    
            //             crsName:        "ParametricShadowSplit",
            //             min:            +10,
            //             max:            +70,
            //             defaultValue:   +25,
            //             panel:          "Tone Curve",
            //             group:          "Parametric Region",
            //             fillType:       "gradient",
            //             gradientFill:   "",
            //             solidColor:     sliderBarSolidFillColor,
            //             gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
            //         },
            //         parametricMidtoneSplit: {
            //             displayName:    "Parametric Midtone Split",    
            //             crsName:        "ParametricMidtoneSplit",
            //             min:            +20,
            //             max:            +80,
            //             defaultValue:   +50,
            //             panel:          "Tone Curve",
            //             group:          "Parametric Region",
            //             fillType:       "gradient",
            //             gradientFill:   "",
            //             solidColor:     sliderBarSolidFillColor,
            //             gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
            //         },
            //         parametricHighlightSplit: {
            //             displayName:    "Parametric Highlight Split",    
            //             crsName:        "ParametricHighlightSplit",
            //             min:            +30,
            //             max:            +90,
            //             defaultValue:   +75,
            //             panel:          "Tone Curve",
            //             group:          "Parametric Region",
            //             fillType:       "gradient",
            //             gradientFill:   "",
            //             solidColor:     sliderBarSolidFillColor,
            //             gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
            //         }
            //     }
            // },
            pointCurve: {
                displayName: "Point Curve",
                groupType: "Tone Curve",
                settings: {
                    toneCurve: {
                        displayName:    "Lum Tone Curve",    
                        crsName:        "ToneCurvePV2012",
                        min:            0,
                        max:            +255,
                        defaultValue:   [[0,0], [+255,+255]],
                        panel:          "Tone Curve",
                        group:          "Point Curve",
                        fillType:       "gradient",
                        gradientFill:   "lumToneCurve",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["e5e5e5", "2e2e2e"]
                    }
                }
            },
            redChannel: {
                displayName: "Red Channel",
                groupType: "Tone Curve",
                settings: {
                    toneCurveRed: {
                        displayName:    "Red Tone Curve",    
                        crsName:        "ToneCurvePV2012Red",
                        min:            0,
                        max:            +255,
                        defaultValue:   [[0,0], [+255,+255]],
                        panel:          "Tone Curve",
                        group:          "Red Channel",
                        fillType:       "gradient",
                        gradientFill:   "redToneCurve",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["ff4800", "00ffed"]
                    }
                }
            },
            greenChannel: {
                displayName: "Green Channel",
                groupType: "Tone Curve",
                settings: {
                    toneCurveGreen: {
                        displayName:    "Green Tone Curve",    
                        crsName:        "ToneCurvePV2012Green",
                        min:            0,
                        max:            +255,
                        defaultValue:   [[0,0], [+255,+255]],
                        panel:          "Tone Curve",
                        group:          "Green Channel",
                        fillType:       "gradient",
                        gradientFill:   "greenToneCurve",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["00d904", "ff0099"]
                    }
                }
            },
            blueChannel: {
                displayName: "Blue Channel",
                groupType: "Tone Curve",
                settings: {
                    toneCurveBlue: {
                        displayName:    "Blue Tone Curve",    
                        crsName:        "ToneCurvePV2012Blue",
                        min:            0,
                        max:            +255,
                        defaultValue:   [[0,0], [+255,+255]],
                        panel:          "Tone Curve",
                        group:          "Blue Channel",
                        fillType:       "gradient",
                        gradientFill:   "blueToneCurve",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["006cff", "ffc800"]
                    }
                }
            }
        }
    },
    colorMixer: {
        displayName: "Color Mixer",
        groups: {
            hue: {
                displayName: "Hue",
                groupType: "Color Mixer",
                settings: {
                    redHue: {
                        displayName:    "Red",    
                        crsName:        "HueAdjustmentRed",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Hue",
                        fillType:       "gradient",
                        gradientFill:   "redHue",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["ed145b", "f26522"]
                    },
                    orangeHue: {
                        displayName:    "Orange",    
                        crsName:        "HueAdjustmentOrange",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Hue",
                        fillType:       "gradient",
                        gradientFill:   "orangeHue",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["f26522", "fff200"]
                    },
                    yellowHue: {
                        displayName:    "Yellow" ,    
                        crsName:        "HueAdjustmentYellow",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Hue",
                        fillType:       "gradient",
                        gradientFill:   "yellowHue",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["fff200", "39b54a"]
                    },
                    greenHue: {
                        displayName:    "Green",    
                        crsName:        "HueAdjustmentGreen",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0 ,
                        panel:          "Color Mixer",
                        group:          "Hue",
                        fillType:       "gradient",
                        gradientFill:   "greenHue",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["39b54a", "00a99d"]
                    },
                    aquaHue: {
                        displayName:    "Aqua",    
                        crsName:        "HueAdjustmentAqua",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Hue",
                        fillType:       "gradient",
                        gradientFill:   "aquaHue",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["00a99d", "0072bc"]
                    },
                    blueHue: {
                        displayName:    "Blue",    
                        crsName:        "HueAdjustmentBlue",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Hue",
                        fillType:       "gradient",
                        gradientFill:   "blueHue",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["0072bc", "2e3192"]
                    },
                    purpleHue: {
                        displayName:    "Purple",    
                        crsName:        "HueAdjustmentPurple",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Hue",
                        fillType:       "gradient",
                        gradientFill:   "",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["2e3192", "92278f"]
                    },
                    magentaHue: {
                        displayName:    "Magenta",    
                        crsName:        "HueAdjustmentMagenta",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer", 
                        group:          "Hue",
                        fillType:       "gradient",
                        gradientFill:   "magentaHue",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["92278f", "ed145b"]
                    }
                }
            },
            saturation: {
                displayName: "Saturation",
                groupType: "Color Mixer",
                settings: {
                    redSaturation: {
                        displayName:    "Red",    
                        crsName:        "SaturationAdjustmentRed",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Saturation",
                        fillType:       "gradient",
                        gradientFill:   "redSaturation",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["A6A6A6", "ed145b"]
                    },
                    orangeSaturation: {
                        displayName:    "Orange",    
                        crsName:        "SaturationAdjustmentOrange",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Saturation",
                        fillType:       "gradient",
                        gradientFill:   "orangeSaturation",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["A6A6A6", "f26522"]
                    },
                    yellowSaturation: {
                        displayName:    "Yellow" ,    
                        crsName:        "SaturationAdjustmentYellow",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Saturation",
                        fillType:       "gradient",
                        gradientFill:   "yellowSaturation",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["A6A6A6", "fff200"]
                    },
                    greenSaturation: {
                        displayName:    "Green",    
                        crsName:        "SaturationAdjustmentGreen",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Saturation",
                        fillType:       "gradient",
                        gradientFill:   "greenSaturation",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["A6A6A6", "39b54a"]
                    },
                    aquaSaturation: {
                        displayName:    "Aqua",    
                        crsName:        "SaturationAdjustmentAqua",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Saturation",
                        fillType:       "gradient",
                        gradientFill:   "aquaSaturation",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["A6A6A6", "00a99d"]
                    },
                    blueSaturation: {
                        displayName:    "Blue",    
                        crsName:        "SaturationAdjustmentBlue",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Saturation",
                        fillType:       "gradient",
                        gradientFill:   "blueSaturation",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["A6A6A6", "0072bc"]
                    },
                    purpleSaturation: {
                        displayName:    "Purple",    
                        crsName:        "SaturationAdjustmentPurple",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Saturation",
                        fillType:       "gradient",
                        gradientFill:   "purpleSaturation",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["A6A6A6", "2e3192"]
                    },
                    magentaSaturation: {
                        displayName:    "Magenta",    
                        crsName:        "SaturationAdjustmentMagenta",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Saturation",
                        fillType:       "gradient",
                        gradientFill:   "magentaSaturation",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["A6A6A6", "92278f"]
                    }
                }
            },
            luminance: {
                displayName: "Luminance",
                groupType: "Color Mixer",
                settings: {
                    redLuminance: {
                        displayName:    "Red",    
                        crsName:        "LuminanceAdjustmentRed",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Luminance",
                        fillType:       "gradient",
                        gradientFill:   "redLuminance",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["7a0026", "f5989d"] // ["7a0026", "ed145b", "f5989d"]
                    },
                    orangeLuminance: {
                        displayName:    "Orange",    
                        crsName:        "LuminanceAdjustmentOrange",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Luminance",
                        fillType:       "gradient",
                        gradientFill:   "orangeLuminance",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["7b2e00", "f9ad81"] // ["7b2e00", "f26522", "f9ad81"]
                    },
                    yellowLuminance: {
                        displayName:    "Yellow" ,    
                        crsName:        "LuminanceAdjustmentYellow",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Luminance",
                        fillType:       "gradient",
                        gradientFill:   "yellowLuminance",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["827b00", "fff799"] // ["827b00", "fff200", "fff799"]
                    },
                    greenLuminance: {
                        displayName:    "Green",    
                        crsName:        "LuminanceAdjustmentGreen",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Luminance",
                        fillType:       "gradient",
                        gradientFill:   "greenLuminance",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["005e20", "a3d39c"] // ["005e20", "39b54a", "a3d39c"]
                    },
                    aquaLuminance: {
                        displayName:    "Aqua",    
                        crsName:        "LuminanceAdjustmentAqua",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Luminance",
                        fillType:       "gradient",
                        gradientFill:   "aquaLuminance",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["005952", "7accc8"] // ["005952", "00a99d", "7accc8"]
                    },
                    blueLuminance: {
                        displayName:    "Blue",    
                        crsName:        "LuminanceAdjustmentBlue",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Luminance",
                        fillType:       "gradient",
                        gradientFill:   "blueLuminance",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["003663", "7da7d9"] // ["003663", "0072bc", "7da7d9"]
                    },
                    purpleLuminance: {
                        displayName:    "Purple",    
                        crsName:        "LuminanceAdjustmentPurple",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Luminance",
                        fillType:       "gradient",
                        gradientFill:   "purpleLuminance",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["0d004c", "8781bd"] // ["0d004c", "2e3192", "8781bd"]
                    },
                    magentaLuminance: {
                        displayName:    "Magenta",    
                        crsName:        "LuminanceAdjustmentMagenta",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Mixer",
                        group:          "Luminance",
                        fillType:       "gradient",
                        gradientFill:   "magentaLuminance",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["4b0049", "bd8cbf"] // ["4b0049", "92278f", "bd8cbf"]
                    }
                }
            }
        }
    },
    colorGrading: {
        displayName: "Color Grading",
        groups: {
            midtone: {
                displayName: "Midtones",
                groupType: "Color Grading",
                settings: {
                    hue: {
                        displayName:    "Hue",    
                        crsName:        "ColorGradeMidtoneHue",
                        min:            0,
                        max:            +359,
                        defaultValue:   0,
                        panel:          "Color Grading",
                        group:          "Midtone",
                        fillType:       "gradient",
                        gradientFill:   "rainbow",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [rainbow.red, rainbow.orange, rainbow.yellow, rainbow.green, rainbow.aqua, rainbow.blue, rainbow.purple, rainbow.magenta]
                    },
                    saturation: {
                        displayName:    "Saturation",    
                        crsName:        "ColorGradeMidtoneSat",
                        min:            0,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Grading",
                        group:          "Midtone",
                        fillType:       "gradient",
                        gradientFill:   "saturation",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [rainbow.red, rainbow.orange, rainbow.yellow, rainbow.green, rainbow.aqua, rainbow.blue, rainbow.purple, rainbow.magenta]
                    },
                    luminance: {
                        displayName:    "Luminance",    
                        crsName:        "ColorGradeMidtoneLum",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Grading",
                        group:          "Midtone",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    }
                }
            },
            shadow: {
                displayName: "Shadows",
                groupType: "Color Grading",
                settings: {
                    hue: {
                        displayName:    "Hue",    
                        crsName:        "SplitToningShadowHue",
                        min:            0,
                        max:            +359,
                        defaultValue:   0,
                        panel:          "Color Grading",
                        group:          "Shadow",
                        fillType:       "gradient",
                        gradientFill:   "rainbow",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [rainbow.red, rainbow.orange, rainbow.yellow, rainbow.green, rainbow.aqua, rainbow.blue, rainbow.purple, rainbow.magenta]
                    },
                    saturation: {
                        displayName:    "Saturation",    
                        crsName:        "SplitToningShadowSaturation",
                        min:            0,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Grading",
                        group:          "Shadow",
                        fillType:       "gradient",
                        gradientFill:   "saturation",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [rainbow.red, rainbow.orange, rainbow.yellow, rainbow.green, rainbow.aqua, rainbow.blue, rainbow.purple, rainbow.magenta]
                    },
                    luminance: {
                        displayName:    "Luminance",    
                        crsName:        "ColorGradeShadowLum",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Grading",
                        group:          "Shadow",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    }
                },
            },
            highlight: {
                displayName: "Highlights",
                groupType: "Color Grading",
                settings: {
                    hue: {
                        displayName:    "Hue",    
                        crsName:        "SplitToningHighlightHue",
                        min:            0,
                        max:            +359,
                        defaultValue:   0,
                        panel:          "Color Grading",
                        group:          "Highlight",
                        fillType:       "gradient",
                        gradientFill:   "rainbow",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [rainbow.red, rainbow.orange, rainbow.yellow, rainbow.green, rainbow.aqua, rainbow.blue, rainbow.purple, rainbow.magenta]
                    },
                    saturation: {
                        displayName:    "Saturation",    
                        crsName:        "SplitToningHighlightSaturation",
                        min:            0,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Grading",
                        group:          "Highlight",
                        fillType:       "gradient",
                        gradientFill:   "saturation",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [rainbow.red, rainbow.orange, rainbow.yellow, rainbow.green, rainbow.aqua, rainbow.blue, rainbow.purple, rainbow.magenta]
                    },
                    luminance: {
                        displayName:    "Luminance",    
                        crsName:        "ColorGradeHighlightLum",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Grading",
                        group:          "Highlight",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    }
                }
            },
            global: {
                displayName: "Global",
                groupType: "Color Grading",
                settings: {
                    hue: {
                        displayName:    "Hue",    
                        crsName:        "ColorGradeGlobalHue",
                        min:            0,
                        max:            +359,
                        defaultValue:   0,
                        panel:          "Color Grading",
                        group:          "Global",
                        fillType:       "gradient",
                        gradientFill:   "rainbow",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [rainbow.red, rainbow.orange, rainbow.yellow, rainbow.green, rainbow.aqua, rainbow.blue, rainbow.purple, rainbow.magenta]
                    },
                    saturation: {
                        displayName:    "Saturation",    
                        crsName:        "ColorGradeGlobalSat",
                        min:            0,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Grading",
                        group:          "Global",
                        fillType:       "gradient",
                        gradientFill:   "saturation",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [rainbow.red, rainbow.orange, rainbow.yellow, rainbow.green, rainbow.aqua, rainbow.blue, rainbow.purple, rainbow.magenta]
                    },
                    luminance: {
                        displayName:    "Luminance",    
                        crsName:        "ColorGradeGlobalLum",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Color Grading",
                        group:          "Global",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    }
                }
            } //,
            // blendingAndBalance: {
            //     displayName: "Blending And Balance",
            //     groupType: "Slider",
            //     settings: {
            //         blending: {
            //             displayName:    "Blending",    
            //             crsName:        "ColorGradeBlending",
            //             min:            0,
            //             max:            +100,
            //             defaultValue:   50,
            //             panel:          "Color Grading",
            //             group:          "Blending And Balance",
            //             fillType:       "gradient",
            //             gradientFill:   "",
            //             solidColor:     sliderBarSolidFillColor,
            //             gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
            //         },
            //         balance: {
            //             displayName:    "Balance",    
            //             crsName:        "SplitToningBalance",
            //             min:            -100,
            //             max:            +100,
            //             defaultValue:   0,
            //             panel:          "Color Grading",
            //             group:          "Blending And Balance",
            //             fillType:       "gradient",
            //             gradientFill:   "",
            //             solidColor:     sliderBarSolidFillColor,
            //             gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
            //         }
            //     }
            // }
        }
    },
    detail: {
        displayName: "Detail",
        groups: {
            sharpening: {
                displayName: "Sharpening",
                groupType: "Slider",
                settings: {
                    sharpeningAmount: {
                        displayName:    "Amount",    
                        crsName:        "Sharpness",
                        min:            0,
                        max:            +150,
                        defaultValue:   +40,
                        panel:          "Detail",
                        group:          "Sharpening",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    },
                    sharpeningRadius: {
                        displayName:    "Radius",    
                        crsName:        "SharpenRadius",
                        min:            +0.5,
                        max:            +3,
                        defaultValue:   +1,
                        panel:          "Detail",
                        group:          "Sharpening",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    },
                    sharpeningDetail: {
                        displayName:    "Detail",    
                        crsName:        "SharpenDetail",
                        min:            0,
                        max:            +100,
                        defaultValue:   +25,
                        panel:          "Detail",
                        group:          "Sharpening",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    },
                    sharpeningMasking: {
                        displayName:    "Masking",    
                        crsName:        "SharpenEdgeMasking",
                        min:            0,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Detail",
                        group:          "Sharpening",
                        fillType:       "gradient",
                        gradientFill:   "HMS",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarLightFillColor, sliderBarDarkFillColor]
                    }
                }
            },
            luminanceNoiseReduction: {
                displayName: "Luminance Noise Reduction",
                groupType: "Slider",
                settings: {
                    luminanceNoiseReduction: {
                        displayName:    "Luminance",    
                        crsName:        "LuminanceSmoothing",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Detail",
                        group:          "Luminance Noise Reduction",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    },

                    luminanceNoiseReductionDetail: {
                        displayName:    "Detail",    
                        crsName:        "LuminanceNoiseReductionDetail",
                        min:            0,
                        max:            +100,
                        defaultValue:   +50,
                        panel:          "Detail",
                        group:          "Luminance Noise Reduction",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    },

                    luminanceNoiseReductionContrast: {
                        displayName:    "Contrast",    
                        crsName:        "LuminanceNoiseReductionContrast",
                        min:            0,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Detail",
                        group:          "Luminance Noise Reduction",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    }
                }
            },
            colorNoiseReduction: {
                displayName: "Color Noise Reduction",
                groupType: "Slider",
                settings: {
                    colorNoiseReduction: {
                        displayName:    "Color",    
                        crsName:        "ColorNoiseReduction",
                        min:            -100,
                        max:            +100,
                        defaultValue:   +25,
                        panel:          "Detail",
                        group:          "Color Noise Reduction",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    },
                    colorNoiseReductionDetail: {
                        displayName:    "Detail",    
                        crsName:        "ColorNoiseReductionDetail",
                        min:            -100,
                        max:            +100,
                        defaultValue:   +50,
                        panel:          "Detail",
                        group:          "Color Noise Reduction",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    },
                    colorNoiseReductionSmoothness: {
                        displayName:    "Smoothness",    
                        crsName:        "ColorNoiseReductionSmoothness",
                        min:            -100,
                        max:            +100,
                        defaultValue:   +50,
                        panel:          "Detail",
                        group:          "Color Noise Reduction",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    }
                }
            }
        }
    },
    effects: {
        displayName: "Effects",
        groups: {
            postCrop: {
                displayName: "Post Crop",
                groupType: "Slider",
                settings: {
                    postCropVignetteStyle: {
                        displayName:    "Style",    
                        crsName:        "PostCropVignetteStyle",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Effects",
                        group:          "Post Crop",
                        fillType:       "gradient",
                        gradientFill:   "SHS",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor, sliderBarDarkFillColor]
                    },
                    postCropVignetteAmount: {
                        displayName:    "Amount",    
                        crsName:        "PostCropVignetteAmount",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Effects",
                        group:          "Post Crop",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    },
                    postCropVignetteMidpoint: {
                        displayName:    "Midpoint",    
                        crsName:        "PostCropVignetteMidpoint",
                        min:            0,
                        max:            +100,
                        defaultValue:   +50,
                        panel:          "Effects",
                        group:          "Post Crop",
                        fillType:       "gradient",
                        gradientFill:   "SHS",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    },
                    postCropVignetteRoundness: {
                        displayName:    "Roundness",    
                        crsName:        "PostCropVignetteRoundness",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Effects",
                        group:          "Post Crop",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor, sliderBarDarkFillColor]
                    },
                    postCropVignetteFeather: {
                        displayName:    "Feather",    
                        crsName:        "PostCropVignetteFeather",
                        min:            0,
                        max:            +100,
                        defaultValue:   +50,
                        panel:          "Effects",
                        group:          "Post Crop",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    },
                    postCropVignetteHighlightContrast: {
                        displayName:    "Highlights",    
                        crsName:        "PostCropVignetteHighlightContrast",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Effects",
                        group:          "Post Crop",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    }
                }
            },
            grain: {
                displayName: "Grain",
                groupType: "Slider",
                settings: {
                    grainAmount: {
                        displayName:    "Amount",    
                        crsName:        "GrainAmount",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Effects",
                        group:          "Grain",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    },
                    grainSize: {
                        displayName:    "Size",    
                        crsName:        "GrainSize",
                        min:            -100,
                        max:            +100,
                        defaultValue:   +25,
                        panel:          "Effects",
                        group:          "Grain",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    },
                    grainFrequency: {
                        displayName:    "Roughness",    
                        crsName:        "GrainFrequency",
                        min:            -100,
                        max:            +100,
                        defaultValue:   +50,
                        panel:          "Effects",
                        group:          "Grain",
                        fillType:       "gradient",
                        gradientFill:   "SMH",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
                    }
                }
            }
        }
    },
    calibration: {
        displayName: "Calibration",
        groups: {
            shadows: {
                displayName: "Shadows",
                groupType: "Slider",
                settings: {
                    shadowTintCalibration: {
                        displayName:    "Shadow Tint",    
                        crsName:        "ShadowTint",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Calibration",
                        group:          "Shadows",
                        fillType:       "gradient",
                        gradientFill:   "tint",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["00d904", "ff0099"]
                    }
                }
            },
            redPrimary: {
                displayName: "Red Primary",
                groupType: "Slider",
                settings: {
                    redHueCalibration: {
                        displayName:    "Red Hue",    
                        crsName:        "RedHue",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Calibration",
                        group:          "Red Primary",
                        fillType:       "gradient",
                        gradientFill:   "redHue",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["ed145b", "f26522"]
                    },
                    redSaturationCalibration: {
                        displayName:    "Red Saturation",    
                        crsName:        "RedSaturation",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Calibration",
                        group:          "Red Primary",
                        fillType:       "gradient",
                        gradientFill:   "redSaturation",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["e6e6e6", "ed145b"]
                    }
                }
            },
            greenPrimary: {
                displayName: "Green Primary",
                groupType: "Slider",
                settings: {
                    greenHueCalibration: {
                        displayName:    "Green Hue",    
                        crsName:        "GreenHue",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Calibration",
                        group:          "Green Primary",
                        fillType:       "gradient",
                        gradientFill:   "greenHue",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["fff200", "39b54a"]
                    },
                    greenSaturationCalibration: {
                        displayName:    "Green Saturation",    
                        crsName:        "GreenSaturation",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Calibration",
                        group:          "Green Primary",
                        fillType:       "gradient",
                        gradientFill:   "greenSaturation",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["e6e6e6", "39b54a"]
                    }
                }
            },
            bluePrimary: {
                displayName: "Blue Primary",
                groupType: "Slider",
                settings: {
                    blueHueCalibration: {
                        displayName:    "Blue Hue",    
                        crsName:        "BlueHue",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Calibration",
                        group:          "Blue Primary",
                        fillType:       "gradient",
                        gradientFill:   "blueHue",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["e6e6e6", "0072bc"]
                    },
                    blueSaturationCalibration: {
                        displayName:    "Blue Saturation",    
                        crsName:        "BlueSaturation",
                        min:            -100,
                        max:            +100,
                        defaultValue:   0,
                        panel:          "Calibration",
                        group:          "Blue Primary",
                        fillType:       "gradient",
                        gradientFill:   "blueSaturation",
                        solidColor:     sliderBarSolidFillColor,
                        gradientColors: ["e6e6e6", "0072bc"]
                    }
                }
            }
        }
    }
}


groupTypes = ["Slider", "Tone Curve", "Color Mixer", "Color Grading"]

