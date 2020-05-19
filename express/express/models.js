const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/express-auth',{
  useCreateIndex:true,
  useNewUrlParser:true
})

const User=mongoose.model('User', new mongoose.Schema({
  username:{type:String, unique:true},
  password:{type:String,
   set(val){
     return require('bcrypt').hashSync(val, 10)
   }
  }
}))

module.exports={User}