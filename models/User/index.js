const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const event    = require('../Shared/event.js');

/***
 * 模型
 */
let userSchema = {
  uid: String,
  name: String,
  password: String,
  organization: String,
  operation: event
}

userSchema = new Schema(userSchema, {versionKey: false, id: false});

userSchema.set('validateBeforeSave', false);
userSchema.index({uid: 1});

/***
 * 中间件
 */
userSchema.pre('save', function(next, done){
  if(!this.uid){
    app.models.Seq.retrieveBarcode('User', (err, uid) => {
      this.uid = uid;
      this.save();
      done();
    });
  }
  next();
});

/***
 * 静态方法
 */
userSchema.statics.retrieve = function(callback, items){
  this.find()
  .select(items ? items.join(' ') : '')
  .exec((error, users) => {
    if(error) return callback(error);
    callback(null, users);
  });
}

userSchema.statics.retrieveById = function(uid, callback, items){
  this.findOne({uid: uid})
  .select(items ? items.join(' ') : '')
  .exec((error, user) => {
    if(error) return callback(error);
    callback(null, user);
  });
}
userSchema.statics.retrieveByObjectId = function(id, callback, items){
  this.findOne({_id: id})
  .select(items ? items.join(' ') : '')
  .exec((error, user) => {
    if(error) return callback(error);
    callback(null, user);
  });
}

userSchema.statics.retrieveByName = function(name, callback, items){
  this.findOne({name: name})
  .select(items ? items.join(' ') : '')
  .exec((error, user) => {
    if(error) return callback(error);
    callback(null, user);
  });
}

userSchema.statics.retrieveLoginUser = function(param, callback, items){
  this.findOne({name: param.userName, password: param.password})
  .select(items ? items.join(' ') : '')
  .exec((error, user) => {
    if(error) return callback(error);
    callback(null, user);
  });
}

userSchema.statics.retrieveByRole = function(role, callback, items){
  this.find({role: role})
  .select(items ? items.join(' ') : '')
  .exec((error, users) => {
    if(error) return callback(error);
    callback(null, users);
  });
}

userSchema.statics.removeUser = function(name, callback){
  this.remove({name: name})
  .exec((error, result) => {
    if(error) return callback(error);
    callback(null, result);
  });
}

module.exports = userSchema;
