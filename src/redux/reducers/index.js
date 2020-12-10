import { combineReducers } from "redux";
import courseReducer from "./courseReducer";
import authorReducer from "./authorReducer";
import apiCallStatusReducer from "./apiStatusReducers";

const rootReducers = combineReducers({
    courses: courseReducer,
    authors: authorReducer,
    apiCallStatusReducer
})

export default rootReducers;