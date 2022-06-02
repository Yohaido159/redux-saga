"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapAction = exports.removeUserToken = exports.isObjEmptyOrNull = exports.getUserToken = void 0;

var getUserToken = function getUserToken() {
  var token = window.localStorage.getItem("token") || window.sessionStorage.getItem("token") || null;
  return token;
};

exports.getUserToken = getUserToken;

var removeUserToken = function removeUserToken() {
  window.localStorage.removeItem("token");
  window.sessionStorage.removeItem("token");
  window.localStorage.setItem("logout", Date.now().toString());
  window.localStorage.removeItem("logout");
};

exports.removeUserToken = removeUserToken;

var wrapAction = function wrapAction(options) {
  var _options$on = options.on,
      on = _options$on === void 0 ? "SUCCESS" : _options$on,
      _options$payload = options.payload,
      payload = _options$payload === void 0 ? "data" : _options$payload,
      _options$func = options.func,
      func = _options$func === void 0 ? function () {} : _options$func,
      _options$actions = options.actions,
      actions = _options$actions === void 0 ? [] : _options$actions;
  return {
    on: on,
    payload: payload,
    func: func,
    actions: actions
  };
};

exports.wrapAction = wrapAction;

var isObjEmptyOrNull = function isObjEmptyOrNull(obj) {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
};

exports.isObjEmptyOrNull = isObjEmptyOrNull;