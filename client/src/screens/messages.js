import React, { Component } from 'react'
import { _ } from 'lodash'
import {
  FlatList,
  View,
  ActivityIndicator,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native'
import randomColor from 'randomcolor'
import Message from '../components/message'
import { Query } from 'react-apollo'
import { GET_MESSAGES } from '../graphql/message'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStepForward } from '@fortawesome/free-solid-svg-icons'

const styles = {
  container: {
    backgroundColor: '#e5ddd5',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  messageContainer: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'row', 
    padding: 8
  },
  textInput: {
    height: 40, 
    backgroundColor: 'white',
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 50,
    width: '80%',
    paddingLeft: 15
  },
  sendButton: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: 35, 
    height: 35,
    backgroundColor: 'green', 
    borderRadius: 50, 
    marginLeft: 5
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
              <View style={styles.messageContainer}>
                <TextInput style={styles.textInput} />
                <TouchableOpacity style={styles.sendButton}>
                  <FontAwesomeIcon icon={ faStepForward } color='white' />
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
      </Query>
    )
  }
}

export default Messages