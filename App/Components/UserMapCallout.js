import React from 'react'
import { Text, View, ScrollView, TouchableOpacity, TextInput, Image, Platform } from 'react-native'
import MapView from 'react-native-maps'
import Styles from './Styles/MapCalloutStyle'
import ExamplesRegistry from '../Services/ExamplesRegistry'
import RoundedButton from './RoundedButton'
import { Images } from '../Themes';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';


type MapCalloutProps = {
  location: Object,
  fetching: boolean,
  onPress: () => void
}

export default class MapCallout extends React.Component {
  props: MapCalloutProps
  state: {
    text: string,
    lat: number,
    long: number
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
      customButtons: null,
      quality: 0.000001,
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
        // const source = {uri: response.data, isStatic: true};
        // or a reference to the platform specific asset location
        // if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // } else {
        //   const source = {uri: response.uri, isStatic: true};
        // }
        firebase.database().ref('litter/').push({
          text: response.data,
          longitude: this.state.long, //location.longitude,
          latitude : this.state.lat, //location.latitude
          isImage: true
        });

        //Upload to firebase
    //     var storage = firebase.storage();
    //     var storageRef = storage.ref()
    //     var file = source.uri //TODO this.state.avatarSource (?)
    //     // Create the file metadata
    //     var metadata = {
    //       contentType: 'image/jpeg'
    //     };
    //     // Upload file and metadata to the object 'images/mountains.jpg'
    //     // TODO: make sure this works with the way we have the firebase storage setup
    //     // var uploadTask = storageRef.child('images/test').put(file, metadata);
    //     var message = source.uri;
    //     var uploadTask = ref.putString(message, 'base64').then(function(snapshot) { console.log('uploaded') });
    //     // Listen for state changes, errors, and completion of the upload.
    //     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    //       function(snapshot) {
    //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //         console.log('Upload is ' + progress + '% done');
    //         switch (snapshot.state) {
    //           case firebase.storage.TaskState.PAUSED: // or 'paused'
    //             console.log('Upload is paused');
    //             break;
    //           case firebase.storage.TaskState.RUNNING: // or 'running'
    //             console.log('Upload is running');
    //             break;
    //         }
    //       }, function(error) {
    //       switch (error.code) {
    //
    //         //TODO: fill in these error codes if we feel like it
    //
    //         case 'storage/unauthorized':
    //           // User doesn't have permission to access the object
    //           break;
    //         case 'storage/canceled':
    //           // User canceled the upload
    //           break;
    //         case 'storage/unknown':
    //           // Unknown error occurred, inspect error.serverResponse
    //           break;
    //       }
    //     }, function() {
    //       // Upload completed successfully, now we can get the download URL
    //
    //       //TODO: this is the download url, save it with the litter(?)
    //
    //       var downloadURL = uploadTask.snapshot.downloadURL;
    //     });
    //
    //     this.setState({
    //       avatarSource: source
    //     });
      }
    });


  }






  render () {
    /* ***********************************************************
    * Customize the appearance of the callout that opens when the user interacts with a marker.
    * Note: if you don't want your callout surrounded by the default tooltip, pass `tooltip={true}` to `MapView.Callout`
    *************************************************************/
    const { location } = this.props
    this.state.lat = location.latitude
    this.state.long = location.longitude
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
