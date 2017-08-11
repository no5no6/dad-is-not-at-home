/**
 * 主服务
 */
// var session = require("express-session");
// var RedisStore = require('connect-redis')(session);
const express = require('express');
const http    = require('http');
const path    = require('path');
const models  = require('./models');
const event   = require('./models/Shared/event.js');

const app     = express();
// express对象赋给全局
global.app    = app;

// express设置
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// var options = {
//   host: "127.0.0.1",
//   port: "6379",
//   ttl: 60 * 60 * 24 * 30, //Session的有效期为30天
// };
// 此时req对象还没有session这个属性
// app.use(session({
//   store: new RedisStore(options),
//   secret: 'express is powerful',
//   resave: true,
//   saveUninitialized: true
// }));

app.use((req,res,next) => {
  if (!req.session.userName) {
    res.redirect('/web/question')
    next();
  }else {
    next();
  }
});

// 解决跨域
const origin = [/\/user/, /\/user\/*/];

app.all('*', (req, res, next) => {

  let istrue = origin.some((url) => {
    return url.test(req.path);
  });

  if(istrue){
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS,PATCH');
    res.header('X-Powered-By',' 3.2.1')
    res.header('Content-Type', 'application/json;charset=utf-8');
    if (req.method === 'OPTIONS') {
      return res.send(200);
    }
  }
  next();
});

// 根据请求域名得到Mongoose模型。
models('localhost', (err, models) => {
  if(err) return res.send(400,err.stack);
  app.models = models;
  app.event = event
});

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// 引入api
require('./routes/user/addUser');
require('./routes/user/login');

// 首页
app.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
