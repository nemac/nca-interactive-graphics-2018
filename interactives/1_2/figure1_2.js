(function () {
    "use strict";

    // Recursively gets parent wrapper of a clickable image figure
    function getClickableWrapper(elem) {
        if (elem.tagName === "BODY") {
            return false;
        }
        return elem.classList.contains("image-clickable") ? elem :
            getClickableWrapper(elem.parentElement);
    }

    function getOverlayWrapper(elem) {
        return elem.querySelector(".image-clickable-overlay");
    }

    function getOverlayImage(elem) {
        return elem.querySelector(".image-clickable-overlay-image");
    }

    function loadOverlayImage(elem) {
        var url = elem.getAttribute("data-for");
        var wrapper = getClickableWrapper(elem);
        var overlay = getOverlayWrapper(wrapper);
        var overlayImage = getOverlayImage(wrapper);

        overlayImage.setAttribute("src", url);
        overlayImage.setAttribute("title", elem.getAttribute("title"));
        overlay.classList.add("active");
    }

    function hideClickableOverlay(elem) {
        var wrapper = getClickableWrapper(elem);
        getOverlayWrapper(wrapper).classList.remove("active");
    }

    function handleClickableLinkClick(e) {
        e.preventDefault();
        loadOverlayImage(this);
    }

    function handleClickableLinkKeypress(e) {
        if (e.key.toLowerCase() === "enter") {
            e.preventDefault();
            loadOverlayImage(this);
        }
    }

    function handleOverlayDismissClick(e) {
        e.preventDefault();
        hideClickableOverlay(this);
    }

    function bindImageClickableEvents() {
        var i, l;
        var elements = document.getElementsByClassName("image-clickable-link");

        for (i = 0, l = elements.length; i < l; i += 1) {
            elements[i].addEventListener("click", handleClickableLinkClick);
            elements[i].addEventListener("keypress", handleClickableLinkKeypress);
        }
    }

    function bindImageClickableDismissEvents() {
        var i, l;
        var elements = document.getElementsByClassName("image-clickable-overlay-dismiss");

        for (i = 0, l = elements.length; i < l; i += 1) {
            elements[i].addEventListener("click", handleOverlayDismissClick);
        }
    }

    bindImageClickableEvents();
    bindImageClickableDismissEvents();
})();
