#target photoshop

exportUneditedCopyAsPNG(activeDocument);

function exportUneditedCopyAsPNG(selectedDocument) {

    selectedFile = new File(selectedDocument.fullName);

    openRAWWithoutEdits(selectedFile);

    var selectedDocumentUnedited = app.activeDocument;

    var layer = selectedDocumentUnedited.activeLayer;

    var selectedDocumentUneditedName = selectedDocument.name.replace(/(?:\.[^.]*$|$)/, '') + "_unedited";

    exportAsPNG(selectedDocumentUnedited, selectedDocument.path, selectedDocumentUneditedName);

    // close imported document
    selectedDocumentUnedited.close(SaveOptions.DONOTSAVECHANGES);

}

function openRAWWithoutEdits(selectedFile) {

    var openRAWOptions = new CameraRAWOpenOptions;

    openRAWOptions.settings = CameraRAWSettingsType.CAMERA;

    var doc = open(selectedFile, openRAWOptions, true);

}

function convertColorProfileToSRGB (selectedDocument) {

    selectedDocument.convertProfile("sRGB IEC61966-2.1", Intent.RELATIVECOLORIMETRIC, true, false);

}

function exportAsPNG(selectedDocument, filePath, fileName) {
    if (filePath === undefined) {
       filePath = selectedDocument.path;
    }
    if (fileName === undefined) {
        fileName = selectedDocument.name.replace(/(?:\.[^.]*$|$)/, '');
    }

    convertColorProfileToSRGB(selectedDocumentUnedited);

    var saveIn = File(filePath + "/" + fileName + ".png");

    var saveOptions = new ExportOptionsSaveForWeb;
    saveOptions.format = SaveDocumentType.PNG;
    saveOptions.PNG8 = true;
    saveOptions.transparency = true;
    saveOptions.interlaced = false;
    saveOptions.includeProfile = true;

    selectedDocument.exportDocument(saveIn, ExportType.SAVEFORWEB, saveOptions);

}