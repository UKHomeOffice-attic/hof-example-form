'use strict';

var ReasonController = require('../../../../../apps/someone-else/controllers/reason');
var BaseController = require('../../../../../lib/base-controller');

describe('apps/someone-else/controllers/reason', function () {

  var controller;
  var req = {
    form: {
      values: {
        'someone-else-reason-radio': ''
      }
    }
  };

  describe('saveValues', function () {

    beforeEach(function () {
      controller = new ReasonController({template: 'index'});
      BaseController.prototype.saveValues = sinon.stub();
    });

    it('sets next to exit-not-eligible if reason is other', function () {
      req.form.values['someone-else-reason-radio'] = 'other';
      controller.saveValues(req);

      controller.options.next.should.equal('/exit-not-eligible');
    });

    it('sets next to undefined if reason is anything else', function () {
      req.form.values['someone-else-reason-radio'] = 'any-other-answer';
      controller.saveValues(req);

      should.equal(controller.options.next, undefined);
    });

    it('calls the base controller saveValues', function () {
      controller.saveValues(req);

      BaseController.prototype.saveValues.should.have.been.called;
    });

  });

});
