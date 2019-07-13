import React, { Component } from 'react'
import {
  FlatList,
  View,
  CheckBox,
  Text,
  TouchableHighlight
} from 'react-native'
import { USERS } from '../graphql/user'
import { Query } from 'react-apollo'

const styles = {
  container: {
    alignItems: 'stretch',
    backgroundColor: '#e5ddd5',
    flex: 1,
    flexDirection: 'column'
  }
}

const UserItem = ({ user: { id, username }, toggleUser }) => (
  <TouchableHighlight key={id} onPress={() => toggleUser(id)}>
    <View>
      <Text>
        {username}
      </Text>
    </View>
  </TouchableHighlight>
)

class CreateChat extends Component {
  constructor() {
    super()

    this.state = {
      selected: []
    }
  }
  
  static navigationOptions = {
    title: 'Select users'
  }

  renderItem = ({ item }) => <UserItem user={item} toggleUser={this.toggleUser} />
  
  keyExtractor = item => item.id.toString()

  toggleUser = (id) => {
    console.log('toggle', id)
  }

  render () {
    return (
    <Query query={USERS}>
      {({ loading, error, data }) => {
        if (error) return <Text>error</Text>
        if (loading || !data) return <Text>loading</Text>

        return (
          <FlatList 
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            style={{flex: 1}}
            data={data.users}
          />
        )
      }}
    </Query>
    )
  }
}

export default CreateChat
