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

    // returns the overall config object for the custom leaflet zoom buttons
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

    // creates the basemap
    var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 10,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
    });

    var mapContainer = document.getElementsByClassName("figure14_3")[0]

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

    function titleCaseHandler(word) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    }

    function convertToTitleCase(string) {
        return string.replace(/\w\S*/g, titleCaseHandler)
    }

    function makeHospitalFloodingString(category) {
        return (category !== null) ? "Category " + category + " hurricanes and above" :
            "No categories of hurricanes";
    }

    // returns string that contains the content for each popup
    function makePopup (properties) {
        return "<div><strong><a href='" + properties.WEBSITE + "' target='_blank'>" + convertToTitleCase(properties.NAME) + "</a></strong></div>"
            + "<div><strong>Type of Services</strong>: " + convertToTitleCase(properties.TYPE) + "</div>"
            + "<div><strong>Projected to be flooded by</strong>: " + makeHospitalFloodingString(properties.Low_Cat) + "</div>";
    }

    function makeHospitalLayerConfig() {
        return {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    fillColor: getHospitalColor(feature.properties.Low_Cat),
                    radius: 8,
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.9
                }).bindPopup(makePopup(feature.properties));
            },

            style: function(feature) {
                return {
                    pane: "Hospitals"
                };
            }
        };
    }

    // creates the maps and adds all layers to it.
    var mymap = L.map(mapContainer, {
        layers: [basemap],
        minZoom: 7,
        maxZoom: 18
    }).setView([32.77572, -79.90775], 9);

    mymap.createPane("Category 1");
    mymap.createPane("Category 2");
    mymap.createPane("Category 3");
    mymap.createPane("Category 4");
    mymap.createPane("Category 5");
    mymap.createPane("Hospitals");

    mymap.getPane("Hospitals").style.zIndex = 460;
    mymap.getPane("Category 1").style.zIndex = 450;
    mymap.getPane("Category 2").style.zIndex = 440;
    mymap.getPane("Category 3").style.zIndex = 430;
    mymap.getPane("Category 4").style.zIndex = 420;
    mymap.getPane("Category 5").style.zIndex = 410;

    var stormLayers = {
        "Category 1": new L.GeoJSON.AJAX('../../interactives/14_3/geojson2/cat1.geojson', makeStormLayerConfig("Category 1")),
        "Category 2": new L.GeoJSON.AJAX('../../interactives/14_3/geojson2/cat2.geojson', makeStormLayerConfig("Category 2")),
        "Category 3": new L.GeoJSON.AJAX('../../interactives/14_3/geojson2/cat3.geojson', makeStormLayerConfig("Category 3")),
        "Category 4": new L.GeoJSON.AJAX('../../interactives/14_3/geojson2/cat4.geojson', makeStormLayerConfig("Category 4")),
        "Category 5": new L.GeoJSON.AJAX('../../interactives/14_3/geojson2/cat5.geojson', makeStormLayerConfig("Category 5")),
        "Hospitals": new L.GeoJSON.AJAX("../../interactives/14_3/geojson2/hospitals.geojson", makeHospitalLayerConfig())

//        "Category 1": new L.TopoJSON(cat1, makeStormLayerConfig("Category 1")),
//        "Category 2": new L.TopoJSON(cat2, makeStormLayerConfig("Category 2")),
//        "Category 3": new L.TopoJSON(cat3, makeStormLayerConfig("Category 3")),
//        "Category 4": new L.TopoJSON(cat4, makeStormLayerConfig("Category 4")),
//        "Category 5": new L.TopoJSON(cat5, makeStormLayerConfig("Category 5"))
    };

    mymap.addLayer(stormLayers["Category 1"])
        .addLayer(stormLayers["Category 2"])
        .addLayer(stormLayers["Category 3"])
        .addLayer(stormLayers["Category 4"])
        .addLayer(stormLayers["Category 5"])
        .addLayer(stormLayers["Hospitals"]);

    // adds filterable controls for the three types of layers to the map
    L.control.layers({}, stormLayers).addTo(mymap);

//mymap.on('moveend', function() { 
//     console.log(mymap.getCenter());
//     console.log(mymap.getZoom());
//     console.log(mymap.getBounds());
//});


//T {_southWest: M, _northEast: M}_northEast: M {lat: 33.53890866167807, lng: -78.90970945358278}_southWest: M {lat: 32.15448738970588, lng: -80.79386472702028}__proto__: Object

    var zoomButtons = L.Control.extend(makeZoomButtonConfig());
    mymap.addControl(new zoomButtons());
})();
