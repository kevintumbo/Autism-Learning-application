import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import unitOutputStyles from "./styles/unitList.styles";

const UnitOutput = props => (
	<TouchableOpacity onPress={props.onPress}>
		<View style={unitOutputStyles.unitListOption}>
			<Icon
				name="book"
				size={20}
				color="#000"
			/>
			<Text>
				{props.unit.unit_name}
			</Text>
			<Icon
				name="chevron-right"
				size={20}
				color="#000"
			/>
		</View>
	</TouchableOpacity>
);

export default UnitOutput;
