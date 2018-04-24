import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import SQLite from "react-native-sqlite-storage";


class ProgressScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			syllabusProgress: [],
		};
	}

	componentWillMount() {
		const db = SQLite.openDatabase({ name: "app.db", createFromLocation: "~app.db" });
		db.transaction((tx) => {
			tx.executeSql("SELECT * FROM syllabus", [], (tx, results) => {
				// Get rows with Web SQL Database spec compliance.
				const len = results.rows.length;
				for (let i = 0; i < len; i += 1) {
					const row = results.rows.item(i);
					this.setState(prevState => ({ syllabusProgress: prevState.syllabusProgress.concat(row) }));
					console.log(this.state.syllabusProgress);
				}
				const syllabusLength = this.state.syllabusProgress.length;
				const syllabusProgress = [];
				for (let i = 0; i < syllabusLength; i += 1) {
					const syllabusObject = this.state.syllabusProgress[i];
					const syllabusId = syllabusObject.id;
					const syllabusName = syllabusObject.syllabus_name;
					const syllabusUnit = syllabusObject.syllabus_units;
					tx.executeSql(`SELECT * FROM progress where syllabus_id = ${syllabusId}`, [], (tx, result) => {
						const length = result.rows.length;
						if (length > 0) {
							const progress = (length / syllabusUnit) * 100;
							syllabusProgress[i] = {
								Syllabus_name: syllabusName,
								Syllabus_id: syllabusId,
								Progress: progress,
							};
						} else {
							const progress = 0;
							syllabusProgress[i] = {
								Syllabus_name: syllabusName,
								Syllabus_id: syllabusId,
								Progress: progress,
							};
						}
					});
				}


				this.setState(() => ({ syllabusProgress }));


				console.log(this.state.syllabusProgress);
			});
		});
	}
	render() {
		return (
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View>
					<Text>
						hello
					</Text>
				</View>
			</ScrollView>
		);
	}
}

// const mapStateToProps = state => ({
// 	user_id:  state.auth
// });

export default ProgressScreen;
