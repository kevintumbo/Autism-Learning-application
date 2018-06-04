import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SQLite from "react-native-sqlite-storage";
import UnitOutput from "../../components/learning/unitList";
import { selectUnit } from "../../store/actions/syllabus";
import unitStyles from "./styles/unitStyles.styles";

class UnitScreen extends Component {
	static navigatorStyle = {
		tabBarHidden: true,
	};

	static propTypes = {
		syllabus_selected: PropTypes.number.isRequired,
		selectedUnit: PropTypes.func.isRequired,
		navigator: PropTypes.object.isRequired,
	}
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

const mapStateToProps = state => ({
	syllabus_selected: state.syllabus.selected_syllabus,
});

const mapDispatchToProps = dispatch => ({
	selectedUnit: (unitId) => {
		dispatch(selectUnit(unitId));
	},
});


export default connect(mapStateToProps, mapDispatchToProps)(UnitScreen);
