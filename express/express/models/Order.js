const mongoose = require("mongoose");
const Schema=mongoose.Schema
const schema = new Schema({
  space:{type:mongoose.SchemaTypes.ObjectId, ref:'Space'},
  status:{type:Number,default:0},
  userId:{type:mongoose.SchemaTypes.ObjectId, ref:'User'},
  createAt:{type:Date, default:Date.now}
});

module.exports = mongoose.model("Order", schema, "orders");
