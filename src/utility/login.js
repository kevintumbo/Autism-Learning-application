import SQLite from "react-native-sqlite-storage";
import jwt from "react-native-pure-jwt";
import startMainTabs from "../components/tabs/StartNavigationTabs";

const db = SQLite.openDatabase(
	{ name: "app.db", createFromLocation: "~app.db" },
	this.openCB, this.successCB, this.errorCB,
);

const loginUser = (name, password) => {
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
						console.log(token);
						startMainTabs();
					}).catch(console.error);
			} else {
				console.log("Name or password is wrong. Try Again.");
				alert("Name or password is wrong. Try Again.");
			}
		});
	});
};

export default loginUser;
