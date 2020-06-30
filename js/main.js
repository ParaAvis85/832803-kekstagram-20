'use strict';

var descriptionPhoto = ''; // описание фотографии пустое

var controlBigger = document.querySelector('.scale__control--bigger');
var controlSmaller = document.querySelector('.scale__control--smaller');
var controlValue = document.querySelector('.scale__control--value');
var resizeImg = document.querySelector('.img-upload__preview img');

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
  for (var i = 0; i < window.constant.COUNT_COMMENT; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomCount(window.constant.MIN_AVATAR_COUNT, window.constant.MAX_AVATAR_COUNT) + '.svg', // это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg  где данные  в скобках контактенация цикла количества фото по количеству в задании
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
  for (var i = 0; i < window.constant.PHOTOS_COUNT; i++) {
    var photosScetch = {
      id: i,
      url: 'photos/' + (i + 1) + '.jpg', // здесь будет адресс фото photos/{{i}}.jpg где i = контактенация цикла количества фото по количеству в задании.
      description: descriptionPhoto,
      likes: getRandomCount(window.constant.MIN_LIKES_COUNT, window.constant.MAX_LIKES_COUNT), // здесь добавить из будущей  внешней функции которая через цикл создаст количество лайков случайно от 15 до 200.
      comments: getComments()
    };
    photosInfoCount.push(photosScetch); // обьект  который добавляем в массив через цикл.
  }
  return photosInfoCount; // видим число обьектов через массив
}

// выводим данные в консоль из функции создания массива из обьекта

var manyPhotos = getPhotos(); // переменная массива фото берет данные из функции создания фото.
var photosList = document.querySelector('.pictures'); //  ищем список фото

function renderPhotos(manyPhoto) {
  var templateFragment = document.createDocumentFragment(); // переменная с созданием документ фрагмента
  // цикл отрисовки массива в фото из переменной
  for (var i = 0; i < window.constant.PHOTOS_COUNT; i++) {
    templateFragment.appendChild(window.createPhoto(manyPhoto[i]));
  }

  photosList.appendChild(templateFragment); // добавляем фрагмент с нужным количеством фото на страницу

}
renderPhotos(manyPhotos);


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
  scaleValue += window.constant.SCALE_STEP;
  if (scaleValue > window.constant.MAX_SCALE_VALUE) {
    scaleValue = window.constant.MAX_SCALE_VALUE;
  }
  changePictureScale(scaleValue);
}
// функция уменьшения фото
function pictureDecreaseScale() {
  var scaleValue = parseInt(controlValue.value, 10);
  scaleValue -= window.constant.SCALE_STEP;
  if (scaleValue <= window.constant.MIN_SCALE_VALUE) {
    scaleValue = window.constant.MIN_SCALE_VALUE;
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


// module4-3

// открытие открытие по ентеру
var onPreviewEnterPress = function (evt) {
  if (evt.keyCode === 13) {
    var picture = evt.target.closest('.picture');
    if (picture) {
      var id = picture.dataset.id;
      window.bigPicture.open(manyPhotos[id]);
      document.addEventListener('keydown', onEscapePress);
    }

  }
};
// открытие фото по одному из превью
function onCustomPhotoClick(evt) {
  var picture = evt.target.closest('.picture');
  if (picture) {
    var id = picture.dataset.id;
    window.bigPicture.open(manyPhotos[id]);
    document.addEventListener('keydown', onEscapePress);
  }
}

function onEscapePress(evt) {
  if (evt.keyCode === 27) {
    window.bigPicture.close();
    document.removeEventListener('keydown', onEscapePress);
  }
}

// обработчики для случайных фото
photosList.addEventListener('click', onCustomPhotoClick);
photosList.addEventListener('keydown', onPreviewEnterPress);
