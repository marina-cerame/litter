var React = require('react');
var ReactNative = require('react-native');
import MapCallout from '../Components/MapCallout'
import UserMapCallout from '../Components/UserMapCallout'
var {
  StyleSheet,
  PropTypes,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} = ReactNative;

var MapView = require('react-native-maps');

var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

// (Initial Static Location) Mumbai
const LATITUDE = 19.0760;
const LONGITUDE = 72.8777;

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const fakeDB = [
  { text: 'You dont know what you got til its gone', latitude: 38.9579357, longitude: -77.0704922},
  { text: 'Hellooooo from washington', latitude: 38.9579327, longitude: -77.0704902},
  { text: 'Geriatrics unite', latitude: 38.9579001, longitude: -77.0704800},
  { text: 'Here be the living', latitude: 38.9559237, longitude: -77.0666152},
  { text: 'Here are the living', latitude: 29.9510651, longitude: -90.0715331}
];

var CustomMap = React.createClass({
  getInitialState() {
    // console.log(region, 'heres location in initial state');
    // console.log(position, 'heres position in initial state')
    return {
      locations: fakeDB,
      showUserLocation: false,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
    };
  },

  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position, 'heres position in comp did mount')
        this.setState({
          region: {
            locations: fakeDB,
            showUserLocation: false,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      const newRegion = {
        locations: fakeDB,
        showUserLocation: false,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      this.onRegionChange(newRegion);
    });
  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  onRegionChange(region) {
    this.setState({ region });
  },

    calloutPress (text,location) {
      /* ***********************************************************
      * STEP 5
      * Configure what will happen (if anything) when the user
      * presses your callout.
      *************************************************************/
      return (
        <div>{location}</div>
      )
      console.tron.log(location)
    },
  renderUserMarker (location) {
  //     /* ***********************************************************
  //     * STEP 6
  //     * Customize the appearance and location of the map marker.
  //     * Customize the callout in ../Components/MapCallout.js
  //     *************************************************************/
  //
  // calloutAnchor={(0.4, 0.4)}
      return (
        <MapView.Marker image={require("../Images/UserPin.png")} key={location.text} coordinate={{latitude: location.latitude, longitude: location.longitude}}>
          <UserMapCallout style={{width: 500, height: 200}} text={location.text} location={location} onPress={this.calloutPress} />
        </MapView.Marker>
      )
    },

  renderMapMarkers (location) {
  //     /* ***********************************************************
  //     * STEP 6
  //     * Customize the appearance and location of the map marker.
  //     * Customize the callout in ../Components/MapCallout.js
  //     *************************************************************/
  //
      return (
        <MapView.Marker key={location.text} coordinate={{latitude: location.latitude, longitude: location.longitude}}>
          <MapCallout text={location.text} location={location} onPress={this.calloutPress} />
        </MapView.Marker>
      )
    },

  render() {
    // this.state.locations.map(location=> { console.log(location, 'heres locations in render in map')});
    return (
      <View style={styles.container}>
        <MapView
          ref="map"
          mapType="terrain"
          scrollEnabled={false}
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation={this.state.showUserLocation}
        >
        {this.renderUserMarker(this.state.region)}
        {this.state.locations.map((location) => this.renderMapMarkers(location))}
        </MapView>
        <View style={styles.bubble}>
          <Text style={{ textAlign: 'center'}}>
            {`${this.state.region.latitude.toPrecision(7)}, ${this.state.region.longitude.toPrecision(7)}`}
          </Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
});

module.exports = CustomMap;








//Original map view example keeping around in case we need.


// import React from 'react'
// import { connect } from 'react-redux'
// import { View } from 'react-native'
// import MapView from 'react-native-maps'
// import { calculateRegion } from '../Lib/MapHelpers'
// import MapCallout from '../Components/MapCallout'
// import Styles from './Styles/MapviewExampleStyle'
//
// /* ***********************************************************
// * IMPORTANT!!! Before you get started, if you are going to support Android,
// * PLEASE generate your own API key and add it to android/app/src/main/AndroidManifest.xml
// * We've included our API key for demonstration purposes only, and it will be regenerated from
// * time to time. As such, neglecting to complete this step could potentially break your app in production!
// * https://console.developers.google.com/apis/credentials
// * Also, you'll need to enable Google Maps Android API for your project:
// * https://console.developers.google.com/apis/api/maps_android_backend/
// *************************************************************/
//
// class MapviewExample extends React.Component {
//   /* ***********************************************************
//   * This example is only intended to get you started with the basics.
//   * There are TONS of options available from traffic to buildings to indoors to compass and more!
//   * For full documentation, see https://github.com/lelandrichardson/react-native-maps
//   *************************************************************/
//
//   constructor (props) {
//     super(props)
//     /* ***********************************************************
//     * STEP 1
//     * Set the array of locations to be displayed on your map. You'll need to define at least
//     * a latitude and longitude as well as any additional information you wish to display.
//     *************************************************************/
//     const locations = [
//       { title: 'Location A', latitude: 37.78825, longitude: -122.4324 },
//       { title: 'Location B', latitude: 37.75825, longitude: -122.4624 }
//     ]
//     /* ***********************************************************
//     * STEP 2
//     * Set your initial region either by dynamically calculating from a list of locations (as below)
//     * or as a fixed point, eg: { latitude: 123, longitude: 123, latitudeDelta: 0.1, longitudeDelta: 0.1}
//     *************************************************************/
//     const region = calculateRegion(locations, { latPadding: 0.05, longPadding: 0.05 })
//     this.state = {
//       region,
//       locations,
//       showUserLocation: true
//     }
//     this.renderMapMarkers = this.renderMapMarkers.bind(this)
//     this.onRegionChange = this.onRegionChange.bind(this)
//   }
//
//   componentDidMount () {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         console.log(position, 'heres position.......<==')
//         var initialPosition = { title: 'Location',
//                                 latitude: position.coords.latitude,
//                                 longitude: position.coords.longitude
//                               };
//
//         console.log(calculateRegion(initialPosition, { latPadding: 0.05, longPadding: 0.05 }), 'heres calculate region')
//         this.setState({ region: calculateRegion([initialPosition], { latPadding: 0.05, longPadding: 0.05 }) });
//       },
//       (error) => alert(error.message),
//       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
//     );
//     this.watchID = navigator.geolocation.watchPosition((position) => {
//       var lastPosition = {
//                           title: 'Location',
//                           latitude: position.coords.latitude,
//                           longitude: position.coords.longitude
//                           };
//       this.setState({region: calculateRegion([lastPosition], { latPadding: 0.05, longPadding: 0.05 })});
//     });
//   }
//
//   componentWillReceiveProps (newProps) {
//     /* ***********************************************************
//     * STEP 3
//     * If you wish to recenter the map on new locations any time the
//     * Redux props change, do something like this:
//     *************************************************************/
//     // this.setState({
//     //   region: calculateRegion(newProps.locations, { latPadding: 0.1, longPadding: 0.1 })
//     // })
//   }
//
//   onRegionChange (newRegion) {
//     /* ***********************************************************
//     * STEP 4
//     * If you wish to fetch new locations when the user changes the
//     * currently visible region, do something like this:
//     *************************************************************/
//     // const searchRegion = {
//     //   ne_lat: newRegion.latitude + newRegion.latitudeDelta,
//     //   ne_long: newRegion.longitude + newRegion.longitudeDelta,
//     //   sw_lat: newRegion.latitude - newRegion.latitudeDelta,
//     //   sw_long: newRegion.longitude - newRegion.longitudeDelta
//     // }
//     // Fetch new data...
//   }
//
//   calloutPress (location) {
//     /* ***********************************************************
//     * STEP 5
//     * Configure what will happen (if anything) when the user
//     * presses your callout.
//     *************************************************************/
//     console.tron.log(location)
//   }
//
//   renderMapMarkers (location) {
//     /* ***********************************************************
//     * STEP 6
//     * Customize the appearance and location of the map marker.
//     * Customize the callout in ../Components/MapCallout.js
//     *************************************************************/
//
//     return (
//       <MapView.Marker key={location.title} coordinate={{latitude: location.latitude, longitude: location.longitude}}>
//         <MapCallout location={location} onPress={this.calloutPress} />
//       </MapView.Marker>
//     )
//   }
//
//   render () {
//     return (
//       <View style={Styles.container}>
//         <MapView
//           style={Styles.map}
//           initialRegion={this.state.region}
//           onRegionChangeComplete={this.onRegionChange}
//           showsUserLocation={this.state.showUserLocation}
//         >
//           {this.state.locations.map((location) => this.renderMapMarkers(location))}
//         </MapView>
//       </View>
//     )
//   }
// }
//
// const mapStateToProps = (state) => {
//   return {
//     // ...redux state to props here
//   }
// }
//
// export default connect(mapStateToProps)(MapviewExample)
