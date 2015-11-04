'use strict';

var BaseController = require('../../../../../lib/base-controller');
var Controller = require('../../../../../apps/correct-mistakes/controllers/truncated');

describe('apps/correct-mistakes/controllers/truncated', function () {
  beforeEach(function () {
    BaseController.prototype.getNextPage = sinon.stub();
  });
  describe('.saveValues()', function () {
    var controller;
    var req;
    var res = {};
    var callback = function callback() {};
    var truncatedItems = [{id: 'item-one'}, {id: 'item-two'}];

    beforeEach(function () {
      req = {
        form: {
          values: {}
        },
        sessionModel: {
          set: sinon.stub(),
          get: sinon.stub().withArgs('truncated-items').returns(truncatedItems)
        }
      };
      BaseController.prototype.saveValues = sinon.stub();
      controller = new Controller({template: 'index'});
    });

    it('always calls saveValues on the parent controller with exact arguments', function () {
      controller.saveValues(req, res, callback);
      BaseController.prototype.saveValues.should.always.have.been.calledWithExactly(req, res, callback);
    });
    it('updates the truncated-items', function () {
      req.form.values = {
        'truncation-page': 'item-one',
         truncated: 'no'
      };
      controller.saveValues(req, res, callback);

      req.sessionModel.set
        .should.have.been.calledWithExactly('truncated-items', [{id: 'item-one', value: 'no'}, {id: 'item-two'}]);
    });
    it('redirects to the exit page if "yes" is selected for all truncated-items', function () {
      req.form.values = {
        'truncation-page': 'item-one',
         truncated: 'yes'
      };
      controller.saveValues(req, res, callback);
      req.form.values = {
        'truncation-page': 'item-two',
         truncated: 'yes'
      };
      controller.saveValues(req, res, callback);

      controller.options.next.should.equal('/exit-truncated');
    });
    it('redirects to the next page if "no" is selected for any truncated-items', function () {
      req.form.values = {
        'truncation-page': 'item-one',
         truncated: 'no'
      };
      controller.saveValues(req, res, callback);
      req.form.values = {
        'truncation-page': 'item-two',
         truncated: 'yes'
      };
      controller.saveValues(req, res, callback);

      controller.options.next.should.equal('/uk-address');
    });
    it('redirects to the truncate page if any item has not been selected', function () {
      req.form.values = {
        'truncation-page': 'item-one',
         truncated: 'no'
      };
      controller.saveValues(req, res, callback);
      req.form.values = {
        'truncation-page': 'item-two',
         truncated: undefined
      };
      controller.saveValues(req, res, callback);

      controller.options.next.should.equal('/truncated');
    });
  });
  describe('.locals()', function () {
    var controller;
    var req;
    var truncatedItems = [{id: 'item-one'}, {id: 'item-two'}];

    beforeEach(function () {
      req = {
        form: {
          values: {}
        },
        sessionModel: {
          set: sinon.stub(),
          get: sinon.stub().withArgs('truncated-items').returns(truncatedItems)
        }
      };
      BaseController.prototype.saveValues = sinon.stub();
      controller = new Controller({template: 'index'});
    });
    it('includes a truncatedItem entity', function () {
      req.form.values['item-one'] = 'foofoofoofoofoofoofoofoofoomaxfoo';

      controller.locals(req).should.have.property('truncatedItem');
    });
    it('includes a pretty version of the truncatedItem id', function () {
      req.form.values['item-one'] = 'foofoofoofoofoofoofoofoofoomaxfoo';
      var locals = controller.locals(req);

      locals.truncatedItem.id.should.equal('item-one');
      locals.truncatedItem.pretty.should.equal('item one');
    });
    it('includes the original length of the truncatedItem value', function () {
      req.form.values['item-one'] = 'foofoofoofoofoofoofoofoofoomaxfoo';
      var locals = controller.locals(req);

      locals.truncatedItem.length.should.equal(33);
    });
    it('includes the original value of the truncatedItem', function () {
      req.form.values['item-one'] = 'foofoofoofoofoofoofoofoofoomaxfoo';
      var locals = controller.locals(req);

      locals.truncatedItem.value.should.equal('foofoofoofoofoofoofoofoofoomaxfoo');
    });
    it('includes the truncated value of the truncatedItem', function () {
      req.form.values['item-one'] = 'foofoofoofoofoofoofoofoofoomaxfoo';
      var locals = controller.locals(req);

      locals.truncatedItem.slice.should.equal('foofoofoofoofoofoofoofoofoomax');
    });
  });
});
