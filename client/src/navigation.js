/* eslint-disable no-unused-vars */
import React from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
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
const TabNavigator = createBottomTabNavigator({
  Chats: { screen: TestScreen('Chats') },
  Settings: { screen: TestScreen('Settings') }
})

export default createAppContainer(TabNavigator)
