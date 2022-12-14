import React, { useEffect } from 'react';
import { Text, TextInput, View } from 'react-native';
import WelcomeUI from './src/screens/WelcomeUI';

import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <>
      {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> */}
        {/* <Splash_Screen /> */}
        {/* <Text>Welcome to ChatApp!</Text> */}
      {/* </View> */}
      <WelcomeUI />
    </>
  );
};

export default App;
