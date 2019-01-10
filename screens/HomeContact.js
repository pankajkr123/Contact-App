import React, {Component} from 'react';
import {Platform, StyleSheet, Text, List, View, TouchableOpacity, ScrollView} from 'react-native';
import ContactList from './ContactList';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class HomeContact extends Component {
    static navigationOptions = {
        title: 'My Contacts',
        headerStyle: {backgroundColor: '#0693E3', height: 67 },
        headerTitleStyle: {color: 'white', fontSize: 25, textAlign:'center'}
    }
  render() {
      //const{navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        
            <ScrollView>
                
            </ScrollView>
            {/* <TouchableOpacity style ={styles.btn}
                onPress={() => {this.props.navigation.navigate('Add')}}>
                <Text style={styles.btntext}>+</Text>
            </TouchableOpacity> */}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
//   btn: {
//     height: 80,
//     width: 80,
//     zIndex: 11,
//     backgroundColor: '#0693E3',
//     borderRadius: 50,
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 8,
//     top: 485,
//     left:290
//   },
//   btntext: {
//     fontSize: 40,
//     color: 'white',
//   },
});