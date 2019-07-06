import React, { Component } from 'react'
import { _ } from 'lodash'
import {
  FlatList,
  StyleSheet,
  View
} from 'react-native'
import ChatItem from '../components/chatItem'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
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
  
  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={fakeData()}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

export default Chats
