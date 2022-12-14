#target photoshop

function duplicateDocument () {

    var doc = activeDocument;
    var fullFileName = doc.name;
    var fileName = fullFileName.substr(0, fullFileName.lastIndexOf("."));
    var fileExtension = fullFileName.substr(fullFileName.lastIndexOf("."), fullFileName.length);

    var documentSuffix = "settings";
    
    if(documentSuffix) {
        fileName = fileName + "_" + documentSuffix + fileExtension;
    }
    
    doc.duplicate(fileName);

    activeDocument.activeLayer.isBackgroundLayer = false;

}

duplicateDocument();