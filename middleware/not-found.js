'use strict';

var path = require('path');
var hof = require('hof');
var i18n = hof.i18n({
  path: path.resolve(__dirname, '../apps/common/translations/__lng__/__ns__.json')
});
var logger = require('../lib/logger');

module.exports = function notFound() {
  return function notFoundHandler(req, res) {
    logger.warn('Cannot find:', req.url);

    res.status(404).render('404', {
      title: i18n.translate('errors.404.title'),
      description: i18n.translate('errors.404.description')
    });
  };
};
