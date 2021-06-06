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
  Mutation: {
    createLike: function () {
      var _createLike = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, _ref, _ref2, info) {
        var postId, _ref2$models, likeModel, postModel, userModel, userInfo, like;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                postId = _ref.postId;
                _ref2$models = _ref2.models, likeModel = _ref2$models.likeModel, postModel = _ref2$models.postModel, userModel = _ref2$models.userModel, userInfo = _ref2.userInfo;

                if (userInfo) {
                  _context.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You are not authenticated');

              case 4:
                _context.next = 6;
                return new likeModel({
                  author: userInfo._id,
                  post: postId
                }).save();

              case 6:
                like = _context.sent;
                _context.next = 9;
                return postModel.findOneAndUpdate({
                  _id: postId
                }, {
                  $push: {
                    likes: like.id
                  }
                });

              case 9:
                _context.next = 11;
                return userModel.findOneAndUpdate({
                  _id: userInfo._id
                }, {
                  $push: {
                    likes: like.id
                  }
                });

              case 11:
                return _context.abrupt("return", like);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createLike(_x, _x2, _x3, _x4) {
        return _createLike.apply(this, arguments);
      }

      return createLike;
    }(),
    deleteLike: function () {
      var _deleteLike = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, _ref3, _ref4, info) {
        var postId, _ref4$models, likeModel, postModel, userModel, userInfo, beforeDeleteLike;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                postId = _ref3.postId;
                _ref4$models = _ref4.models, likeModel = _ref4$models.likeModel, postModel = _ref4$models.postModel, userModel = _ref4$models.userModel, userInfo = _ref4.userInfo;

                if (userInfo) {
                  _context2.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You are not authenticated');

              case 4:
                _context2.next = 6;
                return likeModel.findOneAndRemove({
                  author: userInfo._id,
                  post: postId
                });

              case 6:
                beforeDeleteLike = _context2.sent;

                if (!beforeDeleteLike) {
                  _context2.next = 15;
                  break;
                }

                _context2.next = 10;
                return userModel.findOneAndUpdate({
                  _id: beforeDeleteLike.author
                }, {
                  $pull: {
                    likes: beforeDeleteLike.id
                  }
                });

              case 10:
                _context2.next = 12;
                return postModel.findOneAndUpdate({
                  _id: beforeDeleteLike.post
                }, {
                  $pull: {
                    likes: beforeDeleteLike.id
                  }
                });

              case 12:
                return _context2.abrupt("return", beforeDeleteLike);

              case 15:
                throw new Error('internal server error');

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function deleteLike(_x5, _x6, _x7, _x8) {
        return _deleteLike.apply(this, arguments);
      }

      return deleteLike;
    }()
  },
  Like: {
    author: function () {
      var _author = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(parent, arg, _ref5, info) {
        var userModel, userInfo;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userModel = _ref5.models.userModel, userInfo = _ref5.userInfo;
                _context3.next = 3;
                return userModel.findOne({
                  _id: parent.author
                }).exec();

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function author(_x9, _x10, _x11, _x12) {
        return _author.apply(this, arguments);
      }

      return author;
    }(),
    post: function () {
      var _post = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(parent, arg, _ref6, info) {
        var postModel;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                postModel = _ref6.models.postModel;
                _context4.next = 3;
                return postModel.findOne({
                  _id: parent.post
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

      function post(_x13, _x14, _x15, _x16) {
        return _post.apply(this, arguments);
      }

      return post;
    }()
  }
};
exports["default"] = _default;
//# sourceMappingURL=likeResolvers.js.map