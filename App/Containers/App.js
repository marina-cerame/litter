// @flow

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import '../I18n/I18n' // keep before root container
import * as firebase from "firebase"
import RootContainer from './RootContainer'
import createStore from '../Redux'
import applyConfigSettings from '../Config'

// Apply config overrides
applyConfigSettings()
// create our store
const store = createStore()

const firebaseConfig = {
  apiKey: "AIzaSyCNZ_Lg37shj8__EBvgkW8HmzQOKehMeOM",
  authDomain: "litter-5a23e.firebaseapp.com",
  databaseURL: "https://litter-5a23e.firebaseio.com",
  storageBucket: "litter-5a23e.appspot.com"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

var database = firebase.database();

function addLitter(litterId, text, longitude, latitude) {
  firebase.database().ref('litter/' + litterId).push({
    text: this.inputText,
    longitude: location.longitude,
    latitude : location.latitude
  });
}

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default App
