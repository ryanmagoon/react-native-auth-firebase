import React, { Component } from 'react'
import { View } from 'react-native'
import firebase from 'firebase'
import { Button, Header, Spinner, CardSection } from './components/common'
import LoginForm from './components/LoginForm'

class App extends Component {
  state = { loggedIn: null }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCCctP8ySsQUmGctUIV18mh1qfwYy4F1kM',
      authDomain: 'auth-144d9.firebaseapp.com',
      databaseURL: 'https://auth-144d9.firebaseio.com',
      projectId: 'auth-144d9',
      storageBucket: 'auth-144d9.appspot.com',
      messagingSenderId: '352033082905'
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
          </CardSection>
        )
      case false:
        return <LoginForm />
      default:
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Spinner size="large" />
          </View>
        )
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    )
  }
}

export default App
