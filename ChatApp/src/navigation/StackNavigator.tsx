import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn_Screen from '../screens/SignUp_SignIn/SignIn_Screen';
import WelcomeUI from '../screens/Welcome_Screen/WelcomeUI';
import Profile_Screen from '../screens/Profile/profile';
const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn_Screen">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigator;
