import React from "react";
import { View, Text, Button, Image } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles/questionCard.styles";
import images from "../../assets/images";

const QuestionCard = props => (
	<View style={styles.container}>
		<View style={styles.questionContainer}>
			<Text style={styles.question}>
				{props.question.Question}
			</Text>
		</View>
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
		<View style={styles.imageContainer}>
			<Image
				style={styles.images}
				source={images[props.question.answer1]}
			/>
			<Image
				source={images[props.question.answer2]}
			/>
		</View>
	</View>
);


QuestionCard.propTypes = {
	question: PropTypes.object.isRequired,
	attemptAnswer: PropTypes.func.isRequired,
};

export default QuestionCard;
