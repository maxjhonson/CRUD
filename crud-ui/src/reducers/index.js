import { combineReducers } from "redux";
import productReducer from "./productReducer";
import userReducer from "./userReducer";

const reducers = { user: userReducer, product: productReducer };

export default combineReducers(reducers);
