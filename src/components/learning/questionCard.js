import React from "react";
import { View, Text, Button } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles/questionCard.styles";

const QuestionCard = props => (
	<View style={styles.container}>
		<Text style={styles.question}>
			{props.question.Question}
		</Text>
		<View style={styles.buttonContainer}>
			<Button
				style={styles.button}
				title={props.question.answer1}
				onPress={() => props.attemptAnswer(props.question.right_answer, props.question.answer1)}
			/>
			<Button
				title={props.question.answer2}
				onPress={() => props.attemptAnswer(props.question.right_answer, props.question.answer2)}
			/>
		</View>
	</View>
);

QuestionCard.propTypes = {
	question: PropTypes.object.isRequired,
	attemptAnswer: PropTypes.func.isRequired,
};

export default QuestionCard;
