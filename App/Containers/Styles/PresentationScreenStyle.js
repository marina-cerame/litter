// @flow

import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

var { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    height: (height * .7),
    width: width,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  }
})
