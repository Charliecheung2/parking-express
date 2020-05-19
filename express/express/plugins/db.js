module.exports = app => {
  const mongoose = require("mongoose");
  mongoose.connect("mongodb://root:charlie@localhost:27017/graduate-design?authSource=graduate-design", {
    useCreateIndex: true,
    useNewUrlParser: true
  });
  const db=mongoose.connection
  db.on('error', console.error.bind(console, 'connection error'))
  db.once('open', ()=>{
    console.log('Mongodb connection succeed!');
  })
  require('require-all')(__dirname+'/../models')
};
