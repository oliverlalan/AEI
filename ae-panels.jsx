////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createDashboardComposition (dashboardData, "horizontalSlider")
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createDashboardComposition (dashboardData, style) {

    var dashboardName = "Dashboard";
    var panels = dashboardData.panels;
    
    // Reset reference position
    var panelsReferencePosition = [0,0];

    // Create dashboard composition 
    var dashboardComposition = project.items.addComp(dashboardName, dashboardCompositionParameters.width, dashboardCompositionParameters.height, dashboardCompositionParameters.pixelAspect, dashboardCompositionParameters.duration, dashboardCompositionParameters.frameRate);

    // Create panels Composition
    var panelsComposition = createPanelsComposition (dashboardData, style);

    // Add background
    // var dashboardBackgroundLayer = dashboardComposition.layers.addSolid([46/255, 46/255, 46/255], "Dashboard Background", dashboardCompositionParameters.width, dashboardCompositionParameters.height, dashboardCompositionParameters.pixelAspect);

    // Include the precomposition created in the group composition
    var panelsCompositionLayer = dashboardComposition.layers.add(panelsComposition);

    // Position the precomposition in the group composition
    setAnchorPosition(panelsCompositionLayer, "topLeft");
    panelsCompositionLayer.position.setValue(panelsReferencePosition);

    // Animate Panels Composition Horizontally
    for (panelKey in panels) {

        var panel = panels[panelKey];

        if (panel.isCustomItem == true) {

            // Animate panel
            var keyValues = [panelsReferencePosition, [panelsReferencePosition[0] - dashboardCompositionParameters.width, panelsReferencePosition[1]]]
            panelsCompositionLayer.position.setValuesAtTimes(panel.animation.swipeIn.keyTimes, keyValues);

            // Update X position of the next precomposition
            panelsReferencePosition[0] -= dashboardCompositionParameters.width;

        }

    }

    return dashboardComposition;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createPanelsComposition (dashboardData, "horizontalSlider")
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createPanelsComposition (dashboardData, style) {

    var panelsName = "Panels";
    var panels = dashboardData.panels;

    // Reset reference position
    var dashboardReferencePosition = [0,0];

    // Create folder to store panel precompositions
    var panelsCompositionsFolder = project.items.addFolder(panelsName + " Pre-Compositions");

    // Create panels composition 
    var panelsComposition = project.items.addComp(panelsName, panelsCompositionParameters.width * dashboardData.customItems, panelsCompositionParameters.height, panelsCompositionParameters.pixelAspect, panelsCompositionParameters.duration, panelsCompositionParameters.frameRate);

    // Create title
    var panelsTitleComposition = createDashboardTitleComposition ("Settings");

    // Include the precomposition created in the group composition
    var panelsTitleCompositionLayer = panelsComposition.layers.add(panelsTitleComposition);

    // Position the precomposition in the group composition
    setAnchorPosition(panelsTitleCompositionLayer, "middleCenter");
    panelsTitleCompositionLayer.position.setValue(dashboardReferencePosition);

    // Update X position of the next precomposition
    dashboardReferencePosition[0] += panelCompositionParameters.width;

    for (panelKey in panels) {

        var panel = panels[panelKey];

        if (panel.isCustomItem == true) {

            // Create each panel precomposition
            var panelComposition = createPanelComposition (panel, style);

            // Store the panel precomposition in the corresponding folder
            panelComposition.parentFolder = panelsCompositionsFolder;

            // Include the panel precomposition created in the dashboard composition
            var panelCompositionLayer = panelsComposition.layers.add(panelComposition);

            // Position the panel precomposition in the dashboard composition
            setAnchorPosition(panelCompositionLayer, "topLeft");
            panelCompositionLayer.position.setValue(dashboardReferencePosition);

            // Animate each panel composition vertically taking into account the amount of groups per panel
            for (groupKey in panel.groups) {

                var group = panel.groups[groupKey];

                if (group.isCustomItem == true) {

                    // Animate panel
                    var keyValues = [dashboardReferencePosition, [dashboardReferencePosition[0], dashboardReferencePosition[1] - panelCompositionParameters.height]]
                    panelCompositionLayer.position.setValuesAtTimes(group.animation.swipeIn.keyTimes, keyValues);

                    // Update Y position of the next precomposition
                    dashboardReferencePosition[1] -= panelCompositionParameters.height;

                }

            }

            // Update X position of the next panel precomposition
            dashboardReferencePosition[0] += panelComposition.width;
            dashboardReferencePosition[1] = 0;

        }

    }

    return panelsComposition;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Description: 
// Call: createPanelComposition (imageSettings.panels.colorMixer, "horizontalSlider")
// TODO: Define styles
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createPanelComposition (panel, style) {

    var panelName = panel.displayName;
    var groups = panel.groups;

    // Reset reference position
    var panelReferencePosition = [panelCompositionParameters.width / 2, panelCompositionParameters.height / 2];

    // Create folder to store each slider
    var panelCompositionsFolder = project.items.addFolder(panelName + " Pre-Compositions");

    // Create group composition 
    var panelComposition = project.items.addComp(panelName, panelCompositionParameters.width, panelCompositionParameters.height * panel.customItems, panelCompositionParameters.pixelAspect, panelCompositionParameters.duration, panelCompositionParameters.frameRate);

    // Create title
    var panelTitleComposition = createDashboardTitleComposition (panelName);
    
    // Include the precomposition created in the group composition as layer
    var panelTitleCompositionLayer = panelComposition.layers.add(panelTitleComposition);

    // Position the precomposition in the group composition
    setAnchorPosition(panelTitleCompositionLayer, "middleCenter");
    panelTitleCompositionLayer.position.setValue(panelReferencePosition);

    // Update Y position of the next precomposition
    panelReferencePosition[1] += panelCompositionParameters.height;

    for (groupKey in groups) {

        var group = groups[groupKey];

        if (group.isCustomItem == true) {

            // Create each precomposition
            switch(group.groupType) {
            
                case "Slider":
                    var groupComposition = createSlidersGroupComposition (group, style);
                break;

                case "Tone Curve":
                    var groupComposition = createToneCurveGroupComposition(group, style);
                break;

                case "Color Mixer":
                    var groupComposition = createSlidersGroupComposition (group, style);
                break;

                case "Color Grading":
                    var groupComposition = createColorGradeGroupComposition (group, style);
                break;

            }

            // Store the precomposition in the corresponding folder
            groupComposition.parentFolder = panelCompositionsFolder;

            // Include the precomposition created in the group composition
            var groupCompositionLayer = panelComposition.layers.add(groupComposition);

            // Position the precomposition in the group composition
            setAnchorPosition(groupCompositionLayer, "middleCenter");
            groupCompositionLayer.position.setValue(panelReferencePosition);

            // Update Y position of the next precomposition
            panelReferencePosition[1] += panelCompositionParameters.height;

        }

    }

    return panelComposition;

}
