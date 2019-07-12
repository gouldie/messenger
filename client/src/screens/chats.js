import React, { Component } from 'react'
import { _ } from 'lodash'
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Animated
} from 'react-native'
import ChatItem from '../components/chatItem'
import AsyncStorage from '@react-native-community/async-storage'
import { graphql, compose } from 'react-apollo'
import { SIGN_OUT, MY_CHATS } from '../graphql/user'
import { withCollapsibleForTabChild } from 'react-navigation-collapsible'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

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
    const { data: { loading, me }, collapsible: { onScroll, animatedY } } = this.props

    return (
      loading ?
      <View style={styles.loaderContainer}>
        <ActivityIndicator />
      </View> 
      :
      <AnimatedFlatList 
        style={{flex: 1}}
        data={fakeData()}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onScroll={onScroll} 
        _mustAddThis={animatedY}
      />
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
)(withCollapsibleForTabChild(Chats))