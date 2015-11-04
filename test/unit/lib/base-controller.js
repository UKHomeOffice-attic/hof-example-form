'use strict';

var proxyquire = require('proxyquire');

describe('lib/base-controller', function () {

  var hof;
  var Controller;
  var controller;

  beforeEach(function () {
    hof = require('hof');
  });

  describe('constructor', function () {

    beforeEach(function () {
      hof.wizard.Controller = sinon.stub();
      hof.wizard.Controller.prototype.locals = sinon.stub().returns({foo: 'bar'});
      Controller = proxyquire('../../../lib/base-controller', {
        'hof': hof
      });
    });

    it('calls the parent constructor', function () {
      controller = new Controller({template: 'foo'});
      hof.wizard.Controller.should.have.been.called;
    });

  });

  describe('methods', function () {

    beforeEach(function () {
      hof.wizard.Controller.prototype.getNextStep = sinon.stub();
      Controller = proxyquire('../../../lib/base-controller', {
        'hof': hof
      });
    });

    describe('.locals()', function () {

      var req = {
        params: {}
      };
      var res = {};

      beforeEach(function () {
        controller = new Controller({
          template: 'foo'
        });
      });

      it('always extends from parent locals', function () {
        controller.getErrors = sinon.stub().returns({foo: true});
        controller.locals(req, res).should.have.property('foo').and.always.equal('bar');
      });

      it('returns errorLength.single if there is one error', function () {
        controller.getErrors = sinon.stub().returns({foo: true});
        controller.locals(req, res).should.have.property('errorLength')
          .and.deep.equal({
            single: true
          });
      });

      it('returns errorLength.multiple if there is more than one error', function () {
        controller.getErrors = sinon.stub().returns({bar: true, baz: true});
        controller.locals(req, res).should.have.property('errorLength')
          .and.deep.equal({
            multiple: true
          });
      });
    });

    describe('.getValues()', function () {
      var req = {
        params: {}
      };
      var res = {};
      var callback;

      beforeEach(function () {
        hof.wizard.Controller.prototype.getValues = sinon.stub();
        Controller.prototype.getErrors = sinon.stub();
        req = {
          sessionModel: {
            reset: sinon.stub()
          },
          header: sinon.stub()
        };
        callback = sinon.stub();
      });

      describe('when there\'s a next step', function () {

        beforeEach(function () {
          controller = new Controller({
            template: 'foo'
          });
          controller.options = {
            next: '/somepage'
          };
          controller.getValues(req, res, callback);
        });

        it('resets the session', function () {
          req.sessionModel.reset.should.not.have.been.called;
        });

      });

      describe('when there\'s no next step', function () {

        beforeEach(function () {
          controller = new Controller({template: 'foo'});
          controller.options = {};
          controller.getValues(req, res, callback);
        });

        it('resets the session', function () {
          req.sessionModel.reset.should.have.been.calledOnce;
        });

      });

      describe('when there\'s no next step but clearSession is false', function () {

        beforeEach(function () {
          controller = new Controller({template: 'foo'});
          controller.options = {
            clearSession: false
          };
          controller.getValues(req, res, callback);
        });

        it('resets the session', function () {
          req.sessionModel.reset.should.not.have.been.calledOnce;
        });

      });

      describe('when clearSession is set', function () {

        beforeEach(function () {
          controller = new Controller({template: 'foo'});
          controller.options = {
            clearSession: true
          };
          controller.getValues(req, res, callback);
        });

        it('resets the session', function () {
          req.sessionModel.reset.should.have.been.calledOnce;
        });

      });

      it('gets the referer header if there are no errors', function () {
        controller = new Controller({template: 'foo'});
        controller.options = {};
        controller.getValues(req, res, callback);

        req.header.should.have.been.calledOnce
          .and.always.have.been.calledWith('Referer');
      });

      it('does not get the referer header if there are errors', function () {
        controller = new Controller({template: 'foo'});
        controller.options = {};
        controller.getValues(req, res, callback);
        Controller.prototype.getErrors = sinon.stub().returns({error: true});

        req.header.should.have.been.calledOnce
          .and.always.have.been.calledWith('Referer');
      });

      it('always calls the parent controller getValues', function () {
        controller = new Controller({template: 'foo'});
        controller.options = {};
        controller.getValues(req, res, callback);
        hof.wizard.Controller.prototype.getValues
          .should.always.have.been.calledWithExactly(req, res, callback);
      });

    });

    describe('.getNextStep()', function () {
      var req = {};

      beforeEach(function () {
        hof.wizard.Controller.prototype.getNextStep = sinon.stub().returns('/');
        req.params = {};
        req.baseUrl = '';
        controller = new Controller({template: 'foo'});
        controller.options = {};
      });

      describe('when the action is "edit"', function () {
        it('appends "edit" to the path', function () {
          controller.options.continueOnEdit = true;
          req.params.action = 'edit';
          controller.getNextStep(req).should.contain('/edit');
        });
      });

      describe('when the action is "edit" and continueOnEdit option is falsey', function () {
        it('appends "confirm" to the path', function () {
          controller.options.continueOnEdit = false;
          req.params.action = 'edit';
          controller.getNextStep(req).should.contain('/confirm');
        });
      });

    });

    describe('.getErrorStep()', function () {
      var req = {};
      var err = {};

      beforeEach(function () {
        hof.wizard.Controller.prototype.getErrorStep = sinon.stub().returns('/');
        req.params = {};
        controller = new Controller({template: 'foo'});
      });

      describe('when the action is "edit" and the parent redirect is not edit', function () {
        it('appends "edit" to the path', function () {
          req.params.action = 'edit';
          controller.getErrorStep(err, req).should.contain('/edit');
        });
      });

    });

  });

});
