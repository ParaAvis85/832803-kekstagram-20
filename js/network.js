'use strict';

(function () {
  var DOWN_URL = 'https://javascript.pages.academy/kekstagram/data';
  var UP_URL = 'https://javascript.pages.academy/kekstagram';
  var TIME_OUT = 3000;
  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };

  function createXHR(url, method, onSuccess, onError, data) {
    data = data || null;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
          break;
        case StatusCode.BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case StatusCode.UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case StatusCode.NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        case StatusCode.INTERNAL_SERVER_ERROR:
          error = 'Ошибка на стороне сервера';
          break;
        default:
          error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME_OUT;
    xhr.open(method, url);

    xhr.send(data);
  }

  window.load = {
    download: function (onSuccess, onError) {
      createXHR(DOWN_URL, 'GET', onSuccess, onError);
    },
    upload: function (data, onSuccess, onError) {
      createXHR(UP_URL, 'POST', onSuccess, onError, data);
    }
  };
})();
