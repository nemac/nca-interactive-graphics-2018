var points22_1 = [
    { latlng: [42.804, -102.297], msg: "<div><img src='/interactives/22_1/ngp-1.png' /><br><b>Impact</b><br>Flash droughts and high heat events illustrate challenges for sustainability of ranching operations, with the emergent impacts on rural prosperity and mental health. <br><b>Response</b><br>Adaptive management frameworks, developed through management-science partnerships, proactively increase flexibility in operational decision-making to reduce economic and ecological risk.</div>" },
    { latlng: [48.312, -107.854], msg:  "<div><img src='/interactives/22_1/ngp-2.png' /><br><b>Impact</b><br>Consecutive years of drought across the region force ranchers to consider selling their herds. <br><b>Response</b><br>Montana's Matador Ranch establishes a grassbank that allows local ranchers to pay discounted fees for access to additional grass during droughts in exchange for wildlife-friendly practices on their own operations.</div>" },
    { latlng: [45.317, -107.933], msg: "<div><img src='/interactives/22_1/ngp-3.png' /><br><b>Impact</b><br>Rising temperatures hasten the spread of invasive species in riparian ecosystems, threatening culturally significant native species and food sources in the Crow Indian (Apsaalooke) Reservation. <br><b>Response</b><br>The USDA NRCS Crow Agency worked with Little Big Horn College students to remove invasive populations along the Little Big Horn River. They also revegetated plains cottonwood in sandbars and developed riparian buffer zones.</div>" },
    { latlng: [47.511, -114.412], msg: "<div><img src='/interactives/22_1/ngp-4.png' /><br><b>Impact</b><br>Greenhouse gas emissions from petroleum and natural gas production across the Northern Great Plains are among the highest in the nation. <br><b>Response</b><br>Potential wind energy resources are among the largest in the Northern Great Plains.</div>" },
    { latlng: [41.155, -104.795], msg: "<div><img src='/interactives/22_1/ngp-5.png' /><br><b>Impact</b><br>Anticipated climate change impacts on cultural resources raise concerns within the leadership of the Confederated Salish and Kootenai Tribes. <br><b>Response</b><br>Tribal leaders developed their climate change strategic plan to address climate change impacts and vulnerabilities drawing heavily on Traditional Ecological Knowledge.</div>" },
    { latlng: [45.938, -96.854], msg: "<div><img src='/interactives/22_1/ngp-6.png' /><br><b>Impact</b><br>The Prairie Pothole Region, considered the world's most productive habitat for waterfowl, is threatened by warming temperatures. <br><b>Response</b><br>The Prairie Pothole Joint Venture implements wetland and grassland protection, restoration, and enhancement projects to sustain populations of waterfowl, shoebirds, and prairie landbirds.</div>" },
    { latlng: [45.218, -112.638], msg: "<div><img src='/interactives/22_1/ngp-7.png' /><br><b>Impact</b><br>Changing runoff characteristics and increasing stream temperatures threaten water and ecological resources. <br><b>Response</b><br>The Beaverhead Drouught Resiliency Plan was written to improve preparedness by reducing vulnerabilities to future drought events.</div>" },
    { latlng: [40.898, -98.254], msg: "<div><img src='/interactives/22_1/ngp-8.png' /><br><b>Impact</b><br>Increased growing season length and greater variability in temperature and precipitation stress critically important natural resources. <br><b>Response</b><br>The Platte Basin Timelapse project (PBT) uses time-lapse photography and multimedia storytelling to document life across the Platte River watershed.</div>" },
];

var map22_1 = L.map('figure22_1').setView([43.190, -105.226], 5.25);
map22_1.addControl(new L.Control.Fullscreen());
var featureLayer = new L.geoJSON(region22_1, { color: "#000", weight: 2, fillColor: "none"}).addTo(map22_1);

L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(map22_1);


for (var i=0; i<points22_1.length; i++) {
    L.circleMarker(points22_1[i].latlng, {
	color: '#000000',
	fillColor: '#ffffff',
	radius: 8,
	opacity: 1,
	weight: 1,
	fillOpacity: 1
    }).addTo(map22_1).bindPopup(points22_1[i].msg);
}

