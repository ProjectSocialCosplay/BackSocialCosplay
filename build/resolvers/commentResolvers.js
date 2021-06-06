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
    getComment: function () {
      var _getComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, _ref, _ref2, info) {
        var id, commentModel, userInfo;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref.id;
                commentModel = _ref2.models.commentModel, userInfo = _ref2.userInfo;

                if (userInfo) {
                  _context.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You are not authenticated');

              case 4:
                _context.next = 6;
                return commentModel.find({
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

      function getComment(_x, _x2, _x3, _x4) {
        return _getComment.apply(this, arguments);
      }

      return getComment;
    }()
  },
  Mutation: {
    createComment: function () {
      var _createComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(root, _ref3, _ref4) {
        var comment, postId, _ref4$models, postModel, commentModel, userInfo, author, post, data;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                comment = _ref3.comment, postId = _ref3.postId;
                _ref4$models = _ref4.models, postModel = _ref4$models.postModel, commentModel = _ref4$models.commentModel, userInfo = _ref4.userInfo;

                if (userInfo) {
                  _context2.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You are not authenticated');

              case 4:
                author = userInfo._id;
                post = postId;
                data = new commentModel({
                  comment: comment,
                  post: post,
                  author: author
                });
                _context2.next = 9;
                return commentModel.create(data);

              case 9:
                _context2.next = 11;
                return postModel.findOneAndUpdate({
                  _id: postId
                }, {
                  $push: {
                    comments: data._id
                  }
                })["catch"](function (e) {
                  console.log(e);
                  throw new Error(e.message);
                });

              case 11:
                return _context2.abrupt("return", data);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function createComment(_x5, _x6, _x7) {
        return _createComment.apply(this, arguments);
      }

      return createComment;
    }(),
    deleteComment: function () {
      var _deleteComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(root, _ref5, _ref6) {
        var commentId, _ref6$models, postModel, commentModel, userInfo, comment, data;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                commentId = _ref5.commentId;
                _ref6$models = _ref6.models, postModel = _ref6$models.postModel, commentModel = _ref6$models.commentModel, userInfo = _ref6.userInfo;
                _context3.next = 4;
                return commentModel.findByIdAndRemove(commentId);

              case 4:
                comment = _context3.sent;
                _context3.next = 7;
                return postModel.findOneAndUpdate({
                  _id: comment.post
                }, {
                  $pull: {
                    comments: commentId
                  }
                });

              case 7:
                data = _context3.sent;
                return _context3.abrupt("return", {
                  message: 'Comment deleted.'
                });

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function deleteComment(_x8, _x9, _x10) {
        return _deleteComment.apply(this, arguments);
      }

      return deleteComment;
    }()
  },
  Comment: {
    author: function () {
      var _author = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(parent, arg, _ref7, info) {
        var userModel, userInfo;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                userModel = _ref7.models.userModel, userInfo = _ref7.userInfo;
                _context4.next = 3;
                return userModel.findOne({
                  _id: parent.author
                }).exec();

              case 3:
                return _context4.abrupt("return", _context4.sent);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function author(_x11, _x12, _x13, _x14) {
        return _author.apply(this, arguments);
      }

      return author;
    }(),
    post: function () {
      var _post = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(parent, arg, _ref8, info) {
        var postModel;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                postModel = _ref8.models.postModel;
                _context5.next = 3;
                return postModel.findOne({
                  _id: parent.post
                }).exec();

              case 3:
                return _context5.abrupt("return", _context5.sent);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function post(_x15, _x16, _x17, _x18) {
        return _post.apply(this, arguments);
      }

      return post;
    }()
  }
};
exports["default"] = _default;
//# sourceMappingURL=commentResolvers.js.map