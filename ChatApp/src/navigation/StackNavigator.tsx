import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn_Screen from '../screens/SignUp_SignIn/SignIn_Screen';
import WelcomeUI from '../screens/Welcome_Screen/WelcomeUI';
import Welcome_screen from '../screens/Welcome_screen';
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
          name="Welcome"
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
