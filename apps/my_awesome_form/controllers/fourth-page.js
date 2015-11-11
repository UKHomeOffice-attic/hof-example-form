'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;
var ErrorController = controllers.error;

var FourthPageController = function FourthPageController() {
  this.multiplesKey = 'multiples-input';
  BaseController.apply(this, arguments);
};

util.inherits(FourthPageController, BaseController);

FourthPageController.prototype.validateField = function validateField(keyToValidate, req) {
  function isNotMultipleOfThree(number) {
    return (number % 3) !== 0;
  }

  var fieldValue = req.form.values[keyToValidate];
  if (keyToValidate === this.multiplesKey && isNotMultipleOfThree(fieldValue)) {
    return new ErrorController(this.multiplesKey, {
      key: this.multiplesKey,
      type: 'multipleError',
      redirect: undefined
    });
  }
  return BaseController.prototype.validateField.call(this, keyToValidate, req);
};

module.exports = FourthPageController;
