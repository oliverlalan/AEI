#target photoshop

// var theGradient = addGradient("Rdl ", 0, [0,0], [[0, 0.5, "000000", 1], [0.35, 0.5, "000000", 0]]); // [[relativeLocation, midpoint, hexColor, opacity]]
var theGradient = addGradient("Lnr ", 0, [1/2,1/2], [[0, 0.75, "000000", 0.35], [0.4, 0.75, "000000", 0]]);

function addGradient(gradientType, gradientAngle, position, gradient) {

    var docWidth = activeDocument.width;
    var docHeight = activeDocument.height;

    var horizontalOffset = (position[0] - 0.5) * 100;
    var verticalOffset = (position[1] - 0.5) * 100;
    // var horizontalOffset = (position[0] - 0.5 * docWidth) / docWidth * 100;
    // var verticalOffset = (position[1] - 0.5 * docHeight) / docHeight * 100;
    // var gradientLength = Math.max(docHeight, docWidth);

    // =======================================================


        var desc10 = new ActionDescriptor();
            var ref1 = new ActionReference();
            ref1.putClass( idcontentLayer = stringIDToTypeID( "contentLayer" ) );
        desc10.putReference( charIDToTypeID( "null" ), ref1 );
            var layerTypeDesc = new ActionDescriptor();
                var gradientFillDesc = new ActionDescriptor();
                gradientFillDesc.putBoolean( charIDToTypeID( "Dthr" ), true );
                gradientFillDesc.putUnitDouble( charIDToTypeID( "Angl" ), charIDToTypeID( "#Ang" ), gradientAngle );
                gradientFillDesc.putEnumerated( charIDToTypeID( "Type" ), charIDToTypeID( "GrdT" ), charIDToTypeID( gradientType ) ); // Rdl or Lnr
                gradientFillDesc.putBoolean( charIDToTypeID( "Rvrs" ), false );
                gradientFillDesc.putBoolean( charIDToTypeID( "Algn" ), true );
                gradientFillDesc.putUnitDouble( charIDToTypeID( "Scl " ), charIDToTypeID( "#Prc" ), 100.000000 );
                    var offsetDesc = new ActionDescriptor();
                    offsetDesc.putUnitDouble( charIDToTypeID( "Hrzn" ), charIDToTypeID( "#Prc" ), horizontalOffset );
                    offsetDesc.putUnitDouble( charIDToTypeID( "Vrtc" ), charIDToTypeID( "#Prc" ), verticalOffset );
                gradientFillDesc.putObject( charIDToTypeID( "Ofst" ), charIDToTypeID( "Pnt " ), offsetDesc );
                    var gradientStopsDesc = new ActionDescriptor();
                    gradientStopsDesc.putString( charIDToTypeID( "Nm  " ), "Custom" );
                        var stopListDesc = new ActionList();
                        // insert color stops;
                        for (var m = 0; m < gradient.length; m++) {
                            // Color stop
                            var hexColor = new SolidColor;
                            hexColor.rgb.hexValue = gradient[m][2];
                            var colorStopDesc = new ActionDescriptor();
                            colorStopDesc.putDouble( charIDToTypeID( "Rd  " ), hexColor.rgb.red );
                            colorStopDesc.putDouble( charIDToTypeID( "Grn " ), hexColor.rgb.green );
                            colorStopDesc.putDouble( charIDToTypeID( "Bl  " ), hexColor.rgb.blue );

                            var stopDesc = new ActionDescriptor();
                            stopDesc.putObject( charIDToTypeID( "Clr " ), charIDToTypeID( "RGBC" ), colorStopDesc );
                            stopDesc.putEnumerated( charIDToTypeID( "Type" ), charIDToTypeID( "Clry" ), charIDToTypeID( "UsrS" ) );
                            // Stop relative position
                            stopDesc.putInteger( charIDToTypeID( "Lctn" ), gradient[m][0] * 4096 );
                            // Midpoint position
                            stopDesc.putInteger( charIDToTypeID( "Mdpn" ), gradient[m][1] * 100);
                            stopListDesc.putObject( charIDToTypeID( "Clrt" ), stopDesc );
                        };
                    gradientStopsDesc.putList( charIDToTypeID( "Clrs" ), stopListDesc );
                        var stopListDesc = new ActionList();
                        // insert opacity stops;
                        for (var m = 0; m < gradient.length; m++) {
                            var stopDesc = new ActionDescriptor();
                            stopDesc.putUnitDouble( charIDToTypeID( "Opct" ), charIDToTypeID( "#Prc" ), gradient[m][3] * 100);
                            stopDesc.putInteger( charIDToTypeID( "Lctn" ), gradient[m][0] * 4096 );
                            stopDesc.putInteger( charIDToTypeID( "Mdpn" ), gradient[m][1] * 100);
                            stopListDesc.putObject( charIDToTypeID( "TrnS" ), stopDesc );
                        };
                    gradientStopsDesc.putList( charIDToTypeID( "Trns" ), stopListDesc );
                gradientFillDesc.putObject( charIDToTypeID( "Grad" ), charIDToTypeID( "Grdn" ), gradientStopsDesc );
            layerTypeDesc.putObject( charIDToTypeID( "Type" ), stringIDToTypeID( "gradientLayer" ), gradientFillDesc );
        desc10.putObject( charIDToTypeID( "Usng" ),  stringIDToTypeID( "contentLayer" ), layerTypeDesc );
    executeAction( charIDToTypeID( "Mk  " ), desc10, DialogModes.NO );
    return activeDocument.activeLayer
};