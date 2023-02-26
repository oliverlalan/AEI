////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addSliderSettingSet(setName, settingsSet, xPosition, yPosition, sliderSettingsSetSpacing, sliderLineLength, sliderStyle) {

    var settingsSetGroup = activeDocument.layerSets.add();
    settingsSetGroup.name = setName;

    for (var i = 0; i < settingsSet.length; i++) {

        var settingGroup = addSliderSetting(settingsSet[i], xPosition, yPosition, sliderLineLength, 6, sliderStyle, true, true);
        settingGroup.name = settingsSet[i].displayName;

        var dummieGroup = settingsSetGroup.layerSets.add();
        settingGroup.move(dummieGroup, ElementPlacement.PLACEBEFORE);
        dummieGroup.remove();

        yPosition += sliderSettingsSetSpacing;

    }

    return settingsSetGroup;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addSliderSetting (selectedSetting, xPosition, yPosition, sliderLineLength, sliderCircleRadius, sliderStyle, includeSettingTitle, includeSettingValue) {

    var sliderGroup = activeDocument.layerSets.add();
    sliderGroup.name = selectedSetting.displayName + " Slider";

    var strokeWidth = sliderCircleRadius / 3;
    var textSize = sliderCircleRadius * 3;
    
    var minSetting = selectedSetting.min;
    var maxSetting = selectedSetting.max;
    var textSize = textSize;
    var sliderCircleFillColor = findSettingHexColor(selectedSetting.displayName);

    switch (sliderStyle)  {
        case "vertical":
            var minSettingY = yPosition;
            var maxSettingY = yPosition + sliderLineLength; 
            var settingY = minSettingY + (selectedSetting.settingValue - minSetting) / (maxSetting-minSetting) * sliderLineLength;
            var minSettingX = maxSettingX = settingX = xPosition;

            var settingTitleXPosition = maxSettingX;
            var settingTitleYPosition = minSettingY - 1.5 * textSize;
            var settingTitleAnchorPosition = "bottomcenter";

            var settingValueXPosition = maxSettingX;
            var settingValueYPosition = maxSettingY + 1.5 * textSize;
            var settingValueAnchorPosition = "topcenter";
        break;

        case "horizontal":
            var minSettingX = xPosition;
            var maxSettingX = xPosition + sliderLineLength; 
            var settingX = minSettingX + (selectedSetting.settingValue - minSetting) / (maxSetting-minSetting) * sliderLineLength;
            var minSettingY = maxSettingY = settingY = yPosition;

            var settingTitleXPosition = minSettingX;
            var settingTitleYPosition = minSettingY - 1.5 * textSize;
            var settingTitleAnchorPosition = "topleft";

            var settingValueXPosition = maxSettingX
            var settingValueYPosition = minSettingY - 1.5 * textSize;
            var settingValueAnchorPosition = "topright";
        break;

        case "horizontalSide":
            var minSettingX = xPosition;
            var maxSettingX = xPosition + sliderLineLength * 7 / 10; 
            var settingX = minSettingX + (selectedSetting.settingValue - minSetting) / (maxSetting-minSetting) * sliderLineLength * 7 / 10;
            var minSettingY = maxSettingY = settingY = yPosition;

            var settingTitleXPosition = minSettingX;
            var settingTitleYPosition = minSettingY - 2 * textSize;
            var settingTitleAnchorPosition = "topleft";

            var settingValueXPosition = minSettingX + sliderLineLength;
            var settingValueYPosition = minSettingY;
            var settingValueAnchorPosition = "middleright";
        break;


    }
    
    if(includeSettingTitle) {
        var labelLayer = addText(selectedSetting.displayName, settingTitleXPosition, settingTitleYPosition, settingTitleAnchorPosition, fontSize, fontHexColor, fontName, fontTracking, Justification.LEFT, fontCapitalization); // selectedSetting, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization
        labelLayer.name = 'Text Label';
        labelLayer.move(sliderGroup, ElementPlacement.INSIDE);
    }

    if(includeSettingValue) {
        var valueLayer = addText(selectedSetting.settingValue, settingValueXPosition, settingValueYPosition, settingValueAnchorPosition, fontSize, fontHexColor, fontName, fontTracking, Justification.RIGHT, fontCapitalization);
        valueLayer.name = 'Text Value';
        valueLayer.move(sliderGroup, ElementPlacement.INSIDE);
    }
    
    // Add setting line
    var lineLayer = drawLine(minSettingX, minSettingY, maxSettingX, maxSettingY);
    setShapeSettings(false, strokeColor, true, strokeColor, strokeWidth);
    lineLayer.name = 'Slider Line';
    lineLayer.move(sliderGroup, ElementPlacement.INSIDE);

    // Add setting circle value
    var sliderCircleLayer = drawCircle(settingX, settingY, sliderCircleRadius); // xPosition, yPosition, sliderCircleRadius, fillEnabled, fillColor, strokeEnabled, strokeColor, strokeWidth
    setShapeSettings(true, sliderCircleFillColor, true, strokeColor, strokeWidth);
    sliderCircleLayer.name = 'Slider Circle';
    sliderCircleLayer.move(sliderGroup, ElementPlacement.INSIDE);

    return sliderGroup;

}

