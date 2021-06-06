"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require('./context'),
    IntegTestDataUserOne = _require.IntegTestDataUserOne;

var post = function post(request) {
  it('Create Post not authenticated', /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(done) {
      var query;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              query = " mutation {\n             createPost(content: \"test\") {\n                        content\n                        author{\n                            email\n                        }\n             }}";
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
  it('Create Post', /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(done) {
      var query;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              query = " mutation {\n             createPost(content: \"test\") {\n                        _id\n                        content\n                        author{\n                            email\n                        }\n             }}";
              request.post('/graphql').set('Content-Type', 'application/json').set('token', IntegTestDataUserOne.token).set('Accept', '*/*').send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.data.createPost.content).toBe("test");
                IntegTestDataUserOne.postId = res.data.createPost._id;
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
  it('Create empty post', /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(done) {
      var query;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              query = " mutation {\n             createPost(content: \"\") {\n                        content\n                        author{\n                            email\n                        }\n             }}";
              request.post('/graphql').set('Content-Type', 'application/json').set('token', IntegTestDataUserOne.token).set('Accept', '*/*').send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.errors[0].message).toBe('Post validation failed: content: Path `content` is required.');
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
  it('Create space post', /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(done) {
      var query;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              query = " mutation {\n             createPost(content: \" \") {\n                        content\n                        author{\n                            email\n                        }\n             }}";
              request.post('/graphql').set('Content-Type', 'application/json').set('token', IntegTestDataUserOne.token).set('Accept', '*/*').send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.errors[0].message).toBe('Post validation failed: content: Path `content` is required.');
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
  it('Get post whith post ID', /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(done) {
      var query;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              query = "query {\n             getPost(id: \"".concat(IntegTestDataUserOne.postId, "\") {\n                        _id\n                        content\n                        author{\n                            email\n                        }\n             }}");
              request.post('/graphql').set('Content-Type', 'application/json').set('token', IntegTestDataUserOne.token).set('Accept', '*/*').send({
                query: query
              }).then(function (response) {
                var res = JSON.parse(response.text);
                expect(response.status).toBe(200);
                expect(res.data.getPostWithUserId[0].content).toBe('test'); //  expect(res.data.getPost[0].content).toBe('test');

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

exports.post = post;
//# sourceMappingURL=post.test.js.map