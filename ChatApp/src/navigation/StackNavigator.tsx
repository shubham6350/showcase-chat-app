import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn_Screen from '../screens/SignUp_SignIn/SignIn_Screen';
import WelcomeUI from '../screens/Welcome_Screen/WelcomeUI';
import Profile_Screen from '../screens/Profile/profile';
import Welcome_screen from '../screens/Welcome_screen';
const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome_Screen">
        <Stack.Screen
          name="SignIn_Screen"
          component={SignIn_Screen}
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
        <Stack.Screen
          name="Profile"
          component={Profile_Screen}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="Chat"
          component={Welcome_screen}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigator;
