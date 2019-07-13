import React, { Component } from 'react'
import { _ } from 'lodash'
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView
} from 'react-native'
import ChatItem from '../components/chatItem'
import AsyncStorage from '@react-native-community/async-storage'
import { graphql, compose } from 'react-apollo'
import { SIGN_OUT, MY_CHATS } from '../graphql/user'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'

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
const fakeData = () => _.times(50, i => ({
  id: String(i),
  title: `Chat ${i}`
}))

class Chats extends Component {
  static navigationOptions = {
    title: 'Chats',
    headerRight: <Text>=</Text>
  }

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
      loading ?
      <View style={styles.loaderContainer}>
        <ActivityIndicator />
      </View> 
      :
      <View>
        <ScrollView style={{ width: '100%', height: '100%' }}>
          <FlatList
            style={{flex: 1}}
            data={fakeData()}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </ScrollView>
        <ActionButton buttonColor="green" onPress={() => console.log('asd')} />
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