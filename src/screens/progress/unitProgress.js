import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import unitStyles from "../learning/styles/unitStyles.styles";
import { getUnitProgressAction } from "./actions/progress";
import UnitProgressListOutput from "../../components/progress/unitProgressList";


class UnitProgressScreen extends Component {
	static propTypes = {
		userId: PropTypes.number.isRequired,
		selectedSyllabus: PropTypes.number.isRequired,
		getUnitProgressAction: PropTypes.func.isRequired,
		unitsProgress: PropTypes.array,
	};

	static defaultProps = {
		unitsProgress: null,
	}

	state = {
		loading: "false",
	}

	async componentDidMount() {
		await this.props.getUnitProgressAction(this.props.selectedSyllabus, this.props.userId);
		this.setState({loading: 'true'});
	}

	render() {
		if (this.state.loading === "true") {
			const list = this.props.unitsProgress.map(unit => (
				<UnitProgressListOutput
					key={unit.unit_id}
					unit={unit.unit_name}
					progress={unit.Progress}
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
		return (
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={unitStyles.container}>
					<View style={unitStyles.unitList}>
						<Text>
							kevin
						</Text>
					</View>
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({
	userId: state.auth.id,
	selectedSyllabus: state.syllabusProgress.selectedSyllabus,
	unitsProgress: state.syllabusProgress.selectedUnitProgress,
});

const mapDispatchToProps = {
	getUnitProgressAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitProgressScreen);
