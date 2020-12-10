import { combineReducers } from "redux";
import courseReducer from "./courseReducer";

const rootReducers = combineReducers({
    courses: courseReducer
})

export default rootReducers;