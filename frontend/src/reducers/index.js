import { combineReducers } from "redux";
//import every action here
import auth from "./auth";
import events from "./events";

export default combineReducers({
  // add ever action imporeted here
  auth,
  events
});
