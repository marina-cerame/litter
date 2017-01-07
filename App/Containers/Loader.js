import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import firebase from 'firebase';

class Loader extends Component {
  componentDidMount() {
    // firebase.auth().currentUser
    firebase.auth().currentUser ? NavigationActions.presentationScreen() : NavigationActions.login();
  }
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>
        Loading, please wait...
      </Text>
    </View>);
  }
}

export default Loader;
