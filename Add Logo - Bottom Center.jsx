
#target photoshop

addLogo();

function addLogo () {

    addFile("D:/OneDrive/Arturo - Personal/\xD3liver Lalan/Instagram Photos/Design/Template - Logo - TopRight.png");

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