import React, { Component } from 'react'
import { _ } from 'lodash'
import {
  FlatList,
  View
} from 'react-native'
import randomColor from 'randomcolor'
import Message from '../components/message'

const styles = {
  container: {
    alignItems: 'stretch',
    backgroundColor: '#e5ddd5',
    flex: 1,
    flexDirection: 'column'
  }
}

const fakeData = () => _.times(5, i => ({
  color: randomColor(),
  isCurrentUser: i % 3 === 0,
  message: {
    id: i,
    createdAt: new Date().toISOString(),
    text: `Message ${i}`,
    from: `Username ${i}`
  }
}))

class Messages extends Component {
  keyExtractor = item => item.message.id.toString()

  renderItem = ({ item: { isCurrentUser, message, color } }) => (
    <Message
      color={color}
      message={message}
      isCurrentUser={isCurrentUser}
    />
  )

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

export default Messages