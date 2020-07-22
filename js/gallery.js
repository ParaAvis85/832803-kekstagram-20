'use strict';

(function () {

  function clearGallery(className, container) {
    var picturesToRemove = container.querySelectorAll(className);
    picturesToRemove.forEach(function (item) {
      container.removeChild(item);
    });
  }
  window.gallery = {
    clear: clearGallery
  };
})();
