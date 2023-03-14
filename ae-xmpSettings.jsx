var imageSettingsDict = {

    temperature: {
        displayName:    "Temperature",    
        crsName:        "Temperature",
        min:            +1000,
        max:            +10000,
        defaultValue:   0,
        panel:          "Basic",
        group:          "White Balance",
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["00d904", "ff0099"]
    },
    exposure: {
        displayName:    "Exposure",    
        crsName:        "Exposure2012",
        min:            -5,
        max:            +5,
        defaultValue:   0,
        panel:          "Basic",
        group:          "Tone",
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
    },


    texture: {
        displayName:    "Texture",    
        crsName:        "Texture",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Basic",
        group:          "Presence",
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [""]
    },
    saturation: {
        displayName:    "Saturation",    
        crsName:        "Saturation",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Basic",
        group:          "Presence",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [""]
    },


    parametricShadows: {
        displayName:    "Parametric Shadows",    
        crsName:        "ParametricShadows",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Tone Curve",
        group:          "Parametric Curve",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
    },
    parametricDarks: {
        displayName:    "Parametric Darks",    
        crsName:        "ParametricDarks",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Tone Curve",
        group:          "Parametric Curve",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
    },
    parametricLights: {
        displayName:    "Parametric Lights",    
        crsName:        "ParametricLights",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Tone Curve",
        group:          "Parametric Curve",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
    },
    parametricHighlights: {
        displayName:    "Parametric Highlights",    
        crsName:        "ParametricHighlights",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Tone Curve",
        group:          "Parametric Curve",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
    },
    parametricShadowSplit: {
        displayName:    "Parametric Shadow Split",    
        crsName:        "ParametricShadowSplit",
        min:            +10,
        max:            +70,
        defaultValue:   +25,
        panel:          "Tone Curve",
        group:          "Parametric Region",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
    },
    parametricMidtoneSplit: {
        displayName:    "Parametric Midtone Split",    
        crsName:        "ParametricMidtoneSplit",
        min:            +20,
        max:            +80,
        defaultValue:   +50,
        panel:          "Tone Curve",
        group:          "Parametric Region",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
    },
    parametricHighlightSplit: {
        displayName:    "Parametric Highlight Split",    
        crsName:        "ParametricHighlightSplit",
        min:            +30,
        max:            +90,
        defaultValue:   +75,
        panel:          "Tone Curve",
        group:          "Parametric Region",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
    },

    toneCurve: {
        displayName:    "Lum Tone Curve",    
        crsName:        "ToneCurvePV2012",
        min:            0,
        max:            +255,
        defaultValue:   [[0,0], [+255,+255]],
        panel:          "Tone Curve",
        group:          "Point Curve",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["e5e5e5", "e2e2e2"]
    },
    toneCurveRed: {
        displayName:    "Red Tone Curve",    
        crsName:        "ToneCurvePV2012Red",
        min:            0,
        max:            +255,
        defaultValue:   [[0,0], [+255,+255]],
        panel:          "Tone Curve",
        group:          "Red Channel",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["ff4800", "00ffed"]
    },
    toneCurveGreen: {
        displayName:    "Green Tone Curve",    
        crsName:        "ToneCurvePV2012Green",
        min:            0,
        max:            +255,
        defaultValue:   [[0,0], [+255,+255]],
        panel:          "Tone Curve",
        group:          "Green Channel",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["00d904", "ff0099"]
    },
    toneCurveBlue: {
        displayName:    "Blue Tone Curve",    
        crsName:        "ToneCurvePV2012Blue",
        min:            0,
        max:            +255,
        defaultValue:   [[0,0], [+255,+255]],
        panel:          "Tone Curve",
        group:          "Blue Channel",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["006cff", "ffc800"]
    },


    redHue: {
        displayName:    "Red Hue",    
        crsName:        "HueAdjustmentRed",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Hue",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["ed145b", "f26522"]
    },
    orangeHue: {
        displayName:    "Orange Hue",    
        crsName:        "HueAdjustmentOrange",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Hue",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["f26522", "fff200"]
    },
    yellowHue: {
        displayName:    "Yellow Hue" ,    
        crsName:        "HueAdjustmentYellow",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Hue",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["fff200", "39b54a"]
    },
    greenHue: {
        displayName:    "Green Hue",    
        crsName:        "HueAdjustmentGreen",
        min:            -100,
        max:            +100,
        defaultValue:   0 ,
        panel:          "Color Mix",
        group:          "Hue",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["39b54a", "00a99d"]
    },
    aquaHue: {
        displayName:    "Aqua Hue",    
        crsName:        "HueAdjustmentAqua",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Hue",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["00a99d", "0072bc"]
    },
    blueHue: {
        displayName:    "Blue Hue",    
        crsName:        "HueAdjustmentBlue",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Hue",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["0072bc", "2e3192"]
    },
    purpleHue: {
        displayName:    "Purple Hue",    
        crsName:        "HueAdjustmentPurple",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Hue",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["2e3192", "92278f"]
    },
    magentaHue: {
        displayName:    "Magenta Hue",    
        crsName:        "HueAdjustmentMagenta",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix", 
        group:          "Hue",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["92278f", "ed145b"]
    },


    redSaturation: {
        displayName:    "Red Saturation",    
        crsName:        "SaturationAdjustmentRed",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Saturation",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["e6e6e6", "ed145b"]
    },
    orangeSaturation: {
        displayName:    "Orange Saturation",    
        crsName:        "SaturationAdjustmentOrange",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Saturation",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["e6e6e6", "f26522"]
    },
    yellowSaturation: {
        displayName:    "Yellow Saturation" ,    
        crsName:        "SaturationAdjustmentYellow",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Saturation",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["e6e6e6", "fff200"]
    },
    greenSaturation: {
        displayName:    "Green Saturation",    
        crsName:        "SaturationAdjustmentGreen",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Saturation",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["e6e6e6", "39b54a"]
    },
    aquaSaturation: {
        displayName:    "Aqua Saturation",    
        crsName:        "SaturationAdjustmentAqua",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Saturation",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["e6e6e6", "00a99d"]
    },
    blueSaturation: {
        displayName:    "Blue Saturation",    
        crsName:        "SaturationAdjustmentBlue",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Saturation",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["e6e6e6", "0072bc"]
    },
    purpleSaturation: {
        displayName:    "Purple Saturation",    
        crsName:        "SaturationAdjustmentPurple",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Saturation",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["e6e6e6", "2e3192"]
    },
    magentaSaturation: {
        displayName:    "Magenta Saturation",    
        crsName:        "SaturationAdjustmentMagenta",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Saturation",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["e6e6e6", "92278f"]
    },


    redLuminance: {
        displayName:    "Red Luminance",    
        crsName:        "LuminanceAdjustmentRed",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Luminance",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["7a0026", "ed145b", "f5989d"]
    },
    orangeLuminance: {
        displayName:    "Orange Luminance",    
        crsName:        "LuminanceAdjustmentOrange",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Luminance",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["7b2e00", "f26522", "f9ad81"]
    },
    yellowLuminance: {
        displayName:    "Yellow Luminance" ,    
        crsName:        "LuminanceAdjustmentYellow",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Luminance",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["827b00", "fff200", "fff799"]
    },
    greenLuminance: {
        displayName:    "Green Luminance",    
        crsName:        "LuminanceAdjustmentGreen",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Luminance",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["005e20", "39b54a", "a3d39c"]
    },
    aquaLuminance: {
        displayName:    "Aqua Luminance",    
        crsName:        "LuminanceAdjustmentAqua",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Luminance",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["005952", "00a99d", "7accc8"]
    },
    blueLuminance: {
        displayName:    "Blue Luminance",    
        crsName:        "LuminanceAdjustmentBlue",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Luminance",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["003663", "0072bc", "7da7d9"]
    },
    purpleLuminance: {
        displayName:    "Purple Luminance",    
        crsName:        "LuminanceAdjustmentPurple",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Luminance",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["0d004c", "2e3192", "8781bd"]
    },
    magentaLuminance: {
        displayName:    "Magenta Luminance",    
        crsName:        "LuminanceAdjustmentMagenta",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Mix",
        group:          "Luminance",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["4b0049", "92278f", "bd8cbf"]
    },


    midtoneHue: {
        displayName:    "H",    
        crsName:        "ColorGradeMidtoneHue",
        min:            0,
        max:            +359,
        defaultValue:   0,
        panel:          "Color Grading",
        group:          "Midtone",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [arcoiris.red, arcoiris.orange, arcoiris.yellow, arcoiris.green, arcoiris.aqua, arcoiris.blue, arcoiris.purple, arcoiris.magenta]
    },
    midtoneSat: {
        displayName:    "S",    
        crsName:        "ColorGradeMidtoneSat",
        min:            0,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Grading",
        group:          "Midtone",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [arcoiris.red, arcoiris.orange, arcoiris.yellow, arcoiris.green, arcoiris.aqua, arcoiris.blue, arcoiris.purple, arcoiris.magenta]
    },
    midtoneLum: {
        displayName:    "L",    
        crsName:        "ColorGradeMidtoneLum",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Grading",
        group:          "Midtone",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
    },
    shadowHue: {
        displayName:    "H",    
        crsName:        "SplitToningShadowHue",
        min:            0,
        max:            +359,
        defaultValue:   0,
        panel:          "Color Grading",
        group:          "Shadow",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [arcoiris.red, arcoiris.orange, arcoiris.yellow, arcoiris.green, arcoiris.aqua, arcoiris.blue, arcoiris.purple, arcoiris.magenta]
    },
    shadowSat: {
        displayName:    "S",    
        crsName:        "SplitToningShadowSaturation",
        min:            0,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Grading",
        group:          "Shadow",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [arcoiris.red, arcoiris.orange, arcoiris.yellow, arcoiris.green, arcoiris.aqua, arcoiris.blue, arcoiris.purple, arcoiris.magenta]
    },
    shadowLum: {
        displayName:    "L",    
        crsName:        "ColorGradeShadowLum",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Grading",
        group:          "Shadow",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
    },
    highlightHue: {
        displayName:    "H",    
        crsName:        "SplitToningHighlightHue",
        min:            0,
        max:            +359,
        defaultValue:   0,
        panel:          "Color Grading",
        group:          "Highlight",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [arcoiris.red, arcoiris.orange, arcoiris.yellow, arcoiris.green, arcoiris.aqua, arcoiris.blue, arcoiris.purple, arcoiris.magenta]
    },
    highlightSat: {
        displayName:    "S",    
        crsName:        "SplitToningHighlightSaturation",
        min:            0,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Grading",
        group:          "Highlight",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [arcoiris.red, arcoiris.orange, arcoiris.yellow, arcoiris.green, arcoiris.aqua, arcoiris.blue, arcoiris.purple, arcoiris.magenta]
    },
    highlightLum: {
        displayName:    "L",    
        crsName:        "ColorGradeHighlightLum",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Grading",
        group:          "Highlight",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
    },
    globalHue: {
        displayName:    "H",    
        crsName:        "ColorGradeGlobalHue",
        min:            0,
        max:            +359,
        defaultValue:   0,
        panel:          "Color Grading",
        group:          "Global",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [arcoiris.red, arcoiris.orange, arcoiris.yellow, arcoiris.green, arcoiris.aqua, arcoiris.blue, arcoiris.purple, arcoiris.magenta]
    },
    globalSat: {
        displayName:    "S",    
        crsName:        "ColorGradeGlobalSat",
        min:            0,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Grading",
        group:          "Global",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [arcoiris.red, arcoiris.orange, arcoiris.yellow, arcoiris.green, arcoiris.aqua, arcoiris.blue, arcoiris.purple, arcoiris.magenta]
    },
    globalLum: {
        displayName:    "L",    
        crsName:        "ColorGradeGlobalLum",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Grading",
        group:          "Global",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
    },
    blending: {
        displayName:    "Blending",    
        crsName:        "ColorGradeBlending",
        min:            0,
        max:            +100,
        defaultValue:   50,
        panel:          "Color Grading",
        group:          "Blending And Balance",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
    },
    balance: {
        displayName:    "Balance",    
        crsName:        "SplitToningBalance",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Color Grading",
        group:          "Blending And Balance",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
    },

    sharpeningAmount: {
        displayName:    "Amount",    
        crsName:        "Sharpness",
        min:            0,
        max:            +150,
        defaultValue:   +40,
        panel:          "Detail",
        group:          "Sharpening",
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [sliderBarLightFillColor, sliderBarDarkFillColor]
    },

    luminanceNoiseReduction: {
        displayName:    "Luminance",    
        crsName:        "LuminanceSmoothing",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Detail",
        group:          "Luminance Noise Reduction",
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
    },

    colorNoiseReduction: {
        displayName:    "Color",    
        crsName:        "ColorNoiseReduction",
        min:            -100,
        max:            +100,
        defaultValue:   +25,
        panel:          "Detail",
        group:          "Color Noise Reduction",
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
    },

    postCropVignetteStyle: {
        displayName:    "Style",    
        crsName:        "PostCropVignetteStyle",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Effects",
        group:          "Post Crop",
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
    },


    grainAmount: {
        displayName:    "Amount",    
        crsName:        "GrainAmount",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Effects",
        group:          "Grain",
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: [sliderBarDarkFillColor, sliderBarLightFillColor]
    },

    shadowTintCalibration: {
        displayName:    "Shadow Tint",    
        crsName:        "ShadowTint",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Calibration",
        group:          "Shadows",
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["00d904", "ff0099"]
    },
    redHueCalibration: {
        displayName:    "Red Hue",    
        crsName:        "RedHue",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Calibration",
        group:          "Red Primary",
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["e6e6e6", "ed145b"]
    },
    greenHueCalibration: {
        displayName:    "Green Hue",    
        crsName:        "GreenHue",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Calibration",
        group:          "Green Primary",
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["e6e6e6", "39b54a"]
    },
    blueHueCalibration: {
        displayName:    "Blue Hue",    
        crsName:        "BlueHue",
        min:            -100,
        max:            +100,
        defaultValue:   0,
        panel:          "Calibration",
        group:          "Blue Primary",
        fillType:       slidersFillType,
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
        fillType:       slidersFillType,
        solidColor:     sliderBarSolidFillColor,
        gradientColors: ["e6e6e6", "0072bc"]
    }

}

var settingsGroupDict = {
    whiteBalance: {
        displayName: "White Balance",
        settings: {
            temperature: imageSettingsDict.temperature, 
            tint: imageSettingsDict.tint
        },
        groupType: "Slider"
    },
    tone: {
        displayName: "Tone",
        settings: {
            exposure: imageSettingsDict.exposure,
            contrast: imageSettingsDict.contrast,
            highlights: imageSettingsDict.highlights,
            shadows: imageSettingsDict.shadows, 
            whites: imageSettingsDict.whites, 
            blacks: imageSettingsDict.blacks
        },
        groupType: "Slider"
    },
    presence: {
        displayName: "Presence",
        settings: {
            texture: imageSettingsDict.texture,
            clarity: imageSettingsDict.clarity,
            vibrance: imageSettingsDict.vibrance,
            saturation: imageSettingsDict.saturation
        },
        groupType: "Slider"
    },
    parametricCurve: {
        displayName: "Parametric Curve",
        settings: {
            parametricShadows: imageSettingsDict.parametricShadows,
            parametricDarks: imageSettingsDict.parametricDarks,
            parametricLights: imageSettingsDict.parametricLights,
            parametricHighlights: imageSettingsDict.parametricHighlights
        },
        groupType: "Tone Curve"
    },
    parametricRegion: {
        displayName: "Parametric Region",
        settings: {
            parametricShadowSplit: imageSettingsDict.parametricShadowSplit, 
            parametricMidtoneSplit: imageSettingsDict.parametricMidtoneSplit, 
            parametricHighlightSplit: imageSettingsDict.parametricHighlightSplit
        },
        groupType: "Slider"
    },
    pointCurve: {
        displayName: "Point Curve",
        settings: {
            toneCurve: imageSettingsDict.toneCurve
        },
        groupType: "Tone Curve"
    },
    redChannel: {
        displayName: "Red Channel",
        settings: {
            toneCurveRed: imageSettingsDict.toneCurveRed
        },
        groupType: "Tone Curve"
    },
    greenChannel: {
        displayName: "Green Channel",
        settings: {
            toneCurveGreen: imageSettingsDict.toneCurveGreen
        },
        groupType: "Tone Curve"
    },
    blueChannel: {
        displayName: "Blue Channel",
        settings: {
            toneCurveBlue: imageSettingsDict.toneCurveBlue
        },
        groupType: "Tone Curve"
    },
    hue: {
        displayName: "Hue",
        settings: {
            redHue: imageSettingsDict.redHue, 
            orangeHue: imageSettingsDict.orangeHue, 
            yellowHue: imageSettingsDict.yellowHue, 
            greenHue: imageSettingsDict.greenHue, 
            aquaHue: imageSettingsDict.aquaHue, 
            blueHue: imageSettingsDict.blueHue, 
            purpleHue: imageSettingsDict.purpleHue, 
            magentaHue: imageSettingsDict.magentaHue
        },
        groupType: "Color Mix"
    },
    saturation: {
        displayName: "Saturation",
        settings: {
            redSaturation: imageSettingsDict.redSaturation, 
            orangeSaturation:: imageSettingsDict.orangeSaturation, 
            yellowSaturation: imageSettingsDict.yellowSaturation, 
            greenSaturation: imageSettingsDict.greenSaturation, 
            aquaSaturation: imageSettingsDict.aquaSaturation, 
            blueSaturation: imageSettingsDict.blueSaturation, 
            purpleSaturation: imageSettingsDict.purpleSaturation, 
            magentaSaturation: imageSettingsDict.magentaSaturation},
        groupType: "Color Mix"
    },
    luminance: {
        displayName: "Luminance",
        settings: {
            redLuminance: imageSettingsDict.redLuminance, 
            orangeLuminance: imageSettingsDict.orangeLuminance, 
            yellowLuminance: imageSettingsDict.yellowLuminance, 
            greenLuminance: imageSettingsDict.greenLuminance, 
            aquaLuminance: imageSettingsDict.aquaLuminance, 
            blueLuminance: imageSettingsDict.blueLuminance, 
            purpleLuminance: imageSettingsDict.purpleLuminance, 
            magentaLuminance: imageSettingsDict.magentaLuminance
        },
        groupType: "Color Mix"
    },
    midtone: {
        displayName: "Midtone",
        settings: {imageSettingsDict.midtoneHue, imageSettingsDict.midtoneSat, imageSettingsDict.midtoneLum},
        groupType: "Color Grading"
    },
    shadow: {
        displayName: "Shadow",
        settings: {imageSettingsDict.shadowHue, imageSettingsDict.shadowSat, imageSettingsDict.shadowLum},
        groupType: "Color Grading"
    },
    highlight: {
        displayName: "Highlight",
        settings: {imageSettingsDict.highlightHue, imageSettingsDict.highlightSat, imageSettingsDict.highlightLum},
        groupType: "Color Grading"
    },
    global: {
        displayName: "Global",
        settings: {imageSettingsDict.globalHue, imageSettingsDict.globalSat, imageSettingsDict.globalLum},
        groupType: "Color Grading"
    },
    blendingAndBalance: {
        displayName: "Blending And Balance",
        settings: {imageSettingsDict.blending, imageSettingsDict.balance},
        groupType: "Slider"
    },
    sharpening: {
        displayName: "Sharpening",
        settings: {imageSettingsDict.sharpeningAmount, imageSettingsDict.sharpeningRadius, imageSettingsDict.sharpeningDetail, imageSettingsDict.sharpeningMasking},
        groupType: "Slider"
    },
    luminanceNoiseReduction: {
        displayName: "Luminance Noise Reduction",
        settings: {imageSettingsDict.luminanceNoiseReduction, imageSettingsDict.luminanceNoiseReductionDetail, imageSettingsDict.luminanceNoiseReductionContrast},
        groupType: "Slider"
    },
    colorNoiseReduction: {
        displayName: "Color Noise Reduction",
        settings: {imageSettingsDict.colorNoiseReduction, imageSettingsDict.colorNoiseReductionDetail, imageSettingsDict.colorNoiseReductionSmoothness},
        groupType: "Slider"
    },
    postCrop: {
        displayName: "Post Crop",
        settings: {imageSettingsDict.postCropVignetteStyle, imageSettingsDict.postCropVignetteAmount, imageSettingsDict.postCropVignetteMidpoint, imageSettingsDict.postCropVignetteRoundness, imageSettingsDict.postCropVignetteFeather, imageSettingsDict.postCropVignetteHighlightContrast},
        groupType: "Slider"
    },
    grain: {
        displayName: "Grain",
        settings: {imageSettingsDict.grainAmount, imageSettingsDict.grainSize, imageSettingsDict.grainFrequency},
        groupType: "Slider"
    },
    shadows: {
        displayName: "Shadows",
        settings: {imageSettingsDict.shadowTintCalibration, imageSettingsDict.redHueCalibration},
        groupType: "Slider"
    },
    redPrimary: {
        displayName: "Red Primary",
        settings: {imageSettingsDict.redSaturationCalibration, imageSettingsDict.redSaturationCalibration},
        groupType: "Slider"
    },
    greenPrimary: {
        displayName: "Green Primary",
        settings: {imageSettingsDict.greenHueCalibration, imageSettingsDict.greenSaturationCalibration},
        groupType: "Slider"
    },
    bluePrimary: {
        displayName: "Blue Primary",
        settings: {imageSettingsDict.blueHueCalibration, imageSettingsDict.blueSaturationCalibration},
        groupType: "Slider"
    }
    
}