module.exports=app=>{
  const fs=require('fs')
  const http=require('http')
  const ws=require('ws')
  const config={
    ssl:false,
    port:8082
  }

  const WebSocket=new ws.Server({port:3001})

  WebSocket.on('connection', (ws, req)=>{
    console.log('连接开始');

    WebSocket.on('error', error=>{
      console.log(error);
      
    })
    
    WebSocket.on('close', close=>{
      console.log("连接已关闭");
    })

    WebSocket.on('message', message=>{
      WebSocket.send('客户端发来了一条消息')
    })

    WebSocket.send('连接已开启')
    WebSocket.send(id+'已连接')
  })


}