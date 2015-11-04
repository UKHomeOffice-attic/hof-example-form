'use strict';

var proxyquire = require('proxyquire');

var modelProto = {
  save: sinon.stub(),
  set: sinon.stub()
};
var Model = sinon.stub();
Model.prototype = modelProto;
var BaseController = sinon.stub();
BaseController.prototype.saveValues = sinon.stub().callsArg(2);

var ConfirmController = proxyquire('../../../../../apps/common/controllers/confirm', {
  '../../../lib/base-controller': BaseController,
  '../models/email': Model,
  '../routes/fields': {foo: {}, bar: {}}
});

describe('apps/common/controllers/confirm', function () {

  describe('.saveValues()', function () {

    var controller;
    var expected = {foo: 'bar'};
    var req = {
      sessionModel: {
        toJSON: sinon.stub().returns(expected)
      },
      originalUrl: '/not-arrived/confirm'
    };
    var res = {};
    var callback = sinon.stub();

    beforeEach(function () {
      controller = new ConfirmController({template: 'index'});
      controller.saveValues(req, res, callback);
    });

    it('saves the session data to the a model', function () {
      Model.should.have.been.calledWith(expected);
      Model.prototype.save.should.have.been.called;
    });

    it('sets a template for delivery journey', function () {
      req.originalUrl = '/not-arrived/confirm';
      controller.saveValues(req, res, callback);

      modelProto.set.should.have.been.calledWith('template', 'delivery');
    });

    it('sets a template for error journey', function () {
      req.originalUrl = '/correct-mistakes/confirm';
      controller.saveValues(req, res, callback);

      modelProto.set.should.have.been.calledWith('template', 'error');
    });

    it('sets a template for lost or stolen inside uk journey', function () {
      req.originalUrl = '/lost-stolen-damaged/confirm';
      req.sessionModel.toJSON.returns({'inside-uk': 'yes'});
      controller.saveValues(req, res, callback);

      modelProto.set.should.have.been.calledWith('template', 'lost-or-stolen-uk');
    });

    it('sets a template for lost or stolen outside uk journey', function () {
      req.originalUrl = '/lost-stolen-damaged/confirm';
      req.sessionModel.toJSON.returns({'inside-uk': 'no'});
      controller.saveValues(req, res, callback);

      modelProto.set.should.have.been.calledWith('template', 'lost-or-stolen-abroad');
    });

    it('throws an error if its not part of a recognised journey', function () {
      req.originalUrl = '/unrecognised-journey';

      (function () {
        controller.saveValues(req, res, callback);
      }).should.throw('no service found');
    });

  });

});
