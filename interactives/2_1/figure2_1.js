(function () {
    "use strict";

    function getGraphHideClass() {
        return "graph-line--inactive";
    }

    function getWrapper(elem) {
        return elem.closest(".graph-selectable");
    }

    function getGraphLine(key, wrapper) {
        return wrapper.querySelectorAll(".graph-line--" + key);
    }

    function showGraphLine(line) {
        line.classList.remove(getGraphHideClass());
    }

    function showGraphLines(lines) {
        lines.forEach(showGraphLine);
    }

    function hideGraphLine(line) {
        line.classList.add(getGraphHideClass());
    }

    function hideGraphLines(lines) {
        lines.forEach(hideGraphLine);
    }

    function enableGraphLine(key, wrapper) {
        showGraphLines(getGraphLine(key, wrapper));
    }

    function disableGraphLine(key, wrapper) {
        hideGraphLines(getGraphLine(key, wrapper));
    }

    function toggleGraph(key, enable, wrapper) {
        enable ? enableGraphLine(key, wrapper) : disableGraphLine(key, wrapper);
    }

    function handleGraphLineChange(elem) {
        toggleGraph(elem.getAttribute("data-for"), elem.checked, getWrapper(elem));
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
