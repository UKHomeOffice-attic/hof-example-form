'use strict';

const controllers = require('hof').controllers;

module.exports = {
  '/': {
    controller: controllers.start,
    next: '/first-page'
  },
  '/first-page': {
    controller: require('./controllers/first-page'),
    fields: [
      'example-radio',
      'example-dob',
      'example-dob-day',
      'example-dob-month',
      'example-dob-year',
      'example-text',
      'example-email'
    ],
    next: '/second-page'
  },
  '/second-page': {
    fields: [
      'yes-no-radio-toggler',
      'example-toggled-text'
    ],
    next: '/third-page'
  },
  '/third-page': {
    fields: [
      'yes-no-radio',
      'example-depends-on-text'
    ],
    next: '/fourth-page'
  },
  '/fourth-page': {
    controller: require('./controllers/fourth-page'),
    fields: ['multiples-input'],
    next: '/confirm'
  },
  '/confirm': {
    controller: require('./controllers/confirm'),
    next: '/confirmation'
  },
  '/confirmation': {
    backLink: false,
    clearSession: true
  }
};
