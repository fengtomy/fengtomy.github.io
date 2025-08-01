# WebSocket入门
##### node+WebSocket制作一个简易的聊天室

摘抄自MDN，[深入了解](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
___
The WebSocket API is an advanced technology that makes it possible to open a two-way interactive communication session between the user's browser and a server. With this API, you can send messages to a server and receive event-driven responses without having to poll the server for a reply.
___
简短来说，WebSocket可以实现用户浏览器和服务器双向交互会话，使用API可以发送信息到服务器，并且不需要去轮询服务器，只需要订阅一个ws服务就可以获取实时的消息。话不多说，我们开始代码演示。

我们主要有`server.js`和`index.html`这两个文件，使用node+WebSocket来完成聊天室。`server.js`是负责http和ws服务，`index.js`负责页面的简单渲染和交互逻辑。

1. 首先我们初始化项目并安装依赖
```shell
mk websocketDemo
cd websocketDemo
touch server.js index.html
npm init -y
npm install nodemon
```
添加`"start": "nodemon server.js"`到package.json文件，这样我们就可以直接`npm run start`来运行服务了。   
![](https://i.postimg.cc/pTYkWwp3/image.png)

2. 创建http服务来渲染index页面
```javascript
const http = require("http");
const fs = require("fs");
const path = require("path");

const app = http.createServer(function(req, res) {
  // we don't care about the url, just a demo
  fs.readFile("./index.html", function(err, files) {
    if (!err) {
      res.setHeader("Content-Type", "text/html");
      res.end(files);
    }
  });
}).listen(3000);
```
这里请注意，实际项目不会这样来除处理路由和资源，这里是为了方便演示。现在我们来处理下`index.html`的内容。
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Websocket</title>
</head>
<body>
  <input id="name" />
  <textarea id="message" placeholder="Type your message here."></textarea>
  <button>Send</button>
  <div id="messages"></div>
</body>
</html>
```
我们试下`npm run start`，看到index页面并且运行正常。

3.创建WebSocket服务器

首次我们要创建一个成功的Websocket连接，我们往`server.js`添加以下内容。
```javascript
const http = require("http");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws"); // to add

// previous code
const socketServer = new WebSocket.Server({ port: 3030 });
socketServer.on('connection', socketClient => {
  console.log('connected');
  console.log('client length currently: ', socketServer.clients.size);  socketClient.on('close', () => {
    console.log('closed');
    console.log("Clients's number: ", socketServer.clients.size);
  });
});
```
以上代码在端口3030创建了一个WebSocket服务。当有新客户端连接后，connection事件会触发，我们在这里打印出当前客户端连接的数量。当客户端关闭连接时，close事件触发，我们打印出当前剩下的客户端的数量。

4.处理客户端的连接

WebSocket服务已经创建好了，我们接下来处理客户端的连接功能，代码直接放在`index.html`里。
```html
<script>
const ws = new WebSocket('ws://localhost:3030');
ws.onopen = () => { 
  console.log('Client is connected'); 
};
</script>
```
这样就在浏览器创建了一个对WebSocket服务的连接。值得注意的是，这里使用的`ws`协议。在这个连接中，我们给它分配了一个`onopen`的方法，当连接成功建立以后就会触发。  
客户端和服务创建并且成功建立连接，我们现在应该开始做一些互动的功能，比如互相发送和接受对方的消息。我们先从服务端开始。

5.服务端发送和接受消息
```javascript
// previous code

const messages = ["Begin!!!"];

socketServer.on("connection", socketClient => {
  console.log('connected');
  console.log('client length currently: ', socketServer.clients.size);
  socketClient.send(JSON.stringify(messages));

  socketClient.on("message", message => {
    messages.push(message);

    socketServer.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify([message]));
      }
    });
  });

  socketClient.on('close', () => {
    console.log('closed');
    console.log("Clients's number: ", socketServer.clients.size);
  });
});
```
这里主要需要处理的是`message`事件。每次服务器从客户端接收到新消息时，该方法就会触发。我们想要每一次从客户端发出的消息经服务发送到与服务连接的每个客户端，所以我们循环`socketServer.clients`来给每个客户端发送消息，同时也要确保连接是处于开放状态的(OPEN)。

6.客户端发送和接收消息
```javascript
  <button onclick="fire();">Send</button>
  <div id="messages"></div>
  <script>
    const ws = new WebSocket("ws://localhost:3030");
    ws.onopen = () => console.log("Now Connected");

    const getElement = id => document.getElementById(id);
    const addMessage = message => {
      const pTag = document.createElement("p");
      pTag.appendChild(document.createTextNode(message));
      getElement("messages").appendChild(pTag);
    };

    ws.onmessage = event => {
      const messages = JSON.parse(event.data);
      messages.forEach(addMessage);
    };

    const fire = () => {
      console.dir(getElement("message"));
      const username = getElement("name").value || "***";
      ws.send(`${username}: ${getElement("message").value}`);
      getElement("message").value = "";
    };
  </script>
```
`fire`方法处理客户端发送消息。每次客户端点击send按钮，就会往服务端发送本次输入的内容，然后重新把输入域置空，方便客户端下次继续输入内容。   
这里我们主要处理`onmessage`事件。每次客户端接收到新消息后，我们解析消息并且把每条消息创建为一个p标签，然后添加到`messages`的div里。这样我们就看到了来自其他客户端发送的实时的消息。

### 最后
[完整代码请点这里](https://github.com/fengtomy/WebSocketDemo)   
我们终于完成了一个简单的WebSocket聊天应用的搭建。注意，这是个演示项目，只是指南并熟悉基本的知识，并不是一个完整的生产项目。你对此感兴趣，请阅读更多的文档来了解它的实际应用。如果觉得对你有帮助，请点个赞，谢谢。
