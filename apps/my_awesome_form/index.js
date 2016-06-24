'use strict';

const path = require('path');
const _ = require('lodash');
const hof = require('hof');
const router = require('express').Router();
const wizard = hof.wizard;
const mixins = hof.mixins;
const i18nFuture = hof.i18n;
const deepTranslate = hof.middleware.deepTranslate;
const BaseController = hof.controllers.base;
const fields = _.cloneDeep(require('./fields'));
const steps = _.cloneDeep(require('./steps'));

const i18n = i18nFuture({
  path: path.resolve(__dirname, './translations/__lng__/__ns__.json')
});

router.use(deepTranslate({
  translate: i18n.translate.bind(i18n)
}));

router.use(mixins(fields));

router.use('/my-awesome-form/', wizard(steps, fields, {
  controller: BaseController,
  templatePath: path.resolve(__dirname, 'views'),
  params: '/:action?'
}));

module.exports = router;
