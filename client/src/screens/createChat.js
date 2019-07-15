import React, { Component } from 'react'
import {
  FlatList,
  View,
  CheckBox,
  Text,
  TouchableOpacity
} from 'react-native'
import { USERS } from '../graphql/user'
import { Query, Mutation } from 'react-apollo'
import randomcolor from 'randomcolor'
import UserProfileImage from '../components/userProfileImage'
import ActionButton from 'react-native-action-button'
import { START_CHAT } from '../graphql/chat'
import { GET_CHATS } from '../graphql/chat'

const styles = {
  container: {
    height: '100%',
    flex: 1
  },
  selectedContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
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

const UserItem = ({ user, toggleUser }) => (
  <TouchableOpacity key={user.id} onPress={() => toggleUser(user)} >
    <View style={styles.userItemContainer}>
      <UserProfileImage user={user} />
      <View style={styles.userInfoContainer}>
        <Text style={styles.username}>{user.username}</Text>
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

  toggleUser = (user) => {
    const newSelected = this.state.selected

    if (!newSelected.find(e => user.id === e.id)) {
      newSelected.push(user)
    } else {
      const index = newSelected.indexOf(newSelected.find(e => user.id === e.id))
      newSelected.splice(index, 1)
    }

    this.setState({ selected: newSelected })
  }

  render () {
    const { selected } = this.state

    return (
    <Query query={USERS}>
      {({ loading, error, data }) => {
        if (error) return <Text>error</Text>
        if (loading || !data) return <Text>loading</Text>

        return (
          <View style={styles.container}>
            {
              selected.length > 0 &&
              <View style={styles.selectedContainer}>
                {
                  selected.map((e, i) => 
                    <UserProfileImage key={i} user={e} onPress={() => this.toggleUser(e)} />
                  )
                }
              </View>
            }
            <FlatList
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              style={{flex: 1}}
              data={data.users}
            />
            <Mutation 
              mutation={START_CHAT} 
              onCompleted={() => this.props.navigation.navigate('Home')}
              update={(cache, { data: { startChat } }) => {
                const { chats } = cache.readQuery({ query: GET_CHATS })
                cache.writeQuery({
                  query: GET_CHATS,
                  data: { chats: chats.concat(startChat) }
                })
              }}
            >
              {startChat => (
                <ActionButton 
                  buttonColor="green" 
                  onPress={() => startChat({ variables: { title: 'testtitle', userIds: selected.map(e => e.id) } })} 
                />
              )}
            </Mutation>
          </View>
          
        )
      }}
    </Query>
    )
  }
}

export default CreateChat
