/* eslint-disable no-unused-vars */
import React from 'react'
import { createBottomTabNavigator, createAppContainer, createStackNavigator,
  createSwitchNavigator, createDrawerNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native'
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

const TestScreen = title => (props) => {
  return (
    <View style={styles.container}>
      <Text>
        {title}
      </Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Settings')}
      >
        <Text>Settings</Text>
      </TouchableOpacity>
    </View>
  )
}

// const HomeComponent = createBottomTabNavigator({
//   Chats: { screen: Chats },
//   Status: { screen: TestScreen('Status') },
//   Calls: { screen: TestScreen('Calls') }
// })

const AppStack = createStackNavigator({
  Home: {
    screen: createMaterialTopTabNavigator({
      Home: {
        screen: Chats,
        navigationOptions: ({ navigation }) => ({
          title: 'Chats'
        })
      },
      Status: {
        screen: TestScreen('Status'),
        navigationOptions: ({ navigation }) => ({
          title: 'Status'
        })
      },
      Calls: {
        screen: TestScreen('Calls'),
        navigationOptions: ({ navigation }) => ({
          title: 'Calls'
        })
      }
    }),
    navigationOptions: ({ navigation }) => ({
      title: 'WhatsApp',
      headerRight: <Button title='=' onPress={() => navigation.navigate('Settings')} />
    })
  },
  Messages: { screen: Messages },
  Settings: createStackNavigator({
    Settings: { screen: TestScreen('Settings') }
  })
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
