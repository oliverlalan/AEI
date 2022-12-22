#target photoshop

function DrawShape() {
    
    var doc = app.activeDocument;
    var y = arguments.length;
    var i = 0;
    
    var lineArray = [];
    for (i = 0; i < y; i++) {
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
    var myPathItem = doc.pathItems.add("myPath", [lineSubPathArray]);
    

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

// X,Y
// Put the coordinates in clockwise order
DrawShape([100, 100], [100, 200], [200, 200], [200, 100]);
DrawShape([512, 128], [600, 256], [684, 320], [600, 386], [686, 514], [512, 450],[340,512],[428,386],[340,320],[428,256]);