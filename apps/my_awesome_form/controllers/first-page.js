'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var DateController = controllers.date;

var FirstPageController = function FirstPageController() {
  this.dateKey = 'example-dob';
  DateController.apply(this, arguments);
};

util.inherits(FirstPageController, DateController);

/*
 * The validateField method can be overidden in the following way to
 * always allow date to be omitted, regardless of settings in fields directory
 */
// FirstPageController.prototype.validateField = function validateField(keyToValidate, req) {
//   return DateController.prototype.validateField.call(this, keyToValidate, req, false);
// };

module.exports = FirstPageController;
