#target photoshop
#include defaultParameters.jsx
#include utils.jsx

// TODO Convert all photo parameters and reference doc to a function that returns an object
ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
var ns = XMPConst.NS_CAMERA_RAW //"http://ns.adobe.com/camera-raw-settings/1.0/"; // Found in xmp header

var docRef = app.activeDocument;
var docRefPath = docRef.path;
var docRefFullName = docRef.fullName.fullName;
var docRefName = refLayerName = docRef.name.substr(0, docRef.name.lastIndexOf('.'));
var docRefExtension = docRef.name.substr(docRef.name.lastIndexOf(".") + 1, docRef.name.length);


// Create a copy of the original file with the corresponding name.
sourceFile = new File(docRefFullName);
var targetFilePath = docRefPath + "/" + docRefName + '_unedited.' + docRefExtension;
targetFile = new File(targetFilePath);
sourceFile.copy(targetFile);

// Create a XMP file 
var xmpFile = new XMPFile (File(targetFile).fsName, XMPConst.FILE_UNKNOWN, XMPConst.OPEN_FOR_UPDATE);
xmpMeta = xmpFile.getXMP();

// Update values
xmpMeta.setProperty(ns, "Exposure2012", -0.05384925);


// Write xmp on file
if (xmpFile.canPutXMP( xmpMeta )) {
    xmpFile.putXMP( xmpMeta );
}

xmpFile.closeFile()
