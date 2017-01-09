import React from 'react'
import { Text, View, ScrollView, TouchableOpacity, TextInput, Image, Platform } from 'react-native'
import MapView from 'react-native-maps'
import Styles from './Styles/MapCalloutStyle'
import ExamplesRegistry from '../Services/ExamplesRegistry'
import RoundedButton from './RoundedButton'
import { Images } from '../Themes';
import ImagePicker from 'react-native-image-picker';
var firebase = require('firebase')


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
    this.handleChangeSubmit = this.handleChangeSubmit.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);
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

  handleChangeSubmit (e) {
    this.inputText = e.nativeEvent.text
    console.log(this.inputText, 'why work for connor but no me');
  }

  handlePhoto() {
    var options = {
      title: 'Select Avatar',
      customButtons: [
        //TODO
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info below in README)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // TODO pick definition for source

        // You can display the image using either data...
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        // or a reference to the platform specific asset location
        // if (Platform.OS === 'ios') {
        //   const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // } else {
        //   const source = {uri: response.uri, isStatic: true};
        // }
        this.setState({
          avatarSource: source
        });
      }
    });
  }






  render () {
    /* ***********************************************************
    * Customize the appearance of the callout that opens when the user interacts with a marker.
    * Note: if you don't want your callout surrounded by the default tooltip, pass `tooltip={true}` to `MapView.Callout`
    *************************************************************/
    const { location } = this.props
    return (
      <MapView.Callout style={Styles.callout}>
        <View>
          <TextInput
           ref={input => { this.litterInput = input }}
           clearTextOnFocus={true}
           style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
           maxLength = {200}
           multiline = {false}
           placeholder="Type a poem. Think a thought."
           onChange={this.handleChangeSubmit}
           numberOfLines = {1}
         />
         <View style={{flexDirection: 'row'}}>
           <RoundedButton
             style={{flex: 10}}
             text='Litter!'
             onPress={() => {
               firebase.database().ref('litter/').push({
                 text: this.inputText,
                 longitude: location.longitude,
                 latitude : location.latitude
               });
             }}
           />
           <RoundedButton style={{flex: 1}}
           text='Photo'
           onPress={this.handlePhoto} />
         </View>

      </View>
      </MapView.Callout>
    )
  }
}
