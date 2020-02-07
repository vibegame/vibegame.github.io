import {createStore, applyMiddleware} from "redux";
// devtools
import {composeWithDevTools} from "redux-devtools-extension";

// middlewares
import thunk from "redux-thunk";
import logger from 'redux-logger';

// reducer
import rootReducer from "./reducers";

export default function configureStore() {
    const middlewares = [logger, thunk];
    const enhancer = applyMiddleware(...middlewares);

    const store = createStore(rootReducer, composeWithDevTools(enhancer));

    return store;
};