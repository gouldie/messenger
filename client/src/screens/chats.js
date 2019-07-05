import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { _ } from 'lodash'
import {
  FlatList,
  StyleSheet,
  TouchableHighlight,
  View,
  Text
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  chatContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 3,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  chatName: {
    fontWeight: 'bold',
    flex: 0.7
  }
})

// fake chat data
const fakeData = () => _.times(5, i => ({
  id: i,
  name: `Chat ${i}`
}))

class Chat extends Component {
  render () {
    const { id, name } = this.props.chat

    return (
      <TouchableHighlight key={id} onPress={this.props.goToChat}>
        <View style={styles.chatContainer}>
          <Text style={styles.chatName}>
            {name}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

Chat.propTypes = {
  goToChat: PropTypes.func.isRequired,
  chat: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })
}

class Chats extends Component {
  renderItem = ({ item }) => <Chat chat={item} goToChat={this.goToChat} />
  
  keyExtractor = item => item.id.toString()

  goToChat = (chat) => {
    this.props.navigation.navigate('Chat', { chatId: chat.id, title: chat.name })
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
