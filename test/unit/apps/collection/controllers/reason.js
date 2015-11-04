'use strict';

var proxyquire = require('proxyquire');
var Controller = sinon.stub();
Controller.prototype.locals = sinon.stub().returns({foo: 'bar'});
Controller.prototype.getNextStep = sinon.stub();
var CollectionReasonController = proxyquire('../../../../../apps/collection/controllers/reason', {
  '../../../lib/base-controller': Controller
});

describe('app/scollection/controllers/collection-reason', function () {

  describe('instantiated', function () {


    it('calls Controller with the arguments', function () {
      var args = {template: 'index'};
      /*eslint no-new: 0*/
      new CollectionReasonController(args);

      Controller.should.have.been.calledWith(args);
    });
  });

  describe('.locals()', function () {

    var controller;
    var args = {template: 'index'};
    var req = {
      form: {
        values: {}
      }
    };
    var res = {};

    beforeEach(function () {
      controller = new CollectionReasonController(args);
    });

    it('extends form the parent controller', function () {
      controller.locals(req, res).should.have.property('foo').and.equal('bar');
    });

    it('returns a value indicating where the permit should have been collected from"', function () {
      req.form.values['example-radio'] = 'Post office';
      controller.locals(req, res).should.have.property('where').and.deep.equal({'post-office': true});
      req.form.values['example-radio'] = 'Sponsor';
      controller.locals(req, res).should.have.property('where').and.deep.equal({'sponsor': true});
    });

    it('returns a reason indicating why the permit was no collected', function () {
      req.form.values['reason-radio'] = 'under-age';
      controller.locals(req, res).should.have.property('reason').and.deep.equal({'under-age': true});
      req.form.values['reason-radio'] = 'other';
      controller.locals(req, res).should.have.property('reason').and.deep.equal({'other': true});
    });

  });

});
