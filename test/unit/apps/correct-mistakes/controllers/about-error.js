'use strict';

var AboutErrorController = require('../../../../../apps/correct-mistakes/controllers/about-error');
var DateController = require('../../../../../lib/date-controller');
var Controller = require('../../../../../lib/base-controller');
var ErrorClass = require('../../../../../lib/base-error');

describe('apps/correct-mistakes/controllers/about-error', function () {

  describe('.saveValues()', function () {

    var controller;
    var req;
    var res;
    var callback;

    beforeEach(function () {
      req = {
        form: {
          values: {
          }
        },
        sessionModel: {
          set: sinon.stub(),
          get: sinon.stub(),
          unset: sinon.stub()
        }
      };
      res = {};
      callback = sinon.stub();

      Controller.prototype.saveValues = sinon.stub();
      controller = new AboutErrorController({template: 'index'});
    });

    it('removes values that are not checked and have unchecked counterparts', function () {
      req.form.values = {
        'foo-checkbox': '',
        foo: 'bar',
        'baz-checkbox': 'true',
        baz: 'foo'
      };
      controller.saveValues(req, res, callback);

      req.sessionModel.unset.should.have.been.calledWithExactly(['foo-checkbox', 'foo']);
    });

    it('always calls the parent controller saveValues with the arguments', function () {
      controller.saveValues(req, res, callback);

      Controller.prototype.saveValues.should.have.been.calledOnce
        .and.always.have.been.calledWithExactly(req, res, callback);
    });

    it('always calls DateController#format with the request object', function () {
      DateController.prototype.format = sinon.stub();
      controller.saveValues(req, res, callback);

      DateController.prototype.format
        .should.always.have.been.calledWithExactly(req);
    });

  });

  describe('.getNextStep()', function () {

    var controller;
    var req;
    var res;
    var callback;

    beforeEach(function () {
      req = {
        baseUrl: '/foo',
        form: {
          values: {
          }
        },
        sessionModel: {
          set: sinon.stub(),
          get: sinon.stub()
        }
      };
      res = {};
      callback = sinon.stub();
      Controller.prototype.getNextStep = sinon.stub();
      controller = new AboutErrorController({template: 'index'});
    });

    describe('when collection location is UK and conditions and length was checked', function () {
      beforeEach(function () {
        req.form.values['conditions-error-checkbox'] = 'true';
        req.sessionModel.get.withArgs('location-applied').returns('yes');
      });
      it('returns baseUrl and "/conditions-and-length"', function () {
        controller.getNextStep(req, res, callback).should.equal('/foo/conditions-and-length');
      });
    });

    describe('when entered first name is more than 30 characters', function () {
      beforeEach(function () {
        req.form.values['first-name-error-checkbox'] = 'true';
        req.form.values['first-name-error'] = 'foobarbazfoobarbazfoobarbazfoobarbaz';
      });
      it('returns baseUrl and "/truncated"', function () {
        controller.getNextStep(req, res, callback).should.equal('/foo/truncated');
        req.sessionModel.set.should.have.been.calledWith('truncated-items', [{id: 'first-name-error'}]);
      });
    });

    describe('when last name is more than 30 characters', function() {
      beforeEach(function() {
        req.form.values['last-name-error-checkbox'] = 'true';
        req.form.values['last-name-error'] = 'foobarbazfoobarbazfoobarbazfoobarbaz';
      });
      it('returns baseUrl and "/truncated"', function () {
        controller.getNextStep(req, res, callback).should.equal('/foo/truncated');
        req.sessionModel.set.should.have.been.calledWith('truncated-items', [{id: 'last-name-error'}]);
      });
    });

    describe('when birth place is more than 16 characters', function () {
      beforeEach(function () {
        req.form.values['birth-place-error-checkbox'] = 'true';
        req.form.values['birth-place-error'] = 'foobarbazfoobarba';
      });
      it('returns baseUrl and "/truncated"', function () {
        controller.getNextStep(req, res, callback).should.equal('/foo/truncated');
        req.sessionModel.set.should.have.been.calledWith('truncated-items', [{id: 'birth-place-error'}]);
      });
    });

    describe('by default', function() {
      beforeEach(function () {
        Controller.prototype.getNextStep.returns('/bar');
      });
      it('returns user configured next value', function () {
        controller.getNextStep(req, res, callback).should.equal('/bar');
      });
    });

  });

  describe('.validateField(keyToValidate, req)', function () {

    var controller;
    var req;

    beforeEach(function () {
      req = {form: {values: {}}};
      Controller.prototype.validateField = sinon.stub();
      DateController.prototype.validateField = sinon.stub();
      controller = new AboutErrorController({template: 'index'});
    });

    it('returns an error-selection required error if none are checked', function () {
      req.form.values['first-name-error-checkbox'] = '';
      req.form.values['last-name-error-checkbox'] = '';
      req.form.values['birth-place-error-checkbox'] = '';
      req.form.values['date-of-birth-error-checkbox'] = '';

      var result = controller.validateField('first-name-error', req);

      result.should.be.an.instanceof(ErrorClass);
      result.should.have.property('key').and.equal('error-selection');
      result.should.have.property('type').and.equal('required');

      Controller.prototype.validateField.should.not.have.been.called;
    });

    describe('when the key is a date and is checked', function () {

      it('calls valdateField on the DateController', function () {
        req.form.values['date-of-birth-error-checkbox'] = 'true';
        controller.validateField('date-of-birth-day-error', req);

        DateController.prototype.validateField.should.have.been.calledWithExactly('date-of-birth-day-error', req);
      });

    });

    describe('when the key is not a date', function () {

      it('calls validateField on the Controller', function () {
        req.form.values.foo = 'true';
        controller.validateField('foo', req);

        Controller.prototype.validateField.should.have.been.calledWithExactly('foo', req);
      });

    });

  });

});
