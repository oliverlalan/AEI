#target photoshop

var theGradient = gradientLayer([[0,"000000", 100], [1000,"ec0000", 50], [2000,"000000", 0]]);

function gradientLayer(theArray) {

    var idMk = charIDToTypeID( "Mk  " );

    var idsetd = charIDToTypeID( "setd" );
        var desc120 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref29 = new ActionReference();
            var idLyr = charIDToTypeID( "Lyr " );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idTrgt = charIDToTypeID( "Trgt" );
            ref29.putEnumerated( idLyr, idOrdn, idTrgt );
        desc120.putReference( idnull, ref29 );
        var idT = charIDToTypeID( "T   " );
            var desc121 = new ActionDescriptor();
            var idfillOpacity = stringIDToTypeID( "fillOpacity" );
            var idPrc = charIDToTypeID( "#Prc" );
            desc121.putUnitDouble( idfillOpacity, idPrc, 0.000000 );
            var idLefx = charIDToTypeID( "Lefx" );
                var desc122 = new ActionDescriptor();
                var idScl = charIDToTypeID( "Scl " );
                var idPrc = charIDToTypeID( "#Prc" );
                desc122.putUnitDouble( idScl, idPrc, 100.000000 );
                var idGrFl = charIDToTypeID( "GrFl" );
                    var desc123 = new ActionDescriptor();
                    var idenab = charIDToTypeID( "enab" );
                    desc123.putBoolean( idenab, true );
                    var idMd = charIDToTypeID( "Md  " );
                    var idBlnM = charIDToTypeID( "BlnM" );
                    var idNrml = charIDToTypeID( "Nrml" );
                    desc123.putEnumerated( idMd, idBlnM, idNrml );
                    var idOpct = charIDToTypeID( "Opct" );
                    var idPrc = charIDToTypeID( "#Prc" );
                    desc123.putUnitDouble( idOpct, idPrc, 100.000000 );

                    //Gradient Definition
                    var idGrad = charIDToTypeID( "Grad" );
                            var desc34 = new ActionDescriptor();
                            var idNm = charIDToTypeID( "Nm  " );
                            desc34.putString( idNm, "Custom" );
                            var idGrdF = charIDToTypeID( "GrdF" );
                            var idGrdF = charIDToTypeID( "GrdF" );
                            var idCstS = charIDToTypeID( "CstS" );
                            desc34.putEnumerated( idGrdF, idGrdF, idCstS );
                            var idIntr = charIDToTypeID( "Intr" );
                            desc34.putDouble( idIntr, 4096.000000 );

                                var list1 = new ActionList();

                                // insert color stops;
                                for (var m = 0; m < theArray.length; m++) {
                                    
                                    var hexColor = new SolidColor;
                                    hexColor.rgb.hexValue = theArray[m][1];

                                    var desc14 = new ActionDescriptor();
                                    var desc15 = new ActionDescriptor();

                                    // Color
                                    var idClr = charIDToTypeID( "Clr " );
                                    var idRd = charIDToTypeID( "Rd  " );
                                    var idGrn = charIDToTypeID( "Grn " );
                                    var idBl = charIDToTypeID( "Bl  " );
                                    var idRGBC = charIDToTypeID( "RGBC" );
                                    desc15.putDouble( idRd, hexColor.rgb.red );
                                    desc15.putDouble( idGrn, hexColor.rgb.green );
                                    desc15.putDouble( idBl, hexColor.rgb.blue );
                                    desc14.putObject( idClr, idRGBC, desc15 );

                                    // Opacity
                                    // var idOpct = charIDToTypeID( "Opct" );
                                    // var idPrc = charIDToTypeID( "#Prc" );
                                    // desc14.putUnitDouble( idOpct, idPrc, theArray[m][2] );

                                    var idClry = charIDToTypeID( "Clry" );
                                    var idUsrS = charIDToTypeID( "UsrS" );
                                    desc14.putEnumerated( idType, idClry, idUsrS );

                                    // Stop relative position
                                    var idLctn = charIDToTypeID( "Lctn" );
                                    desc14.putInteger( idLctn, theArray[m][0] );

                                    // Midpoint position
                                    var idMdpn = charIDToTypeID( "Mdpn" );
                                    desc14.putInteger( idMdpn, 50 );

                                    var idClrt = charIDToTypeID( "Clrt" );
                                    list1.putObject( idClrt, desc14 );

                                };
                            
                            desc34.putList( charIDToTypeID( "Clrs" ), list1 );

                            // var idClrs = charIDToTypeID( "Clrs" );
                            //     var list5 = new ActionList();
                            //         var desc35 = new ActionDescriptor();
                            //         var idType = charIDToTypeID( "Type" );
                            //         var idClry = charIDToTypeID( "Clry" );
                            //         var idFrgC = charIDToTypeID( "FrgC" );
                            //         desc35.putEnumerated( idType, idClry, idFrgC );
                            //         var idLctn = charIDToTypeID( "Lctn" );
                            //         desc35.putInteger( idLctn, 0 );
                            //         var idMdpn = charIDToTypeID( "Mdpn" );
                            //         desc35.putInteger( idMdpn, 50 );
                            //     var idClrt = charIDToTypeID( "Clrt" );
                            //     list5.putObject( idClrt, desc35 );
                            //         var desc38 = new ActionDescriptor();
                            //         var idType = charIDToTypeID( "Type" );
                            //         var idClry = charIDToTypeID( "Clry" );
                            //         var idFrgC = charIDToTypeID( "FrgC" );
                            //         desc38.putEnumerated( idType, idClry, idFrgC );
                            //         var idLctn = charIDToTypeID( "Lctn" );
                            //         desc38.putInteger( idLctn, 4096 );
                            //         var idMdpn = charIDToTypeID( "Mdpn" );
                            //         desc38.putInteger( idMdpn, 50 );
                            //     var idClrt = charIDToTypeID( "Clrt" );
                            //     list5.putObject( idClrt, desc38 );
                            // desc34.putList( idClrs, list5 );

                            // Gradient Stops
                            var idTrns = charIDToTypeID( "Trns" );
                                var list6 = new ActionList();

                                    // insert color stops;
                                    for (var m = 0; m < theArray.length; m++) {
                                        
                                        var hexColor = new SolidColor;
                                        hexColor.rgb.hexValue = theArray[m][1];

                                        var desc39 = new ActionDescriptor();
                                        var desc49 = new ActionDescriptor();

                                        // Color
                                        var idClr = charIDToTypeID( "Clr " );
                                        var idRd = charIDToTypeID( "Rd  " );
                                        var idGrn = charIDToTypeID( "Grn " );
                                        var idBl = charIDToTypeID( "Bl  " );
                                        var idRGBC = charIDToTypeID( "RGBC" );
                                        desc49.putDouble( idRd, hexColor.rgb.red );
                                        desc49.putDouble( idGrn, hexColor.rgb.green );
                                        desc49.putDouble( idBl, hexColor.rgb.blue );
                                        desc39.putObject( idClr, idRGBC, desc49 );

                                        // Opacity
                                        var idOpct = charIDToTypeID( "Opct" );
                                        var idPrc = charIDToTypeID( "#Prc" );
                                        desc39.putUnitDouble( idOpct, idPrc, theArray[m][2] );

                                        // Stop relative position
                                        var idLctn = charIDToTypeID( "Lctn" );
                                        desc39.putInteger( idLctn, theArray[m][0] );

                                        // Midpoint position
                                        var idMdpn = charIDToTypeID( "Mdpn" );
                                        desc39.putInteger( idMdpn, 50 );

                                        var idTrnS = charIDToTypeID( "TrnS" );
                                        list6.putObject( idTrnS, desc39 );

                                    };


                            desc34.putList( idTrns, list6 );
                    var idGrdn = charIDToTypeID( "Grdn" );
                    desc123.putObject( idGrad, idGrdn, desc34 );
                    var idAngl = charIDToTypeID( "Angl" );
                    var idAng = charIDToTypeID( "#Ang" );
                    desc123.putUnitDouble( idAngl, idAng, 90.000000 );
                    var idType = charIDToTypeID( "Type" );
                    var idGrdT = charIDToTypeID( "GrdT" );
                    var idLnr = charIDToTypeID( "Rdl " );
                    desc123.putEnumerated( idType, idGrdT, idLnr );
                    var idRvrs = charIDToTypeID( "Rvrs" );
                    desc123.putBoolean( idRvrs, false );
                    var idAlgn = charIDToTypeID( "Algn" );
                    desc123.putBoolean( idAlgn, true );
                    var idScl = charIDToTypeID( "Scl " );
                    var idPrc = charIDToTypeID( "#Prc" );
                    desc123.putUnitDouble( idScl, idPrc, 100.000000 );
                    var idOfst = charIDToTypeID( "Ofst" );
                        var desc494 = new ActionDescriptor();
                        var idHrzn = charIDToTypeID( "Hrzn" );
                        var idPrc = charIDToTypeID( "#Prc" );
                        desc494.putUnitDouble( idHrzn, idPrc, 0.000000 );
                        var idVrtc = charIDToTypeID( "Vrtc" );
                        var idPrc = charIDToTypeID( "#Prc" );
                        desc494.putUnitDouble( idVrtc, idPrc, 0.000000 );
                    var idPnt = charIDToTypeID( "Pnt " );
                    desc123.putObject( idOfst, idPnt, desc494 );
                var idGrFl = charIDToTypeID( "GrFl" );
                desc122.putObject( idGrFl, idGrFl, desc123 );
            var idLefx = charIDToTypeID( "Lefx" );
            desc121.putObject( idLefx, idLefx, desc122 );
        var idLyr = charIDToTypeID( "Lyr " );
        desc120.putObject( idT, idLyr, desc121 );
    executeAction( idsetd, desc120, DialogModes.NO );

}
