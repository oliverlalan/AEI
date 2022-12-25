// Source: https://community.adobe.com/t5/photoshop-ecosystem-discussions/histogram-passed-and-drawn-into-a-layer-done/m-p/9581663

#target photoshop

// addHistogram(true, false, false, 135); // this draws a layer with a coloured 8bit RGB histogram 

// addHistogram(false, false, true, 135); //  this draws the Max(, , ) Luminosity RGB histogram (gets the max value of each channel)

// addHistogram(false, true, false, 135); // this draws a layer with 8bit Lightness channel Lab histogram 

addHistogram(false, false, false, 135); // this draws a layer with 8bit Luminosity RGB histogram 

///////////////////////////////  HISTOGRAM IN LAYER   ///////////////////////////////////

function addHistogram(RGB, Lab, MaxRGB, graphHeight) {

    ///////////////////////////////////////////////// createProgressWindow

    var createProgressWindow = function(title, message, hasCancelButton) {

      var win;

      if (title == null) title = "Work in progress";

      if (message == null) message = "Please wait...";

      if (hasCancelButton == null) hasCancelButton = false;

      win = new Window("palette", "" + title, undefined);

      win.bar = win.add("progressbar", {x: 20, y: 12, width: 300, height: 20 }, 0, 100);

      win.stMessage = win.add("statictext", { x: 10, y: 36, width: 320, height: 20 }, "" + message);

      win.stMessage.justify = 'center';  

      if (hasCancelButton) {

        win.cancelButton = win.add('button', undefined, 'Cancel');

        win.cancelButton.onClick = function() {

          win.close();

          throw new Error('User canceled the pre-processing!');

        };

      }

      this.reset = function(message) {

        win.bar.value = 0;

        win.stMessage.text = message;

        return win.update();

      };

      this.updateProgress = function(perc, message) {

        if (perc != null) win.bar.value = perc;

        if (message != null) win.stMessage.text = message;

        return win.update();

      };

      this.close = function() {

        return win.close();

      };

      win.center(win.parent);

      return win.show();

    };

    //

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

            var ww = activeDocument.width.as('px');

            var hh = activeDocument.height.as('px');

            var totalPixels = ww*hh;

            var totalPixels1Col = totalPixels/256;

            // 

            var pBar = new createProgressWindow("Histogram building...", "Please wait", false);

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

            // base transparent

            app.foregroundColor.rgb.red = 0;

            app.foregroundColor.rgb.green = 0;

            app.foregroundColor.rgb.blue = 0;

            //

            drawSelectionScreen (hX-2, hY+2, 258+hX, hY-322);

            // fill (filltype [, mode] [, opacity] [, preserveTransparency])  // filltype: SolidColor  |  mode: ColorBlendMode  |  opacity: [1..100] 

            app.activeDocument.selection.fill(app.foregroundColor, ColorBlendMode.SCREEN, 0, false); // background 

            activeDocument.selection.deselect();

            //

            var myHist = [];

            var maxY = 0;

            //

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

                    for ( i = 0; i <= 255; i++ ) {

                        var col = i+hX;

                        var YYY = Math.min(Math.floor(myHist[i]*hhGraph/totalPixels1Col), 320);

                        drawSelectionScreen (col, hY, col+1, hY-YYY);

                        //

                        var percent = Math.floor(((i+1)+(a*256))*100/768);

                        pBar.updateProgress (percent, activeDocument.componentChannels[a].name.toUpperCase() + " Channel " + percent+ " % completed");

                    }

                    // fill (filltype [, mode] [, opacity] [, preserveTransparency])  // filltype: SolidColor  |  mode: ColorBlendMode  |  opacity: [1..100] 

                    app.activeDocument.selection.fill(app.foregroundColor, ColorBlendMode.SCREEN, 100, false);

                    activeDocument.selection.deselect();

                }

            } else {

                app.foregroundColor.rgb.red = 255;

                app.foregroundColor.rgb.green = 255;

                app.foregroundColor.rgb.blue = 255;

                myHist = hL;

                // find maxY for normalizing graph

                for ( i = 0; i <= 255; i++ ) {

                     if (MaxRGB) {

                        if (Math.floor(Math.max(hR[i], hG[i], hB[i])) > maxY) maxY = Math.floor(Math.max(hR[i], hG[i], hB[i]));

                    } else {

                        if (Math.floor(myHist[i] > maxY)) maxY = Math.floor(myHist[i]);

                    }

                }

                for ( i = 0; i <= 255; i++ ) {

                    var col = i+hX;

                    if (MaxRGB) {

                        var YYY = Math.floor(Math.max(hR[i], hG[i], hB[i])*hhGraph/maxY);

                    } else {

                        var YYY = Math.floor(myHist[i]*hhGraph/maxY);

                    }

                    drawLineScreen (col, hY, col+1, hY-YYY, 2, 30);

                    //

                    var percent = Math.floor((i+1)*100/256);

                    pBar.updateProgress (percent, "Luminosity Channel " + percent+ " % completed");

                }

                // fill (filltype [, mode] [, opacity] [, preserveTransparency])  // filltype: SolidColor  |  mode: ColorBlendMode  |  opacity: [1..100] 

                // app.activeDocument.selection.fill(app.foregroundColor, ColorBlendMode.SCREEN, 100, false);

                // feather (by) |   by: UnitValue

                // app.activeDocument.selection.feather(UnitValue(0.3, 'px'));

                // stroke ( strokeColor [, width] [, location] [, mode] [, opacity] [, preserveTransparency])   //    width: number |   location: StrokeLocation    |   mode: ColorBlendMode   |   opacity: [1..100]    | preserveTransparency: boolean
                
                // app.activeDocument.selection.stroke(app.foregroundColor, 2, StrokeLocation.INSIDE, ColorBlendMode.NORMAL, 100, false);

                activeDocument.selection.deselect();

            }

            pBar.close();

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

    function drawSelectionScreen(x1, y1, x2, y2) {

        try {

            // SelectionType.SELECTEDAREA | DIMINISH | EXTEND | INTERSECT | REPLACE

            activeDocument.selection.select([[ x1, y1], [x2, y1], [x2, y2], [x1,y2]], SelectionType.EXTEND, 0, false);

        } catch(e) {}

    }

    function drawLineScreen(x1, y1, x2, y2, width, transparency) {

        try {

            var desc = new ActionDescriptor();

            var lineDesc = new ActionDescriptor();

            var startDesc = new ActionDescriptor();

            startDesc.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), x1 );

            startDesc.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), y1 );

            lineDesc.putObject( charIDToTypeID('Strt'), charIDToTypeID('Pnt '), startDesc );

            var endDesc = new ActionDescriptor();

            endDesc.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), x2 );

            endDesc.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), y2 );

            lineDesc.putObject( charIDToTypeID('End '), charIDToTypeID('Pnt '), endDesc );

            lineDesc.putUnitDouble( charIDToTypeID('Wdth'), charIDToTypeID('#Pxl'), width ); // 

            desc.putObject( charIDToTypeID('Shp '), charIDToTypeID('Ln  '), lineDesc );

            desc.putEnumerated( charIDToTypeID( "Md  " ), charIDToTypeID( "BlnM" ), charIDToTypeID( "Scrn" ) ); // mode: Screen 

            desc.putUnitDouble( charIDToTypeID( "Opct" ), charIDToTypeID( "#Prc" ), transparency ); // [0-100] transparency

            desc.putBoolean( charIDToTypeID('AntA'), false ); // important antialias should be false

            executeAction( charIDToTypeID('Draw'), desc, DialogModes.NO );

        } catch(e) {}

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