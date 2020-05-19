const mongoose = require("mongoose");
const Schema=mongoose.Schema
const schema = new Schema({
  userName:{type:String},
  password:{type:String},
  no:{type:Number}
});

module.exports = mongoose.model("Admin", schema, "admins");
