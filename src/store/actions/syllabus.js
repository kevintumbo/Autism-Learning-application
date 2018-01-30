import { SELECT_SYLLABUS, SELECT_UNIT } from './actionTypes';

export const selectSyllabus = (syllabus_id) => {
    return {
        type: SELECT_SYLLABUS,
        syllabus_id: syllabus_id
    };
};

export const selectUnit = (unit_id) => {
    return {
        type: SELECT_UNIT,
        unit_id: unit_id
    }
}