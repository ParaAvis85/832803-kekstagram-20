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

  function removeMessage(wrap) {
    if (main.contains(wrap)) {
      main.removeChild(wrap);
    }
    document.removeEventListener('keydown', window.onPopupEscPress);
  }

  function closeMessage(wrap) {
    window.onPopupEscPress = function (evt) {
      window.editphoto.closePopup(evt, function () {
        removeMessage(wrap);
      });
    };
    wrap.addEventListener('click', function (evt) {
      if (evt.target === wrap || evt.target === wrap.querySelector('button')) {
        removeMessage(wrap);

      }
    });
  }

  window.messages = {
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      var error = node.classList.add('error__message');
      node.textContent = errorMessage;
      error.body.appendChild('afterbegin', node);
    },
    openSuccessMessage: function () {
      main.appendChild(successWrap);
      closeMessage(successWrap);
      document.addEventListener('keydown', window.onPopupEscPress);
    },
    openErrorMessage: function () {
      main.appendChild(errorWrap);
      closeMessage(errorWrap);
      document.addEventListener('keydown', window.onPopupEscPress);
    }
  };
})();
