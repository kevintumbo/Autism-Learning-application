import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const QuestionCard = (props) =>(
    <View>
        <Text>
            {props.question.Question}
        </Text>
        <Button
            title={props.question.answer1}
            onPress={() => props.attemptAnswer(props.question.right_answer, props.question.answer1)}
        />
        <Button
            title={props.question.answer2}
            onPress={() => props.attemptAnswer(props.question.right_answer, props.question.answer2)}
        />
    </View>
);

export default QuestionCard;
