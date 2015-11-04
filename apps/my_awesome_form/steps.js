'use strict';

module.exports = {
  '/': {
    controller: require('../common/controllers/start'),
    next: '/first-page'
  },
  '/first-page': {
    controller: require('./controllers/first_page'),
      template: 'first-page',
    fields: [
      'example-radio',
      'example-dob',
      'example-dob-day',
      'example-dob-month',
      'example-dob-year'
    ],
    next: '/second-page'
  }
};
