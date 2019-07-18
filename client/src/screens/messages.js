import React, { Component } from 'react'
import { _ } from 'lodash'
import {
  FlatList,
  View,
  ActivityIndicator,
  Text
} from 'react-native'
import randomColor from 'randomcolor'
import Message from '../components/message'
import { Query } from 'react-apollo'
import { GET_MESSAGES } from '../graphql/message'

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
  static navigationOptions = {
    title: 'Messages'
  }

  keyExtractor = message => message.id.toString()

  renderItem = ({ item }) => (
    <Message
      message={item}
    />
  )

  render() {
    return (
      <Query query={GET_MESSAGES} variables={{ chatId: this.props.navigation.state.params.chatId }}>
        {({ loading, error, data }) => {
          if (error) return <Text>error</Text>
          if (loading) return (
            <View style={styles.loaderContainer}>
              <ActivityIndicator />
            </View>
          )
          return (
            <View style={styles.container}>
              <FlatList 
                data={data.messages}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
              />
            </View>
          )
        }}
      </Query>
    )
  }
}

export default Messages