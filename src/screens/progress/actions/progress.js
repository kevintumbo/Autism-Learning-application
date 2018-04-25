import SQLite from "react-native-sqlite-storage";
import { getSyllabus, getSyllabusProgress } from "../../../utility/database";
import { SUCCESS_SYLLABUS_PROGRESS_RETRIVAL, FAILURE_PROGRESS_RETRIVAL } from "./actionTypes";

const db = SQLite.openDatabase({ name: "app.db", createFromLocation: "~app.db" });

const setSyllabusProgress = syllabusProgress => ({
	syllabusProgress,
	type: SUCCESS_SYLLABUS_PROGRESS_RETRIVAL,
});

const setSyllabusProgressFailure = () => ({
	type: FAILURE_PROGRESS_RETRIVAL,
});

const getSyllabusAction = userId => (dispatch) => {
	try {
		const syllabusProgress = [];
		const syllabus = getSyllabus();
		console.log(syllabus);
		for (let i = 0; i < 5; i += 1) {
			const syllabusObject = syllabus[i];
			const syllabusId = syllabusObject.id;
			const syllabusName = syllabusObject.syllabus_name;
			const syllabusUnit = syllabusObject.syllabus_units;
			const progress = getSyllabusProgress(userId, syllabusId, syllabusName, syllabusUnit);
			console.log(progress);
		}
		console.log(syllabusProgress);
		console.log(syllabusProgress.length);
	} catch (e) {
		console.log(e);
	}
};
// 		for (let i = 0; i < syllabusLength; i += 1) {
// 			const syllabusObject = syllabus[i];
// 			const syllabusId = syllabusObject.id;
// 			const syllabusName = syllabusObject.syllabus_name;
// 			const syllabusUnit = syllabusObject.syllabus_units;
// 			tx.executeSql(`SELECT * FROM progress where syllabus_id = ${syllabusId} and user_id = ${userId}`, [], (tx, results) => {
// 				const length = results.rows.length;
// 				if (length > 0) {
// 					const progress = (length / syllabusUnit) * 100;
// 					syllabusProgress[i] = {
// 						Syllabus_name: syllabusName,
// 						Syllabus_id: syllabusId,
// 						Progress: progress,
// 					};
// 				} else {
// 					const progress = 0;
// 					syllabusProgress[i] = {
// 						Syllabus_name: syllabusName,
// 						Syllabus_id: syllabusId,
// 						Progress: progress,
// 					};
// 				}
// 			});
// 		}
// 		console.log("we are here");
// 		console.log(syllabusProgress);
// 		dispatch(setSyllabusProgress(syllabusProgress));
// 	});
// });
export default getSyllabusAction;
