/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SIGN_IN } from '../graphql/user'
import { graphql } from 'react-apollo'
import AsyncStorage from '@react-native-community/async-storage'

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
  },
  errorText: {
    paddingHorizontal: 15,
    color: 'red'
  }
})

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      username: null,
      password: null,
      errors: []
    }
  }

  onChangeUsername = (e) => {
    this.setState({ username: e })
  }

  onChangePassword = (e) => {
    this.setState({ password: e })
  }

  login = () => {
    this.props.mutate({
      variables: { username: this.state.username, password: this.state.password }
    })
    .then(res => {
      this.props.navigation.navigate('AuthLoading')
    })
    .catch(err => {
      console.log('err', err)
      const errors = err.graphQLErrors.map(error => error.message)
      this.setState({ errors })
    })
  }

  render () {
    const { errors } = this.state

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
          onChangeText={this.onChangeUsername}
          value={this.state.username}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="black"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={this.onChangePassword}
          value={this.state.password}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.login}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>{errors[0]}</Text>
      </View>
    )
  }
}

export default graphql(SIGN_IN)(SignIn)
