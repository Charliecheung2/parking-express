const mongoose = require("mongoose");
const Schema=mongoose.Schema
const schema = new Schema({
  username: { type: String, unique: true },
  password: {
    type: String,
    set(val) {
      return require("bcrypt").hashSync(val, 10);
    },
  },
  phone:{type:Number},
  area: { type: String },
  carNo: { type: String },
  userType: { type: Number },
  // carNo:{type:mongoose.SchemaTypes.ObjectId, ref: 'Car'},
  status: { type: Number },//0:空闲，1:行程中，2，取消订单
  carType:{type:Number},
  type:{type:Number},//0:管理员。1:普通用户，2:私人车位用户，3:企业车位用户
  space: [{type:mongoose.SchemaTypes.ObjectId, ref:'Space'}]
});

module.exports = mongoose.model("User", schema, "users");
