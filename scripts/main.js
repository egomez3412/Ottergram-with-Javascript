var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var NEXT_IMAGE_SELECTOR = '[button-role="next"]';
var PREVIOUS_IMAGE_SELECTOR = '[button-role="previous"]';
var CLICKED_INDEX = 0;
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        // KeyCode has been depricated...
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function ClickedThumbnailIndexHandler(i) {
    'use strict';
    return function () {
        CLICKED_INDEX = i;
    }
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();

    for (var i = 0; i < thumbnails.length; i++) {
        thumbnails[i].addEventListener("click", ClickedThumbnailIndexHandler(i));
    }

    var buttonNext = document.querySelector(NEXT_IMAGE_SELECTOR);
    buttonNext.addEventListener("click", function () {
        nextImageDetailButton();
    });

    var buttonPrevious = document.querySelector(PREVIOUS_IMAGE_SELECTOR);
    buttonPrevious.addEventListener("click", function () {
        previousImageDetailButton();
    });
}

function nextImageDetailButton() {
    "use strict";
    var thumbnails = getThumbnailsArray();

    CLICKED_INDEX++;
    if (CLICKED_INDEX < thumbnails.length) {
        setDetailsFromThumb(thumbnails[CLICKED_INDEX]);
    } else {
        CLICKED_INDEX = 0;
        setDetailsFromThumb(thumbnails[CLICKED_INDEX]);
    }
}

function previousImageDetailButton() {
    "use strict";
    var thumbnails = getThumbnailsArray();

    if (CLICKED_INDEX > 0) {
        CLICKED_INDEX--;
    } else {
        CLICKED_INDEX = thumbnails.length - 1;
    }
    setDetailsFromThumb(thumbnails[CLICKED_INDEX]);
}

initializeEvents();