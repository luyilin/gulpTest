var mongoConn = require('../db/mongo');
var Log = require('./log');
var models = {};

models.Log = mongoConn.model('log', Log);

module.exports = models;
