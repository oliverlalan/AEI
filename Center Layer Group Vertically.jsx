#target photoshop

// Based on https://morris-photographics.com/photoshop/scripts/downloads/Center%20Layer%201-1-0.jsx
function centerLayerGroupVertically(layerGroupName) {

  // get document attributes
  var doc = activeDocument;
  var docHeight = doc.height.value;

  // get layer group
  var layer = doc.layerSets.getByName(layerGroupName);
  var bounds = layer.bounds;

  // get layer dimensions
	var layerHeight = Number(bounds[3] - bounds[1]);

	// calculate offsets
	var dY = (docHeight - layerHeight) / 2 - Number(bounds[1]);

	// centers the active layer
	layer.translate(0, dY);
}

centerLayerGroupVertically("exifData");