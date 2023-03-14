#target photoshop

#include defaultParameters.jsx
#include utils.jsx
#include metadata.jsx
#include effects.jsx
#include colorGrading.jsx
#include colorMixer.jsx
#include histograms.jsx
#include hslTable.jsx
#include photoPrint.jsx
#include shapes.jsx
#include sliders.jsx
#include texts.jsx
#include toneCurves.jsx

function updateXMPMeta (settingsArray) {
    for (i = 0; i < settingsArray; i++) {

    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function updateXMPMeta(setting, newValue) {

    xmpMeta = new XMPMeta(app.activeDocument.xmpMetadata.rawData);

    xmpMeta.setProperty(ns, setting.crsName, newValue);

}
