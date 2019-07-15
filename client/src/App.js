/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createHttpLink } from 'apollo-link-http'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ReduxLink from 'apollo-link-redux'
import { onError } from 'apollo-link-error'
import Navigator from './navigation'
import AsyncStorage from '@react-native-community/async-storage'
import { setContext } from 'apollo-link-context'
import { StatusBar } from 'react-native'

const URL = '192.168.0.20:8080'

function testReducer (state = {}, action) {
  switch (action.type) {
    default:
      return state
  }
}

const store = createStore(
  combineReducers({
    test: testReducer
  }),
  {}, // initial state
  composeWithDevTools()
)

const cache = new InMemoryCache()

const asyncAuthLink = setContext(async request => {
  const cookie = await AsyncStorage.getItem('cookie')

  return {
    headers: {
      cookie
    }
  }
})

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map(response => {
    const context = operation.getContext()
    const { response: { headers } } = context

    if (headers.map['set-cookie']) {
      AsyncStorage.setItem('cookie', headers.map['set-cookie']) // TODO: this works, but should be async
    } else {
      AsyncStorage.removeItem('cookie')
    }
    return response
  })
)

const reduxLink = new ReduxLink(store)
const errorLink = onError(errors => {
  console.log(errors)
})
const httpLink = createHttpLink({ uri: `http://${URL}/graphql` })
const link = ApolloLink.from([
  asyncAuthLink,
  reduxLink,
  errorLink,
  afterwareLink,
  httpLink
])

export const client = new ApolloClient({
  link,
  cache
})

export default class App extends Component {
  render () {
    console.log('render')
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <StatusBar
            backgroundColor="#061"
            barStyle="light-content"
          />
          <Navigator />
        </Provider>
      </ApolloProvider>
    )
  }
}
