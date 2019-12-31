let mongoose = require('../../utils/db');
// passportLocalMongoose = require('passport-local-mongoose');
let Schema = mongoose.Schema;
let WorkSchema = new Schema({
    page_pic: { type: String, required: true },
    name: { type: String, required: true },
    details: { type: String, require: true }
});
let WorkSchema = mongoose.model('Works', WorkSchema);
WorkSchema.ensureIndexes(function(err) {
    if (err) {
        console.log(err)
    }
});
module.exports = WorkSchema;