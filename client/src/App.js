import React, { Component } from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider, createNetworkIntereface } from 'react-apollo'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createHttpLink } from 'apollo-link-http'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { ReduxCache, apolloReducer } from 'apollo-cache-redux'
import ReduxLink from 'apollo-link-redux'
import { onError } from 'apollo-link-error'
import Navigator from './navigation'
import AsyncStorage from '@react-native-community/async-storage'
import { setContext } from 'apollo-link-context'

const URL = 'localhost:8080'

const store = createStore(
  combineReducers({
    apollo: apolloReducer
  }),
  {}, // initial state
  composeWithDevTools()
)

const cache = new ReduxCache({ store })

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map(response => {
    const context = operation.getContext()
    const { response: { headers } } = context

    if (headers.map['set-cookie']) {
      AsyncStorage.setItem('cookie', headers.map['set-cookie'])
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
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Navigator />
        </Provider>
      </ApolloProvider>
    )
  }
}
