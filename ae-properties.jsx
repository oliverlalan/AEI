(function() { // wrap entire script in an anonymous function to create a private scope within AE's global namespace   

// script entry point

main();    

    

function dumpPropTree(rootObj, nestingLevel) {  

    var countProps = rootObj.numProperties;

    for (var propIndex=1; propIndex <= countProps; propIndex++) {

        var prop = rootObj.property(propIndex);

        $.writeln(Array(nestingLevel*4).join(" ") + "[" + nestingLevel + "-" + propIndex + "] " + "matchName: \"" + prop.matchName + "\", name: \"" + prop.name + "\"");

        if (prop.numProperties > 0)

            dumpPropTree(prop, nestingLevel+1);

    }

}

function main() {

    var activeComp = app.project.activeItem;

    if (activeComp == null) {

        alert("Error: No active composition");

        return;

    }   

    var countSelectedLayers = activeComp.selectedLayers.length;

    if (countSelectedLayers == 0) {

        alert("Error: No selected layer(s)");

        return;

    }   

    for (selectedLayerIndex=0; selectedLayerIndex < countSelectedLayers; selectedLayerIndex++) {

        var layer = activeComp.selectedLayers[selectedLayerIndex];

        $.writeln("***************** [ Layer: \"" + layer.name + "\" ] *****************");

        dumpPropTree(layer, 0);

    }    

}

})();   // end of anonymous function that encapsulates entire script

// Here's a sample output:

// ***************** [ Layer: "Shape Layer 1" ] *****************

// [0-1] matchName: "ADBE Marker", name: "Marker"

// [0-2] matchName: "ADBE Root Vectors Group", name: "Contents"

//    [1-1] matchName: "ADBE Vector Group", name: "Polystar 1"

//        [2-1] matchName: "ADBE Vector Blend Mode", name: "Blend Mode"

//        [2-2] matchName: "ADBE Vectors Group", name: "Contents"

//            [3-1] matchName: "ADBE Vector Shape - Group", name: "Path 1"

//                [4-1] matchName: "ADBE Vector Shape Direction", name: "Shape Direction"

//                [4-2] matchName: "ADBE Vector Shape", name: "Path"

//            [3-2] matchName: "ADBE Vector Graphic - Stroke", name: "Stroke 1"

//                [4-1] matchName: "ADBE Vector Blend Mode", name: "Blend Mode"

//                [4-2] matchName: "ADBE Vector Composite Order", name: "Composite"

//                [4-3] matchName: "ADBE Vector Stroke Color", name: "Color"

//                [4-4] matchName: "ADBE Vector Stroke Opacity", name: "Opacity"

//                [4-5] matchName: "ADBE Vector Stroke Width", name: "Stroke Width"

//                [4-6] matchName: "ADBE Vector Stroke Line Cap", name: "Line Cap"

//                [4-7] matchName: "ADBE Vector Stroke Line Join", name: "Line Join"

//                [4-8] matchName: "ADBE Vector Stroke Miter Limit", name: "Miter Limit"

//                [4-9] matchName: "ADBE Vector Stroke Dashes", name: "Dashes"

//                    [5-1] matchName: "ADBE Vector Stroke Dash 1", name: "Dash"

//                    [5-2] matchName: "ADBE Vector Stroke Gap 1", name: "Gap"

//                    [5-3] matchName: "ADBE Vector Stroke Dash 2", name: "Dash 2"

//                    [5-4] matchName: "ADBE Vector Stroke Gap 2", name: "Gap 2"

//                    [5-5] matchName: "ADBE Vector Stroke Dash 3", name: "Dash 3"

//                    [5-6] matchName: "ADBE Vector Stroke Gap 3", name: "Gap 3"

//                    [5-7] matchName: "ADBE Vector Stroke Offset", name: "Offset"

//            [3-3] matchName: "ADBE Vector Graphic - Fill", name: "Fill 1"

//                [4-1] matchName: "ADBE Vector Blend Mode", name: "Blend Mode"

//                [4-2] matchName: "ADBE Vector Composite Order", name: "Composite"

//                [4-3] matchName: "ADBE Vector Fill Rule", name: "Fill Rule"

//                [4-4] matchName: "ADBE Vector Fill Color", name: "Color"

//                [4-5] matchName: "ADBE Vector Fill Opacity", name: "Opacity"

//        [2-3] matchName: "ADBE Vector Transform Group", name: "Transform"

//            [3-1] matchName: "ADBE Vector Anchor", name: "Anchor Point"

//            [3-2] matchName: "ADBE Vector Position", name: "Position"

//            [3-3] matchName: "ADBE Vector Scale", name: "Scale"

//            [3-4] matchName: "ADBE Vector Skew", name: "Skew"

//            [3-5] matchName: "ADBE Vector Skew Axis", name: "Skew Axis"

//            [3-6] matchName: "ADBE Vector Rotation", name: "Rotation"

//            [3-7] matchName: "ADBE Vector Group Opacity", name: "Opacity"

//        [2-4] matchName: "ADBE Vector Materials Group", name: "Material Options"

//            [3-1] matchName: "ADBE Vec3D Front RGB", name: "Front Color"

//            [3-2] matchName: "ADBE Vec3D Front Ambient", name: "Front Ambient"

//            [3-3] matchName: "ADBE Vec3D Front Diffuse", name: "Front Diffuse"

//            [3-4] matchName: "ADBE Vec3D Front Specular", name: "Front Specular Intensity"

//            [3-5] matchName: "ADBE Vec3D Front Shininess", name: "Front Specular Shininess"

//            [3-6] matchName: "ADBE Vec3D Front Metal", name: "Front Metal"

//            [3-7] matchName: "ADBE Vec3D Front Reflection", name: "Front Reflection Intensity"

//            [3-8] matchName: "ADBE Vec3D Front Gloss", name: "Front Reflection Sharpness"

//            [3-9] matchName: "ADBE Vec3D Front Fresnel", name: "Front Reflection Rolloff"

//            [3-10] matchName: "ADBE Vec3D Front Xparency", name: "Front Transparency"

//            [3-11] matchName: "ADBE Vec3D Front XparRoll", name: "Front Transparency Rolloff"

//            [3-12] matchName: "ADBE Vec3D Front IOR", name: "Front Index of Refraction"

//            [3-13] matchName: "ADBE Vec3D Bevel RGB", name: "Bevel Color"

//            [3-14] matchName: "ADBE Vec3D Bevel Ambient", name: "Bevel Ambient"

//            [3-15] matchName: "ADBE Vec3D Bevel Diffuse", name: "Bevel Diffuse"

//            [3-16] matchName: "ADBE Vec3D Bevel Specular", name: "Bevel Specular Intensity"

//            [3-17] matchName: "ADBE Vec3D Bevel Shininess", name: "Bevel Specular Shininess"

//            [3-18] matchName: "ADBE Vec3D Bevel Metal", name: "Bevel Metal"

//            [3-19] matchName: "ADBE Vec3D Bevel Reflection", name: "Bevel Reflection Intensity"

//            [3-20] matchName: "ADBE Vec3D Bevel Gloss", name: "Bevel Reflection Sharpness"

//            [3-21] matchName: "ADBE Vec3D Bevel Fresnel", name: "Bevel Reflection Rolloff"

//            [3-22] matchName: "ADBE Vec3D Bevel Xparency", name: "Bevel Transparency"

//            [3-23] matchName: "ADBE Vec3D Bevel XparRoll", name: "Bevel Transparency Rolloff"

//            [3-24] matchName: "ADBE Vec3D Bevel IOR", name: "Bevel Index of Refraction"

//            [3-25] matchName: "ADBE Vec3D Side RGB", name: "Side Color"

//            [3-26] matchName: "ADBE Vec3D Side Ambient", name: "Side Ambient"

//            [3-27] matchName: "ADBE Vec3D Side Diffuse", name: "Side Diffuse"

//            [3-28] matchName: "ADBE Vec3D Side Specular", name: "Side Specular Intensity"

//            [3-29] matchName: "ADBE Vec3D Side Shininess", name: "Side Specular Shininess"

//            [3-30] matchName: "ADBE Vec3D Side Metal", name: "Side Metal"

//            [3-31] matchName: "ADBE Vec3D Side Reflection", name: "Side Reflection Intensity"

//            [3-32] matchName: "ADBE Vec3D Side Gloss", name: "Side Reflection Sharpness"

//            [3-33] matchName: "ADBE Vec3D Side Fresnel", name: "Side Reflection Rolloff"

//            [3-34] matchName: "ADBE Vec3D Side Xparency", name: "Side Transparency"

//            [3-35] matchName: "ADBE Vec3D Side XparRoll", name: "Side Transparency Rolloff"

//            [3-36] matchName: "ADBE Vec3D Side IOR", name: "Side Index of Refraction"

//            [3-37] matchName: "ADBE Vec3D Back RGB", name: "Back Color"

//            [3-38] matchName: "ADBE Vec3D Back Ambient", name: "Back Ambient"

//            [3-39] matchName: "ADBE Vec3D Back Diffuse", name: "Back Diffuse"

//            [3-40] matchName: "ADBE Vec3D Back Specular", name: "Back Specular Intensity"

//            [3-41] matchName: "ADBE Vec3D Back Shininess", name: "Back Specular Shininess"

//            [3-42] matchName: "ADBE Vec3D Back Metal", name: "Back Metal"

//            [3-43] matchName: "ADBE Vec3D Back Reflection", name: "Back Reflection Intensity"

//            [3-44] matchName: "ADBE Vec3D Back Gloss", name: "Back Reflection Sharpness"

//            [3-45] matchName: "ADBE Vec3D Back Fresnel", name: "Back Reflection Rolloff"

//            [3-46] matchName: "ADBE Vec3D Back Xparency", name: "Back Transparency"

//            [3-47] matchName: "ADBE Vec3D Back XparRoll", name: "Back Transparency Rolloff"

//            [3-48] matchName: "ADBE Vec3D Back IOR", name: "Back Index of Refraction"

// [0-3] matchName: "ADBE Mask Parade", name: "Masks"

// [0-4] matchName: "ADBE Effect Parade", name: "Effects"

//    [1-1] matchName: "ADBE Layer Control", name: "Layer Control"

//        [2-1] matchName: "ADBE Layer Control-0001", name: "Layer"

//        [2-2] matchName: "ADBE Effect Built In Params", name: "Compositing Options"

//            [3-1] matchName: "ADBE Effect Mask Parade", name: "Masks"

//            [3-2] matchName: "ADBE Effect Mask Opacity", name: "Effect Opacity"

// [0-5] matchName: "ADBE Transform Group", name: "Transform"

//    [1-1] matchName: "ADBE Anchor Point", name: "Anchor Point"

//    [1-2] matchName: "ADBE Position", name: "Position"

//    [1-3] matchName: "ADBE Position_0", name: "X Position"

//    [1-4] matchName: "ADBE Position_1", name: "Y Position"

//    [1-5] matchName: "ADBE Position_2", name: "Z Position"

//    [1-6] matchName: "ADBE Scale", name: "Scale"

//    [1-7] matchName: "ADBE Orientation", name: "Orientation"

//    [1-8] matchName: "ADBE Rotate X", name: "X Rotation"

//    [1-9] matchName: "ADBE Rotate Y", name: "Y Rotation"

//    [1-10] matchName: "ADBE Rotate Z", name: "Rotation"

//    [1-11] matchName: "ADBE Opacity", name: "Opacity"

//    [1-12] matchName: "ADBE Envir Appear in Reflect", name: "Appears in Reflections"

// [0-6] matchName: "ADBE Layer Styles", name: "Layer Styles"

//    [1-1] matchName: "ADBE Blend Options Group", name: "Blending Options"

//        [2-1] matchName: "ADBE Global Angle2", name: "Global Light Angle"

//        [2-2] matchName: "ADBE Global Altitude2", name: "Global Light Altitude"

//        [2-3] matchName: "ADBE Adv Blend Group", name: "Advanced Blending"

//            [3-1] matchName: "ADBE Layer Fill Opacity2", name: "Fill Opacity"

//            [3-2] matchName: "ADBE R Channel Blend", name: "Red"

//            [3-3] matchName: "ADBE G Channel Blend", name: "Green"

//            [3-4] matchName: "ADBE B Channel Blend", name: "Blue"

//            [3-5] matchName: "ADBE Blend Interior", name: "Blend Interior Styles as Group"

//            [3-6] matchName: "ADBE Blend Ranges", name: "Use Blend Ranges from Source"

//    [1-2] matchName: "dropShadow/enabled", name: "Drop Shadow"

//        [2-1] matchName: "dropShadow/mode2", name: "Blend Mode"

//        [2-2] matchName: "dropShadow/color", name: "Color"

//        [2-3] matchName: "dropShadow/opacity", name: "Opacity"

//        [2-4] matchName: "dropShadow/useGlobalAngle", name: "Use Global Light"

//        [2-5] matchName: "dropShadow/localLightingAngle", name: "Angle"

//        [2-6] matchName: "dropShadow/distance", name: "Distance"

//        [2-7] matchName: "dropShadow/chokeMatte", name: "Spread"

//        [2-8] matchName: "dropShadow/blur", name: "Size"

//        [2-9] matchName: "dropShadow/noise", name: "Noise"

//        [2-10] matchName: "dropShadow/layerConceals", name: "Layer Knocks Out Drop Shadow"

//    [1-3] matchName: "innerShadow/enabled", name: "Inner Shadow"

//        [2-1] matchName: "innerShadow/mode2", name: "Blend Mode"

//        [2-2] matchName: "innerShadow/color", name: "Color"

//        [2-3] matchName: "innerShadow/opacity", name: "Opacity"

//        [2-4] matchName: "innerShadow/useGlobalAngle", name: "Use Global Light"

//        [2-5] matchName: "innerShadow/localLightingAngle", name: "Angle"

//        [2-6] matchName: "innerShadow/distance", name: "Distance"

//        [2-7] matchName: "innerShadow/chokeMatte", name: "Choke"

//        [2-8] matchName: "innerShadow/blur", name: "Size"

//        [2-9] matchName: "innerShadow/noise", name: "Noise"

//    [1-4] matchName: "outerGlow/enabled", name: "Outer Glow"

//        [2-1] matchName: "outerGlow/mode2", name: "Blend Mode"

//        [2-2] matchName: "outerGlow/opacity", name: "Opacity"

//        [2-3] matchName: "outerGlow/noise", name: "Noise"

//        [2-4] matchName: "outerGlow/AEColorChoice", name: "Color Type"

//        [2-5] matchName: "outerGlow/color", name: "Color"

//        [2-6] matchName: "outerGlow/gradient", name: "Colors"

//        [2-7] matchName: "outerGlow/gradientSmoothness", name: "Gradient Smoothness"

//        [2-8] matchName: "outerGlow/glowTechnique", name: "Technique"

//        [2-9] matchName: "outerGlow/chokeMatte", name: "Spread"

//        [2-10] matchName: "outerGlow/blur", name: "Size"

//        [2-11] matchName: "outerGlow/inputRange", name: "Range"

//        [2-12] matchName: "outerGlow/shadingNoise", name: "Jitter"

//    [1-5] matchName: "innerGlow/enabled", name: "Inner Glow"

//        [2-1] matchName: "innerGlow/mode2", name: "Blend Mode"

//        [2-2] matchName: "innerGlow/opacity", name: "Opacity"

//        [2-3] matchName: "innerGlow/noise", name: "Noise"

//        [2-4] matchName: "innerGlow/AEColorChoice", name: "Color Type"

//        [2-5] matchName: "innerGlow/color", name: "Color"

//        [2-6] matchName: "innerGlow/gradient", name: "Colors"

//        [2-7] matchName: "innerGlow/gradientSmoothness", name: "Gradient Smoothness"

//        [2-8] matchName: "innerGlow/glowTechnique", name: "Technique"

//        [2-9] matchName: "innerGlow/innerGlowSource", name: "Source"

//        [2-10] matchName: "innerGlow/chokeMatte", name: "Choke"

//        [2-11] matchName: "innerGlow/blur", name: "Size"

//        [2-12] matchName: "innerGlow/inputRange", name: "Range"

//        [2-13] matchName: "innerGlow/shadingNoise", name: "Jitter"

//    [1-6] matchName: "bevelEmboss/enabled", name: "Bevel and Emboss"

//        [2-1] matchName: "bevelEmboss/bevelStyle", name: "Style"

//        [2-2] matchName: "bevelEmboss/bevelTechnique", name: "Technique"

//        [2-3] matchName: "bevelEmboss/strengthRatio", name: "Depth"

//        [2-4] matchName: "bevelEmboss/bevelDirection", name: "Direction"

//        [2-5] matchName: "bevelEmboss/blur", name: "Size"

//        [2-6] matchName: "bevelEmboss/softness", name: "Soften"

//        [2-7] matchName: "bevelEmboss/useGlobalAngle", name: "Use Global Light"

//        [2-8] matchName: "bevelEmboss/localLightingAngle", name: "Angle"

//        [2-9] matchName: "bevelEmboss/localLightingAltitude", name: "Altitude"

//        [2-10] matchName: "bevelEmboss/highlightMode", name: "Highlight Mode"

//        [2-11] matchName: "bevelEmboss/highlightColor", name: "Highlight Color"

//        [2-12] matchName: "bevelEmboss/highlightOpacity", name: "Highlight Opacity"

//        [2-13] matchName: "bevelEmboss/shadowMode", name: "Shadow Mode"

//        [2-14] matchName: "bevelEmboss/shadowColor", name: "Shadow Color"

//        [2-15] matchName: "bevelEmboss/shadowOpacity", name: "Shadow Opacity"

//    [1-7] matchName: "chromeFX/enabled", name: "Satin"

//        [2-1] matchName: "chromeFX/mode2", name: "Blend Mode"

//        [2-2] matchName: "chromeFX/color", name: "Color"

//        [2-3] matchName: "chromeFX/opacity", name: "Opacity"

//        [2-4] matchName: "chromeFX/localLightingAngle", name: "Angle"

//        [2-5] matchName: "chromeFX/distance", name: "Distance"

//        [2-6] matchName: "chromeFX/blur", name: "Size"

//        [2-7] matchName: "chromeFX/invert", name: "Invert"

//    [1-8] matchName: "solidFill/enabled", name: "Color Overlay"

//        [2-1] matchName: "solidFill/mode2", name: "Blend Mode"

//        [2-2] matchName: "solidFill/color", name: "Color"

//        [2-3] matchName: "solidFill/opacity", name: "Opacity"

//    [1-9] matchName: "gradientFill/enabled", name: "Gradient Overlay"

//        [2-1] matchName: "gradientFill/mode2", name: "Blend Mode"

//        [2-2] matchName: "gradientFill/opacity", name: "Opacity"

//        [2-3] matchName: "gradientFill/gradient", name: "Colors"

//        [2-4] matchName: "gradientFill/gradientSmoothness", name: "Gradient Smoothness"

//        [2-5] matchName: "gradientFill/angle", name: "Angle"

//        [2-6] matchName: "gradientFill/type", name: "Style"

//        [2-7] matchName: "gradientFill/reverse", name: "Reverse"

//        [2-8] matchName: "gradientFill/align", name: "Align with Layer"

//        [2-9] matchName: "gradientFill/scale", name: "Scale"

//        [2-10] matchName: "gradientFill/offset", name: "Offset"

//    [1-10] matchName: "patternFill/enabled", name: "Pattern Overlay"

//        [2-1] matchName: "patternFill/mode2", name: "Blend Mode"

//        [2-2] matchName: "patternFill/opacity", name: "Opacity"

//        [2-3] matchName: "patternFill/align", name: "Link with Layer"

//        [2-4] matchName: "patternFill/scale", name: "Scale"

//        [2-5] matchName: "patternFill/phase", name: "Offset"

//    [1-11] matchName: "frameFX/enabled", name: "Stroke"

//        [2-1] matchName: "frameFX/mode2", name: "Blend Mode"

//        [2-2] matchName: "frameFX/color", name: "Color"

//        [2-3] matchName: "frameFX/size", name: "Size"

//        [2-4] matchName: "frameFX/opacity", name: "Opacity"

//        [2-5] matchName: "frameFX/style", name: "Position"

// [0-7] matchName: "ADBE Extrsn Options Group", name: "Geometry Options"

//    [1-1] matchName: "ADBE Bevel Styles", name: "Bevel Style"

//    [1-2] matchName: "ADBE Bevel Direction", name: "Bevel Direction"

//    [1-3] matchName: "ADBE Bevel Depth", name: "Bevel Depth"

//    [1-4] matchName: "ADBE Hole Bevel Depth", name: "Hole Bevel Depth"

//    [1-5] matchName: "ADBE Extrsn Depth", name: "Extrusion Depth"

// [0-8] matchName: "ADBE Material Options Group", name: "Material Options"

//    [1-1] matchName: "ADBE Casts Shadows", name: "Casts Shadows"

//    [1-2] matchName: "ADBE Light Transmission", name: "Light Transmission"

//    [1-3] matchName: "ADBE Accepts Shadows", name: "Accepts Shadows"

//    [1-4] matchName: "ADBE Accepts Lights", name: "Accepts Lights"

//    [1-5] matchName: "ADBE Appears in Reflections", name: "Appears in Reflections"

//    [1-6] matchName: "ADBE Ambient Coefficient", name: "Ambient"

//    [1-7] matchName: "ADBE Diffuse Coefficient", name: "Diffuse"

//    [1-8] matchName: "ADBE Specular Coefficient", name: "Specular Intensity"

//    [1-9] matchName: "ADBE Shininess Coefficient", name: "Specular Shininess"

//    [1-10] matchName: "ADBE Metal Coefficient", name: "Metal"

//    [1-11] matchName: "ADBE Reflection Coefficient", name: "Reflection Intensity"

//    [1-12] matchName: "ADBE Glossiness Coefficient", name: "Reflection Sharpness"

//    [1-13] matchName: "ADBE Fresnel Coefficient", name: "Reflection Rolloff"

//    [1-14] matchName: "ADBE Transparency Coefficient", name: "Transparency"

//    [1-15] matchName: "ADBE Transp Rolloff", name: "Transparency Rolloff"

//    [1-16] matchName: "ADBE Index of Refraction", name: "Index of Refraction"

// [0-9] matchName: "ADBE Audio Group", name: "Audio"

//    [1-1] matchName: "ADBE Audio Levels", name: "Audio Levels"