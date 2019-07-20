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
import { Query, Mutation } from 'react-apollo'
import { GET_MESSAGES, SEND_MESSAGE } from '../graphql/message'
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
  constructor() {
    super()

    this.state = {
      message: null
    }
  }

  static navigationOptions = {
    title: 'Messages'
  }

  keyExtractor = message => message.id.toString()

  renderItem = ({ item }) => (
    <Message
      message={item}
    />
  )

  onChangeMessage = (e) => {
    this.setState({ message: e })
  }

  clearMessage = () => {
    this.setState({ message: null })
  }

  render() {
    const { message } = this.state
    const { chatId } = this.props.navigation.state.params

    return (
      <Query query={GET_MESSAGES} variables={{ chatId }}>
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
                data={data.messages.reverse()}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                inverted={-1}
              />
              <View style={styles.messageContainer}>
                <TextInput style={styles.textInput} onChangeText={this.onChangeMessage} value={message} />
                <Mutation mutation={SEND_MESSAGE} onCompleted={this.clearMessage}>
                  {
                    sendMessage => (
                      <TouchableOpacity 
                        style={styles.sendButton} 
                        onPress={() => sendMessage({ variables: { body: message, chatId } })}>
                        <FontAwesomeIcon icon={ faStepForward } color='white' />
                      </TouchableOpacity>
                    )
                  }
                </Mutation>
              </View>
            </View>
          )
        }}
      </Query>
    )
  }
}

export default Messages