import axios from "axios";
import * as types from "./auth.actionTypes";

export const register = (payload) => (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST });
  return axios
    .post("http://masai-api-mocker.herokuapp.com/auth/register", payload)
    .then((res) => {
      dispatch({ type: types.REGISTER_SUCCESS, payload: res.data });
      return types.REGISTER_SUCCESS;
    })
    .catch((e) => {
      dispatch({ type: types.REGISTER_FAILED, payload: e });
      return types.REGISTER_FAILED;
    });
};

export const login = (params) => (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST });
  return axios
    .post("http://masai-api-mocker.herokuapp.com/auth/login", params)
    .then((res) => {
      dispatch({ type: types.LOGIN_SUCESS, payload: res.data.token });
      console.log("RES", res);
      return types.LOGIN_SUCESS;
    })
    .catch((e) => {
      dispatch({ type: types.LOGIN_FAILED, payload: e });
      return types.LOGIN_FAILED;
    });
};

export const userDetail = (username) => (dispatch) => {
  return axios
    .get(`http://masai-api-mocker.herokuapp.com//user/${username}`)
    .then((res) => {
      dispatch({ tye: types.USER_DETAIL, payload: res.data });
    });
};

export const LogOutAPI = () => (dispatch) => {
  dispatch({ type: types.LOGOUT });
};
