'use strict';

var util = require('util');
var Controller = require('../lib/base-controller');
var ErrorClass = require('../lib/base-error');
var moment = require('moment');
var _ = require('underscore');
var dateFormat = 'DD-MM-YYYY';
var prettyDate = 'D MMMM YYYY';

var DateController = function Received() {
  Controller.apply(this, arguments);
};

util.inherits(DateController, Controller);

var validators = [
  {
    method: function isEmpty(value) {
      return value === '' || value === undefined;
    },
    type: 'required'
  },
  {
    method: function isInvalidChars(value) {
      var valueParts = value.split('-');
      return _.some(valueParts, function testForNumeric(part) {
        return /\D/.test(part);
      });
    },
    type: 'numeric'
  },
  {
    method: function isInvalidDateFormat(value) {
      return moment(value, dateFormat).isValid(dateFormat) === false;
    },
    type: 'format'
  },
  {
    method: function isFutureDate(value) {
      console.log('Validating the future');
      return moment(value, dateFormat).isAfter(moment()) === true;
    },
    type: 'future'
  }
];

function validateDateField(value) {
  var type = _.result(_.find(validators, function findErrorType(validator) {
    return validator.method(value);
  }), 'type');

  if (type) {
    return new ErrorClass(this.dateKey, {
      key: this.dateKey,
      type: type,
      redirect: undefined
    });
  }
}

function isDateField(key) {
  return key.indexOf(this.dateKey) !== -1;
}

function isDateKey(key) {
  return key === this.dateKey;
}

function hasValue(req, key) {
  return _.identity(req.form.values[key]);
}

function doValidate(key, req) {
  return isDateKey.call(this, key) &&
    _.filter(_.keys(req.form.values), isDateField.bind(this)).some( hasValue.bind(null, req));
}

DateController.prototype.validateField = function validateField(keyToValidate, req, required) {
  if (typeof required !== 'boolean') {
    required = true;
  }

  if (required && isDateKey.call(this, keyToValidate)) {
    return validateDateField.call(this, req.form.values[keyToValidate]);
  }

  if (!required && doValidate.call(this, keyToValidate, req)) {
    return validateDateField.call(this, req.form.values[keyToValidate]);
  }

  return Controller.prototype.validateField.apply(this, arguments);

};

DateController.prototype.saveValues = function saveValues(req) {
  this.format.call(this, req);
  Controller.prototype.saveValues.apply(this, arguments);
};

DateController.prototype.process = function process(req, res, callback) {

  var dateParts = {};
  var keys = _.keys(req.form.values);

  _.each(keys, function eachValue(id) {

    var idParts = id.split('-');
    var name = idParts[idParts.length - 1];
    var value = req.form.values[id];

    if (value) {
      dateParts[name] = value;
    }
  });

  if (dateParts.day && dateParts.month && dateParts.year) {
    req.form.values[this.dateKey] = [dateParts.day, dateParts.month, dateParts.year].join('-');
  }

  callback();
};

DateController.prototype.format = function format(req) {
  if (req.form.values[this.dateKey + '-day']) {
    var day = req.form.values[this.dateKey + '-day'];
    var month = req.form.values[this.dateKey + '-month'];
    var year = req.form.values[this.dateKey + '-year'];
    month = parseInt(month, 10) - 1;
    var formattedDate = moment([year, month, day]);
    req.form.values[this.dateKey + '-formatted'] = formattedDate.format(prettyDate);
  }
};

module.exports = DateController;
