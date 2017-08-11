const mongoose      = require('mongoose');
const async         = require('async');
const event_emitter = new (require('events').EventEmitter);
const fs            = require('fs');
const _             = require('lodash');

let models_cache = {};

module.exports = (host, callback) => {

  if (models = models_cache[host]) return callback(null, models);

  event_emitter.on(host, function(models) {
    console.log(host, 'event on');
    callback(null, models);
  });

  fs.readdir(__dirname, (err, files) => {

    mongoose.Promise = global.Promise;
    connection = mongoose.createConnection('mongodb://yy:123@localhost:27017/family');

    let models = files.reduce((models, file) => {
      if (!fs.statSync(__dirname + '/' + file).isDirectory()) {
        return models;
      }
      if (file === 'Shared') {
        return models;
      }
      if (/^\./.test(file)) {
        return models;
      }

      model = connection.model(file, require('./' + file + '/index.js'));
      models[file] = model
      return models
    }, {});

    tasks = (() => {
      let results = [];
      for (key in models) {
        model = models[key];
        if (model.cache) {
          results.push(model.cache.bind(model));
        }
      }
      return results;
    })();

    async.parallel(tasks, (error) => {
      if (error) return callback(error);
      event_emitter.emit(host, models_cache[host] = models);
    });
  });
};
