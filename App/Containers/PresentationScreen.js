// @flow

import React from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import CustomMap from './MapviewExample'
import BottomNav from './BottomNav'
// Styles
import styles from './Styles/PresentationScreenStyle'

export default class PresentationScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.clearLogo} style={styles.logo} />
            <CustomMap />
          </View>

          {/* <RoundedButton onPress={NavigationActions.login}>
            Drop Litter
          </RoundedButton> */}
          <BottomNav />
        </ScrollView>
      </View>
    )
  }
}


/*{ <RoundedButton onPress={NavigationActions.usageExamples}>
  Usage Examples Screen
</RoundedButton>

<RoundedButton onPress={NavigationActions.apiTesting}>
  API Testing Screen
</RoundedButton>

<RoundedButton onPress={NavigationActions.theme}>
  Theme Screen
</RoundedButton>

<RoundedButton onPress={NavigationActions.deviceInfo}>
  Device Info Screen
</RoundedButton> }*/

/*{ <View style={styles.centered}>
  <Text style={styles.subtitle}>Made with ❤️ by Infinite Red</Text>
</View> }*/
