import { getSyllabus, getSyllabusProgress, getUnits, getUnitProgress } from "../../../utility/database";
import { SUCCESS_SYLLABUS_PROGRESS_RETRIVAL, FAILURE_PROGRESS_RETRIVAL, SELECTED_SYLLABUS, SET_UNITS_PROGRESS } from "./actionTypes";

const setSyllabusProgress = syllabusProgress => ({
	syllabusProgress,
	type: SUCCESS_SYLLABUS_PROGRESS_RETRIVAL,
});

const setSyllabusProgressFailure = () => ({
	type: FAILURE_PROGRESS_RETRIVAL,
});

const selectedSyllabus = syllabusId => ({
	type: SELECTED_SYLLABUS,
	syllabusId,
});

const setSyllabusUnitProgress = unitProgressList => ({
	type: SET_UNITS_PROGRESS,
	unitProgressList,
});


const calculateProgress = (syllabusProgress, list) => {
	const progresslist = [];
	for (let i = 0; i < list.length; i += 1) {
		const syllabusObject = list[i];
		const syllabusID = syllabusObject.id;
		const syllabusName = syllabusObject.syllabus_name;
		const syllabusUnit = syllabusObject.syllabus_units;
		const mylist = [];
		for (let x = 0; x < syllabusProgress.length; x += 1) {
			if (syllabusProgress[x].syllabus_id === syllabusID) {
				mylist.push(syllabusProgress[x]);
			}
		}
		if (mylist.length > 0) {
			const len = mylist.length;
			const progress = Math.round((len / syllabusUnit) * 100);
			progresslist.push({
				Syllabus_name: syllabusName,
				Syllabus_id: syllabusID,
				Progress: progress,
			});
		} else {
			const progress = 0;
			progresslist.push({
				Syllabus_name: syllabusName,
				Syllabus_id: syllabusID,
				Progress: progress,
			});
		}
	}
	return progresslist;
};

const calculateUnitProgress = (unitList, progressList) => {
	const unitProgresslist = [];
	for (let i = 0; i < unitList.length; i += 1) {
		const unitObject = unitList[i];
		const unitId = unitObject.id;
		const unitName = unitObject.unit_name;
		if (progressList.length > 0 && progressList[i]) {
			if (progressList[i].unit_id === unitId) {
				const progress = 100;
				unitProgresslist.push({
					unit_name: unitName,
					unit_id: unitId,
					Progress: progress,
				});
			}
		} else {
			const progress = 0;
			unitProgresslist.push({
				unit_name: unitName,
				unit_id: unitId,
				Progress: progress,
			});
		}
	}
	return unitProgresslist;
};

export const getSelectedSyllabusProgress = syllabusId => (dispatch) => {
	if (syllabusId) {
		dispatch(selectedSyllabus(syllabusId));
	}
};

export const getSyllabusAction = userId => (async (dispatch) => {
	try {
		const syllabusList = await getSyllabus();
		const syllabusProgressList = await getSyllabusProgress(userId);
		const syllabusProgress = calculateProgress(syllabusProgressList, syllabusList);
		if (syllabusProgress.length === 5) {
			dispatch(setSyllabusProgress(syllabusProgress));
		} else {
			dispatch(setSyllabusProgressFailure());
		}
	} catch (e) {
		dispatch(setSyllabusProgressFailure);
	}
});

export const getUnitProgressAction = (syllabusId, userId) => (async (dispatch) => {
	try {
		const unitList = await getUnits(syllabusId);
		const progressList = await getUnitProgress(syllabusId, userId);
		const unitProgressList = calculateUnitProgress(unitList, progressList);
		if (unitProgressList.length > 0) {
			dispatch(setSyllabusUnitProgress(unitProgressList));
			console.log('dispatched');
		}
	} catch (e) {
		console.log('error');
	}
});
