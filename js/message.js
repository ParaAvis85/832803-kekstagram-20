'use strict';
(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var successWrap = successTemplate.cloneNode(true);
  var errorWrap = errorTemplate.cloneNode(true);
  var onPopupEscPress = function onPopupEscPress(evt) {
    if (evt.keyCode === window.constant.ESC_BUTTON) {
      evt.preventDefault();
      errorWrap.remove();
      successWrap.remove();
    }
  };


  function removeMessage(wrap) {
    if (main.contains(wrap)) {
      main.removeChild(wrap);
    }
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function openSuccessMessage() {
    main.appendChild(successWrap);
    setCloseMessageHandler(successWrap);
    document.addEventListener('keydown', onPopupEscPress);
  }

  function openErrorMessage() {
    main.appendChild(errorWrap);
    setCloseMessageHandler(errorWrap);
    document.addEventListener('keydown', onPopupEscPress);
  }

  function setCloseMessageHandler(wrap) {
    wrap.addEventListener('click', function (evt) {
      if (evt.target === wrap || evt.target === wrap.querySelector('button')) {
        removeMessage(wrap);

      }
    });
  }

  window.messages = {
    openSuccessMessage: openSuccessMessage,
    openErrorMessage: openErrorMessage
  };

})();
