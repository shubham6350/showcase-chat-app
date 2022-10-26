import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { useColorScheme } from 'react-native';
// import {
//   DefaultTheme,
//   DarkTheme,
// } from '@react-navigation/native';
import { COLORS } from './assets/colors/colors';


// const MyTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: COLORS.MAIN_PRIMARY,
//   },
// };

export class App extends Component {
  
  render() {
    return (
      <>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontFamily: 'Urbanist-Regular'}}>Welcome To ChatApp!</Text>
          <Text style={{fontFamily: 'Urbanist-Medium'}}>Welcome To ChatApp!</Text>
          <Text style={{fontFamily: 'Urbanist-Bold'}}>Welcome To ChatApp!</Text>
        </View>
      </>
    );
  }
}

export default App;

