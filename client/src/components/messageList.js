/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { MESSAGE_SENT } from '../graphql/message'
import { sortByDate } from '../utils'

class MessageList extends Component {
  componentDidMount () {
    this.props.subscribeToMore({
      document: MESSAGE_SENT,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        return {
          messages: [
            ...prev.messages,
            subscriptionData.data.messageSent
          ]
        }
      },
      onError: err => console.log('err', err)
    })
  }

  render () {
    const { data, renderItem, keyExtractor } = this.props

    data.messages.sort(sortByDate)

    return (
      <FlatList
        data={data.messages}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        inverted={-1}
      />
    )
  }
}

export default MessageList
