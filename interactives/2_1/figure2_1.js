(function () {
    "use strict";

    // Returns string that disables a graph line
    //
    // @return String
    function getGraphHideClass() {
        return "graph-line--inactive";
    }

    // Returns string that disables a graph legend item
    //
    // @return String
    function getLegendInactiveClass() {
        return "graph-legend-item--inactive";
    }

    // Gets value that identifies the graph line to be modified
    //
    // @param elem | DOM element
    // @return String
    function getKey(elem) {
        return elem.getAttribute("data-for");
    }

    // Gets wrapper for the widget
    //
    // @param elem | DOM element
    // @return DOM element
    function getWrapper(elem) {
        return elem.closest(".graph-selectable");
    }

    // Gets all graph lines. The lines with hatches are split into two path elements so they need to
    // be selected as a group.
    //
    // @param key | String - result of getKey
    // @param wrapper | DOM element - result of getWrapper
    // @return NodeList - like an array but without some of the prototype methods/properties
    function getGraphLine(key, wrapper) {
        return wrapper.querySelectorAll(".graph-lines .graph-line--" + key);
    }

    // Gets wrapper for a legend item.
    //
    // @param key | String - result of getKey
    // @param wrapper | DOM element - result of getWrapper
    // @return DOM element
    function getLegendItem(key, wrapper) {
        return wrapper.querySelector(".graph-legend-item--" + key);
    }

    // Hides or displays an individual graph line, depending on if it is currently displayed or
    // hidden.
    //
    // @param line | DOM element
    function toggleGraphLineDisplay(line) {
        line.classList.toggle(getGraphHideClass());
    }

    // Hides or displays the graph line selection, depending on if it is currently displayed or
    // hidden.
    //
    // @param lines | NodeList - result of getGraphLine
    function toggleGraphLines(lines) {
        lines.forEach(toggleGraphLineDisplay);
    }

    // Activates or deactivates a legend item group, depending on if it is currently deactivated or
    // active.
    //
    // @param item | DOM element
    function toggleLegendItem(item) {
        item.classList.toggle(getLegendInactiveClass());
    }

    // Activates or deactivates all components of a graph, depending on if it is currently
    // deactivated or active.
    //
    // @param key | String - result of getKey
    // @param wrapper | DOM element - result of getWrapper
    function toggleGraph(key, wrapper) {
        toggleGraphLines(getGraphLine(key, wrapper));
        toggleLegendItem(getLegendItem(key, wrapper));
    }

    // Determines the graph line that is being switched on or off and triggers the change.
    //
    // @param elem | DOM element
    function handleGraphLineChange(elem) {
        toggleGraph(getKey(elem), getWrapper(elem));
    }

/*
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
*/

    // Handles a legend item being clicked
    //
    // @param e | Event
    function handleLegendItemClick(e) {
        e.preventDefault();
//        var checkbox = getCheckboxFromDataAttr(this);
//        toggleCheckboxCheck(checkbox);
        handleGraphLineChange(this);
    }

    // Handles a legend item keypress
    //
    // @param e | Event
    function handleLegendItemKeypress(e) {
        if (e.key.toLowerCase() === "enter") {
            e.preventDefault();
            handleGraphLineChange(this);
        }
    }

/*
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
*/

    // Binds click handlers to the legend item groups
    //
    // @param elem | DOM element
    function bindLegendItemClick(elem) {
        elem.addEventListener("click", handleLegendItemClick);
    }

    // Binds keypress handlers to the legend item groups
    //
    // @param elem | DOM element
    function bindLegendItemKeypress(elem) {
        elem.addEventListener("keypress", handleLegendItemKeypress);
    }

    // Binds all handlers to the legend item groups
    (function bindLegendItemEvents() {
        var legendItems = document.getElementsByClassName("graph-legend-item--clickable");
        Array.prototype.forEach.call(legendItems, bindLegendItemClick);
        Array.prototype.forEach.call(legendItems, bindLegendItemKeypress);
    })();

    // Sets focus to the target element
    //
    // @param elem | DOM element
    function resetFocus(elem) {
        elem.focus();
    }

    // Handles keypresses for the link to reset focus back to the first interactable element
    //
    // @param e | Evenet
    function handleResetFocusKeypress(e) {
        if (e.key.toLowerCase() === "enter") {
            e.preventDefault();
            resetFocus(getLegendItem("all--human", getWrapper(this)));
        }
    }

    // Binds keypress handlers to the reset link
    //
    // @param elem | DOM element
    function bindResetFocusKeypress(elem) {
        elem.addEventListener("keypress", handleResetFocusKeypress);
    }

    // Binds all handlers to the reset links
    (function bindResetLinkEvents() {
        var resetLinks = document.getElementsByClassName("figure_2_1_reset");
        Array.prototype.forEach.call(resetLinks, bindResetFocusKeypress);
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
