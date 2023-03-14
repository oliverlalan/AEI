function createGroup (imageObj.) {

    switch(settingsGroup.groupType) {

        case "Slider":
            var settingsGroupComposition = createSliderSetComposition(settingsGroup.settings, settingsGroup.displayName, 15);
            settingsGroupComposition.name = settingsGroup.displayName + " Group";
        break;

        // case "Tone Curve":
        //     createToneCurveComposition();
        // break;

        // case "Color Mix":
        //     createColorMixComposition();
        // break;

        // case "Color Grading":
        //     createColorGradingComposition();
        // break;

    }

}




// function createPanel (settingsPanel) {
    
//     switch(settingsPanel.settingsGroup) {

//         case ""
//     }

// }

// "Tone Curve", "Color Mix", "Color Grading"

// sliderWithLabels
// sliderWithNoLabels
// colorGrading