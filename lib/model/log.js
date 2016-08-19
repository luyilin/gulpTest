var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Log = new Schema(
    {
        _id: { type: Schema.ObjectId },
        category: { type: String },
        data: { type: Object },
        level: { type: Object },
        timestamp: { type: Date }
    },
    {
        collection: 'log'
    }
);

module.exports = Log;
