import React, { Component } from 'react'
import { _ } from 'lodash'
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView
} from 'react-native'
import ChatItem from '../components/chatItem'
import ActionButton from 'react-native-action-button'
import { Query } from 'react-apollo'
import { GET_CHATS } from '../graphql/chat'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

// fake chat data
const fakeData = () => _.times(50, i => ({
  id: String(i),
  title: `Chat ${i}`
}))

class Chats extends Component {
  static navigationOptions = {
    title: 'Chats',
    headerRight: <Text>=</Text>
  }

  renderItem = ({ item }) => <ChatItem chat={item} goToChat={this.goToChat} />
  
  keyExtractor = item => item.id.toString()

  goToChat = (chat) => {
    this.props.navigation.navigate('Messages', { chatId: chat.id, title: chat.name })
  }

  // signOut = () => {
  //   this.props.signOut()
  //     .then(async res => {
  //       await AsyncStorage.removeItem('cookie')
  //       this.props.navigation.navigate('AuthLoading')
  //     })
  //     .catch(async err => {
  //       await AsyncStorage.removeItem('cookie')
  //       this.props.navigation.navigate('AuthLoading')
  //     })
  // }
  
  render() {
    return (
      <Query query={GET_CHATS}>
        {({ loading, error, data }) => {
          if (error) return <Text>error</Text>
          if (loading) return (
            <View style={styles.loaderContainer}>
              <ActivityIndicator />
            </View>
          )
          return (
            <View>
              <ScrollView style={{ width: '100%', height: '100%' }}>
                <FlatList
                  style={{flex: 1}}
                  data={data.chats}
                  renderItem={this.renderItem}
                  keyExtractor={this.keyExtractor}
                />
              </ScrollView>
              <ActionButton buttonColor="green" onPress={() => this.props.navigation.navigate('CreateChat')} />
            </View>
          )
        }}
      </Query>
    )
  }
}

export default Chats