import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './Components/Common';
import LoginForm from './Components/LoginForm';


class App extends Component {
  state = { loggedIn: null};

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDMZhziZ7tPRybrzAydQrpQl_6Z2_Ktql8',
      authDomain: 'authentication-b27a7.firebaseapp.com',
      databaseURL: 'https://authentication-b27a7.firebaseio.com',
      projectId: 'authentication-b27a7',
      storageBucket: 'authentication-b27a7.appspot.com',
      messagingSenderId: '192311285438'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }


  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
