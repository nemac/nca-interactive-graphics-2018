(function () {
    "use strict";

    function handleMapHoverIn () {
        var region = getRegion(this);
        var text = getText(region);
        var title = getTitle(region);

        setPopupLock(region);
        setText(text);
        setTitle(title);
    }

    function handleMapHoverOut () {
        console.log("out")
    }

    function getRegion (elem) {
        return elem.id;
    }

    function getText(region) {
        var strings = {
            "northwest": "Grape growers in Oregon and Washington may benefit from warming temperaturs as more frost-free days could provide premium growing sites for the next 50-100 years.",
            "southwest": "The area of southwestern forest burned by wildfire from 1984 to 2015 is double what would have burned without climate change.",
            "greatplains": "It is estimated that >50% of North American waterfowl hatch in the wetlands of the Prairie Pothole Region of the Northern Great Plains. Warming temperatures and subsequent drought are projected to reduce wetlands in this critical waterfowl region by 25% by mid-century.",
            "greatlakes": "Warming has reduced the frequency of winter ice bridges to Isle Royale National Park in Lake Superior, reducing wold immigration, gene flow, and survival. Declines in the top predators has boosted moose populations and affected the population dynamics of the entite ecosystem. Lake Superior is expected to be ice free by 2040 and human-assisted introductions of wolves to the island is being proposed to conserve exosystem structure on the island.",
            "northeast": "A heat wave in 2012 caused an earlier and larger lobster catch in New England, overwhelming both the processing capacity and market demand. This resulted in a price collapse and reduced income for lobster fishermen.",
            "southeast": "In South Florida, warmer winder temperatures are expected to facilitate the northward movement of the Burmese python - a freeze-sensitive non-native species that has decimated mammal populations within Everglades National Park.",
            "southtexas": "In the Gult of Mexico, waters along the Texas coast have been warming in winter, which has reduced the survival of juvenile southern flounder and allowed gray snappers to migrate father north..",
            "alaska": "As warmer temperatures shift availability of red elderberry earlier in the season, Kodiak brown bears may make an earlier siwtch from eating salmon and thereby reduce mortality rates of salmon and change energy flows between aquatic and terrestrial systems.",
            "hawaii": "In Hawai'i, nearly half of forest birds studied are projected to lose 50% or more of their range by 2100 as the warming climate allows avain malaria to expand higher into their mountain habitat.",
            "puertorico": "Warming has led to mass bleaching and/or outbreaks of coral diseases off the coastlines of Puerto Rico, the U.S. Virgin Islands, Florida, Hawai'i, and the U.S. Affiliated Pacific Islands. The loss of the recreational benefits alone from coral reefs in the United States is expected to reach $140 billion by 2100."
        }

        return strings[region];
    }

    function getTitle(region) {
        var strings = {
            "northwest": "Northwest",
            "southwest": "Southwest",
            "greatplains": "Northern Great Plains",
            "greatlakes": "Midwest",
            "northeast": "Northeast",
            "southeast": "Southeast",
            "southtexas": "Southern Great Plains",
            "alaska": "Alaska",
            "hawaii": "Hawai'i and the Pacific Islands",
            "puertorico": "Caribbean"
        }

        return strings[region];
    }

    function setPopupLock(key) {
        $("#textbox").attr("data-lock", key);
    }

    function setTitle(text) {
        $(".hover-map-text-title").text(text);
    }

    function setText(text) {
        $(".hover-map-text-body").text(text)
    }

    function handleLoad () {
        $(".hover-map-region").on("hover", handleMapHoverIn, handleMapHoverOut);
        $(".hover-map-region").on("click", handleMapHoverIn);
    }

    $(handleLoad);
})();
