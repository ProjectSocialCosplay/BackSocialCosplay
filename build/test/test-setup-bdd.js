"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.promise = global.Promise;
var db;

var connectToDb = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return mongoose.connect(process.env.DB_URL, {
              useUnifiedTopology: true,
              useNewUrlParser: true,
              useCreateIndex: true
            })["catch"](function (err) {
              return console.log('MongoDB error when connecting:' + err);
            });

          case 2:
            db = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function connectToDb() {
    return _ref.apply(this, arguments);
  };
}();

var dropTestDb = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var collections, _i, _collections, collectionName, collection;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            collections = Object.keys(mongoose.connection.collections);
            _i = 0, _collections = collections;

          case 2:
            if (!(_i < _collections.length)) {
              _context2.next = 20;
              break;
            }

            collectionName = _collections[_i];
            collection = mongoose.connection.collections[collectionName];
            _context2.prev = 5;
            _context2.next = 8;
            return collection.drop();

          case 8:
            _context2.next = 17;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](5);

            if (!(_context2.t0.message === 'ns not found')) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return");

          case 14:
            if (!_context2.t0.message.includes('a background operation is currently running')) {
              _context2.next = 16;
              break;
            }

            return _context2.abrupt("return");

          case 16:
            console.log(_context2.t0.message);

          case 17:
            _i++;
            _context2.next = 2;
            break;

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 10]]);
  }));

  return function dropTestDb() {
    return _ref2.apply(this, arguments);
  };
}();

var removeAllCollections = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var collections, _i2, _collections2, collectionName, collection;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            collections = Object.keys(mongoose.connection.collections);
            _i2 = 0, _collections2 = collections;

          case 2:
            if (!(_i2 < _collections2.length)) {
              _context3.next = 10;
              break;
            }

            collectionName = _collections2[_i2];
            collection = mongoose.connection.collections[collectionName];
            _context3.next = 7;
            return collection.deleteMany();

          case 7:
            _i2++;
            _context3.next = 2;
            break;

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function removeAllCollections() {
    return _ref3.apply(this, arguments);
  };
}();

var closeDbConnection = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return mongoose.connection.close()["catch"](function (error) {
              return console.error(error);
            });

          case 2:
            _context4.next = 4;
            return db.close();

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function closeDbConnection() {
    return _ref4.apply(this, arguments);
  };
}();

module.exports = {
  connectToDb: connectToDb,
  closeDbConnection: closeDbConnection,
  dropTestDb: dropTestDb,
  removeAllCollections: removeAllCollections
};
//# sourceMappingURL=test-setup-bdd.js.map