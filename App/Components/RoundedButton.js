// @flow

import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './Styles/RoundedButtonStyle'
import ExamplesRegistry from '../Services/ExamplesRegistry'

// Example
ExamplesRegistry.add('Rounded Button', () =>
  <RoundedButton
    text='Litter!'
    onPress={() => {
      console.log(this.state.region, 'this state region');
      console.log(props, 'heres props in rounded button');
      window.alert('This button should pin litter to the map')}}
  />
)

type RoundedButtonProps = {
  onPress: () => void,
  text?: string,
  children?: string,
  navigator?: Object
}

export default class RoundedButton extends React.Component {
  props: RoundedButtonProps

  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText.toUpperCase()
  }

  render () {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.getText()}</Text>
      </TouchableOpacity>
    )
  }
}
