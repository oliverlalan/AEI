#target photoshop

function makeDarkerNoisierBlurier() {// Document selection
    var doc = activeDocument;

    // Layer selection
    var targetLayer= doc.activeLayer;

    targetLayer.applyGaussianBlur(100);

    targetLayer.adjustCurves([[0,0],[253,127]]);

    targetLayer.applyAddNoise(2, NoiseDistribution.GAUSSIAN, true);

}

makeDarkerNoisierBlurier();