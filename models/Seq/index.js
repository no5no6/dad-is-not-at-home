const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let seqSchema = {
  _id: String,
  seq: Number
}

seqSchema = new Schema(seqSchema, { versionKey: false });

seqSchema.statics.retrieveIdentity = function(type, cb) {
  this.findByIdAndUpdate(type, {$inc:{seq:1}}, {upsert: true}, (err, data) => {
    if(err) return cb(err);
    cb(null, data.seq);
  })
}

seqSchema.statics.retrieveBarcode = function(type, cb) {
  this.retrieveIdentity(type, (err, identity) => {
    if(err) return cb(err);
    cb(null, identity);
  });
}

module.exports = seqSchema;
