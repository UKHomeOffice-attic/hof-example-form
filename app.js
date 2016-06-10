'use strict';

var express = require('express');
var app = express();
var path = require('path');
var logger = require('./lib/logger');
var churchill = require('churchill');
var session = require('express-session');

var config = require('./config');
require('moment-business');

if (config.env !== 'ci') {
  app.use(churchill(logger));
}

if (config.env === 'development' || config.env === 'ci' || config.env === 'docker-compose') {
  app.use('/public', express.static(path.resolve(__dirname, './public')));
}

app.use(function setAssetPath(req, res, next) {
  res.locals.assetPath = '/public';
  next();
});

require('hof').template.setup(app);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './apps/common/views'));
app.enable('view cache');
app.use(require('express-partial-templates')(app));
app.engine('html', require('hogan-express-strict'));

app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('body-parser').json());

app.use(function setBaseUrl(req, res, next) {
  res.locals.baseUrl = req.baseUrl;
  next();
});

// Trust proxy for secure cookies
app.set('trust proxy', 1);

/*************************************/
/******* Redis session storage *******/
/*************************************/
var redis = require('redis');
var RedisStore = require('connect-redis-crypto')(session);
var client = redis.createClient(config.redis.port, config.redis.host);

client.on('connecting', function redisConnecting() {
  logger.info('Connecting to redis');
});

client.on('connect', function redisConnected() {
  logger.info('Connected to redis');
});

client.on('reconnecting', function redisReconnecting() {
  logger.info('Reconnecting to redis');
});

client.on('error', function clientErrorHandler(e) {
  logger.error(e);
});

var redisStore = new RedisStore({
  client: client,
  ttl: config.session.ttl,
  secret: config.session.secret
});

function secureCookies(req, res, next) {
  var cookie = res.cookie.bind(res);
  res.cookie = function cookieHandler(name, value, options) {
    options = options || {};
    options.secure = (req.protocol === 'https');
    options.httpOnly = true;
    options.path = '/';
    cookie(name, value, options);
  };
  next();
}

app.use(require('cookie-parser')(config.session.secret));
app.use(secureCookies);
app.use(session({
  store: redisStore,
  cookie: {
    secure: (config.env === 'development' || config.env === 'ci' || config.env === 'docker-compose') ? false : true
  },
  key: 'hof-example-form.sid',
  secret: config.session.secret,
  resave: true,
  saveUninitialized: true
}));

app.get('/cookies', function renderCookies(req, res) {
  res.render('cookies');
});

app.get('/terms-and-conditions', function renderTerms(req, res) {
  res.render('terms');
});

// use the hof middleware
app.use(require('hof').middleware.cookies());

// apps
app.use(require('./apps/my_awesome_form/'));

app.use(require('./middleware/not-found')());

// errors
app.use(require('hof').middleware.errors({
  logger: require('./lib/logger'),
  translate: require('hof').i18n.translate,
  debug: config.env === 'development'
}));

/*eslint camelcase: 0*/
app.listen(config.port, config.listen_host);
/*eslint camelcase: 1*/
logger.info('App listening on port', config.port);
