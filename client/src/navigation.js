/* eslint-disable no-unused-vars */
import React from 'react'
import { createBottomTabNavigator, createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import { Text, View, StyleSheet } from 'react-native'
import Chats from './screens/chats'
import Messages from './screens/messages'
import AuthLoading from './screens/authLoading'
import SignIn from './screens/signIn'

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

// App Navigator - each of these screens should have a didMount auth check
const AppStack = createStackNavigator({
  Chats: { screen: Chats },
  Messages: { screen: Messages },
  Settings: { screen: TestScreen('Settings') }
})

// Auth Navigator
const AuthStack = createStackNavigator({
  SignIn: { screen: SignIn }
})

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
))
