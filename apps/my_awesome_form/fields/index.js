'use strict';

var _ = require('underscore');

module.exports = _.extend(
  require('./first-page'),
  require('./second-page'),
  require('./third-page'),
  require('./fourth-page'),
  require('./fifth-page'),
  require('./sixth-page'),
  require('./seventh-page')
);
