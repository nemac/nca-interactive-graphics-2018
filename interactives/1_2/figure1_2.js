(function () {
    "use strict";

    function handleOverlayClick(e) {
        e.preventDefault();

        var url = this.getAttribute("data-for");
        var overlay = this.parentElement.parentElement.getElementsByClassName("image-clickable-overlay")[0];
        console.log(overlay);
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
        var elements = document.getElementsByClassName("image-clickable-main-overlay-link");

        for (i = 0, l = elements.length; i < l; i += 1) {
            elements[i].addEventListener("click", handleOverlayClick);
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

    bindExtraSideEvents();
    bindImageClickableEvents();
    bindImageClickableDismissEvents();
})();
