"use strict";

var mongoose = require('mongoose');

var moogoseConnect = function moogoseConnect() {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(function () {
    if (process.env.NODE_ENV !== 'test') {
      console.log('connected to db');
    }
  })["catch"](function (err) {
    return console.log('MongoDB error when connecting:' + err);
  });
};

exports.moogoseConnect = moogoseConnect;
//# sourceMappingURL=db.js.map