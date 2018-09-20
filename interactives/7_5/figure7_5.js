(function () {
    "use strict";

    // Gets identifier for the new text that should be displayed
    //
    // @param elem - DOM Element that was clicked/pressed
    // @return String
    function getNewTextId(elem) {
        return elem.getAttribute("data-for");
    }

    // Gets wrapper for the figure
    //
    // @param elem - DOM Element that was clicked/pressed
    // @return DOM Element
    function getWrapper(elem) {
        return elem.closest(".svg-map-clickable");
    }

    // Gets wrapper for the block of text to be displayed
    //
    // @param elem - DOM Element that was clicked/pressed
    // @return DOM Element
    function getTextElem(elem) {
        return getWrapper(elem).querySelector(".svg-map-text");
    }

    // Swaps in the new text block. Setting this property triggers a change in the css
    //
    // @param target - String that identifies the new text to be displayed
    // @param elem - DOM Element that was clicked/pressed
    function swapText(target, elem) {
        elem.setAttribute("data-active", target);
    }

    // Loads in the specified block of text
    //
    // @param elem - DOM Element that was clicked/pressed
    function loadMapText(elem) {
        var newTextId = getNewTextId(elem);
        var textElem = getTextElem(elem);
        swapText(newTextId, textElem);
    }

    // Handler for SVG region links when clicked on.
    // The keyword 'this' is the DOM element that was interacted with.
    //
    // @param e - Event
    function handleSvgMapClick(e) {
        e.preventDefault();
        loadMapText(this);
    }

    // Handler for SVG region links when tabbed to and enter is pressed.
    // The keyword 'this' is the DOM element that was interacted with.
    //
    // @param e - Event
    function handleSvgMapKeypress(e) {
        if (e.key.toLowerCase() === "enter") {
            e.preventDefault();
            loadMapText(this);
        }
    }

    // Binds all events for the svg map figures
    (function bindSvgMapClicks() {
        var i, l;
        var clickableRegions = document.getElementsByClassName("svg-map-clickable-region");
        for (i = 0, l = clickableRegions.length; i < l; i++) {
            clickableRegions[i].addEventListener("click", handleSvgMapClick);
            clickableRegions[i].addEventListener("keypress", handleSvgMapKeypress);;
        }
    }());

    // Polyfill for Element.closest
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || 
            Element.prototype.webkitMatchesSelector;
    }

    if (!Element.prototype.closest) {
        Element.prototype.closest = function(s) {
            var el = this;
            if (!document.documentElement.contains(el)) {
                return null;
            }
            do {
                if (el.matches(s)) {
                    return el;
                }
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1); 

            return null;
        };
    }
}());
