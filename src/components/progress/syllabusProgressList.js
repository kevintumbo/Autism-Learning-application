import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import Icon from "react-native-vector-icons/FontAwesome";
import syllabusProgressListStyles from "./styles/syllabusProgressListStyles";

const syllabusProgressListOutput = props => (
	<TouchableOpacity onPress={props.onPress}>
		<View style={syllabusProgressListStyles.syllabusListOption}>
			<Icon
				name="book"
				size={20}
				color="#000"
			/>
			<Text>
				{props.syllabus}
			</Text>
			<ProgressCircle
				percent={props.progress}
				radius={30}
				borderWidth={5}
				color="#3399FF"
				shadowColor="#999"
				bgColor="#fff"
			>
				<Text style={{ fontSize: 12 }}>{`${props.progress}%`}</Text>
			</ProgressCircle>
			<Icon
				name="chevron-right"
				size={20}
				color="#000"
			/>
		</View>
	</TouchableOpacity>
);

export default syllabusProgressListOutput;
