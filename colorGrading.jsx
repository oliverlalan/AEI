////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addColorGradingPanel (panelXPosition, panelYPosition) {

    // Group definition
    var colorGradingPanelGroup = activeDocument.layerSets.add();
    colorGradingPanelGroup.name = "Color Grading Panel";

    // Document parameters
    var docWidth = app.activeDocument.width.as('px');
    var docHeight = app.activeDocument.height.as('px');

    // Initial position
    if(panelXPosition == undefined && panelYPosition == undefined) {
        var panelXPosition = docWidth * 2 / 24;
        var panelYPosition = docHeight / 2 - 585;
    }

    var groupXPosition = panelXPosition;
    var groupYPosition = panelYPosition;

    var colorGradingCircleRadius = docWidth / 12;
    var sliderLineLength = docWidth * 5 / 24;
    var strokeWidth = docWidth / 540;

    var sliderSettingsSetSpacing = colorGradingCircleRadius * 11 / 18;
    
    // Add color grading groups
    var globalColorGradingGroup =     addColorGradingGroup(globalHue,         globalSat,          globalLum,     colorGradingCircleRadius,     groupXPosition,      groupYPosition,      strokeWidth,        "G",    "colorful",     "horizontal");
    groupYPosition += colorGradingCircleRadius * 10 / 3;
    moveLayerInsideLayerset(globalColorGradingGroup, colorGradingPanelGroup);

    var blendingColorGradingGroup = addSliderSettingSet("Blending Settings", [blending, balance], groupXPosition, groupYPosition, sliderSettingsSetSpacing, sliderLineLength, "horizontal");
    groupYPosition += colorGradingCircleRadius * 7 / 6;
    moveLayerInsideLayerset(blendingColorGradingGroup, colorGradingPanelGroup);

    var highlightColorGradingGroup =  addColorGradingGroup(highlightHue,      highlightSat,       highlightLum,  colorGradingCircleRadius,     groupXPosition,      groupYPosition,      strokeWidth,        "H",    "colorful",     "horizontal");
    groupYPosition += colorGradingCircleRadius * 3;
    moveLayerInsideLayerset(highlightColorGradingGroup, colorGradingPanelGroup);

    var midtoneColorGradingGroup =    addColorGradingGroup(midtoneHue,        midtoneSat,         midtoneLum,    colorGradingCircleRadius,     groupXPosition,      groupYPosition,      strokeWidth,        "M",    "colorful",     "horizontal");
    groupYPosition += colorGradingCircleRadius * 3;
    moveLayerInsideLayerset(midtoneColorGradingGroup, colorGradingPanelGroup);

    var shadowColorGradingGroup =     addColorGradingGroup(shadowHue,         shadowSat,          shadowLum,     colorGradingCircleRadius,     groupXPosition,      groupYPosition,      strokeWidth,        "S",    "colorful",     "horizontal");
    moveLayerInsideLayerset(shadowColorGradingGroup, colorGradingPanelGroup);

    return colorGradingPanelGroup;
    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addColorGradingGroup (hue, saturation, luminance, radius, xPosition, yPosition, strokeWidth, textLabel, colorGradingPalette, colorGradingDesign) { 

    // Group definition
    var colorGradingGroup = app.activeDocument.layerSets.add();
    colorGradingGroup.name = textLabel;

    // Style
    if(colorGradingDesign == "vertical")  {

        var colorGradingBackgroundXPosition = xPosition + radius;
        var colorGradingBackgroundYPosition = yPosition + radius;
        var colorGradingBackgroundRadius = radius * 0.75;

        var settingCircleValueRadius = radius / 15;

        var luminanceSliderXPosition = xPosition;
        var luminanceSliderYPosition = yPosition + radius * 13 / 6;
        var luminanceSliderLength = radius * 2;
        var luminanceSliderStyle = "horizontal";

        var titleTextValueXPosition = xPosition - radius / 2
        var titleTextValueYPosition = yPosition + radius
        var titleTextValueAnchorPosition = "topcenter";
        var titleTextValueRotation = -90;

        var hueTextValueXPosition = xPosition;
        var saturationTextValueXPosition = xPosition + radius;
        var luminanceTextValueXPosition = xPosition + radius * 2;
        var hueTextValueYPosition = saturationTextValueYPosition = luminanceTextValueYPosition = yPosition + radius * 2;
        var hueTextValueAnchorPosition = "topleft";
        var saturationTextValueAnchorPosition = "topcenter";
        var luminanceTextValueAnchorPosition = "topright";

    }    else if ( colorGradingDesign == "horizontal")    {

        var colorGradingBackgroundXPosition = xPosition + radius * 10 / 9;
        var colorGradingBackgroundYPosition = yPosition + radius;
        var colorGradingBackgroundRadius = radius * 0.9;

        var settingCircleValueRadius = radius / 15;

        var settingTextValueSize = radius / 5;

        var luminanceSliderXPosition = xPosition + radius * 5 / 2;
        var luminanceSliderYPosition = yPosition;
        var luminanceSliderLength = radius * 2;
        var luminanceSliderStyle = "vertical";

        var titleTextValueXPosition = xPosition;
        var titleTextValueYPosition = yPosition;
        var titleTextValueAnchorPosition = "topleft";
        var titleTextValueRotation = 0;

        var hueTextValueXPosition = xPosition + radius * 1 / 9;
        var saturationTextValueXPosition = hueTextValueXPosition + radius;
        var luminanceTextValueXPosition = saturationTextValueXPosition + radius;
        var hueTextValueYPosition = saturationTextValueYPosition = luminanceTextValueYPosition = yPosition + radius * 5 / 2;
        var hueTextValueAnchorPosition = "bottomleft";
        var saturationTextValueAnchorPosition = "bottomcenter";
        var luminanceTextValueAnchorPosition = "bottomright";

    }

    switch (textLabel)    {
        case "G": 
            var backgroundOverlayColor = "FFFFFF";
            var backgroundOverlayOpacity = 0;
        break;
        case "H": 
            var backgroundOverlayColor = "FFFFFF";
            var backgroundOverlayOpacity = 35;
        break;
        case "M": 
            var backgroundOverlayColor = "000000";
            var backgroundOverlayOpacity = 25;
        break;
        case "S": 
            var backgroundOverlayColor = "000000";
            var backgroundOverlayOpacity = 70;
        break;
    }

    // Add Color Grade Background with white gradient overlay
    var colorfulGradientStops = [
        { color: "ff3232",  opacity: 100 ,  midPoint: 50}, 
        { color: "ff00ff",  opacity: 100 ,  midPoint: 50}, 
        { color: "3232ff",  opacity: 100 ,  midPoint: 25},
        { color: "00ffff",  opacity: 100 ,  midPoint: 50},
        { color: "34ff34",  opacity: 100 ,  midPoint: 50},
        { color: "ffff00",  opacity: 100 ,  midPoint: 50},
        { color: "ff3232",  opacity: 100 ,  midPoint: 50}
    ];

    var colorGradingBackground = drawCircle(colorGradingBackgroundXPosition, colorGradingBackgroundYPosition, colorGradingBackgroundRadius);
    setShapeSettings(true, "FFFFFF", true, strokeColor, strokeWidth);
    fillShapeWithGradient("angle", colorfulGradientStops, 0, [0,0]);
    addGradientOverlay("radial", [0,0], 75, 0, [{ color: "FFFFFF",  opacity: 100 ,  midPoint: 50}, { color: "FFFFFF",  opacity:   0 ,  midPoint: 50}], "classic", "normal", 100);
    colorGradingBackground.fillOpacity = 55;
    colorGradingBackground.name = 'Background Circle';
    moveLayerInsideLayerset(colorGradingBackground, colorGradingGroup);

    // Add Frame and darkness overlay
    var colorGradingBackgroundOverlay = drawCircle(colorGradingBackgroundXPosition, colorGradingBackgroundYPosition, colorGradingBackgroundRadius);
    setShapeSettings(true, backgroundOverlayColor, false, strokeColor, strokeWidth);
    colorGradingBackgroundOverlay.name = 'Background Overlay';
    colorGradingBackgroundOverlay.fillOpacity = backgroundOverlayOpacity;
    moveLayerInsideLayerset(colorGradingBackgroundOverlay, colorGradingGroup);
    // addColorOverlay(backgroundOverlayColor, backgroundOverlayOpacity, "normal");

    // Add Saturation and Hue Circle
    var t_x = saturation.settingValue * radius / 100 * Math.cos(hue.settingValue * Math.PI / 180);
    var t_y = saturation.settingValue * radius / 100 * Math.sin(hue.settingValue * Math.PI / 180);
    var settingCircle = drawCircle(colorGradingBackgroundXPosition + t_x, colorGradingBackgroundYPosition - t_y, settingCircleValueRadius);
    setShapeSettings(true, "8C8C8C", true, strokeColor, strokeWidth);
    settingCircle.name = 'Saturation & Hue Circle';
    moveLayerInsideLayerset(settingCircle, colorGradingGroup);

    // Add Luminance bar
    var luminanceGroup = addSliderSetting (luminance, luminanceSliderXPosition, luminanceSliderYPosition, luminanceSliderLength, settingCircleValueRadius, luminanceSliderStyle, false, false);
    luminanceGroup.name = 'Luminance Bar';
    moveLayerInsideLayerset(luminanceGroup, colorGradingGroup);

    // Add Title
    var textLabel = addText(textLabel, titleTextValueXPosition, titleTextValueYPosition, titleTextValueAnchorPosition, fontSize, fontHexColor, fontName, fontTracking, Justification.RIGHT, fontCapitalization); // text, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization
    textLabel.rotate(titleTextValueRotation, AnchorPosition.TOPCENTER);
    moveLayerInsideLayerset(textLabel, colorGradingGroup);

    // Add Hue Saturation and Luminance Values
    var hueLabel = addText(hue.displayName + hue.settingValue, hueTextValueXPosition, hueTextValueYPosition, hueTextValueAnchorPosition, fontSize, fontHexColor, fontName, fontTracking, Justification.LEFT, fontCapitalization);
    moveLayerInsideLayerset(hueLabel, colorGradingGroup);

    var saturationLabel = addText(saturation.displayName + saturation.settingValue, saturationTextValueXPosition, saturationTextValueYPosition, saturationTextValueAnchorPosition, fontSize, fontHexColor, fontName, fontTracking, Justification.CENTER, fontCapitalization);
    moveLayerInsideLayerset(saturationLabel, colorGradingGroup);

    var luminanceLabel = addText(luminance.displayName + luminance.settingValue, luminanceTextValueXPosition, luminanceTextValueYPosition, luminanceTextValueAnchorPosition, fontSize, fontHexColor, fontName, fontTracking, Justification.RIGHT, fontCapitalization);
    moveLayerInsideLayerset(luminanceLabel, colorGradingGroup);

    return colorGradingGroup;

}