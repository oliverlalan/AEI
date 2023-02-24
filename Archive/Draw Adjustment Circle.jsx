// create path
function drawCircle(name, x, y, radius){

    var d = new ActionDescriptor();
var r = new ActionReference();
r.putProperty(stringIDToTypeID("path"), stringIDToTypeID("workPath"));
d.putReference(stringIDToTypeID("null"), r);
var d1 = new ActionDescriptor();
d1.putUnitDouble(stringIDToTypeID("top"), stringIDToTypeID("pixelsUnit"),    y - r);
d1.putUnitDouble(stringIDToTypeID("left"), stringIDToTypeID("pixelsUnit"),   x - r);
d1.putUnitDouble(stringIDToTypeID("bottom"), stringIDToTypeID("pixelsUnit"), y + r);
d1.putUnitDouble(stringIDToTypeID("right"), stringIDToTypeID("pixelsUnit"),  x + r);
d.putObject(stringIDToTypeID("to"), stringIDToTypeID("ellipse"), d1);
executeAction(stringIDToTypeID("set"), d, DialogModes.NO);


// create fill layer
var d = new ActionDescriptor();
var r = new ActionReference();
r.putClass(stringIDToTypeID("contentLayer"));
d.putReference(stringIDToTypeID("null"), r);
var d1 = new ActionDescriptor();
var d2 = new ActionDescriptor();
var d3 = new ActionDescriptor();
d3.putDouble(stringIDToTypeID("red"),   100);
d3.putDouble(stringIDToTypeID("green"), 150);
d3.putDouble(stringIDToTypeID("blue"),  200);
d2.putObject(stringIDToTypeID("color"), stringIDToTypeID("RGBColor"), d3);
d1.putObject(stringIDToTypeID("type"), stringIDToTypeID("solidColorLayer"), d2);
d.putObject(stringIDToTypeID("using"), stringIDToTypeID("contentLayer"), d1);
executeAction(stringIDToTypeID("make"), d, DialogModes.NO);

}

