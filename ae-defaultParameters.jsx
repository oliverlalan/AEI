////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: Default Parameters
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var sliderCompositionParameters = {
    width: 225,
    height: 60,
    pixelAspect: 1,
    duration: 6,
    frameRate: 30,
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    style: "horizontal"
};

var sliderSetCompositionParameters = {
    width: 405,
    height: 1350,
    pixelAspect: 1,
    duration: 6,
    frameRate: 30,
    padding: {
        top: 60,
        right: 90,
        bottom: 60,
        left: 90
    }
}

var sliderCircleParameters = {
    diameter : 20, 
    fill : hexToRgb("FFFFFF"),
    stroke : {
        color: hexToRgb("A6A6A6"),
        size: sliderBarParameters.height / 8,
        opacity: 50,
        position: 2 // Inside
    },
    shadow: {
        opacity: 35,
        angle: 90,
        distance: 6,
        spread: 0,
        size: 12,

    },
    animation: {
        start: 2,
        end: 4,
        easeIn: new KeyframeEase(0.5, 33.3333),
        easeOut: new KeyframeEase(0.5, 33.3333)
    }
};

var sliderBarParameters = {
    width: 225,
    height: 8,
    cornerRadius: sliderBarParameters.height / 2,
    length: sliderBarParameters.width - sliderBarParameters.cornerRadius,
    fill: hexToRgb("737373"),
    bevelAndEmboss: {
        style: 2,
        depth: 100,
        direction: 2,
        size: sliderBarParameters.height,
        angle: 90,
        altitude: 30,
        highlightOpacity: 50,
        shadowOpacity: 35
    },
    stroke: {
        color: hexToRgb("A6A6A6"),
        size: sliderBarParameters.height / 8,
        opacity: 100,
        position: 2 // Inside
    }
}

var sliderTextParameters = {
    fontSize: 18,
    fontColor: hexToRgb("FFFFFF"),
    fontName: "WorkSansRoman-Medium",
    fontTracking: 100,
    fontCapitalization: true
};

// Calls
// Test value
var exposure = {
    displayName: "Exposure",
    defaultValue: 0,
    min: -100,
    max:  100,
    settingValue: +35,
    gradientColor1: hexToRgb("737373"),
    gradientColor2: hexToRgb("737373")

}

var contrast = {
    displayName: "Contrast",
    defaultValue: 0,
    min: -100,
    max:  100,
    settingValue: +80,
    gradientColor1: hexToRgb("737373"),
    gradientColor2: hexToRgb("737373")

}



