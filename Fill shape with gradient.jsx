#target photoshop

// Define the gradient stops with hex colors and opacities
var gradientStops = [
    { color: "ff00ff", opacity: 100 , midPoint: 25},
    { color: "00ff00", opacity: 50 , midPoint: 25},
    { color: "0000ff", opacity: 25 , midPoint: 25}
];

// drawShape([0,0], [250,0], [250,250], [0,250])

// fillShapeLayerWithGradientFromHex("000000", "FFFFFF")


fillShapeWithGradient("Lnr ", gradientStops, -45);

function fillShapeWithGradient(gradientType, gradientStops, gradientAngle, gradientOffset) {
    var shapeStyleDesc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( stringIDToTypeID( "contentLayer" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
    shapeStyleDesc.putReference( charIDToTypeID( "null" ), ref );
        var gradientLayerDesc = new ActionDescriptor();
            var gradientDesc = new ActionDescriptor();
            gradientDesc.putBoolean( charIDToTypeID( "Dthr" ), false );
            gradientDesc.putBoolean( charIDToTypeID( "Rvrs" ), false );
            gradientDesc.putUnitDouble( charIDToTypeID( "Angl" ), charIDToTypeID( "#Ang" ), gradientAngle );
            gradientDesc.putEnumerated( charIDToTypeID( "Type" ), charIDToTypeID( "GrdT" ), charIDToTypeID( gradientType ) );
            gradientDesc.putUnitDouble( charIDToTypeID( "Scl " ), charIDToTypeID( "#Prc" ), 100.000000 );

            // Create the gradient descriptor
            var gradientStopsDesc = new ActionDescriptor();

                // Add the gradient stops to the gradient descriptor
                var stopListDesc = new ActionList();
                for (var i = 0; i < gradientStops.length; i++) {
                    // Color stop
                    var color = new SolidColor();
                    color.rgb.hexValue = gradientStops[i].color;
                    var colorStopDesc = new ActionDescriptor();
                    colorStopDesc.putDouble( charIDToTypeID( "Rd  " ), color.rgb.red );
                    colorStopDesc.putDouble( charIDToTypeID( "Grn " ), color.rgb.green );
                    colorStopDesc.putDouble( charIDToTypeID( "Bl  " ), color.rgb.blue );

                    var stopDesc = new ActionDescriptor();
                    stopDesc.putObject(charIDToTypeID("Clr "), charIDToTypeID("RGBC"), colorStopDesc);
                    stopDesc.putEnumerated( charIDToTypeID( "Type" ), charIDToTypeID( "Clry" ), charIDToTypeID( "UsrS" ) );
                    stopDesc.putDouble(charIDToTypeID("Lctn"), 4096 * i / (gradientStops.length - 1));
                    stopDesc.putDouble(charIDToTypeID("Mdpn"), gradientStops[i].midPoint);
                    stopListDesc.putObject(charIDToTypeID("Clrt"), stopDesc);
                }

            gradientStopsDesc.putList( charIDToTypeID( "Clrs" ), stopListDesc );

                // insert opacity stops;
                var stopListDesc = new ActionList();
                for (var i = 0; i < gradientStops.length; i++) {
                    // Opacity stop
                    var desc366 = new ActionDescriptor();
                    desc366.putUnitDouble( charIDToTypeID( "Opct" ), charIDToTypeID( "#Prc" ), gradientStops[i].opacity );
                    desc366.putInteger( charIDToTypeID( "Lctn" ), 0 );
                    desc366.putInteger( charIDToTypeID( "Mdpn" ), 50 );


                    var stopDesc = new ActionDescriptor();
                    stopDesc.putUnitDouble( charIDToTypeID( "Opct" ), charIDToTypeID( "#Prc" ), gradientStops[i].opacity);
                    stopDesc.putInteger( charIDToTypeID( "Lctn" ), 4096 * i / (gradientStops.length - 1));
                    stopDesc.putInteger( charIDToTypeID( "Mdpn" ), gradientStops[i].midPoint);
                    stopListDesc.putObject( charIDToTypeID( "TrnS" ), stopDesc );
                };

            gradientStopsDesc.putList( charIDToTypeID( "Trns" ), stopListDesc );

            gradientDesc.putObject( charIDToTypeID( "Grad" ), charIDToTypeID( "Grdn" ), gradientStopsDesc );
                
        gradientLayerDesc.putObject( charIDToTypeID( "FlCn" ), stringIDToTypeID( "gradientLayer" ), gradientDesc );
        
    shapeStyleDesc.putObject( charIDToTypeID( "T   " ), stringIDToTypeID( "shapeStyle" ), gradientLayerDesc );
executeAction( charIDToTypeID( "setd" ), shapeStyleDesc, DialogModes.NO );

}

// function fillShapeWithGradient(gradientStops) {

//     var styleDesc = new ActionDescriptor();
//     var r = new ActionReference();
//     r.putEnumerated(stringIDToTypeID('contentLayer'), stringIDToTypeID('ordinal'), stringIDToTypeID('targetEnum'));
//     styleDesc.putReference(stringIDToTypeID('null'), r);

//     // Create the gradient fill descriptor
//     var gradientFillDesc = new ActionDescriptor();
//     gradientFillDesc.putUnitDouble(charIDToTypeID("Angl"), charIDToTypeID( "#Ang" ), -45);
//     gradientFillDesc.putEnumerated( charIDToTypeID( "Type" ), charIDToTypeID( "GrdT" ), charIDToTypeID( "Lnr " ) );
//     gradientFillDesc.putBoolean( charIDToTypeID( "Rvrs" ), false );
//     gradientFillDesc.putBoolean( charIDToTypeID( "Algn" ), true );
//     gradientFillDesc.putUnitDouble( charIDToTypeID( "Scl " ), charIDToTypeID( "#Prc" ), 100.000000 );

//         // Create the gradient descriptor
//         var gradientStopsDesc = new ActionDescriptor();

//         // Add the gradient stops to the gradient descriptor
//         var stopListDesc = new ActionList();
//         for (var i = 0; i < gradientStops.length; i++) {
//             // Color stop
//             var color = new SolidColor();
//             color.rgb.hexValue = gradientStops[i].color;
//             var colorStopDesc = new ActionDescriptor();
//             colorStopDesc.putDouble( charIDToTypeID( "Rd  " ), color.rgb.red );
//             colorStopDesc.putDouble( charIDToTypeID( "Grn " ), color.rgb.green );
//             colorStopDesc.putDouble( charIDToTypeID( "Bl  " ), color.rgb.blue );

//             var stopDesc = new ActionDescriptor();
//             stopDesc.putObject(charIDToTypeID("Clr "), charIDToTypeID("RGBC"), colorStopDesc);
//             stopDesc.putEnumerated( charIDToTypeID( "Type" ), charIDToTypeID( "Clry" ), charIDToTypeID( "UsrS" ) );
//             stopDesc.putDouble(charIDToTypeID("Lctn"), 4096 * i / (gradientStops.length - 1));
//             stopDesc.putDouble(charIDToTypeID("Mdpn"), 50);
//             stopListDesc.putObject(charIDToTypeID("Clrt"), stopDesc);
//         }

//     gradientStopsDesc.putList(charIDToTypeID("Clrs"), stopListDesc);

//     var gradientFillDesc = new ActionDescriptor();
//     gradientFillDesc.putObject(charIDToTypeID("Grad"), charIDToTypeID ("Grdn"), gradientStopsDesc)

//     // Specify the fill type as gradient
//     var gradType = new ActionDescriptor();
//     gradType.putObject(charIDToTypeID("FlCn"), stringIDToTypeID("gradientLayer"), gradientFillDesc)


//     styleDesc.putObject(charIDToTypeID('T   '), stringIDToTypeID('shapeStyle'), gradType);
//     executeAction(charIDToTypeID( "setd" ), styleDesc, DialogModes.NO);


// }

function drawShape() {
    
    var lineArray = [];
    for (i = 0; i < arguments.length; i++) {
        lineArray[i] = new PathPointInfo;
        lineArray[i].kind = PointKind.CORNERPOINT;
        lineArray[i].anchor = arguments[i];
        lineArray[i].leftDirection = lineArray[i].anchor;
        lineArray[i].rightDirection = lineArray[i].anchor;
    }

    var lineSubPathArray = new SubPathInfo();
    lineSubPathArray.closed = true;
    lineSubPathArray.operation = ShapeOperation.SHAPEADD;
    lineSubPathArray.entireSubPath = lineArray;
    var myPathItem = app.activeDocument.pathItems.add("myPath", [lineSubPathArray]);

    var desc88 = new ActionDescriptor();
    var ref60 = new ActionReference();
    ref60.putClass(stringIDToTypeID("contentLayer"));
    desc88.putReference(charIDToTypeID("null"), ref60);
    var desc89 = new ActionDescriptor();
    var desc90 = new ActionDescriptor();
    var desc91 = new ActionDescriptor();
    desc91.putDouble(charIDToTypeID("Rd  "), 0.000000); // R
    desc91.putDouble(charIDToTypeID("Grn "), 0.000000); // G
    desc91.putDouble(charIDToTypeID("Bl  "), 0.000000); // B
    var id481 = charIDToTypeID("RGBC");
    desc90.putObject(charIDToTypeID("Clr "), id481, desc91);
    desc89.putObject(charIDToTypeID("Type"), stringIDToTypeID("solidColorLayer"), desc90);
    desc88.putObject(charIDToTypeID("Usng"), stringIDToTypeID("contentLayer"), desc89);
    executeAction(charIDToTypeID("Mk  "), desc88, DialogModes.NO);
    
    myPathItem.remove();

}


