//Call
// createInterpolatedFiles ([exposure, contrast, highlights, shadows, whites, blacks]);

// Photo Path
#include ae-metadata.jsx;
var photoPath = "/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram Photos/Scripts/Test/2022-11-23_13-19-00.xmp";

// Load image settings
var image = loadImageFromPath(photoPath);

// Create dashboard and position it
var dashboardData = image.settings;


createInterpolatedFiles(image);


var x = 3;


function createInterpolatedFiles (image) {

    // Where images will be created
    var targetDirectory = image.directory + "Animation/";

    // Load 
    var settings = image.settings;

    // Create a copy of the original file with the corresponding name.
    var xmpMeta = loadXMPMeta(image.path);
    var xmpMetaReference = resetSettings(xmpMeta);

    // For each panel
    for (var panelKey in settings.panels){

        var panel = settings.panels[panelKey];

        // For each group
        for (var groupKey in panel.groups) {

            var group = panel.groups[groupKey];

            // For each frame between the animated keyFrames
            for (var f = group.keyFrames[0]; f < group.keyFrames[1]; f++) {

                // For each setting
                for (var settingKey in group.settings) {

                    var setting = group.settings[settingKey];

                    var newInterpolatedValue = f - group.keyFrames[0];

                    // Update XMPMeta values
                    if ( setting.crsName.match("ToneCurvePV2012") ){

                        for (j=0; j<setting.settingValue.length; j++) {

                            xmpMetaReference.setArrayItem(ns, setting.crsName, j+1, setting.settingValue[j][0] + ", " + setting.settingValue[j][1]);

                        }

                    } else {

                        xmpMetaReference.setProperty(ns, setting.crsName, setting.interpolatedValues[newInterpolatedValue]);

                    }

                }

                // Create target file named acording to corresponding keyFrame and save it
                var targetFilePath = targetDirectory + image.name + "_" + f + '.' + image.extension;
                var xmpFile = new File (targetFilePath);
                xmpFile.open('w');
                xmpFile.encoding = 'UTF8';
                xmpFile.lineFeed = 'unix';
                xmpFile.write(xmpMetaReference.serialize());
                xmpFile.close();

            }

        }

    }

}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to update the value of a given setting of an xmpMetaObject


function updateXMPSetting(xmpMetaObject, settingName, newSettingValue) {

    if ( settingName.crsName.match("ToneCurvePV2012") ){

        for (j=0; j<settingName.settingValue.length; j++) {

            xmpMetaObject.setArrayItem(ns, settingName.crsName, j+1, newSettingValue[0] + ", " + newSettingValue[1]);

        }

    } else {

        xmpMetaObject.setProperty(ns, settingName.crsName, newSettingValue);

    }

    return xmpMetaObject;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pending

function updateXMPSettingToNextInterpolatedValue(xmpMetaObject, settingName) {

    var currentIndex = settingName.interpolatedValues.indexOf(settingName.currentValue);
    settingName.currentValue = settingName.interpolatedValues[currentIndex + 1];
}





















// function createInterpolatedFiles (image, settingsArray) {

//     var settings = image.settings;

    
//     for (step = 0; step < interpolationSteps; step ++) {

//         // Create a copy of the original file with the corresponding name.
//         sourceFile = new File(image.path);
//         var targetFilePath = image.folder + "Animation/" + image.name + "_" + step + '.' + image.extension;
//         targetFile = new File(targetFilePath);
//         sourceFile.copy(targetFile);

//         // Create a XMP file 
//         var xmpFile = new XMPFile (File(targetFile).fsName, XMPConst.FILE_UNKNOWN, XMPConst.OPEN_FOR_UPDATE);
//         xmpMeta = xmpFile.getXMP();

//         // Update values
//         for (var setting = 0; setting < settingsArray.length; setting ++) {

//             updateXMPSetting(xmpMeta, settingsArray[setting], settingsArray[setting].interpolatedValues[step])

//         }

//         // Write xmp on file
//         if (xmpFile.canPutXMP( xmpMeta )) {
//             xmpFile.putXMP( xmpMeta );
//         }

//         // Close file
//         xmpFile.closeFile()

//     }

// }


// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Function to update the value of a given setting of an xmpMetaObject


// function updateXMPSetting(xmpMetaObject, settingName, newSettingValue) {

//     if ( settingName.crsName.match("ToneCurvePV2012") ){

//         for (j=0; j<settingName.settingValue.length; j++) {

//             xmpMetaObject.setArrayItem(ns, settingName.crsName, j+1, newSettingValue[0] + ", " + newSettingValue[1]);

//         }

//     } else {

//         xmpMetaObject.setProperty(ns, settingName.crsName, newSettingValue);

//     }

//     settingName.isCustom = false; // TODO Check if setting value is equal to default to determine

//     return xmpMetaObject;

// }

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Pending

// function updateXMPSettingToNextInterpolatedValue(xmpMetaObject, settingName) {

//     var currentIndex = settingName.interpolatedValues.indexOf(settingName.currentValue);
//     settingName.currentValue = settingName.interpolatedValues[currentIndex + 1];
// }