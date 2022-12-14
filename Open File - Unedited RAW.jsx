#target photoshop

openUneditedRAW(activeDocument, "_unedited");

function openUneditedRAW(selectedDocument, documentSuffix) {

    selectedFile = new File(selectedDocument.fullName);

    var openRAWOptions = new CameraRAWOpenOptions;

    openRAWOptions.settings = CameraRAWSettingsType.CAMERA;

    var uneditedDocument = open(selectedFile, openRAWOptions, true);

    var uneditedDocumentName = selectedDocument.name.replace(/(?:\.[^.]*$|$)/, '') + documentSuffix;

    var uneditedLayer = uneditedDocument.activeLayer;

    uneditedLayer.name = uneditedDocumentName;

}
