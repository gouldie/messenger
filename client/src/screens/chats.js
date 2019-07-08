import React, { Component } from 'react'
import { _ } from 'lodash'
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from 'react-native'
import ChatItem from '../components/chatItem'
import AsyncStorage from '@react-native-community/async-storage'
import { graphql, compose } from 'react-apollo'
import { SIGN_OUT, MY_CHATS } from '../graphql/user'
import gql from 'graphql-tag'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

// fake chat data
const fakeData = () => _.times(5, i => ({
  id: i,
  name: `Chat ${i}`
}))


class Chats extends Component {
  renderItem = ({ item }) => <ChatItem chat={item} goToChat={this.goToChat} />
  
  keyExtractor = item => item.id.toString()

  goToChat = (chat) => {
    this.props.navigation.navigate('Messages', { chatId: chat.id, title: chat.name })
  }

  signOut = () => {
    this.props.signOut()
      .then(async res => {
        await AsyncStorage.removeItem('cookie')
        this.props.navigation.navigate('AuthLoading')
      })
      .catch(async err => {
        await AsyncStorage.removeItem('cookie')
        this.props.navigation.navigate('AuthLoading')
      })
  }
  
  render() {
    const { data: { loading, me } } = this.props

    return (
      <View style={styles.container}>
        {
          loading ? 
          <View style={styles.loaderContainer}>
            <ActivityIndicator />
          </View> 
          : 
          <View>
            <FlatList 
              data={me.chats}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={this.signOut}
            >
              <Text style={styles.submitButtonText}>Sign out</Text>
            </TouchableOpacity>
          </View>
        }
        
      </View>
    )
  }
}

const signOutQuery = graphql(SIGN_OUT, {
  props: ({ ownProps, mutate }) => ({
    signOut: () => mutate()
  })
})

const myChats = graphql(MY_CHATS)

export default compose(
  signOutQuery,
  myChats
)(Chats)