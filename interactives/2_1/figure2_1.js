(function () {
    "use strict";

    function getGraphHideClass() {
        return "graph-line--inactive";
    }

    function getLegendInactiveClass() {
        return "graph-legend-item--inactive";
    }

    function getKey(elem) {
        return elem.getAttribute("data-for");
    }

    function getWrapper(elem) {
        return elem.closest(".graph-selectable");
    }

    function getGraphLine(key, wrapper) {
        return wrapper.querySelectorAll(".graph-lines .graph-line--" + key);
    }

    function getLegendItem(key, wrapper) {
        return wrapper.querySelector(".graph-legend-item--" + key);
    }

    function toggleGraphLineDisplay(line) {
        line.classList.toggle(getGraphHideClass());
    }

    function toggleGraphLines(lines) {
        lines.forEach(toggleGraphLineDisplay);
    }

    function toggleLegendItem(item) {
        item.classList.toggle(getLegendInactiveClass());
    }

    function toggleGraph(key, wrapper) {
        toggleGraphLines(getGraphLine(key, wrapper));
        toggleLegendItem(getLegendItem(key, wrapper));
    }

    function handleGraphLineChange(elem) {
        toggleGraph(getKey(elem), getWrapper(elem));
    }

    function handleCheckboxChange(e) {
        e.preventDefault();
        handleGraphLineChange(this);
    }

    function toggleCheckboxCheck(elem) {
        elem.checked = !elem.checked;
    }

    function handleCheckboxKeypress(e) {
        if (e.key.toLowerCase() === "enter") {
            e.preventDefault();
            toggleCheckboxCheck(this);
            handleGraphLineChange(this);
        }
    }

    function getCheckboxFromDataAttr(elem) {
        return getWrapper(elem).querySelector("input[data-for=" + getKey(elem) + "]");
    }

    function handleLegendItemClick(e) {
        e.preventDefault();
        var checkbox = getCheckboxFromDataAttr(this);
        toggleCheckboxCheck(checkbox);
        handleGraphLineChange(checkbox);
    }

    function bindCheckboxChange(elem) {
        elem.addEventListener("change", handleCheckboxChange);
    }

    function bindCheckboxKeypress(elem) {
        elem.addEventListener("keypress", handleCheckboxKeypress);
    }

    (function bindCheckboxEvents() {
        var checkboxes = document.getElementsByClassName("graph-checkbox");
        Array.prototype.forEach.call(checkboxes, bindCheckboxChange);
        Array.prototype.forEach.call(checkboxes, bindCheckboxKeypress);
    })();

    function bindLegendItemClick(elem) {
        elem.addEventListener("click", handleLegendItemClick);
    }

    (function bindLegendItemEvents() {
        var legendItems = document.getElementsByClassName("graph-legend-item--clickable");
        Array.prototype.forEach.call(legendItems, bindLegendItemClick)
    })();
})();

// Polyfill for Element.closest for IE9+
// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
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
