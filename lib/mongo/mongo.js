var coBody = require('co-body');
var mongoose = require('mongoose');
var model = require('../model');
var MongoLog = {};

MongoLog.printJson = function (request, response) {
    try {
        coBody(request).then(function (body) {
            var query = JSON.parse(body.query);

            return model.Log.find(query).limit(10).exec(function (err, logs) {
                if (err) {
                    console.error(err);
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.write(err.message);
                    response.end();
                    return;
                }
                response.writeHead(200, {'Content-type': 'application/json'});
                response.write(JSON.stringify(logs));
                response.end();
            });
        }).catch(function (err) {
            console.error(err);
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.write(err.message);
            response.end();
        });

    } catch (err) {
        console.error(err);
        response.writeHead(500, {'Content-Type': 'text/plain'});
        response.write(err.message);
        response.end();
    }
};

module.exports = MongoLog;
