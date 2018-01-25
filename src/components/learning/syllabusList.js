import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SyllabusOutput =  props => (
    <TouchableOpacity onPress={props.onPress}>
        <View style={syllabusOutputStyles.syllabusListOption}>
            <Icon
                name="book" size={20} color="#000"
            />
            <Text>
                {props.syllabus.syllabus_name}
            </Text>
            <Icon
                name="chevron-right" size={20} color="#000"
            />
        </View>
    </TouchableOpacity>
);

const syllabusOutputStyles = StyleSheet.create({
    syllabusListOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: "3%",
        paddingBottom: "3%"
    }
});

export default SyllabusOutput;