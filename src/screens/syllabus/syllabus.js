import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

import Icon from 'react-native-vector-icons/FontAwesome';

const db = SQLite.openDatabase({name : "testDB", createFromLocation : "~app.db"});

export default class SyllabusScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
           syllabus: [],
        };
        db.transaction((tx)=>{
            tx.executeSql('SELECT * FROM users', (tx,results) => {
                const len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    console.log(`Employee name: ${row.id}, Dept Name: ${row.syllabus_name}`);
                }
            });
        });
    }
    render() {
        return (
           <ScrollView style={syllabusStyles.container}>
               <View style={syllabusStyles.tabs}>
                   <View style={syllabusStyles.tab}>
                       <Icon
                           name="book" size={20} color="#000"
                       />
                       <Text>
                           Learning
                       </Text>
                   </View>
                   <View style={syllabusStyles.tab}>
                       <Icon
                           name="user" size={20} color="#000"
                       />
                       <Text>
                           Profile
                       </Text>
                   </View>
                   <View style={syllabusStyles.tab}>
                       <Icon
                           name="spinner" size={20} color="#000"
                       />
                       <Text>
                           Progress
                       </Text>
                   </View>
                   <View style={syllabusStyles.tab}>
                       <Icon
                           name="gear" size={20} color="#000"
                       />
                       <Text>
                           Settings
                       </Text>
                   </View>
               </View>

               <View style={syllabusStyles.syllabusList}>
                   <View style={syllabusStyles.syllabusListHeader}>
                       <Text>
                           Learning App Contents
                       </Text>
                   </View>

                   <View style={syllabusStyles.syllabusListOption}>
                       <Icon
                           name="book" size={20} color="#000"
                       />
                       <Text>
                           Social Studies Stds 1 & 2 Workbook
                       </Text>
                       <Icon
                           name="chevron-right" size={20} color="#000"
                       />
                   </View>
                   <View style={syllabusStyles.syllabusListOption}>
                       <Icon
                           name="book" size={20} color="#000"
                       />
                       <Text>
                           Social Studies Stds 3 & 4 Workbook
                       </Text>
                       <Icon
                           name="chevron-right" size={20} color="#000"
                       />
                   </View>
                   <View style={syllabusStyles.syllabusListOption}>
                       <Icon
                           name="book" size={20} color="#000"
                       />
                       <Text>
                           Social Studies Stds 5 & 6 Workbook
                       </Text>
                       <Icon
                           name="chevron-right" size={20} color="#000"
                       />
                   </View>
                   <View style={syllabusStyles.syllabusListOption}>
                       <Icon
                           name="book" size={20} color="#000"
                       />
                       <Text>
                           Social Studies Stds 7 & 8 Workbook
                       </Text>
                       <Icon
                           name="chevron-right" size={20} color="#000"
                       />
                   </View>
                   <View style={syllabusStyles.syllabusListOption}>
                       <Icon
                            name="book" size={20} color="#000"
                       />
                       <Text>
                           Sciences for Stds / Grades 1 – 8
                       </Text>
                       <Icon
                           name="chevron-right" size={20} color="#000"
                       />
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
        backgroundColor: "#00ecff"
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#fff",
        height: "15%",
        width: "70%",
        borderRadius: 10,
        marginTop: "2%"
    },
    tab: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    syllabusList: {
        flexDirection: "column",
        backgroundColor: "#fff",
        marginTop: "2%",
    },
    syllabusListHeader:{
        alignItems: "center",
        paddingTop: "3%",
        paddingBottom: "3%",
        borderBottomWidth: 0.5
    },
    syllabusListOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: "3%",
        paddingBottom: "3%",
        borderBottom: 1,
        borderBottomWidth: 0.5
    }
});