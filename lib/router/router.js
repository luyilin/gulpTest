var requestHandle = require('../requestHandle/requestHandle');
var fs = require('fs');
var ejs = require('ejs');
var md5 = require('md5');
var version = md5(new Date().getTime());
var etag = require('etag');
var mongo = require('../mongo/mongo');

function route(pathname, response, handle, request) {
    routeResource(pathname, handle, response);
    handle['/packageResource/api/printJson'] = mongo.printJson;

    if (typeof handle[pathname] === 'function') {
        handle[pathname](request, response);
        // console.log('Request handle '+ pathname + ' has called');
    } else {
        console.log('No request handle found for ' + pathname);
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('404 not found');
        response.end();
    }
}

// TODO: 已使用gulp,应直接扫dest目录下的已编译好的文件,且可优化

function routeResource(pathname, handle, response) {
    var fileName = pathname.replace(/\/packageResource\//,'');
    var dir = __dirname + '/../../dest/';
    var resource = fs.readdirSync(dir);
    resource.forEach(function (e) {
        var srcResource = fs.readdirSync(dir + e);
        srcResource.forEach(function (i) {
            if (fileName === i) {
                requestHandle[i] = function () {
                    var data = fs.readFileSync(dir + e + '/' + i, 'UTF-8');
                    if (i.indexOf('.css') != -1) {
                        response.writeHead(200, {'Content-Type': 'text/css; charset=UTF-8', 'Cache-Control': 'public,max-age=3600', 'Etag': etag(data)});
                    } else if (i.indexOf('.js') != -1) {
                        response.writeHead(200, {'Content-Type': 'application/javascript; charset=UTF-8', 'Cache-Control': 'public,max-age=3600', 'Etag': etag(data)});
                    } else if (i.indexOf('.html') != -1) {
                        response.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
                        var str = ejs.render(data, { version: version }, { filename: dir + '/tpl/search.html'});
                        data = str;
                    }
                    response.write(data);
                    response.end();
                };
            }
            handle['/packageResource/' + i] = requestHandle[i];
        });
    });
}

exports.route = route;
