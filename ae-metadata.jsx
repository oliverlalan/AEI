// Includes

#include ae-xmpNamespace.jsx
#include ae-defaultParameters.jsx

// Calls
// var image = loadImageFromPath("/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram Photos/Scripts/Test/2022-11-23_13-19-00.xmp");
// var t = 3;
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
    image.xmp = image.name + ".xmp";
    image.xmpPath = image.directory + image.xmp

    var xmpMeta = loadXMPMeta (image.xmpPath);
    image.settings = new ImageSettings(xmpMeta);

    return image;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: Creates an xmpMetaObject out of the file stored in the path provided.
// Call: var xmpMeta = loadXMPMeta ("/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram Photos/Scripts/Test/2022-11-23_13-19-00.xmp");
// TODO: Include a case for dng files
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadXMPMeta (filePath) {

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

    this.isCustomItem = false;
    this.customItems = 1;
    // this.title = {};
    // this.title.keyTimes = [];

    // Animation: Time dashboard stays in place
    // this.title.keyTimes.push(referenceKeyFrame, referenceKeyFrame + referenceSwipeFrames);
    referenceKeyFrame += panelSwipeInFrames * 2;

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
            this.panels[panelKey] = {
                displayName : panel.displayName,
                items: 1,
                isCustomItem : false,
                customItems : 1,
                animation: {
                    swipeIn: {
                        keyFrames : [referenceKeyFrame, referenceKeyFrame + panelSwipeInFrames]
                    },
                    hold: {
                        keyFrames : [referenceKeyFrame + panelSwipeInFrames, referenceKeyFrame + panelSwipeInFrames + panelTitleHoldFrames]
                    },
                    panel: {
                        keyFrames : []
                    },
                    swipeOut: {
                        keyFrames : []
                    },
                    full: {
                        keyFrames : []
                    }
                },
                groups: {}
            };

            // Frames from panel swipe in until the title starts swiping out
            referenceKeyFrame += panelSwipeInFrames + panelTitleHoldFrames;

        }

        // Add groups
        for (var groupKey in panel.groups) {

            // Set group
            var group = panel.groups[groupKey];

            // Set group properties
            if (!this.panels[panelKey].groups.hasOwnProperty(groupKey)) {
                
                // Initialize
                this.panels[panelKey].groups[groupKey] = {
                    displayName : group.displayName,
                    groupType : group.groupType,
                    items: 0,
                    isCustomItem : false,
                    customItems : 0,
                    animation: {
                        swipeIn: {
                            keyFrames : [referenceKeyFrame, referenceKeyFrame + groupSwipeInFrames],
                        },
                        hold: {
                            keyFrames : [referenceKeyFrame + groupSwipeInFrames, referenceKeyFrame + groupSwipeInFrames + groupHoldFrames],
                        },
                        group: {
                            keyFrames : [referenceKeyFrame + groupSwipeInFrames + groupHoldFrames, referenceKeyFrame + groupSwipeInFrames + groupHoldFrames + settingAnimationFrames + settingHoldFrames],
                        },
                        swipeOut: {
                            keyFrames : [referenceKeyFrame + groupSwipeInFrames + groupHoldFrames + settingAnimationFrames + settingHoldFrames, referenceKeyFrame + groupSwipeInFrames + groupHoldFrames + settingAnimationFrames + settingHoldFrames + groupSwipeInFrames],
                        }, 
                        full: {
                            keyFrames : [referenceKeyFrame, referenceKeyFrame + groupSwipeInFrames + groupHoldFrames + settingAnimationFrames + settingHoldFrames + groupSwipeInFrames],
                        }
                    },
                    settings: {}
                };

                // Frames from group swipe in until the settings start animating
                referenceKeyFrame += groupSwipeInFrames + groupHoldFrames;

            }

            // Add settings
            for (var settingKey in group.settings) {
                
                // Set settings
                var setting = group.settings[settingKey];

                try {
                    
                    // Add setting
                    this.panels[panelKey].groups[groupKey].settings[settingKey] = new Setting (xmpMeta, setting.displayName, setting.crsName, setting.min, setting.max, setting.defaultValue, setting.panel, setting.group, setting.fillType, setting.ffx, setting.solidColor, setting.gradientColors);
                    
                    this.panels[panelKey].groups[groupKey].settings[settingKey].animation = {
                        setting : {
                            keyFrames : [referenceKeyFrame, referenceKeyFrame + settingAnimationFrames],
                        },
                        hold : {
                            keyFrames : [referenceKeyFrame + settingAnimationFrames, referenceKeyFrame + settingAnimationFrames + settingHoldFrames],
                        },
                        full: {
                            keyFrames : [referenceKeyFrame, referenceKeyFrame + settingAnimationFrames + settingHoldFrames]
                        }
                    }

                    // Compute animation duration and keyTimes
                    for (keyValue in this.panels[panelKey].groups[groupKey].settings[settingKey].animation) {
                        this.panels[panelKey].groups[groupKey].settings[settingKey].animation[keyValue].duration = this.panels[panelKey].groups[groupKey].settings[settingKey].animation[keyValue].keyFrames[1] - this.panels[panelKey].groups[groupKey].settings[settingKey].animation[keyValue].keyFrames[0];
                        this.panels[panelKey].groups[groupKey].settings[settingKey].animation[keyValue].keyTimes = this.panels[panelKey].groups[groupKey].settings[settingKey].animation[keyValue].keyFrames / settingAnimationFrames;
                    }

                    // Update group properties
                    this.panels[panelKey].groups[groupKey].items += 1;

                    if(this.panels[panelKey].groups[groupKey].settings[settingKey].isCustomItem == true) {
                        
                        // Update group properties
                        this.panels[panelKey].groups[groupKey].isCustomItem = true;
                        this.panels[panelKey].groups[groupKey].customItems += 1;

                    }

                } catch(e) {}

            }

            // Update panel properties
            this.panels[panelKey].items += 1;

            if(this.panels[panelKey].groups[groupKey].isCustomItem == true) {

                // Update panel properties
                this.panels[panelKey].isCustomItem = true;
                this.panels[panelKey].customItems += 1;

                // Compute animation duration and keyTimes
                for (keyValue in this.panels[panelKey].groups[groupKey].animation) {
                    this.panels[panelKey].groups[groupKey].animation[keyValue].duration = this.panels[panelKey].groups[groupKey].animation[keyValue].keyFrames[1] - this.panels[panelKey].groups[groupKey].animation[keyValue].keyFrames[0];
                    this.panels[panelKey].groups[groupKey].animation[keyValue].keyTimes = this.panels[panelKey].groups[groupKey].animation[keyValue].keyFrames / settingAnimationFrames;
                }

                // Update reference time
                referenceKeyFrame += settingAnimationFrames + settingHoldFrames;

            } else {
                
                // Reset referenceKeyFrame if no custom
                referenceKeyFrame -= groupSwipeInFrames + groupHoldFrames;

            }

        }

        // Update panel properties
        if(this.panels[panelKey].isCustomItem == true) {

            this.isCustomItem = true;
            this.customItems += 1;

            // Animation Settings Animation TODO: Compute panelDuration properly
            var panelDuration = (groupSwipeInFrames + groupHoldFrames + settingAnimationFrames + settingHoldFrames) * (this.panels[panelKey].customItems - 1);
            this.panels[panelKey].animation.panel.keyFrames =  [this.panels[panelKey].animation.hold.keyFrames[1], this.panels[panelKey].animation.hold.keyFrames[1] + panelDuration];
            this.panels[panelKey].animation.swipeOut.keyFrames = [this.panels[panelKey].animation.panel.keyFrames[1], this.panels[panelKey].animation.panel.keyFrames[1] + panelSwipeInFrames];
            this.panels[panelKey].animation.full.keyFrames = [this.panels[panelKey].animation.swipeIn.keyFrames[0], this.panels[panelKey].animation.swipeOut.keyFrames[1]];

            for (keyValue in this.panels[panelKey].animation) {
                this.panels[panelKey].animation[keyValue].duration =this.panels[panelKey].animation[keyValue].keyFrames[1] - this.panels[panelKey].animation[keyValue].keyFrames[0];
                this.panels[panelKey].animation[keyValue].keyTimes = this.panels[panelKey].animation[keyValue].keyFrames / settingAnimationFrames;
            }

            // Update reference time
            // referenceKeyFrame += groupSwipeInFrames;

        } else {

            // Reset referenceKeyFrame
            referenceKeyFrame -= panelSwipeInFrames + panelTitleHoldFrames;

        }
        
    }

    this.duration = referenceKeyFrame;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: Creates a dictionary with all the settings from the file stored in the path provided.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Setting (xmpMeta, displayName, crsName, min, max, defaultValue, panel, group, fillType, ffx, solidColor, gradientColors) {

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
    this.ffx = ffx;
    this.solidColor = hexToRgb(solidColor);

    this.isCustomItem = false;

    if(this.settingValue != this.defaultValue) { this.isCustomItem = true};

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

            var interpolatedInputValue = interpolateValues(defaultInputValue, inputValue, settingAnimationFrames, 2);
            var interpolatedOutputValue = interpolateValues(defaultOutputValue, outputValue, settingAnimationFrames, 2);
            this.interpolatedValues.push([interpolatedInputValue, interpolatedOutputValue]);

            // var inputValueRelativePosition = interpolateValues(defaultInputValue, inputValue, settingAnimationFrames, 2);
            // var outputValueRelativePosition = interpolateValues(defaultOutputValue, outputValue, settingAnimationFrames, 2);
            // this.relativePosition = this.settingValue - this.min / this.max - this.min; // Relative settingValue using min and max. From 0 to 1.

        }

        if (arraysEqual(this.settingValue, this.defaultValue)) {

            this.isCustomItem = false;

        } else {

            this.isCustomItem = true;

        }

    } else {
        
        this.settingValue = parseFloat(xmpMeta.getProperty(ns, this.crsName).value);
        this.defaultValue = defaultValue;
        this.relativePosition = (this.settingValue - this.min) / (this.max - this.min); // Relative settingValue using min and max. From 0 to 1.

        if ( this.displayName.match("Hue") && this.panel.match("Color Grading")) {
            this.interpolatedValues = interpolateValues(this.settingValue, this.settingValue, settingAnimationFrames, 2);
        } else {
            this.interpolatedValues = interpolateValues(this.defaultValue, this.settingValue, settingAnimationFrames, 2);
        }

        if (this.settingValue == this.defaultValue) {

            this.isCustomItem = false;

        } else {

            this.isCustomItem = true;

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

function resetSettings (xmpMeta) {

    xmpMetaDefault = xmpMeta;

    xmpMetaDefault.setProperty(ns, "AlreadyApplied", false);

    // For each panel
    for (var panelKey in lightroomPanels) {

        var panel = lightroomPanels[panelKey];

        // For each group
        for (var groupKey in panel.groups) {

            var group = panel.groups[groupKey];

            // For each setting
            for (var settingKey in group.settings) {

                var setting = group.settings[settingKey];

                if ( setting.crsName.match("ToneCurvePV2012") ){

                    for (j=1; j<=xmpMetaDefault.countArrayItems(ns, setting.crsName); j++) {

                        var itemValue = xmpMetaDefault.getArrayItem(ns, setting.crsName, j).value;
                        var input = itemValue.substr(0, itemValue.lastIndexOf(","));
                        var output = input;

                        xmpMetaDefault.setArrayItem(ns, setting.crsName, j, input + ", " + output);

                    }

                } else {

                    xmpMetaDefault.setProperty(ns, setting.crsName, setting.defaultValue);

                }

                setting.isCustomItem = false;

            }

        }

    }

    return xmpMetaDefault;

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
                        var settingValues = new Setting (xmpMeta, setting.displayName, setting.crsName, setting.min, setting.max, setting.defaultValue, setting.panel, setting.group, setting.fillType, setting.ffx, setting.solidColor, setting.gradientColors);

                        imageSettings[key] = settingValues;

                    } catch(e) {}
                }
            }
        }
    }

    return imageSettings;

}