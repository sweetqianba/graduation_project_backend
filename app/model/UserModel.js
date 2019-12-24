let mongoose = require('../../utils/db');
// passportLocalMongoose = require('passport-local-mongoose');
let Schema = mongoose.Schema;
let UserSchema = new Schema({
    phone: { type: String, required: true },
    pwd: { type: String, required: true },
    username: { type: String },
    join_time: { type: Date, require: true, default: Date.now },
    person_profile: { type: String },
    sex: { type: Boolean },
    birthday: { type: Date },
    occupation: { type: String },
    birth_area: { type: String },
    ofen_area: { type: String },
    browsing_history: { type: Array },
    collections: { type: Array },
    follows: { type: Array },
    fans: { type: Array },
    friends: { type: Array },
    recipes: { type: Array },
    works: { type: Array }
});
let UserModel = mongoose.model('Users', UserSchema);
UserModel.ensureIndexes(function(err) {
    if (err) {
        console.log(err)
    }
});
module.exports = UserModel;