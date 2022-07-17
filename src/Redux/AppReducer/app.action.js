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

export const updateTasks = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_TASKS_REQ });
  return axios
    .patch(`http://localhost:5000/tasks/${id}`, payload)
    .then((res) => {
      dispatch({ type: types.UPDATE_TASKS_SUCCESS, payload: res.data });
    })
    .catch((e) => {
      dispatch({ type: types.UPDATE_TASKS_FAILED, payload: e });
    });
};

export const addSubTasks = (id, payload) => (dispatch) => {
  dispatch({ type: types.ADD_SUBTASKS_REQ });
  return axios
    .patch(`http://localhost:5000/tasks/${id}`, payload)
    .then((res) => {
      dispatch({ type: types.ADD_SUBTASKS_SUCCESS, payload: res.data });
    })
    .then((e) => {
      dispatch({ type: types.ADD_SUBTASKS_FAILED, payload: e });
    });
};

export const deleteSubTasks = (id, payload) => (dispatch) => {
  dispatch({ type: types.DELETE_SUBTASKS_REQ });
  return axios
    .patch(`http://localhost:5000/tasks/${id}`, payload)
    .then((res) => {
      dispatch({ type: types.DELETE_SUBTASKS_SUCCESS, payload: res.data });
    })
    .catch((e) => {
      dispatch({ type: types.DELETE_SUBTASKS_FAILED, payload: e });
    });
};
