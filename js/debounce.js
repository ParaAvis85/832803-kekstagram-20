'use strict';
(function () {

  function debounce(cb) {
    var lastTimeout = null;
    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, args);
      }, window.constant.DEBOUNCE_INTERVAL);
    };
  }

  window.debounce = {
    bounce: debounce
  };

})();
