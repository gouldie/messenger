/* eslint-disable no-unused-vars */
import { View, Text, TouchableOpacity } from 'react-native'
import randomcolor from 'randomcolor'
import React from 'react'

const styles = {
  userImageContainer: {
    paddingRight: 15
  },
  userImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  onPress: {
    borderRadius: 50,
    width: 20,
    height: 20,
    backgroundColor: 'grey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },
  onPressText: {
    color: 'white'
  }
}

export default ({ user, onPress }) => (
  <View key={user.id} style={styles.userImageContainer}>
    <TouchableOpacity
      style={{ ...styles.userImage, zIndex: -100, backgroundColor: randomcolor({ seed: user.id, luminosity: 'dark' }) }}
      onPress={() => onPress && onPress()}
      disabled={!onPress}
    >
      {
        onPress &&
        <View style={{ alignSelf: 'flex-end' }}><Text></Text></View>
      }
      <Text style={{ color: 'white', fontWeight: 'bold' }}>{user.username.charAt(0).toUpperCase()}</Text>
      {
        onPress &&
        <View style={styles.onPress}>
          <Text style={styles.onPressText}>X</Text>
        </View>
      }
    </TouchableOpacity>
  </View>
)
