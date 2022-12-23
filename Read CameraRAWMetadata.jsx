// Solution https://community.adobe.com/t5/photoshop-ecosystem-discussions/how-to-read-xmp-metadata-in-ps-using-javascript/td-p/12966451
// Documentation https://extendscript.docsforadobe.dev/scripting-xmp/xmpscript-object-reference.html#xmpmeta-object
#target photoshop
var ns = "http://ns.adobe.com/camera-raw-settings/1.0/"; // Found in xmp header
ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
xmpMeta = new XMPMeta(app.activeDocument.xmpMetadata.rawData); 
var theValue = xmpMeta.getProperty(ns,"Saturation");
var arrayItems = xmpMeta.countArrayItems(ns,"ToneCurvePV2012");
var arrayValue = xmpMeta.getArrayItem(ns,"ToneCurvePV2012",1) //First argument is the schema of the variable we look for
alert(theValue);

/* Selected variables



*/

/* <crs:Version>14.4.1</crs:Version>
        <crs:ProcessVersion>11.0</crs:ProcessVersion>
        <crs:WhiteBalance>As Shot</crs:WhiteBalance>
        <crs:Temperature>4100</crs:Temperature>
        <crs:Tint>+4</crs:Tint>
        <crs:Exposure2012>0.00</crs:Exposure2012>
        <crs:Contrast2012>0</crs:Contrast2012>
        <crs:Highlights2012>-10</crs:Highlights2012>
        <crs:Shadows2012>+20</crs:Shadows2012>
        <crs:Whites2012>-10</crs:Whites2012>
        <crs:Blacks2012>+25</crs:Blacks2012>
        <crs:Texture>0</crs:Texture>
        <crs:Clarity2012>0</crs:Clarity2012>
        <crs:Dehaze>0</crs:Dehaze>
        <crs:Vibrance>0</crs:Vibrance>
        <crs:Saturation>-5</crs:Saturation>
        <crs:ParametricShadows>-45</crs:ParametricShadows>
        <crs:ParametricDarks>-30</crs:ParametricDarks>
        <crs:ParametricLights>+12</crs:ParametricLights>
        <crs:ParametricHighlights>0</crs:ParametricHighlights>
        <crs:ParametricShadowSplit>25</crs:ParametricShadowSplit>
        <crs:ParametricMidtoneSplit>44</crs:ParametricMidtoneSplit>
        <crs:ParametricHighlightSplit>75</crs:ParametricHighlightSplit>
        <crs:Sharpness>25</crs:Sharpness>
        <crs:SharpenRadius>+1.0</crs:SharpenRadius>
        <crs:SharpenDetail>25</crs:SharpenDetail>
        <crs:SharpenEdgeMasking>0</crs:SharpenEdgeMasking>
        <crs:LuminanceSmoothing>0</crs:LuminanceSmoothing>
        <crs:ColorNoiseReduction>25</crs:ColorNoiseReduction>
        <crs:ColorNoiseReductionDetail>50</crs:ColorNoiseReductionDetail>
        <crs:ColorNoiseReductionSmoothness>50</crs:ColorNoiseReductionSmoothness>
        <crs:HueAdjustmentRed>+25</crs:HueAdjustmentRed>
        <crs:HueAdjustmentOrange>0</crs:HueAdjustmentOrange>
        <crs:HueAdjustmentYellow>+20</crs:HueAdjustmentYellow>
        <crs:HueAdjustmentGreen>+20</crs:HueAdjustmentGreen>
        <crs:HueAdjustmentAqua>0</crs:HueAdjustmentAqua>
        <crs:HueAdjustmentBlue>+4</crs:HueAdjustmentBlue>
        <crs:HueAdjustmentPurple>+10</crs:HueAdjustmentPurple>
        <crs:HueAdjustmentMagenta>+25</crs:HueAdjustmentMagenta>
        <crs:SaturationAdjustmentRed>-10</crs:SaturationAdjustmentRed>
        <crs:SaturationAdjustmentOrange>-10</crs:SaturationAdjustmentOrange>
        <crs:SaturationAdjustmentYellow>-10</crs:SaturationAdjustmentYellow>
        <crs:SaturationAdjustmentGreen>-40</crs:SaturationAdjustmentGreen>
        <crs:SaturationAdjustmentAqua>-35</crs:SaturationAdjustmentAqua>
        <crs:SaturationAdjustmentBlue>-10</crs:SaturationAdjustmentBlue>
        <crs:SaturationAdjustmentPurple>-35</crs:SaturationAdjustmentPurple>
        <crs:SaturationAdjustmentMagenta>-30</crs:SaturationAdjustmentMagenta>
        <crs:LuminanceAdjustmentRed>-15</crs:LuminanceAdjustmentRed>
        <crs:LuminanceAdjustmentOrange>0</crs:LuminanceAdjustmentOrange>
        <crs:LuminanceAdjustmentYellow>+15</crs:LuminanceAdjustmentYellow>
        <crs:LuminanceAdjustmentGreen>0</crs:LuminanceAdjustmentGreen>
        <crs:LuminanceAdjustmentAqua>+30</crs:LuminanceAdjustmentAqua>
        <crs:LuminanceAdjustmentBlue>-20</crs:LuminanceAdjustmentBlue>
        <crs:LuminanceAdjustmentPurple>0</crs:LuminanceAdjustmentPurple>
        <crs:LuminanceAdjustmentMagenta>+10</crs:LuminanceAdjustmentMagenta>
        <crs:SplitToningShadowHue>0</crs:SplitToningShadowHue>
        <crs:SplitToningShadowSaturation>0</crs:SplitToningShadowSaturation>
        <crs:SplitToningHighlightHue>0</crs:SplitToningHighlightHue>
        <crs:SplitToningHighlightSaturation>0</crs:SplitToningHighlightSaturation>
        <crs:SplitToningBalance>0</crs:SplitToningBalance>
        <crs:ColorGradeMidtoneHue>0</crs:ColorGradeMidtoneHue>
        <crs:ColorGradeMidtoneSat>0</crs:ColorGradeMidtoneSat>
        <crs:ColorGradeShadowLum>0</crs:ColorGradeShadowLum>
        <crs:ColorGradeMidtoneLum>0</crs:ColorGradeMidtoneLum>
        <crs:ColorGradeHighlightLum>0</crs:ColorGradeHighlightLum>
        <crs:ColorGradeBlending>50</crs:ColorGradeBlending>
        <crs:ColorGradeGlobalHue>0</crs:ColorGradeGlobalHue>
        <crs:ColorGradeGlobalSat>0</crs:ColorGradeGlobalSat>
        <crs:ColorGradeGlobalLum>0</crs:ColorGradeGlobalLum>
        <crs:AutoLateralCA>0</crs:AutoLateralCA>
        <crs:LensProfileEnable>1</crs:LensProfileEnable>
        <crs:LensManualDistortionAmount>0</crs:LensManualDistortionAmount>
        <crs:VignetteAmount>0</crs:VignetteAmount>
        <crs:DefringePurpleAmount>0</crs:DefringePurpleAmount>
        <crs:DefringePurpleHueLo>30</crs:DefringePurpleHueLo>
        <crs:DefringePurpleHueHi>70</crs:DefringePurpleHueHi>
        <crs:DefringeGreenAmount>0</crs:DefringeGreenAmount>
        <crs:DefringeGreenHueLo>40</crs:DefringeGreenHueLo>
        <crs:DefringeGreenHueHi>60</crs:DefringeGreenHueHi>
        <crs:PerspectiveUpright>2</crs:PerspectiveUpright>
        <crs:PerspectiveVertical>0</crs:PerspectiveVertical>
        <crs:PerspectiveHorizontal>0</crs:PerspectiveHorizontal>
        <crs:PerspectiveRotate>0.0</crs:PerspectiveRotate>
        <crs:PerspectiveAspect>0</crs:PerspectiveAspect>
        <crs:PerspectiveScale>100</crs:PerspectiveScale>
        <crs:PerspectiveX>0.00</crs:PerspectiveX>
        <crs:PerspectiveY>0.00</crs:PerspectiveY>
        <crs:GrainAmount>80</crs:GrainAmount>
        <crs:GrainSize>20</crs:GrainSize>
        <crs:GrainFrequency>40</crs:GrainFrequency>
        <crs:PostCropVignetteAmount>0</crs:PostCropVignetteAmount>
        <crs:ShadowTint>0</crs:ShadowTint>
        <crs:RedHue>0</crs:RedHue>
        <crs:RedSaturation>0</crs:RedSaturation>
        <crs:GreenHue>0</crs:GreenHue>
        <crs:GreenSaturation>0</crs:GreenSaturation>
        <crs:BlueHue>0</crs:BlueHue>
        <crs:BlueSaturation>0</crs:BlueSaturation>
        <crs:ConvertToGrayscale>False</crs:ConvertToGrayscale>
        <crs:OverrideLookVignette>False</crs:OverrideLookVignette>
        <crs:ToneCurveName2012>Custom</crs:ToneCurveName2012>
        <crs:ToneCurvePV2012>
        <rdf:Seq>
            <rdf:li>0, 36</rdf:li>
            <rdf:li>44, 68</rdf:li>
            <rdf:li>118, 129</rdf:li>
            <rdf:li>255, 250</rdf:li>
        </rdf:Seq>
        </crs:ToneCurvePV2012>
        <crs:ToneCurvePV2012Red>
        <rdf:Seq>
            <rdf:li>0, 0</rdf:li>
            <rdf:li>21, 11</rdf:li>
            <rdf:li>73, 56</rdf:li>
            <rdf:li>120, 123</rdf:li>
            <rdf:li>182, 193</rdf:li>
            <rdf:li>255, 253</rdf:li>
        </rdf:Seq>
        </crs:ToneCurvePV2012Red>
        <crs:ToneCurvePV2012Green>
        <rdf:Seq>
            <rdf:li>0, 2</rdf:li>
            <rdf:li>24, 15</rdf:li>
            <rdf:li>120, 122</rdf:li>
            <rdf:li>182, 192</rdf:li>
            <rdf:li>255, 253</rdf:li>
        </rdf:Seq>
        </crs:ToneCurvePV2012Green>
        <crs:ToneCurvePV2012Blue>
        <rdf:Seq>
            <rdf:li>0, 4</rdf:li>
            <rdf:li>66, 51</rdf:li>
            <rdf:li>121, 121</rdf:li>
            <rdf:li>177, 186</rdf:li>
            <rdf:li>226, 231</rdf:li>
            <rdf:li>255, 253</rdf:li>
        </rdf:Seq>
        </crs:ToneCurvePV2012Blue>
        <crs:CameraProfile>Adobe Standard</crs:CameraProfile>
        <crs:CameraProfileDigest>A4DC20C59DE4E2DF67946B80BFDA0801</crs:CameraProfileDigest>
        <crs:LensProfileSetup>LensDefaults</crs:LensProfileSetup>
        <crs:LensProfileName>Adobe (TAMRON 35-150mm F2-2.8 Di III VXD A058)</crs:LensProfileName>
        <crs:LensProfileFilename>SONY (TAMRON 35-150mm F2-2.8 Di III VXD A058) - RAW.lcp</crs:LensProfileFilename>
        <crs:LensProfileDigest>9101701948B53303FC4FDA54CE983A29</crs:LensProfileDigest>
        <crs:LensProfileIsEmbedded>False</crs:LensProfileIsEmbedded>
        <crs:LensProfileDistortionScale>100</crs:LensProfileDistortionScale>
        <crs:LensProfileVignettingScale>100</crs:LensProfileVignettingScale>
        <crs:UprightVersion>151388160</crs:UprightVersion>
        <crs:UprightCenterMode>0</crs:UprightCenterMode>
        <crs:UprightCenterNormX>0.494408</crs:UprightCenterNormX>
        <crs:UprightCenterNormY>0.50098</crs:UprightCenterNormY>
        <crs:UprightFocalMode>0</crs:UprightFocalMode>
        <crs:UprightFocalLength35mm>38.2326</crs:UprightFocalLength35mm>
        <crs:UprightPreview>False</crs:UprightPreview>
        <crs:UprightDependentDigest>1BD08FD524B15396C40CA6AF99BB4671</crs:UprightDependentDigest>
        <crs:UprightTransformCount>6</crs:UprightTransformCount>
        <crs:UprightTransform_0>1.000000000,0.000000000,0.000000000,0.000000000,1.000000000,0.000000000,0.000000000,0.000000000,1.000000000</crs:UprightTransform_0>
        <crs:UprightTransform_1>1.000840813,0.000246001,-0.000543213,-0.000554958,1.000564171,-0.000005204,0.000000558,-0.000001697,1.000000000</crs:UprightTransform_1>
        <crs:UprightTransform_2>1.055501597,0.003187635,-0.011278089,0.011004835,1.036807589,-0.012154709,0.035821368,0.000111755,1.000000000</crs:UprightTransform_2>
        <crs:UprightTransform_3>1.000561455,0.000246771,-0.000404113,-0.000555235,1.000561455,-0.000003110,0.000000000,0.000000000,1.000000000</crs:UprightTransform_3>
        <crs:UprightTransform_4>1.006781127,0.003040519,-0.004910466,-0.006837013,1.006782739,0.000029087,0.000000361,0.000003574,1.000000000</crs:UprightTransform_4>
        <crs:UprightTransform_5>1.000000000,0.000000000,0.000000000,0.000000000,1.000000000,0.000000000,0.000000000,0.000000000,1.000000000</crs:UprightTransform_5>
        <crs:HasSettings>True</crs:HasSettings>
        <crs:CropTop>0.01304</crs:CropTop>
        <crs:CropLeft>0.02608</crs:CropLeft>
        <crs:CropBottom>0.98696</crs:CropBottom>
        <crs:CropRight>1</crs:CropRight>
        <crs:CropAngle>0</crs:CropAngle>
        <crs:CropConstrainToWarp>0</crs:CropConstrainToWarp>
        <crs:HasCrop>True</crs:HasCrop>
        <crs:AlreadyApplied>True</crs:AlreadyApplied> */



        <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 7.2-c000 79.566ebc5, 2022/05/09-07:22:29        ">
   <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Description rdf:about=""
            xmlns:xmp="http://ns.adobe.com/xap/1.0/"
            xmlns:aux="http://ns.adobe.com/exif/1.0/aux/"
            xmlns:exifEX="http://cipa.jp/exif/1.0/"
            xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"
            xmlns:xmpMM="http://ns.adobe.com/xap/1.0/mm/"
            xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#"
            xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#"
            xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/"
            xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/"
            xmlns:lr="http://ns.adobe.com/lightroom/1.0/"
            xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/"
            xmlns:tiff="http://ns.adobe.com/tiff/1.0/"
            xmlns:exif="http://ns.adobe.com/exif/1.0/">
         <xmp:CreatorTool>Adobe Photoshop Lightroom 11.2 Classic (Windows)</xmp:CreatorTool>
         <xmp:ModifyDate>2022-12-22T00:53:58+08:00</xmp:ModifyDate>
         <xmp:CreateDate>2022-11-23T13:19:42</xmp:CreateDate>
         <xmp:MetadataDate>2022-12-22T00:53:58+08:00</xmp:MetadataDate>
         <aux:SerialNumber>07639725</aux:SerialNumber>
         <aux:LensInfo>350/10 1500/10 20/10 28/10</aux:LensInfo>
         <aux:Lens>E 35-150mm F2.0-F2.8 A058</aux:Lens>
         <aux:LensDistortInfo>1069719627/1073741824 -13403737/1073741824 -2242532/1073741824 19646999/1073741824</aux:LensDistortInfo>
         <aux:DistortionCorrectionAlreadyApplied>True</aux:DistortionCorrectionAlreadyApplied>
         <aux:LateralChromaticAberrationCorrectionAlreadyApplied>True</aux:LateralChromaticAberrationCorrectionAlreadyApplied>
         <aux:VignetteCorrectionAlreadyApplied>True</aux:VignetteCorrectionAlreadyApplied>
         <exifEX:LensModel>E 35-150mm F2.0-F2.8 A058</exifEX:LensModel>
         <photoshop:DateCreated>2022-11-23T13:19:42.463+08:00</photoshop:DateCreated>
         <photoshop:City>Taipei</photoshop:City>
         <photoshop:State>Taipei</photoshop:State>
         <photoshop:Country>Taiwan</photoshop:Country>
         <photoshop:ColorMode>3</photoshop:ColorMode>
         <photoshop:ICCProfile>ProPhoto RGB</photoshop:ICCProfile>
         <xmpMM:DocumentID>xmp.did:88b10ee6-a1ee-934a-a97c-a479b936bf90</xmpMM:DocumentID>
         <xmpMM:PreservedFileName>_DSC0146.ARW</xmpMM:PreservedFileName>
         <xmpMM:OriginalDocumentID>E2CC144AB25C28C1906C3994DEBADF4F</xmpMM:OriginalDocumentID>
         <xmpMM:InstanceID>xmp.iid:88b10ee6-a1ee-934a-a97c-a479b936bf90</xmpMM:InstanceID>
         <xmpMM:History>
            <rdf:Seq>
               <rdf:li rdf:parseType="Resource">
                  <stEvt:action>saved</stEvt:action>
                  <stEvt:instanceID>xmp.iid:45726967-b1af-6249-9cf0-a1c312344ff6</stEvt:instanceID>
                  <stEvt:when>2022-12-22T00:52:55+08:00</stEvt:when>
                  <stEvt:softwareAgent>Adobe Photoshop Lightroom Classic 11.2 (Windows)</stEvt:softwareAgent>
                  <stEvt:changed>/metadata</stEvt:changed>
               </rdf:li>
               <rdf:li rdf:parseType="Resource">
                  <stEvt:action>derived</stEvt:action>
                  <stEvt:parameters>converted from image/x-sony-arw to image/tiff</stEvt:parameters>
               </rdf:li>
               <rdf:li rdf:parseType="Resource">
                  <stEvt:action>saved</stEvt:action>
                  <stEvt:instanceID>xmp.iid:88b10ee6-a1ee-934a-a97c-a479b936bf90</stEvt:instanceID>
                  <stEvt:when>2022-12-22T00:53:58+08:00</stEvt:when>
                  <stEvt:softwareAgent>Adobe Photoshop Camera Raw 14.4.1 (Windows)</stEvt:softwareAgent>
                  <stEvt:changed>/</stEvt:changed>
               </rdf:li>
            </rdf:Seq>
         </xmpMM:History>
         <xmpMM:DerivedFrom rdf:parseType="Resource">
            <stRef:instanceID>xmp.iid:45726967-b1af-6249-9cf0-a1c312344ff6</stRef:instanceID>
            <stRef:documentID>E2CC144AB25C28C1906C3994DEBADF4F</stRef:documentID>
            <stRef:originalDocumentID>E2CC144AB25C28C1906C3994DEBADF4F</stRef:originalDocumentID>
         </xmpMM:DerivedFrom>
         <dc:format>image/tiff</dc:format>
         <dc:creator>
            <rdf:Seq>
               <rdf:li>óliver lalan</rdf:li>
            </rdf:Seq>
         </dc:creator>
         <dc:rights>
            <rdf:Alt>
               <rdf:li xml:lang="x-default">óliver lalan</rdf:li>
            </rdf:Alt>
         </dc:rights>
         <dc:description>
            <rdf:Alt>
               <rdf:li xml:lang="x-default">Iba a pasar unos días en Taipei, y la ciudad era más cara de lo que recordaba.&#xA;Después de mucho buscar, elegí un lugar económico, de lo más económico que había. Tenía unas fotos horribles, pero las opiniones no eran malas. &#xA;Me he alojado en lugares peores, pero jamás en un lugar tan extraño.</rdf:li>
            </rdf:Alt>
         </dc:description>
         <dc:subject>
            <rdf:Bag>
               <rdf:li>SCF05</rdf:li>
               <rdf:li>Shugan Color Film</rdf:li>
               <rdf:li>oliverlalan</rdf:li>
               <rdf:li>óliver lalan</rdf:li>
            </rdf:Bag>
         </dc:subject>
         <xmpRights:Marked>True</xmpRights:Marked>
         <xmpRights:UsageTerms>
            <rdf:Alt>
               <rdf:li xml:lang="x-default">No reproduction rights are granted without the express written permission of the author. No other usage is expressed or implied.</rdf:li>
            </rdf:Alt>
         </xmpRights:UsageTerms>
         <Iptc4xmpCore:Location>Wanhua District</Iptc4xmpCore:Location>
         <Iptc4xmpCore:CountryCode>TW</Iptc4xmpCore:CountryCode>
         <Iptc4xmpCore:CreatorContactInfo rdf:parseType="Resource">
            <Iptc4xmpCore:CiAdrCtry>Spain</Iptc4xmpCore:CiAdrCtry>
            <Iptc4xmpCore:CiEmailWork>oliverlalan@outlook.com</Iptc4xmpCore:CiEmailWork>
         </Iptc4xmpCore:CreatorContactInfo>
         <lr:weightedFlatSubject>
            <rdf:Bag>
               <rdf:li>óliver lalan</rdf:li>
               <rdf:li>oliverlalan</rdf:li>
               <rdf:li>Shugan Color Film</rdf:li>
               <rdf:li>SCF05</rdf:li>
            </rdf:Bag>
         </lr:weightedFlatSubject>
         <crs:Version>14.4.1</crs:Version>
         <crs:ProcessVersion>11.0</crs:ProcessVersion>
         <crs:WhiteBalance>As Shot</crs:WhiteBalance>
         <crs:Temperature>4100</crs:Temperature>
         <crs:Tint>+4</crs:Tint>
         <crs:Exposure2012>0.00</crs:Exposure2012>
         <crs:Contrast2012>0</crs:Contrast2012>
         <crs:Highlights2012>-10</crs:Highlights2012>
         <crs:Shadows2012>+20</crs:Shadows2012>
         <crs:Whites2012>-10</crs:Whites2012>
         <crs:Blacks2012>+25</crs:Blacks2012>
         <crs:Texture>0</crs:Texture>
         <crs:Clarity2012>0</crs:Clarity2012>
         <crs:Dehaze>0</crs:Dehaze>
         <crs:Vibrance>0</crs:Vibrance>
         <crs:Saturation>-5</crs:Saturation>
         <crs:ParametricShadows>-45</crs:ParametricShadows>
         <crs:ParametricDarks>-30</crs:ParametricDarks>
         <crs:ParametricLights>+12</crs:ParametricLights>
         <crs:ParametricHighlights>0</crs:ParametricHighlights>
         <crs:ParametricShadowSplit>25</crs:ParametricShadowSplit>
         <crs:ParametricMidtoneSplit>44</crs:ParametricMidtoneSplit>
         <crs:ParametricHighlightSplit>75</crs:ParametricHighlightSplit>
         <crs:Sharpness>25</crs:Sharpness>
         <crs:SharpenRadius>+1.0</crs:SharpenRadius>
         <crs:SharpenDetail>25</crs:SharpenDetail>
         <crs:SharpenEdgeMasking>0</crs:SharpenEdgeMasking>
         <crs:LuminanceSmoothing>0</crs:LuminanceSmoothing>
         <crs:ColorNoiseReduction>25</crs:ColorNoiseReduction>
         <crs:ColorNoiseReductionDetail>50</crs:ColorNoiseReductionDetail>
         <crs:ColorNoiseReductionSmoothness>50</crs:ColorNoiseReductionSmoothness>
         <crs:HueAdjustmentRed>+25</crs:HueAdjustmentRed>
         <crs:HueAdjustmentOrange>0</crs:HueAdjustmentOrange>
         <crs:HueAdjustmentYellow>+20</crs:HueAdjustmentYellow>
         <crs:HueAdjustmentGreen>+20</crs:HueAdjustmentGreen>
         <crs:HueAdjustmentAqua>0</crs:HueAdjustmentAqua>
         <crs:HueAdjustmentBlue>+4</crs:HueAdjustmentBlue>
         <crs:HueAdjustmentPurple>+10</crs:HueAdjustmentPurple>
         <crs:HueAdjustmentMagenta>+25</crs:HueAdjustmentMagenta>
         <crs:SaturationAdjustmentRed>-10</crs:SaturationAdjustmentRed>
         <crs:SaturationAdjustmentOrange>-10</crs:SaturationAdjustmentOrange>
         <crs:SaturationAdjustmentYellow>-10</crs:SaturationAdjustmentYellow>
         <crs:SaturationAdjustmentGreen>-40</crs:SaturationAdjustmentGreen>
         <crs:SaturationAdjustmentAqua>-35</crs:SaturationAdjustmentAqua>
         <crs:SaturationAdjustmentBlue>-10</crs:SaturationAdjustmentBlue>
         <crs:SaturationAdjustmentPurple>-35</crs:SaturationAdjustmentPurple>
         <crs:SaturationAdjustmentMagenta>-30</crs:SaturationAdjustmentMagenta>
         <crs:LuminanceAdjustmentRed>-15</crs:LuminanceAdjustmentRed>
         <crs:LuminanceAdjustmentOrange>0</crs:LuminanceAdjustmentOrange>
         <crs:LuminanceAdjustmentYellow>+15</crs:LuminanceAdjustmentYellow>
         <crs:LuminanceAdjustmentGreen>0</crs:LuminanceAdjustmentGreen>
         <crs:LuminanceAdjustmentAqua>+30</crs:LuminanceAdjustmentAqua>
         <crs:LuminanceAdjustmentBlue>-20</crs:LuminanceAdjustmentBlue>
         <crs:LuminanceAdjustmentPurple>0</crs:LuminanceAdjustmentPurple>
         <crs:LuminanceAdjustmentMagenta>+10</crs:LuminanceAdjustmentMagenta>
         <crs:SplitToningShadowHue>0</crs:SplitToningShadowHue>
         <crs:SplitToningShadowSaturation>0</crs:SplitToningShadowSaturation>
         <crs:SplitToningHighlightHue>0</crs:SplitToningHighlightHue>
         <crs:SplitToningHighlightSaturation>0</crs:SplitToningHighlightSaturation>
         <crs:SplitToningBalance>0</crs:SplitToningBalance>
         <crs:ColorGradeMidtoneHue>0</crs:ColorGradeMidtoneHue>
         <crs:ColorGradeMidtoneSat>0</crs:ColorGradeMidtoneSat>
         <crs:ColorGradeShadowLum>0</crs:ColorGradeShadowLum>
         <crs:ColorGradeMidtoneLum>0</crs:ColorGradeMidtoneLum>
         <crs:ColorGradeHighlightLum>0</crs:ColorGradeHighlightLum>
         <crs:ColorGradeBlending>50</crs:ColorGradeBlending>
         <crs:ColorGradeGlobalHue>0</crs:ColorGradeGlobalHue>
         <crs:ColorGradeGlobalSat>0</crs:ColorGradeGlobalSat>
         <crs:ColorGradeGlobalLum>0</crs:ColorGradeGlobalLum>
         <crs:AutoLateralCA>0</crs:AutoLateralCA>
         <crs:LensProfileEnable>1</crs:LensProfileEnable>
         <crs:LensManualDistortionAmount>0</crs:LensManualDistortionAmount>
         <crs:VignetteAmount>0</crs:VignetteAmount>
         <crs:DefringePurpleAmount>0</crs:DefringePurpleAmount>
         <crs:DefringePurpleHueLo>30</crs:DefringePurpleHueLo>
         <crs:DefringePurpleHueHi>70</crs:DefringePurpleHueHi>
         <crs:DefringeGreenAmount>0</crs:DefringeGreenAmount>
         <crs:DefringeGreenHueLo>40</crs:DefringeGreenHueLo>
         <crs:DefringeGreenHueHi>60</crs:DefringeGreenHueHi>
         <crs:PerspectiveUpright>2</crs:PerspectiveUpright>
         <crs:PerspectiveVertical>0</crs:PerspectiveVertical>
         <crs:PerspectiveHorizontal>0</crs:PerspectiveHorizontal>
         <crs:PerspectiveRotate>0.0</crs:PerspectiveRotate>
         <crs:PerspectiveAspect>0</crs:PerspectiveAspect>
         <crs:PerspectiveScale>100</crs:PerspectiveScale>
         <crs:PerspectiveX>0.00</crs:PerspectiveX>
         <crs:PerspectiveY>0.00</crs:PerspectiveY>
         <crs:GrainAmount>80</crs:GrainAmount>
         <crs:GrainSize>20</crs:GrainSize>
         <crs:GrainFrequency>40</crs:GrainFrequency>
         <crs:PostCropVignetteAmount>0</crs:PostCropVignetteAmount>
         <crs:ShadowTint>0</crs:ShadowTint>
         <crs:RedHue>0</crs:RedHue>
         <crs:RedSaturation>0</crs:RedSaturation>
         <crs:GreenHue>0</crs:GreenHue>
         <crs:GreenSaturation>0</crs:GreenSaturation>
         <crs:BlueHue>0</crs:BlueHue>
         <crs:BlueSaturation>0</crs:BlueSaturation>
         <crs:ConvertToGrayscale>False</crs:ConvertToGrayscale>
         <crs:OverrideLookVignette>False</crs:OverrideLookVignette>
         <crs:ToneCurveName2012>Custom</crs:ToneCurveName2012>
         <crs:ToneCurvePV2012>
            <rdf:Seq>
               <rdf:li>0, 36</rdf:li>
               <rdf:li>44, 68</rdf:li>
               <rdf:li>118, 129</rdf:li>
               <rdf:li>255, 250</rdf:li>
            </rdf:Seq>
         </crs:ToneCurvePV2012>
         <crs:ToneCurvePV2012Red>
            <rdf:Seq>
               <rdf:li>0, 0</rdf:li>
               <rdf:li>21, 11</rdf:li>
               <rdf:li>73, 56</rdf:li>
               <rdf:li>120, 123</rdf:li>
               <rdf:li>182, 193</rdf:li>
               <rdf:li>255, 253</rdf:li>
            </rdf:Seq>
         </crs:ToneCurvePV2012Red>
         <crs:ToneCurvePV2012Green>
            <rdf:Seq>
               <rdf:li>0, 2</rdf:li>
               <rdf:li>24, 15</rdf:li>
               <rdf:li>120, 122</rdf:li>
               <rdf:li>182, 192</rdf:li>
               <rdf:li>255, 253</rdf:li>
            </rdf:Seq>
         </crs:ToneCurvePV2012Green>
         <crs:ToneCurvePV2012Blue>
            <rdf:Seq>
               <rdf:li>0, 4</rdf:li>
               <rdf:li>66, 51</rdf:li>
               <rdf:li>121, 121</rdf:li>
               <rdf:li>177, 186</rdf:li>
               <rdf:li>226, 231</rdf:li>
               <rdf:li>255, 253</rdf:li>
            </rdf:Seq>
         </crs:ToneCurvePV2012Blue>
         <crs:CameraProfile>Adobe Standard</crs:CameraProfile>
         <crs:CameraProfileDigest>A4DC20C59DE4E2DF67946B80BFDA0801</crs:CameraProfileDigest>
         <crs:LensProfileSetup>LensDefaults</crs:LensProfileSetup>
         <crs:LensProfileName>Adobe (TAMRON 35-150mm F2-2.8 Di III VXD A058)</crs:LensProfileName>
         <crs:LensProfileFilename>SONY (TAMRON 35-150mm F2-2.8 Di III VXD A058) - RAW.lcp</crs:LensProfileFilename>
         <crs:LensProfileDigest>9101701948B53303FC4FDA54CE983A29</crs:LensProfileDigest>
         <crs:LensProfileIsEmbedded>False</crs:LensProfileIsEmbedded>
         <crs:LensProfileDistortionScale>100</crs:LensProfileDistortionScale>
         <crs:LensProfileVignettingScale>100</crs:LensProfileVignettingScale>
         <crs:UprightVersion>151388160</crs:UprightVersion>
         <crs:UprightCenterMode>0</crs:UprightCenterMode>
         <crs:UprightCenterNormX>0.494408</crs:UprightCenterNormX>
         <crs:UprightCenterNormY>0.50098</crs:UprightCenterNormY>
         <crs:UprightFocalMode>0</crs:UprightFocalMode>
         <crs:UprightFocalLength35mm>38.2326</crs:UprightFocalLength35mm>
         <crs:UprightPreview>False</crs:UprightPreview>
         <crs:UprightDependentDigest>1BD08FD524B15396C40CA6AF99BB4671</crs:UprightDependentDigest>
         <crs:UprightTransformCount>6</crs:UprightTransformCount>
         <crs:UprightTransform_0>1.000000000,0.000000000,0.000000000,0.000000000,1.000000000,0.000000000,0.000000000,0.000000000,1.000000000</crs:UprightTransform_0>
         <crs:UprightTransform_1>1.000840813,0.000246001,-0.000543213,-0.000554958,1.000564171,-0.000005204,0.000000558,-0.000001697,1.000000000</crs:UprightTransform_1>
         <crs:UprightTransform_2>1.055501597,0.003187635,-0.011278089,0.011004835,1.036807589,-0.012154709,0.035821368,0.000111755,1.000000000</crs:UprightTransform_2>
         <crs:UprightTransform_3>1.000561455,0.000246771,-0.000404113,-0.000555235,1.000561455,-0.000003110,0.000000000,0.000000000,1.000000000</crs:UprightTransform_3>
         <crs:UprightTransform_4>1.006781127,0.003040519,-0.004910466,-0.006837013,1.006782739,0.000029087,0.000000361,0.000003574,1.000000000</crs:UprightTransform_4>
         <crs:UprightTransform_5>1.000000000,0.000000000,0.000000000,0.000000000,1.000000000,0.000000000,0.000000000,0.000000000,1.000000000</crs:UprightTransform_5>
         <crs:HasSettings>True</crs:HasSettings>
         <crs:CropTop>0.01304</crs:CropTop>
         <crs:CropLeft>0.02608</crs:CropLeft>
         <crs:CropBottom>0.98696</crs:CropBottom>
         <crs:CropRight>1</crs:CropRight>
         <crs:CropAngle>0</crs:CropAngle>
         <crs:CropConstrainToWarp>0</crs:CropConstrainToWarp>
         <crs:HasCrop>True</crs:HasCrop>
         <crs:AlreadyApplied>True</crs:AlreadyApplied>
         <tiff:XResolution>300/1</tiff:XResolution>
         <tiff:YResolution>300/1</tiff:YResolution>
         <tiff:ResolutionUnit>2</tiff:ResolutionUnit>
         <tiff:Make>SONY</tiff:Make>
         <tiff:Model>ILCE-7M4</tiff:Model>
         <exif:ExifVersion>0232</exif:ExifVersion>
         <exif:ColorSpace>65535</exif:ColorSpace>
         <exif:PixelXDimension>6825</exif:PixelXDimension>
         <exif:PixelYDimension>4550</exif:PixelYDimension>
         <exif:DateTimeOriginal>2022-11-23T13:19:42</exif:DateTimeOriginal>
         <exif:ExposureTime>1/100</exif:ExposureTime>
         <exif:FNumber>28/10</exif:FNumber>
         <exif:ExposureProgram>1</exif:ExposureProgram>
         <exif:ISOSpeedRatings>
            <rdf:Seq>
               <rdf:li>200</rdf:li>
            </rdf:Seq>
         </exif:ISOSpeedRatings>
         <exif:ShutterSpeedValue>6643856/1000000</exif:ShutterSpeedValue>
         <exif:ApertureValue>2970854/1000000</exif:ApertureValue>
         <exif:BrightnessValue>914/2560</exif:BrightnessValue>
         <exif:ExposureBiasValue>0/10</exif:ExposureBiasValue>
         <exif:MaxApertureValue>512/256</exif:MaxApertureValue>
         <exif:MeteringMode>3</exif:MeteringMode>
         <exif:LightSource>0</exif:LightSource>
         <exif:Flash rdf:parseType="Resource">
            <exif:Fired>False</exif:Fired>
            <exif:Return>0</exif:Return>
            <exif:Mode>2</exif:Mode>
            <exif:Function>False</exif:Function>
            <exif:RedEyeMode>False</exif:RedEyeMode>
         </exif:Flash>
         <exif:FocalLength>380/10</exif:FocalLength>
         <exif:FocalPlaneXResolution>64449339/32768</exif:FocalPlaneXResolution>
         <exif:FocalPlaneYResolution>64449339/32768</exif:FocalPlaneYResolution>
         <exif:FocalPlaneResolutionUnit>3</exif:FocalPlaneResolutionUnit>
         <exif:FileSource>3</exif:FileSource>
         <exif:SceneType>1</exif:SceneType>
         <exif:CustomRendered>0</exif:CustomRendered>
         <exif:ExposureMode>1</exif:ExposureMode>
         <exif:WhiteBalance>0</exif:WhiteBalance>
         <exif:DigitalZoomRatio>16/16</exif:DigitalZoomRatio>
         <exif:FocalLengthIn35mmFilm>38</exif:FocalLengthIn35mmFilm>
         <exif:SceneCaptureType>0</exif:SceneCaptureType>
         <exif:Contrast>0</exif:Contrast>
         <exif:Saturation>0</exif:Saturation>
         <exif:Sharpness>0</exif:Sharpness>
         <exif:SubSecTime>403</exif:SubSecTime>
         <exif:SubSecTimeOriginal>463</exif:SubSecTimeOriginal>
         <exif:SubSecTimeDigitized>463</exif:SubSecTimeDigitized>
         <exif:SerialNumber>07639725</exif:SerialNumber>
         <exif:LensInfo>
            <rdf:Seq>
               <rdf:li>350/10</rdf:li>
            </rdf:Seq>
         </exif:LensInfo>
         <exif:Lens>E 35-150mm F2.0-F2.8 A058</exif:Lens>
         <exif:SensitivityType>2</exif:SensitivityType>
         <exif:RecommendedExposureIndex>200</exif:RecommendedExposureIndex>
         <exif:GPSVersionID>2.2.0.0</exif:GPSVersionID>
         <exif:GPSLatitude>25,2.7561N</exif:GPSLatitude>
         <exif:GPSLongitude>121,30.2395E</exif:GPSLongitude>
      </rdf:Description>
   </rdf:RDF>
</x:xmpmeta>
