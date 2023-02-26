////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addColorMixerPanel(panelXPosition, panelYPosition) {

    // Group definition
    var colorMixerPanelGroup = activeDocument.layerSets.add();
    colorMixerPanelGroup.name = "Color Mixer Panel";

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

    var colorMixerHue = [redHue,orangeHue,yellowHue,greenHue,aquaHue,blueHue,purpleHue,magentaHue];
    var colorMixerSaturation = [redSaturation,orangeSaturation,yellowSaturation,greenSaturation,aquaSaturation,blueSaturation,purpleSaturation,magentaSaturation];
    var colorMixerLuminance = [redLuminance,orangeLuminance,yellowLuminance,greenLuminance,aquaLuminance,blueLuminance,purpleLuminance,magentaLuminance];

    // Add color mixer groups
    var hueColorMixerGroup = addColorMixerGroup("Hue", colorMixerHue, groupXPosition, groupYPosition);
    moveLayerInsideLayerset(hueColorMixerGroup, colorMixerPanelGroup);
    groupYPosition += 405;
    var saturationColorMixerGroup = addColorMixerGroup("Saturation", colorMixerSaturation, groupXPosition, groupYPosition);
    moveLayerInsideLayerset(saturationColorMixerGroup, colorMixerPanelGroup);
    groupYPosition += 405;
    var luminancecolorMixerGroup = addColorMixerGroup("Luminance", colorMixerLuminance, groupXPosition, groupYPosition);
    moveLayerInsideLayerset(luminancecolorMixerGroup, colorMixerPanelGroup);

    return colorMixerPanelGroup;

    function addColorMixerGroup (groupName, sectionArray, xPosition, yPosition) {

        // Group definition
        var colorMixerGroup = activeDocument.layerSets.add();
        colorMixerGroup.name = groupName + " Group";
        
        // Text parameters
        var anchorPosition = "bottomleft";

        // Slider parameters
        var sliderLineLength = 225;
        var sliderCircleRadius = 6;
        var sliderStyle = "horizontalSide";
        var includeSettingTitle = false;
        var includeSettingValue = true;
        
        // Add Title
        var colorMixerGroupTitle = addText(groupName, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization);
        colorMixerGroupTitle.name = groupName + " Group Title";
        moveLayerInsideLayerset(colorMixerGroupTitle, colorMixerGroup);
        yPosition += 36;

        // Add Slider Settings
        for (cg = 0; cg < sectionArray.length; cg++) {

            var colorMixerSliderSetting = addSliderSetting (sectionArray[cg], xPosition, yPosition, sliderLineLength, sliderCircleRadius, sliderStyle, includeSettingTitle, includeSettingValue);
            moveLayerInsideLayerset(colorMixerSliderSetting, colorMixerGroup);
            yPosition += 36;

        }

        return colorMixerGroup;

    }

}

