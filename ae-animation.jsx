function animateLayer (layer, propertyName, keyTimes, keyValues) {

    var layerProperty = layer.property(propertyName);

    // Keyframes
    layerProperty.setValuesAtTimes(keyTimes, keyValues);

    // Easing
    for (var i = 1; i <= keyTimes.length; i++) {

        layerProperty.setTemporalEaseAtKey(i, [defaultAnimationParameters.easeIn], [defaultAnimationParameters.easeOut]); // set ease in/out for the second keyframe

    }
    

}

function extendPrecompAndRemapTime(compName, precompName) {
  // Get the composition by name
  var comp = app.project.itemByName(compName);

  // Get the precomposition by name
  var precomp = comp.layer(precompName);
  precomp.selected = true;

  // Enable time remapping on the precomposition
  var timeRemap = precomp.timeRemap;
  timeRemap.enabled = true;

  // Get the start and end times of the composition
  var startTime = comp.workAreaStart;
  var endTime = comp.workAreaDuration + startTime;

  // Extend the first keyframe of the precomposition to the start of the composition
  var firstKeyframe = timeRemap.keyTime(1);
  var firstKeyValue = timeRemap.keyValue(1);
  timeRemap.setValueAtTime(startTime, firstKeyValue);
  timeRemap.removeKey(1);

  // Extend the last keyframe of the precomposition to the end of the composition
  var lastKeyframe = timeRemap.keyTime(timeRemap.numKeys);
  var lastKeyValue = timeRemap.keyValue(timeRemap.numKeys);
  timeRemap.setValueAtTime(endTime, lastKeyValue);
  timeRemap.removeKey(timeRemap.numKeys);
}

// Example usage:
extendPrecompAndRemapTime("Main Comp", "Precomp 1");