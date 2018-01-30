import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { connect } from 'react-redux'

import SyllabusOutput from '../../components/learning/syllabusList';
import AppTabs from '../../components/tabs/AppTabs';
import {selectSyllabus} from "../../store/actions/syllabus";


class SyllabusScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
           syllabus: [],
        };

    }

    componentWillMount() {
        let db = SQLite.openDatabase({name: 'app.db', createFromLocation : "~app.db"},
            this.openCB, this.successCB() ,this.errorCB);
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM syllabus', [], (tx, results) => {
                console.log("Query completed");

                // Get rows with Web SQL Database spec compliance.

                const len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    this.setState((prevState) => {
                        return {syllabus: prevState.syllabus.concat(row)};
                    });
                }
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

    onSelectSyllabus = (syllabus_id) => {
        this.props.selectedSyllabus(syllabus_id);
        this.props.navigator.push({
            screen: "AutismApplication.UnitScreen",
            title: "Unit page",
        });
    };

    render() {

        const list = this.state.syllabus.map(syllabus => (
            <SyllabusOutput
                key={syllabus.id}
                syllabus={syllabus}
                onPress={() => this.onSelectSyllabus(syllabus.id)}
            />
        ));

        return (
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={syllabusStyles.container}>
                        <AppTabs/>
                        <View style={syllabusStyles.syllabusList}>
                            <View style={syllabusStyles.syllabusListHeader}>
                                <Text>
                                    Learning App Contents
                                </Text>
                            </View>
                            <View>
                                {list}
                            </View>

                        </View>
                </View>
            </ScrollView>
        );
    }
}

const syllabusStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#00ecff",
        paddingBottom: "5%"
    },
    syllabusList: {
        flexDirection: "column",
        height: "80%",
        width: "70%",
        backgroundColor: "#fff",
        marginTop: "2%",
        marginBottom: "5%"

    },
    syllabusListHeader:{
        alignItems: "center",
        paddingTop: "3%",
        paddingBottom: "3%"
    },
    syllabusListOption: {
        alignItems: "stretch"
    }
});


const mapDispatchToProps = dispatch => {
    return {
        selectedSyllabus: syllabus_id =>{
            dispatch(selectSyllabus(syllabus_id))
        }
    }
};

export default connect(null, mapDispatchToProps)(SyllabusScreen);

