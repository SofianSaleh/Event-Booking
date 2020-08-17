import {
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS
} from "../actions/types";

const initialState = {
  token: null,
  isAuthenticated: null,
  loading: false,
  user: null
};
//  the action has { type and payload }

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false
      };

    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        token: payload.token,
        isAuthenticated: true,
        user: payload,
        loading: false
      };

    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false
      };

    default:
      return state;
  }
};
