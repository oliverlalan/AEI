#target photoshop

function resizeLongEdgeAndExport(longEdgeLength, processName) {

    var doc = activeDocument;
    
    var fileName = doc.fullName.toString();
    if(fileName.lastIndexOf(".") >= 0) { fileName = fileName.substr(0, fileName.lastIndexOf("."));}
    if (processName == "") {
        fileName += " " + longEdgeLenght + "p.jpg";
    } else {
        fileName += " " + longEdgeLenght + "p + " + processName +".jpg";
    }

    var docHeight = doc.height.value;
    var docWidth = doc.width.value;
    var docAspectRatio = docWidth / docHeight;

    if (docWidth > docHeight) {
        var docNewWidth = longEdgeLength;
        var docNewHeight = longEdgeLength / docAspectRatio;
        doc.resizeImage(docNewWidth, docNewHeight, 300, ResampleMethod.AUTOMATIC);
    } else {
        var docNewWidth = longEdgeLength / docAspectRatio;
        var docNewHeight = longEdgeLength;
        doc.resizeImage(docNewWidth, docNewHeight, 300, ResampleMethod.AUTOMATIC);
    }

    var saveOptions = new ExportOptionsSaveForWeb;
    saveOptions.format = SaveDocumentType.JPEG;
    saveOptions.quality = 90;

    doc.exportDocument(new File(fileName), ExportType.SAVEFORWEB, saveOptions);
    doc.activeHistoryState = app.activeDocument.historyStates[0];


}

resizeLongEdgeAndExport(1080, "");

//doc.close(SaveOptions.DONOTSAVECHANGES);
//var idquit = charIDToTypeID("quit");
//executeAction(idquit, undefined, DialogModes.ALL);

