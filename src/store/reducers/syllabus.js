import { SELECT_SYLLABUS, SELECT_UNIT } from '../actions/actionTypes';
import initialState from './initialState';

export const syllabusReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SELECT_SYLLABUS':
            return {
                ...state,
                selected_syllabus: action.syllabus_id
            };
        default:
            return state
    }
};

export const unitReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SELECT_UNIT':
            return {
                ...state,
                selected_unit: action.unit_id
            };
        default:
            return state
    }
};

export const questionReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'ANSWER_QUESTION':
    }
};
