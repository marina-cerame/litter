// @flow

import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
// import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import CustomNavBar from '../Navigation/CustomNavBar'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen';
import AllComponentsScreen from '../Containers/AllComponentsScreen';
import UsageExamplesScreen from '../Containers/UsageExamplesScreen';
import ListviewExample from '../Containers/ListviewExample';
import ListviewGridExample from '../Containers/ListviewGridExample';
import ListviewSectionsExample from '../Containers/ListviewSectionsExample';
import ListviewSearchingExample from '../Containers/ListviewSearchingExample';
import MapviewExample from '../Containers/MapviewExample';
import ThemeScreen from '../Containers/ThemeScreen';
import Loader from '../Containers/Loader';
import Signup from '../Containers/Signup';
import Login from '../Containers/Login';
import Collection from '../Containers/Collection';


/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' /*component={NavigationDrawer}*/ open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            {/* prebuilt react stuff i'm afraid to touch: */}
            <Scene initail key='loader' component={Loader} title='' />
            <Scene key='componentExamples' component={AllComponentsScreen} title='Drop Litter' />
            <Scene key='mapviewExample' component={MapviewExample} title='Litter' />
            <Scene key='usageExamples' component={UsageExamplesScreen} title='Usage' rightTitle='Example' onRight={() => window.alert('Example Pressed')} />
            <Scene key='listviewExample' component={ListviewExample} title='Listview Example' />
            <Scene key='listviewGridExample' component={ListviewGridExample} title='Listview Grid' />
            <Scene key='listviewSectionsExample' component={ListviewSectionsExample} title='Listview Sections' />
            <Scene key='listviewSearchingExample' component={ListviewSearchingExample} title='Listview Searching' navBar={CustomNavBar} />
            <Scene key='theme' component={ThemeScreen} title='Theme' />
            {/* actual stuff we use:  */}
            <Scene key='signup' component={Signup} title='Sign Up' />
            <Scene key='login' component={Login} title='Log In' />
            <Scene key='presentationScreen' component={PresentationScreen} title='Litter' renderLeftButton={NavItems.hamburgerButton} />
            <Scene key='collection' component={Collection} title='Your Collection' />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
