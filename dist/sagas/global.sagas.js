"use strict";

var _regeneratorRuntime2 = require("@babel/runtime/regenerator");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processActions = processActions;
exports.sagaProcessActionsStart = sagaProcessActionsStart;
exports.sagaProcessAfterSend = sagaProcessAfterSend;
exports.sagaSendToProcess = sagaSendToProcess;
exports.sagaSendToSagaProcessTakeEveryStart = sagaSendToSagaProcessTakeEveryStart;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _global = _interopRequireDefault(require("./global.types"));

var _effects = require("redux-saga/effects");

var _axios = _interopRequireDefault(require("axios"));

var _lodash = _interopRequireDefault(require("lodash.omit"));

var _lodash2 = _interopRequireDefault(require("lodash.get"));

var _utils = require("../utils/utils");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _marked = /*#__PURE__*/_regeneratorRuntime2.mark(sagaSendToProcess),
    _marked2 = /*#__PURE__*/_regeneratorRuntime2.mark(sagaProcessAfterSend),
    _marked3 = /*#__PURE__*/_regeneratorRuntime2.mark(processActions),
    _marked4 = /*#__PURE__*/_regeneratorRuntime2.mark(sagaSendToSagaProcessTakeEveryStart),
    _marked5 = /*#__PURE__*/_regeneratorRuntime2.mark(sagaProcessActionsStart);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function sagaSendToProcess(action) {
  var url, method, payload, _action$actions, actions, _action$actionsBefore, actionsBefore, _action$options, options, _action$out_state, out_state, _options$withToken, withToken, _options$contentType, contentType, _options$config, config, headers, token, formData, _i, _Object$entries, _Object$entries$_i, key, value, withError, res;

  return _regenerator["default"].wrap(function sagaSendToProcess$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = action.url, method = action.method, payload = action.payload, _action$actions = action.actions, actions = _action$actions === void 0 ? [] : _action$actions, _action$actionsBefore = action.actionsBefore, actionsBefore = _action$actionsBefore === void 0 ? [] : _action$actionsBefore, _action$options = action.options, options = _action$options === void 0 ? {} : _action$options, _action$out_state = action.out_state, out_state = _action$out_state === void 0 ? {} : _action$out_state;
          _options$withToken = options.withToken, withToken = _options$withToken === void 0 ? true : _options$withToken, _options$contentType = options.contentType, contentType = _options$contentType === void 0 ? "application/json" : _options$contentType, _options$config = options.config, config = _options$config === void 0 ? {} : _options$config;
          headers = {};

          if (withToken) {
            token = (0, _utils.getUserToken)();
            headers.Authorization = "JWT ".concat(token);
          }

          if (contentType === "multipart/form-data") {
            formData = new FormData();

            for (_i = 0, _Object$entries = Object.entries(payload); _i < _Object$entries.length; _i++) {
              _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
              formData.append(key, value);
            }

            payload = formData;
          } // if (withCache) {
          //   const items = yield select((state) => get(state, `${cacheKey}`));
          //   if (!isObjEmptyOrNull(items)) return;
          // }


          _context.next = 7;
          return (0, _effects.call)(processActions, {
            actions: actionsBefore
          });

        case 7:
          withError = _context.sent;

          if (!withError) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return");

        case 10:
          res = {};
          _context.prev = 11;
          method = method.toUpperCase();

          if (!(method === "GET")) {
            _context.next = 19;
            break;
          }

          _context.next = 16;
          return (0, _effects.call)(_axios["default"].get, url, _objectSpread(_objectSpread({}, config), {}, {
            headers: headers
          }));

        case 16:
          res = _context.sent;
          _context.next = 41;
          break;

        case 19:
          if (!(method === "POST")) {
            _context.next = 25;
            break;
          }

          _context.next = 22;
          return (0, _effects.call)(_axios["default"].post, url, payload, _objectSpread(_objectSpread({}, config), {}, {
            headers: headers
          }));

        case 22:
          res = _context.sent;
          _context.next = 41;
          break;

        case 25:
          if (!(method === "PUT")) {
            _context.next = 31;
            break;
          }

          _context.next = 28;
          return (0, _effects.call)(_axios["default"].put, url, payload, _objectSpread(_objectSpread({}, config), {}, {
            headers: headers
          }));

        case 28:
          res = _context.sent;
          _context.next = 41;
          break;

        case 31:
          if (!(method === "PATCH")) {
            _context.next = 37;
            break;
          }

          _context.next = 34;
          return (0, _effects.call)(_axios["default"].patch, url, payload, _objectSpread(_objectSpread({}, config), {}, {
            headers: headers
          }));

        case 34:
          res = _context.sent;
          _context.next = 41;
          break;

        case 37:
          if (!(method === "DELETE")) {
            _context.next = 41;
            break;
          }

          _context.next = 40;
          return (0, _effects.call)(_axios["default"]["delete"], url, _objectSpread(_objectSpread({}, config), {}, {
            headers: headers
          }));

        case 40:
          res = _context.sent;

        case 41:
          _context.next = 43;
          return (0, _effects.call)(sagaProcessAfterSend, {
            actions: actions,
            options: {
              data: res,
              more_data: {
                isSuccess: true,
                out_state: out_state
              }
            }
          });

        case 43:
          _context.next = 56;
          break;

        case 45:
          _context.prev = 45;
          _context.t0 = _context["catch"](11);
          console.log("err in send ".concat(method), _context.t0);
          _context.prev = 48;
          _context.next = 51;
          return (0, _effects.call)(sagaProcessAfterSend, {
            actions: actions,
            options: {
              data: _context.t0,
              more_data: {
                isSuccess: false,
                out_state: out_state
              }
            }
          });

        case 51:
          _context.next = 56;
          break;

        case 53:
          _context.prev = 53;
          _context.t1 = _context["catch"](48);
          console.log("err in sagaProcessAfterSend", _context.t1);

        case 56:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[11, 45], [48, 53]]);
}

function sagaProcessAfterSend(action) {
  var actions, _action$options2, options, data, more_data, actionsAfterSuccess, actionsAfterFail;

  return _regenerator["default"].wrap(function sagaProcessAfterSend$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          actions = action.actions, _action$options2 = action.options, options = _action$options2 === void 0 ? {} : _action$options2;
          data = options.data, more_data = options.more_data;
          actionsAfterSuccess = actions.filter(function (action) {
            return action.on.toUpperCase() === "SUCCESS" || action.on.toUpperCase() === "ANY";
          });
          actionsAfterFail = actions.filter(function (action) {
            return action.on === "FAIL" || action.on.toUpperCase() === "ANY";
          });

          if (!(more_data.isSuccess === true)) {
            _context2.next = 9;
            break;
          }

          _context2.next = 7;
          return (0, _effects.call)(processActions, {
            actions: actionsAfterSuccess,
            options: {
              data: data,
              more_data: more_data
            }
          });

        case 7:
          _context2.next = 11;
          break;

        case 9:
          _context2.next = 11;
          return (0, _effects.call)(processActions, {
            actions: actionsAfterFail,
            options: {
              data: data,
              more_data: more_data
            }
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

function processActions(action) {
  var _action$actions2, actions, _action$options3, options, _options$data, data, _options$more_data, more_data, result_data, code, _iterator, _step, actionInList, func, res, withError;

  return _regenerator["default"].wrap(function processActions$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log("action11", action);
          _action$actions2 = action.actions, actions = _action$actions2 === void 0 ? [] : _action$actions2, _action$options3 = action.options, options = _action$options3 === void 0 ? {} : _action$options3;
          _options$data = options.data, data = _options$data === void 0 ? {} : _options$data, _options$more_data = options.more_data, more_data = _options$more_data === void 0 ? {} : _options$more_data;
          result_data = {};
          _context3.prev = 4;

          if (!(more_data.isSuccess === false)) {
            _context3.next = 21;
            break;
          }

          data = (0, _lodash2["default"])(data, "response");
          _context3.prev = 7;
          code = (0, _lodash2["default"])(data, "data.code");
          _context3.t0 = code;
          _context3.next = _context3.t0 === "user_not_found" ? 12 : _context3.t0 === "token_not_valid" ? 14 : 16;
          break;

        case 12:
          (0, _utils.removeUserToken)();
          return _context3.abrupt("break", 17);

        case 14:
          (0, _utils.removeUserToken)();
          return _context3.abrupt("break", 17);

        case 16:
          return _context3.abrupt("break", 17);

        case 17:
          _context3.next = 21;
          break;

        case 19:
          _context3.prev = 19;
          _context3.t1 = _context3["catch"](7);

        case 21:
          console.log("actions22", actions);
          _iterator = _createForOfIteratorHelper(actions);
          _context3.prev = 23;

          _iterator.s();

        case 25:
          if ((_step = _iterator.n()).done) {
            _context3.next = 41;
            break;
          }

          actionInList = _step.value;
          func = actionInList.func;
          console.log("func22", func);
          console.log("actionInList22", actionInList);
          console.log("data22", data);

          if (actionInList.payload || actionInList.payload === "") {
            if (actionInList.payload === "") {
              result_data = data;
            } else {
              result_data = (0, _lodash2["default"])(data, actionInList.payload);
            }
          }

          console.log("result_data22", result_data);
          _context3.next = 35;
          return func(result_data, more_data.out_state);

        case 35:
          res = _context3.sent;
          withError = (0, _lodash2["default"])(res, "withError");

          if (!withError) {
            _context3.next = 39;
            break;
          }

          return _context3.abrupt("return", withError);

        case 39:
          _context3.next = 25;
          break;

        case 41:
          _context3.next = 46;
          break;

        case 43:
          _context3.prev = 43;
          _context3.t2 = _context3["catch"](23);

          _iterator.e(_context3.t2);

        case 46:
          _context3.prev = 46;

          _iterator.f();

          return _context3.finish(46);

        case 49:
          _context3.next = 54;
          break;

        case 51:
          _context3.prev = 51;
          _context3.t3 = _context3["catch"](4);
          console.log("err in processActions", _context3.t3);

        case 54:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, null, [[4, 51], [7, 19], [23, 43, 46, 49]]);
}

function sagaSendToSagaProcessTakeEveryStart() {
  return _regenerator["default"].wrap(function sagaSendToSagaProcessTakeEveryStart$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.takeEvery)(_global["default"].SAGA_SEND_TO_SAGA_PROCESS_TAKE_EVERY, sagaSendToProcess);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}

function sagaProcessActionsStart() {
  return _regenerator["default"].wrap(function sagaProcessActionsStart$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _effects.takeEvery)(_global["default"].PROCESS_ACTIONS, processActions);

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5);
}