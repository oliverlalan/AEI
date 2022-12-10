#target photoshop

function exportAsPNG() {

    var doc = activeDocument;

    var fileName = doc.name;

    var destinationFolder = Folder.selectDialog("Select destination folder")

    var saveIn = File(destinationFolder + "//" + fileName.substr(0, fileName.lastIndexOf(".")) + ".png");

    var saveOptions = new ExportOptionsSaveForWeb;
    saveOptions.format = SaveDocumentType.PNG;
    saveOptions.transparency = false;
    saveOptions.quality = 90;

    doc.exportDocument(saveIn, ExportType.SAVEFORWEB, saveOptions);

}

exportAsPNG();