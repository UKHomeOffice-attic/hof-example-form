'use strict';

var Controller = sinon.stub();
Controller.prototype = {};
Controller.prototype.validateField = sinon.stub();

var moment = require('moment');
var proxyquire = require('proxyquire');
var DateController = proxyquire('../../../lib/date-controller', {
  '../lib/base-controller': Controller
});
var ErrorClass = require('../../../lib/base-error');

describe('lib/date-controller', function () {

  var controller;
  var args = {template: 'index'};

  beforeEach(function () {
    controller = new DateController(args);
    controller.dateKey = 'date';
  });

  describe('instantiated', function () {
    it('calls Controller with the arguments', function () {
      Controller.should.have.been.called;
    });
  });

  describe('validateField(keyToValidate, req)', function () {

    var req = {
      form: {
        values: {}
      }
    };

    describe('error scenarios', function () {

      describe('required error', function () {

        it('returns an error class when the field is undefined', function () {
          req.form.values.date = undefined;
          var undefinedCheck = controller.validateField('date', req);

          undefinedCheck.should.be.an.instanceof(ErrorClass);
          undefinedCheck.should.have.property('key').and.equal('date');
          undefinedCheck.should.have.property('type').and.equal('required');
        });

        it('returns an error class when the field is an empty string', function () {
          req.form.values.date = '';
          var emptyStringCheck = controller.validateField('date', req);

          emptyStringCheck.should.be.an.instanceof(ErrorClass);
          emptyStringCheck.should.have.property('key').and.equal('date');
          emptyStringCheck.should.have.property('type').and.equal('required');
        });

      });

      describe('numeric error', function () {

        it('returns an error class when the field is not numeric', function () {
          req.form.values.date = 'ab-cd-efgh';
          var numericCheck = controller.validateField('date', req);

          numericCheck.should.be.an.instanceof(ErrorClass);
          numericCheck.should.have.property('key').and.equal('date');
          numericCheck.should.have.property('type').and.equal('numeric');
        });

      });

      describe('format error', function () {

        it('returns an error class when the field is incorrectly formatted', function () {
          req.form.values.date = '01-13-1982';
          var formatCheck = controller.validateField('date', req);

          formatCheck.should.be.an.instanceof(ErrorClass);
          formatCheck.should.have.property('key').and.equal('date');
          formatCheck.should.have.property('type').and.equal('format');
        });

      });

      describe('future error', function () {

        it('returns an error class when the field is in the future', function () {
          req.form.values.date = moment().add(1, 'day').format('DD-MM-YYYY');
          var formatCheck = controller.validateField('date', req);

          formatCheck.should.be.an.instanceof(ErrorClass);
          formatCheck.should.have.property('key').and.equal('date');
          formatCheck.should.have.property('type').and.equal('future');
        });

      });

    });

    describe('when the date is not required', function () {

      describe('required error', function () {

        it('does not return an error when the field is undefined', function () {
          req.form.values.date = undefined;

          should.equal(controller.validateField('date', req, false), undefined);
        });

        it('does not return an error when the field is an empty string', function () {
          req.form.values.date = '';

          should.equal(controller.validateField('date', req, false), undefined);
        });

      });

      describe('numeric error', function () {

        it('returns an error class when the field is not numeric', function () {
          req.form.values.date = 'ab-cd-efgh';
          var numericCheck = controller.validateField('date', req, false);

          numericCheck.should.be.an.instanceof(ErrorClass);
          numericCheck.should.have.property('key').and.equal('date');
          numericCheck.should.have.property('type').and.equal('numeric');
        });

      });

      describe('format error', function () {

        it('returns an error class when the field is incorrectly formatted', function () {
          req.form.values.date = '01-13-1982';
          var formatCheck = controller.validateField('date', req, false);

          formatCheck.should.be.an.instanceof(ErrorClass);
          formatCheck.should.have.property('key').and.equal('date');
          formatCheck.should.have.property('type').and.equal('format');
        });

      });

      describe('future error', function () {

        it('returns an error class when the field is in the future', function () {
          req.form.values.date = moment().add(1, 'day').format('DD-MM-YYYY');
          var formatCheck = controller.validateField('date', req, false);

          formatCheck.should.be.an.instanceof(ErrorClass);
          formatCheck.should.have.property('key').and.equal('date');
          formatCheck.should.have.property('type').and.equal('future');
        });

      });

    });

    describe('valid field', function () {
      it('returns undefined', function () {
        req.form.values.date = '01-01-2015';

        should.equal(controller.validateField('date', req), undefined);
      });
    });

    describe('when the key is not a date', function () {
      it('calls the parent class validateField', function () {
        Controller.prototype.validateField.returns('parent controller');

        controller.validateField('first-name', req).should.equal('parent controller');
      });
    });
  });

  describe('.process()', function () {
    describe('with all date parts', function () {
      var callback;
      var req = {
        form: {
          values: {
            'date-day': '01',
            'date-month': '01',
            'date-year': '2015'
          }
        }
      };

      beforeEach(function () {
        callback = sinon.stub();
        controller = new DateController(args);
        controller.dateKey = 'date';
        controller.process(req, {}, callback);
      });

      it('creates a date field', function () {
        req.form.values.date.should.equal('01-01-2015');
      });
      it('calls callback', function () {
        callback.should.have.been.called;
      });

    });
    describe('with missing date parts', function () {
      var callback;
      var req = {
        form: {
          values: {
            'date-day': '01',
            'date-month': '',
            'date-year': '2015'
          }
        }
      };

      beforeEach(function () {
        callback = sinon.stub();
        controller = new DateController({template: 'index'});
        controller.dateKey = 'date';
        controller.process(req, {}, callback);
      });
      it('creates a date field', function () {
        should.equal(req.form.values.date, undefined);
      });
      it('calls callback', function () {
        callback.should.have.been.called;
      });
    });
  });

  describe('format', function () {
    var req = {
      form: {
        values: {}
      }
    };
    beforeEach(function () {
      controller = new DateController({template: 'index'});
      controller.dateKey = 'date';
    });

    it('formats the date property to GDS style date', function () {
      req.form.values['date-day'] = '01';
      req.form.values['date-month'] = '11';
      req.form.values['date-year'] = '1982';

      controller.format(req);

      req.form.values['date-formatted'].should.equal('1 November 1982');
    });
  });

});
