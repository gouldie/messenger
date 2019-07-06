/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    // alignItems: "center",
    backgroundColor: '#F5FCFF'
  },
  title: {
    textAlign: 'center',
    fontSize: 20
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 10
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 10,
    margin: 15,
    alignItems: 'center',
    height: 40
  },
  submitButtonText: {
    color: 'white'
  }
})

class SignIn extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Sign In
        </Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Username"
          placeholderTextColor="black"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="black"
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.login(this.state.email, this.state.password)}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default SignIn
