const mongoose = require("mongoose");
const Schema=mongoose.Schema
const schema = new Schema({
  address: { type: String },
  no:{type:String},
  owner:{type:mongoose.SchemaTypes.ObjectId, ref:'User'},
  type:{type:Number},
  longitude:{type:Number},
  latitude:{type:Number},
  countMethod:{type:Number},
  pattern:{type:Number},
  status:{type:Number}
});

module.exports = mongoose.model("Space", schema, "spaces");