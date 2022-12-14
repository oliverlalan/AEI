#target photoshop

var presetNamesList = ["SCF01", "SCF02", "SCF03", "SCF04", "SCF05", "SCF06", "SCF07", "SCF08", "SCF09", "SCF10", "SCF11", "SCF12", 
"SMF01", "SMF02", "SMF03", "SMF04", "SMF05"]; // TODO: Create a way of reading the list in the Presets Inventory

addLightroomPresetOverlay();

function addLightroomPresetOverlay () {
    var doc = activeDocument;
    var docPresetKeywords = findPresetNamesInKeywords (doc);

    if(docPresetKeywords.length==1){
        
        var selectedFilePath = getPresetOverlayPath(docPresetKeywords[0]);
        //app.openDialog();
        //var selectedFilePath = "D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Presets Overlays/" + docPresetKeywords[0] + ".png";

        try{
            addFile(selectedFilePath);
        } 

        catch (e)
        {
            alert('Cannot add overlay. File missing?');
        }

    } else {
        alert('None or more than one presetNames in doc.')
    }
}

function getPresetOverlayPath (presetName) {

    var availablePresetOverlaysPaths = Folder("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Assets/Presets Overlays/").getFiles("*.png");

    for (i=0; i < availablePresetOverlaysPaths.length; i++) {
        var presetOverlayFileName = availablePresetOverlaysPaths[i].displayName.match(/(.*)\.[^\.]+$/)[1];
        var presetOverlayFileName = presetOverlayFileName.substr(presetOverlayFileName.lastIndexOf('-')+2, presetOverlayFileName.length);
        if(presetOverlayFileName == presetName) {
            return availablePresetOverlaysPaths[i];
        }
    }

}

function findPresetNamesInKeywords (docRef) {

    var doc = activeDocument;
    var docKeywords = doc.info.keywords;
    var docPresetKeywords = [];

    for (var i=0; i<docKeywords.length; i++) {
        for (var j=0; j<presetNamesList.length; j++){
            if(docKeywords[i] == presetNamesList[j]) {
                docPresetKeywords.push(docKeywords[i]);
            }
        }
    }

    return docPresetKeywords;

}

function addFile (selectedFile) {

    var idPlc = charIDToTypeID( "Plc " ); 
    var desc11 = new ActionDescriptor();  
    var idnull = charIDToTypeID( "null" );

    desc11.putPath( idnull, new File(selectedFile) );
    var idFTcs = charIDToTypeID( "FTcs" ); 
    var idQCSt = charIDToTypeID( "QCSt" );   
    var idQcsa = charIDToTypeID( "Qcsa" ); 
    desc11.putEnumerated( idFTcs, idQCSt, idQcsa );
    var idOfst = charIDToTypeID( "Ofst" );     
    var desc12 = new ActionDescriptor();     
    var idHrzn = charIDToTypeID( "Hrzn" );    
    var idPxl = charIDToTypeID( "#Pxl" );      
    desc12.putUnitDouble( idHrzn, idPxl, 0.000000 );     
    var idVrtc = charIDToTypeID( "Vrtc" );    
    var idPxl = charIDToTypeID( "#Pxl" );    
    desc12.putUnitDouble( idVrtc, idPxl, 0.000000 );
    var idOfst = charIDToTypeID( "Ofst" );
    desc11.putObject( idOfst, idOfst, desc12 );
    executeAction( idPlc, desc11, DialogModes.NO );

}
