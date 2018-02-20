import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const QuestionCard = (props) =>(
    <View style={styles.container}>
        <Text style={styles.question}>
            {props.question.Question}
        </Text>
        <View style={styles.buttonContainer}>
            <Button style={styles.button}
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

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center"
    },
    question: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: "2%"
    },
    button: {
        width: "40%"
    }

});

export default QuestionCard;
