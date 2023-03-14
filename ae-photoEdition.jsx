#target aftereffects

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: Packages
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#include ae-utils.jsx
#include ae-style.jsx
#include ae-defaultParameters.jsx
#include ae-xmpNamespace.jsx
#include ae-animation.jsx
#include ae-texts.jsx
#include ae-shapes.jsx
#include ae-sliders.jsx
#include ae-metadata.jsx
#include ae-toneCurves.jsx

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: Project info
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var project = app.project;
var projectPath = project.file.path;
var projectFullName = project.file.fullName;
var projectName = project.file.name;
var projectNameNoExtension = projectName.substr(0, projectName.lastIndexOf('.'));
var projectExtension = projectName.substr(projectName.lastIndexOf(".") + 1, projectName.length)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: Calls
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TODO: Create an UI to select a file, and a style

var imageSettings = loadImageSettingsFromPath("/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram Photos/Scripts/Test/2022-11-23_13-19-00.xmp");

// TODO Select slider based on panel and group

// createSliderComposition (imageSettings.panels.basic.groups.whiteBalance.settings.temperature, "horizontalSliderWithLabel")

// createSliderSetComposition([imageSettings.exposure, imageSettings.contrast, imageSettings.highlights, imageSettings.shadows, imageSettings.whites, imageSettings.blacks], "Basic", 15);

// createToneCurveGroupComposition(imageSettings.panels.toneCurve.groups.redChannel, 15);
// createToneCurveGroupComposition(imageSettings.panels.toneCurve.groups.greenChannel, 15);
// createToneCurveGroupComposition(imageSettings.panels.toneCurve.groups.blueChannel, 15);
// createToneCurveGroupComposition(imageSettings.panels.toneCurve.groups.pointCurve, 15);

// createSlidersGroupComposition(imageSettings.panels.colorMixer.groups.hue, "horizontalSliderWithLabel", 15);
// createSlidersGroupComposition(imageSettings.panels.colorMixer.groups.saturation, 15);
// createSlidersGroupComposition(imageSettings.panels.basic.groups.tone, "horizontalSliderWithLabel", 15);
createSlidersGroupComposition(imageSettings.panels.colorMixer.groups.hue, "horizontalSliderWithNoLabel", 15);
createSlidersGroupComposition(imageSettings.panels.colorMixer.groups.saturation, "horizontalSliderWithNoLabel", 15);
createSlidersGroupComposition(imageSettings.panels.colorMixer.groups.luminance, "horizontalSliderWithNoLabel", 15);



var test = "T";

// createGroup(groupName);
// createPanel(panelName);

// for (var panel = 0; panel < settingsPanelDict.length; )

