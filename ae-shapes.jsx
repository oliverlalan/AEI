////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addGradientFill(shapeLayer, color1, color2) {
  // create a new fill object
  var fill = shapeLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Graphic - Fill");

  // set the fill type to Gradient
  fill.property("ADBE Vector Fill Rule").setValue(2);

  // create a new gradient object
  var gradient = fill.property("ADBE Vector Fill Gradient").addProperty("ADBE Vector Gradient2");

  // set the colors of the gradient
  gradient.property("ADBE Vector Gradient Color A").setValue(color1);
  gradient.property("ADBE Vector Gradient Color B").setValue(color2);
}

