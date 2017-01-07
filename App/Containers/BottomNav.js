import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

class BottomNav extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity style={{height: 100, flex: 1}}>
          <Text>map view</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{height: 100, flex: 1}}>
          <Text>collection</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default BottomNav;
