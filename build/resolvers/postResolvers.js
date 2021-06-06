"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerExpress = require("apollo-server-express");

var _default = {
  Query: {
    getPost: function () {
      var _getPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, _ref, _ref2, info) {
        var id, postModel, userInfo;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref.id;
                postModel = _ref2.models.postModel, userInfo = _ref2.userInfo;

                if (userInfo) {
                  _context.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You are not authenticated');

              case 4:
                _context.next = 6;
                return postModel.find({
                  _id: id
                }).sort({
                  updatedAt: -1
                }).exec();

              case 6:
                return _context.abrupt("return", _context.sent);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getPost(_x, _x2, _x3, _x4) {
        return _getPost.apply(this, arguments);
      }

      return getPost;
    }(),
    getAllPost: function () {
      var _getAllPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, args, _ref3, info) {
        var postModel, userInfo;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                postModel = _ref3.models.postModel, userInfo = _ref3.userInfo;

                if (userInfo) {
                  _context2.next = 3;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You are not authenticated');

              case 3:
                _context2.next = 5;
                return postModel.find({
                  author: userInfo._id
                }).sort({
                  updatedAt: -1
                }).exec();

              case 5:
                return _context2.abrupt("return", _context2.sent);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAllPost(_x5, _x6, _x7, _x8) {
        return _getAllPost.apply(this, arguments);
      }

      return getAllPost;
    }()
  },
  Mutation: {
    createPost: function () {
      var _createPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(parent, _ref4, _ref5, info) {
        var content, _ref5$models, postModel, userModel, userInfo, newPost;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                content = _ref4.content;
                _ref5$models = _ref5.models, postModel = _ref5$models.postModel, userModel = _ref5$models.userModel, userInfo = _ref5.userInfo;

                if (userInfo) {
                  _context3.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You are not authenticated');

              case 4:
                _context3.next = 6;
                return new postModel({
                  content: content,
                  author: userInfo._id
                }).save();

              case 6:
                newPost = _context3.sent;
                _context3.next = 9;
                return postModel.create(newPost);

              case 9:
                _context3.next = 11;
                return userModel.findOneAndUpdate({
                  _id: userInfo._id
                }, {
                  $push: {
                    post: newPost._id
                  }
                })["catch"](function (e) {
                  throw new Error(e.message);
                });

              case 11:
                return _context3.abrupt("return", newPost);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createPost(_x9, _x10, _x11, _x12) {
        return _createPost.apply(this, arguments);
      }

      return createPost;
    }(),
    deletePost: function () {
      var _deletePost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(parent, _ref6, _ref7, info) {
        var id, postModel, userInfo;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = _ref6.id;
                postModel = _ref7.models.postModel, userInfo = _ref7.userInfo;

                if (userInfo) {
                  _context4.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You are not authenticated');

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function deletePost(_x13, _x14, _x15, _x16) {
        return _deletePost.apply(this, arguments);
      }

      return deletePost;
    }()
  },
  Post: {
    author: function () {
      var _author2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref8, args, _ref9, info) {
        var _author, userModel;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _author = _ref8.author;
                userModel = _ref9.models.userModel;
                _context5.next = 4;
                return userModel.findById({
                  _id: _author
                }).exec();

              case 4:
                return _context5.abrupt("return", _context5.sent);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function author(_x17, _x18, _x19, _x20) {
        return _author2.apply(this, arguments);
      }

      return author;
    }(),
    comment: function () {
      var _comment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_ref10, args, _ref11, info) {
        var id, commentModel;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                id = _ref10.id;
                commentModel = _ref11.models.commentModel;
                _context6.next = 4;
                return commentModel.find({
                  post: id
                }).sort({
                  updatedAt: -1
                }).exec();

              case 4:
                return _context6.abrupt("return", _context6.sent);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function comment(_x21, _x22, _x23, _x24) {
        return _comment.apply(this, arguments);
      }

      return comment;
    }(),
    likes: function () {
      var _likes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(_ref12, args, _ref13, info) {
        var id, likeModel;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                id = _ref12.id;
                likeModel = _ref13.models.likeModel;
                _context7.next = 4;
                return likeModel.find({
                  post: id
                }).sort({
                  updatedAt: -1
                }).exec();

              case 4:
                return _context7.abrupt("return", _context7.sent);

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function likes(_x25, _x26, _x27, _x28) {
        return _likes.apply(this, arguments);
      }

      return likes;
    }()
  }
};
exports["default"] = _default;
//# sourceMappingURL=postResolvers.js.map