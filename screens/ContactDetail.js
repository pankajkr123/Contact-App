import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Alert, Image,ScrollView,TouchableOpacity,View} from 'react-native';
import {Icon} from "react-native-elements";
import { Divider } from 'react-native-elements';
const Realm = require('realm');
 let realm = new Realm();

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class ContactDetail extends Component {
    static navigationOptions = {
        title: 'Detail',
        headerStyle: {backgroundColor: '#0693E3', height: 67 },
        headerTitleStyle: {color: 'white', fontSize: 25, textAlign:'center'}
    }

    delContact(delId) {
      
        let delData = realm.objects('contactList').filtered('contactId = $0',delId);
          Alert.alert(
            'Do you want to delete contact ?',
            '',
            [
              {text: 'Cancel', onPress: () => {console.log("cancel button is clicked")}, style: 'cancel'},
              {text: 'OK', onPress: () => {realm.write(() =>{realm.delete(delData)})}},
            ],
            { cancelable: false }
          )
    
    }

  render() {
    const {user} = this.props.navigation.state.params;
    const {_index} = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        
          {
            
            user.map((u,i) => {
              return(
                <View key={i} style={styles.data}>
                  <Image source={{uri: "https://www.widex.co.uk/-/media/images/generic/icons/icon-professional.png?w=323&hash=CBFD427F4C80A0DD56759B06A34E24021236FF94"}} style={styles.img}/>
                  
                  <Divider style={{ backgroundColor: 'gray', height: 4 }} />
                  <Text style={styles.text}>Name: {u.nameData}</Text>
                  <Text style={styles.text}>Mobile: {u.mobileData}</Text>
                  <Text style={styles.text}>Company: {u.compData}</Text>
                  <Text style={styles.text}>Email: {u.emailData}</Text>
                  
                
                <TouchableOpacity style ={styles.btn}
                  onPress={()=> {this.props.navigation.navigate('Edit',{editUser: user})}}>
                  <Icon name="edit" color="white" />
                </TouchableOpacity>
              <TouchableOpacity style ={styles.btnDel}
                      onPress={()=> {this.delContact(u.contactId)}}>
                      <Icon name="delete" color="white" />
              </TouchableOpacity>
              </View>
              );
              
            })
            
          }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    height: 80,
    width: 80,
    zIndex: 11,
    backgroundColor: '#0693E3',
    borderRadius: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    top: 485,
    left:290
  },
  btnDel: {
    height: 80,
    width: 80,
    zIndex: 11,
    backgroundColor: '#0693E3',
    borderRadius: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    top: 485,
    left: 30
  },

  data: {
    padding: 20,
    
  },
  text: {
    fontSize: 15,
    marginTop: 20,
    fontWeight: 'bold'
  },
  img: {
    height: 250,
    width: 400,
    position: 'relative',
    right:16,
  }
});