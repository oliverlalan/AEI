#target photoshop

function Setting(name, min, max) {
    this.name = name;
    this.min = min;
    this.max = max;
}

var strokeColor = new RGBColor();

strokeColor.hexValue = '000000';

var saturation = new Setting("saturation", 0, 100);

addAdjustmentLine(saturation, 50, 100, 100, 135, 3)


function addAdjustmentLine (selectedSetting, settingValue, x, y, lineLength, strokeWidth) {

    var minSetting = selectedSetting.min;
    var maxSetting = selectedSetting.max;

    var minSettingX = x;
    var maxSettingX = x + lineLength;
    var settingX = x + settingValue / (maxSetting - minSetting) * lineLength;
    var minSettingY = maxSettingY = settingY = y;

    drawLine(minSettingX, minSettingY, maxSettingX, maxSettingY, strokeWidth);


}







function drawLine(x1, y1, x2, y2, strokeWidth) {
    
    var lineSubPathArray = new Array();

    //line 1--it’s a straight line so the coordinates for anchor, left, and right
    //for each point have the same coordinates
    var lineArray = new Array()
    lineArray[0] = new PathPointInfo
    lineArray[0].kind = PointKind.CORNERPOINT
    lineArray[0].anchor = Array(x1, y1)
    lineArray[0].leftDirection = lineArray[0].anchor
    lineArray[0].rightDirection = lineArray[0].anchor

    lineArray[1] = new PathPointInfo
    lineArray[1].kind = PointKind.CORNERPOINT
    lineArray[1].anchor = Array(x2, y2)
    lineArray[1].leftDirection = lineArray[1].anchor
    lineArray[1].rightDirection = lineArray[1].anchor

    lineSubPathArray[0] = new SubPathInfo()
    lineSubPathArray[0].operation = ShapeOperation.SHAPEXOR
    lineSubPathArray[0].closed = false
    lineSubPathArray[0].entireSubPath = lineArray


    //create the path item
    var myPathItem = activeDocument.pathItems.add("A Line", lineSubPathArray)

    var currentPathItem = app.activeDocument.pathItems.getByName("A Line");


    // var currentPathItem = app.activeDocument.pathItems.getByName("A Line");

    // myPathItem.strokePath (Tool Type . BRUSH)


    convertPathtoShape();
    // setStroke ();
    addStroke(1, strokeColor, 100, 'inside');
    
    // doc.activeLayer.name = curLayName;
    // curLay.remove();
    // thePath.remove();
    
    myPathItem.remove();
}


function convertPathtoShape() {
	var d = new ActionDescriptor();
	var d2 = new ActionDescriptor();
	var d3 = new ActionDescriptor();
	var d4 = new ActionDescriptor();
	var r = new ActionReference();
	r.putClass( stringIDToTypeID( "contentLayer" ));
	d.putReference( charIDToTypeID( "null" ), r );
	d4.putDouble( charIDToTypeID( "Rd  " ), 255);
	d4.putDouble( charIDToTypeID( "Grn " ), 255);
	d4.putDouble( charIDToTypeID( "Bl  " ), 255);
	d3.putObject( charIDToTypeID( "Clr " ), charIDToTypeID( "RGBC" ), d4 );
	d2.putObject( charIDToTypeID( "Type" ), stringIDToTypeID( "solidColorLayer" ), d3 );
	d.putObject( charIDToTypeID( "Usng" ), stringIDToTypeID( "contentLayer" ), d2 );
	executeAction( charIDToTypeID( "Mk  " ), d, DialogModes.NO );
}

function setStroke(){
    var idsetd = charIDToTypeID( "setd" );
        var desc3 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref1 = new ActionReference();
            var idcontentLayer = stringIDToTypeID( "contentLayer" );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idTrgt = charIDToTypeID( "Trgt" );
            ref1.putEnumerated( idcontentLayer, idOrdn, idTrgt );
        desc3.putReference( idnull, ref1 );
        var idT = charIDToTypeID( "T   " );
            var desc4 = new ActionDescriptor();
            var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
                var desc5 = new ActionDescriptor();
                var idstrokeStyleContent = stringIDToTypeID( "strokeStyleContent" );
                    var desc6 = new ActionDescriptor();
                    var idClr = charIDToTypeID( "Clr " );
                        var desc7 = new ActionDescriptor();
                        var idCyn = charIDToTypeID( "Cyn " );
                        desc7.putDouble( idCyn, 74.970000 );
                        var idMgnt = charIDToTypeID( "Mgnt" );
                        desc7.putDouble( idMgnt, 67.920000 );
                        var idYlw = charIDToTypeID( "Ylw " );
                        desc7.putDouble( idYlw, 67.050000 );
                        var idBlck = charIDToTypeID( "Blck" );
                        desc7.putDouble( idBlck, 90.150000 );
                    var idCMYC = charIDToTypeID( "CMYC" );
                    desc6.putObject( idClr, idCMYC, desc7 );
                var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
                desc5.putObject( idstrokeStyleContent, idsolidColorLayer, desc6 );
                var idstrokeStyleVersion = stringIDToTypeID( "strokeStyleVersion" );
                desc5.putInteger( idstrokeStyleVersion, 2 );
                var idstrokeEnabled = stringIDToTypeID( "strokeEnabled" );
                desc5.putBoolean( idstrokeEnabled, true );
                var idfillEnabled = stringIDToTypeID( "fillEnabled" );
                desc5.putBoolean( idfillEnabled, false );
            var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
            desc4.putObject( idstrokeStyle, idstrokeStyle, desc5 );
        var idshapeStyle = stringIDToTypeID( "shapeStyle" );
        desc3.putObject( idT, idshapeStyle, desc4 );
    executeAction( idsetd, desc3, DialogModes.NO );

    var idsetd = charIDToTypeID( "setd" );
        var desc9 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref2 = new ActionReference();
            var idcontentLayer = stringIDToTypeID( "contentLayer" );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idTrgt = charIDToTypeID( "Trgt" );
            ref2.putEnumerated( idcontentLayer, idOrdn, idTrgt );
        desc9.putReference( idnull, ref2 );
        var idT = charIDToTypeID( "T   " );
            var desc10 = new ActionDescriptor();
            var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
                var desc11 = new ActionDescriptor();
                var idstrokeStyleLineWidth = stringIDToTypeID( "strokeStyleLineWidth" );
                var idPxl = charIDToTypeID( "#Pxl" );
                desc11.putUnitDouble( idstrokeStyleLineWidth, idPxl, 2.000000 );
                var idstrokeStyleVersion = stringIDToTypeID( "strokeStyleVersion" );
                desc11.putInteger( idstrokeStyleVersion, 2 );
                var idstrokeEnabled = stringIDToTypeID( "strokeEnabled" );
                desc11.putBoolean( idstrokeEnabled, true );
            var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
            desc10.putObject( idstrokeStyle, idstrokeStyle, desc11 );
        var idshapeStyle = stringIDToTypeID( "shapeStyle" );
        desc9.putObject( idT, idshapeStyle, desc10 );
    executeAction( idsetd, desc9, DialogModes.NO );
}


function changeShapeColor(color)
{
    var desc8 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(stringIDToTypeID('contentLayer'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc8.putReference(charIDToTypeID('null'), ref1);
    var desc9 = new ActionDescriptor();
    var desc10 = new ActionDescriptor();
    desc10.putDouble(charIDToTypeID('Rd  '), color[0]);
    desc10.putDouble(charIDToTypeID('Grn '), color[1]);
    desc10.putDouble(charIDToTypeID('Bl  '), color[2]);
    desc9.putObject(charIDToTypeID('Clr '), charIDToTypeID('RGBC'), desc10);
    desc8.putObject(charIDToTypeID('T   '), stringIDToTypeID('solidColorLayer'), desc9);
    executeAction(charIDToTypeID('setd'), desc8, DialogModes.NO);
}; // end of changeShapeColor()

// Add Stroke to layer

// Javier Aroche

// Set color as HEX



/*

 * Add Stroke Effect

 * @param {Number} size : 1 - 250

 * @param {Object} color : RGBColor object

 * @param {Number} opacity : 0 - 100

 * @param {Number} position : center / outside / inside

 */

function addStroke(size, color, opacity, position) {

    var strokePosCharID;

    

    switch(position) {

        case 'center':

            strokePosCharID = 'CtrF';

            break;

        case 'outside':

            strokePosCharID = 'OutF';

            break;

        case 'inside':

            strokePosCharID = 'InsF';

            break;

        default: break; 

    }

    

    var desc = new ActionDescriptor();

    var ref190 = new ActionReference();

    

    ref190.putProperty( charIDToTypeID( "Prpr" ), charIDToTypeID( "Lefx" ) );

    ref190.putEnumerated( charIDToTypeID( "Lyr " ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );

    desc.putReference( charIDToTypeID( "null" ), ref190 );

    var fxDesc = new ActionDescriptor();

    

    var fxPropDesc = new ActionDescriptor();

    fxPropDesc.putBoolean( charIDToTypeID( "enab" ), true );

    fxPropDesc.putBoolean( stringIDToTypeID( "present" ), true );

    fxPropDesc.putBoolean( stringIDToTypeID( "showInDialog" ), true );

    fxPropDesc.putEnumerated( charIDToTypeID( "Styl" ), charIDToTypeID( "FStl" ), charIDToTypeID( strokePosCharID ) );

    fxPropDesc.putEnumerated(  charIDToTypeID( "PntT" ),  charIDToTypeID( "FrFl" ), charIDToTypeID( "SClr" ) );

    fxPropDesc.putEnumerated( charIDToTypeID( "Md  " ), charIDToTypeID( "BlnM" ), charIDToTypeID( "Nrml" ) );

    fxPropDesc.putUnitDouble( charIDToTypeID( "Opct" ), charIDToTypeID( "#Prc" ), opacity );

    fxPropDesc.putUnitDouble( charIDToTypeID( "Sz  " ), charIDToTypeID( "#Pxl") , size );

    var colorDesc = new ActionDescriptor();

    colorDesc.putDouble( charIDToTypeID( "Rd  " ), color.red);

    colorDesc.putDouble( charIDToTypeID( "Grn " ), color.green );

    colorDesc.putDouble( charIDToTypeID( "Bl  " ), color.blue );

    fxPropDesc.putObject( charIDToTypeID( "Clr " ), charIDToTypeID( "RGBC" ), colorDesc );

    fxPropDesc.putBoolean( stringIDToTypeID( "overprint" ), false );

    fxDesc.putObject( charIDToTypeID( "FrFX" ), charIDToTypeID( "FrFX" ), fxPropDesc );

    desc.putObject( charIDToTypeID( "T   " ), charIDToTypeID( "Lefx" ), fxDesc );

    executeAction( charIDToTypeID( "setd" ), desc, DialogModes.NO );

}