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

    function getOverlayImage(elem, index) {
        return elem.querySelectorAll(".image-clickable-overlay-image")[index];
    }

    function getActiveOverlayImage(elem) {
        return elem.querySelector(".image-clickable-overlay-image.active-image");
    }

    function getArrowLeft(elem) {
        return elem.querySelector(".image-clickable-overlay-arrow-left");
    }

    function getArrowRight(elem) {
        return elem.querySelector(".image-clickable-overlay-arrow-right");
    }

    function enableArrow(arrow) {
        arrow.classList.remove("inactive");
    }

    function disableArrow(arrow) {
        arrow.classList.add("inactive");
    }

    function disableArrowLeft(wrapper) {
        disableArrow(getArrowLeft(wrapper));
    }

    function disableArrowRight(wrapper) {
        disableArrow(getArrowRight(wrapper));
    }

    function enableArrows(wrapper) {
        enableArrow(getArrowLeft(wrapper));
        enableArrow(getArrowRight(wrapper));
    }

    function disableArrows(activeImage, wrapper) {
        if (!activeImage.previousElementSibling) {
            disableArrowLeft(wrapper);
        }
        if (!activeImage.nextElementSibling) {
            disableArrowRight(wrapper);
        }
    }

    function handleArrows(activeImage, wrapper) {
        enableArrows(wrapper); // Clear any previous state
        disableArrows(activeImage, wrapper); // Disable if neccesary
    }

    function loadOverlayImage(elem) {
        var index = elem.getAttribute("data-for");
        var wrapper = getClickableWrapper(elem);
        var overlay = getOverlayWrapper(wrapper);
        var overlayImage = getOverlayImage(wrapper, index);

        var activeImage = getActiveOverlayImage(wrapper);
        if (activeImage) {
            activeImage.classList.remove("active-image");
        }

        overlayImage.classList.add("active-image");
        overlay.classList.add("active");

        handleArrows(overlayImage, wrapper);
    }

    function switchOverlayImage(elem, getter) {
        var wrapper = getClickableWrapper(elem);
        var activeImage = getActiveOverlayImage(wrapper);
        var newActiveImage = activeImage[getter];
        if (newActiveImage) {
            activeImage.classList.remove("active-image");
            newActiveImage.classList.add("active-image");
            handleArrows(newActiveImage, wrapper);
        }
    }

    function switchOverlayImageRight(elem) {
        switchOverlayImage(elem, "nextElementSibling");
    }

    function switchOverlayImageLeft(elem) {
        switchOverlayImage(elem, "previousElementSibling");
    }

    function hideClickableOverlay(elem) {
        var wrapper = getClickableWrapper(elem);
        getOverlayWrapper(wrapper).classList.remove("active");
    }

    function handleClickableLinkClick(e) {
        e.preventDefault();
        loadOverlayImage(this);
    }

    function handleArrowClickRight(e) {
        e.preventDefault();
        switchOverlayImageRight(this);
    }

    function handleArrowClickLeft(e) {
        e.preventDefault();
        switchOverlayImageLeft(this);
    }

    function handleClickableLinkKeypress(e) {
        if (e.key.toLowerCase() === "enter") {
            e.preventDefault();
            loadOverlayImage(this);
        }
    }

    function handleArrowKeypress(e) {
        if (!getOverlayWrapper(this).classList.contains("active")) {
            return;
        }

        var key = e.key.toLowerCase();
        if (key === "arrowleft" || key === "left" || key === "arrowright" || key === "right") {
            e.preventDefault();
        }
        if (key === "arrowleft" || key === "left") {
            switchOverlayImageLeft(this);
        }
        if (key === "arrowright" || key === "right") {
            switchOverlayImageRight(this);
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

    function bindArrowEvents() {
        var i, l;
        var rightArrows = document.getElementsByClassName("image-clickable-overlay-arrow-right");
        var leftArrows = document.getElementsByClassName("image-clickable-overlay-arrow-left");
        var imageClickables = document.getElementsByClassName("image-clickable");

        for (i = 0, l = rightArrows.length; i < l; i += 1) {
            rightArrows[i].addEventListener("click", handleArrowClickRight);
        }
        for (i = 0, l = leftArrows.length; i < l; i += 1) {
            leftArrows[i].addEventListener("click", handleArrowClickLeft);
        }
        for (i = 0, l = imageClickables.length; i < l; i += 1) {
            imageClickables[i].addEventListener("keydown", handleArrowKeypress);
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
    bindArrowEvents();
})();

// Source: https://github.com/jserz/js_piece/blob/master/DOM/NonDocumentTypeChildNode/nextElementSibling/nextElementSibling.md
// Polyfill for IE9 & Safari
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('nextElementSibling')) {
      return;
    }
    Object.defineProperty(item, 'nextElementSibling', {
      configurable: true,
      enumerable: true,
      get: function () {
        var el = this;
        while (el = el.nextSibling) {
          if (el.nodeType === 1) {
              return el;
          }
        }
        return null;
      },
      set: undefined
    });
  });
})([Element.prototype, CharacterData.prototype]);
