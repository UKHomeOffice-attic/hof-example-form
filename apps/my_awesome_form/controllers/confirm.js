'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;

var ConfirmController = function ConfirmController() {
  BaseController.apply(this, arguments);
};

util.inherits(ConfirmController, BaseController);

ConfirmController.prototype.saveValues = function saveValues(req, res, callback) {

  BaseController.prototype.saveValues.call(this, req, res, function saveModel() {
    //  You can retrieve and use data with the below call, then add further actions below to do something with the data
    //  var data = _.pick(req.sessionModel.toJSON(), _.identity);
    callback();
  });

};

module.exports = ConfirmController;
