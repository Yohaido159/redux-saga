"use strict";

var _utils = require("../../utils/utils");

describe("shold test utils modules", function () {
  beforeEach(function () {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
  test("should test getUserToken", function () {
    expect((0, _utils.getUserToken)()).toBeNull();
    window.localStorage.setItem("token", "token");
    expect((0, _utils.getUserToken)()).toBe("token");
    window.sessionStorage.setItem("token", "token");
    expect((0, _utils.getUserToken)()).toBe("token");
    window.localStorage.removeItem("token");
    window.sessionStorage.removeItem("token");
    expect((0, _utils.getUserToken)()).toBeNull();
  });
  test("should test removeUserToken", function () {
    expect((0, _utils.getUserToken)()).toBeNull();
    window.localStorage.setItem("token", "token");
    expect((0, _utils.getUserToken)()).toBe("token");
    window.sessionStorage.setItem("token", "token");
    expect((0, _utils.getUserToken)()).toBe("token");
    (0, _utils.removeUserToken)();
    expect((0, _utils.getUserToken)()).toBeNull();
  });
  test("should test wrapAction", function () {
    var options = {
      on: "SUCCESS",
      payload: "data",
      func: function func() {},
      actions: []
    };
    var result = (0, _utils.wrapAction)(options);
    expect(result.on).toBe("SUCCESS");
    expect(result.payload).toBe("data");
    expect(result.func).toBeInstanceOf(Function);
    expect(result.actions).toEqual([]);
  });
  test("should test wrapAction with actions", function () {
    var options = {
      on: "SUCCESS",
      payload: "data",
      func: function func() {},
      actions: [{
        on: "SUCCESS",
        payload: "data",
        func: function func() {}
      }]
    };
    var result = (0, _utils.wrapAction)(options);
    expect(result.on).toBe("SUCCESS");
    expect(result.payload).toBe("data");
    expect(result.func).toBeInstanceOf(Function);
    expect(JSON.stringify(result.actions)).toEqual(JSON.stringify([{
      on: "SUCCESS",
      payload: "data",
      func: function func() {}
    }]));
  });
  test("should test wrapAction with default values", function () {
    var options = {};
    var result = (0, _utils.wrapAction)(options);
    expect(result.on).toBe("SUCCESS");
    expect(result.payload).toBe("data");
    expect(result.func).toBeInstanceOf(Function);
    expect(result.actions).toEqual([]);
  });
});