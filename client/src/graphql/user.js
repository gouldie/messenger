import gql from 'graphql-tag'

export const SIGN_IN = gql`
  mutation($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      id
    }
  }
`

export const SIGN_OUT = gql`
  mutation {
    signOut
  }
`

export const MY_CHATS = gql`
  query {
    me {
      id
    }
  }
`
