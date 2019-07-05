import React, { Component } from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createHttpLink } from 'apollo-link-http'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ReduxCache, apolloReducer } from 'apollo-cache-redux'
import ReduxLink from 'apollo-link-redux'
import { onError } from 'apollo-link-error'
import Navigator, { navigationReducer, navigationMiddleware } from './navigation'
import { Text, View } from 'react-native'

const URL = 'localhost:8080'

const store = createStore(
  combineReducers({
    apollo: apolloReducer
    // nav: navigationReducer
  }),
  {}, // initial state
  composeWithDevTools(
    // applyMiddleware(navigationMiddleware)
  )
)

const cache = new ReduxCache({ store })
const reduxLink = new ReduxLink(store)
const errorLink = onError(errors => {
  console.log(errors)
})
const httpLink = createHttpLink({ uri: `http://${URL}` })
const link = ApolloLink.from([
  reduxLink,
  errorLink,
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
