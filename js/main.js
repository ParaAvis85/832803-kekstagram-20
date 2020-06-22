'use strict';

var PHOTOS_COUNT = 25; // переменная количества обьектов по заданию

var MIN_LIKES_COUNT = 15; // минимальное количество лайков
var MAX_LIKES_COUNT = 200; // максимальное количество лайков
var MIN_AVATAR_COUNT = 1; // минимальное число аватара
var MAX_AVATAR_COUNT = 6; // максимальное число аватара
var descriptionPhoto = ''; // описание фотографии пустое
var COUNT_COMMENT = 6;


var controlBigger = document.querySelector('.scale__control--bigger');
var controlSmaller = document.querySelector('.scale__control--smaller');
var controlValue = document.querySelector('.scale__control--value');
var resizeImg = document.querySelector('.img-upload__preview img');

var MIN_SCALE_VALUE = 25;
var MAX_SCALE_VALUE = 100;
var SCALE_STEP = 25;

var MAX_HASHTAGS = 5;
var MIN_SYMBOL = 2;
var MAX_SYMBOL = 20;

var upLoadInputField = document.querySelector('#upload-file');
var openOverlayChangeImage = document.querySelector('.img-upload__overlay');
var buttonEditClose = document.querySelector('#upload-cancel');
var resizeImage = document.querySelector('.img-upload__preview');
var hashtagInput = document.querySelector('.text__hashtags');

// функция случайного коментария
function messageRandom() {
  var messagesArray = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var rnd = Math.floor(Math.random() * messagesArray.length);
  return messagesArray[rnd];
}

// Функция создания случайных имен
function nameRandom() {
  var namesArray = ['Артем', 'Петр', 'Иван', 'Александр', 'Евгений', 'Дарья', 'Светлана', 'Алефтина', 'Марья'];
  var rnd = Math.floor(Math.random() * namesArray.length);
  return namesArray[rnd];
}

// функция генерации случайных коментариев
function getComments() {
  var comments = [];
  for (var i = 0; i < COUNT_COMMENT; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomCount(MIN_AVATAR_COUNT, MAX_AVATAR_COUNT) + '.svg', // это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg  где данные  в скобках контактенация цикла количества фото по количеству в задании
      message: messageRandom(), // один или два разных коменнтария добавить случайно что означает тут будет функция которая будет с циклом рандомайзером
      name: nameRandom() // вызов функции случайных имен
    };
    comments.push(comment);
  }
  return comments;
}
// функция создания случайного количества лайков от 15 до 200
function getRandomCount(min, max) {
// получить случайное число от (min-0.5) до (max+0.5)
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}


// функция создания фото
function getPhotos() {
  var photosInfoCount = []; // переменая и пустой массив выдает заданное в цикле число
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    var photosScetch = {
      url: 'photos/' + (i + 1) + '.jpg', // здесь будет адресс фото photos/{{i}}.jpg где i = контактенация цикла количества фото по количеству в задании.
      description: descriptionPhoto,
      likes: getRandomCount(MIN_LIKES_COUNT, MAX_LIKES_COUNT), // здесь добавить из будущей  внешней функции которая через цикл создаст количество лайков случайно от 15 до 200.
      comments: getComments()
    };
    photosInfoCount.push(photosScetch); // обьект  который добавляем в массив через цикл.
  }
  return photosInfoCount; // видим число обьектов через массив
}

// выводим данные в консоль из функции создания массива из обьекта

var manyPhotos = getPhotos(); // переменная массива фото берет данные из функции создания фото.
var photosList = document.querySelector('.pictures'); //  ищем список фото
var photosTemplate = document.querySelector('#picture') //  ищем шаблон для рендера фото
.content.querySelector('.picture');

// функция отрисовки фото 1шт
function createPhoto(photo) {
  var photoItem = photosTemplate.cloneNode(true); // переменная клонирует все вложенности шаблона фото
  photoItem.querySelector('.picture__img').src = photo.url; // ищем и вносим фото в шаблон
  photoItem.querySelector('.picture__comments').textContent = photo.comments.length; // ищем и вносим коментарии в шаблн
  photoItem.querySelector('.picture__likes').textContent = photo.likes; // ищем и вносим количество лайков в шаблон
  return photoItem;
}

function renderPhotos(manyPhoto) {
  var templateFragment = document.createDocumentFragment(); // переменная с созданием документ фрагмента
  // цикл отрисовки массива в фото из переменной
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    templateFragment.appendChild(createPhoto(manyPhoto[i]));
  }

  photosList.appendChild(templateFragment); // добавляем фрагмент с нужным количеством фото на страницу

}
renderPhotos(manyPhotos);

// функция открытия большой фотографии
// eslint-disable-next-line no-unused-vars
function openLargePicture(photo) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden'); // удаляем класс скрытия большого фото
  bigPicture.querySelector('.big-picture__img img').src = photo.url; // ставим первое фото с массива фото
  bigPicture.querySelector('.likes-count').textContent = photo.likes; // ставим динамичесике лайки из функции создания количества случайных лайков
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length; // ставим динамические коментарии из функции создания коментариев

  document.querySelector('.social__caption').textContent = photo.description; // вставляем пустое описание фотографии
  document.querySelector('.social__comment-count').classList.add('hidden'); // скрываем счетчик коментариев
  document.querySelector('.comments-loader').classList.add('hidden'); // скрываем загрузку дополнительных коментариев
  document.querySelector('body').classList.add('modal-open');

  for (var i = 0; i < photo.comments.length; i++) {
    renderComment(photo.comments[i]);// вызываем функцию создания разметки
  }

}

var bigSocialComments = document.querySelector('.social__comments'); // ищем список коментариев ul


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

// черновой вариант открытия скрытия фото для редактирования

function openEditImageEscPress(evt) {
  if (evt.keyCode === 27 && evt.target !== hashtagInput) {
    evt.preventDefault();
    closeEditPhoto();
  }
}

// функция открытия редактора фото
function openEditphoto() {
  openOverlayChangeImage.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', openEditImageEscPress);
}

// функция закрытия редактора фото
function closeEditPhoto() {
  openOverlayChangeImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  upLoadInputField.value = '';
  resizeImage.className = '';

  document.removeEventListener('keydown', openEditImageEscPress);
}

// обработчик с вызовом функции отрытия редактора
upLoadInputField.addEventListener('change', function () {
  openEditphoto();
});

// обработчик закрытия через клавиши esc и enter
buttonEditClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closeEditPhoto();
  }
});

// обработчик с закрытием функции редактирования фото
buttonEditClose.addEventListener('click', function () {
  closeEditPhoto();
});

// функция увеличения фото
function pictureIncreaseScale() {
  var scaleValue = parseInt(controlValue.value, 10);
  scaleValue += SCALE_STEP;
  if (scaleValue > MAX_SCALE_VALUE) {
    scaleValue = MAX_SCALE_VALUE;
  }
  changePictureScale(scaleValue);
}
// функция уменьшения фото
function pictureDecreaseScale() {
  var scaleValue = parseInt(controlValue.value, 10);
  scaleValue -= SCALE_STEP;
  if (scaleValue <= MIN_SCALE_VALUE) {
    scaleValue = MIN_SCALE_VALUE;
  }
  changePictureScale(scaleValue);
}
// счетчик размера
function changePictureScale(value) {
  controlValue.value = value + '%';
  resizeImg.style.transform = 'scale(' + (value / 100) + ')';
}
// Обработчик увеличения фото
controlBigger.addEventListener('click', function () {
  pictureIncreaseScale();
});
// обработчик уменьшения фото
controlSmaller.addEventListener('click', function () {
  pictureDecreaseScale();
});

// добавление эффектов черновой вариант
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelValue = document.querySelector('.effect-level__value');
var effectLevel;
// расчет растояния пина от крайнего левого положения до центра пина
effectLevelPin.addEventListener('mouseup', function () {
  effectLevel = Math.floor((effectLevelPin.offsetLeft + (effectLevelPin.offsetWidth / 2)) / effectLevelPin.offsetParent.offsetWidth * 100);
  effectLevelValue.value = effectLevel;
});

var effectsList = document.querySelector('.effects__list');
var imgUploadPreview = document.querySelector('.img-upload__preview img');
// функция извенения класса эффектов
function setEffectClassName(value) {
  imgUploadPreview.className = '';
  var className = 'effects__preview--' + value;
  imgUploadPreview.classList.add(className);
}
// обработчик события на клик для эффектов
effectsList.addEventListener('click', function (evt) {
  if (evt.target && evt.target.matches('input[type="radio"]')) {
    setEffectClassName(evt.target.value);
    effectLevelValue.value = 100;
  }
});

// Валидация хеш-тегов
var textHashtag = document.querySelector('.text__hashtags');
var re = /^(#[a-zA-Zа-яА-Я0-9]+ +){0,4}(#[a-zA-Zа-яА-Я0-9]+)?$/;

textHashtag.addEventListener('input', function () {
  var textBlock = textHashtag.value;
  var lotTextBlock = textBlock.split(/ +/g);
  var newlotTextBlock = lotTextBlock.filter(function (elem, pos) {
    return lotTextBlock.indexOf(elem) === pos;
  });

  // условие валидации хештегов
  var filterMassTextFill = (newlotTextBlock.length !== lotTextBlock.length);
  if (filterMassTextFill) {
    textHashtag.setCustomValidity('Хештеги не должны повторяться!');
  } else if (newlotTextBlock.length > MAX_HASHTAGS) {
    textHashtag.setCustomValidity('Максимальное количество хештегов 5шт!');
  } else if (re.test(textHashtag.value)) {
    textHashtag.setCustomValidity('');
  } else {
    textHashtag.setCustomValidity('Неправильно набран хеш-тег! Пример: #module');
  }

  for (var i = 0; i < newlotTextBlock.length; i++) {
    if (newlotTextBlock[i].length > MAX_SYMBOL) {
      textHashtag.setCustomValidity('Максимальное количество знаков, не должно превышать 20шт включая знак #');
      break;
    } else if (newlotTextBlock[i].length < MIN_SYMBOL) {
      textHashtag.setCustomValidity('хеш-тег не может состоять из одного любого знака, включая знак #');
    }
    break;
  }
});
