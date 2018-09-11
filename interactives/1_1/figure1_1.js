(function () {
    "use strict";

    function getNewText(elem) {
        return elem.getAttribute("data-for");
    }

    function getWrapper(elem) {
        return elem.closest(".svg-map-clickable");
    }

    function getNewTextElem(elem) {
        return getWrapper(elem).querySelector(".svg-map-text");
    }

    function swapText(target, elem) {
        elem.setAttribute("data-active", target);
    }

    function loadMapText(elem) {
        var newText = getNewText(elem);
        var newTextElem = getNewTextElem(elem);
        swapText(newText, newTextElem);
    }

    function handleSvgMapClick(e) {
        e.preventDefault();
        loadMapText(this);
    }

    (function bindSvgMapClicks() {
        var i, l;
        var clickableRegions = document.getElementsByClassName("svg-map-clickable-region");
        for (i = 0, l = clickableRegions.length; i < l; i++) {
            clickableRegions[i].addEventListener("click", handleSvgMapClick);
        }
    }());

    // Polyfill
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
