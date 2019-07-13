import React, { Component } from 'react'
import {
  StyleSheet,
  FlatList,
  Animated
} from 'react-native'
import ChatItem from './chatItem'

// fake chat data
const fakeData = () => _.times(50, i => ({
  id: String(i),
  title: `Chat ${i}`
}))

class ChatList extends Component {
  renderItem = ({ item }) => <ChatItem chat={item} goToChat={this.goToChat} />
  
  keyExtractor = item => item.id.toString()

  goToChat = (chat) => {
    this.props.navigation.navigate('Messages', { chatId: chat.id, title: chat.name })
  }

  render () {
    const { data: { loading, me } } = this.props

    return (
      <FlatList
        data={fakeData()}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    )
  }
}

export default ChatList
