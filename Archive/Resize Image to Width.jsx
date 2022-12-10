#target photoshop

function resizeImageToWidth() {

    // Save current preferences
    var startRulerUnits = app.preferences.rulerUnits;
    var startTypeUnits = app.preferences.typeUnits;
    var startTypeDialogs = app.displayDialogs;

    // Set own preferences
    app.preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeUnits = TypeUnits.PIXELS;
    app.displayDialogs = DialogModes.ERROR;

    var doc = activeDocument;

    var docHeight = doc.height.value;
    var docWidth = doc.width.value;
    var docAspectRatio = docWidth / docHeight;

    var targetWidth = parseInt(prompt("Enter target width", 1080));

    var targetHeight = targetWidth / docAspectRatio;

    doc.resizeImage(targetWidth, targetHeight, 72, ResampleMethod.AUTOMATIC);

    // Reset application preferences
    app.preferences.rulerUnits = startRulerUnits;
    app.preferences.typeUnits = startTypeUnits;
    app.displayDialogs = startTypeDialogs;
}

resizeImageToWidth();