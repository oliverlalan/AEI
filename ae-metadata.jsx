// Includes

#include ae-xmpNamespace.jsx
#include ae-defaultParameters.jsx

// Calls
// var imageSettings = loadSettingsFromPath("/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram Photos/Scripts/Test/2022-11-23_13-19-00.xmp");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: Creates an object with all the settings of the xmpMetaObject, as they are organized in Lightroom.
// Call: var imageSettings = loadSettingsFromPath("/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram Photos/Scripts/Test/2022-11-23_13-19-00.xmp");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ImageSettings (xmpMeta) {

    // Initialize
    this.name = "Dashboard";
    this.xmpMeta = xmpMeta;

    this.isCustom = false;
    this.customPanels = 0;
    this.keyTimes = [];

    // Animation: Dashboard swipe in
    this.keyTimes.push(referenceKeyTime, referenceKeyTime + referenceKeyTimeIncrement);
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

            // Asign group parameters
            this.panels[panelKey].displayName = panel.displayName;
            this.panels[panelKey].isCustom = false;
            this.panels[panelKey].customGroups = 0;

            // Animation Panel Title Swipe In
            this.panels[panelKey].keyTimes.push(referenceKeyTime, referenceKeyTime + referenceKeyTimeIncrement);
            referenceKeyTime += referenceKeyTimeIncrement;

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
                
                // Asign group properties
                this.panels[panelKey].groups[groupKey].displayName = group.displayName;
                this.panels[panelKey].groups[groupKey].groupType = group.groupType;
                this.panels[panelKey].groups[groupKey].isCustom = false;
                this.panels[panelKey].groups[groupKey].customSettings = 0;

                // Animation Group Title Swipe In
                this.panels[panelKey].groups[groupKey].keyTimes.push(referenceKeyTime, referenceKeyTime + referenceKeyTimeIncrement);
                referenceKeyTime += referenceKeyTimeIncrement;
            }

            // Add settings
            for (var settingKey in group.settings) {
                
                // Set settings
                var setting = group.settings[settingKey];

                try {
                    
                    // Add setting
                    this.panels[panelKey].groups[groupKey].settings[settingKey] = new Setting (xmpMeta, setting.displayName, setting.crsName, setting.min, setting.max, setting.defaultValue, setting.panel, setting.group, setting.fillType, setting.solidColor, setting.gradientColors);
                    this.panels[panelKey].groups[groupKey].settings[settingKey].keyTimes = [];

                    // Animation
                    this.panels[panelKey].groups[groupKey].settings[settingKey].keyTimes.push(referenceKeyTime, referenceKeyTime + referenceKeyTimeIncrement);

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
                referenceKeyTime += referenceKeyTimeIncrement;

            } else {
                
                // Reset referenceKeyTime if no custom
                referenceKeyTime -= referenceKeyTimeIncrement;

            }

        }

        // Update panel properties
        if(this.panels[panelKey].isCustom == true) {

            this.isCustom = true;
            this.customPanels += 1;

        } else {

            // Reset referenceKeyTime
            referenceKeyTime -= referenceKeyTimeIncrement;

        }
        
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: Creates a dictionary with all the settings from the file stored in the path provided.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Setting (xmpMeta, displayName, crsName, min, max, defaultValue, panel, group, fillType, solidColor, gradientColors) {

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
    this.solidColor = hexToRgb(solidColor);

    this.isCustom = false;

    if(this.settingValue != this.defaultValue) { this.isCustom = true};

    // loop through each element in the array and apply the function
    for (var color = 0; color < gradientColors.length; color++) {
        gradientColors[color] = hexToRgb(gradientColors[color]);
    }

    this.gradientColors = gradientColors;


    if(this.crsName.match("ToneCurvePV2012")) {


        for (var i = 0; i < xmpMeta.countArrayItems(XMPConst.NS_CAMERA_RAW,this.crsName); i++) { 

            var inputValue  = parseInt(xmpMeta.getArrayItem(XMPConst.NS_CAMERA_RAW, this.crsName, i + 1).value.split(", ")[0]);
            var outputValue = parseInt(xmpMeta.getArrayItem(XMPConst.NS_CAMERA_RAW, this.crsName, i + 1).value.split(", ")[1]);
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
        
        this.settingValue = xmpMeta.getProperty(XMPConst.NS_CAMERA_RAW, this.crsName).value;
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadImageSettingsFromPath (filePath) {
    
    var xmpMeta = loadXMPMeta (filePath);
    var imageSettings = new ImageSettings(xmpMeta);

    return imageSettings;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: Creates an xmpMetaObject out of the file stored in the path provided.
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
                        var settingValues = new Setting (xmpMeta, setting.displayName, setting.crsName, setting.min, setting.max, setting.defaultValue, setting.panel, setting.group, setting.fillType, setting.solidColor, setting.gradientColors);

                        imageSettings[key] = settingValues;

                    } catch(e) {}
                }
            }
        }
    }

    return imageSettings;

}