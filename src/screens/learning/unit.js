import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";
import SQLite from "react-native-sqlite-storage";

import UnitOutput from "../../components/learning/unitList";
import { selectUnit } from "../../store/actions/syllabus";

class UnitScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			units: [],
		};
	}

	componentWillMount() {
		const db = SQLite.openDatabase(
			{ name: "app.db", createFromLocation: "~app.db" },
			this.openCB, this.successCB(), this.errorCB,
		);
		db.transaction((tx) => {
			tx.executeSql(`SELECT * FROM units WHERE syllabus_id = ${this.props.syllabus_selected}`, [], (tx, results) => {
				console.log("Query completed");
				// Get rows with Web SQL Database spec compliance.
				const len = results.rows.length;
				for (let i = 0; i < len; i += 1) {
					const row = results.rows.item(i);
					this.setState(prevState => ({ units: prevState.units.concat(row) }));
				}
			});
		});
	}

	onSelectUnit = (unitId) => {
		this.props.selectedUnit(unitId);
		this.props.navigator.push({
			screen: "AutismApplication.QuestionScreen",
			title: "Question Page",
		});
	};

	errorCB = (err) => {
		console.log(`SQL Error: ${err}`);
	}

	successCB = () => {
		console.log("SQL executed fine");
	}

	openCB = () => {
		console.log("Database OPENED");
	}

	render() {
		const list = this.state.units.map(unit => (
			<UnitOutput
				key={unit.id}
				unit={unit}
				onPress={() => this.onSelectUnit(unit.id)}
			/>
		));

		return (
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={unitStyles.container}>
					<View style={unitStyles.unitList}>
						{list}
					</View>
				</View>
			</ScrollView>
		);
	}

}

const unitStyles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#00ecff",
		paddingBottom: "2%",
	},
	unitList: {
		flexDirection: "column",
		height: "95%",
		width: "70%",
		backgroundColor: "#fff",
		marginTop: "2%",
		marginBottom: "5%",

	},
});

const mapStateToProps = state => ({
	syllabus_selected: state.syllabus.selected_syllabus,
});

const mapDispatchToProps = dispatch => ({
	selectedUnit: (unitId) => {
		dispatch(selectUnit(unitId));
	},
});


export default connect(mapStateToProps, mapDispatchToProps)(UnitScreen)
