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
    /**
     * Creates a following/follower relationship between users
     *
     * @param {string} userId
     * @param {string} followerId
     */
    createFollow: function () {
      var _createFollow = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, _ref, _ref2, info) {
        var followerId, _ref2$models, followModel, userModel, userInfo, follow;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                followerId = _ref.followerId;
                _ref2$models = _ref2.models, followModel = _ref2$models.followModel, userModel = _ref2$models.userModel, userInfo = _ref2.userInfo;

                if (userInfo) {
                  _context.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You are not authenticated');

              case 4:
                _context.next = 6;
                return new followModel({
                  user: userInfo._id,
                  follower: followerId
                }).save();

              case 6:
                follow = _context.sent;
                _context.next = 9;
                return userModel.findOneAndUpdate({
                  _id: follow.user
                }, {
                  $push: {
                    following: follow.id
                  }
                });

              case 9:
                _context.next = 11;
                return userModel.findOneAndUpdate({
                  _id: followerId
                }, {
                  $push: {
                    followers: follow.id
                  }
                });

              case 11:
                return _context.abrupt("return", follow);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createFollow(_x, _x2, _x3, _x4) {
        return _createFollow.apply(this, arguments);
      }

      return createFollow;
    }(),

    /**
     * Deletes a following/follower relationship between users
     *
     * @param {string} id follow id
     */
    deleteFollow: function () {
      var _deleteFollow = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, _ref3, _ref4) {
        var id, _ref4$models, followModel, userModel, userInfo, follow;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = _ref3.id;
                _ref4$models = _ref4.models, followModel = _ref4$models.followModel, userModel = _ref4$models.userModel, userInfo = _ref4.userInfo;

                if (userInfo) {
                  _context2.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You are not authenticated');

              case 4:
                _context2.next = 6;
                return followModel.findByIdAndRemove(id);

              case 6:
                follow = _context2.sent;
                _context2.next = 9;
                return userModel.findOneAndUpdate({
                  _id: follow.user
                }, {
                  $pull: {
                    followers: follow.id
                  }
                });

              case 9:
                _context2.next = 11;
                return userModel.findOneAndUpdate({
                  _id: follow.follower
                }, {
                  $pull: {
                    following: follow.id
                  }
                });

              case 11:
                return _context2.abrupt("return", follow);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function deleteFollow(_x5, _x6, _x7) {
        return _deleteFollow.apply(this, arguments);
      }

      return deleteFollow;
    }()
  },
  Follow: {
    user: function () {
      var _user = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(following, args, _ref5, info) {
        var userModel, userInfo;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userModel = _ref5.models.userModel, userInfo = _ref5.userInfo;
                _context3.next = 3;
                return userModel.findOne({
                  _id: following.user
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

      function user(_x8, _x9, _x10, _x11) {
        return _user.apply(this, arguments);
      }

      return user;
    }(),
    follower: function () {
      var _follower2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_follower, args, _ref6, info) {
        var userModel;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                userModel = _ref6.models.userModel;
                _context4.next = 3;
                return userModel.findOne({
                  _id: _follower.follower
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

      function follower(_x12, _x13, _x14, _x15) {
        return _follower2.apply(this, arguments);
      }

      return follower;
    }()
  }
};
exports["default"] = _default;
//# sourceMappingURL=followResolvers.js.map