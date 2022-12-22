#target photoshop

// examples of a function call

// https://community.adobe.com/t5/photoshop-ecosystem-discussions/scripting-circles-with-js-photoshop-cc-2017-0-1/m-p/9497152#M129790


// circle(720, 1000, 1000, 8, "#FFFFFF");

//circle(100, 200, 300, 3, "yellow");

//circle(100, 200, 300, 3, "#0190F7");

//circle(100, 200, 300, 3, 100, 150, 180);

////////////////////////////////////////////////////////////////////////////////////////////////////////

function circle(r, x, y, w, c_r, c_g, c_b)

    {

    try

        {

        select_layer_rgb();

      

        var d1 = new ActionDescriptor();

        var d2 = new ActionDescriptor();

        var r1 = new ActionReference();

        r1.putProperty( charIDToTypeID( "Path" ), charIDToTypeID( "WrPt" ) );

        d1.putReference( charIDToTypeID( "null" ), r1 );

        d2.putUnitDouble( charIDToTypeID( "Top " ), charIDToTypeID( "#Pxl" ), y-r );

        d2.putUnitDouble( charIDToTypeID( "Left" ), charIDToTypeID( "#Pxl" ), x-r );

        d2.putUnitDouble( charIDToTypeID( "Btom" ), charIDToTypeID( "#Pxl" ), y+r );

        d2.putUnitDouble( charIDToTypeID( "Rght" ), charIDToTypeID( "#Pxl" ), x+r );

        d1.putObject( charIDToTypeID( "T   " ), charIDToTypeID( "Elps" ), d2 );

        executeAction( charIDToTypeID( "setd" ), d1, DialogModes.NO );

        d1 = null;

        d2 = null;

        r1 = null;

        var idx = curr_path_idx();

        app.activeDocument.pathItems[idx].makeSelection(0, true, SelectionType.REPLACE);

        app.activeDocument.pathItems[idx].remove();

        var c = new SolidColor();

        with (c.rgb) { red = green = blue = 0; }

        if (c_r != undefined)

            {

            if (typeof(c_r) == "string")

                {

                if (c_r.indexOf("#") == 0)

                    {

                    c.rgb.hexValue = c_r.substr(1);

                    }

                else

                    {                  

                    switch (c_r.toLowerCase())

                        {

                        case "red":     c.rgb.red = 255; c.rgb.green=0;   c.rgb.blue=0;   break;

                        case "green":   c.rgb.red = 0;   c.rgb.green=255; c.rgb.blue=0;   break;

                        case "blue":    c.rgb.red = 0;   c.rgb.green=0;   c.rgb.blue=255; break;

                        case "yellow":  c.rgb.red = 255; c.rgb.green=255; c.rgb.blue=0;   break;

                        case "magenta": c.rgb.red = 255; c.rgb.green=0;   c.rgb.blue=255; break;

                        case "cyan":    c.rgb.red = 0;   c.rgb.green=255; c.rgb.blue=255; break;

                        case "black":   c.rgb.red = 0;   c.rgb.green=0;   c.rgb.blue=0;   break;

                        case "white":   c.rgb.red = 255; c.rgb.green=255; c.rgb.blue=255; break;

                        case "gray":    c.rgb.red = 128; c.rgb.green=128; c.rgb.blue=128; break;

                        default:        c.rgb.red = 0;   c.rgb.green=0;   c.rgb.blue=0;   break;

                        }

                    }

                }

            else if (typeof(c_r) == "number")

                {

                c.rgb.red   = c_r;

                c.rgb.green = c_g; 

                c.rgb.blue  = c_b;

                }  

            }

        stroke(w, c.rgb.red, c.rgb.green, c.rgb.blue);

        app.activeDocument.selection.deselect();

        }

    catch (e) { alert(e); }

    }

////////////////////////////////////////////////////////////////////////////////////////////

function select_layer_rgb()

    {

    try {

        var d = new ActionDescriptor();

        var r = new ActionReference();

        r.putEnumerated( charIDToTypeID( "Chnl" ), charIDToTypeID( "Chnl" ), charIDToTypeID( "RGB " ) );

        d.putReference( charIDToTypeID( "null" ), r );

        d.putBoolean( charIDToTypeID( "MkVs" ), false );

        executeAction( charIDToTypeID( "slct" ), d, DialogModes.NO );

        r = null;

        d = null;  

        }

    catch (e) { alert(e);  }

    }

////////////////////////////////////////////////////////////////////////////////////////////

function curr_path_idx()

    {

    try {

        var r = new ActionReference();

        r.putProperty( charIDToTypeID( "Prpr" ), stringIDToTypeID( "targetPathIndex" ) );

        r.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );

        r = executeActionGet(r);

        return  r.getInteger( stringIDToTypeID( 'targetPathIndex' ));

        }

    catch (e) { alert(e); return -1; }

    }

///////////////////////////////////////////////////////////////////////////////////////////////////

function stroke(size, r, g, b)

    { 

    try {

        var d1 = new ActionDescriptor();

        var d2 = new ActionDescriptor();

        d1.putInteger( charIDToTypeID( "Wdth" ), size );

        d1.putEnumerated( charIDToTypeID( "Lctn" ), charIDToTypeID( "StrL" ), charIDToTypeID( "Cntr" ) );

        d1.putUnitDouble( charIDToTypeID( "Opct" ), charIDToTypeID( "#Prc" ), 100.000000 );

        d1.putEnumerated( charIDToTypeID( "Md  " ), charIDToTypeID( "BlnM" ), charIDToTypeID( "Nrml" ) );

        d2.putDouble( charIDToTypeID( "Rd  " ), r );

        d2.putDouble( charIDToTypeID( "Grn " ), g );

        d2.putDouble( charIDToTypeID( "Bl  " ), b );

        d1.putObject( charIDToTypeID( "Clr " ), charIDToTypeID( "RGBC" ), d2 );

        executeAction( charIDToTypeID( "Strk" ), d1, DialogModes.NO );

        }

    catch (e) { alert(e); }

    }


///////
// hue angulo
// s radio


function tones (h, s, r, x, y, stroke) {

    circle(r , x, y, stroke, "#FFFFFF");

    var s = r * s / 100 * 0.9;
    var t_x = x + s * Math.cos(h * Math.PI / 180);
    var t_y = y - s * Math.sin(h * Math.PI / 180);

    circle(r/10, t_x, t_y, stroke, "#FFFFFF");


}
tones(35, 80, 90, 540, 675 ,2);





