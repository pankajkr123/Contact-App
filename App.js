/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeContact from './screens/HomeContact';
import ContactDetail from './screens/ContactDetail';
import AddContact from './screens/AddContact';
import ContactList from './screens/ContactList';
import EditContact from './screens/EditContact';
const screenStack = createStackNavigator(
  {
    List: ContactList,
    Add: AddContact,
    Detail: ContactDetail,
    Edit: EditContact,
  }

);

const AppConatiner = createAppContainer(screenStack);

export default class App extends Component {
  render() {
    return (
      <AppConatiner />
    );
  }
}