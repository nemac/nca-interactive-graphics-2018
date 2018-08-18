var mymap = L.map('figure2_8', {
    fullscreenControl: {
	pseudoFullscreen: true,
    }
}).setView([25.244, -68.510], 5);
//mymap.addControl(new L.Control.Fullscreen());

mymap.options.minZoom = 4;

function onMapClick(e) {
    popup.openOn(mymap);
}

function onEachFeature(feature, layer) {
    var f = feature.properties;
    var stormCat = stormCategory(f.STORMTYPE);
    var stormName = f.STORMNAME;

    var msg = '<p>';
    msg += '<b>STORM: ' + stormName + '</b><br>';
    msg += '<b>Date: </b>' + monthLower(f.MONTH) +  '&nbsp' + f.DAY +  ',' + '&nbsp' + f.YEAR + '<br>';
    msg += '<b>Time: </b>' + f.HHMM + ' UTC' + '<br>';
    msg += '<b>Storm Type:</b> ' + stormCat + '<br>';
    msg += '<b>Wind Speed:</b> ' + f.INTENSITY + ' knots' + '<br>';
    msg += '<b>Pressure:</b> ' + f.MSLP + 'mb';
    msg += '</p>';
    layer.bindPopup(msg);
}

var hurricaneTrack = new L.geoJSON(hurrlines, {color: "gray", weight:"5"}).addTo(mymap);

var hurricanePoints = L.geoJSON(hurricanepoints, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return new L.circleMarker(latlng, {radius:8, fillOpacity: 0.8, opacity: 1, weight:1, color: getColor(feature.properties.STORMTYPE)});
    }
}).addTo(mymap);

function getColor(d) {
    switch (d) {
        case 'Hurricane5':
            return '#A50F15';
        case 'Hurricane4':
            return '#DE2D26';
        case 'Hurricane3':
            return '#FB6A4A';
        case 'Hurricane2':
            return '#FCAE91';
        case 'Hurricane1':
            return '#FEE5D9';
        case 'Tropical Storm':
            return '#FFFFFF';
        case 'TS' :
            return '#FFFFFF';
        default:
            return '#000000';
    }
};

function stormCategory(cat) {
    switch (cat) {
        case 'Hurricane5':
            return 'Category 5';
        case 'Hurricane4':
            return 'Category 4';
        case 'Hurricane3':
            return 'Category 3';
        case 'Hurricane2':
            return 'Category 2';
        case 'Hurricane1':
            return 'Category 1';
        case 'Tropical Storm':
            return 'Tropical Storm';
        case 'TS' :
            return 'Tropical Storm';
        default:
            return 'Uncategorized';
    }
};

function monthLower(month) {
    var m = month.substring(0, 1) + month.substring(1).toLowerCase();
    return(m);
}

//L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 10,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);


var popup = L.popup();
