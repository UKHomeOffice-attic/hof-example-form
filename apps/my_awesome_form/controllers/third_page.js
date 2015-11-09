'use strict';

var util = require('util');
var BaseController = require('../../../lib/base-controller');

var ThirdPageController = function ThirdPageController() {
    BaseController.apply(this, arguments);
};

util.inherits(ThirdPageController, BaseController);

ThirdPageController.prototype.validateField = function validateField(keyToValidate, req) {
    return BaseController.prototype.validateField.call(this, keyToValidate, req);
};

module.exports = ThirdPageController;
