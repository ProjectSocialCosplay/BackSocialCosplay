"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerExpress = require("apollo-server-express");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jwt = _interopRequireDefault(require("../utils/jwt"));

var _default = {
  Query: {
    user: function () {
      var _user = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, _ref, _ref2, info) {
        var id, userModel, userInfo;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref.id;
                userModel = _ref2.models.userModel, userInfo = _ref2.userInfo;

                if (userInfo) {
                  _context.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You are not authenticated');

              case 4:
                _context.next = 6;
                return userModel.findById({
                  _id: id
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

      function user(_x, _x2, _x3, _x4) {
        return _user.apply(this, arguments);
      }

      return user;
    }(),
    getAuthUser: function () {
      var _getAuthUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, _ref3, _ref4, info) {
        var id, userModel, userInfo;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = _ref3.id;
                userModel = _ref4.models.userModel, userInfo = _ref4.userInfo;

                if (userInfo) {
                  _context2.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You are not authenticated');

              case 4:
                _context2.next = 6;
                return userModel.findById({
                  _id: userInfo._id
                }).exec();

              case 6:
                return _context2.abrupt("return", _context2.sent);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAuthUser(_x5, _x6, _x7, _x8) {
        return _getAuthUser.apply(this, arguments);
      }

      return getAuthUser;
    }(),
    login: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(parent, _ref5, _ref6, info) {
        var email, password, userModel, user, matchPasswords, token;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                email = _ref5.email, password = _ref5.password;
                userModel = _ref6.models.userModel;
                _context3.next = 4;
                return userModel.findOne({
                  email: email
                }).exec();

              case 4:
                user = _context3.sent;

                if (user) {
                  _context3.next = 7;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('Invalid credentials');

              case 7:
                matchPasswords = _bcrypt["default"].compareSync(password, user.password);

                if (matchPasswords) {
                  _context3.next = 10;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('Invalid credentials');

              case 10:
                /*
                if(!user._isAccountVerified){
                    throw new AuthenticationError('Account not confirmed');
                }*/
                token = _jwt["default"].genarateToken(user._id);
                return _context3.abrupt("return", {
                  token: token
                });

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function login(_x9, _x10, _x11, _x12) {
        return _login.apply(this, arguments);
      }

      return login;
    }(),
    searchUsers: function () {
      var _searchUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(parent, _ref7, _ref8) {
        var searchQuery, userModel, userInfo;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                searchQuery = _ref7.searchQuery;
                userModel = _ref8.models.userModel, userInfo = _ref8.userInfo;

                if (userInfo) {
                  _context4.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You are not authenticated');

              case 4:
                if (searchQuery) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return", []);

              case 6:
                return _context4.abrupt("return", userModel.find({
                  $or: [{
                    pseudo: new RegExp(searchQuery, 'i')
                  }],
                  _id: {
                    $ne: userInfo._id
                  }
                }).limit(50));

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function searchUsers(_x13, _x14, _x15) {
        return _searchUsers.apply(this, arguments);
      }

      return searchUsers;
    }()
  },
  Mutation: {
    createUser: function () {
      var _createUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(parent, _ref9, _ref10, info) {
        var pseudo, email, password, birthdate, userModel;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                pseudo = _ref9.pseudo, email = _ref9.email, password = _ref9.password, birthdate = _ref9.birthdate;
                userModel = _ref10.models.userModel;
                _context5.next = 4;
                return userModel.create({
                  pseudo: pseudo,
                  email: email,
                  password: password,
                  birthdate: birthdate
                });

              case 4:
                return _context5.abrupt("return", _context5.sent);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function createUser(_x16, _x17, _x18, _x19) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }(),
    updateUser: function () {
      var _updateUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(parent, _ref11, _ref12, info) {
        var pseudo, email, birthdate, userModel, userInfo, testUpdate;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                pseudo = _ref11.pseudo, email = _ref11.email, birthdate = _ref11.birthdate;
                userModel = _ref12.models.userModel, userInfo = _ref12.userInfo;

                if (userInfo) {
                  _context6.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You are not authenticated');

              case 4:
                _context6.next = 6;
                return userModel.findOneAndUpdate({
                  _id: userInfo._id
                }, {
                  pseudo: pseudo,
                  email: email,
                  birthdate: birthdate
                }, function (err, result) {
                  if (err) {
                    throw new Error("User not updated");
                  } else {
                    return result;
                  }
                });

              case 6:
                testUpdate = _context6.sent;
                return _context6.abrupt("return", testUpdate);

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function updateUser(_x20, _x21, _x22, _x23) {
        return _updateUser.apply(this, arguments);
      }

      return updateUser;
    }()
  },
  User: {
    posts: function () {
      var _posts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(_ref13, args, _ref14, info) {
        var id, postModel;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                id = _ref13.id;
                postModel = _ref14.models.postModel;
                _context7.next = 4;
                return postModel.find({
                  author: id
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

      function posts(_x24, _x25, _x26, _x27) {
        return _posts.apply(this, arguments);
      }

      return posts;
    }(),
    comment: function () {
      var _comment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(_ref15, args, _ref16, info) {
        var id, commentModel;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                id = _ref15.id;
                commentModel = _ref16.models.commentModel;
                _context8.next = 4;
                return commentModel.find({
                  author: id
                }).exec();

              case 4:
                return _context8.abrupt("return", _context8.sent);

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function comment(_x28, _x29, _x30, _x31) {
        return _comment.apply(this, arguments);
      }

      return comment;
    }(),
    profile_image: function () {
      var _profile_image = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(user, args, _ref17, info) {
        var pictureModel, data;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                pictureModel = _ref17.models.pictureModel;
                _context9.next = 3;
                return pictureModel.findOne({
                  author: user._id,
                  _id: user.profile_image_url
                }).exec();

              case 3:
                data = _context9.sent;

                if (!data) {
                  _context9.next = 7;
                  break;
                }

                data.url = 'https://' + process.env.BUCKETNAME + '.s3.eu-central-1.amazonaws.com/users/avatars/' + data.key;
                return _context9.abrupt("return", data);

              case 7:
                return _context9.abrupt("return", null);

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function profile_image(_x32, _x33, _x34, _x35) {
        return _profile_image.apply(this, arguments);
      }

      return profile_image;
    }(),
    followers: function () {
      var _followers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(user, args, _ref18, info) {
        var followModel;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                followModel = _ref18.models.followModel;
                _context10.next = 3;
                return followModel.find({
                  follower: user._id
                }).exec();

              case 3:
                return _context10.abrupt("return", _context10.sent);

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function followers(_x36, _x37, _x38, _x39) {
        return _followers.apply(this, arguments);
      }

      return followers;
    }(),
    following: function () {
      var _following = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(user, args, _ref19, info) {
        var followModel;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                followModel = _ref19.models.followModel;
                _context11.next = 3;
                return followModel.find({
                  _id: user.following
                }).exec();

              case 3:
                return _context11.abrupt("return", _context11.sent);

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function following(_x40, _x41, _x42, _x43) {
        return _following.apply(this, arguments);
      }

      return following;
    }(),
    feed: function () {
      var _feed = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(user, args, _ref20, info) {
        var _ref20$models, followModel, postModel, userInfo, data, res;

        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _ref20$models = _ref20.models, followModel = _ref20$models.followModel, postModel = _ref20$models.postModel, userInfo = _ref20.userInfo;
                _context12.next = 3;
                return followModel.find({
                  _id: user.following
                }).exec();

              case 3:
                data = _context12.sent;
                _context12.next = 6;
                return postModel.find({
                  author: userInfo._id
                }).sort({
                  createdAt: -1
                });

              case 6:
                res = _context12.sent;

                if (!(data.length > 0)) {
                  _context12.next = 13;
                  break;
                }

                _context12.t0 = res;
                _context12.next = 11;
                return postModel.find({
                  author: {
                    $in: data[0].follower
                  }
                }).sort({
                  createdAt: -1
                });

              case 11:
                _context12.t1 = _context12.sent;
                res = _context12.t0.concat.call(_context12.t0, _context12.t1);

              case 13:
                return _context12.abrupt("return", res.sort(function (a, b) {
                  return a.createdAt > b.createdAt ? -1 : 1;
                }));

              case 14:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function feed(_x44, _x45, _x46, _x47) {
        return _feed.apply(this, arguments);
      }

      return feed;
    }()
  }
};
exports["default"] = _default;
//# sourceMappingURL=userResolvers.js.map