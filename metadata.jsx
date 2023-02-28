//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
// TODO Function to update the reference XMPMeta object and modify the corresponding layers
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function updateMetadata (setting, newValue) {
    xmpMeta = new XMPMeta(app.activeDocument.xmpMetadata.rawData);

    xmpMeta.setProperty(ns, setting.crsName, newValue);

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getDocumentKeywords() {

    var lns = "http://ns.adobe.com/lightroom/1.0/";
    var xmpMeta = new XMPMeta(app.activeDocument.xmpMetadata.rawData);
    var keywords = [];

    for (var i = 1; i <= xmpMeta.countArrayItems(lns, "hierarchicalSubject"); i++) { 

        keywords.push(xmpMeta.getArrayItem(lns, "hierarchicalSubject", i).toString());

    }

    return keywords;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getDocumentProperty(propertyName) {

    var propertyValue;
    var doc = app.activeDocument;

    // Exif entry index (Variable and Value) for the desired propertyName as defined in https://web.archive.org/web/20190624045241if_/http://www.cipa.jp:80/std/documents/e/DC-008-Translation-2019-E.pdf
    try{

        var exifPropertyValue = getExifPropertyValueByExifPropertyName(propertyName);

    }   catch (e)   {}

    switch (propertyName) {

        case 'Location':

            if(doc.info.city == "" && doc.info.country == "") {

                propertyValue   = "";

            } else if (doc.info.city == "") {

                propertyValue   = doc.info.country;

            } else {

                propertyValue   = doc.info.city + ", " + doc.info.country;

            }

        break;

        case 'GPS':

            propertyValue   = getExifPropertyValueByExifPropertyName("GPS Latitude") + getExifPropertyValueByExifPropertyName("GPS Latitude Ref") + getExifPropertyValueByExifPropertyName("GPS Longitude") + getExifPropertyValueByExifPropertyName("GPS Longitude Ref");
        
        break;
        
        case 'Date':

            if(doc.info.creationDate=="") {
                
                propertyValue= "";

            } else {

                var dateString = doc.info.creationDate;
                var year = dateString.substring(0,4);
                var month = parseInt(dateString.substring(4,6));
                var day = parseInt(dateString.substring(6,8)).toString();

                propertyValue= returnMonth(month, "English") + " - " + year;

            }

        break;

        case 'Headline':
            propertyValue= doc.info.headline;
        break;

        case 'Caption':
            propertyValue= doc.info.caption;
        break;

        case "ISO Speed Ratings":
            propertyValue= "ISO " + exifPropertyValue;
        break;

        case "Model": // Camera model

            switch (exifPropertyValue) {

                case "ILCE-6400":
                    propertyValue= "Sony A6400";
                break;

                case "Sony A7IV":
                    propertyValue= "Sony A7 Mark IV";
                break;

                case "ILCE-7M4":
                    propertyValue= "Sony A7 Mark IV";
                break;

                case "NIKON D610":
                    propertyValue= "Nikon D610";
                break;

                default:
                    propertyValue= exifPropertyValue;
                break;

            }

        break;

        case "EXIF tag 42036": // Lens Model

            switch (exifPropertyValue) {
                
                case "E 17-28mm F2.8-2.8":
                    propertyValue= "Tamron 17-28 F2.8";
                break;

                case "SAMYANG AF 35mm F2.8":
                    propertyValue= "Samyang 35 F2.8";
                break;

                case "16mm F1.4 DC DN | Contemporary 017":
                    propertyValue= "Sigma 16 F1.4";
                break;

                case "FE 85mm F1.8":
                    propertyValue= "Sony 85 F1.8";
                break;

                case "E 35-150mm F2.0-F2.8 A058":
                    propertyValue= "Tamron 35-150 F2-2.8";
                break;

                case ("35.0 mm f/1.8" || "TAMRON SP 35mm F1.8 Di VC USD F012N"):
                    propertyValue= "Tamron 35 F1.8";
                break;

                case "50.0 mm f/1.4":
                    propertyValue= "Nikon 50 F1.4";
                break;

                case "11.0-16.0 mm f/2.8":
                    propertyValue= "Tokina 11-16 F2.8";
                break;

                case "24.0-70.0 mm f/2.8":
                    propertyValue= "Tamron 24-70 F2.8";
                break;

                case ("70.0-200.0 mm f/2.8" || "TAMRON SP 70-200mm F2.8 Di VC USD A009N"):
                    propertyValue= "Tamron 70-200 F2.8";
                break;

                default:
                    propertyValue= exifPropertyValue;
                break;
            }

        break;

        default: // Other camera parameters

            propertyValue = exifPropertyValue;

        break;

    }

    return propertyValue;

    function getExifPropertyValueByExifPropertyName ( targetPropertyName ) {
        
        exifProperties = app.activeDocument.info.exif;

        for (var i = 0; i < exifProperties.length; i++) {

            var exifProperty = exifProperties[i];
            var exifPropertyName = exifProperty[0];
            var exifPropertyValue = exifProperty[1].replace(/(\r\n|\n|\r)/gm, "");

            if (exifPropertyName == targetPropertyName) return exifPropertyValue;

        }

    }

    function returnMonth(monthNumber, language) {

        var month = new Array();

        switch(language) {

            case "Spanish":
                month[0] = "Unknown";
                month[1] = "Enero"	;
                month[2] = "Febrero";
                month[3] = "Marzo";
                month[4] = "Abril";
                month[5] = "Mayo";
                month[6] = "Junio";
                month[7] = "Julio";
                month[8] = "Agosto";
                month[9] = "Septiembre";
                month[10] = "Octubre";
                month[11] = "Noviembre";
                month[12] = "Diciembre";
            break;
            
            case "English":
                month[0] = "Unknown";
                month[1] = "January"	;
                month[2] = "February";
                month[3] = "March";
                month[4] = "April";
                month[5] = "May";
                month[6] = "June";
                month[7] = "July";
                month[8] = "August";
                month[9] = "September";
                month[10] = "October";
                month[11] = "November";
                month[12] = "December";
            break;

        }

        

        return month[monthNumber];

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function findPresetInfoInKeywords () {

    var docKeywords = getDocumentKeywords();

    for (var i=0; i<docKeywords.length; i++) {

        if(docKeywords[i].match("Preset")) {var presetInfo = docKeywords[i]; break;}

    }

    if(presetInfo == undefined) {
        var presetPackName = "Unknown";
        var presetName = "Unknown";
    }   else{
        var presetPackName = presetInfo.split("|")[1];
        var presetName = presetInfo.split("|")[2];
    }


    return { 
        'presetPackName': presetPackName, 
        'presetName': presetName
    };

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Setting (displayName, crsName, min, max, defaultValue) {

    var xmpMeta = new XMPMeta(app.activeDocument.xmpMetadata.rawData);

    this.displayName = displayName;
    this.crsName = crsName;
    this.min = min;
    this.max = max;
    this.settingValue = [];
    this.defaultValue = [];
    this.interpolatedValues = [];

    if(this.crsName.match("ToneCurvePV2012")) {


        for (var i = 0; i < xmpMeta.countArrayItems(ns,this.crsName); i++) { 

            var inputValue  = parseInt(xmpMeta.getArrayItem(ns, this.crsName, i + 1).value.split(", ")[0]);
            var outputValue = parseInt(xmpMeta.getArrayItem(ns, this.crsName, i + 1).value.split(", ")[1]);
            this.settingValue.push([inputValue, outputValue]);

            var defaultInputValue = inputValue;
            var defaultOutputValue = defaultInputValue;
            this.defaultValue.push([defaultInputValue, defaultOutputValue]);

            var interpolatedInputValue = interpolateValues(defaultInputValue, inputValue, 30, 2);
            var interpolatedOutputValue = interpolateValues(defaultOutputValue, outputValue, 30, 2);
            this.interpolatedValues.push([interpolatedInputValue, interpolatedOutputValue]);

        }

        if (arraysEqual(this.settingValue, this.defaultValue)) {

            this.isCustom = false;

        } else {

            this.isCustom = true;

        }

    } else {
        
        this.settingValue = xmpMeta.getProperty(ns, this.crsName);
        this.defaultValue = defaultValue;
        this.interpolatedValues = interpolateValues(this.defaultValue, this.settingValue, 30, 2);

        if (this.settingValue == this.defaultValue) {

            this.isCustom = false;

        } else {

            this.isCustom = true;

        }

    }

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

