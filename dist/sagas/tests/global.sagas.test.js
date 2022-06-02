"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("regenerator-runtime/runtime");

var _effects = require("redux-saga/effects");

var _axios = _interopRequireDefault(require("axios"));

var _utils = require("../../utils/utils");

var _global = require("../global.sagas");

var _global2 = _interopRequireDefault(require("../global.types"));

describe("testing the global.sagas models", function () {
  test("testing saga generator sagaSendToProcess", function () {
    var action = {
      url: "url",
      method: "get",
      payload: {},
      actions: [],
      actionsBefore: [],
      options: {},
      out_state: {}
    };
    var saga = (0, _global.sagaSendToProcess)(action);
    window.localStorage.setItem("token", "token");
    expect(saga.next(action).value).toEqual((0, _effects.call)(_global.processActions, {
      actions: action.actionsBefore
    }));
    expect(JSON.stringify(saga.next().value)).toEqual(JSON.stringify((0, _effects.call)(_axios["default"].request, action.url, {
      headers: {
        Authorization: "JWT token"
      }
    })));
    var res = {
      data: {
        data: {},
        more_data: {}
      },
      status: 200
    };
    expect(saga.next(res).value).toEqual((0, _effects.call)(_global.sagaProcessAfterSend, {
      actions: action.actions,
      options: {
        data: res,
        more_data: {
          isSuccess: true,
          out_state: action.out_state
        }
      }
    }));
  });
  test("testing saga generator sagaProcessAfterSend isSucess true", function () {
    var action = {
      actions: [(0, _utils.wrapAction)({
        on: "SUCCESS"
      }), (0, _utils.wrapAction)({
        on: "SUCCESS"
      }), (0, _utils.wrapAction)({
        on: "FAIL"
      })],
      options: {
        data: {},
        more_data: {
          isSuccess: true
        }
      }
    };
    var saga = (0, _global.sagaProcessAfterSend)(action);
    expect(JSON.stringify(saga.next(action).value)).toEqual(JSON.stringify((0, _effects.call)(_global.processActions, {
      actions: action.actions.slice(0, 2),
      options: {
        data: action.options.data,
        more_data: action.options.more_data
      }
    })));
  });
  test("testing saga generator sagaProcessAfterSend isSucess false", function () {
    var action = {
      actions: [(0, _utils.wrapAction)({
        on: "SUCCESS"
      }), (0, _utils.wrapAction)({
        on: "SUCCESS"
      }), (0, _utils.wrapAction)({
        on: "FAIL"
      })],
      options: {
        data: {},
        more_data: {
          isSuccess: false
        }
      }
    };
    var saga = (0, _global.sagaProcessAfterSend)(action);
    expect(JSON.stringify(saga.next(action).value)).toEqual(JSON.stringify((0, _effects.call)(_global.processActions, {
      actions: action.actions.slice(2),
      options: {
        data: action.options.data,
        more_data: action.options.more_data
      }
    })));
  });
});