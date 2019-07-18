import moment from 'moment'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  message: {
    flex: 0.8,
    backgroundColor: 'white',
    borderRadius: 6,
    marginHorizontal: 16,
    marginVertical: 2,
    paddingHorizontal: 8,
    paddingVertical: 6,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1
    }
  },
  myMessage: {
    backgroundColor: '#dcf8c6'
  },
  messageUsername: {
    color: 'red',
    fontSize: 11,
    textAlign: 'right'
  },
  messageSpacer: {
    flex: 0.2
  }
})

class Message extends PureComponent {
  render () {
    const { message } = this.props

    return (
      <View key={message.id} style={styles.container}>
        {message.isCurrentUser ? <View style={styles.messageSpacer} /> : undefined }
        <View style={[styles.message, message.isCurrentUser && styles.myMessage]}>
          <Text style={[styles.messageUsername, { color: 'green' }]}>
            {message.from}
          </Text>
          <Text>{message.body}</Text>
          <Text>{moment(Number(message.createdAt)).format('h:mm A')}</Text>
        </View>
        {!message.isCurrentUser ? <View style={styles.messageSpacer} /> : undefined }
      </View>
    )
  }
}

Message.propTypes = {
  message: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
    isCurrentUser: PropTypes.bool.isRequired
  })
}

export default Message
