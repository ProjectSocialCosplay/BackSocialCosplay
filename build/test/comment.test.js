"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comment = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require('./context'),
    IntegTestDataUserOne = _require.IntegTestDataUserOne;

var comment = function comment(request) {
  it('Create comment not authenticated', /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(done) {
      var query;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              query = " mutation{\n                          createComment(comment:\"1 comment\" postId:\"".concat(IntegTestDataUserOne.postId, "\")\n                          {\n                            comment\n                          }\n                        }");
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.errors[0].message).toBe('You are not authenticated');
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
  it('Creat Comment', /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(done) {
      var query;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              query = " mutation{\n                          createComment(comment:\"1 comment\" postId:\"".concat(IntegTestDataUserOne.postId, "\")\n                          {\n                            _id  \n                            comment\n                            post{\n                              _id content\n                            } \n                            author{\n                              _id\n                              pseudo\n                            }\n                          }\n                        }");
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').set('token', IntegTestDataUserOne.token).send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.data.createComment.comment).toBe("1 comment");
                IntegTestDataUserOne.commentId = res.data.createComment._id;
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
  it('Create more 255 caracter', /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(done) {
      var query;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              query = " mutation{\n                          createComment(comment:\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac\n                                              est egestas, posuere urna eu, blandit sapien. Sed vitae nisi finibus, fermentum dui vel, \n                                              fermentum risus. Maecenas ornare, odio ut commodo bibendum, nulla quam semper eros, at \n                                              pretium qui\" postId:\"".concat(IntegTestDataUserOne.postId, "\")\n                          {\n                            _id\n                            comment\n                            post{\n                              _id content\n                            }\n                            author{\n                              _id\n                              pseudo\n                            }\n                          }\n                        }");
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').set('token', IntegTestDataUserOne.token).send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.errors[0].message).toBe("Comment validation failed: comment: Comment is too long");
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
  it('Empty comment', /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(done) {
      var query;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              query = " mutation{\n                          createComment(comment:\"\" postId:\"".concat(IntegTestDataUserOne.postId, "\")\n                          {\n                            _id\n                            comment\n                            post{\n                              _id content\n                            }\n                            author{\n                              _id\n                              pseudo\n                            }\n                          }\n                        }");
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').set('token', IntegTestDataUserOne.token).send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.errors[0].message).toBe("Comment validation failed: comment: Path `comment` is required.");
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
  it('Empty comment with space charter', /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(done) {
      var query;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              query = " mutation{\n                          createComment(comment:\"\" postId:\"".concat(IntegTestDataUserOne.postId, "\")\n                          {\n                            _id\n                            comment\n                            post{\n                              _id content\n                            }\n                            author{\n                              _id\n                              pseudo\n                            }\n                          }\n                        }");
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').set('token', IntegTestDataUserOne.token).send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.errors[0].message).toBe("Comment validation failed: comment: Path `comment` is required.");
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
  it('get Comment', /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(done) {
      var query;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              query = " query{\n                          getComment(id:\"".concat(IntegTestDataUserOne.commentId, "\")\n                          {\n                            _id  \n                            comment\n                            post {\n                              _id content\n                            } \n                            author{\n                              _id\n                              pseudo\n                            }\n                          }\n                        }");
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').set('token', IntegTestDataUserOne.token).send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.data.getComment[0].comment).toBe('1 comment');
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
};

exports.comment = comment;
//# sourceMappingURL=comment.test.js.map