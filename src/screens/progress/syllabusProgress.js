import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { getSyllabusAction, getSelectedSyllabusProgress } from "./actions/progress";
import SyllabusProgressListOutput from "../../components/progress/syllabusProgressList";
import syllabusStyles from "../learning/styles/syllabusStyles.styles";

class SyllabusProgressScreen extends Component {
	static propTypes = {
		user_id: PropTypes.number.isRequired,
		getSyllabusAction: PropTypes.func.isRequired,
		getSelectedSyllabusProgress: PropTypes.func.isRequired,
		progress: PropTypes.array.isRequired,
		navigator: PropTypes.object.isRequired,
	}

	async componentDidMount() {
		await this.props.getSyllabusAction(this.props.user_id);
	}

	onSelectSyllabus = (syllabusId) => {
		this.props.getSelectedSyllabusProgress(syllabusId);
		this.props.navigator.push({
			screen: "AutismApplication.UnitProgressScreen",
			title: "Unit Progress Page",
		});
	}
	render() {
		const list = this.props.progress.map(progress => (
			<SyllabusProgressListOutput
				key={progress.Syllabus_id}
				syllabus={progress.Syllabus_name}
				progress={progress.Progress}
				onPress={() => this.onSelectSyllabus(progress.Syllabus_id)}
			/>
		));
		return (
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={syllabusStyles.container}>
					<View style={syllabusStyles.syllabusList}>
						<View style={syllabusStyles.syllabusListHeader}>
							<Text>
								Learning App Progress
							</Text>
						</View>
						<View>
							{list}
						</View>
					</View>
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({
	user_id: state.auth.id,
	progress: state.syllabusProgress.syllabusProgress,
});

const mapDispatchToProps = {
	getSyllabusAction,
	getSelectedSyllabusProgress,
};

export default connect(mapStateToProps, mapDispatchToProps)(SyllabusProgressScreen);
