import React from 'react'
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import MapView from 'react-native-maps'
import Styles from './Styles/MapCalloutStyle'
import ExamplesRegistry from '../Services/ExamplesRegistry'
import RoundedButton from './RoundedButton'
// var Litter = require('./models/litter');

// Example
ExamplesRegistry.add('Map Callout', () =>
  <MapCallout
    location={{
      title: 'Callout Example'
    }}
    onPress={() => window.alert('That tickles!')}
  />
)

type MapCalloutProps = {
  location: Object,
  fetching: boolean,
  onPress: () => void
}

export default class MapCallout extends React.Component {
  props: MapCalloutProps
  state: {
    text: string
  }
  constructor (props: MapCalloutProps) {
    super(props)
    this.onPress = this.props.onPress.bind(null, this, this.props.location)
    this.state = { text: 'Useless Placeholder' }
  }

  shouldComponentUpdate (nextProps, nextState) {
    // You can access `this.props` and `this.state` here
    // This function should return a boolean, whether the component should re-render.
    return nextState.text !== this.state.text;
  }

  handlePress () {
    let text = this.state.text;
     console.log(text, 'heres possible text in rounded button');
  }

  handleChangeSubmit = (text) => {
    this.setState({ text: text })
  }

  render () {
    /* ***********************************************************
    * Customize the appearance of the callout that opens when the user interacts with a marker.
    * Note: if you don't want your callout surrounded by the default tooltip, pass `tooltip={true}` to `MapView.Callout`
    *************************************************************/
    const { location } = this.props
    const { text } = this.state
    const { fetching } = this.props
    const editable = !fetching
    return (
      <MapView.Callout style={Styles.callout}>
        {/* <TouchableOpacity onPress={this.onPress}> */}
        <View>
          <TextInput
          //  ref='text'
          //  editable={editable}
          //  keyboardType='default'
          //  returnKeyType='next'
           style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
           maxLength = {200}
           multiline = {false}
           placeholder="Type a poem. Think a thought."
           onChangeText={this.handleChangeSubmit}
           clearTextOnFocus={true}
           value={this.state.text}
          //  onSubmitEditing
          //  numberOfLines = {8}
         />
         <RoundedButton
           text='Litter!'
           onPress={
             () => {
             let text = this.state.text;
             console.log(text, 'heres possible text in rounded button');
             }}
         />
          {/* <Text>{location.latitude}</Text> */}
        {/* </TouchableOpacity> */}
      </View>
      </MapView.Callout>
    )
  }
}
