import { createStore, applyMiddleware, compose } from "redux";
import rootReducers from "./reducers";
import thunk from 'redux-thunk';

import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

export default function configureStore(initialState){
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(
        rootReducers,
        initialState,
        composeEnhancers(
            applyMiddleware(thunk,reduxImmutableStateInvariant())
        )
    );
}