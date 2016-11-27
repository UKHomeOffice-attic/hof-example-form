'use strict';

const BaseController = require('hof').controllers.base;

module.exports = class ConfirmController extends BaseController {
  saveValues(req, res, callback) {
    super.saveValues(req, res, () => {
      // You can retrieve and use data with the below call, then
      // add further actions below to do something with the data
      // var data = _.pick(req.sessionModel.toJSON(), _.identity);
      callback();
    });
  }
};
