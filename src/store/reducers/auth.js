import {LOGIN, LOGOUT} from '../actions/actionTypes'
import initialState from './initialState';

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                name: action.name,
                password: action.password
            }
        case 'LOGOUT':
            return {
                ...state,
                name: '',
                password: ''
            }
        default:
            return state
    }
 
};

export default authReducer