const _ = require("lodash");

app.post('/user', (req, res) => {
  var User = app.models.User;
  var data = req.body;
  //data = {name: 'admin', password: '123', organization: 'test'};

  User.retrieveByName(data.name, (error, checkResult) => {
    if(error) return res.json(500, error);
    if(_.size(checkResult)) return res.json(400, {type: 0, message: '添加用户已存在'});

    var user = new User(data);

    user.save((error, model) => {
      if(error){
        res.json(500, error);
      }else{
        res.json(200);
      }
    });
  });
});
