'use strict';

const DateController = require('hof').controllers.date;

module.exports = class FirstPageController extends DateController {
  constructor(options) {
    super(options);
    this.dateKey = 'example-dob';
  }

  /*
   * The validateField method can be overidden in the following way to
   * always allow date to be omitted, regardless of settings in fields directory
   */
  // validateField(keyToValidate, req) {
  //   return super.validateField(keyToValidate, req, false);
  // }
};
