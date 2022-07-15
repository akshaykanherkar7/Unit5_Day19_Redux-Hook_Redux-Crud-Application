import * as types from "./app.actionTypes";
import axios from "axios";

export const getTasks = () => (dispatch) => {
  dispatch({ type: types.GET_TASKS_REQ });
  return axios
    .get("http://localhost:5000/tasks")
    .then((res) => {
      dispatch({ type: types.GET_TASKS_SUCCESS, payload: res.data });
    })
    .catch((e) => {
      dispatch({ type: types.GET_TASKS_FAILED, payload: e });
    });
};
