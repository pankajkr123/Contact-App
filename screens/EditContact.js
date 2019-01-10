import React, {Component} from 'react';
import {Platform, StyleSheet, ScrollView, TextInput, Button, Text, View} from 'react-native';
import AddContact from './AddContact';
const Realm = require('realm');
let realm = new Realm();
const contactArray = [];

export default class EditContact extends Component {
    constructor(props) {
        super(props)
        detail = realm.objects('contactList');
         for(var index in detail) {
           contactArray.push(detail[index])
         }
        this.state = {
            Tempname: '',
            Tempcomp:'',
            Tempmobile:'',
            Tempemail: ''
        };
        

    }

    componentWillMount() {
        const {editUser} = this.props.navigation.state.params;
        editUser.map((l)=>{
            this.setState({
                Tempname: l.nameData,
                Tempcomp: l.compData,
                Tempmobile: l.mobileData,
                Tempemail: l.emailData
            })
        })

       console.log("ghghgh",editUser);
    }
    static navigationOptions = {
        title: 'Edit',
        headerStyle: {backgroundColor: '#0693E3', height: 67 },
        headerTitleStyle: {color: 'white', fontSize: 25, textAlign:'center'}
    }

    showInfo(editId) {
        let updateContact = realm.objects('contactList').filtered('contactId = $0',editId)[0];
        console.log("hhhh", updateContact);
        realm.write(() => {
            updateContact.nameData = this.state.Tempname;
            updateContact.compData = this.state.Tempcomp;
            updateContact.mobileData = this.state.Tempmobile;
            updateContact.emailData = this.state.Tempemail;
        });
       
    }

    render() {
        const {editUser} = this.props.navigation.state.params;
         return(
            
            <View style={styles.container}>
            
            {
                editUser.map((_editId, _key) => {
                return(
                    <View  key = {_key} style={styles.wrapper }>
                                    
                        <TextInput 
                            placeholder="Name"
                            autoFocus= {true}
                            style={styles.textbox}
                            returnKeyType={"next"}
                            value={this.state.Tempname}
                            onChangeText = {(name) =>{this.setState({Tempname: name})}}
                        />
                        <TextInput 
                            placeholder="Company"
                            style={styles.textbox}
                            returnKeyType={"next"}
                            value={this.state.Tempcomp}
                            onChangeText = {(company) =>{this.setState({Tempcomp: company})}}
                        />
                        <TextInput 
                            placeholder="Mobile No."
                            keyboardType ="numeric"
                            returnKeyType={"next"}
                            maxLength={10}
                            ref="mob"
                            style={styles.textbox}
                            value={this.state.Tempmobile}
                            onChangeText = {(mob) =>{this.setState({Tempmobile: mob})}}
                        />
                        <TextInput 
                            placeholder="Email"
                            keyboardType ="email-address"
                            style={styles.textbox}
                            value={this.state.Tempemail}
                            onChangeText = {(email) =>{this.setState({Tempemail: email})}}
                        />

                        <Button 
                        title="Save"
                        onPress={()=>{this.showInfo(_editId.contactId)}}
                        />
                    </View>
                );
                })
                

            }    
                
            
                
            </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10
    },
    wrapper: {
        flex: 1
    },
    textbox: {
        flexDirection:'row',
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#0693E3',
        marginBottom: 10,
        paddingLeft: 10
    }
});