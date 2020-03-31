import { CREATE_EVENT, GET_EVENTS } from "../actions/types";

const initialState = {
  events: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, payload]
      };

    case GET_EVENTS:
      return { ...state, ...payload };

    default:
      return state;
  }
};
