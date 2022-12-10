#target photoshop

addMasks();

function addMasks(){

    try{
        loadLayerSelection();
        addLayerMask();
        deleteLayerMask(true);
        } catch (e) {}
};

// =======================================================
function loadLayerSelection() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();
    var reference2 = new ActionReference();

    reference.putProperty( s2t( "channel" ), s2t( "selection" ));
    descriptor.putReference( c2t( "null" ), reference );
    reference2.putEnumerated( s2t( "channel" ), s2t( "channel" ), s2t( "transparencyEnum" ));
    descriptor.putReference( s2t( "to" ), reference2 );
    executeAction( s2t( "set" ), descriptor, DialogModes.NO );
}

// =======================================================
function addLayerMask() {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    descriptor.putClass( s2t( "new" ), s2t( "channel" ));
    reference.putEnumerated( s2t( "channel" ), s2t( "channel" ), s2t( "mask" ));
    descriptor.putReference( s2t( "at" ), reference );
    descriptor.putEnumerated( s2t( "using" ), c2t( "UsrM" ), s2t( "revealSelection" ));
    executeAction( s2t( "make" ), descriptor, DialogModes.NO );
}

// =======================================================
function deleteLayerMask(apply) {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };

    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };

    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putEnumerated( s2t( "channel" ), s2t( "channel" ), s2t( "mask" ));
    descriptor.putReference( c2t( "null" ), reference );
    descriptor.putBoolean( s2t( "apply" ), apply );
    executeAction( s2t( "delete" ), descriptor, DialogModes.NO );
}