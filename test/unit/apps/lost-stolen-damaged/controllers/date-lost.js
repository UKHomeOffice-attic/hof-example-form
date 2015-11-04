'use strict';

var DateController = sinon.stub();
var DateLostController = require('proxyquire')('../../../../../apps/lost-stolen-damaged/controllers/date-lost', {
  '../../../lib/date-controller': DateController
});

describe('apps/lost-stolen-damaged/controllers/date-lost', function () {

  describe('instantiated', function () {

    var controller;
    var args = {template: 'index'};

    beforeEach(function () {
      controller = new DateLostController(args);
    });

    it('calls DateController with the arguments', function () {
      DateController.should.have.been.calledWith(args);
    });

    it('has date-lost dateKey', function () {
      controller.should.have.property('dateKey').and.equal('date-lost');
    });
  });

});
