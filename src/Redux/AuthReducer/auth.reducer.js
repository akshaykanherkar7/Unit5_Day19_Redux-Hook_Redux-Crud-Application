import { getLocalData, saveLocalData } from "../../Utils/localStorage";
import * as types from "./auth.actionTypes";

const initialState = {
  isAuth: getLocalData("token") ? true : false,
  token: getLocalData("token") || "",
  isLoading: false,
  isError: false,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.REGISTER_REQUEST: {
      return { ...state, isLoading: true, isError: false };
    }

    case types.REGISTER_SUCCESS: {
      return { ...state, isLoading: false };
    }

    case types.REGISTER_FAILED: {
      return { ...state, isLoading: false, isError: true };
    }

    case types.LOGIN_REQUEST: {
      return { ...state, isLoading: true, isError: false };
    }

    case types.LOGIN_SUCESS: {
      saveLocalData("token", payload);
      return { ...state, isLoading: false, isAuth: true, token: payload };
    }

    case types.LOGIN_FAILED: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isAuth: false,
        token: "",
      };
    }

    case types.LOGOUT: {
      localStorage.removeItem("token");
      return { ...state, isAuth: false, token: "" };
    }

    default: {
      return state;
    }
  }
};
