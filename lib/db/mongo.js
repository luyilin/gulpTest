var mongoose = require('mongoose');

var conn = mongoose.connect('mongodb://127.0.0.1/my_logs'); // 连接本地mongodb

module.exports = conn;
