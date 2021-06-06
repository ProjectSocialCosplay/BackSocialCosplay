"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var jwt = require('jsonwebtoken');

var _require = require("apollo-server-express"),
    AuthenticationError = _require.AuthenticationError;

module.exports.genarateToken = function (User) {
  var date = Date.now();
  return jwt.sign({
    _id: User,
    exp: date + 604800
  }, process.env.TOKEN_SECRET);
};

module.exports.checkUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req) {
    var token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.headers['token'];

            if (!token) {
              _context.next = 12;
              break;
            }

            _context.prev = 2;
            _context.next = 5;
            return jwt.verify(token, process.env.TOKEN_SECRET);

          case 5:
            return _context.abrupt("return", _context.sent);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);
            throw new AuthenticationError('Your session expired. Sign in again.');

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 8]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

function parseAuthToken(authorization) {
  return authorization != null ? authorization.replace('Bearer ', '') : null;
}
//# sourceMappingURL=jwt.js.map