import {
  sagaSendToProcess,
  sagaSendToSagaProcessTakeEveryStart,
} from "./global.sagas";

module.exports = {
  sendToProcess: sagaSendToProcess,
  takeEverySendToProcess: sagaSendToSagaProcessTakeEveryStart,
};
