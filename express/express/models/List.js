const mongoose = require("mongoose");
const Schema=mongoose.Schema
const schema = new Schema({
  owner:{type:mongoose.SchemaTypes.ObjectId, ref:'Admin'},
  customer:[{
    name:{type:String},
    id:{type:String},
    lastMessage:{type:String}
  }],
  status:{type:Number}
});

module.exports = mongoose.model("List", schema, "lists");
