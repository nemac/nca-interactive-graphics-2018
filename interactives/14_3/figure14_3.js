(function () {
    "use strict";

    // returns a generic Leaflet button which is slightly customized
    function makeButton(backgroundImage, title, type) {
        var button = L.DomUtil.create("a", "leaflet-control-view-" + type);
        button.title = title;
        button.href = "#";
        button.setAttribute("role", "button");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-label", title);
        button.style.backgroundImage = "url(" + backgroundImage + ")";
        button.style.backgroundSize = "contain";

        return button;
    }

    // returns the zoom button for conus
    function makeSCButton(map) {
        var button = makeButton(
            "../../interactives/14_3/images/sc-button.png",
            "Zoom to Charleston, SC",
            "sc"
        );

        button.onclick = function(e) {
            e.preventDefault();
            map.setView([32.77572, -79.90775], 9);
        }

        return button;
    }

    // returns the zoom button for alaska
    function makeFLButton(map) {
        var flButton = makeButton(
            "../../interactives/14_3/images/FL-button.png",
            "Zoom to Miami, FL",
            "fl"
        );
        flButton.onclick = function(e) {
            e.preventDefault();
            map.setView([25.51983, -80.51826], 9);
        }
        return flButton;
    }

    // returns the entire DOM object for the buttons and their container
    function makeButtonContainer(map) {
        var container = L.DomUtil.create("div", "leaflet-bar leaflet-control leaflet-control-custom");
        container.appendChild(makeSCButton(map));
        container.appendChild(makeFLButton(map));
        return container;
    }

    // Returns the overall config object for the custom leaflet zoom buttons
    function makeZoomButtonConfig() {
        return {
            options: {
                position: 'topleft'
            },

            onAdd: function (map) {
                return makeButtonContainer(map);
            }
        }
    }

    // Gets the fill color for each category of storm. Fall through on the switch statement is
    // deliberate.
    function getStormLayerColor(category) {
        switch (category) {
            case 1:
            case "Category 1":
                return "#00549d";
            case 2:
            case "Category 2":
                return "#0184be";
            case 3:
            case "Category 3":
                return "#5eafd7";
            case 4:
            case "Category 4":
                return "#b9d7e7";
            case 5:
            case "Category 5":
                return "#eef3ff";
        }
    }

    // Configures the storm category layers
    function makeStormLayerConfig(category) {
        return {
            style: function(feature) {
                return {
                    color: getStormLayerColor(category),
                    fillColor: getStormLayerColor(category),
                    pane: category,
                    weight: 1,
                    fillOpacity: 1
                }
            }
        };
    }

    // Gets the fill color for the hospitals affected by each category of storm.
    function getHospitalColor(param) {
        switch (param) {
            case 1:
              return "#c31f21";
            case 2:
              return "#f84214";
            case 3:
              return "#ff8e35";
            case 4:
              return "#ffca56";
            case 5:
              return "#fffbb0";
            default:
              return "#4e4e4e";
        }
    }

    // Handles the conversion of a word to title case
    function titleCaseHandler(word) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    }

    // The hospitals geojson text is all uppercase, so we need to reprocess it to title case (i.e.
    // every word has its first letter capitalized) so that it is more easily readable.
    function convertToTitleCase(string) {
        return string.replace(/\w\S*/g, titleCaseHandler)
    }

    // Creates description of hospital flooding
    function makeHospitalFloodingString(category) {
        return (category !== null) ? "Category " + category + " hurricanes and above" :
            "No categories of hurricanes";
    }

    // returns string that contains the content for each popup
    function makePopup (properties) {
        return "<div><strong>" + convertToTitleCase(properties.NAME) + "</strong></div>"
            + "<div><strong>Type of Services</strong>: " + convertToTitleCase(properties.TYPE) + "</div>"
            + "<div><strong>Projected to be flooded by</strong>: " + makeHospitalFloodingString(properties.Low_Cat) + "</div>";
    }

    // Configures the hospital layer
    function makeHospitalLayerConfig() {
        return {
            pointToLayer: function (feature, latlng) {
                var popup = L.popup().setContent(makePopup(feature.properties));
                return L.circleMarker(latlng, {
                    fillColor: getHospitalColor(feature.properties.Low_Cat),
                    radius: 8,
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.9
                }).bindPopup(popup);
            },

            style: function(feature) {
                return {
                    pane: "Hospitals"
                };
            }
        };
    }

    // Creates leaflet panes for each of the layers. These allow them to always be in the correct
    // order when toggled on and off.
    function makePanes(map) {
        map.createPane("Hospitals");
        map.createPane("Category 1");
        map.createPane("Category 2");
        map.createPane("Category 3");
        map.createPane("Category 4");
        map.createPane("Category 5");

        map.getPane("Hospitals").style.zIndex = 460;
        map.getPane("Category 1").style.zIndex = 450;
        map.getPane("Category 2").style.zIndex = 440;
        map.getPane("Category 3").style.zIndex = 430;
        map.getPane("Category 4").style.zIndex = 420;
        map.getPane("Category 5").style.zIndex = 410;
    }

    // Initializes layers and adds them to the map
    function createLayers(map) {
        var stormLayers = {
            "Category 1": new L.GeoJSON.AJAX('../../interactives/14_3/geojson/cat1.geojson', makeStormLayerConfig("Category 1")),
            "Category 2": new L.GeoJSON.AJAX('../../interactives/14_3/geojson/cat2.geojson', makeStormLayerConfig("Category 2")),
            "Category 3": new L.GeoJSON.AJAX('../../interactives/14_3/geojson/cat3.geojson', makeStormLayerConfig("Category 3")),
            "Category 4": new L.GeoJSON.AJAX('../../interactives/14_3/geojson/cat4.geojson', makeStormLayerConfig("Category 4")),
            "Category 5": new L.GeoJSON.AJAX('../../interactives/14_3/geojson/cat5.geojson', makeStormLayerConfig("Category 5")),
            "Hospitals": new L.GeoJSON.AJAX("../../interactives/14_3/geojson/hospitals.geojson", makeHospitalLayerConfig())
        };

        map.addLayer(stormLayers["Category 1"])
            .addLayer(stormLayers["Category 2"])
            .addLayer(stormLayers["Category 3"])
            .addLayer(stormLayers["Category 4"])
            .addLayer(stormLayers["Category 5"])
            .addLayer(stormLayers["Hospitals"]);

        return stormLayers;
    }

    // creates the basemap
    function makeBasemap() {
        return L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 10,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets'
        });
    }

    // Creates figure 14.3 in a container element
    function makeMap(container) {
        var basemap = makeBasemap();

        // creates the map
        var mymap = L.map(container, {
            layers: [basemap],
            minZoom: 7,
            maxZoom: 18
        }).setView([32.77572, -79.90775], 9);

        makePanes(mymap);
        var stormLayers = createLayers(mymap);

        // adds filterable controls for the three types of layers to the map
        L.control.layers({}, stormLayers, { collapsed: false }).addTo(mymap);

        var zoomButtons = L.Control.extend(makeZoomButtonConfig());
        mymap.addControl(new zoomButtons());
    }

    (function handleFigure14_3() {
        var i, l;
        var mapContainers = document.getElementsByClassName("figure14_3");
        for (i = 0, l = mapContainers.length; i < l; i++) {
            makeMap(mapContainers[i]);
        }
    })();
})();
