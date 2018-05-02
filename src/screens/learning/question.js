import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, View, Text } from "react-native";
import PropTypes from "prop-types";
import SQLite from "react-native-sqlite-storage";
import ProgressCircle from "react-native-progress-circle";
import QuestionCard from "../../components/learning/questionCard";
import SuccessModal from "../../components/tabs/modals/successModal";
import FailureModal from "../../components/tabs/modals/failureModal";
import CompletionModal from "../../components/tabs/modals/completionModal";
import questionStyles from "./styles/questionStyles.styles";
import { getSyllabusAction } from "../progress/actions/progress";

const db = SQLite.openDatabase(
	{ name: "app.db", createFromLocation: "~app.db" },
	this.openCB, this.successCB, this.errorCB,
);
class QuestionScreen extends Component {
	static navigatorStyle = {
		tabBarHidden: true,
	};

	static propTypes = {
		navigator: PropTypes.object.isRequired,
		selected_unit: PropTypes.number.isRequired,
		syllabusId: PropTypes.number.isRequired,
		userId: PropTypes.number.isRequired,
		getSyllabusAction: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			progress: 0,
			questions: [],
			current_question: [],
			successModalVisible: false,
			failureModalVisible: false,
			completionModalVisible: false,
		};
	}

	componentWillMount() {
		db.transaction((tx) => {
			tx.executeSql(`SELECT * FROM questions where unit_id = ${this.props.selected_unit}`, [], (tx, results) => {
				// Get rows with Web SQL Database spec compliance.

				const len = results.rows.length;
				for (let i = 0; i < len; i += 1) {
					const row = results.rows.item(i);
					this.setState(prevState => ({
						questions: prevState.questions.concat(row),
					}));
				}
				this.setState(prevState => ({
					current_question: prevState.current_question.concat(this.state.questions[0]),
				}));
				console.log(this.state.current_question);
			});
		});
	}


	errorCB = (err) => {
		console.log(`SQL Error: ${err}`);
	}

	successCB = () => {
		console.log("SQL executed fine");
	}

	openCB = () => {
		console.log("Database OPENED");
	}

	AnswerQuestionHandler = (rightAnswer, answer) => {
		if (answer !== rightAnswer) {
			this.setState({ failureModalVisible: true });
		} else {
			const index = this.state.questions.indexOf(this.state.current_question[0]);
			if (this.state.questions[index + 1]) {
				this.setState({ successModalVisible: true });
			} else {
				this.setState({ completionModalVisible: true });
				this.saveProgress(this.props.userId, this.props.selected_unit, this.props.syllabusId);
				this.props.getSyllabusAction(this.props.userId);
			}
		}
	};

	closeSuccessModal = () => {
		this.setState({ successModalVisible: false });
	};

	closeFailureModal = () => {
		this.setState({ failureModalVisible: false });
	};

	closeCompletionModal = () => {
		this.setState({ completionModalVisible: false });
		this.props.navigator.pop({
			animated: true,
			animationType: "fade",
		});
	};

	repeatUnitHandler = () => {
		this.setState({ completionModalVisible: false });
		this.setState(() => ({
			current_question: [this.state.questions[0]],
			progress: 0,
		}));
	};

	nextQuestionHandler = () => {
		const index = this.state.questions.indexOf(this.state.current_question[0]);
		if (this.state.questions[index + 1]) {
			this.setState(() => ({
				successModalVisible: false,
				current_question: [this.state.questions[index + 1]],
			}));
			this.progress(index + 1);
		}
	};

	saveProgress = (userId, unitId, syllabusId) => (
		db.transaction((tx) => {
			tx.executeSql(`SELECT * FROM progress WHERE user_id = ${userId} AND unit_id = ${unitId}`, [], (tx, results) => {
				const len = results.rows.length;
				if (len > 0) {
					console.log("This unit has already been completed");
				} else {
					tx.executeSql(`INSERT into progress(user_id, unit_id, syllabus_id) VALUES (${userId}, ${unitId}, ${syllabusId})`, [], () => {
						console.log("Congratulations. You have completed this unit");
					});
				}
			});
		})
	);

	progress = (index) => {
		let progress = 0;
		const allQuestions = this.state.questions.length;
		const currentQuestion = this.state.questions.indexOf(this.state.questions[index]);
		progress = Math.round((currentQuestion / allQuestions) * 100);
		this.setState({ progress });
	}

	render() {
		const question = this.state.current_question.map(question => (
			<QuestionCard
				key={question.id}
				question={question}
				attemptAnswer={(answer, rightAnswer) => this.AnswerQuestionHandler(answer, rightAnswer)}
			/>
		));
		return (
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={questionStyles.container}>
					<SuccessModal
						modalVisible={this.state.successModalVisible}
						closeModal={() => this.closeSuccessModal()}
						nextQuestion={() => this.nextQuestionHandler()}
					/>
					<FailureModal
						modalVisible={this.state.failureModalVisible}
						closeModal={() => this.closeFailureModal()}
					/>
					<CompletionModal
						modalVisible={this.state.completionModalVisible}
						chooseAnotherUnit={() => this.closeCompletionModal()}
						repeatUnit={() => this.repeatUnitHandler()}
					/>
					<ProgressCircle
						percent={this.state.progress}
						radius={50}
						borderWidth={8}
						color="#3399FF"
						shadowColor="#999"
						bgColor="#fff"
					>
						<Text style={{ fontSize: 18 }}>{`${this.state.progress}%`}</Text>
					</ProgressCircle>
					{question}
				</View>
			</ScrollView>

		);
	}
}

const mapStateToProps = state => ({
	selected_unit: state.unit.selected_unit,
	syllabusId: state.syllabus.selected_syllabus,
	userId: state.auth.id,
});

const mapDispatchToProps = {
	getSyllabusAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionScreen);
