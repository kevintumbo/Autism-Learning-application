import SQLite from "react-native-sqlite-storage";
import jwt from "react-native-pure-jwt";
import startMainTabs from "../../../components/tabs/StartNavigationTabs";
import { SET_TOKEN, SUCCESS_AUTHENTICATION } from "./actionTypes";

const loginSuccess = user => ({
	user,
	type: SUCCESS_AUTHENTICATION,
});

const setToken = token => ({
	type: SET_TOKEN,
	token,
});

const loginFailure = response => ({
	response,
});

const db = SQLite.openDatabase(
	{ name: "app.db", createFromLocation: "~app.db" },
	this.openCB, this.successCB, this.errorCB,
);


const loginUserAction = (name, password) => (dispatch) => {
	db.transaction((tx) => {
		tx.executeSql(`SELECT * FROM users WHERE name='${name}' AND password=${password}`, [], (tx, results) => {
			// Get rows with Web SQL Database spec compliance.
			const len = results.rows.length;
			const row = results.rows.item(0);
			if (len > 0) {
				jwt
					.sign(
						{
							exp: new Date().getTime() + (3600 * 1000), // expiration date, required, in ms.
							data: row,
						}, // body
						"*RTYUIO&*()", // secret
						{
							alg: "hs256", // required, only algorithm by now
						},
					)
					.then((token) => {
						dispatch(setToken(token));
						startMainTabs();
					}).catch(console.error);
			} else {
				const response = "Name or password is wrong. Try Again.";
				dispatch(loginFailure(response));
				alert("Name or password is wrong. Try Again.");
			}
		});
	});
};

export default loginUserAction;
