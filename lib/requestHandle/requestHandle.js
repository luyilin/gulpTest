var fs = require('fs');

function start(response) {
    defaultResponseHead(response);
    response.write('start');
    response.end();
}

function upload(response) {
    defaultResponseHead(response);
    response.write('upload');
    response.end();
}

function defineVersion(response) {
    defaultResponseHead(response);
    response.write('0.0.1');
    response.end();
}

function defaultResponseHead(response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
}

exports.defineVersion = defineVersion;
exports.start = start;
exports.upload = upload;
