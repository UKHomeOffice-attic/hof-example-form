'use strict';

var ArrangeController = require('../../../../../apps/someone-else/controllers/arrange');
var DateController = require('../../../../../lib/date-controller');

describe('apps/someone-else/controllers/arrange', function () {

  var controller;
  var key = '';
  var req;

  describe('process', function () {

    beforeEach(function () {
      req = {
        form: {
          values: {
            'arrange-collection-radio': ''
          }
        }
      };
      controller = new ArrangeController({template: 'index'});
      DateController.prototype.process = sinon.stub();
    });

    describe('someone-else selected', function () {
      beforeEach(function () {
        req.form.values['arrange-collection-radio'] = 'someone-else';
        controller.process(req);
      });

      it('sets the correct date-key', function () {
        controller.dateKey.should.equal('someone-else-date');
      });

      it('sets the correct options.next', function () {
        controller.options.next.should.equal('/reason');
      });

      it('adds a nominating flag to the session', function () {
        req.form.values.nominating.should.equal('Nominate');
      });
    });

    describe('change-person selected', function () {
      beforeEach(function () {
        req.form.values['arrange-collection-radio'] = 'change-person';
        controller.process(req);
      });

      it('sets the correct date-key', function () {
        controller.dateKey.should.equal('change-person-date');
      });

      it('sets the correct options.next', function () {
        controller.options.next.should.equal('/personal-details-no-reason');
      });

      it('adds a no-reason flag to the session', function () {
        req.form.values['no-reason'].should.equal(true);
      });

      it('adds a nominating flag to the session', function () {
        req.form.values.nominating.should.equal('Change');
      });
    });


    describe('cancel-request selected', function () {
      beforeEach(function () {
        req.form.values['arrange-collection-radio'] = 'cancel-request';
        controller.process(req);
      });

      it('sets the correct options.next', function () {
        controller.options.next.should.equal('/personal-details-no-reason');
      });

      it('doesnt use a dateKey', function () {
        should.equal(controller.dateKey, '');
      });

      it('adds a no-reason flag to the session', function () {
        req.form.values['no-reason'].should.equal(true);
      });

      it('adds a nominating flag to the session', function () {
        req.form.values.nominating.should.equal('Cancel');
      });
    });

    it('calls date controller', function () {
      controller.process(req);

      DateController.prototype.process.should.have.been.called;
    });

  });

  describe('validateField', function () {
    beforeEach(function () {
      controller = new ArrangeController({template: 'index'});
      controller.dateKey = undefined;
      DateController.prototype.validateField = sinon.stub();
    });

    it('sets required to true if the key is part of someone-else', function () {
      controller.dateKey = 'someone-else-date';
      key = 'someone-else';
      controller.validateField(key, req);

      DateController.prototype.validateField.should.have.been.calledWith(key, req, true);
    });

    it('sets required to true if the key is part of change-person', function () {
      controller.dateKey = 'change-person-date';
      key = 'change-person';
      controller.validateField(key, req);

      DateController.prototype.validateField.should.have.been.calledWith(key, req, true);
    });

    it('set required to false if the key is not part of the dateKey', function () {
      controller.dateKey = 'someone-else-date';
      key = 'change-person';
      controller.validateField(key, req);

      DateController.prototype.validateField.should.have.been.calledWith(key, req, false);
    });
  });

});
