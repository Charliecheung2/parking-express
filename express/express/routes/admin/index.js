module.exports = (app) => {
  const express = require("express");
  const jwt = require("jsonwebtoken");
  const User = require("../../models/User");
  const Space = require("../../models/Space");
  const Sensor = require("../../models/Sensor");
  const List = require("../../models/List");
  // const assert = require('http-assert')
  const router = express.Router({
    mergeParams: true,
  });
  //用户的接口
  router.get(`/users`, async (req, res) => {
    const users = await User.find({},{password:0});
    res.send(users);
    // res.send({ success: true });
    // const user=new User({username:2222})
    // user.save()
  });
  router.post(`/sensorUpdate`, async (req, res, next) => {
    let changes=req.body
    let result=await Sensor.findOneAndUpdate({_id:changes.id},{status:changes.status})
    res.send({
      code:"0000",
      result
    })
  });
  //车位的接口
  router.post(`/addSpace`, async (req, res, next) => {
    console.log(req.body);

    let space = req.body;
    await Space.create(space, (err) => {
      if (err) {
        next(err);
      } else {
        res.status(200).send("新增成功");
      }
    });
  });
  router.put(`/spaces/:id`, async(req, res)=>{
    await Space.findByIdAndUpdate(req.params.id, req.body)
    res.send('更新成功')
  })
  router.get(`/spaces`, async(req, res, next)=>{
    let spaces=await Space.find()
    res.send({
      code:'0000',
      msg:'查询成功',
      spaces
    })
  })
  router.delete(`/spaces/:id`, async(req, res)=>{
    await Space.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success:true
    })
  })
  //消息队列接口
  router.get('/messageList/:id', async(req, res)=>{
    let result=await List.findOne({owner:req.params.id})
    res.send({
      code:'0000',
      msg:'查询成功',
      result
    })
  })
  // router.get('/test', async (req, res) => {
  //     // const model = await req.Model.create(req.body)
  //     res.send('测试成功')
  // })
  // router.put('/:id', async (req, res) => {
  //     const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
  //     res.send(model)
  // })
  // router.delete('/:id', async (req, res) => {
  //     await req.Model.findByIdAndDelete(req.params.id, req.body)
  //     res.send({
  //         success: true
  //     })
  // })
  // router.get('/', async (req, res) => {
  //     const queryOptions = {}
  //     if (req.Model.modelName == 'Category') {
  //         queryOptions.populate = 'parent'
  //     }
  //     const items = await req.Model.find().setOptions(queryOptions).limit(100)
  //     res.send(items)
  // })
  // router.get('/:id', async (req, res) => {
  //     const model = await req.Model.findById(req.params.id)
  //     res.send(model)
  // })
  // //登录校验中间键
  // const authMiddleware =require('../../middleware/auth')

  // const resourceMiddleware =require('../../middleware/resource')
  // app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router
  // )
  // const multer = require('multer')
  // const upload = multer({dest: __dirname + '../../../uploads'})

  // app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
  //     const file = req.file
  //     //接受的字段名是file，所以要改成file
  //     file.url = `http://localhost:3000/uploads/${file.filename}`
  //     res.send(file)
  // })

  app.post('/admin/api/login', async (req, res) => {
      const {username, password} = req.body
      const user = await AdminUser.findOne({username}).select('+password')
      assert(user, 422, '用户不存在')
      const isValid = require('bcrypt').compareSync(password, user.password)
      assert(isValid, 422, '密码错误')
      const jwt = require('jsonwebtoken')
      const token = jwt.sign({
          id: user._id
      }, app.get('secret'))
      res.send({token})
  })
  // //错误处理函数
  // app.use(async (err, req, res, next) => {
  //     res.status(err.statusCode || 500).send({
  //         message: err.message
  //     })
  // })
  app.use(function (err, req, res, next) {
    let result = {
      code: err.code,
      msg: err.errmsg,
    };
    res.status(500).send(result);
  });
  app.use('/admin/api', router)
};