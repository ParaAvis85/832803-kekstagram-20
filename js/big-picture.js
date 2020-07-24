'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');
  var bigSocialComments = document.querySelector('.social__comments'); // ищем список коментариев ul
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var commentCountForRender = window.constant.COMMENTS_STEP;
  var renderCommentsHandler;

  function renderComment(moreUserComment) {
    var newComment = document.createElement('li'); // создаем элемент списка "li", методом создания элемента и вносим в переменную
    newComment.classList.add('social__comment'); // добавляем класс для созданного "li"
    var commentAvatar = document.createElement('img'); // создаем тег "img" и добавляем в переменную методом создания элемента
    commentAvatar.classList.add('social__picture'); // добавляем тегу "img" класс методом создания класса
    commentAvatar.src = moreUserComment.avatar; // добавляем адресс src и саму аватарку для коментария в теге "img"
    commentAvatar.alt = moreUserComment.name; // добавляем льтернативный текст аватарке в теге "img"
    commentAvatar.style = 'width="35" height="35"'; // вносим размер аватарки в тег "img" инлайн стили
    newComment.append(commentAvatar); // добавляем весь "li" с "img" в конец списка "ul"

    var newTextComment = document.createElement('p'); // добавляем тег "p" в разметку элемента "li" метод создания элементов
    newTextComment.classList.add('social__text'); // добавляем класс тегу "p"
    newTextComment.textContent = moreUserComment.message; // вносим сам текст коментария в тег "p"
    newComment.append(newTextComment); // добавляем коментарий в тэлемент списка "li"

    return bigSocialComments.append(newComment); // возвращаем из функции в список "ul" полностью готовый "li" с "img" "p"
  }


  function openLargePicture(photo) {
    bigPicture.classList.remove('hidden'); // удаляем класс скрытия большого фото
    bigPicture.querySelector('.big-picture__img img').src = photo.url; // ставим первое фото с массива фото
    bigPicture.querySelector('.likes-count').textContent = photo.likes; // ставим динамичесике лайки из функции создания количества случайных лайков
    bigPicture.querySelector('.social__comment-count').textContent = window.constant.COMMENTS_STEP + ' из ' + photo.comments.length; // ставим динамические коментарии из функции создания коментариев

    bigPicture.querySelector('.social__caption').textContent = photo.description; // вставляем пустое описание фотографии
    bigPicture.querySelector('.comments-loader').classList.add('hidden'); // скрываем загрузку дополнительных коментариев
    document.body.classList.add('modal-open');


    bigSocialComments.innerHTML = '';

    if (photo.comments.length > window.constant.COMMENTS_STEP) {
      commentsLoader.classList.remove('hidden');
      renderCommentsHandler = function () {
        var currentCommentIndex = commentCountForRender;
        commentCountForRender += window.constant.COMMENTS_STEP;
        var lastCommentIndex = commentCountForRender <= photo.comments.length ? commentCountForRender : photo.comments.length;
        bigPicture.querySelector('.social__comment-count').textContent = lastCommentIndex + ' из ' + photo.comments.length;
        renderComments(photo.comments, currentCommentIndex, lastCommentIndex);
        if (lastCommentIndex === photo.comments.length) {
          commentsLoader.classList.add('hidden');
        }
      };
      commentsLoader.addEventListener('click', renderCommentsHandler);
    }

    renderComments(photo.comments, 0, window.constant.COMMENTS_STEP);

    bigPictureCancel.addEventListener('click', closeLargePicture);
  }

  function renderComments(comments, firstIndex, lastIndex) {
    for (var i = firstIndex; i < lastIndex; i++) {
      renderComment(comments[i]);// вызываем функцию создания разметки
    }
  }
  // Закрытие большого фото
  function closeLargePicture() {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    bigPictureCancel.removeEventListener('keydown', closeLargePicture);
    commentsLoader.removeEventListener('click', renderCommentsHandler);
    commentCountForRender = window.constant.COMMENTS_STEP;
  }

  window.bigPicture = {
    open: openLargePicture,
    close: closeLargePicture
  };

})();
