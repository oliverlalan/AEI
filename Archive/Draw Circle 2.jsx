function drawCircle(xPosition, yPosition, circleRadius, fillEnabled, fill_hex, strokeEnabled, stroke_hex, strokeWidth) {

    var c = new SolidColor();
    
    c.rgb.hexValue = fill_hex;

    var d = new ActionDescriptor();

    var r = new ActionReference();
    
    r.putClass(stringIDToTypeID("contentLayer"));
    
    d.putReference(charIDToTypeID('null'), r);
    
    var d1 = new ActionDescriptor();
    
    var d2 = new ActionDescriptor();
    
    var d3 = new ActionDescriptor();
    
    d3.putDouble(charIDToTypeID('Rd  '), c.rgb.red);
    
    d3.putDouble(charIDToTypeID('Grn '), c.rgb.green);
    
    d3.putDouble(charIDToTypeID('Bl  '), c.rgb.blue);
    
    d2.putObject(charIDToTypeID('Clr '), stringIDToTypeID("RGBColor"), d3);
    
    d1.putObject(charIDToTypeID('Type'), stringIDToTypeID("solidColorLayer"), d2);
    
    var d4 = new ActionDescriptor();
    
    d4.putUnitDouble(charIDToTypeID('Top '), charIDToTypeID('#Pxl'), yPosition - circleRadius);
    
    d4.putUnitDouble(charIDToTypeID('Left'), charIDToTypeID('#Pxl'), xPosition - circleRadius);
    
    d4.putUnitDouble(charIDToTypeID('Btom'), charIDToTypeID('#Pxl'), yPosition + circleRadius);
    
    d4.putUnitDouble(charIDToTypeID('Rght'), charIDToTypeID('#Pxl'), xPosition + circleRadius);
    
    d1.putObject(charIDToTypeID('Shp '), charIDToTypeID('Elps'), d4);
    
    d.putObject(charIDToTypeID('Usng'), stringIDToTypeID("contentLayer"), d1);
    
    executeAction(charIDToTypeID('Mk  '), d, DialogModes.NO);

    try {

        var c = new SolidColor();

        c.rgb.hexValue = stroke_hex;

        var d = new ActionDescriptor();

        var r = new ActionReference();

        r.putEnumerated(stringIDToTypeID('contentLayer'), stringIDToTypeID('ordinal'), stringIDToTypeID('targetEnum'));

        d.putReference(stringIDToTypeID('null'), r);

        var d1 = new ActionDescriptor();

        var d2 = new ActionDescriptor();

        var d3 = new ActionDescriptor();

        var d4 = new ActionDescriptor();

        d4.putDouble(stringIDToTypeID('red'),   c.rgb.red);

        d4.putDouble(stringIDToTypeID('green'), c.rgb.green);

        d4.putDouble(stringIDToTypeID('blue'),  c.rgb.blue);

        d3.putObject(stringIDToTypeID('color'), stringIDToTypeID('RGBColor'), d4);

        d2.putObject(stringIDToTypeID('strokeStyleContent'), stringIDToTypeID('solidColorLayer'), d3);

        d2.putUnitDouble( stringIDToTypeID( "strokeStyleLineWidth" ), charIDToTypeID( "#Pxl" ), strokeWidth );

        d2.putBoolean(stringIDToTypeID('strokeEnabled'), strokeEnabled);

        d2.putBoolean( stringIDToTypeID( "fillEnabled" ), fillEnabled );

        d1.putObject(stringIDToTypeID('strokeStyle'), stringIDToTypeID('strokeStyle'), d2);

        d.putObject(stringIDToTypeID('to'), stringIDToTypeID('shapeStyle'), d1);

        executeAction(stringIDToTypeID('set'), d, DialogModes.NO);

        }

    catch (e) { throw(e); }
    
};

function set_fill_color(fill_r, fill_g, fill_b)

    {

    try {

        var d = new ActionDescriptor();

        var r = new ActionReference();

        r.putEnumerated(stringIDToTypeID('contentLayer'), stringIDToTypeID('ordinal'), stringIDToTypeID('targetEnum'));

        d.putReference(stringIDToTypeID('null'), r);

        var d1 = new ActionDescriptor();

        var d2 = new ActionDescriptor();

        var d3 = new ActionDescriptor();

        d3.putDouble(stringIDToTypeID('red'),   fill_r);

        d3.putDouble(stringIDToTypeID('green'), fill_g);

        d3.putDouble(stringIDToTypeID('blue'),  fill_b);

        d2.putObject(stringIDToTypeID('color'), stringIDToTypeID('RGBColor'), d3);

        d1.putObject(stringIDToTypeID('fillContents'), stringIDToTypeID('solidColorLayer'), d2);

        var d4 = new ActionDescriptor();

        d4.putBoolean(stringIDToTypeID('fillEnabled'), true);

        d1.putObject(stringIDToTypeID('strokeStyle'), stringIDToTypeID('strokeStyle'), d4);

        d.putObject(stringIDToTypeID('to'), stringIDToTypeID('shapeStyle'), d1);

        executeAction(stringIDToTypeID('set'), d, DialogModes.NO);

        }

    catch (e) { throw(e); }

}

function set_stroke_color(strokeWidth, stroke_hex)

    {

    try {

        var c = new SolidColor();

        c.rgb.hexValue = stroke_hex;

        var d = new ActionDescriptor();

        var r = new ActionReference();

        r.putEnumerated(stringIDToTypeID('contentLayer'), stringIDToTypeID('ordinal'), stringIDToTypeID('targetEnum'));

        d.putReference(stringIDToTypeID('null'), r);

        var d1 = new ActionDescriptor();

        var d2 = new ActionDescriptor();

        var d3 = new ActionDescriptor();

        var d4 = new ActionDescriptor();

        d4.putDouble(stringIDToTypeID('red'),   c.rgb.red);

        d4.putDouble(stringIDToTypeID('green'), c.rgb.green);

        d4.putDouble(stringIDToTypeID('blue'),  c.rgb.blue);

        d3.putObject(stringIDToTypeID('color'), stringIDToTypeID('RGBColor'), d4);

        d2.putObject(stringIDToTypeID('strokeStyleContent'), stringIDToTypeID('solidColorLayer'), d3);

        d2.putUnitDouble( stringIDToTypeID( "strokeStyleLineWidth" ), charIDToTypeID( "#Pxl" ), strokeWidth );

        d2.putBoolean(stringIDToTypeID('strokeEnabled'), true);

        d2.putBoolean( stringIDToTypeID( "fillEnabled" ), false );

        d1.putObject(stringIDToTypeID('strokeStyle'), stringIDToTypeID('strokeStyle'), d2);

        d.putObject(stringIDToTypeID('to'), stringIDToTypeID('shapeStyle'), d1);

        executeAction(stringIDToTypeID('set'), d, DialogModes.NO);

        }

    catch (e) { throw(e); }

}


drawCircle(350, 350, 350, false, "FFFFFF", false, "000000", 10);
// set_stroke_color(10, 255, 255, 255);
// set_fill_color(0, 0, 0);