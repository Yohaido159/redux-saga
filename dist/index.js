"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "takeEveryProcessActions", {
  enumerable: true,
  get: function get() {
    return _global.sagaProcessActionsStart;
  }
});
Object.defineProperty(exports, "takeEverySendToProcess", {
  enumerable: true,
  get: function get() {
    return _global.sagaSendToSagaProcessTakeEveryStart;
  }
});

var _global = require("./sagas/global.sagas");