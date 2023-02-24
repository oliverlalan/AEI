#target photoshop

setShapeSettings(false, "8C8C8C", true, "FFFFFF", 20)

function setShapeSettings (fillEnabled, shapeFillColor, strokeEnabled, shapeStrokeColor, shapeStrokeWidth) {

    if(fillEnabled == undefined) {fillEnabled = false};
    if(shapeFillColor == undefined) {shapeFillColor = "8C8C8C"};
    if(strokeEnabled == undefined) {strokeEnabled = false};
    if(shapeStrokeColor == undefined) {shapeStrokeColor = "FFFFFF"};
    if(shapeStrokeWidth == undefined)  {shapeStrokeWidth = 1};

    try {

        var f = new SolidColor();
        f.rgb.hexValue = shapeFillColor;
        var s = new SolidColor();
        s.rgb.hexValue = shapeStrokeColor;

        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( stringIDToTypeID( "contentLayer" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
            desc.putReference( charIDToTypeID( "null" ), ref );
                var shapeStyleDesc = new ActionDescriptor();
                    var fillColorDesc = new ActionDescriptor();
                        var fillColorValuesDesc = new ActionDescriptor();
                        fillColorValuesDesc.putDouble(stringIDToTypeID('red'),   f.rgb.red);
                        fillColorValuesDesc.putDouble(stringIDToTypeID('green'), f.rgb.green);
                        fillColorValuesDesc.putDouble(stringIDToTypeID('blue'),  f.rgb.blue);
                    fillColorDesc.putObject( charIDToTypeID( "Clr " ), charIDToTypeID( "RGBC" ), fillColorValuesDesc );
                shapeStyleDesc.putObject( charIDToTypeID( "FlCn" ), stringIDToTypeID( "solidColorLayer" ), fillColorDesc );
                    var strokeStyleDesc = new ActionDescriptor();
                        var strokeColorDesc = new ActionDescriptor();
                            var strokeColorValuesDesc = new ActionDescriptor();
                            strokeColorValuesDesc.putDouble(stringIDToTypeID('red'),   s.rgb.red);
                            strokeColorValuesDesc.putDouble(stringIDToTypeID('green'), s.rgb.green);
                            strokeColorValuesDesc.putDouble(stringIDToTypeID('blue'),  s.rgb.blue);
                        strokeColorDesc.putObject( charIDToTypeID( "Clr " ), charIDToTypeID( "RGBC" ), strokeColorValuesDesc );
                    strokeStyleDesc.putObject( stringIDToTypeID( "strokeStyleContent" ), stringIDToTypeID( "solidColorLayer" ), strokeColorDesc );
                    strokeStyleDesc.putInteger( stringIDToTypeID( "strokeStyleVersion" ), 2 );
                    strokeStyleDesc.putBoolean( stringIDToTypeID( "strokeEnabled" ), strokeEnabled );
                    strokeStyleDesc.putUnitDouble( stringIDToTypeID( "strokeStyleLineWidth" ), charIDToTypeID( "#Pxl" ), shapeStrokeWidth );
                    strokeStyleDesc.putBoolean( stringIDToTypeID( "fillEnabled" ), fillEnabled );
                shapeStyleDesc.putObject( stringIDToTypeID( "strokeStyle" ), stringIDToTypeID( "strokeStyle" ), strokeStyleDesc );
            desc.putObject( charIDToTypeID( "T   " ), stringIDToTypeID( "shapeStyle" ), shapeStyleDesc );
        executeAction( charIDToTypeID( "setd" ), desc, DialogModes.NO );

    }   catch (e) { throw(e); }

}
