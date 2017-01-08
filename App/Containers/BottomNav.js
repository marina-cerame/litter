import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import RoundedButton from '../Components/RoundedButton';
import { Actions as NavigationActions } from 'react-native-router-flux';


class BottomNav extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity style={{ flex: 1} }>
          <RoundedButton onPress={NavigationActions.presentationScreen}>map view</RoundedButton>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }}>
          <RoundedButton onPress={NavigationActions.collection}>collection</RoundedButton>
        </TouchableOpacity>
      </View>
    );
  }
}

export default BottomNav;
