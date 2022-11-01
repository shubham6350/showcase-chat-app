import React, { useEffect } from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import WelcomeUI from './src/screens/WelcomeUI';

import SplashScreen from 'react-native-splash-screen';
import VSotp from './src/screens/phone_auth/otp_signup/otp_verify';
import VLotp from './src/screens/phone_auth/otp_signin/otp_verify';
import PSAuth from './src/screens/phone_auth/otp_signup/phone_auth';
import PLAuth from './src/screens/phone_auth/otp_signin/phone_auth';
import PhoneSignIn from './src/screens/Welcome_screen';
import StackNavigator from './StackNavigation';

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
      {/* <WelcomeUI /> */}
      {/* <VSotp /> */}
      {/* <VLotp /> */}
      {/* <PSAuth /> */}
      {/* <PLAuth /> */}
      {/* <PhoneSignIn /> */}
      <StackNavigator />
    </>
  );
};

export default App;
