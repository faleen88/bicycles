'use strict';

var siteBody = document.querySelector('.page__body');
var mainNav = document.querySelector('.nav');
var navToggle = document.querySelector('.nav__toggle');

mainNav.classList.remove('nav--nojs');

// Меню

navToggle.addEventListener('click', function () {
  if (mainNav.classList.contains('nav--closed')) {
    mainNav.classList.remove('nav--closed');
    mainNav.classList.add('nav--opened');
    siteBody.classList.add('overflow-hidden');
  } else {
    mainNav.classList.remove('nav--opened');
    mainNav.classList.add('nav--closed');
    siteBody.classList.remove('overflow-hidden');
  }
});
