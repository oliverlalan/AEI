////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addHistograms(xPosition, yPosition, width, height, strokeWidth) {

    var redHistogram    = addHistogram("Red",     xPosition,      yPosition,      height,     width);
    setShapeSettings(true,   "c9430a",   false,  strokeColor, strokeWidth);
    activeDocument.activeLayer.blendMode = BlendMode.SCREEN;
    activeDocument.activeLayer.name = "Red Histogram";
    var greenHistogram  = addHistogram("Green",   xPosition,      yPosition,      height,     width);
    setShapeSettings(true,   "19804c",   false,  strokeColor, strokeWidth);
    activeDocument.activeLayer.blendMode = BlendMode.SCREEN;
    activeDocument.activeLayer.name = "Green Histogram";
    var blueHistogram   = addHistogram("Blue",    xPosition,      yPosition,      height,     width);
    setShapeSettings(true,   "0097c2",   false,  strokeColor, strokeWidth);
    activeDocument.activeLayer.blendMode = BlendMode.SCREEN;
    activeDocument.activeLayer.name = "Blue Histogram";

    var histogramsGroup = activeDocument.layerSets.add();
    histogramsGroup.name = 'Histograms';
    redHistogram.move(histogramsGroup, ElementPlacement.INSIDE);
    greenHistogram.move(histogramsGroup, ElementPlacement.INSIDE);
    blueHistogram.move(histogramsGroup, ElementPlacement.INSIDE);

    return histogramsGroup;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Source: https://community.adobe.com/t5/photoshop-ecosystem-discussions/histogram-passed-and-drawn-into-a-layer-done/m-p/9581663

function addHistogram(histogramType, xPosition, yPosition, histogramWidth, histogramHeight) {

    showSelectedLayer(refLayerName, true);

    var layerName = histogramType + " histogram"

    // it works only on RGB images
    if (activeDocument.mode == DocumentMode.RGB) {

        // if the image is 16bit/channel or more it sets 8bits/channel before read the histogram
        if (!activeDocument.bitsPerChannel == BitsPerChannelType.EIGHT) activeDocument.bitsPerChannel = BitsPerChannelType.EIGHT;
        app.preferences.rulerUnits = Units.PIXELS; // importante
        activeDocument.quickMaskMode = false;
        activeDocument.selection.deselect();

        // read histogram:
        var hL = activeDocument.histogram;
        var hR = activeDocument.channels["Red"].histogram;
        var hG = activeDocument.channels["Green"].histogram;
        var hB = activeDocument.channels["Blue"].histogram;

        if (histogramType == "Lab") {

            activeDocument.changeMode (ChangeMode.LAB);
            var hLab = activeDocument.channels["Lightness"].histogram;
            activeDocument.changeMode (ChangeMode.RGB);

        }

        // add layer
        // activeDocument.artLayers.add();
        // activeDocument.activeLayer.name = layerName;
        // activeDocument.activeLayer.move( activeDocument, ElementPlacement.PLACEATBEGINNING );
        // activeDocument.activeLayer.opacity = 100; // opacity 100%

        //

        var myHist = [];
        var histogramPoints = [];

        // find maxY for normalizing graph

        var maxY = 0;

        for ( i = 3; i <= 252; i++ ) {

            if (Math.floor(Math.max(hL[i], hR[i], hG[i], hB[i])) > maxY) maxY = Math.floor(Math.max(hL[i], hR[i], hG[i], hB[i]));

        }

        switch (histogramType) {
            case "Red":
            myHist = hR;
            break;

            case "Green":
            myHist = hG;
            break;

            case "Blue":
            myHist = hB;
            break;

            case "Lum":
            myHist = hL;
            break;

            case "Lab":
            myHist = hLab;
            break;

            case "MaxRGB":
            myHist = hL;
            break;

        }

        for ( i = 2; i <= 253; i++ ) {

            if (histogramType == "MaxRGB") {

                // var YYY = Math.floor(Math.max(hR[i], hG[i], hB[i])*histogramHeight/maxY);
                var YYY = (Math.floor(Math.max(hR[i-2], hG[i-2], hB[i-2])*histogramHeight/maxY) + Math.floor(Math.max(hR[i-1], hG[i-1], hB[i-1])*histogramHeight/maxY) + Math.floor(Math.max(hR[i], hG[i], hB[i])*histogramHeight/maxY) + Math.floor(Math.max(hR[i+1], hG[i+1], hB[i+1])*histogramHeight/maxY) + Math.floor(Math.max(hR[i+2], hG[i+2], hB[i+2])*histogramHeight/maxY)) / 5;

            } else {

                // var YYY = Math.floor(myHist[i]*histogramHeight/maxY);
                var YYY = (Math.floor(myHist[i-2]*histogramHeight/maxY) + Math.floor(myHist[i-1]*histogramHeight/maxY) + Math.floor(myHist[i]*histogramHeight/maxY) + Math.floor(myHist[i+1]*histogramHeight/maxY)+ Math.floor(myHist[i+2]*histogramHeight/maxY)) / 5;

            }

            YYY = Math.min(YYY, histogramHeight);
            histogramPoints.push([i * histogramWidth / 252, YYY]);

        }

        showAllLayers();

        drawSmoothHistogram(histogramPoints, xPosition, yPosition + histogramHeight);

        return app.activeDocument.activeLayer;

    } else {

        alert("Must be an RGB image");

    }

    function drawSmoothHistogram (histogramPoints, xPosition, yPosition) {

        var histogramPathPoints = new Array();
        
        for (i = 0; i < histogramPoints.length; i++) {

            histogramPathPoints[i] = new PathPointInfo
            histogramPathPoints[i].anchor = Array(xPosition + histogramPoints[i][0] - 1, yPosition - histogramPoints[i][1])
            histogramPathPoints[i].kind = PointKind.SMOOTHPOINT
            histogramPathPoints[i].leftDirection = histogramPathPoints[i].anchor
            histogramPathPoints[i].rightDirection = histogramPathPoints[i].anchor
        }

        histogramPathPoints[histogramPoints.length] = new PathPointInfo
        histogramPathPoints[histogramPoints.length].anchor = Array(xPosition + histogramWidth, yPosition)
        histogramPathPoints[histogramPoints.length].kind = PointKind.SMOOTHPOINT
        histogramPathPoints[histogramPoints.length].leftDirection = histogramPathPoints[histogramPoints.length].anchor
        histogramPathPoints[histogramPoints.length].rightDirection = histogramPathPoints[histogramPoints.length].anchor

        histogramPathPoints[histogramPoints.length + 1] = new PathPointInfo
        histogramPathPoints[histogramPoints.length + 1].anchor = Array(xPosition + 1, yPosition)
        histogramPathPoints[histogramPoints.length + 1].kind = PointKind.SMOOTHPOINT
        histogramPathPoints[histogramPoints.length + 1].leftDirection = histogramPathPoints[histogramPoints.length + 1].anchor
        histogramPathPoints[histogramPoints.length + 1].rightDirection = histogramPathPoints[histogramPoints.length + 1].anchor

        histogramPathPoints[histogramPoints.length + 2] = new PathPointInfo
        histogramPathPoints[histogramPoints.length + 2].anchor = Array(xPosition + histogramPoints[0][0] - 1, yPosition - histogramPoints[0][1])
        histogramPathPoints[histogramPoints.length + 2].kind = PointKind.SMOOTHPOINT
        histogramPathPoints[histogramPoints.length + 2].leftDirection = histogramPathPoints[histogramPoints.length + 2].anchor
        histogramPathPoints[histogramPoints.length + 2].rightDirection = histogramPathPoints[histogramPoints.length + 2].anchor
 

        // Path definition
        var histogramCurvePathArray = new SubPathInfo()
        histogramCurvePathArray.operation = ShapeOperation.SHAPEXOR
        histogramCurvePathArray.closed = false
        histogramCurvePathArray.entireSubPath = histogramPathPoints;  
    
        //create the path item
        var myPathItem = activeDocument.pathItems.add("Histogram", [histogramCurvePathArray])
        var currentPathItem = app.activeDocument.pathItems.getByName("Histogram");
        convertPathtoShape();
        myPathItem.remove();

    }

}
