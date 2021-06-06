"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.follow = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require('./context'),
    IntegTestDataUserOne = _require.IntegTestDataUserOne,
    IntegTestDataUserTwo = _require.IntegTestDataUserTwo;

var follow = function follow(request) {
  it('create user two', /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(done) {
      var query;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              query = " mutation {\n                 createUser( pseudo: \"user2\", password: \"user2\", email: \"user2@gmail.com\", birthdate: \"1930-11-12\" ) {\n                            pseudo\n                            email\n                            _id\n                            }}";
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.data.createUser.pseudo).toBe("user2");
                expect(res.data.createUser.email).toBe("user2@gmail.com");
                IntegTestDataUserTwo._id = res.data.createUser._id;
                done();
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  it('authentication user two', /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(done) {
      var query;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              query = " query {\n                            login( password: \"user2\", email: \"user2@gmail.com\") {\n                               token\n                            }}";
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').send({
                query: query
              }).then(function (query) {
                var res = JSON.parse(query.text); //expect(query.status).toBe(200) TODO: Voir pourquoi c'est une 400

                expect(res.data.token).not.toBeNull();
                IntegTestDataUserTwo.token = res.data.login.token;
                expect(IntegTestDataUserTwo.token).not.toBeNull();
                done();
              });

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  it('user on follow user2', /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(done) {
      var query;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              query = " mutation{\n                          createFollow(followerId:\"".concat(IntegTestDataUserTwo._id, "\")\n                          {\n                            _id\n                            user {\n                                 _id\n                                 pseudo\n                            }\n                            following {\n                                _id\n                                pseudo\n                            }\n                          }\n                        }");
              request.post('/graphql').set('Content-Type', 'application/json').set('token', IntegTestDataUserOne.token).set('Accept', '*/*').send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                console.log(res);
                expect(res.data.createFollow.user._id).toBe(IntegTestDataUserOne._id);
                expect(res.data.createFollow.following._id).toBe(IntegTestDataUserTwo._id); //  expect(res.errors[0].message).toBe('You are not authenticated');

                done();
              });

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());
  it('userTwo follow userOne', /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(done) {
      var query;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              query = " mutation{\n                          createFollow(followerId:\"".concat(IntegTestDataUserOne._id, "\")\n                          {\n                            _id\n                            user {\n                                 _id\n                                 pseudo\n                            }\n                            following {\n                                _id\n                                pseudo\n                            }\n                          }\n                        }");
              request.post('/graphql').set('Content-Type', 'application/json').set('token', IntegTestDataUserTwo.token).set('Accept', '*/*').send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.data.createFollow.user._id).toBe(IntegTestDataUserTwo._id);
                expect(res.data.createFollow.follower._id).toBe(IntegTestDataUserOne._id); //  expect(res.errors[0].message).toBe('You are not authenticated');

                done();
              });

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }());
  it('Get Follower from user', /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(done) {
      var query;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              query = " query{\n                          user(id:\"".concat(IntegTestDataUserOne._id, "\")\n                          {\n                            _id\n                            pseudo\n                            followers {\n                                _id\n                                user {\n                                    _id\n                                    pseudo\n                                }\n                                following{\n                                    _id\n                                    pseudo\n                                }\n                            }\n                            following{\n                                _id\n                                user {\n                                    _id\n                                    pseudo\n                                }\n                                following{\n                                    _id\n                                    pseudo\n                                }\n                            }\n                          }\n                        }");
              request.post('/graphql').set('Content-Type', 'application/json').set('token', IntegTestDataUserOne.token).set('Accept', '*/*').send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                console.log(res);
                expect(res.data.user.followers[0].user._id).toBe(IntegTestDataUserOne._id);
                expect(res.data.user.following[0].user._id).toBe(IntegTestDataUserTwo._id); //  expect(res.errors[0].message).toBe('You are not authenticated');

                done();
              });

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x5) {
      return _ref5.apply(this, arguments);
    };
  }());
};

exports.follow = follow;
//# sourceMappingURL=follow.test.js.map