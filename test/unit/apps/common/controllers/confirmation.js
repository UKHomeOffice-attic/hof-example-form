'use strict';

var BaseController = require('../../../../../lib/base-controller');
var ConfirmationController = require('../../../../../apps/common/controllers/confirmation');

describe('apps/common/controllers/confirmation', function () {

  beforeEach(function () {
    BaseController.prototype.getNextStep = sinon.stub();
  });

  describe('.getValues()', function () {
    var controller;
    var json = {foo: 'bar'};
    var req = {
      sessionModel: {
      reset: sinon.stub(),
      toJSON: sinon.stub().returns(json)
    }};
    var res = {};
    var callback = sinon.stub();

    beforeEach(function () {
      controller = new ConfirmationController({template: 'foo'});
      controller.getValues(req, res, callback);
    });

    it('resets the session', function () {
      req.sessionModel.reset.should.have.been.calledOnce;
    });

    it('responds with null errors and json', function () {
      callback.should.have.been.calledWith(null, json);
    });
  });

  describe('when the user is outside the uk', function () {

    var req = {
      form: {
        values: {
          'inside-uk': 'no'
        }
      }
    };
    var res = {};
    var controller;

    beforeEach(function () {
      controller = new ConfirmationController({template: 'foo'});
    });

    it('locals.location is ouside-uk', function () {
      var preparedLocals = controller.locals(req, res);

      preparedLocals.should.have.property('location')
        .and.deep.equal({'outside-uk': true});

    });

  });

  describe('when the user is inside the uk', function () {

    var req = {
      form: {
        values: {
          'inside-uk': 'yes'
        }
      }
    };
    var res = {};
    var controller;

    beforeEach(function () {
      controller = new ConfirmationController({template: 'foo'});
    });

    it('locals.location is inside-uk', function () {
      var preparedLocals = controller.locals(req, res);

      preparedLocals.should.have.property('location')
        .and.deep.equal({'inside-uk': true});

    });

  });

  describe('when the user is neither inside the uk or outside the uk', function () {

    var req = {
      form: {
        values: {}
      }
    };
    var res = {};
    var controller;

    beforeEach(function () {
      controller = new ConfirmationController({template: 'foo'});
    });

    it('locals.location is not-specified', function () {
      var preparedLocals = controller.locals(req, res);

      preparedLocals.should.have.property('location')
        .and.deep.equal({'not-specified': true});

    });

  });

});
