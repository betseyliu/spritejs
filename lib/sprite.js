'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _desc, _value, _class, _class2, _temp;

var _spriteCore = require('sprite-core');

var _spriteUtils = require('sprite-utils');

var _resource = require('./resource');

var _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _applyDecoratedDescriptor = require('babel-decorators-runtime');

var ResAttr = (_class = function (_Sprite$Attr) {
  (0, _inherits3.default)(ResAttr, _Sprite$Attr);

  function ResAttr() {
    (0, _classCallCheck3.default)(this, ResAttr);
    return (0, _possibleConstructorReturn3.default)(this, (ResAttr.__proto__ || (0, _getPrototypeOf2.default)(ResAttr)).apply(this, arguments));
  }

  (0, _createClass3.default)(ResAttr, [{
    key: 'loadTextures',
    value: function loadTextures(textures) {
      var _this2 = this;

      // adaptive textures
      var hasPromise = false;
      var tasks = textures.map(function (texture) {
        if (texture.image) {
          return _promise2.default.resolve({ img: texture.image, texture: texture });
        }

        var loadingTexture = _resource2.default.loadTexture(texture);
        if (loadingTexture instanceof _promise2.default) {
          hasPromise = true;
        }
        return loadingTexture;
      });

      if (hasPromise) {
        _promise2.default.all(tasks).then(function (textures) {
          var res = textures.map(function (_ref) {
            var img = _ref.img,
                texture = _ref.texture,
                fromCache = _ref.fromCache;

            if (!fromCache) {
              _this2.clearCache();
            }
            return (0, _assign2.default)({}, texture, { image: img });
          });
          (0, _get3.default)(ResAttr.prototype.__proto__ || (0, _getPrototypeOf2.default)(ResAttr.prototype), 'loadTextures', _this2).call(_this2, res);
        });
      } else {
        // if preload image, calculate the size of sprite synchronously
        var res = tasks.map(function (_ref2) {
          var img = _ref2.img,
              texture = _ref2.texture,
              fromCache = _ref2.fromCache;

          if (!fromCache) {
            _this2.clearCache();
          }
          return (0, _assign2.default)({}, texture, { image: img });
        });
        (0, _get3.default)(ResAttr.prototype.__proto__ || (0, _getPrototypeOf2.default)(ResAttr.prototype), 'loadTextures', this).call(this, res);
      }
    }
  }, {
    key: 'textures',
    set: function set(textures) {
      if (!Array.isArray(textures)) {
        textures = [textures];
      }

      textures = textures.map(function (texture) {
        if (typeof texture === 'string') {
          texture = { src: texture };
        } else if (!texture.src && !texture.id && !texture.image) {
          texture = { image: texture };
        }

        return texture;
      });

      this.set('textures', textures);
      this.loadTextures(textures);
    }
  }]);
  return ResAttr;
}(_spriteCore.Sprite.Attr), (_applyDecoratedDescriptor(_class.prototype, 'textures', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'textures'), _class.prototype)), _class);
var ResSprite = (_temp = _class2 = function (_Sprite) {
  (0, _inherits3.default)(ResSprite, _Sprite);

  function ResSprite() {
    (0, _classCallCheck3.default)(this, ResSprite);
    return (0, _possibleConstructorReturn3.default)(this, (ResSprite.__proto__ || (0, _getPrototypeOf2.default)(ResSprite)).apply(this, arguments));
  }

  return ResSprite;
}(_spriteCore.Sprite), _class2.Attr = ResAttr, _temp);
exports.default = ResSprite;