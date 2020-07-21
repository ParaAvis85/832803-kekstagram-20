'use strict';

window.gallery = (function () {

  return {
    // Функция очистки галереи
    clearGallery: function (className, container) {
      var picturesToRemove = container.querySelectorAll(className);
      picturesToRemove.forEach(function (item) {
        container.removeChild(item);
      });
    }
  };
})();
