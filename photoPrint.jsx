////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addPhotoPaper (layer) {

    // Document parameters
    var docWidth = app.activeDocument.width.as('px');
    var docHeight = app.activeDocument.height.as('px');
    var photoMargin = docWidth / 24;

    var layerProperties = getLayerProperties(layer);
    var layerWidth = layerProperties.width.as('px');
    var layerHeight = layerProperties.height.as('px');
    var layerLeft = layerProperties.left.as('px');
    var layerTop = layerProperties.top.as('px');

    var paperLayer = drawSquare(layerLeft - photoMargin, layerTop - photoMargin, layerWidth + 2 * photoMargin, layerHeight + 2 * photoMargin);
    fillShapeWithPaperTexture ("Polaroid Paper", 5);
    addPaperStyle(100, true, true, true, 0, 0, 0, 65, true, 90, 4, 0, 5, 0, false, "Linear", true, true, true, true, 242.249024, 240.634248, 237.404664, 100, true, true, true, 255, 255, 255, 50, 0, 0, 0, 50, true, 90, 30, 100, 2, "Linear", false, 0, false, false);

    paperLayer.move(layer, ElementPlacement.PLACEAFTER);

    return paperLayer;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fillShapeWithPaperTexture(textureName, scale) {

    var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var descriptor2 = new ActionDescriptor();
	var descriptor3 = new ActionDescriptor();
	var descriptor5 = new ActionDescriptor();
	var descriptor6 = new ActionDescriptor();
	var reference = new ActionReference();

	reference.putEnumerated( s2t( "contentLayer" ), s2t( "ordinal" ), s2t( "targetEnum" ));
	descriptor.putReference( c2t( "null" ), reference );
	descriptor3.putUnitDouble( s2t( "scale" ), s2t( "percentUnit" ), scale );
	descriptor5.putString( s2t( "name" ), textureName );
	descriptor3.putObject( s2t( "pattern" ), s2t( "pattern" ), descriptor5 );
	descriptor2.putObject( s2t( "fillContents" ), s2t( "patternLayer" ), descriptor3 );
	descriptor6.putBoolean( s2t( "fillEnabled" ), true );
	descriptor2.putObject( s2t( "strokeStyle" ), s2t( "strokeStyle" ), descriptor6 );
	descriptor.putObject( s2t( "to" ), s2t( "shapeStyle" ), descriptor2 );
	executeAction( s2t( "set" ), descriptor, DialogModes.NO );

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addPaperStyle(scale, enabled, present, showInDialog, red, Grn, blue, opacity, useGlobalAngle, localLightingAngle, distance, chokeMatte, blur, noise, AntA, name2, layerConceals, enabled2, present2, showInDialog2, red2, Grn2, blue2, opacity2, enabled3, present3, showInDialog3, red3, Grn3, blue3, highlightOpacity, red4, Grn4, blue4, shadowOpacity, useGlobalAngle2, localLightingAngle2, localLightingAltitude, strengthRatio, blur2, name3, antialiasGloss, softness, useShape, useTexture) {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var descriptor2 = new ActionDescriptor();
	var descriptor3 = new ActionDescriptor();
	var descriptor4 = new ActionDescriptor();
	var descriptor5 = new ActionDescriptor();
	var descriptor6 = new ActionDescriptor();
	var descriptor7 = new ActionDescriptor();
	var descriptor8 = new ActionDescriptor();
	var descriptor9 = new ActionDescriptor();
	var descriptor10 = new ActionDescriptor();
	var descriptor11 = new ActionDescriptor();
	var reference = new ActionReference();

	reference.putProperty( s2t( "property" ), s2t( "layerEffects" ));
	reference.putEnumerated( s2t( "layer" ), s2t( "ordinal" ), s2t( "targetEnum" ));
	descriptor.putReference( c2t( "null" ), reference );
	descriptor2.putUnitDouble( s2t( "scale" ), s2t( "percentUnit" ), scale );
	descriptor3.putBoolean( s2t( "enabled" ), enabled );
	descriptor3.putBoolean( s2t( "present" ), present );
	descriptor3.putBoolean( s2t( "showInDialog" ), showInDialog );
	descriptor3.putEnumerated( s2t( "mode" ), s2t( "blendMode" ), s2t( "multiply" ));
	descriptor4.putDouble( s2t( "red" ), red );
	descriptor4.putDouble( c2t( "Grn " ), Grn );
	descriptor4.putDouble( s2t( "blue" ), blue );
	descriptor3.putObject( s2t( "color" ), s2t( "RGBColor" ), descriptor4 );
	descriptor3.putUnitDouble( s2t( "opacity" ), s2t( "percentUnit" ), opacity );
	descriptor3.putBoolean( s2t( "useGlobalAngle" ), useGlobalAngle );
	descriptor3.putUnitDouble( s2t( "localLightingAngle" ), s2t( "angleUnit" ), localLightingAngle );
	descriptor3.putUnitDouble( s2t( "distance" ), s2t( "pixelsUnit" ), distance );
	descriptor3.putUnitDouble( s2t( "chokeMatte" ), s2t( "pixelsUnit" ), chokeMatte );
	descriptor3.putUnitDouble( s2t( "blur" ), s2t( "pixelsUnit" ), blur );
	descriptor3.putUnitDouble( s2t( "noise" ), s2t( "percentUnit" ), noise );
	descriptor3.putBoolean( c2t( "AntA" ), AntA );
	descriptor5.putString( s2t( "name" ), name2 );
	descriptor3.putObject( c2t( "TrnS" ), c2t( "ShpC" ), descriptor5 );
	descriptor3.putBoolean( s2t( "layerConceals" ), layerConceals );
	descriptor2.putObject( s2t( "dropShadow" ), s2t( "dropShadow" ), descriptor3 );
	descriptor6.putBoolean( s2t( "enabled" ), enabled2 );
	descriptor6.putBoolean( s2t( "present" ), present2 );
	descriptor6.putBoolean( s2t( "showInDialog" ), showInDialog2 );
	descriptor6.putEnumerated( s2t( "mode" ), s2t( "blendMode" ), s2t( "multiply" ));
	descriptor7.putDouble( s2t( "red" ), red2 );
	descriptor7.putDouble( c2t( "Grn " ), Grn2 );
	descriptor7.putDouble( s2t( "blue" ), blue2 );
	descriptor6.putObject( s2t( "color" ), s2t( "RGBColor" ), descriptor7 );
	descriptor6.putUnitDouble( s2t( "opacity" ), s2t( "percentUnit" ), opacity2 );
	descriptor2.putObject( s2t( "solidFill" ), s2t( "solidFill" ), descriptor6 );
	descriptor8.putBoolean( s2t( "enabled" ), enabled3 );
	descriptor8.putBoolean( s2t( "present" ), present3 );
	descriptor8.putBoolean( s2t( "showInDialog" ), showInDialog3 );
	descriptor8.putEnumerated( s2t( "highlightMode" ), s2t( "blendMode" ), s2t( "screen" ));
	descriptor9.putDouble( s2t( "red" ), red3 );
	descriptor9.putDouble( c2t( "Grn " ), Grn3 );
	descriptor9.putDouble( s2t( "blue" ), blue3 );
	descriptor8.putObject( s2t( "highlightColor" ), s2t( "RGBColor" ), descriptor9 );
	descriptor8.putUnitDouble( s2t( "highlightOpacity" ), s2t( "percentUnit" ), highlightOpacity );
	descriptor8.putEnumerated( s2t( "shadowMode" ), s2t( "blendMode" ), s2t( "multiply" ));
	descriptor10.putDouble( s2t( "red" ), red4 );
	descriptor10.putDouble( c2t( "Grn " ), Grn4 );
	descriptor10.putDouble( s2t( "blue" ), blue4 );
	descriptor8.putObject( s2t( "shadowColor" ), s2t( "RGBColor" ), descriptor10 );
	descriptor8.putUnitDouble( s2t( "shadowOpacity" ), s2t( "percentUnit" ), shadowOpacity );
	descriptor8.putEnumerated( s2t( "bevelTechnique" ), s2t( "bevelTechnique" ), s2t( "softMatte" ));
	descriptor8.putEnumerated( s2t( "bevelStyle" ), s2t( "bevelEmbossStyle" ), s2t( "innerBevel" ));
	descriptor8.putBoolean( s2t( "useGlobalAngle" ), useGlobalAngle2 );
	descriptor8.putUnitDouble( s2t( "localLightingAngle" ), s2t( "angleUnit" ), localLightingAngle2 );
	descriptor8.putUnitDouble( s2t( "localLightingAltitude" ), s2t( "angleUnit" ), localLightingAltitude );
	descriptor8.putUnitDouble( s2t( "strengthRatio" ), s2t( "percentUnit" ), strengthRatio );
	descriptor8.putUnitDouble( s2t( "blur" ), s2t( "pixelsUnit" ), blur2 );
	descriptor8.putEnumerated( s2t( "bevelDirection" ), s2t( "bevelEmbossStampStyle" ), c2t( "In  " ));
	descriptor11.putString( s2t( "name" ), name3 );
	descriptor8.putObject( c2t( "TrnS" ), c2t( "ShpC" ), descriptor11 );
	descriptor8.putBoolean( s2t( "antialiasGloss" ), antialiasGloss );
	descriptor8.putUnitDouble( s2t( "softness" ), s2t( "pixelsUnit" ), softness );
	descriptor8.putBoolean( s2t( "useShape" ), useShape );
	descriptor8.putBoolean( s2t( "useTexture" ), useTexture );
	descriptor2.putObject( s2t( "bevelEmboss" ), s2t( "bevelEmboss" ), descriptor8 );
	descriptor.putObject( s2t( "to" ), s2t( "layerEffects" ), descriptor2 );
	executeAction( s2t( "set" ), descriptor, DialogModes.NO );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addPhotoOnPaperStyle(selectedlayer) {

    app.activeDocument.activeLayer = selectedlayer;

	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();
	reference.putProperty( s2t( "property" ), s2t( "layerEffects" ));
	reference.putEnumerated( s2t( "layer" ), s2t( "ordinal" ), s2t( "targetEnum" ));
	descriptor.putReference( c2t( "null" ), reference );
	var descriptor2 = new ActionDescriptor();
	descriptor2.putUnitDouble( s2t( "scale" ), s2t( "percentUnit" ), 100.000000 );
	var descriptor3 = new ActionDescriptor();
	descriptor3.putBoolean( s2t( "enabled" ), true );
	descriptor3.putBoolean( s2t( "present" ), true );
	descriptor3.putBoolean( s2t( "showInDialog" ), true );
	descriptor3.putEnumerated( s2t( "mode" ), s2t( "blendMode" ), s2t( "multiply" ));
	var descriptor4 = new ActionDescriptor();
	descriptor4.putDouble( s2t( "red" ), 0.000000 );
	descriptor4.putDouble( c2t( "Grn " ), 0.000000 );
	descriptor4.putDouble( s2t( "blue" ), 0.000000 );
	descriptor3.putObject( s2t( "color" ), s2t( "RGBColor" ), descriptor4 );
	descriptor3.putUnitDouble( s2t( "opacity" ), s2t( "percentUnit" ), 35.000000 );
	descriptor3.putBoolean( s2t( "useGlobalAngle" ), true );
	descriptor3.putUnitDouble( s2t( "localLightingAngle" ), s2t( "angleUnit" ), 90.000000 );
	descriptor3.putUnitDouble( s2t( "distance" ), s2t( "pixelsUnit" ), 3.000000 );
	descriptor3.putUnitDouble( s2t( "chokeMatte" ), s2t( "pixelsUnit" ), 0.000000 );
	descriptor3.putUnitDouble( s2t( "blur" ), s2t( "pixelsUnit" ), 7.000000 );
	descriptor3.putUnitDouble( s2t( "noise" ), s2t( "percentUnit" ), 0.000000 );
	descriptor3.putBoolean( c2t( "AntA" ), false );
	var descriptor5 = new ActionDescriptor();
	descriptor5.putString( s2t( "name" ), "Linear" );
	descriptor3.putObject( c2t( "TrnS" ), c2t( "ShpC" ), descriptor5 );
	descriptor2.putObject( s2t( "innerShadow" ), s2t( "innerShadow" ), descriptor3 );
	var descriptor6 = new ActionDescriptor();
	descriptor6.putBoolean( s2t( "enabled" ), true );
	descriptor6.putBoolean( s2t( "present" ), true );
	descriptor6.putBoolean( s2t( "showInDialog" ), true );
	descriptor6.putEnumerated( s2t( "highlightMode" ), s2t( "blendMode" ), s2t( "screen" ));
	var descriptor7 = new ActionDescriptor();
	descriptor7.putDouble( s2t( "red" ), 255.000000 );
	descriptor7.putDouble( c2t( "Grn " ), 255.000000 );
	descriptor7.putDouble( s2t( "blue" ), 255.000000 );
	descriptor6.putObject( s2t( "highlightColor" ), s2t( "RGBColor" ), descriptor7 );
	descriptor6.putUnitDouble( s2t( "highlightOpacity" ), s2t( "percentUnit" ), 0.000000 );
	descriptor6.putEnumerated( s2t( "shadowMode" ), s2t( "blendMode" ), s2t( "multiply" ));
	var descriptor8 = new ActionDescriptor();
	descriptor8.putDouble( s2t( "red" ), 0.000000 );
	descriptor8.putDouble( c2t( "Grn " ), 0.000000 );
	descriptor8.putDouble( s2t( "blue" ), 0.000000 );
	descriptor6.putObject( s2t( "shadowColor" ), s2t( "RGBColor" ), descriptor8 );
	descriptor6.putUnitDouble( s2t( "shadowOpacity" ), s2t( "percentUnit" ), 50.000000 );
	descriptor6.putEnumerated( s2t( "bevelTechnique" ), s2t( "bevelTechnique" ), s2t( "softMatte" ));
	descriptor6.putEnumerated( s2t( "bevelStyle" ), s2t( "bevelEmbossStyle" ), s2t( "innerBevel" ));
	descriptor6.putBoolean( s2t( "useGlobalAngle" ), true );
	descriptor6.putUnitDouble( s2t( "localLightingAngle" ), s2t( "angleUnit" ), 90.000000 );
	descriptor6.putUnitDouble( s2t( "localLightingAltitude" ), s2t( "angleUnit" ), 30.000000 );
	descriptor6.putUnitDouble( s2t( "strengthRatio" ), s2t( "percentUnit" ), 100.000000 );
	descriptor6.putUnitDouble( s2t( "blur" ), s2t( "pixelsUnit" ), 3.000000 );
	descriptor6.putEnumerated( s2t( "bevelDirection" ), s2t( "bevelEmbossStampStyle" ), c2t( "In  " ));
	var descriptor9 = new ActionDescriptor();
	descriptor9.putString( s2t( "name" ), "Linear" );
	descriptor6.putObject( c2t( "TrnS" ), c2t( "ShpC" ), descriptor9 );
	descriptor6.putBoolean( s2t( "antialiasGloss" ), false );
	descriptor6.putUnitDouble( s2t( "softness" ), s2t( "pixelsUnit" ), 3.000000 );
	descriptor6.putBoolean( s2t( "useShape" ), false );
	descriptor6.putBoolean( s2t( "useTexture" ), false );
	descriptor2.putObject( s2t( "bevelEmboss" ), s2t( "bevelEmboss" ), descriptor6 );
	descriptor2.putUnitDouble( s2t( "globalAltitude" ), s2t( "angleUnit" ), 45.000000 );
	descriptor.putObject( s2t( "to" ), s2t( "layerEffects" ), descriptor2 );
	executeAction( s2t( "set" ), descriptor, DialogModes.NO );

}

