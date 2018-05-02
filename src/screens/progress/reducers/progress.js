import { SUCCESS_SYLLABUS_PROGRESS_RETRIVAL, FAILURE_PROGRESS_RETRIVAL, SELECTED_SYLLABUS, SET_UNITS_PROGRESS } from "../actions/actionTypes";
import initialState from "./initialState";

const SyllabusProgressReducer = (state = initialState, action) => {
	switch (action.type) {
	case SUCCESS_SYLLABUS_PROGRESS_RETRIVAL:
		return {
			...state,
			syllabusProgress: action.syllabusProgress,
		};
	case SELECTED_SYLLABUS:
		return {
			...state,
			selectedSyllabus: action.syllabusId,
		};
	case SET_UNITS_PROGRESS:
		return {
			...state,
			selectedUnitProgress: action.unitProgressList,
		};
	case FAILURE_PROGRESS_RETRIVAL:
		return state;
	default:
		return state;
	}
};

export default SyllabusProgressReducer;
