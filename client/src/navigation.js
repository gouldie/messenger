/* eslint-disable no-unused-vars */
import React from 'react'
import { createBottomTabNavigator, createAppContainer, createStackNavigator,
  createSwitchNavigator, createDrawerNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native'
import Chats from './screens/chats'
import Messages from './screens/messages'
import AuthLoading from './screens/authLoading'
import SignIn from './screens/signIn'
import CreateChat from './screens/createChat'
import { withCollapsibleForTab } from 'react-navigation-collapsible'

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

const navigatorConfig = {
  defaultNavigationOptions: {
    headerStyle: { backgroundColor: '#061', borderBottomColor: 'transparent', borderBottomWidth: 0, elevation: 0 },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white'
  }
}

const tabNavigatorConfig = {
  animationEnabled: true,
  defaultNavigationOptions: {
    tabBarOptions: {
      indicatorStyle: { backgroundColor: 'white' },
      style: { borderTopColor: 'transparent', borderTopWidth: 0, elevation: 0, backgroundColor: '#061' }
    }
  }
}

const TestScreen = title => (props) => {
  return (
    <View style={styles.container}>
      <Text>
        {title}
      </Text>
    </View>
  )
}

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
    }, tabNavigatorConfig),
    navigationOptions: ({ navigation }) => ({
      title: 'WhatsApp',
      headerBackTitle: null,
      headerRight: <Text style={{ color: 'white', fontSize: 30, paddingRight: 15 }}
        onPress={() => navigation.navigate('Settings')}>=</Text>
    })
  },
  Messages: { screen: Messages },
  CreateChat: { screen: CreateChat },
  Settings: createStackNavigator({
    Settings: { screen: TestScreen('Settings') }
  })
}, navigatorConfig)

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
