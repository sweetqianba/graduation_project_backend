let mongoose = require('../../utils/db');
// passportLocalMongoose = require('passport-local-mongoose');
let Schema = mongoose.Schema;
let RecipeSchema = new Schema({
    page_pic: { type: String, required: true },
    name: { type: String, required: true },
    foods: { type: Array, require: true },
    step: { type: Array, require: true },
    mark: { type: String },
    comment: { type: Array }
});
let RecipeSchema = mongoose.model('Recipes', RecipeSchema);
RecipeSchema.ensureIndexes(function(err) {
    if (err) {
        console.log(err)
    }
});
module.exports = RecipeSchema;