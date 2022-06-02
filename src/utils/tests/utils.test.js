import { getUserToken, removeUserToken, wrapAction } from "../../utils/utils";

describe("shold test utils modules", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  test("should test getUserToken", () => {
    expect(getUserToken()).toBeNull();

    window.localStorage.setItem("token", "token");
    expect(getUserToken()).toBe("token");
    window.sessionStorage.setItem("token", "token");
    expect(getUserToken()).toBe("token");

    window.localStorage.removeItem("token");
    window.sessionStorage.removeItem("token");
    expect(getUserToken()).toBeNull();
  });

  test("should test removeUserToken", () => {
    expect(getUserToken()).toBeNull();

    window.localStorage.setItem("token", "token");
    expect(getUserToken()).toBe("token");
    window.sessionStorage.setItem("token", "token");
    expect(getUserToken()).toBe("token");

    removeUserToken();
    expect(getUserToken()).toBeNull();
  });

  test("should test wrapAction", () => {
    const options = {
      on: "SUCCESS",
      payload: "data",
      func: () => {},
      actions: [],
    };
    const result = wrapAction(options);
    expect(result.on).toBe("SUCCESS");
    expect(result.payload).toBe("data");
    expect(result.func).toBeInstanceOf(Function);
    expect(result.actions).toEqual([]);
  });

  test("should test wrapAction with actions", () => {
    const options = {
      on: "SUCCESS",
      payload: "data",
      func: () => {},
      actions: [
        {
          on: "SUCCESS",
          payload: "data",
          func: () => {},
        },
      ],
    };
    const result = wrapAction(options);
    expect(result.on).toBe("SUCCESS");
    expect(result.payload).toBe("data");
    expect(result.func).toBeInstanceOf(Function);
    expect(JSON.stringify(result.actions)).toEqual(
      JSON.stringify([
        {
          on: "SUCCESS",
          payload: "data",
          func: () => {},
        },
      ])
    );
  });

  test("should test wrapAction with default values", () => {
    const options = {};
    const result = wrapAction(options);
    expect(result.on).toBe("SUCCESS");
    expect(result.payload).toBe("data");
    expect(result.func).toBeInstanceOf(Function);
    expect(result.actions).toEqual([]);
  });
});
