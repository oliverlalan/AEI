#target photoshop

openUneditedRAW(activeDocument, "_unedited");


function openUneditedRAW(selectedDocument, documentSuffix) {

    selectedFile = new File(selectedDocument.fullName);
    ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
    xmpMeta = new XMPMeta(app.activeDocument.xmpMetadata.rawData);
    var openRAWOptions = new CameraRAWOpenOptions();

    // Main
    openRAWOptions.settings = CameraRAWSettingsType.CUSTOM;
    openRAWOptions.whiteBalance = WhiteBalanceType.ASSHOT;
    openRAWOptions.temperature = 0;
    openRAWOptions.tint = 0;
    openRAWOptions.exposure = 0;
    openRAWOptions.shadows = 0;
    openRAWOptions.brightness = 0;
    openRAWOptions.contrast = 0;
    openRAWOptions.saturation = 0;

    // Detail
    openRAWOptions.sharpness = 0;
    openRAWOptions.luminanceSmoothing = 0;
    openRAWOptions.colorNoiseReduction = 0;

    // Lens
    openRAWOptions.chromaticAberrationBY = 0;
    openRAWOptions.chromaticAberrationRC = 0;
    openRAWOptions.vignettingAmount = 0;
    openRAWOptions.vignettingMidpoint = 0;

    // Curve 

    // Calibrate
    openRAWOptions.shadowTint = 0;
    openRAWOptions.redHue = 0;
    openRAWOptions.redSaturation = 0;
    openRAWOptions.greenHue = 0;
    openRAWOptions.greenSaturation = 0;
    openRAWOptions.blueHue = 0;
    openRAWOptions.blueSaturation = 0;

    var uneditedDocument = open(selectedFile, openRAWOptions, false);
    var uneditedDocumentName = selectedDocument.name.replace(/(?:\.[^.]*$|$)/, '') + documentSuffix;
    var uneditedLayer = uneditedDocument.activeLayer;
    uneditedLayer.name = uneditedDocumentName;

}
