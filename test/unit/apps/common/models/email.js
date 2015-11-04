'use strict';

var proxyquire = require('proxyquire');
var emailService = {
  send: sinon.stub()
};

describe('apps/common/models/email', function () {

  describe('instantiated', function () {
    var hof = {
      Model: sinon.stub()
    };
    var EmailModel = proxyquire('../../../../../apps/common/models/email', {
      '../../../services/email': emailService,
      'hof': hof
    });

    it('calls hmpo-model Model with the arguments', function () {
      var emailData = {
        some: 'email data'
      };
      /*eslint no-unused-vars: 0*/
      var model = new EmailModel(emailData);
      /*eslint no-unused-vars: 1*/
      hof.Model.should.have.been.calledWith(emailData);
    });
  });

  describe('.save()', function () {

    var model;
    var callback;
    var EmailModel = proxyquire('../../../../../apps/common/models/email', {
      '../../../services/email': emailService
    });

    beforeEach(function () {
      callback = sinon.stub();

      model = new EmailModel({
        template: 'test_template',
        email: 'email@email.com',
        subject: 'email subject',
        steps: ['session', 'steps'],
        'csrf-secret': 'itsasecret',
        name: 'dave',
        other: 'data'
      });
      model.save(callback);
    });

    it('calls the send endpoint on the email service with the model data', function () {

      emailService.send.should.have.been.calledWith({
        template: 'test_template',
        to: 'email@email.com',
        subject: 'email subject',
        dataToSend: {
          email: 'email@email.com',
          name: 'dave',
          other: 'data',
          subject: 'email subject'
        }
      }, callback);
    });

  });

});
