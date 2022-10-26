import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class App extends Component {
  render() {
    return (
      <>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Welcome To ChatApp!</Text>
        </View>
      </>
    );
  }
}

export default App;
