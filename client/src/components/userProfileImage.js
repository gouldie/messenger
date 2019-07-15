/* eslint-disable no-unused-vars */
import { View, Text } from 'react-native'
import randomcolor from 'randomcolor'
import React from 'react'

const styles = {
  userImageContainer: {
    paddingRight: 15
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default ({ user }) => (
  <View key={user.id} style={styles.userImageContainer}>
    <View style={{ ...styles.userImage, backgroundColor: randomcolor({ seed: user.id, luminosity: 'dark' }) }}>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>{user.username.charAt(0).toUpperCase()}</Text>
    </View>
  </View>
)
