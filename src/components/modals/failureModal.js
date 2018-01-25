import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FailureModal = (props) => (
    <Modal
        visible={props.modalVisible}
        animationType={'slide'}
        onRequestClose={props.closeModal}
    >
        <Text>
            Wrong. That Is Not The Right Answer
        </Text>
        <Icon
            name="remove" size={20} color="#000"
        />
        <View>
            <Button
                title="Try Again"
                onPress={props.closeModal}
            />
        </View>
    </Modal>
);

const failureModalStyle = StyleSheet.create({

});

export default FailureModal;
