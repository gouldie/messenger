/* eslint-disable no-unused-vars */
import React from 'react'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import { Text, View, StyleSheet } from 'react-native'
import Chats from './screens/chats'

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
const TabNavigator = createBottomTabNavigator({
  Chats: { screen: Chats },
  Settings: { screen: TestScreen('Settings') }
})

// Stack Navigator
const StackNavigator = createStackNavigator({
  Main: { screen: TabNavigator }
})

export default createAppContainer(StackNavigator)
