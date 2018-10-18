(function () {
    "use strict";



/*
    // returns fill color for each circle as a string
    function getColor (type) {
        switch (type) {
            case "Screening":
                return "#f0e68c";
            case "Asset":
                return "#87cfeb";
            case "Hybrid":
                return "#8fbc8e";
        }
    }

    // returns object that contains all the leaflet config for each layer
    function makeLayerConfig(type) {
        return {
            radius: 5,
            fillOpacity: 0.9,
            opacity: 1,
            weight: 1,
            color: "#000",
            fill: true,
            fillColor: getColor(type)
        };
    }

    // returns string that contains the content for each popup
    function makePopup (data) {
        return "<div><strong><a href='" + data.url + "' target='_blank'>" + data.title + "</a></strong></div>"
            + "<div><strong>Year</strong>: " + data.year + "</div>"
            + "<div><strong>Type</strong>: " + (data.type === "Screening" ? "Hazard" : data.type) + "</div>"
            + "<div><strong>Hazards(s)</strong>: " + data.hazards + "</div>"
            + "<div><strong>Asset(s)</strong>: " + data.assets + "</div>";
    }

    // returns leaflet layer for each assessment
    function makeAssessmentLayer(data) {
        return new L.circleMarker(
            [data.lat, data.lon],
            makeLayerConfig(data.type),
        ).bindPopup(makePopup(data));
    }

    // determines if the assessment is a hazard based study
    function filterHazards(data) {
        return data.type === "Screening";
    }

    // determines if the assessment is a asset based study
    function filterAssets(data) {
        return data.type === "Asset";
    }

    // determines if the assessment is a hybrid based study
    function filterHybrids(data) {
        return data.type === "Hybrid";
    }
*/

    // returns a generic Leaflet button which is slightly customized
    function makeButton(backgroundImage, title, type) {
        var button = L.DomUtil.create("a", "leaflet-control-view-" + type);
        button.title = title;
        button.href = "#";
        button.setAttribute("role", "button");
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
/*
    // splits the assessments into three layerGroups so they can be filterable
    var layers = {
        Hazards: L.layerGroup(assessments.filter(filterHazards).map(makeAssessmentLayer)),
        Assets: L.layerGroup(assessments.filter(filterAssets).map(makeAssessmentLayer)),
        Hybrid: L.layerGroup(assessments.filter(filterHybrids).map(makeAssessmentLayer))
    };
*/

    var mapContainer = document.getElementsByClassName("figure14_3")[0]

    function getStormLayerColor(category) {
        switch (category) {
            case "Category 1":
                return "#00549d";
            case "Category 2":
                return "#0184be";
            case "Category 3":
                return "#5eafd7";
            case "Category 4":
                return "#b9d7e7";
            case "Category 5":
                return "#eef3ff";
        }
    }

    function makeStormLayerConfig(category) {
        var baseLayerOptions = {
            weight: 1,
            fillOpacity: 1
        }

        return {
            style: function(feature) {
                return Object.assign({
                    color: getStormLayerColor(category),
                    fillColor: getStormLayerColor(category)
                }, baseLayerOptions)
            }
        };
    }

    var stormLayers = {
        "Category 1": new L.GeoJSON.AJAX('../../interactives/14_3/geojson2/cat1.geojson', makeStormLayerConfig("Category 1")),
        "Category 2": new L.GeoJSON.AJAX('../../interactives/14_3/geojson2/cat2.geojson', makeStormLayerConfig("Category 2")),
        "Category 3": new L.GeoJSON.AJAX('../../interactives/14_3/geojson2/cat3.geojson', makeStormLayerConfig("Category 3")),
        "Category 4": new L.GeoJSON.AJAX('../../interactives/14_3/geojson2/cat4.geojson', makeStormLayerConfig("Category 4")),
        "Category 5": new L.GeoJSON.AJAX('../../interactives/14_3/geojson2/cat5.geojson', makeStormLayerConfig("Category 5"))
//        "Category 1": new L.TopoJSON(cat1, makeStormLayerConfig("Category 1")),
//        "Category 2": new L.TopoJSON(cat2, makeStormLayerConfig("Category 2")),
//        "Category 3": new L.TopoJSON(cat3, makeStormLayerConfig("Category 3")),
//        "Category 4": new L.TopoJSON(cat4, makeStormLayerConfig("Category 4")),
//        "Category 5": new L.TopoJSON(cat5, makeStormLayerConfig("Category 5"))
    };

    // creates the maps and adds all layers to it.
    var mymap = L.map(mapContainer, {
//        layers: [basemap, stormLayers["Category 5"]],
        layers: [basemap, stormLayers["Category 5"], stormLayers["Category 4"], stormLayers["Category 3"], stormLayers["Category 2"], stormLayers["Category 1"]],
        minZoom: 7,
        maxZoom: 18
    }).setView([32.77572, -79.90775], 9);

    // adds filterable controls for the three types of layers to the map
    L.control.layers({}, stormLayers).addTo(mymap);

//mymap.on('moveend', function() { 
//     console.log(mymap.getCenter());
//     console.log(mymap.getZoom());
//     console.log(mymap.getBounds());
//});


//T {_southWest: M, _northEast: M}_northEast: M {lat: 33.53890866167807, lng: -78.90970945358278}_southWest: M {lat: 32.15448738970588, lng: -80.79386472702028}__proto__: Object

    // adds control which lets user zoom to alaska and conus
    var zoomButtons = L.Control.extend(makeZoomButtonConfig());
    mymap.addControl(new zoomButtons());
})();
