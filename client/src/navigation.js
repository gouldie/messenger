import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { NavigationActions, StackActions, addNavigationHelpers, createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import { Text, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  tabText: {
    color: '#777',
    fontSize: 10,
    justifyContent: 'center'
  },
  selected: {
    color: 'blue'
  }
})

const TestScreen = title => () => (
  <View style={styles.container}>
    <Text>
      {title}
    </Text>
  </View>
)

// Tab Navigator
const TabNav = createBottomTabNavigator({
  Chats: { screen: TestScreen('Chats') },
  Settings: { screen: TestScreen('Settings') }
}, {
  initialRouteName: 'Chats'
})

// Stack Navigator
const StackNav = createStackNavigator({
  Main: { screen: TabNav }
})

// Reducer
const initialState = StackNav.router.getStateForAction(StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({
      routeName: 'Main'
    })
  ]
}))

export const navigationReducer = (state = initialState, action) => {
  const nextState = StackNav.router.getStateForAction(action, state)

  return nextState || state
}

export const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
)
const addListener = createReduxContainer('root')

class Navigator extends Component {
  render () {
    return (
      <StackNav navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener
      })} />
    )
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})

export default connect(mapStateToProps)(Navigator)
