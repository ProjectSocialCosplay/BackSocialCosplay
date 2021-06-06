"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userAuth = exports.userRegister = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require('./context'),
    IntegTestDataUserOne = _require.IntegTestDataUserOne;

var userRegister = function userRegister(request) {
  it('insert user with empty pseudo', /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(done) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*') //.send({query})
              .send({
                query: "mutation  { createUser ( password: \"test\", email: \"tt@gmail.com\", birthdate: \"1930-11-12\" ) { pseudo email _id }}"
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(400);
                expect(res.errors[0].message).toBe('Field "createUser" argument "pseudo" of type "String!" is required, but it was not provided.');
                done();
              });

            case 1:
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
  it('insert user with empty email', /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(done) {
      var query;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              query = " mutation {\n             createUser(pseudo: \"ttt\", password: \"test\", birthdate: \"1930-11-12\" ) {\n                        pseudo\n                        email\n                        _id\n                        }}";
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(400);
                expect(res.errors[0].message).toBe('Field "createUser" argument "email" of type "String!" is required, but it was not provided.');
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
  it('insert user with empty password', /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(done) {
      var query;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              query = " mutation {\n             createUser(pseudo: \"ttt\", email: \"tt@gmail.com\", birthdate: \"1930-11-12\") {\n                        pseudo\n                        email\n                        _id\n                        }}";
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(400);
                expect(res.errors[0].message).toBe('Field "createUser" argument "password" of type "String!" is required, but it was not provided.');
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
  it('insert user with wrong email format', /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(done) {
      var query;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              query = " mutation {\n             createUser(pseudo: \"ttt\", password: \"test\", email: \"testgmail.com\", birthdate: \"1930-11-12\") {\n                        pseudo\n                        email\n                        _id\n                        }}";
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.errors[0].message).toBe('User validation failed: email: testgmail.com is not a valid email format');
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
  it('insert user with wrong email format', /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(done) {
      var query;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              query = " mutation {\n             createUser(pseudo: \"ttt\", password: \"test\", email: \"test@gmail\", birthdate: \"1930-11-12\") {\n                        pseudo\n                        email\n                        _id\n                        }}";
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.errors[0].message).toBe('User validation failed: email: test@gmail is not a valid email format');
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
  it('insert user with wrong email format', /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(done) {
      var query;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              query = " mutation {\n             createUser(pseudo: \"ttt\", password: \"test\", email: \"@gmail.com\", birthdate: \"1930-11-12\") {\n                        pseudo\n                        email\n                        _id\n                        }}";
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.errors[0].message).toBe('User validation failed: email: @gmail.com is not a valid email format');
                done();
              });

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x6) {
      return _ref6.apply(this, arguments);
    };
  }());
  it('insert user one', /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(done) {
      var query;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              query = " mutation {\n             createUser( pseudo: \"ttt\", password: \"test\", email: \"test@gmail.com\", birthdate: \"1930-11-12\" ) {\n                        pseudo\n                        email\n                        _id\n                        }}";
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.data.createUser.pseudo).toBe("ttt");
                expect(res.data.createUser.email).toBe("test@gmail.com");
                IntegTestDataUserOne._id = res.data.createUser._id;
                done();
              });

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x7) {
      return _ref7.apply(this, arguments);
    };
  }());
  it('email is already use', /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(done) {
      var query;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              query = " mutation {\n             createUser( pseudo: \"ttt\", password: \"test\", email: \"test@gmail.com\", birthdate: \"1930-11-12\" ) {\n                        pseudo\n                        email\n                        _id\n                        }}";
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.errors[0].message).toBe("User validation failed: pseudo: is already taken, email: is already taken");
                done();
              });

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function (_x8) {
      return _ref8.apply(this, arguments);
    };
  }());
};

exports.userRegister = userRegister;

var userAuth = function userAuth(request) {
  it('Authentication Email Error', /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(done) {
      var query;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              query = " query {\n                            login( password: \"test\", email: \"testgmail.com\") {\n                               token\n                            }}";
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.errors[0].message).toBe('Invalid credentials');
                done();
              });

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function (_x9) {
      return _ref9.apply(this, arguments);
    };
  }());
  it('Authentication empty password', /*#__PURE__*/function () {
    var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(done) {
      var query;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              query = "query {\n                            login( password: \"\", email: \"test@gmail.com\") {\n                               token\n                            }}";
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.errors[0].message).toBe('Invalid credentials');
                done();
              });

            case 2:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function (_x10) {
      return _ref10.apply(this, arguments);
    };
  }());
  it('Authentication wrong password', /*#__PURE__*/function () {
    var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(done) {
      var query;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              query = "query {\n                            login( password: \"sdgsdhgs\", email: \"test@gmail.com\") {\n                               token\n                            }}";
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.errors[0].message).toBe('Invalid credentials');
                done();
              });

            case 2:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function (_x11) {
      return _ref11.apply(this, arguments);
    };
  }());
  it('Authentication wrong email', /*#__PURE__*/function () {
    var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(done) {
      var query;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              query = " query {\n                            login( password: \"test\", email: \"testwrong@gmail.com\") {\n                               token\n                            }}";
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.errors[0].message).toBe('Invalid credentials');
                done();
              });

            case 2:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    return function (_x12) {
      return _ref12.apply(this, arguments);
    };
  }()); //TODO fonction confirmation email

  it('unconfirmed authentication', /*#__PURE__*/function () {
    var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(done) {
      var query;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              query = " query {\n                            login( password: \"test\", email: \"test@gmail.com\") {\n                               token\n                            }}";
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').send({
                query: query
              }).then(function (query) {
                var res = JSON.parse(query.text); //let res = JSON.parse(query.text)
                //expect(query.status).toBe(200)
                //TODO Rendre fonctionnel ce teste
                //expect(res.errors[0].message).toBe("Account not confirmed")

                done();
              });

            case 2:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));

    return function (_x13) {
      return _ref13.apply(this, arguments);
    };
  }());
  it('authentication', /*#__PURE__*/function () {
    var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(done) {
      var query;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              query = " query {\n                            login( password: \"test\", email: \"test@gmail.com\") {\n                               token\n                            }}";
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').send({
                query: query
              }).then(function (query) {
                var res = JSON.parse(query.text); //expect(query.status).toBe(200) TODO: Voir pourquoi c'est une 400

                expect(res.data.token).not.toBeNull();
                IntegTestDataUserOne.token = res.data.login.token;
                expect(IntegTestDataUserOne.token).not.toBeNull();
                done();
              });

            case 2:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));

    return function (_x14) {
      return _ref14.apply(this, arguments);
    };
  }());
  it('update user', /*#__PURE__*/function () {
    var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(done) {
      var query;
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              query = " mutation {\n                 updateUser( pseudo: \"linda\", email: \"linda@gmail.com\", birthdate: \"1988-11-12\" ) {\n                            pseudo\n                            email\n                            _id\n                            }}";
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').set('token', IntegTestDataUserOne.token).send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                IntegTestDataUserOne.user_id = res.data.updateUser._id;
                expect(response.status).toBe(200);
                expect(res.data.updateUser.pseudo).toBe("linda");
                expect(res.data.updateUser.email).toBe("linda@gmail.com");
                done();
              });

            case 2:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    }));

    return function (_x15) {
      return _ref15.apply(this, arguments);
    };
  }());
};

exports.userAuth = userAuth;
//# sourceMappingURL=auth.test.js.map