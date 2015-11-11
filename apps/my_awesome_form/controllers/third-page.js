'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;

var ThirdPageController = function ThirdPageController() {
  BaseController.apply(this, arguments);
};

util.inherits(ThirdPageController, BaseController);

ThirdPageController.prototype.validateField = function validateField(keyToValidate, req) {
  return BaseController.prototype.validateField.call(this, keyToValidate, req);
};

module.exports = ThirdPageController;
