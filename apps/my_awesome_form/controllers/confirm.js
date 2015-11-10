'use strict';

var util = require('util');
var BaseController = require('../../../lib/base-controller');

var ConfirmController = function ConfirmController() {
    BaseController.apply(this, arguments);
};

util.inherits(ConfirmController, BaseController);

ConfirmController.prototype.saveValues = function saveValues(req, res, callback) {

    BaseController.prototype.saveValues.call(this, req, res, function saveModel() {
        var data = _.pick(req.sessionModel.toJSON(), _.identity);
        console.log("Final data to do stuff with is: ", data);
        callback();
    });

};

module.exports = ConfirmController;
