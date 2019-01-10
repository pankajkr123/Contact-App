import React, {Component} from 'react';
import {Platform, StyleSheet, Text, ScrollView,View, TouchableOpacity} from 'react-native';
import { ListItem } from 'react-native-elements';
const Realm = require('realm');
var realm = new Realm();
const contactArray = [];

const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
  ]
  

export default class ContactList extends Component {
    constructor(props){
        super(props)
        // this.state = {
        //     detail:''
        // }
        realm.addListener('change', () => {
            this.setState({detail: realm.objects('contactList').sorted('nameData') })
        });
         
        detail = realm.objects('contactList').sorted("nameData");
        //  for(var index in detail) {
        //    contactArray.push(detail[index])
        //  }

         //console.log("Hello",contactArray);
         console.log("Detail",detail)
    }
    static navigationOptions = {
        title: 'My Contacts',
        headerStyle: {backgroundColor: '#0693E3', height: 67 },
        headerTitleStyle: {color: 'white', fontSize: 25, textAlign:'center'}
    }
  render() {
      
     return (
        // <View>
        //     <Text>Hello</Text>
        // </View>
        <View>
            <ScrollView>
            {
                detail.map((l, i) => (
                    <ListItem
                    key={i}
                    avatar={{ source: { uri: "https://www.widex.co.uk/-/media/images/generic/icons/icon-professional.png?w=323&hash=CBFD427F4C80A0DD56759B06A34E24021236FF94" } }}
                    title={l.nameData}    
                    subtitle={l.mobileData}
                    avatarStyle={{borderRadius:50, height:100, width:100 }}
                            containerStyle={{borderBottomWidth: 0, padding:0 }}
                            onPress={()=> {this.props.navigation.navigate('Detail',{user: [l], _index: detail.indexOf(l)})}}
                    />
                ))
            }
            </ScrollView>
        
        <TouchableOpacity style ={styles.btn}
                onPress={() => {this.props.navigation.navigate('Add')}}>
                <Text style={styles.btntext}>+</Text>
        </TouchableOpacity>
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
    btntext: {
        fontSize: 40,
        color: 'white',
    },
});

//export default  contactArray;