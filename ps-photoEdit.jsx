#target photoshop

// Libraries
#include ae-metadata.jsx

// Paths and files
var filePath = "/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram Photos/Scripts/Test/2023-05-02_14-28-03-2.arw";
var workingPath = "/e/Temporal/";
var image = loadImageFromPath(filePath);

// Calls
createPhotoEditVideo (image);


///////////////////////////////////////////////////////////////////////////////
// Function: resizeImageToFitWidthOrHeight
// Usage: Renders a video out of the images
// Input: doc, targetWidth, targetHeight
// Return: activeDocument is now resized
///////////////////////////////////////////////////////////////////////////////
function createPhotoEditVideo (image) {

    // Create files
    createAnimationJPEGs (image);

    // Create animation
    createFrameAnimationDocument (image);

    //call it like this
    exportVideo (image);

}



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
                createFrameJPEG (image, xmpMetaFrame, f, false);

            } else {

                // Duplicate previous frame
                duplicatePreviousFrameJPEG (image, f);

            }



        }

        for (var f = panel.animation.swipeIn.keyFrames[0]; f < panel.animation.hold.keyFrames[1]; f++) {

            if (f == panel.animation.swipeIn.keyFrames[0]) {

                // Create new frame
                createFrameJPEG (image, xmpMetaFrame, f, false);

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
                    createFrameJPEG (image, xmpMetaFrame, f, false);

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
                createFrameJPEG (image, xmpMetaFrame, f, false);

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
function createFrameJPEG (image, xmpMeta, frame, referenceFrame) {

    // Create xmp file named acording to corresponding keyFrame and save it
    var xmpFrameDirectory = getDirectory(workingPath + image.name + "/Source/");
    var xmpFramePath = xmpFrameDirectory.fullName + "/" + frame + '.xmp';
    var xmpFrameFile = writeXMPFrameFile(xmpMeta, xmpFramePath);

    // Create a copy of the reference file
    var referenceFile = new File(image.path);
    var frameFileDirectory = getDirectory(workingPath + image.name + "/Source/");
    var frameFilePath = frameFileDirectory.fullName + "/" + frame + '.' + image.extension;
    var frameFile = new File(frameFilePath);
    referenceFile.copy(frameFile);

    // Open the target file
    openCameraRaw(frameFilePath);

    // Save file
    var frameJPEGDirectory = getDirectory(workingPath + image.name + "/JPEG/");
    var frameJPEGPath = frameJPEGDirectory.fullName + "/" + frame + '.jpg';
    var frameJPEGFile = new File(frameJPEGPath);
    saveFileAsJPEG(frameJPEGFile);

    // Close file
    app.activeDocument.close( SaveOptions.DONOTSAVECHANGES );

    // Delete file if is not reference
    if( !referenceFrame) {
        xmpFrameFile.remove();
        frameFile.remove();
    }

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

    return xmpFile;

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
function saveFileAsJPEG ( file ) {

    // var historyState = app.activeDocument.activeHistoryState;
    app.activeDocument.flatten();
    app.activeDocument.bitsPerChannel = BitsPerChannelType.EIGHT;
    RemoveAlphaChannels();
    ConvertTosRGBProfile();
    resizeImageToFitWidthOrHeight(app.activeDocument, 1080, 1920)

    exportPhotoAsJPEG( file, 10, true );

    // app.activeDocument.activeHistoryState = historyState;

}

///////////////////////////////////////////////////////////////////////////////
// Function: exportPhotoAsJPEG
// Usage: Save files as a jpg with the specified parameters
// Input: fileName, quality, embedColorProfile
// Return: File is now saved as jpg with the specified parameters
///////////////////////////////////////////////////////////////////////////////
function exportPhotoAsJPEG ( file, quality, embedColorProfile ) {

	var jpegOptions = new JPEGSaveOptions();
	jpegOptions.quality = quality;
	jpegOptions.embedColorProfile = embedColorProfile;
	app.activeDocument.saveAs( file, jpegOptions );

}

///////////////////////////////////////////////////////////////////////////////
// Function: duplicatePreviousFrameJPEG
// Usage: Duplicates the previous frame jpg
// Input: image, frame
// Return: previous frame jpg file has been duplicate
///////////////////////////////////////////////////////////////////////////////
function duplicatePreviousFrameJPEG (image, frame) {
                    
    // Copy reference file
    var frameJPEGDirectory = getDirectory(workingPath + image.name + "/JPEG/");
    var frameJPEGPath = frameJPEGDirectory.fullName + "/" + frame + '.jpg';
    var frameJPEGFile = new File(frameJPEGPath);

    // Duplicate the previous the destination folder
    var previousFrameFileDirectory = getDirectory(workingPath + image.name + "/JPEG/");
    var previousFrameFilePath = previousFrameFileDirectory.fullName + "/" + (frame - 1) + '.jpg';
    var previousFrameFile = new File(previousFrameFilePath);
    previousFrameFile.copy(frameJPEGFile);

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

///////////////////////////////////////////////////////////////////////////////
// Function: createFrameAnimationDocument
// Usage: Creates a frame animation document importing all the frame JPEGs
// Input: image
// Return: A frame animation document is created
///////////////////////////////////////////////////////////////////////////////
function createFrameAnimationDocument(image) {

    // Path
    var framesFolderDirectory = workingPath + image.name + "/JPEG/";
    var framesFolder = getDirectory(framesFolderDirectory);
    var frameFilesList = framesFolder.getFiles();

    // Create a new working document with the dimensions of the first image if it does not exist yet
    var animationDocumentName = image.name + "_0-" + image.settings.duration;

    for ( var frame = 0; frame < frameFilesList.length; frame++ ) {

        var frameFile = new File(frameFilesList[frame])

        // Create Frame Animation if first frame. Else, add files as frames
        if ( frame == 0 ) {

            // Get dimensions
            var frameDocument = app.open(frameFile);
        
            var docWidth = frameDocument.width;
            var docHeight = frameDocument.height;
            var docResolution = frameDocument.resolution;

            frameDocument.close(SaveOptions.DONOTSAVECHANGES);

            // Create a new video timeline
            var animationDocument = app.documents.add(docWidth, docHeight, docResolution, animationDocumentName);

            // Place frame image as layer 
            var frameLayer = addFile (frameFile);

            // Create a frame animation
            makeFrameAnimation();

        } else {

            // Place frame image as layer 
            var frameLayer = addFile (frameFile);

        }
        
    }

    // Iterate over all frames and show each
    for ( var frame = 0; frame < frameFilesList.length; frame++ ) {

        // Create new frame 
        addFrameToAnimation();

        // Select frame
        selectAnimationFrame (frame);

        // Only show that frame
        showSelectedLayer( frame, true);

    }

}

///////////////////////////////////////////////////////////////////////////////
// Function: makeFrameAnimation
// Usage: Creates a frame animation in the active document
// Input: <none>
// Return: Frame animation created for the current document
///////////////////////////////////////////////////////////////////////////////
function makeFrameAnimation() {

    var idmakeFrameAnimation = stringIDToTypeID( "makeFrameAnimation" );
    executeAction( idmakeFrameAnimation, undefined, DialogModes.NO );

    var idsetd = charIDToTypeID( "setd" );
        var desc1577 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref153 = new ActionReference();
            var idLyr = charIDToTypeID( "Lyr " );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idTrgt = charIDToTypeID( "Trgt" );
            ref153.putEnumerated( idLyr, idOrdn, idTrgt );
        desc1577.putReference( idnull, ref153 );
        var idT = charIDToTypeID( "T   " );
            var desc1578 = new ActionDescriptor();
            var idanimationPropagate = stringIDToTypeID( "animationPropagate" );
            desc1578.putBoolean( idanimationPropagate, false );
        var idLyr = charIDToTypeID( "Lyr " );
        desc1577.putObject( idT, idLyr, desc1578 );
    executeAction( idsetd, desc1577, DialogModes.NO );

}

///////////////////////////////////////////////////////////////////////////////
// Function: getDirectory
// Usage: Checks if the input directory exists. If not, creates it.
// Input: directoryPath
// Return: directory Folder file
///////////////////////////////////////////////////////////////////////////////
function getDirectory (directoryPath) {

    // Create a new File object for the directory
    var directory = new Folder(directoryPath);

    // Check if the directory already exists
    if (!directory.exists) {
        // Create the directory if it doesn't exist
        directory.create();
    }

    return directory;

}

///////////////////////////////////////////////////////////////////////////////
// Function: addFile
// Usage: Places the file as layer in the activeDocument
// Input: file
// Return: Returns the layer places from the input file
///////////////////////////////////////////////////////////////////////////////
function addFile (file) {

    var desc = new ActionDescriptor();
    desc.putPath(charIDToTypeID('null'), file);
    desc.putUnitDouble(charIDToTypeID("Scl "), charIDToTypeID("#Prc"), 100);
    executeAction(charIDToTypeID('Plc '), desc, DialogModes.NO);

    return app.activeDocument.activeLayer;

}

///////////////////////////////////////////////////////////////////////////////
// Function: addFrameToAnimation
// Usage: Creates a new frame to the frame animation of the current document
// Input: <none>
// Return: New frame created from the one selected
///////////////////////////////////////////////////////////////////////////////
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
// Function: selectAnimationFrame
// Usage: Selects the frame by its number
// Input: frameNumber
// Return: The corresponding frames is returned
///////////////////////////////////////////////////////////////////////////////
function selectAnimationFrame (frameNumber) {

    var idslct = charIDToTypeID( "slct" );
        var desc307 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref32 = new ActionReference();
            var idanimationFrameClass = stringIDToTypeID( "animationFrameClass" );
            ref32.putIndex( idanimationFrameClass, frameNumber + 1 );
        desc307.putReference( idnull, ref32 );
    executeAction( idslct, desc307, DialogModes.NO );

}

///////////////////////////////////////////////////////////////////////////////
// Function: showSelectedLayer
// Usage: Show the selected layer
// Input: layerName, showOnlyThisLayer
// Return: A frame jpg file has been created
///////////////////////////////////////////////////////////////////////////////
function showSelectedLayer( layerName, showOnlyThisLayer) {

    var actionDescriptor = new ActionDescriptor();
        var layerDescriptor = new ActionList();
            var reference = new ActionReference();
            if(layerName) {
                reference.putName( charIDToTypeID( "Lyr " ), layerName );
            }   else{
                reference.putEnumerated( charIDToTypeID( "Lyr " ), stringIDToTypeID("ordinal"), charIDToTypeID( "Trgt" ) );
            }
            layerDescriptor.putReference( reference );
        actionDescriptor.putList( stringIDToTypeID("null"), layerDescriptor );
    if(showOnlyThisLayer == true) {
        actionDescriptor.putBoolean( charIDToTypeID( "TglO" ), true );
    }
    
    try{
        executeAction( charIDToTypeID( "Shw " ), actionDescriptor, DialogModes.NO );
    } catch(e) {}
    
}

///////////////////////////////////////////////////////////////////////////////
// Function: exportVideo
// Usage: Renders a video 
// Input: image
// Return: Video has been created
///////////////////////////////////////////////////////////////////////////////
function exportVideo(image) {

    // Parameters
    var videoDirectory = getDirectory(image.path + "/Video/");
    var videoName = image.name + "_0-" + image.settings.duration + ".mp4";
    var ameFormatName = "H.264";
    var amePresetName = "1_High Quality.epr";
    var useDocumentSize = true;
    var frameRate = 30;
    var manage = true;
    var selectedFrames = true;
    var quality = 1;
    var Z3DPrefHighQualityErrorThreshold = 5;

    var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var descriptor2 = new ActionDescriptor();

	descriptor2.putPath( s2t( "directory" ), videoDirectory );
	descriptor2.putString( s2t( "name" ), videoName );
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
