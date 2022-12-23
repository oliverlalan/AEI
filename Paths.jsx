#target photoshop


function makeBeforeAfterMask () {

    // Save the current preferences
    var startRulerUnits = app.preferences.rulerUnits
    var startTypeUnits = app.preferences.typeUnits
    var startDisplayDialogs = app.displayDialogs

    // Set Adobe Photoshop CS4 to use pixels and display no dialogs
    app.preferences.rulerUnits = Units.PIXELS
    app.preferences.typeUnits = TypeUnits.PIXELS
    app.displayDialogs = DialogModes.NO

    // Store doc dimensions
    var docRef = app.activeDocument;
    var docHeight = docRef.height;
    var docWidth = docRef.width;

    // Path definition
    var lineSubPathArray = new Array();

    //line 1--it’s a straight line so the coordinates for anchor, left, and right
    //for each point have the same coordinates
    var lineArray = new Array()
    lineArray[0] = new PathPointInfo
    lineArray[0].kind = PointKind.CORNERPOINT
    lineArray[0].anchor = Array(1080, 0)
    lineArray[0].leftDirection = lineArray[0].anchor
    lineArray[0].rightDirection = lineArray[0].anchor
    lineArray[1] = new PathPointInfo
    lineArray[1].kind = PointKind.CORNERPOINT
    lineArray[1].anchor = Array(0, 1350)
    lineArray[1].leftDirection = lineArray[1].anchor
    lineArray[1].rightDirection = lineArray[1].anchor
    lineSubPathArray[0] = new SubPathInfo()
    lineSubPathArray[0].operation = ShapeOperation.SHAPEXOR
    lineSubPathArray[0].closed = false
    lineSubPathArray[0].entireSubPath = lineArray
    
    // line 2
    var lineArray2 = new Array()
    lineArray2[0] = new PathPointInfo
    lineArray2[0].kind = PointKind.CORNERPOINT
    lineArray2[0].anchor = Array(1080, 0)
    lineArray2[0].leftDirection = lineArray2[0].anchor
    lineArray2[0].rightDirection = lineArray2[0].anchor
    lineArray2[1] = new PathPointInfo
    lineArray2[1].kind = PointKind.CORNERPOINT
    lineArray2[1].anchor = Array(1080,1350)
    lineArray2[1].leftDirection = lineArray2[1].anchor
    lineArray2[1].rightDirection = lineArray2[1].anchor
    lineSubPathArray[1] = new SubPathInfo()
    lineSubPathArray[1].operation = ShapeOperation.SHAPEXOR
    lineSubPathArray[1].closed = false
    lineSubPathArray[1].entireSubPath = lineArray2

    var lineArray3 = new Array()
    lineArray3[0] = new PathPointInfo
    lineArray3[0].kind = PointKind.CORNERPOINT
    lineArray3[0].anchor = Array(1080,1350)
    lineArray3[0].leftDirection = lineArray3[0].anchor
    lineArray3[0].rightDirection = lineArray3[0].anchor
    lineArray3[1] = new PathPointInfo
    lineArray3[1].kind = PointKind.CORNERPOINT
    lineArray3[1].anchor = Array(0, 1350)
    lineArray3[1].leftDirection = lineArray3[1].anchor
    lineArray3[1].rightDirection = lineArray3[1].anchor
    lineSubPathArray[2] = new SubPathInfo()
    lineSubPathArray[2].operation = ShapeOperation.SHAPEXOR
    lineSubPathArray[2].closed = false
    lineSubPathArray[2].entireSubPath = lineArray3

    //create the path item
    var myPathItem = docRef.pathItems.add("A Line", lineSubPathArray)

    var currentPathItem = app.activeDocument.pathItems.getByName("A Line");


    docRef.pathItems[0].makeSelection();

    // path selection
    myPathItem.makeSelection(0);


    //myPathItem.makeWorkPath();

    // fill path
    var fillColor = new SolidColor;
    fillColor.rgb.hexValue = "000000";
    activeDocument.selection.fill(fillColor);

    // fill it so we can see something
    // var fillColor = new SolidColor;
    // fillColor.rgb.hexValue = "000000";
    // myPathItem.fillPath(fillColor);

    // Reset the application preferences
    preferences.rulerUnits = startRulerUnits
    preferences.typeUnits = startTypeUnits
    displayDialogs = startDisplayDialogs

}

