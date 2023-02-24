#target photoshop

// Assign the active layer to a variable
var shapeLayer = activeDocument.activeLayer;

// Create the ShapeStyle descriptor
var shapeStyle = new ActionDescriptor();

// Specify that the fill type is a gradient
shapeStyle.putEnumerated(charIDToTypeID("Type"), charIDToTypeID("Type"), charIDToTypeID("Grdn"));

// Create the gradient descriptor
var gradientDesc = new ActionDescriptor();

// Specify the gradient type
gradientDesc.putEnumerated(charIDToTypeID("Type"), charIDToTypeID("Type"), charIDToTypeID("GrdT"));

// Specify the interpolation method
gradientDesc.putEnumerated(charIDToTypeID("Intr"), charIDToTypeID("Intr"), charIDToTypeID("CstS"));

// Specify the angle of the gradient
gradientDesc.putDouble(charIDToTypeID("Angl"), 90.000000);

// Specify the opacity
gradientDesc.putDouble(charIDToTypeID("Opct"), 100.000000);

// Specify the midpoint
gradientDesc.putDouble(charIDToTypeID("Mdpn"), 100.000000);

// Add color stops to the gradient descriptor
var colorStop = new ActionDescriptor();
colorStop.putDouble(charIDToTypeID("Clr "), 0);
colorStop.putDouble(charIDToTypeID("Opct"), 100);
gradientDesc.putObject(charIDToTypeID("ClrS"), charIDToTypeID("ClrS"), colorStop);

colorStop = new ActionDescriptor();
colorStop.putDouble(charIDToTypeID("Clr "), 255);
colorStop.putDouble(charIDToTypeID("Opct"), 100);
gradientDesc.putObject(charIDToTypeID("ClrS"), charIDToTypeID("ClrS"), colorStop);

// Add the gradient descriptor to the ShapeStyle descriptor
shapeStyle.putObject(charIDToTypeID("Grdn"), charIDToTypeID("Grdn"), gradientDesc);

// Apply the ShapeStyle to the shape layer
shapeLayer.applyStyle(shapeStyle);
