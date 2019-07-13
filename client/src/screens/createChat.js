import React, { Component } from 'react'
import {
  FlatList,
  View,
  CheckBox,
  Text,
  TouchableOpacity
} from 'react-native'
import { USERS } from '../graphql/user'
import { Query } from 'react-apollo'
import randomcolor from 'randomcolor'

const styles = {
  userItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20, 
    paddingVertical: 10,
    alignItems: 'center'
  },
  userImageContainer: {
    paddingRight: 15
  },
  userImage: {
    width: 40, 
    height: 40, 
    backgroundColor: randomcolor(), 
    borderRadius: 50
  },
  userInfoContainer: {
    flex: 1, 
    flexDirection: 'column'
  },
  username: {
    fontWeight: 'bold', 
    marginBottom: 2
  }
}

const UserItem = ({ user: { id, username }, toggleUser }) => (
  <TouchableOpacity key={id} onPress={() => toggleUser(id)} >
    <View style={styles.userItemContainer}>
      <View style={styles.userImageContainer}>
        <View style={styles.userImage}></View>
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.username}>{username}</Text>
        <Text>example status</Text>
      </View>
    </View>
  </TouchableOpacity>
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
