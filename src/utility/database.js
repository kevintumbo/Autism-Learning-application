import SQLite from "react-native-sqlite-storage";

const db = SQLite.openDatabase({ name: "app.db", createFromLocation: "~app.db" });

export const getSyllabus = () => {
	const syllabus = [];
	db.transaction((tx) => {
		tx.executeSql("SELECT * FROM syllabus", [], (tx, results) => {
			// Get rows with Web SQL Database spec compliance.
			const len = results.rows.length;
			for (let i = 0; i < len; i += 1) {
				const row = results.rows.item(i);
				syllabus.push(row);
			}
		});
	});
	return syllabus;
};

export const getSyllabusProgress = (syllabusId, userId, syllabusName, syllabusUnit) => {
	const syllabusProgress = [];
	db.transaction((tx) => {
		tx.executeSql(`SELECT * FROM progress where syllabus_id = ${syllabusId} and user_id = ${userId}`, [], (tx, results) => {
			const len = results.rows.length;
			if (len > 0) {
				const progress = (len / syllabusUnit) * 100;
				syllabusProgress[0] = {
					Syllabus_name: syllabusName,
					Syllabus_id: syllabusId,
					Progress: progress,
				};
			} else {
				const progress = 0;
				syllabusProgress[0] = {
					Syllabus_name: syllabusName,
					Syllabus_id: syllabusId,
					Progress: progress,
				};
			}
		});
	});
	return syllabusProgress;
};
