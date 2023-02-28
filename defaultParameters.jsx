// Paths
var logosPath = "/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram%20Photos/Assets/Logos/"
var iconsPath = "/d/OneDrive/Arturo%20-%20Personal/%C3%93liver%20Lalan/Instagram%20Photos/Assets/Icons/"
// var logosPath = activeDocument.path + "/../../Assets/Logos/";
// var iconsPath = activeDocument.path + "/../../Assets/Icons/";

// Default parameters
var anchorPosition = "topleft";
var fontSize = 18;
var fontHexColor = "FFFFFF";
var fontName = "WorkSansRoman-Medium";
var fontTracking = 100;
var fontJustification = Justification.LEFT;
var fontCapitalization = TextCase.ALLCAPS;

var fillColor = "8C8C8C";
var strokeColor = "FFFFFF";
var strokeWidth = 2;

var maskVisibleColor = "000000";
var maskInvisibleColor = "FFFFFF";

var darkGlassDesign = "full";

var panelBackgroundOpacity = 65;
var panelBackgroundDesign = "vertical-3/8";


var targetPlatform = "Instagram";
var targetResolution = 72;
var targetColorProfile = "sRGB IEC61966-2.1";

if(targetPlatform == "Instagram") {
    var targetWidth = 1080;
    var targetHeight = 1350;
} else if(targetPlatform == "TikTok") {
    var targetWidth = 1080;
    var targetHeight = 1920;
}


// Sliders
// Parameters TODO: Define based in document layerProperties
var sliderSettingsSetSpacing = 60;
var sliderLineLength = targetWidth * 5 / 24;
var sliderStyle = "horizontal";

// Histogram
var histogramWidth = histogramHeigth =  targetWidth * 5 / 24;
var histogramStrokeWidth = 2;


var blurPixelRadius = targetWidth / 216;
var noiseAmount = 3;
var toneCurveMaxOutput = 90;