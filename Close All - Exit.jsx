#target photoshop

while(app.documents.length){
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

var idquit = charIDToTypeID("quit");
executeAction(idquit, undefined, DialogModes.ALL);