"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * generate filename
 * */
function uuidFilenameTransform() {
  return "".concat(Date.now() + (Math.random() * 100000).toFixed());
}

var S3Uploader = /*#__PURE__*/function () {
  function S3Uploader(s3, config, bucket) {
    (0, _classCallCheck2["default"])(this, S3Uploader);
    var _config$uploadParams = config.uploadParams,
        uploadParams = _config$uploadParams === void 0 ? {} : _config$uploadParams,
        _config$concurrencyOp = config.concurrencyOptions,
        concurrencyOptions = _config$concurrencyOp === void 0 ? {} : _config$concurrencyOp;
    this._bucket = bucket;
    this._s3 = s3;
    this._filenameTransform = uuidFilenameTransform();
    this._uploadParams = uploadParams;
    this._concurrencyOptions = concurrencyOptions;
  }
  /**
   * @param {string} base64 image
   * @params {string} basekey AWS folder
   * */


  (0, _createClass2["default"])(S3Uploader, [{
    key: "upload",
    value: function () {
      var _upload = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(file, baseKey) {
        var buffer, params, data, res;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                buffer = new Buffer(file, 'base64');
                params = {
                  Bucket: this._bucket,
                  Key: "".concat(baseKey, "/").concat(this._filenameTransform),
                  Body: buffer,
                  ContentType: 'image/jpeg'
                };
                _context.prev = 2;
                _context.next = 5;
                return this._s3.upload(params).promise();

              case 5:
                data = _context.sent;
                res = data.key.replace(baseKey + '/', "");
                console.log(data);
                return _context.abrupt("return", {
                  key: res
                });

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](2);
                console.log(_context.t0);
                return _context.abrupt("return", _context.t0);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 11]]);
      }));

      function upload(_x, _x2) {
        return _upload.apply(this, arguments);
      }

      return upload;
    }()
    /**
     * @param {string} base64 image
     * @params {string} basekey AWS folder
     * */

  }, {
    key: "deleteObject",
    value: function () {
      var _deleteObject = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(fileName, baseKey) {
        var params, data;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = {
                  Bucket: this._bucket,
                  Key: "".concat(baseKey, "/").concat(fileName)
                };
                _context2.prev = 1;
                data = this._s3.deleteObject(params);
                console.log(data);
                return _context2.abrupt("return", data);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](1);
                console.log(_context2.t0);
                return _context2.abrupt("return", _context2.t0);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 7]]);
      }));

      function deleteObject(_x3, _x4) {
        return _deleteObject.apply(this, arguments);
      }

      return deleteObject;
    }()
  }]);
  return S3Uploader;
}();

module.exports = {
  S3Uploader: S3Uploader
};
//# sourceMappingURL=s3Uploaders.js.map