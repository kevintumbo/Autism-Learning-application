import { createStore ,combineReducers, compose} from 'redux';

import authReducer from './reducers/auth'
import {syllabusReducer, unitReducer} from "./reducers/syllabus";

const rootReducer = combineReducers({
    auth: authReducer,
    syllabus: syllabusReducer,
    unit: unitReducer
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers());
};

export default configureStore;
