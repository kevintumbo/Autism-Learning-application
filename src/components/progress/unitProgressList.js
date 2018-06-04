import React from "react";
import { View, Text } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import Icon from "react-native-vector-icons/FontAwesome";
import unitOutputStyles from "../../components/learning/styles/unitList.styles";

const UnitProgressListOutput = props => (
	<View style={unitOutputStyles.unitListOption}>
		<Icon
			name="book"
			size={20}
			color="#000"
		/>
		<Text>
			{props.unit}
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
	</View>
);

export default UnitProgressListOutput;
