var settingTest = {
                        temperature: {
                            displayName:    "Temperature",    
                            crsName:        "Temperature",
                            min:            +1000,
                            max:            +10000,
                            defaultValue:   +4500,
                            panel:          "Basic",
                            group:          "White Balance",
                            fillType:       slidersFillType,
                            solidColor:     sliderBarSolidFillColor,
                            gradientColors: ["006cff", "ffc800"],
                            settingValue:   +7500
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
                        }
                    }

var lightroomPanelsTestData = {
    displayName: "Test",
    panels: {
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
                        }
                    }
                },
                tone: {
                    displayName: "Tone",
                    settings: {
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
                        }
                    },
                    groupType: "Slider"
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
                        }
                    }
                }
            }
        }

    }
    
}
