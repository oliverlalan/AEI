#target photoshop

while(app.documents.length){
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}
