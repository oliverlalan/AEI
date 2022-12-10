#target photoshop

createLightroomPresetOverlay();

function createLightroomPresetOverlay() {

    addLightroomPresetPanels();
    
    addPresetName();

    addLogo();

    addFooter();

}

function addLightroomPresetPanels() {

    var presetName = getDocBasename();

    var selectedFolder = Folder("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Lightroom Presets Panels/");

    var presetPanelsList = selectedFolder.getFiles(presetName + "*.png");

    var presetPanelsTypes = getPresetPanelsTypes(presetPanelsList);

    var panelDesign = selectPanelDesign(presetPanelsTypes);

    for (i=0; i<presetPanelsList.length; i++) {

        var panelFilePath = presetPanelsList[i];
        var panelType = presetPanelsTypes[i];

        try{
            addFile(panelFilePath);
        } 

        catch (e)
        {
            alert('Path error.');
        }

        resizePanel(activeDocument.activeLayer, panelType);

        switch (panelDesign) {

            case "6 Panels":
            switch (panelType) {

                case "Basic":
                panelXPosition = new UnitValue(35, 'px');
                panelYPosition = new UnitValue(250, 'px');
                break;

                case "Calibration":
                panelXPosition = new UnitValue(35, 'px');
                panelYPosition = new UnitValue(834, 'px');
                break;

                case "Color Grading":
                panelXPosition = new UnitValue(725, 'px');
                panelYPosition = new UnitValue(666, 'px');
                break;

                case "Effects":
                panelXPosition = new UnitValue(380, 'px');
                panelYPosition = new UnitValue(993, 'px');
                break;

                case "HSL":
                panelXPosition = new UnitValue(380, 'px');
                panelYPosition = new UnitValue(250, 'px');
                break;

                case "Tone Curve":
                panelXPosition = new UnitValue(725, 'px');
                panelYPosition = new UnitValue(250, 'px');
                break;

                default:
                panelXPosition = new UnitValue(0, 'px');
                panelYPosition = new UnitValue(0, 'px');

            }
            break;

            case "5 Panels":
            switch (panelType) {

                case "Basic":
                panelXPosition = new UnitValue(35, 'px');
                panelYPosition = new UnitValue(310, 'px');
                break;

                case "Calibration":
                panelXPosition = new UnitValue(380, 'px');
                panelYPosition = new UnitValue(769, 'px');
                break;

                case "Effects":
                panelXPosition = new UnitValue(35, 'px');
                panelYPosition = new UnitValue(936, 'px');
                break;

                case "HSL":
                panelXPosition = new UnitValue(725, 'px');
                panelYPosition = new UnitValue(310, 'px');
                break;

                case "Tone Curve":
                panelXPosition = new UnitValue(380, 'px');
                panelYPosition = new UnitValue(310, 'px');
                break;

                default:
                panelXPosition = new UnitValue(0, 'px');
                panelYPosition = new UnitValue(0, 'px');

            }
            break;

            case "5 Panels BW":
            switch (panelType) {

                case "Basic":
                panelXPosition = new UnitValue(168, 'px');
                panelYPosition = new UnitValue(252, 'px');
                break;

                case "Calibration":
                panelXPosition = new UnitValue(168, 'px');
                panelYPosition = new UnitValue(836, 'px');
                break;

                case "Effects":
                panelXPosition = new UnitValue(597, 'px');
                panelYPosition = new UnitValue(968, 'px');
                break;

                case "BW":
                panelXPosition = new UnitValue(597, 'px');
                panelYPosition = new UnitValue(670, 'px');
                break;

                case "Tone Curve":
                panelXPosition = new UnitValue(597, 'px');
                panelYPosition = new UnitValue(252, 'px');
                break;

                default:
                panelXPosition = new UnitValue(0, 'px');
                panelYPosition = new UnitValue(0, 'px');

            }
            break;

        }

        moveLayerTo(activeDocument.activeLayer, panelXPosition, panelYPosition);

        // Move inside 
        activeDocument.activeLayer.move(activeDocument.layerSets.getByName("Lightroom Settings"), ElementPlacement.INSIDE);

    }

}

function getDocBasename () {
    var docName = activeDocument.name;
    var basename = docName.match(/(.*)\.[^\.]+$/)[1];

    return basename;
}

function addFile (selectedFile) {

    var idPlc = charIDToTypeID( "Plc " ); 
    var desc11 = new ActionDescriptor();  
    var idnull = charIDToTypeID( "null" );

    desc11.putPath( idnull, new File(selectedFile) );
    var idFTcs = charIDToTypeID( "FTcs" ); 
    var idQCSt = charIDToTypeID( "QCSt" );   
    var idQcsa = charIDToTypeID( "Qcsa" ); 
    desc11.putEnumerated( idFTcs, idQCSt, idQcsa );
    var idOfst = charIDToTypeID( "Ofst" );     
    var desc12 = new ActionDescriptor();     
    var idHrzn = charIDToTypeID( "Hrzn" );    
    var idPxl = charIDToTypeID( "#Pxl" );      
    desc12.putUnitDouble( idHrzn, idPxl, 0.000000 );     
    var idVrtc = charIDToTypeID( "Vrtc" );    
    var idPxl = charIDToTypeID( "#Pxl" );    
    desc12.putUnitDouble( idVrtc, idPxl, 0.000000 );
    var idOfst = charIDToTypeID( "Ofst" );
    desc11.putObject( idOfst, idOfst, desc12 );
    executeAction( idPlc, desc11, DialogModes.NO );

}

function moveLayerTo(fLayer,fX,fY, anchorPosition) {

    var Position = fLayer.bounds;
    var dX = new UnitValue(0, 'px');
    var dY = new UnitValue(0, 'px');
    var layerWidth = fLayer.bounds[2] - fLayer.bounds[0];
    var layerHeight = fLayer.bounds[3] - fLayer.bounds[1];

    switch (anchorPosition) {
        case "middlecenter":
        dX = fX - Position[0] - layerWidth / 2;
        dY = fY - Position[1] - layerHeight / 2;
        break;

        case "middleleft":
        dX = fX - Position[0];
        dY = fY - Position[1] - layerHeight / 2;
        break;

        case "middleright":
        dX = fX - Position[0];
        dY = fY - Position[1] + layerHeight / 2;
        break;

        default:
        dX = fX - Position[0];
        dY = fY - Position[1];

    }

    fLayer.translate(dX,dY);
}

function resizePanel(layer, panelType) {
    switch (panelType){

        case "Basic":
            panelTargetWidth = new UnitValue(320, 'px');
            panelTargetHeight = new UnitValue(556, 'px');
        break;

        case "Calibration":
            panelTargetWidth = new UnitValue(320, 'px');
            panelTargetHeight = new UnitValue(376, 'px');
        break;

        case "Color Grading":
            panelTargetWidth = new UnitValue(320, 'px');
            panelTargetHeight = new UnitValue(540, 'px');
        break;

        case "Effects":
            panelTargetWidth = new UnitValue(320, 'px');
            panelTargetHeight = new UnitValue(136, 'px');
        break;

        case "HSL":
            panelTargetWidth = new UnitValue(320, 'px');
            panelTargetHeight = new UnitValue(716, 'px');
        break;

        case "BW":
            panelTargetWidth = new UnitValue(320, 'px');
            panelTargetHeight = new UnitValue(272, 'px');
        break;

        case "Tone Curve":
            panelTargetWidth = new UnitValue(320, 'px');
            panelTargetHeight = new UnitValue(392, 'px');
        break;

    }

    // Document Selection
    var layerBounds = layer.bounds;

    // Resize image
    var panelWidth = layerBounds[2] - layerBounds[0];
    var panelHeight = layerBounds[3] - layerBounds[1];
    
    var widthResizeRatio = panelTargetWidth / panelWidth * 100;
    var heightResizeRatio = panelTargetHeight / panelHeight * 100;
    layer.resize(widthResizeRatio, heightResizeRatio, AnchorPosition.MIDDLECENTER);

}

function resetPreferences (startRulerUnits, startTypeUnits, startTypeDialogs) {

    // Reset application preferences
    app.preferences.rulerUnits = startRulerUnits;
    app.preferences.typeUnits = startTypeUnits;
    app.displayDialogs = startTypeDialogs;

}

function savePreferences() {

    // Save current preferences
    var startRulerUnits = app.preferences.rulerUnits;
    var startTypeUnits = app.preferences.typeUnits;
    var startTypeDialogs = app.displayDialogs;

    // Set own preferences
    app.preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeUnits = TypeUnits.PIXELS;
    app.displayDialogs = DialogModes.ERROR;
    
    return {
        startRulerUnits: startRulerUnits, 
        startTypeUnits: startTypeUnits, 
        startTypeDialogs: startTypeDialogs
        };

}

function selectPanelDesign(presetPanelsList) {

    var panelDesign;

    for (i=0; i<presetPanelsList.length; i++) {
        if (presetPanelsList[i] == "BW") {
            panelDesign = "5 Panels BW";
            i =presetPanelsList.length;
        } else if (presetPanelsList[i] == "Color Grading"){
            panelDesign = "6 Panels";
            i =presetPanelsList.length;
        } else {
            panelDesign = "5 Panels";
        }
    }

    return panelDesign;

}

function getPresetPanelsTypes(presetPanelsList) {

    var presetPanelsTypes = [];    

    for (i=0; i<presetPanelsList.length; i++) {

        //var selectedFilePath = "D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Presets Overlays/" + docPresetKeywords[0] + ".png";
        var selectedFilePath = presetPanelsList[i];
        var selectedFileName = presetPanelsList[i].displayName;
        var selectedFileBaseName = selectedFileName.match(/(.*)\.[^\.]+$/)[1];
        var panelType = selectedFileBaseName.substr(selectedFileBaseName.lastIndexOf("-") + 2, selectedFileBaseName.length);
        presetPanelsTypes.push(panelType);
        
    }

    return presetPanelsTypes;
}

function addPresetName(){

    presetName = getDocBasename();

    // Text layer creation
    var txtLayer = activeDocument.artLayers.add();
    txtLayer.kind = LayerKind.TEXT;

    // Text 
    var textItemRef = txtLayer.textItem;

    // Text color
    textColor = new SolidColor();
    textColor.rgb.hexValue = "FFFFFF";
    textItemRef.color = textColor;

    // Text font
    textItemRef.font = "WorkSansRoman-Light";
    textItemRef.tracking = 50;

    // Font size. There is a bug. textItem.size always converts "px" to "pt". 
    // https://community.adobe.com/t5/photoshop-ecosystem-discussions/photoshop-script-change-textitem-size-javascript/td-p/11478075
    textItemRef.size = new UnitValue(24 , 'px');

    textItemRef.contents = presetName;

    moveLayerTo(activeDocument.activeLayer, new UnitValue(540, 'px'), new UnitValue(1274 , 'px'), 'middlecenter');

    // Move inside 
    activeDocument.activeLayer.move(activeDocument.layerSets.getByName("Footer"), ElementPlacement.INSIDE);
}

function addLogo () {
    addFile("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Design/Template - Logo - TopRight.png");

    // Move inside 
        activeDocument.activeLayer.move(activeDocument.layerSets.getByName("Logo"), ElementPlacement.INSIDE);
}

function addFooter() {
    addFile("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Design/Template - Footer.png");

    // Move inside 
        activeDocument.activeLayer.move(activeDocument.layerSets.getByName("Footer"), ElementPlacement.INSIDE);
}