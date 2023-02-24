#target photoshop

exportCopyAsPNG(activeDocument);

function exportCopyAsPNG(selectedDocument, filePath, fileName) {
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

function convertColorProfileToSRGB (selectedDocument) {

    selectedDocument.convertProfile("sRGB IEC61966-2.1", Intent.RELATIVECOLORIMETRIC, true, false);

}