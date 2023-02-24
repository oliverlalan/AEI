#target photoshop

function duplicateDocument (selectedDocument, documentSuffix) {

    var doc = selectedDocument;
    var fullFileName = doc.name;
    var fileName = fullFileName.substr(0, fullFileName.lastIndexOf("."));
    var fileExtension = fullFileName.substr(fullFileName.lastIndexOf("."), fullFileName.length);
    
    if(documentSuffix) {
        fileName = fileName + documentSuffix + fileExtension;
    }
    
    doc.duplicate(fileName);

    activeDocument.activeLayer.isBackgroundLayer = false;

}

duplicateDocument();