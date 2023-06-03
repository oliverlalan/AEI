// Includes

#include ae-xmpNamespace.jsx
#include ae-defaultParameters.jsx

// Calls
// var imageSettings = loadSettingsFromPath("/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram Photos/Scripts/Test/2022-11-23_13-19-00.xmp");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: Creates a dictionary with all the settings from the file stored in the path provided.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadImageFromPath (filePath) {

    var image = {};

    image.path = filePath;
    image.directory = filePath.substr(0, filePath.lastIndexOf('/') + 1);
    image.fullName = filePath.substr(filePath.lastIndexOf("/") + 1, filePath.length);
    image.name = image.fullName.substr(0, image.fullName.lastIndexOf("."));
    image.extension = filePath.substr(filePath.lastIndexOf(".") + 1, filePath.length);

    var xmpMeta = loadXMPMeta (filePath);
    image.settings = new ImageSettings(xmpMeta);

    return image;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: Creates an xmpMetaObject out of the file stored in the path provided.
// Call: var xmpMeta = loadXMPMeta ("/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram Photos/Scripts/Test/2022-11-23_13-19-00.xmp");
// TODO: Include a case for dng files
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadXMPMeta (filePath) {

    // load library
    if ( ExternalObject.AdobeXMPScript == undefined ) {
        ExternalObject.AdobeXMPScript = new ExternalObject( "lib:AdobeXMPScript");
    }

    // Load metadata
    var xmpFilePath = filePath;
    xmpFile = new File(xmpFilePath);
    xmpFile.open('r');
    xmpFile.encoding = 'UTF8';
    xmpFile.lineFeed = 'unix';
    xmpFile.open('r', "TEXT", "????");
    var xmpMetaSerialized = xmpFile.read();
    xmpFile.close();
    var xmpMeta = new XMPMeta (xmpMetaSerialized);

    return xmpMeta;

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: Creates an object with all the settings of the xmpMetaObject, as they are organized in Lightroom.
// Call: var imageSettings = loadSettingsFromPath("/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram Photos/Scripts/Test/2022-11-23_13-19-00.xmp");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ImageSettings (xmpMeta) {

    // Initialize
    this.name = "Dashboard";
    this.xmpMeta = xmpMeta;

    this.isCustom = false;
    this.customPanels = 1;
    // this.title = {};
    // this.title.keyTimes = [];

    // Animation: Time dashboard stays in place
    // this.title.keyTimes.push(referenceKeyTime, referenceKeyTime + referenceSwipeTime);
    referenceKeyTime += referenceKeyTimeIncrement;

    // Set dashboard
    if (!this.hasOwnProperty("panels")) {
        this["panels"] = {};
    }

    // Add panels to dashboard
    for (var panelKey in lightroomPanels) {

        // Set panel
        var panel = lightroomPanels[panelKey];

        // Set panel properties
        if (!this.panels.hasOwnProperty(panelKey)) {
            
            // Initialize
            this.panels[panelKey] = {};
            this.panels[panelKey].groups = {};
            this.panels[panelKey].keyTimes = [];
            this.panels[panelKey].keyFrames = [];


            // Asign group parameters
            this.panels[panelKey].displayName = panel.displayName;
            this.panels[panelKey].isCustom = false;
            this.panels[panelKey].customGroups = 1;

            // Animation: Panel Swipe In Time
            this.panels[panelKey].keyTimes.push(referenceKeyTime, referenceKeyTime + panelSwipeInTime);
            this.panels[panelKey].keyFrames.push(referenceKeyTime * projectFPS, (referenceKeyTime + panelSwipeInTime) * projectFPS);


            // Time from panel swipe in until the title starts moving
            referenceKeyTime += panelSwipeInTime + panelTitleHoldTime;

        }

        // Add groups
        for (var groupKey in panel.groups) {

            // Set group
            var group = panel.groups[groupKey];

            // Set group properties
            if (!this.panels[panelKey].groups.hasOwnProperty(groupKey)) {
                
                // Initialize
                this.panels[panelKey].groups[groupKey] = {};
                this.panels[panelKey].groups[groupKey].settings = {};
                this.panels[panelKey].groups[groupKey].keyTimes = [];
                this.panels[panelKey].groups[groupKey].keyFrames = [];
                
                // Asign group properties
                this.panels[panelKey].groups[groupKey].displayName = group.displayName;
                this.panels[panelKey].groups[groupKey].groupType = group.groupType;
                this.panels[panelKey].groups[groupKey].isCustom = false;
                this.panels[panelKey].groups[groupKey].customSettings = 0;

                // Animation: Group Swipe In Time
                this.panels[panelKey].groups[groupKey].keyTimes.push(referenceKeyTime, referenceKeyTime + groupSwipeInTime);
                this.panels[panelKey].groups[groupKey].keyFrames.push(referenceKeyTime * projectFPS, (referenceKeyTime + groupSwipeInTime) * projectFPS);

                // Time from group swipe in until the settings start animating
                referenceKeyTime += groupSwipeInTime + groupHoldTime;

            }

            // Add settings
            for (var settingKey in group.settings) {
                
                // Set settings
                var setting = group.settings[settingKey];

                try {
                    
                    // Add setting
                    this.panels[panelKey].groups[groupKey].settings[settingKey] = new Setting (xmpMeta, setting.displayName, setting.crsName, setting.min, setting.max, setting.defaultValue, setting.panel, setting.group, setting.fillType, setting.gradientFill, setting.solidColor, setting.gradientColors);
                    this.panels[panelKey].groups[groupKey].settings[settingKey].keyTimes = [];
                    this.panels[panelKey].groups[groupKey].settings[settingKey].keyFrames = [];

                    // Animation
                    this.panels[panelKey].groups[groupKey].settings[settingKey].keyTimes.push(referenceKeyTime, referenceKeyTime + settingAnimationTime);
                    this.panels[panelKey].groups[groupKey].settings[settingKey].keyFrames.push(referenceKeyTime * projectFPS, (referenceKeyTime + settingAnimationTime) * projectFPS);

                    if(this.panels[panelKey].groups[groupKey].settings[settingKey].isCustom == true) {
                        
                        // Update group properties
                        this.panels[panelKey].groups[groupKey].isCustom = true;
                        this.panels[panelKey].groups[groupKey].customSettings += 1;

                    }

                } catch(e) {}

            }

            // Update group properties
            if(this.panels[panelKey].groups[groupKey].isCustom == true) {

                this.panels[panelKey].isCustom = true;
                this.panels[panelKey].customGroups += 1;

                // Animation Settings Animation
                referenceKeyTime += settingAnimationTime + settingHoldTime;

            } else {
                
                // Reset referenceKeyTime if no custom
                referenceKeyTime -= groupSwipeInTime + groupHoldTime;

            }

        }

        // Update panel properties
        if(this.panels[panelKey].isCustom == true) {

            this.isCustom = true;
            this.customPanels += 1;

        } else {

            // Reset referenceKeyTime
            referenceKeyTime -= panelSwipeInTime + panelTitleHoldTime;

        }
        
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: Creates a dictionary with all the settings from the file stored in the path provided.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Setting (xmpMeta, displayName, crsName, min, max, defaultValue, panel, group, fillType, gradientFill, solidColor, gradientColors) {

    this.displayName = displayName; // Setting display name, as it appears in Lightroom
    this.crsName = crsName;         // Setting name, according to Camera Raw settings
    this.min = min;                 // Setting minimum value
    this.max = max;                 // Setting maximum value
    this.settingValue = [];         // Setting value 
    this.defaultValue = [];         // Setting default value
    this.interpolatedValues = [];   // Array of 30 values, from the default to the finalValue
    this.panel = panel;
    this.group = group;
    this.fillType = fillType;
    this.gradientFill = gradientFill;
    this.solidColor = hexToRgb(solidColor);

    this.isCustom = false;

    if(this.settingValue != this.defaultValue) { this.isCustom = true};

    // loop through each element in the array and apply the function
    for (var color = 0; color < gradientColors.length; color++) {
        gradientColors[color] = hexToRgb(gradientColors[color]);
    }

    this.gradientColors = gradientColors;


    if(this.crsName.match("ToneCurvePV2012")) {


        for (var i = 0; i < xmpMeta.countArrayItems(ns,this.crsName); i++) { 

            var inputValue  = parseInt(xmpMeta.getArrayItem(ns, this.crsName, i + 1).value.split(", ")[0]);
            var outputValue = parseInt(xmpMeta.getArrayItem(ns, this.crsName, i + 1).value.split(", ")[1]);
            this.settingValue.push([inputValue, outputValue]);
            

            var defaultInputValue = inputValue;
            var defaultOutputValue = defaultInputValue;
            this.defaultValue.push([defaultInputValue, defaultOutputValue]);

            var interpolatedInputValue = interpolateValues(defaultInputValue, inputValue, interpolationSteps, 2);
            var interpolatedOutputValue = interpolateValues(defaultOutputValue, outputValue, interpolationSteps, 2);
            this.interpolatedValues.push([interpolatedInputValue, interpolatedOutputValue]);

            // var inputValueRelativePosition = interpolateValues(defaultInputValue, inputValue, interpolationSteps, 2);
            // var outputValueRelativePosition = interpolateValues(defaultOutputValue, outputValue, interpolationSteps, 2);
            // this.relativePosition = this.settingValue - this.min / this.max - this.min; // Relative settingValue using min and max. From 0 to 1.

        }

        if (arraysEqual(this.settingValue, this.defaultValue)) {

            this.isCustom = false;

        } else {

            this.isCustom = true;

        }

    } else {
        
        this.settingValue = xmpMeta.getProperty(ns, this.crsName).value;
        this.defaultValue = defaultValue;
        this.interpolatedValues = interpolateValues(this.defaultValue, this.settingValue, interpolationSteps, 2);
        this.relativePosition = (this.settingValue - this.min) / (this.max - this.min); // Relative settingValue using min and max. From 0 to 1.

        if (this.settingValue == this.defaultValue) {

            this.isCustom = false;

        } else {

            this.isCustom = true;

        }

    }

    this.currentValue = this.defaultValue;

    function interpolateValues (initialValue, finalValue, steps, interpolationAlpha) {

        var interpolatedValues = [];

        for(var i = 0; i < steps; i ++) {

            var step = i / (steps - 1);

            // ease-in-out function taken from math.stackexchange.com
            var interpolationFormula = Math.pow(step, interpolationAlpha) / (Math.pow(step, interpolationAlpha) + Math.pow((1 - step), interpolationAlpha));

            interpolatedValues[i] = initialValue + (finalValue - initialValue) * interpolationFormula;

        }  

        return interpolatedValues;
    }

    function arraysEqual (a, b) {
        if (a===b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        for (var i = 0; i < a.length; i++) {
            if ((a[i][0] !== b[i][0])||(a[i][1] !== b[i][1])) return false;
        }
        return true;
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: Creates a dictionary with all the settings from the file stored in the path provided.
// TODO: Update to take an xmpMeta object as argument and return that object.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function resetSettings (image) {

    // Load 
    var settings = image.settings;

    if(image.extension == "dng") {

        xmpMeta = new XMPMeta(app.activeDocument.xmpMetadata.rawData);

        xmpMeta.setProperty(ns, "AlreadyApplied", false);

        // For each panel
        for (var panelKey in settings.panels) {

            var panel = settings.panels[panelKey];

            // For each group
            for (var groupKey in panel.groups) {

                var group = panel.groups[groupKey];

                // For each setting
                for (var settingKey in group.settings) {

                    var setting = group.settings[settingKey];

                    if ( setting.crsName.match("ToneCurvePV2012") ){

                        for (j=0; j<setting.settingValue.length; j++) {

                            xmpMetaDefault.setArrayItem(ns, setting.crsName, j+1, setting.settingValue[j][0] + ", " + setting.settingValue[j][0]);

                        }

                    } else {

                        xmpMetaDefault.setProperty(ns, setting.crsName, setting.defaultValue);

                    }

                    setting.isCustom = false;

                }

            }

        }

        var xmpFile = new XMPFile (image.path, XMPConst.FILE_UNKNOWN, XMPConst.OPEN_FOR_UPDATE);

        xmpFile.putXMP(xmpMeta.serialize());
        xmpFile.closeFile();

    }   else    {

        var xmpFilePath = image.directory + image.name + '.xmp';
        xmpFile = new File(xmpFilePath);

        xmpFile.open('r');
        xmpFile.encoding = 'UTF8';
        xmpFile.lineFeed = 'unix';
        xmpFile.open('r', "TEXT", "????");

        var xmpInitial = xmpFile.read();
        xmpFile.close();

        xmpMetaDefault = new XMPMeta (xmpInitial);

        // For each panel
        for (var panelKey in settings.panels) {

            var panel = settings.panels[panelKey];

            // For each group
            for (var groupKey in panel.groups) {

                var group = panel.groups[groupKey];

                // For each setting
                for (var settingKey in group.settings) {

                    var setting = group.settings[settingKey];

                    if ( setting.crsName.match("ToneCurvePV2012") ){

                        for (j=0; j<setting.settingValue.length; j++) {

                            xmpMetaDefault.setArrayItem(ns, setting.crsName, j+1, setting.settingValue[j][0] + ", " + setting.settingValue[j][0]);

                        }

                    } else {

                        xmpMetaDefault.setProperty(ns, setting.crsName, setting.defaultValue);

                    }

                    setting.isCustom = false;

                }

            }

        }

        var xmpDefaultFilePath = image.directory + image.name + "_reference" + '.xmp';
        xmpDefaultFile = new File(xmpDefaultFilePath);

        xmpDefaultFile.open('w');
        xmpDefaultFile.encoding = 'UTF8';
        xmpDefaultFile.lineFeed = 'unix';
        xmpDefaultFile.write(xmpMetaDefault.serialize());
        xmpDefaultFile.close();

        return xmpMetaDefault;

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: Creates a dictionary with all the settings of the xmpMetaObject provided.
// Deprecated!!
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadSettings (xmpMeta) {
    
    var imageSettings =  {};

    // Iterate over the dictionaries stored inside imageSettingsDict
    for (var key in imageSettingsDict) {
        if (imageSettingsDict.hasOwnProperty(key)) {
            // Get the dictionary at the current key
            var setting = imageSettingsDict[key];

            // Iterate over the keys in the inner dictionary
            for (var innerKey in setting) {
                if (setting.hasOwnProperty(innerKey)) {

                    try {
                        var settingValues = new Setting (xmpMeta, setting.displayName, setting.crsName, setting.min, setting.max, setting.defaultValue, setting.panel, setting.group, setting.fillType, setting.gradientFill, setting.solidColor, setting.gradientColors);

                        imageSettings[key] = settingValues;

                    } catch(e) {}
                }
            }
        }
    }

    return imageSettings;

}