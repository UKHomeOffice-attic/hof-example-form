'use strict';

const controllers = require('hof').controllers;
const BaseController = controllers.base;
const ErrorController = controllers.error;

module.exports = class FourthPageController extends BaseController {
  constructor(options) {
    super(options);
    this.multiplesKey = 'multiples-input';
  }

  validateField(keyToValidate, req) {
    function isNotMultipleOfThree(number) {
      return (number % 3) !== 0;
    }

    const fieldValue = req.form.values[keyToValidate];
    if (keyToValidate === this.multiplesKey && isNotMultipleOfThree(fieldValue)) {
      return new ErrorController(this.multiplesKey, {
        key: this.multiplesKey,
        type: 'multipleError',
        redirect: undefined
      });
    }
    return super.validateField(keyToValidate, req);
  }
};
