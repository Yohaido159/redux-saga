"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPassDataClear = exports.setPassData = exports.setAddToRedux = exports.sendToProcess = exports.processActions = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _global = _interopRequireDefault(require("./global.types"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var sendToProcess = function sendToProcess(action) {
  return _objectSpread({
    type: _global["default"].SAGA_SEND_TO_SAGA_PROCESS_TAKE_EVERY
  }, action);
};

exports.sendToProcess = sendToProcess;

var setPassData = function setPassData(payload) {
  return {
    type: _global["default"].PASS_DATA,
    payload: payload
  };
};

exports.setPassData = setPassData;

var setPassDataClear = function setPassDataClear(id) {
  return {
    type: _global["default"].PASS_DATA_CLEAR,
    id: id
  };
};

exports.setPassDataClear = setPassDataClear;

var setAddToRedux = function setAddToRedux(payload) {
  return {
    type: payload.type,
    payload: payload
  };
};

exports.setAddToRedux = setAddToRedux;

var processActions = function processActions(payload) {
  return _objectSpread({
    type: _global["default"].PROCESS_ACTIONS
  }, payload);
};

exports.processActions = processActions;