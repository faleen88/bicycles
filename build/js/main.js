'use strict';

var MIN_NAME_LENGTH = 1;
var ALERT_SHOW_TIME = 4000;

var siteBody = document.querySelector('.page__body');
var mainNav = document.querySelector('.nav');
var navToggle = document.querySelector('.nav__toggle');

mainNav.classList.remove('nav--nojs');

// Меню

var closeMenu = function () {
  mainNav.classList.remove('nav--opened');
  mainNav.classList.add('nav--closed');
  siteBody.classList.remove('overflow-hidden');
};

var openMenu = function () {
  mainNav.classList.remove('nav--closed');
  mainNav.classList.add('nav--opened');
  siteBody.classList.add('overflow-hidden');
};

navToggle.addEventListener('click', function () {
  if (mainNav.classList.contains('nav--closed')) {
    openMenu();
  } else {
    closeMenu();
  }
});

// Якорные ссылки

var anchors = document.querySelectorAll('a[href^="#"]');

anchors.forEach(function (anchor) {
  anchor.addEventListener('click', function (evt) {
    evt.preventDefault();
    var id = anchor.getAttribute('href');

    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    closeMenu();
  });
});

// Форма

var formContact = document.querySelector('.form');
var nameInput = formContact.querySelector('#name');
var phoneInput = formContact.querySelector('#phone');

nameInput.addEventListener('input', function () {
  var valueName = nameInput.value;

  if (valueName < MIN_NAME_LENGTH) {
    nameInput.setCustomValidity('Введите ваше имя.');
  } else {
    nameInput.setCustomValidity('');
  }

  nameInput.reportValidity();
});

phoneInput.addEventListener('input', function () {
  var valuePhone = phoneInput.value;
  var checkPhone = /[-\.;":'a-zA-Zа-яА-Я]/;

  if (checkPhone.test(valuePhone)) {
    phoneInput.setCustomValidity('Вводите только цифры.');
  } else {
    phoneInput.setCustomValidity('');
  }

  phoneInput.reportValidity();
});

var isStorageSupport = true;
var storagePhone = '';
var storageName = '';

try {
  storagePhone = localStorage.getItem('phone');
  storageName = localStorage.getItem('name');
} catch (err) {
  isStorageSupport = false;
}

if (storageName) {
  nameInput.value = storageName;
}

if (storagePhone) {
  phoneInput.value = storagePhone;
}

var modalSuccess = document.querySelector('.modal');

var showAlert = function () {
  modalSuccess.classList.remove('visually-hidden');

  setTimeout(function () {
    modalSuccess.classList.add('visually-hidden');
  }, ALERT_SHOW_TIME);
};

formContact.addEventListener('submit', function (evt) {
  evt.preventDefault();

  if (!phoneInput.value && !nameInput.value) {
    evt.preventDefault();
  } else {
    if (isStorageSupport) {
      localStorage.setItem('phone', phoneInput.value);
      localStorage.setItem('name', nameInput.value);
    }

    showAlert();
  }
});
