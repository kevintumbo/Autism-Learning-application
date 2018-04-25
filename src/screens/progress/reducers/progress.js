import { SUCCESS_SYLLABUS_PROGRESS_RETRIVAL, FAILURE_PROGRESS_RETRIVAL } from "../actions/actionTypes";
import initialState from "./initialState";

const SyllabusProgressReducer = (state = initialState, action) => {
	switch (action.type) {
	case SUCCESS_SYLLABUS_PROGRESS_RETRIVAL:
		return {
			syllabusProgress: action.syllabusProgress,
		};
	case FAILURE_PROGRESS_RETRIVAL:
		return state;
	default:
		return state;
	}
};

export default SyllabusProgressReducer;
