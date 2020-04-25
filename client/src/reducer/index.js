import loginFormReducer from "./loginFormReducer";
import { combineReducers } from "redux";

const allReducer = combineReducers({
  loginFormReducer,
});
export default allReducer;
