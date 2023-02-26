////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//TODO: Rewrite, return group, include style

function addHSLTablePanel (panelXPosition, panelYPosition, textLabels) {

    // Group definition
    var HSLTablePanel = activeDocument.layerSets.add();
    HSLTablePanel.name = "HSL Table Panel";

    // Document parameters
    var docWidth = app.activeDocument.width.as('px');
    var docHeight = app.activeDocument.height.as('px');

    // Initial position
    if(panelXPosition == undefined && panelYPosition == undefined) {
        var panelXPosition = docWidth * 2 / 24;
        var panelYPosition = docHeight / 2 - 585;
    }

    var labelCircleRadius = 8;
    var anchorPosition = "topright";
    var fontJustification = Justification.RIGHT;

    var groupXPosition = panelXPosition + labelCircleRadius * 2;
    var groupYPosition = panelYPosition;


    var HSLTable = [
        ["",            "Hue",                      "Sat",                           "Lum"                             ],
        ["Red",         redHue.settingValue,         redSaturation.settingValue,      redLuminance.settingValue        ],
        ["Orange",      orangeHue.settingValue,      orangeSaturation.settingValue,   orangeLuminance.settingValue     ],
        ["Yellow",      yellowHue.settingValue,      yellowSaturation.settingValue,   yellowLuminance.settingValue     ],
        ["Green",       greenHue.settingValue,       greenSaturation.settingValue,    greenLuminance.settingValue      ],
        ["Aqua",        aquaHue.settingValue,        aquaSaturation.settingValue,     aquaLuminance.settingValue       ],
        ["Blue",        blueHue.settingValue,        blueSaturation.settingValue,     blueLuminance.settingValue       ],
        ["Purple",      purpleHue.settingValue,      purpleSaturation.settingValue,   purpleLuminance.settingValue     ],
        ["Magenta",     magentaHue.settingValue,     magentaSaturation.settingValue,  magentaLuminance.settingValue    ]
    ]

    for (i = 0; i < HSLTable.length; i ++) {

        for (j = 0; j < HSLTable[0].length; j ++) {

            if(j == 0) {

                if(i !=0 ){

                    if(textLabels == true) {

                        HSLTable[i][j] = HSLTable[i][j].substring(0,3);
                        var textLayer = addText(HSLTable[i][j], groupXPosition, groupYPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization);
                        textLayer.name = HSLTable[i][j] + ' Label';
                        textLayer.move(HSLTablePanel, ElementPlacement.INSIDE);

                    } else {

                        fillColor = findSettingHexColor(HSLTable[i][j]);
                        
                        // xPosition, yPosition, circleRadius
                        var labelCircleLayer = drawCircle(groupXPosition, groupYPosition + fontSize / 3, labelCircleRadius);
                        setShapeSettings(true, fillColor, true, strokeColor, 2 );
                        labelCircleLayer.name = HSLTable[i][j] + ' Label';
                        labelCircleLayer.move(HSLTablePanel, ElementPlacement.INSIDE);

                    }

                }

                groupXPosition += 80;
            
            } else {

                var textLayer = addText(HSLTable[i][j], groupXPosition, groupYPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization);  // text, xPosition, yPosition, anchorPosition, fontSize, fontHexColor, fontName, fontTracking, fontJustification, fontCapitalization

                if(i == 0) {

                    textLayer.name = HSLTable[i][j] + ' Label';
                    textLayer.move(HSLTablePanel, ElementPlacement.INSIDE);

                }   else    {

                    textLayer.name = HSLTable[i][0] + ' ' + HSLTable[0][j] + ': ' + textLayer.name;  
                    textLayer.move(HSLTablePanel, ElementPlacement.INSIDE);

                }

                groupXPosition += 65;    
            
            }

        } 

        groupXPosition = panelXPosition;
        groupYPosition += 45;

    }

    return HSLTablePanel;
    
}

