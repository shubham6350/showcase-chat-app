import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn_Screen from '../screens/SignUp_SignIn/SignIn_Screen';
import WelcomeUI from '../screens/Welcome_Screen/WelcomeUI';
import Profile_Screen from '../screens/Profile/profile';
import PLAuth from '../screens/phone_auth/otp_signin/phone_auth';
import VLotp from '../screens/phone_auth/otp_signin/otp_verify';
import VSotp from '../screens/phone_auth/otp_signup/otp_verify';
import PSAuth from '../screens/phone_auth/otp_signup/phone_auth';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome_Screen">
        <Stack.Screen
          name="Welcome_Screen"
          component={WelcomeUI}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignIn_Screen"
          component={SignIn_Screen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile_Screen}
          options={{
            headerShown: false,
          }}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigator;
