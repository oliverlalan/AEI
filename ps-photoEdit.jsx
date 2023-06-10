#target photoshop

#include ae-metadata.jsx

// open a camera raw file returning the camera raw action desc
var filePath = "/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram Photos/Scripts/Test/2023-05-02_14-28-03-2.arw";
var workingPath = "/e/Temporal/";

// Load image settings
var image = loadImageFromPath(filePath);

// Create files
createAnimationJPEGs (image);


///////////////////////////////////////////////////////////////////////////////
// Function: createAnimationJPEGs
// Usage: Creates a set of xmp and jpg files using the interpolated
// Input: image, xmpMeta, frame
// Return: A frame jpg file has been created
///////////////////////////////////////////////////////////////////////////////
function createAnimationJPEGs (image) {

    // Load 
    var settings = image.settings;

    // Create a copy of the original file with the corresponding name.
    var xmpMeta = loadXMPMeta(image.xmpPath);
    var xmpMetaFrame = resetSettings(xmpMeta);

    // For each panel
    for (var panelKey in settings.panels){

        var panel = settings.panels[panelKey];

        for (var f = 0; f < panel.animation.swipeIn.keyFrames[0]; f++) {

            if (f == 0) {

                // Create new frame
                createFrameJPEG (image, xmpMetaFrame, f);

            } else {

                // Duplicate previous frame
                duplicatePreviousFrameJPEG (image, f);

            }



        }

        for (var f = panel.animation.swipeIn.keyFrames[0]; f < panel.animation.hold.keyFrames[1]; f++) {

            if (f == panel.animation.swipeIn.keyFrames[0]) {

                // Create new frame
                createFrameJPEG (image, xmpMetaFrame, f);

            } else {

                // Duplicate previous frame
                duplicatePreviousFrameJPEG (image, f);

            }

        }

        // For each group
        for (var groupKey in panel.groups) {

            var group = panel.groups[groupKey];

            for (var f = group.animation.swipeIn.keyFrames[0]; f < group.animation.hold.keyFrames[1]; f++) {

                if (f == group.animation.swipeIn.keyFrames[0]) {

                    // Create new frame
                    createFrameJPEG (image, xmpMetaFrame, f);

                } else {

                    // Duplicate previous frame
                    duplicatePreviousFrameJPEG (image, f);

                }

            }

            // For each frame between the animated keyFrames
            for (var f = group.animation.group.keyFrames[0]; f < group.animation.group.keyFrames[1]; f++) {

                // For each setting
                for (var settingKey in group.settings) {

                    var setting = group.settings[settingKey];

                    var newInterpolatedValue = f - group.animation.group.keyFrames[0];

                    // Update XMPMeta values
                    if ( setting.crsName.match("ToneCurvePV2012") ){

                        for (j=0; j<setting.settingValue.length; j++) {

                            xmpMetaFrame.setArrayItem(ns, setting.crsName, j+1, setting.interpolatedValues[j][0][newInterpolatedValue] + ", " + setting.interpolatedValues[j][1][newInterpolatedValue]);

                        }

                    } else {

                        xmpMetaFrame.setProperty(ns, setting.crsName, setting.interpolatedValues[newInterpolatedValue]);

                    }

                }

                // Create target file named acording to corresponding keyFrame and save it
                createFrameJPEG (image, xmpMetaFrame, f);

            }

        }

    }

}

///////////////////////////////////////////////////////////////////////////////
// Function: createFrameJPEG
// Usage: Creates a frame jpg file from an image
// Input: image, xmpMeta, frame
// Return: A frame jpg file has been created
///////////////////////////////////////////////////////////////////////////////
function createFrameJPEG (image, xmpMeta, frame) {

    // Create target file named acording to corresponding keyFrame and save it
    var xmpFramePath = workingPath + image.name + "/Source/" + frame + '.xmp';
    writeXMPFrameFile(xmpMeta, xmpFramePath);

    // Copy reference file
    var frameFilePath = workingPath + image.name + "/Source/" + frame + '.' + image.extension;
    var frameFile = new File(frameFilePath);

    // Duplicate the original file to the destination folder
    var referenceFile = new File(image.path);
    referenceFile.copy(frameFile);

    // Open the target file
    openCameraRaw(frameFilePath);

    // Save file
    var frameJPEGPath = workingPath + image.name + "/JPEG/" + frame + '.' + '.jpg';
    saveFileAsJPEG(frameJPEGPath);

    // Close file
    app.activeDocument.close( SaveOptions.DONOTSAVECHANGES );

    // Delete file
    frameFile.remove();

}

///////////////////////////////////////////////////////////////////////////////
// Function: duplicatePreviousFrameJPEG
// Usage: Duplicates the previous frame jpg
// Input: image, frame
// Return: previous frame jpg file has been duplicate
///////////////////////////////////////////////////////////////////////////////
function duplicatePreviousFrameJPEG (image, frame) {
                    
    // Copy reference file
    var frameFilePath = image.directory + "Animation/JPEG/" + image.name + "_" + frame + '.jpg';
    var frameFile = new File(frameFilePath);

    // Duplicate the previous the destination folder
    var previousFrameFilePath = image.directory + "Animation/JPEG/" + image.name + "_" + (frame - 1) + '.jpg';
    var previousFrameFile = new File(previousFrameFilePath);
    previousFrameFile.copy(frameFile);

}

///////////////////////////////////////////////////////////////////////////////
// Function: openCameraRaw
// Usage: Opens a Camera Raw file without using any dialog
// Input: filePath
// Return: file is now opened as active document
///////////////////////////////////////////////////////////////////////////////
function openCameraRaw ( filePath ) {
    
    var cameraRawParams = new Object();
    cameraRawParams.desc = undefined;
    cameraRawParams.useDescriptor = false;
    cameraRawParams.fileName = filePath;


    var keyNull = charIDToTypeID( 'null' );
    var keyAs = charIDToTypeID( 'As  ' );
    var adobeCameraRawID = stringIDToTypeID( "Adobe Camera Raw" );
    var desc = new ActionDescriptor();
    desc.putPath( keyNull, File( cameraRawParams.fileName ) );
    if ( cameraRawParams.desc != undefined && cameraRawParams.useDescriptor &&
            IsFileOneOfThese( cameraRawParams.fileName, gFilesForCameraRaw ) ) {
        desc.putObject( keyAs, adobeCameraRawID, cameraRawParams.desc );
    }

    var returnDesc = executeAction( charIDToTypeID( 'Opn ' ), desc, DialogModes.NO );
    if ( returnDesc.hasKey( keyAs ) ) {
        if ( returnDesc.hasKey( keyNull ) ) {
            cameraRawParams.fileName = returnDesc.getPath( keyNull ).toString();
            return true;
        }
    }
    return false;
}

///////////////////////////////////////////////////////////////////////////////
// Function: saveFileAsJPEG
// Usage: Save files as a jpg in the specified path
// Input: filePath
// Return: File is now saved as jpg in the specified path
///////////////////////////////////////////////////////////////////////////////
function saveFileAsJPEG ( filePath ) {

    var historyState = app.activeDocument.activeHistoryState;
    app.activeDocument.flatten();
    app.activeDocument.bitsPerChannel = BitsPerChannelType.EIGHT;
    RemoveAlphaChannels();
    ConvertTosRGBProfile();
    resizeImageToFitWidthOrHeight(app.activeDocument, 1080, 1920)

    exportPhotoAsJPEG( filePath, 10, true );

    app.activeDocument.activeHistoryState = historyState;

}

///////////////////////////////////////////////////////////////////////////////
// Function: exportPhotoAsJPEG
// Usage: Save files as a jpg with the specified parameters
// Input: fileName, quality, embedColorProfile
// Return: File is now saved as jpg with the specified parameters
///////////////////////////////////////////////////////////////////////////////
function exportPhotoAsJPEG ( fileName, quality, embedColorProfile ) {

	var jpegOptions = new JPEGSaveOptions();
	jpegOptions.quality = quality;
	jpegOptions.embedColorProfile = embedColorProfile;
	app.activeDocument.saveAs( File( fileName ), jpegOptions );

}

///////////////////////////////////////////////////////////////////////////////
// Function: RemoveAlphaChannels
// Usage: Remove all of the extra channels from the current document
// Input: <none> (must be an active document)
// Return: <none> activeDocument now has only component channels
///////////////////////////////////////////////////////////////////////////////
function RemoveAlphaChannels() {

	var channels = app.activeDocument.channels;
	var channelCount = channels.length - 1;
	while ( channels[channelCount].kind != ChannelType.COMPONENT ) {
		channels[channelCount].remove();
		channelCount--;
	}

}

///////////////////////////////////////////////////////////////////////////////
// Function: ConvertTosRGBProfile
// Usage: Convert to sRGB profile
// Input: <none> (must be an active document)
// Return: activeDocument is now in sRGB profile
///////////////////////////////////////////////////////////////////////////////
function ConvertTosRGBProfile() {

	app.activeDocument.convertProfile("sRGB IEC61966-2.1", Intent.RELATIVECOLORIMETRIC, true, true);

}

///////////////////////////////////////////////////////////////////////////////
// Function: writeXMPFrameFile
// Usage: Writes an XMP frame file using the xmpMeta object in the specified path
// Input: xmpMeta, filePath
// Return: xmp file is written in the given path
///////////////////////////////////////////////////////////////////////////////
function writeXMPFrameFile (xmpMeta, filePath) {

    var xmpFile = new File (filePath);
    xmpFile.open('w');
    xmpFile.encoding = 'UTF8';
    xmpFile.lineFeed = 'unix';
    xmpFile.write(xmpMeta.serialize());
    xmpFile.close();

}

///////////////////////////////////////////////////////////////////////////////
// Function: resizeImageToFitWidthOrHeight
// Usage: Resizes image so it fits either the target width or height
// Input: doc, targetWidth, targetHeight
// Return: activeDocument is now resized
///////////////////////////////////////////////////////////////////////////////
function resizeImageToFitWidthOrHeight(doc, targetWidth, targetHeight) {

    // Get the current dimensions of the image
    var currentWidth = doc.width.value;
    var currentHeight = doc.height.value;
    var currentAspectRatio = currentWidth / currentHeight;

    // Calculate the target aspect ratio
    var targetAspectRatio = targetWidth / targetHeight;

    // Calculate the new dimensions
    var newWidth, newHeight;

    if (currentAspectRatio > targetAspectRatio) {
        // Resize based on height
        newHeight = targetHeight;
        newWidth = targetHeight * currentAspectRatio;
    } else {
        // Resize based on width
        newWidth = targetWidth;
        newHeight = targetWidth / currentAspectRatio;
    }

    // Resize the image
    doc.resizeImage(newWidth, newHeight, null, ResampleMethod.BICUBIC);

}


function createAnimationVideo (image) {

}


// Create frame animation
// =======================================================
function createFrameAnimation() {
    var idmakeFrameAnimation = stringIDToTypeID( "makeFrameAnimation" );
    executeAction( idmakeFrameAnimation, undefined, DialogModes.NO );
}


// Create new frame
// =======================================================
function addFrameToAnimation() {
    var idDplc = charIDToTypeID( "Dplc" );
    var desc634 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref80 = new ActionReference();
        var idanimationFrameClass = stringIDToTypeID( "animationFrameClass" );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref80.putEnumerated( idanimationFrameClass, idOrdn, idTrgt );
    desc634.putReference( idnull, ref80 );
executeAction( idDplc, desc634, DialogModes.NO );
}


///////////////////////////////////////////////////////////////////////////////
// Function: resizeImageToFitWidthOrHeight
// Usage: Renders a video out of the images
// Input: doc, targetWidth, targetHeight
// Return: activeDocument is now resized
///////////////////////////////////////////////////////////////////////////////
function export2(directory, name2, ameFormatName, amePresetName, useDocumentSize, frameRate, manage, selectedFrames, quality, Z3DPrefHighQualityErrorThreshold) {
	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var descriptor2 = new ActionDescriptor();

	descriptor2.putPath( s2t( "directory" ), directory );
	descriptor2.putString( s2t( "name" ), name2 );
	descriptor2.putString( s2t( "ameFormatName" ), ameFormatName );
	descriptor2.putString( s2t( "amePresetName" ), amePresetName );
	descriptor2.putBoolean( s2t( "useDocumentSize" ), useDocumentSize );
	descriptor2.putDouble( s2t( "frameRate" ), frameRate );
	descriptor2.putEnumerated( s2t( "pixelAspectRatio" ), s2t( "pixelAspectRatio" ), s2t( "document" ));
	descriptor2.putEnumerated( s2t( "fieldOrder" ), s2t( "videoField" ), s2t( "preset" ));
	descriptor2.putBoolean( s2t( "manage" ), manage );
	descriptor2.putBoolean( s2t( "selectedFrames" ), selectedFrames );
	descriptor2.putEnumerated( s2t( "renderAlpha" ), s2t( "alphaRendering" ), s2t( "none" ));
	descriptor2.putInteger( s2t( "quality" ), quality );
	descriptor2.putInteger( s2t( "Z3DPrefHighQualityErrorThreshold" ), Z3DPrefHighQualityErrorThreshold );
	descriptor.putObject( s2t( "using" ), s2t( "videoExport" ), descriptor2 );
	executeAction( s2t( "export" ), descriptor, DialogModes.NO );
}

//call it like this
var minhapasta = File($.fileName).parent.fsName;
export2(new File( minhapasta ), 'myvideo.mp4', "H.264", "1_High Quality.epr", true, 23.976, true, true, 1, 5);
