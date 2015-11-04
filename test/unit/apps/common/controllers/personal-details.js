'use strict';

var DateController = sinon.stub();
var proxyquire = require('proxyquire');
var PersonalDetailsController = proxyquire('../../../../../apps/common/controllers/personal-details', {
  '../../../lib/date-controller': DateController
});

describe('apps/common/controllers/personal-details', function () {

  var controller;
  var args = {template: 'index'};

  beforeEach(function () {
    controller = new PersonalDetailsController(args);
  });

  it('has a dateKey equal to date-of-birth', function () {
    controller.dateKey.should.equal('date-of-birth');
  });

  it('calls DateController with the arguments', function () {
    DateController.should.have.been.calledWith(args);
  });

});
