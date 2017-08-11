const _ = require("lodash");

app.post('/user/login', (req, res) => {
  var User = app.models.User;
  var loginUser = req.body;

  User.retrieveLoginUser(loginUser, (error, user) => {
    if(error) return res.json(500, error);
    // if(user) req.session.userName = user.userName;
    res.json(user);
  });
});
