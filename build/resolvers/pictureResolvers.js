"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _AwsS = require("../utils/AwsS3.js");

var _apolloServerExpress = require("apollo-server-express");

var _default = {
  Mutation: {
    uploadProfileImage: function () {
      var _uploadProfileImage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, _ref, _ref2, info) {
        var base64str, _ref2$models, userModel, pictureModel, userInfo, alwreadyExist, _data, data, pictureRes, user;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                base64str = _ref.base64str;
                _ref2$models = _ref2.models, userModel = _ref2$models.userModel, pictureModel = _ref2$models.pictureModel, userInfo = _ref2.userInfo;

                if (userInfo) {
                  _context.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError('You are not authenticated');

              case 4:
                _context.next = 6;
                return pictureModel.find({
                  author: userInfo._id
                });

              case 6:
                alwreadyExist = _context.sent;

                if (!alwreadyExist) {
                  _context.next = 21;
                  break;
                }

                _context.next = 10;
                return _AwsS.uploader.deleteObject(alwreadyExist.key, 'users/avatars');

              case 10:
                _data = _context.sent;

                if (!_data) {
                  _context.next = 21;
                  break;
                }

                _context.prev = 12;
                _context.next = 15;
                return pictureModel.find({
                  author: userInfo._id
                }).deleteMany();

              case 15:
                _context.next = 21;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](12);
                console.log(_context.t0.message);
                throw new Error('Error Update Profile');

              case 21:
                _context.next = 23;
                return _AwsS.uploader.upload(base64str, 'users/avatars');

              case 23:
                data = _context.sent;

                if (!data) {
                  _context.next = 35;
                  break;
                }

                _context.next = 27;
                return pictureModel.create({
                  key: data.key,
                  author: userInfo._id
                });

              case 27:
                pictureRes = _context.sent;
                _context.next = 30;
                return userModel.updateOne({
                  _id: pictureRes.author
                }, {
                  profile_image_url: pictureRes._id
                })["catch"](function (e) {
                  throw new Error(e.message);
                });

              case 30:
                _context.next = 32;
                return userModel.findOne({
                  _id: userInfo._id
                }).exec();

              case 32:
                user = _context.sent;
                console.log(user);
                return _context.abrupt("return", {
                  'key': data.key
                });

              case 35:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[12, 17]]);
      }));

      function uploadProfileImage(_x, _x2, _x3, _x4) {
        return _uploadProfileImage.apply(this, arguments);
      }

      return uploadProfileImage;
    }()
  }
};
exports["default"] = _default;
//# sourceMappingURL=pictureResolvers.js.map