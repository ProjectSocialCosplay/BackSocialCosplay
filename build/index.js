"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = exports.appServ = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _jwt = _interopRequireDefault(require("./utils/jwt"));

var _tools = require("./utils/tools");

var _db = _interopRequireDefault(require("./config/db"));

var bodyParser = _interopRequireWildcard(require("body-parser"));

var _schemas = _interopRequireDefault(require("./schemas"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var _userModel = _interopRequireDefault(require("./models/userModel"));

var _postModel = _interopRequireDefault(require("./models/postModel"));

var _commentModel = _interopRequireDefault(require("./models/commentModel"));

var _likeModel = _interopRequireDefault(require("./models/likeModel"));

var _pictureModel = _interopRequireDefault(require("./models/pictureModel"));

var _followModel = _interopRequireDefault(require("./models/followModel"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_dotenv["default"].config({
  path: "./.env.".concat(process.env.NODE_ENV)
});

var app = (0, _express["default"])();
app.use(bodyParser.json({
  limit: '10mb',
  extended: true
}));
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true
}));
app.use((0, _cors["default"])({
  credentials: true,
  origin: process.env.NODE_ENV === "production" ? process.env.DOMAINE_NAME : "http://localhost:" + process.env.PORT
}));
var server = new _apolloServerExpress.ApolloServer({
  typeDefs: _schemas["default"],
  resolvers: _resolvers["default"],
  context: function () {
    var _context = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
      var req, userInfo;
      return _regenerator["default"].wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = _ref.req;

              if (!req) {
                _context2.next = 6;
                break;
              }

              _context2.next = 4;
              return _jwt["default"].checkUser(req);

            case 4:
              userInfo = _context2.sent;
              return _context2.abrupt("return", {
                userInfo: userInfo,
                models: {
                  userModel: _userModel["default"],
                  postModel: _postModel["default"],
                  likeModel: _likeModel["default"],
                  pictureModel: _pictureModel["default"],
                  commentModel: _commentModel["default"],
                  followModel: _followModel["default"]
                },
                req: req
              });

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee);
    }));

    function context(_x) {
      return _context.apply(this, arguments);
    }

    return context;
  }(),
  formatError: function formatError(err) {
    if (process.env.NODE_ENV !== 'test') {
      console.log((0, _tools.uuid)() + ": " + err.message);
    }

    return {
      // ErrorEventId: uuid(),
      message: err.message
    };
  }
});
exports.server = server;
server.applyMiddleware({
  app: app,
  path: '/graphql'
});

_db["default"].moogoseConnect();

var appServ = app.listen(process.env.PORT, function () {
  console.log("\uD83D\uDE80 App Launch Server listening on port ".concat(process.env.PORT));
});
exports.appServ = appServ;
//# sourceMappingURL=index.js.map