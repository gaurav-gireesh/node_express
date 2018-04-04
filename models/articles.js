const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema  = new Schema({
    name:{type:String,required:true},
    author:{type:String,required:true},
    body:{type:String,requird:true}

});
let Article = mongoose.model('Article',ArticleSchema,'articles');

module.exports = Article;
