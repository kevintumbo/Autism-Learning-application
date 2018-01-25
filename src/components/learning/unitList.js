import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const UnitOutput = props => (
  <TouchableOpacity onPress={props.onPress}>
      <View style={unitOutputStyles.unitListOption}>
          <Icon
              name="book" size={20} color="#000"
          />
          <Text>
              {props.unit.unit_name}
          </Text>
          <Icon
              name="chevron-right" size={20} color="#000"
          />

      </View>
  </TouchableOpacity>
);

const unitOutputStyles = StyleSheet.create({
    unitListOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: "3%",
        paddingBottom: "3%"
    }
});

export default UnitOutput;
