const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
  title: String,
  author: {type:mongoose.SchemaTypes.ObjectId, ref:'User'},
  body: String,
  comments: [{ body: String, date: Date, userName:String, avatar:String }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});

module.exports = mongoose.model("Article", schema, "articles");
