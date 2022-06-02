import "regenerator-runtime/runtime";
import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { wrapAction } from "../../utils/utils";
import {
  sagaSendToProcess,
  processActions,
  sagaProcessAfterSend,
} from "../global.sagas";
import { getUserToken } from "../../utils/utils";
import globalTypes from "../global.types";

describe("testing the global.sagas models", () => {
  test("testing saga generator sagaSendToProcess", () => {
    const action = {
      url: "url",
      method: "get",
      payload: {},
      actions: [],
      actionsBefore: [],
      options: {},
      out_state: {},
    };
    const saga = sagaSendToProcess(action);
    window.localStorage.setItem("token", "token");

    expect(saga.next(action).value).toEqual(
      call(processActions, { actions: action.actionsBefore })
    );
    expect(JSON.stringify(saga.next().value)).toEqual(
      JSON.stringify(
        call(axios.request, action.url, {
          headers: {
            Authorization: `JWT token`,
          },
        })
      )
    );
    const res = {
      data: {
        data: {},
        more_data: {},
      },
      status: 200,
    };

    expect(saga.next(res).value).toEqual(
      call(sagaProcessAfterSend, {
        actions: action.actions,
        options: {
          data: res,
          more_data: { isSuccess: true, out_state: action.out_state },
        },
      })
    );
  });

  test("testing saga generator sagaProcessAfterSend isSucess true", () => {
    const action = {
      actions: [
        wrapAction({
          on: "SUCCESS",
        }),
        wrapAction({
          on: "SUCCESS",
        }),
        wrapAction({
          on: "FAIL",
        }),
      ],
      options: {
        data: {},
        more_data: {
          isSuccess: true,
        },
      },
    };
    const saga = sagaProcessAfterSend(action);
    expect(JSON.stringify(saga.next(action).value)).toEqual(
      JSON.stringify(
        call(processActions, {
          actions: action.actions.slice(0, 2),
          options: {
            data: action.options.data,
            more_data: action.options.more_data,
          },
        })
      )
    );
  });

  test("testing saga generator sagaProcessAfterSend isSucess false", () => {
    const action = {
      actions: [
        wrapAction({
          on: "SUCCESS",
        }),
        wrapAction({
          on: "SUCCESS",
        }),
        wrapAction({
          on: "FAIL",
        }),
      ],
      options: {
        data: {},
        more_data: {
          isSuccess: false,
        },
      },
    };
    const saga = sagaProcessAfterSend(action);
    expect(JSON.stringify(saga.next(action).value)).toEqual(
      JSON.stringify(
        call(processActions, {
          actions: action.actions.slice(2),
          options: {
            data: action.options.data,
            more_data: action.options.more_data,
          },
        })
      )
    );
  });
});
