#include ae-testData.jsx

var setting = settingTest.temperature;

// Define Composition Parameters
            var sliderCompositionParameters = {
                width: 225,
                height: 60,
                anchorPoint: "topLeft",
                pixelAspect: 1,
                duration: 6,
                frameRate: 30,
                padding: {
                    top: 0,
                    right: 18,
                    bottom: 0,
                    left: 18
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
                stroke: {
                    color: hexToRgb(sliderBarStrokeColor),
                    width: 6,
                    cap: 2 // Rounded
                }
            };

            sliderBarParameters.width = sliderCompositionParameters.width - sliderCompositionParameters.padding.right - sliderCompositionParameters.padding.left;
            sliderBarParameters.height = sliderCompositionParameters.height - sliderCompositionParameters.padding.top - sliderCompositionParameters.padding.bottom;
            sliderBarParameters.stroke.length = sliderBarParameters.width - sliderBarParameters.stroke.width;
            sliderBarParameters.vertices = [];
            sliderBarParameters.vertices[0] = [sliderCompositionParameters.padding.left + sliderBarParameters.stroke.width / 2, sliderCompositionParameters.padding.top + sliderBarParameters.height * 6 / 10];
            sliderBarParameters.vertices[1] = [sliderCompositionParameters.padding.left + sliderBarParameters.stroke.width / 2 + sliderBarParameters.stroke.length, sliderCompositionParameters.padding.top + sliderBarParameters.height * 6 / 10];
            sliderBarParameters.anchorPoint = [sliderBarParameters.vertices[0][0] + (setting.defaultValue - setting.min) / (setting.max - setting.min) * sliderBarParameters.stroke.length, sliderBarParameters.vertices[0][1]];
            

            var sliderCircleParameters = {
                diameter : 21,
                position: {
                    start: sliderBarParameters.anchorPoint,
                    end: [sliderBarParameters.vertices[0][0] + (setting.settingValue - setting.min) / (setting.max - setting.min) * sliderBarParameters.stroke.length, sliderBarParameters.vertices[0][1]]
                },
                fill : {
                    color: hexToRgb(circleSelectorFillColor)
                },
                stroke : {
                    color: hexToRgb(circleSelectorStrokeColor),
                    width: 1,
                    opacity: 50
                },
                shadow: {
                    opacity: 35,
                    direction: 180,
                    distance: 3,
                    softness: 18,
                },
                animation: {
                    start: 2,
                    end: 4
                }
            };


            var sliderTextParameters = {
                position: [0,0],
                fontSize: 18,
                fontColor: hexToRgb("FFFFFF"),
                fontName: "WorkSansRoman-Medium",
                fontTracking: 100,
                fontCapitalization: true,
                animation: {
                    start: 2,
                    end: 4
                }
            }

            var sliderTextLabelParameters = {
                anchorPoint: "topLeft",
                justification: ParagraphJustification.LEFT_JUSTIFY,
            };

            var sliderTextValueParameters = {
                position: [sliderCompositionParameters.width, 0],
                anchorPoint: "topRight",
                justification:  ParagraphJustification.RIGHT_JUSTIFY,
            }

            var test1 = sliderBarParameters.length;
            var test = 9;