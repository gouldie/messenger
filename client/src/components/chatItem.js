/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native'
import UserProfileImage from './userProfileImage'

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
    const { id, title, users } = this.props.chat
    const { userId } = this.props

    const otherUser = users.find(u => u.id !== userId)

    return (
      <TouchableOpacity key={id} onPress={() => this.props.goToChat(this.props.chat)}>
        <View style={styles.chatContainer}>
          <UserProfileImage user={otherUser} />
          <Text style={styles.chatName}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

ChatItem.propTypes = {
  goToChat: PropTypes.func.isRequired,
  chat: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string
  })
}

export default ChatItem
