////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setGlobalLighting(globalLightingAngle, globalAltitude) {

	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();
	reference.putProperty( s2t( "property" ), s2t( "globalAngle" ));
	reference.putEnumerated( s2t( "document" ), s2t( "ordinal" ), s2t( "targetEnum" ));
	descriptor.putReference( c2t( "null" ), reference );
	var descriptor2 = new ActionDescriptor();
	descriptor2.putUnitDouble( s2t( "globalLightingAngle" ), s2t( "angleUnit" ), globalLightingAngle );
	descriptor2.putUnitDouble( s2t( "globalAltitude" ), s2t( "angleUnit" ), globalAltitude );
	descriptor.putObject( s2t( "to" ), s2t( "globalAngle" ), descriptor2 );
	executeAction( s2t( "set" ), descriptor, DialogModes.NO );

}
