import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn_Screen from './src/screens/SignUp_SignIn/SignIn_Screen';
import WelcomeUI from './src/screens/Welcome_Screen/WelcomeUI';
import Profile_Screen from './src/screens/Profile/profile';
import PLAuth from './src/screens/phone_auth/otp_signin/phone_auth';
import VLotp from './src/screens/phone_auth/otp_signin/otp_verify';
import VSotp from './src/screens/phone_auth/otp_signup/otp_verify';
import PSAuth from './src/screens/phone_auth/otp_signup/phone_auth';
import Profile_Update from './src/screens/Profile_update/profile';
import StatusP from './src/screens/status/StatusP';
import StatusNew from './src/screens/status/StatusNew';
// import StarMessages from './src/cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Messages/CometChatMessages/starMessages';
import {
  CometChatUI,
  CometChatMessages,
  CometChatUserListWithMessages,
  CometChatUserList,
  CometChatGroupListWithMessages,
  CometChatGroupList,
  CometChatConversationListWithMessages,
  CometChatConversationList,
  CometChatSearchListWithMessages,
  StarMessages,
} from './src/cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/index';
// import {CometChatUserDetails1} from './src/cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Users/CometChatUserDetails/index2'
import { CometChatUserDetails1 } from './src/cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Users';
import { connect } from 'react-redux';
import { EventRegister } from 'react-native-event-listeners';
import { CometChatCreateGroup } from './src/cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Groups';
import { StatusBar } from 'react-native';
import Status from './src/cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Status/CometChatStatus';

import CameraIntegration from './src/cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Status/CameraIntegration';
const Stack = createNativeStackNavigator();
const StackNavigator = (props) => {
  //set theme
  {
    props.theme === 'dark'
      ? EventRegister.emit('changeTheme', true)
      : EventRegister.emit('changeTheme', false);
  }
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#246BFD" barStyle="dark-content" />
      <Stack.Navigator
        headerMode="none"
        initialRouteName={props.isLoggedIn ? 'Chat' : 'Welcome_Screen'}
      >
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
          name="Profile_Update"
          component={Profile_Update}
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
          name="StatusP"
          component={StatusP}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Chat"
          component={CometChatUI}
          options={{
            headerShown: false,
            // headerShown: true,
            // headerStyle: {
            //   backgroundColor: "#246BFD",
            // }
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
          name="SUsers"
          component={CometChatSearchListWithMessages}
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
          name="CometChatUserDoc"
          component={CometChatUserDetails1}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Star"
          component={StarMessages}
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
        <Stack.Screen
          name="Camera"
          component={CameraIntegration}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Status"
          component={Status}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StatusNew"
          component={StatusNew}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const mapStateToProps = ({ reducer }) => {
  return {
    loading: reducer.loading,
    error: reducer.error,
    isLoggedIn: reducer.isLoggedIn,
    theme: reducer.theme,
  };
};
export default connect(mapStateToProps)(StackNavigator);
