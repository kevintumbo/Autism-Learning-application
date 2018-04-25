import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Authreducer from "../screens/auth/reducers/authenticate";
import SyllabusProgressReducer from "../screens/progress/reducers/progress";
import { syllabusReducer, unitReducer } from "./reducers/syllabus";

const rootReducer = combineReducers({
	auth: Authreducer,
	syllabus: syllabusReducer,
	unit: unitReducer,
	syllabusProgress: SyllabusProgressReducer,
});

let composeEnhancers = compose;

if (__DEV__) {
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default configureStore;
