import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import syllabusOutputStyles from "./styles/syllabusList.styles";

const SyllabusOutput = props => (
	<TouchableOpacity onPress={props.onPress}>
		<View style={syllabusOutputStyles.syllabusListOption}>
			<Icon
				name="book"
				size={20}
				color="#000"
			/>
			<Text>
				{props.syllabus.syllabus_name}
			</Text>
			<Icon
				name="chevron-right"
				size={20}
				color="#000"
			/>
		</View>
	</TouchableOpacity>
);

export default SyllabusOutput;
