import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CompletionModal = (props) => (

    <Modal
        visible={props.modalVisible}
        animationType={'slide'}
        onRequestClose={() => props.closeModal}
    >
        <View>
            <Text>
                Congratulations You Have Finished The Unit.
            </Text>
            <Icon
                name="check" size={20} color="#000"
            />
            <View>
                <Button
                    title="Repeat Unit"
                    onPress={props.repeatUnit}
                />

                <Button
                    title="Choose Another Unit"
                    onPress={props.chooseAnotherUnit}
                />
            </View>
        </View>
    </Modal>
);

const completionModalStyle = StyleSheet.create({

});

export default CompletionModal
