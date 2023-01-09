// Source: https://community.adobe.com/t5/photoshop-ecosystem-discussions/histogram-passed-and-drawn-into-a-layer-done/m-p/9581663

#target photoshop

// addHistogram(true, false, false, 135); // this draws a layer with a coloured 8bit RGB histogram 

// addHistogram(false, false, true, 135); //  this draws the Max(, , ) Luminosity RGB histogram (gets the max value of each channel)

// addHistogram(false, true, false, 135); // this draws a layer with 8bit Lightness channel Lab histogram 

addHistogram(false, false, false, 135); // this draws a layer with 8bit Luminosity RGB histogram 

///////////////////////////////  HISTOGRAM IN LAYER   ///////////////////////////////////

function addHistogram(RGB, Lab, MaxRGB, graphHeight) {

    // the other layer histograms, if exist, should be invisible so the reading is only on the pixels of the image itself

    if (getLayer("RGB histogram")) activeDocument.artLayers.getByName ("RGB histogram").visible = false;

    if (getLayer("Lightness Lab histogram")) activeDocument.artLayers.getByName ("Lightness Lab histogram").visible = false;

    if (getLayer("Luminosity RGB")) activeDocument.artLayers.getByName ("Luminosity RGB").visible = false;

    if (getLayer("Luminosity Max")) activeDocument.artLayers.getByName ("Luminosity Max").visible = false;

    //

    var layerName = (RGB) ? "RGB histogram" : ((Lab) ? "Lightness Lab histogram" : ((MaxRGB) ? "Luminosity Max" : "Luminosity RGB"));  

    //

    if (!getLayer(layerName)) {

        // it works only on RGB images

        if (activeDocument.mode == DocumentMode.RGB) {

            // if the image is 16bit/channel or more it sets 8bits/channel before read the histogram

            if (!activeDocument.bitsPerChannel == BitsPerChannelType.EIGHT) activeDocument.bitsPerChannel = BitsPerChannelType.EIGHT;

            var wasHereLayer = activeDocument.activeLayer;

            var unitsAntes = app.preferences.rulerUnits;

            var foregroundPreviousColor = app.foregroundColor;

            app.preferences.rulerUnits = Units.PIXELS; // importante

            activeDocument.quickMaskMode = false;

            activeDocument.selection.deselect();

            //

            // read histogram:

            var hL = activeDocument.histogram;

            var hR = activeDocument.channels["Red"].histogram;

            var hG = activeDocument.channels["Green"].histogram;

            var hB = activeDocument.channels["Blue"].histogram;

            // if you want the Luminosity of Lab, export it to Lab, read it, and revert it to RGB

            if (Lab) {

                activeDocument.changeMode (ChangeMode.LAB);

                // read Lightness channel histogram of Lab 

                var hL = activeDocument.channels["Lightness"].histogram;

                // revert to RGB

                activeDocument.changeMode (ChangeMode.RGB);

            } else {

                // read Luminosity composite channel histogram of RGB 

                var hL = activeDocument.histogram;

            }

            // 

            activeDocument.artLayers.add();

            activeDocument.activeLayer.name = layerName;

            activeDocument.activeLayer.move( activeDocument, ElementPlacement.PLACEATBEGINNING );

            activeDocument.activeLayer.blendMode = BlendMode.NORMAL; // blending mode "normal"

            activeDocument.activeLayer.opacity = 100; // opacity 100%

            //

            var hhGraph = graphHeight;

            var hY = 400; // base y of graph

            var hX = 100; // base x of graph


            var myHist = [];

            var histogramPoints = [];

            //

            // find maxY for normalizing graph

            var maxY = 0;

            for ( i = 1; i <= 254; i++ ) {

                if (Math.floor(Math.max(hL[i], hR[i], hG[i], hB[i])) > maxY) maxY = Math.floor(Math.max(hL[i], hR[i], hG[i], hB[i]));

            }

            if (RGB) {

                for (var a in activeDocument.componentChannels) {

                    //  criar as 3 cores R, G e B e o graph da cada uma

                    (a==0) ? app.foregroundColor.rgb.red = 255 : app.foregroundColor.rgb.red = 0;

                    (a==1) ? app.foregroundColor.rgb.green = 255 : app.foregroundColor.rgb.green = 0;

                    (a==2) ? app.foregroundColor.rgb.blue = 255 : app.foregroundColor.rgb.blue = 0;

                    // 

                    if (a==0) myHist = hR;

                    if (a==1) myHist = hG;

                    if (a==2) myHist = hB;

                    //

                    for ( i = 2; i <= 253; i++ ) {

                        var col = i+hX;

                        var YYY = Math.floor(myHist[i]*hhGraph/maxY);

                        histogramPoints.push([i, YYY]);

                    }

                    drawSmoothHistogram(histogramPoints, 360, 360);

                }

            } else {

                app.foregroundColor.rgb.red = 255;

                app.foregroundColor.rgb.green = 255;

                app.foregroundColor.rgb.blue = 255;

                myHist = hL;


                for ( i = 0; i <= 255; i++ ) {

                    var col = i+hX;

                    if (MaxRGB) {

                        var YYY = Math.floor(Math.max(hR[i], hG[i], hB[i])*hhGraph/maxY);

                    } else {

                        var YYY = Math.floor(myHist[i]*hhGraph/maxY);
                        // var YYY = (Math.floor(myHist[i-2]*hhGraph/maxY) + Math.floor(myHist[i-1]*hhGraph/maxY) + Math.floor(myHist[i]*hhGraph/maxY) + Math.floor(myHist[i+1]*hhGraph/maxY)+ Math.floor(myHist[i+2]*hhGraph/maxY)) / 5;

                        
                        // Smooth verstion 
                        histogramPoints.push([i, YYY]);

                    }



                    // drawSelectionScreen (col, hY, col+1, hY-YYY);

                    //

                    var percent = Math.floor((i+1)*100/256);

                    pBar.updateProgress (percent, "Luminosity Channel " + percent+ " % completed");

                }


                drawSmoothHistogram(histogramPoints, 360, 360);



            }

            // activeDocument.activeLayer = wasHereLayer;

            app.preferences.rulerUnits = unitsAntes;

            app.foregroundColor = foregroundPreviousColor;

        } else {

            alert("Must be an RGB image");

        }

    } else {

        alert("Already has created this '" + layerName + "' layer!");

        return;

    }

    function drawSmoothHistogram (histogramPoints, xPosition, yPosition, c_r, c_g, c_b) {
        
        // Path definition
        var histogramCurvePathArray = new Array();

        for (i = 0; i < histogramPoints.length - 1; i++) {

            var histogramCurveStartIndex = i;
            var histogramCurveEndIndex = histogramCurveStartIndex + 1; 

            var lineArray = new Array()
            lineArray[0] = new PathPointInfo
            lineArray[0].anchor = Array(xPosition + histogramPoints[histogramCurveStartIndex][0], yPosition - histogramPoints[histogramCurveStartIndex][1])
            lineArray[0].kind = PointKind.SMOOTHPOINT
            lineArray[0].leftDirection = lineArray[0].anchor
            lineArray[0].rightDirection = lineArray[0].anchor
            lineArray[1] = new PathPointInfo
            lineArray[1].anchor = Array(xPosition + histogramPoints[histogramCurveEndIndex][0] , yPosition - histogramPoints[histogramCurveEndIndex][1])
            lineArray[1].kind = PointKind.SMOOTHPOINT
            lineArray[1].leftDirection = lineArray[1].anchor
            lineArray[1].rightDirection = lineArray[1].anchor

            histogramCurvePathArray[i] = new SubPathInfo()
            histogramCurvePathArray[i].operation = ShapeOperation.SHAPEXOR
            histogramCurvePathArray[i].closed = false
            histogramCurvePathArray[i].entireSubPath = lineArray

        }
    
        //create the path item
        var myPathItem = activeDocument.pathItems.add("Histogram", histogramCurvePathArray)

        var currentPathItem = app.activeDocument.pathItems.getByName("Histogram");

        convertPathtoShape();

        setStroke (2, c_r, c_g, c_b);

        // app.activeDocument.activeLayer.vectorMaskFeather = strokeWidth * 0.1;
        
        myPathItem.remove();


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

    function setStroke(strokeWidth, c_r, c_g, c_b){
            var desc3 = new ActionDescriptor();
            var ref1 = new ActionReference();
            ref1.putEnumerated( stringIDToTypeID( "contentLayer" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
            desc3.putReference( charIDToTypeID( "null" ), ref1 );
                var desc4 = new ActionDescriptor();
                    var desc5 = new ActionDescriptor();
                    desc5.putUnitDouble( stringIDToTypeID( "strokeStyleLineWidth" ), charIDToTypeID( "#Pxl" ), strokeWidth );
                        var desc6 = new ActionDescriptor();
                            var desc7 = new ActionDescriptor();
                            desc7.putDouble( charIDToTypeID( "Rd  " ), c_r );
                            desc7.putDouble( charIDToTypeID( "Grn " ), c_g );
                            desc7.putDouble( charIDToTypeID( "Bl  " ), c_b );
                        desc6.putObject( charIDToTypeID( "Clr " ), charIDToTypeID( "RGBC" ), desc7 );
                    desc5.putObject( stringIDToTypeID( "strokeStyleContent" ), stringIDToTypeID( "solidColorLayer" ), desc6 );
                    desc5.putInteger( stringIDToTypeID( "strokeStyleVersion" ), 2 );
                    desc5.putBoolean( stringIDToTypeID( "strokeEnabled" ), true );
                    desc5.putBoolean( stringIDToTypeID( "fillEnabled" ), false );
                desc4.putObject( stringIDToTypeID( "strokeStyle" ), stringIDToTypeID( "strokeStyle" ), desc5 );
            desc3.putObject( charIDToTypeID( "T   " ), stringIDToTypeID( "shapeStyle" ), desc4 );
        executeAction( charIDToTypeID( "setd" ), desc3, DialogModes.NO );
    }

    //////////////////////////////////

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