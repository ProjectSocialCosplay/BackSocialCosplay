"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require('apollo-server-express'),
    gql = _require.gql;

var _require2 = require('../index'),
    appServ = _require2.appServ,
    server = _require2.server;

var supertest = require("supertest");

var _require3 = require("./test-setup-bdd"),
    connectToDb = _require3.connectToDb,
    closeDbConnection = _require3.closeDbConnection,
    removeAllCollections = _require3.removeAllCollections;

var request = supertest(appServ);

var _require4 = require('./auth.test'),
    userRegister = _require4.userRegister,
    userAuth = _require4.userAuth;

var _require5 = require('./post.test'),
    post = _require5.post;

var _require6 = require('./comment.test'),
    comment = _require6.comment;

var _require7 = require("./follow.test"),
    follow = _require7.follow;

var _require8 = require('./like.test'),
    like = _require8.like;

describe('Init Test', function () {
  // Connect to Mongoose
  beforeAll( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connectToDb();

          case 2:
            _context.next = 4;
            return removeAllCollections();

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }))); // Cleans up database between each test

  afterEach( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }))); // Disconnect Mongoose

  afterAll( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return closeDbConnection();

          case 2:
            appServ.close();

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  describe('User register', function () {
    userRegister(request);
  });
  describe('User Auth', function () {
    userAuth(request);
  });
  describe('Post', function () {
    post(request);
  });
  describe('Comment', function () {
    comment(request);
  });
  describe('Follow', function () {
    follow(request);
  });
  describe('Like', function () {
    like(request);
  });
});
//# sourceMappingURL=index.test.js.map