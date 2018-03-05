import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, StyleSheet } from 'react-native'
import SQLite from 'react-native-sqlite-storage';
import QuestionCard from '../../components/learning/questionCard';
import SuccessModal from '../../components/tabs/modals/successModal';
import FailureModal from '../../components/tabs/modals/failureModal';
import CompletionModal from '../../components/tabs/modals/completionModal';

class QuestionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            current_question: [],
            successModalVisible: false,
            failureModalVisible: false,
            completionModalVisible: false
        };
    }

    componentWillMount() {
        let db = SQLite.openDatabase({name: 'app.db', createFromLocation: "~app.db"},
            this.openCB, this.successCB, this.errorCB);
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM questions where unit_id = ' + this.props.selected_unit, [], (tx, results) => {

                // Get rows with Web SQL Database spec compliance.

                const len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    this.setState((prevState) => {
                        return {
                            questions: prevState.questions.concat(row),
                        }
                    });
                }
                this.setState((prevState) => {
                    return {
                        current_question: prevState.current_question.concat(this.state.questions[0])
                    }
                });
                console.log(this.state.current_question)
            });
        });
    }


    errorCB(err) {
        console.log("SQL Error: " + err);
    }

    successCB() {
        console.log("SQL executed fine");
    }

    openCB() {
        console.log("Database OPENED");
    }

    AnswerQuestionHandler = (right_answer, answer) => {
       if (answer !== right_answer) {
           this.setState({failureModalVisible:true})
       }
       else {
           const index = this.state.questions.indexOf(this.state.current_question[0]);
           if (this.state.questions[index + 1]) {
               this.setState({successModalVisible:true})
           }
           else {
               this.setState({completionModalVisible:true})
           }
       }
    };

    closeSuccessModal = () => {
        this.setState({successModalVisible:false})
    };

    closeFailureModal = () => {
        this.setState({failureModalVisible:false})
    };

    closeCompletionModal = () => {
        this.setState({completionModalVisible:false});
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade'
        });
    };

    repeatUnitHandler  = () => {
        this.setState({completionModalVisible:false});
        this.setState(() => {
            return {
                current_question: [this.state.questions[0]]
            }
        });
    };

    nextQuestionHandler = () => {
        const index = this.state.questions.indexOf(this.state.current_question[0]);
        if (this.state.questions[index + 1]) {
            this.setState(() => {
                return {
                    successModalVisible: false,
                    current_question: [this.state.questions[index + 1]]
                }
            });
        }
    };



    render() {
        const question = this.state.current_question.map(question => (
            <QuestionCard
                key={question.id}
                question={question}
                attemptAnswer={ (answer, right_answer) => this.AnswerQuestionHandler(answer, right_answer)}
            />
            )

        )
        return (
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={questionStyles.container}>
                    <SuccessModal
                        modalVisible={ this.state.successModalVisible }
                        closeModal={ () => this.closeSuccessModal() }
                        nextQuestion = { () => this.nextQuestionHandler() }
                    />
                    <FailureModal
                        modalVisible={ this.state.failureModalVisible }
                        closeModal={ () => this.closeFailureModal() }
                    />
                    <CompletionModal
                        modalVisible={ this.state.completionModalVisible }
                        chooseAnotherUnit={ () => this.closeCompletionModal() }
                        repeatUnit={ () => this.repeatUnitHandler()}
                    />
                    {question}
                </View>
            </ScrollView>

        );
    }
}

const questionStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#00ecff",
        paddingBottom: "5%"
    },
});

const mapStateToProps = state => {
    return {
        selected_unit: state.unit.selected_unit
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionScreen);