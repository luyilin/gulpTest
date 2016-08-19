var koa = require('koa');
var server = require('./server/server');
var router = require('./router/router');
var requestHandle = require('./requestHandle/requestHandle');

var handle = {};

server.start(router.route, handle);
