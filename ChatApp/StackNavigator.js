import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn_Screen from './src/screens/SignUp_SignIn/SignIn_Screen';
import WelcomeUI from './src/screens/Welcome_Screen/WelcomeUI';
import Profile_Screen from './src/screens/Profile/profile';
import PLAuth from './src/screens/phone_auth/otp_signin/phone_auth';
import VLotp from './src/screens/phone_auth/otp_signin/otp_verify';
import VSotp from './src/screens/phone_auth/otp_signup/otp_verify';
import PSAuth from './src/screens/phone_auth/otp_signup/phone_auth';
import {
  CometChatUI,
  CometChatMessages,
  CometChatUserListWithMessages,
  CometChatUserList,
  CometChatGroupListWithMessages,
  CometChatGroupList,
  CometChatConversationListWithMessages,
  CometChatConversationList,
} from './src/cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/index';
import { connect } from 'react-redux';
import { CometChatCreateGroup } from './src/cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Groups';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

const StackNavigator = (props) => {
  return (
    <NavigationContainer>
      <StatusBar
      backgroundColor="#246BFD"
      barStyle="dark-content"
      />
      <Stack.Navigator headerMode="none" initialRouteName={props.isLoggedIn ? 'Chat' : 'Welcome_Screen'}>
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
        <Stack.Screen
          name="Chat"
          component={CometChatUI}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Conversation"
          component={CometChatConversationListWithMessages}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ConversationComponent"
          component={CometChatConversationList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Group"
          component={CometChatGroupListWithMessages}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GroupComponent"
          component={CometChatGroupList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Users"
          component={CometChatUserListWithMessages}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UsersComponent"
          component={CometChatUserList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CometChatMessages"
          component={CometChatMessages}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
         name="Create_Group" 
         component={CometChatCreateGroup}
         options={{
          headerShown: false,
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = ({reducer}) => {
  return {
    loading: reducer.loading,
    error: reducer.error,
    isLoggedIn: reducer.isLoggedIn,
  };
};
export default connect(mapStateToProps)(StackNavigator);
