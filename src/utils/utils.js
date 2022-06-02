export const getUserToken = () => {
  let token =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token") ||
    null;
  return token;
};

export const removeUserToken = () => {
  window.localStorage.removeItem("token");
  window.sessionStorage.removeItem("token");
  window.localStorage.setItem("logout", Date.now().toString());
  window.localStorage.removeItem("logout");
};

export const wrapAction = (options) => {
  const {
    on = "SUCCESS",
    payload = "data",
    func = () => {},
    actions = [],
  } = options;

  return {
    on,
    payload,
    func,
    actions,
  };
};

export const isObjEmptyOrNull = (obj) => {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
};
