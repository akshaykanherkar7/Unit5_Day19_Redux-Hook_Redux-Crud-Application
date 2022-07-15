import * as types from "./app.actionTypes";

const initialState = {
  tasks: [],
  isLoading: false,
  isError: false,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_TASKS_REQ: {
      return { ...state, isLoading: true, isError: false };
    }

    case types.GET_TASKS_SUCCESS: {
      return { ...state, tasks: payload, isLoading: false, isError: false };
    }

    case types.GET_TASKS_FAILED: {
      return { ...state, isLoading: false, isError: true };
    }

    default: {
      return state;
    }
  }
};
