#target aftereffects

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: Packages
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#include ae-utils.jsx
#include ae-style.jsx
#include ae-defaultParameters.jsx
#include ae-components.jsx
#include ae-xmpNamespace.jsx
#include ae-animation.jsx
#include ae-texts.jsx
#include ae-shapes.jsx
#include ae-panels.jsx
#include ae-sliders.jsx
#include ae-metadata.jsx
#include ae-toneCurves.jsx
#include ae-colorGrading.jsx

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

createMainComposition ("/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram Photos/Scripts/Test/2022-11-23_13-19-00.xmp", "horizontalSlider")

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createMainComposition ("/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram Photos/Scripts/Test/2022-11-23_13-19-00.xmp", "horizontalSlider")
// TODO: Create photoEditAnimation and add as layer
// TODO: Create an UI to select a file, and a style
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createMainComposition (photoPath, style) {

    var project = app.project;

    // Create Main composition 
    var mainComposition = project.items.addComp("Main", mainCompositionParameters.width, mainCompositionParameters.height, mainCompositionParameters.pixelAspect, mainCompositionParameters.duration, mainCompositionParameters.frameRate);

    // Load image settings
    var image = loadImageFromPath(photoPath);

    // var toneCurveGraphParameters = new ToneCurveGraphParameters (400, 360, image.settings.panels.toneCurve.groups.redChannel.settings.toneCurveRed);
    // createToneCurveGraphComposition (image.settings.panels.toneCurve.groups.redChannel.settings.toneCurveRed)

    // Create dashboard and position it
    var dashboardData = image.settings;
    var dashboardComposition = createDashboardComposition (dashboardData, style);

    // Include the precomposition created in the group composition
    var dashboardCompositionLayer = mainComposition.layers.add(dashboardComposition);

    // Position the precomposition in the group composition
    setAnchorPosition(dashboardCompositionLayer, "topLeft");
    dashboardCompositionLayer.position.setValue([0, mainCompositionParameters.height - dashboardComposition.height]);

}
