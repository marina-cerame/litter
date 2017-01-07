import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import RoundedButton from '../Components/RoundedButton'


class BottomNav extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity style={{ flex: 1} }>
          <RoundedButton>map view</RoundedButton>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }}>
          <RoundedButton>collection</RoundedButton>
        </TouchableOpacity>
      </View>
    );
  }
}

export default BottomNav;
