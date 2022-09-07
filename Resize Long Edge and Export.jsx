#target photoshop

function resizeLongEdgeAndExport(longEdgeLength, processName) {

    // Save current preferences
    var startRulerUnits = app.preferences.rulerUnits;
    var startTypeUnits = app.preferences.typeUnits;
    var startTypeDialogs = app.displayDialogs;

    // Set own preferences
    app.preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeUnits = TypeUnits.PIXELS;
    app.displayDialogs = DialogModes.ERROR;

    var doc = activeDocument;
    
    var fileName = doc.fullName.toString();
    if(fileName.lastIndexOf(".") >= 0) { fileName = fileName.substr(0, fileName.lastIndexOf("."));}
    fileName += "_lp+" + processName +".jpg".replace("l", longEdgeLength);

    var docHeight = doc.height.value;
    var docWidth = doc.width.value;
    var docAspectRatio = docWidth / docHeight;

    if (docWidth > docHeight) {
        var docNewWidth = longEdgeLength;
        var docNewHeight = longEdgeLength / docAspectRatio;
        doc.resizeImage(docNewWidth, docNewHeight, 300, ResampleMethod.AUTOMATIC);
    } else {
        var docNewWidth = longEdgeLength * docAspectRatio;
        var docNewHeight = longEdgeLength;
        doc.resizeImage(docNewWidth, docNewHeight, 300, ResampleMethod.AUTOMATIC);
    }

    var saveOptions = new ExportOptionsSaveForWeb;
    saveOptions.format = SaveDocumentType.JPEG;
    saveOptions.quality = 90;

    doc.exportDocument(new File(fileName), ExportType.SAVEFORWEB, saveOptions);

    doc.activeHistoryState = app.activeDocument.historyStates[0];

    //doc.close(SaveOptions.DONOTSAVECHANGES);

    // Reset application preferences
    app.preferences.rulerUnits = startRulerUnits;
    app.preferences.typeUnits = startTypeUnits;
    app.displayDialogs = startTypeDialogs;
}

resizeLongEdgeAndExport(1080, "Metadata");