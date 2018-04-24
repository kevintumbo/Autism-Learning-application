import { SET_TOKEN, SUCCESS_AUTHENTICATION } from "../actions/actionTypes";
import initialState from "./initialState";

const Authreducer = (state = initialState, action) => {
	switch (action.type) {
	case SET_TOKEN:
		return {
			...state,
			token: action.token,
			isAuthenticated: true,
		};
	case SUCCESS_AUTHENTICATION:
		return {
			...state,
			Name: action.user,
			id: action.id,
		};
	default:
		return state;
	}
};

export default Authreducer;
