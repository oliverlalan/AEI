// Source: https://community.adobe.com/t5/photoshop-ecosystem-discussions/histogram-passed-and-drawn-into-a-layer-done/m-p/9581663

#target photoshop

addHistograms(90, 225, 135, 225);

///////////////////////////////  HISTOGRAM IN LAYER   ///////////////////////////////////

function addHistograms(xPosition, yPosition, height, width) {

    addHistogram("Red",     xPosition,      yPosition,      height,     width);
    addHistogram("Green",   xPosition,      yPosition,      height,     width);
    addHistogram("Blue",    xPosition,      yPosition,      height,     width);

    activeDocument.artLayers.getByName ("Red histogram").visible = true;
    activeDocument.artLayers.getByName ("Green histogram").visible = true;

}

function addHistogram(histogramType, xPosition, yPosition, graphHeight, graphWidth) {

    // the other layer histograms, if exist, should be invisible so the reading is only on the pixels of the image itself

    if (getLayer("Red histogram")) activeDocument.artLayers.getByName ("Red histogram").visible = false;
    if (getLayer("Green histogram")) activeDocument.artLayers.getByName ("Green histogram").visible = false;
    if (getLayer("Blue histogram")) activeDocument.artLayers.getByName ("Blue histogram").visible = false;
    if (getLayer("Lum histogram")) activeDocument.artLayers.getByName ("Lum histogram").visible = false;
    if (getLayer("Lab histogram")) activeDocument.artLayers.getByName ("Lab histogram").visible = false;
    if (getLayer("MaxRGB histogram")) activeDocument.artLayers.getByName ("MaxRGB histogram").visible = false;

    var layerName = histogramType + " histogram"
    //

    if (!getLayer(layerName)) {

        // it works only on RGB images

        if (activeDocument.mode == DocumentMode.RGB) {

            // if the image is 16bit/channel or more it sets 8bits/channel before read the histogram

            if (!activeDocument.bitsPerChannel == BitsPerChannelType.EIGHT) activeDocument.bitsPerChannel = BitsPerChannelType.EIGHT;

            var wasHereLayer = activeDocument.activeLayer;

            var unitsAntes = app.preferences.rulerUnits;

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

            activeDocument.artLayers.add();

            activeDocument.activeLayer.name = layerName;

            activeDocument.activeLayer.move( activeDocument, ElementPlacement.PLACEATBEGINNING );

            activeDocument.activeLayer.blendMode = BlendMode.SCREEN; // blending mode "normal"

            activeDocument.activeLayer.opacity = 100; // opacity 100%

            //

            var myHist = [];

            var histogramPoints = [];

            var histogramHexColor = "FFFFFF";

            // find maxY for normalizing graph

            var maxY = 0;

            for ( i = 3; i <= 252; i++ ) {

                if (Math.floor(Math.max(hL[i], hR[i], hG[i], hB[i])) > maxY) maxY = Math.floor(Math.max(hL[i], hR[i], hG[i], hB[i]));

            }

            switch (histogramType) {
                case "Red":
                myHist = hR;
                fillEnabled = true;
                fill_hex = "c9430a";
                strokeEnabled = false;
                stroke_hex = "c9430a";
                break;

                case "Green":
                myHist = hG;
                fillEnabled = true;
                fill_hex = "19804c";
                strokeEnabled = false;
                stroke_hex = "19804c";
                break;

                case "Blue":
                myHist = hB;
                fillEnabled = true;
                fill_hex = "0097c2";
                strokeEnabled = false;
                stroke_hex = "0097c2";

                break;

                case "Lum":
                myHist = hL;
                fillEnabled = false;
                fill_hex = "FFFFFF";
                strokeEnabled = true;
                stroke_hex = "FFFFFF";

                break;

                case "Lab":
                myHist = hLab;
                fillEnabled = true;
                fill_hex = "FFFFFF";
                strokeEnabled = false;
                stroke_hex = "FFFFFF";
                break;

                case "MaxRGB":
                myHist = hL;
                fillEnabled = false;
                fill_hex = "FFFFFF";
                strokeEnabled = true;
                stroke_hex = "FFFFFF";
                break;

            }

            for ( i = 2; i <= 253; i++ ) {

                if (histogramType == "MaxRGB") {

                    // var YYY = Math.floor(Math.max(hR[i], hG[i], hB[i])*graphHeight/maxY);
                    var YYY = (Math.floor(Math.max(hR[i-2], hG[i-2], hB[i-2])*graphHeight/maxY) + Math.floor(Math.max(hR[i-1], hG[i-1], hB[i-1])*graphHeight/maxY) + Math.floor(Math.max(hR[i], hG[i], hB[i])*graphHeight/maxY) + Math.floor(Math.max(hR[i+1], hG[i+1], hB[i+1])*graphHeight/maxY) + Math.floor(Math.max(hR[i+2], hG[i+2], hB[i+2])*graphHeight/maxY)) / 5;

                } else {

                    // var YYY = Math.floor(myHist[i]*graphHeight/maxY);
                    var YYY = (Math.floor(myHist[i-2]*graphHeight/maxY) + Math.floor(myHist[i-1]*graphHeight/maxY) + Math.floor(myHist[i]*graphHeight/maxY) + Math.floor(myHist[i+1]*graphHeight/maxY)+ Math.floor(myHist[i+2]*graphHeight/maxY)) / 5;

                }

                YYY = Math.min(YYY, graphHeight);
                histogramPoints.push([i * graphWidth / 252, YYY]);

            }

            drawSmoothHistogram(histogramPoints, xPosition, yPosition, fillEnabled, fill_hex, strokeEnabled, stroke_hex, 2);

            // activeDocument.activeLayer = wasHereLayer;

            app.preferences.rulerUnits = unitsAntes;

        } else {

            alert("Must be an RGB image");

        }

    } else {

        alert("Already has created this '" + layerName + "' layer!");

        return;

    }

    function drawSmoothHistogram (histogramPoints, xPosition, yPosition, fillEnabled, fill_hex, strokeEnabled, stroke_hex, strokeWidth) {

        var histogramPathPoints = new Array();
        
        for (i = 0; i < histogramPoints.length; i++) {

            histogramPathPoints[i] = new PathPointInfo
            histogramPathPoints[i].anchor = Array(xPosition + histogramPoints[i][0], yPosition - histogramPoints[i][1])
            histogramPathPoints[i].kind = PointKind.SMOOTHPOINT
            histogramPathPoints[i].leftDirection = histogramPathPoints[i].anchor
            histogramPathPoints[i].rightDirection = histogramPathPoints[i].anchor
        }

        histogramPathPoints[histogramPoints.length] = new PathPointInfo
        histogramPathPoints[histogramPoints.length].anchor = Array(xPosition + graphWidth + 1, yPosition)
        histogramPathPoints[histogramPoints.length].kind = PointKind.SMOOTHPOINT
        histogramPathPoints[histogramPoints.length].leftDirection = histogramPathPoints[histogramPoints.length].anchor
        histogramPathPoints[histogramPoints.length].rightDirection = histogramPathPoints[histogramPoints.length].anchor

        histogramPathPoints[histogramPoints.length + 1] = new PathPointInfo
        histogramPathPoints[histogramPoints.length + 1].anchor = Array(xPosition + 2, yPosition)
        histogramPathPoints[histogramPoints.length + 1].kind = PointKind.SMOOTHPOINT
        histogramPathPoints[histogramPoints.length + 1].leftDirection = histogramPathPoints[histogramPoints.length + 1].anchor
        histogramPathPoints[histogramPoints.length + 1].rightDirection = histogramPathPoints[histogramPoints.length + 1].anchor

        histogramPathPoints[histogramPoints.length + 2] = new PathPointInfo
        histogramPathPoints[histogramPoints.length + 2].anchor = Array(xPosition + histogramPoints[0][0], yPosition - histogramPoints[0][1])
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

        pathSettings(fillEnabled, fill_hex, strokeEnabled, stroke_hex, strokeWidth);

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

    function pathSettings(fillEnabled, fill_hex, strokeEnabled, stroke_hex, strokeWidth){

        try {

            var f = new SolidColor();
            
            f.rgb.hexValue = fill_hex;

            var d = new ActionDescriptor();

            var r = new ActionReference();

            r.putEnumerated(stringIDToTypeID('contentLayer'), stringIDToTypeID('ordinal'), stringIDToTypeID('targetEnum'));

            d.putReference(stringIDToTypeID('null'), r);

            var d1 = new ActionDescriptor();

            var d2 = new ActionDescriptor();

            var d3 = new ActionDescriptor();

            d3.putDouble(stringIDToTypeID('red'),   f.rgb.red);

            d3.putDouble(stringIDToTypeID('green'), f.rgb.green);

            d3.putDouble(stringIDToTypeID('blue'),  f.rgb.blue);

            d2.putObject(stringIDToTypeID('color'), stringIDToTypeID('RGBColor'), d3);

            d1.putObject(stringIDToTypeID('fillContents'), stringIDToTypeID('solidColorLayer'), d2);

            d.putObject(stringIDToTypeID('to'), stringIDToTypeID('shapeStyle'), d1);

            executeAction(stringIDToTypeID('set'), d, DialogModes.NO);

        }   catch (e) { throw(e); }

        try {

            var f = new SolidColor();
            
            f.rgb.hexValue = histogramHexColor;

            var s = new SolidColor();

            s.rgb.hexValue = stroke_hex;

            var d = new ActionDescriptor();

            var r = new ActionReference();

            r.putEnumerated(stringIDToTypeID('contentLayer'), stringIDToTypeID('ordinal'), stringIDToTypeID('targetEnum'));

            d.putReference(stringIDToTypeID('null'), r);

            var d1 = new ActionDescriptor();

            var d2 = new ActionDescriptor();

            var d3 = new ActionDescriptor();

            var d4 = new ActionDescriptor();

            d4.putDouble(stringIDToTypeID('red'),   s.rgb.red);

            d4.putDouble(stringIDToTypeID('green'), s.rgb.green);

            d4.putDouble(stringIDToTypeID('blue'),  s.rgb.blue);

            d3.putObject(stringIDToTypeID('color'), stringIDToTypeID('RGBColor'), d4);

            d2.putObject(stringIDToTypeID('strokeStyleContent'), stringIDToTypeID('solidColorLayer'), d3);

            d2.putUnitDouble( stringIDToTypeID( "strokeStyleLineWidth" ), charIDToTypeID( "#Pxl" ), strokeWidth );

            d2.putBoolean(stringIDToTypeID('strokeEnabled'), strokeEnabled);

            d2.putBoolean( stringIDToTypeID( "fillEnabled" ), fillEnabled );

            d1.putObject(stringIDToTypeID('strokeStyle'), stringIDToTypeID('strokeStyle'), d2);

            d.putObject(stringIDToTypeID('to'), stringIDToTypeID('shapeStyle'), d1);

            executeAction(stringIDToTypeID('set'), d, DialogModes.NO);

        }   catch (e) { throw(e); }

    }

    function getLayer(layername) {

        var result = false;

        for (var a=0; a<activeDocument.artLayers.length ; a++) {

            if (String(activeDocument.artLayers[a].name) == layername) {

                result = true;

                break;

            }

        }

        return result;

    }

}