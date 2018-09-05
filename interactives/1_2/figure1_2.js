(function () {
    "use strict";

    // Recursively gets parent wrapper of a clickable image figure. Allows us to have
    // multiple image clickables on a page without them interfering with each other,
    // since future actions work on the children of the returned DOM element.
    //
    // @param elem - Any DOM element. Intended to be at or below the clickable root
    function getClickableWrapper(elem) {
        if (elem.tagName === "BODY") {
            return false;
        }
        return elem.classList.contains("image-clickable") ? elem :
            getClickableWrapper(elem.parentElement);
    }

    // Finds the overlay wrapper of a clickable image figure
    //
    // @param elem - Any DOM element. Intended to be the clickable root
    function getOverlayWrapper(elem) {
        return elem.querySelector(".image-clickable-overlay");
    }

    // Finds a specific image which will be loaded as the active image
    //
    // @param elem - Any DOM element. Intended to be the clickable root
    // @param index - Integer
    function getOverlayImage(elem, index) {
        return elem.querySelectorAll(".image-clickable-overlay-image")[index];
    }

    // Finds the current active image
    //
    // @param elem - Any DOM element. Intended to be the clickable root
    function getActiveOverlayImage(elem) {
        return elem.querySelector(".image-clickable-overlay-image.active-image");
    }

    // Finds the left arrow
    //
    // @param elem - Any DOM element. Intended to be the clickable root
    function getArrowLeft(elem) {
        return elem.querySelector(".image-clickable-overlay-arrow-left");
    }

    // Finds the right arrow
    //
    // @param elem - Any DOM element. Intended to be the clickable root
    function getArrowRight(elem) {
        return elem.querySelector(".image-clickable-overlay-arrow-right");
    }

    // Enables an arrow. To reduce logic complexity we call it on both arrows after any
    // interaction. But it's purpose is to enable the left arrow when you move from the
    // first image to any other, and to enable the right arrow when you move from the
    // last image to any other.
    //
    // @param arrow - Any arrow DOM element. Gotten by getArrowLeft & getArrowRight
    function enableArrow(arrow) {
        arrow.classList.remove("inactive");
    }

    // General function to disable an arrow. Called on the left arrow when you move to
    // the first image and the right arrow when you move to the last image.
    //
    // @param arrow - Any arrow DOM element. Gotten by getArrowLeft & getArrowRight
    function disableArrow(arrow) {
        arrow.classList.add("inactive");
    }

    // Disables the left arrow
    //
    // @param wrapper - Any DOM element. Intended to be the clickable root
    function disableArrowLeft(wrapper) {
        disableArrow(getArrowLeft(wrapper));
    }

    // Disables the right arrow
    //
    // @param wrapper - Any DOM element. Intended to be the clickable root
    function disableArrowRight(wrapper) {
        disableArrow(getArrowRight(wrapper));
    }

    // Enables both arrows. See docs for enableArrow.
    //
    // @param wrapper - Any DOM element. Intended to be the clickable root
    function enableArrows(wrapper) {
        enableArrow(getArrowLeft(wrapper));
        enableArrow(getArrowRight(wrapper));
    }

    // Checks if either arrow needs to be disabled and does so if neccesary.
    //
    // @param activeImage - DOM element that is the active image
    // @param wrapper - Any DOM element. Intended to be the clickable root
    function disableArrows(activeImage, wrapper) {
        if (!activeImage.previousElementSibling) {
            disableArrowLeft(wrapper);
        }
        if (!activeImage.nextElementSibling) {
            disableArrowRight(wrapper);
        }
    }

    // Handles state of arrows. Called on most interactions
    //
    // @param activeImage - DOM element that is the active image
    // @param wrapper - Any DOM element. Intended to be the clickable root
    function handleArrows(activeImage, wrapper) {
        enableArrows(wrapper); // Clear any previous state
        disableArrows(activeImage, wrapper); // Disable if neccesary
    }

    // Loads overlay from click on image map or image button
    //
    // @param elem - DOM Element. Link which is currently either an overlay or an image button
    //               Must have the data-for element which is an integer.
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

    // Switches current active image from interaction on arrows
    //
    // @param elem - DOM element. Arrow which triggered event.
    // @param getter - String. One of "nextElementSibling" || "previousElementSibling". Used to
    //                 dynamically get the new active image DOM element.
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

    // Moves the active image one to the right
    //
    // @param elem - DOM element. Generally arrow which triggered event but does not need to be.
    function switchOverlayImageRight(elem) {
        switchOverlayImage(elem, "nextElementSibling");
    }

    // Moves the active image one to the left
    //
    // @param elem - DOM element. Generally arrow which triggered event but does not need to be.
    function switchOverlayImageLeft(elem) {
        switchOverlayImage(elem, "previousElementSibling");
    }

    // Hides the active image overlay
    //
    // @param elem - DOM element. Dismiss button which triggered event.
    function hideClickableOverlay(elem) {
        var wrapper = getClickableWrapper(elem);
        getOverlayWrapper(wrapper).classList.remove("active");
    }

    // Handler for image map and image button links.
    // The keyword 'this' is the DOM element that was interacted with.
    //
    // @param e - Event
    function handleClickableLinkClick(e) {
        e.preventDefault();
        loadOverlayImage(this);
    }

    // Handler for image button links when tabbed to.
    // The keyword 'this' is the DOM element that was interacted with.
    //
    // @param e - Event
    function handleClickableLinkKeypress(e) {
        if (e.key.toLowerCase() === "enter") {
            e.preventDefault();
            loadOverlayImage(this);
        }
    }

    // Handler for right arrow links.
    // The keyword 'this' is the DOM element that was interacted with.
    //
    // @param e - Event
    function handleArrowClickRight(e) {
        e.preventDefault();
        switchOverlayImageRight(this);
    }

    // Handler for right arrow links when tabbed to.
    // The keyword 'this' is the DOM element that was interacted with.
    //
    // @param e - Event
    function handleArrowKeypressRight(e) {
        if (e.key.toLowerCase() === "enter") {
            e.preventDefault();
            switchOverlayImageRight(this);
        }
    }

    // Handler for left arrow links.
    // The keyword 'this' is the DOM element that was interacted with.
    //
    // @param e - Event
    function handleArrowClickLeft(e) {
        e.preventDefault();
        switchOverlayImageLeft(this);
    }

    // Handler for left arrow links when tabbed to.
    // The keyword 'this' is the DOM element that was interacted with.
    //
    // @param e - Event
    function handleArrowKeypressLeft(e) {
        if (e.key.toLowerCase() === "enter") {
            e.preventDefault();
            switchOverlayImageLeft(this);
        }
    }

    // Handler for arrow keys. Only fires when focus is in the image clickable area and the
    // overlay is present.
    // The keyword 'this' is the DOM element that was interacted with. Will probably be the root.
    //
    // @param e - Event
    function handleWrapperKeydownArrowkeys(e) {
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

    // Handler for overlay dismiss button.
    // The keyword 'this' is the DOM element that was interacted with.
    //
    // @param e - Event
    function handleOverlayDismissClick(e) {
        e.preventDefault();
        hideClickableOverlay(this);
    }

    // Handler for overlay dismiss button keypress.
    // The keyword 'this' is the DOM element that was interacted with.
    //
    // @param e - Event
    function handleOverlayDismissKeypress(e) {
        if (e.key.toLowerCase() === "enter") {
            e.preventDefault();
            hideClickableOverlay(this);
        }
    }

    // Binds events to the image map and image button links
    function bindImageClickableEvents() {
        var i, l;
        var elements = document.getElementsByClassName("image-clickable-link");

        for (i = 0, l = elements.length; i < l; i += 1) {
            elements[i].addEventListener("click", handleClickableLinkClick);
            elements[i].addEventListener("keypress", handleClickableLinkKeypress);
        }
    }

    // Binds events to the arrows and also the arrow key listener on the root wrapper.
    function bindArrowEvents() {
        var i, l;
        var rightArrows = document.getElementsByClassName("image-clickable-overlay-arrow-right");
        var leftArrows = document.getElementsByClassName("image-clickable-overlay-arrow-left");
        var imageClickables = document.getElementsByClassName("image-clickable");

        for (i = 0, l = rightArrows.length; i < l; i += 1) {
            rightArrows[i].addEventListener("click", handleArrowClickRight);
            rightArrows[i].addEventListener("keypress", handleArrowKeypressRight);
        }
        for (i = 0, l = leftArrows.length; i < l; i += 1) {
            leftArrows[i].addEventListener("click", handleArrowClickLeft);
            leftArrows[i].addEventListener("keypress", handleArrowKeypressLeft);
        }
        for (i = 0, l = imageClickables.length; i < l; i += 1) {
            // arrow keys don't trigger the keypress event
            imageClickables[i].addEventListener("keydown", handleWrapperKeydownArrowkeys);
        }
    }

    // Binds events to the overlay dismiss button.
    function bindImageClickableDismissEvents() {
        var i, l;
        var elements = document.getElementsByClassName("image-clickable-overlay-dismiss");

        for (i = 0, l = elements.length; i < l; i += 1) {
            elements[i].addEventListener("click", handleOverlayDismissClick);
            elements[i].addEventListener("keypress", handleOverlayDismissKeypress);
        }
    }

    bindImageClickableEvents();
    bindImageClickableDismissEvents();
    bindArrowEvents();
})();

// Polyfills for IE9+ & Safari
// Source: https://github.com/jserz/js_piece/blob/master/DOM/NonDocumentTypeChildNode/nextElementSibling/nextElementSibling.md
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
// Source: https://github.com/jserz/js_piece/blob/master/DOM/NonDocumentTypeChildNode/previousElementSibling/previousElementSibling.md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('previousElementSibling')) {
      return;
    }
    Object.defineProperty(item, 'previousElementSibling', {
      configurable: true,
      enumerable: true,
      get: function () {
        let el = this;
        while (el = el.previousSibling) {
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
