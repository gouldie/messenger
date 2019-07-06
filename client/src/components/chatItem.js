/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
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

class ChatItem extends Component {
  render () {
    const { id, name } = this.props.chat

    return (
      <TouchableHighlight key={id} onPress={() => this.props.goToChat(this.props.chat)}>
        <View style={styles.chatContainer}>
          <Text style={styles.chatName}>
            {name}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

ChatItem.propTypes = {
  goToChat: PropTypes.func.isRequired,
  chat: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })
}

export default ChatItem
