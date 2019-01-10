import React, {Component} from 'react';
import {Platform, TouchableOpacity, TextInput,StyleSheet, Image,Text, View, Button,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';
import ContactList from './ContactList';
var ImagePicker = require('react-native-image-picker');
const Realm = require('realm');
 var realm;
 var options = {
    title: 'Select Image',
    customButtons: [
      {name: 'Choose', title: 'Choose Photo from Gallery'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
const contactDatabse = [];

realm = new Realm({
    schema: [{name: 'contactList',
    properties: 
    {
        contactId: {type: 'int',   default: 0},
        nameData:  'string',
        compData: 'string',
        mobileData: 'string',
        emailData: 'string'
    }}]
  });

export default class AddContact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pickedImage: require('../image/contact.png'),
            Tempname: '',
            Tempcomp:'',
            Tempmobile:'',
            Tempemail: ''
        };
        
        // realm = new Realm({
        //     schema: [{name: 'contactList',
        //     properties: 
        //     {
        //         contactId: {type: 'int',   default: 0},
        //         nameData:  'string',
        //         compData: 'string',
        //         mobileData: 'string',
        //         emailData: 'string'
        //     }}]
        //   });

   
          let detail = realm.objects('contactList');
          for(var index in detail) {
            contactDatabse.push(detail[index])
          }

         
 
          
        
        }

    static navigationOptions = {
        title: 'Add Contact',
        headerStyle: {backgroundColor: '#0693E3', height: 67 },
        headerTitleStyle: {color: 'white', fontSize: 25, textAlign:'center'}
    }



    addContact() {
        try {
            let numberArray = contactDatabse.map(elem => elem.mobileData);
            let mobile = this.refs.mob._lastNativeText;

            if(numberArray.includes(mobile)) {
                alert("Number is already exist")
            } else {
                    realm.write(() =>{
                       var ID = realm.objects('contactList').length + 1;
                        realm.create('contactList',{
                        contactId: ID,
                        nameData: this.state.Tempname,
                        compData: this.state.Tempcomp,
                        mobileData: this.state.Tempmobile,
                        emailData: this.state.Tempemail
                        
                      });
                    })
                  
                    this.setState({
                        //pickedImage: require('../image/contact.png'),
                        Tempname: '',
                        Tempcomp:'',
                        Tempmobile:'',
                        Tempemail: ''
                    })
                    
                    //React.findDOMNode(this.refs.nameText).autoFocus;
                }
            
            }
        catch(e) {
            alert(e);
        }
    }

    // pickImageHandler()  {
    //     ImagePicker.showImagePicker({title: "Select image for contact "}, res => {
    //       if (res.didCancel) {
    //         console.log("User cancelled!");
    //       } else if (res.error) {
    //         console.log("Error", res.error);
    //       } else {
    //         this.setState({
    //           pickedImage: { uri: res.uri }
    //         });
            
    //         console.log("hello",this.state.pickedImage);
    //       }
    //     });
    //   }

  render() {
          
    return (
        <View style={styles.container}>
            <View style={styles.wrapper }>

               <ScrollView>
                   {/* <View style={styles.placeholder}>
                   <TouchableOpacity style ={styles.btn}
                        onPress={() => {this.pickImageHandler()}}>
                        <Image  source={this.state.pickedImage} style={styles.previewImage} />
                    </TouchableOpacity>
                   </View>
                    <Divider style={{ backgroundColor: '#0693E3', height: 2, marginBottom: 20 }} /> */}
                    <TextInput 
                        placeholder="Name"
                        autoFocus= {true}
                        ref="nameText"
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
                </ScrollView>
                <Button 
                    title="Save"
                    onPress={()=>{this.addContact()}}
                />
            </View>
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
    },
    btn: {
        height: 100,
        width: 100,
       // zIndex: 11,
        backgroundColor: 'white',
        borderRadius: 100,
    
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholder: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    previewImage: {
        height: 100,
        width: 100,
       // zIndex: 11,
        backgroundColor: 'white',
        borderRadius: 100,
        borderColor: '#0693E3',
        borderWidth: 2,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }

});