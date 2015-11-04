'use strict';

var _ = require('underscore');

module.exports = _.extend(
  require('./contact-details'),
  require('./personal-details'),
  require('./organisation-details')
);

