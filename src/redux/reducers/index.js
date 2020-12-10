import { combineReducers } from "redux";
import courseReducer from "./courseReducer";
import authorReducer from "./authorReducer";

const rootReducers = combineReducers({
    courses: courseReducer,
    authors: authorReducer,
})

export default rootReducers;