import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SuccessModal = (props) => (
    <Modal
        visible={props.modalVisible}
        animationType={'slide'}
        onRequestClose={() => props.closeModal}
    >
        <View style={successModalStyle.container}>
            <Text>
                Correct. That Is The Right Answer
            </Text>

            <Icon
                name="check" size={20} color="#000"
            />
            <View>
                <Button
                    title="Answer Question Again"
                    onPress={props.closeModal}
                />

                <Button
                    title="Next Question"
                    onPress={props.nextQuestion}
                />
            </View>
        </View>
    </Modal>
);

const successModalStyle = StyleSheet.create({

});

export default SuccessModal;