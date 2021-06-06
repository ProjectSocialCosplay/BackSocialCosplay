"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.like = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require('./context'),
    IntegTestDataUserOne = _require.IntegTestDataUserOne;

var like = function like(request) {
  it('like not authenticated', /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(done) {
      var query;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              query = " mutation{\n                          createLike(postId:\"".concat(IntegTestDataUserOne.postId, "\")\n                          {    \n                              _id\n                          }\n                        }");
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
  it('deleteLike not authenticated', /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(done) {
      var query;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              query = " mutation{\n                          deleteLike(postId:\"".concat(IntegTestDataUserOne.postId, "\")\n                          {    \n                              _id\n                          }\n                        }");
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
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  it('Like post', /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(done) {
      var query;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              query = " mutation{\n                          createLike(postId:\"".concat(IntegTestDataUserOne.postId, "\")\n                          {    \n                              _id\n                              author{\n                                  _id\n                                 email\n                                 likes{\n                                    _id\n                                 }\n                              }\n                              post{\n                                likes{\n                                    _id\n                                }\n                              }\n                          }\n                        }");
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').set('token', IntegTestDataUserOne.token).send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.data.createLike._id).toBe(res.data.createLike.author.likes[0]._id);
                expect(res.data.createLike.author._id).toBe(IntegTestDataUserOne._id);
                expect(res.data.createLike._id).toBe(res.data.createLike.post.likes[0]._id);
                IntegTestDataUserOne.likeId = res.data.createLike._id;
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
  it('deleteLike', /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(done) {
      var query;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              query = "mutation{ deleteLike(postId:\"".concat(IntegTestDataUserOne.postId, "\"){\n                        author{\n                          _id\n                        email\n                        }\n                        post{_id}\n                      } }");
              request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').set('token', IntegTestDataUserOne.token).send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.data.deleteLike.author._id).toBe(IntegTestDataUserOne._id);
                expect(res.data.deleteLike.post._id).toBe(IntegTestDataUserOne.postId);
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
};

exports.like = like;
//# sourceMappingURL=like.test.js.map