import SQLite from "react-native-sqlite-storage";

const db = SQLite.openDatabase({ name: "app.db", createFromLocation: "~app.db" });

export const getSyllabus = () => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			const syllabus = [];
			tx.executeSql("SELECT * FROM syllabus", [], (tx, results) => {
				const len = results.rows.length;
				for (let i = 0; i < len; i += 1) {
					const row = results.rows.item(i);
					syllabus[i] = row;
				}
				resolve(syllabus);
			});
		});
	});
};

export const getSyllabusProgress = (userId) => {
	const syllabusProgress = [];
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(`SELECT * FROM progress WHERE user_id = ${userId} `, [], (tx, results) => { 
				const len = results.rows.length;
				for (let i = 0; i < len; i += 1) {
					const row = results.rows.item(i);
					syllabusProgress[i] = row;
				}
				resolve(syllabusProgress);
			});
		});
	});
};

export const getUnits = (syllabusId) => {
	const unitsList = [];
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(`SELECT * FROM units WHERE syllabus_id = ${syllabusId} `, [], (tx, results) => { 
				const len = results.rows.length;
				for (let i = 0; i < len; i += 1) {
					const row = results.rows.item(i);
					unitsList[i] = row;
				}
				resolve(unitsList);
			});
		});
	});
};

export const getUnitProgress = (syllabusId, userId) => {
	const unitProgressList = [];
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(`SELECT * FROM progress WHERE user_id = ${userId} AND syllabus_id = ${syllabusId}`, [], (tx, results) => {
				const len = results.rows.length;
				if (len > 0) {
					for (let i = 0; i < len; i += 1) {
						const row = results.rows.item(i);
						unitProgressList[i] = row;
					}
					resolve(unitProgressList);
				} else {
					resolve(unitProgressList);
				}
			});
		});
	});
};
