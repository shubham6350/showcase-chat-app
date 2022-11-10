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
import { CometChatCreateGroup } from './src/cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Groups/index';

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
        <Stack.Screen
          name="Chat"
          component={CometChatUI}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Conversation" component={CometChatConversationListWithMessages} />
        <Stack.Screen name="ConversationComponent" component={CometChatConversationList} />
        <Stack.Screen name="Group" component={CometChatGroupListWithMessages} />
        <Stack.Screen name="GroupComponent" component={CometChatGroupList} />
        <Stack.Screen
          name="Users"
          component={CometChatUserListWithMessages}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Create_Group" component={CometChatCreateGroup} />
        <Stack.Screen
          name="UsersComponent"
          component={CometChatUserList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="CometChatMessages" component={CometChatMessages} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigator;
