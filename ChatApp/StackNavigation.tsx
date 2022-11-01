import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PLAuth from './src/screens/phone_auth/otp_signin/phone_auth';
import VLotp from './src/screens/phone_auth/otp_signin/otp_verify';
import WelcomeUI from './src/screens/WelcomeUI';
import VSotp from './src/screens/phone_auth/otp_signup/otp_verify';
import PSAuth from './src/screens/phone_auth/otp_signup/phone_auth';
const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={PLAuth}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VLotp"
          component={VLotp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={PSAuth}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VSotp"
          component={VSotp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Welcome_Screen"
          component={WelcomeUI}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigator;