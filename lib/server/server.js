var http = require('http');
var url = require('url');
var requestHandle = require('../requestHandle/requestHandle');

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        // console.log('Request for ' + patname + ' received');
        route(pathname, response, handle, request);
    }
    http.createServer(onRequest).listen(8888);
    console.log('server start');
};

exports.start = start;

