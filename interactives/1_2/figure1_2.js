(function () {
    "use strict";

    // Gets parent wrapper of a clickable image figure
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

    function handleClickableLinkClick(e) {
        e.preventDefault();

        var url = this.getAttribute("data-for");
        var wrapper = getClickableWrapper(this);
        var overlay = getOverlayWrapper(wrapper);
        var overlayImage = getOverlayImage(wrapper);

        overlayImage.setAttribute("src", url);
        overlayImage.setAttribute("title", this.getAttribute("title"));
        overlay.classList.add("active");
    }

    function handleOverlayClick(e) {
        e.preventDefault();

        var url = this.getAttribute("data-for");
        var overlay = this.parentElement.parentElement.getElementsByClassName("image-clickable-overlay")[0];
        var overlayImage = overlay.getElementsByClassName("image-clickable-overlay-image")[0];
        overlayImage.setAttribute("src", url);
        overlayImage.setAttribute("title", this.getAttribute("title"));
        overlay.classList.add("active");
    }

    function handleOverlayDismissClick(e) {
        e.preventDefault();

        this.parentElement.classList.remove("active");
    }

    function handleOverlayDismissSideClick(e) {
        e.preventDefault();

        this.parentElement.parentElement.getElementsByClassName("image-clickable-overlay")[0].classList.remove("active");
    }

    function bindImageClickableEvents() {
        var i, l;
        var elements = document.getElementsByClassName("image-clickable-link");

        for (i = 0, l = elements.length; i < l; i += 1) {
            elements[i].addEventListener("click", handleClickableLinkClick);
        }
    }

    function bindImageClickableDismissEvents() {
        var i, l;
        var elements = document.getElementsByClassName("image-clickable-overlay-dismiss");

        for (i = 0, l = elements.length; i < l; i += 1) {
            elements[i].addEventListener("click", handleOverlayDismissClick);
        }
    }

    function bindExtraSideEvents() {
        var i, l;
        var elements = document.getElementsByClassName("image-clickable-side-links")[0].getElementsByTagName("a");

        for (i = 0, l = elements.length; i < l; i += 1) {
            elements[i].addEventListener("click", handleOverlayDismissSideClick);
        }
    }

//    bindExtraSideEvents();
    bindImageClickableEvents();
    bindImageClickableDismissEvents();
})();
