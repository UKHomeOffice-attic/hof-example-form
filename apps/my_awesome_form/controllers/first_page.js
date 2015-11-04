'use strict';

var util = require('util');
var DateController = require('../../../lib/date-controller');

var FirstPageController = function FirstPageController() {
    this.dateKey = 'example-dob';
    DateController.apply(this, arguments);
};

util.inherits(FirstPageController, DateController);

FirstPageController.prototype.validateField = function validateField(keyToValidate, req) {
    return DateController.prototype.validateField.call(this, keyToValidate, req, false);
};

module.exports = FirstPageController;
