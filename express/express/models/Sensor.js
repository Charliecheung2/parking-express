const mongoose = require("mongoose");
const Schema=mongoose.Schema
const schema = new Schema({
  space:{type:mongoose.SchemaTypes.ObjectId, ref:'Space'},
  status:{type:Number},
  model:{type:String},
  enterTime:{type:Date},
  leftTime:{type:Date}
});

module.exports = mongoose.model("Sensor", schema, "sensors");
