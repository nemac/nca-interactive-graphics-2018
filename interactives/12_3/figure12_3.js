(function () {
    "use strict";

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

    // creates the basemap
    var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 10,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
    });

    // splits the assessments into three layerGroups so they can be filterable
    var layers = {
        Hazards: L.layerGroup(assessments.filter(filterHazards).map(makeAssessmentLayer)),
        Assets: L.layerGroup(assessments.filter(filterAssets).map(makeAssessmentLayer)),
        Hybrid: L.layerGroup(assessments.filter(filterHybrids).map(makeAssessmentLayer))
    };

    // creates the maps and adds all layers to it.
    var mymap = L.map('figure12_3', {
        layers: [basemap, layers.Hazards, layers.Assets, layers.Hybrid],
        fullscreenControl: {
            pseudoFullscreen: true,
        },
        minZoom: 4
    }).setView([35.244, -98.510], 2);

    // adds filterable controls for the three types of layers to the map
    L.control.layers({}, layers).addTo(mymap);
})();
