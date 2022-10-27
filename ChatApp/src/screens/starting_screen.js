import Splash_Screen from '../../splash_screen';
import App from '../../App';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

const Start = () => {
  const [User, setUser] = useState(true);
  setTimeout(() => {
    setUser(false);
  },5000);
  return <NavigationContainer>{User ? <Splash_Screen /> : <App />}</NavigationContainer>;
};
export default Start;
