const express = require("express");
const fs = require("fs");
const url = require("url");
const path = require("path");
const compression = require("compression");
const WebSocket = require("ws");

//初始化和中间件
const app = new express();
app.use(express.json());
app.use(require("cors")());
app.use(compression({ filter: shouldCompress }));
function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    return false;
  }

  return compression.filter(req, res);
}
require("./plugins/db")(app);
require("./plugins/ws")(app);
require("./routes/weapp")(app);
require("./routes/admin")(app);
require("./plugins/performance")(app);
//静态目录托管
app.use("/static", express.static(__dirname + "/static/image"));

//根路由
app.get("/", async (req, res) => {
  res.send("helloWorld");
});

//ws服务端监听接口
const ws = new WebSocket.Server({ port: 8111 });

const CLIENTS = [];

ws.on("connection", (ws, req) => {
  const parameters = url.parse(req.url, true);
  CLIENTS.push({
    id: parameters.query.from,
    ws
  });
  console.log("new user joined "+parameters.query.from);
  ws.on("message", async (data) => {
    console.log(data);
    let result=data.split(':')
    if(result[0]==="sensor"){
      const Sensor = require("./models/Sensor");
      let sensor = await Sensor.findOne({ _id: result[1] });
      let { status } = sensor;
      ws.send(status);
    }else if(result[0]==='message'){
      CLIENTS.forEach(item=>{
        if(item.id===result[1]){
          item.ws.send(result[2])
        }
      })
    }
    
  });
});
//监听接口
app.listen(3002, () => {
  console.log("listening 3002");
});
