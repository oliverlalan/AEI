#target photoshop

function makeDarkerNoisierBlurier() {// Document selection
    var doc = activeDocument;

    // Layer selection
    var targetLayer= doc.activeLayer;

    targetLayer.duplicate(targetLayer, ElementPlacement.PLACEAFTER);

    targetLayer.applyGaussianBlur(20);

    targetLayer.adjustCurves([[0,0],[253,100]]);

    targetLayer.applyAddNoise(2, NoiseDistribution.GAUSSIAN, true);

}

makeDarkerNoisierBlurier();