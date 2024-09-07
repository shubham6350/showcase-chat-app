import React, { useEffect, useState } from 'react';
import StackNavigator from './StackNavigator';
import SplashScreen from 'react-native-splash-screen';
import 'react-native-gesture-handler';
import { PermissionsAndroid, Platform, StyleSheet, Text } from 'react-native';
import { store, persistor } from './src/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { useDispatch } from 'react-redux';
import { COMETCHAT_CONSTANTS } from './src/CONSTS';
import { CometChatContext } from './src/cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/utils/CometChatContext';
// import theme from './src/cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/resources/theme';
import theme from 'react-native-elements/dist/config/theme';
import themee from './src/theme/theme';
import themeContext from './src/theme/themeContext';
import statusContext from './src/cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Status/statusContext';
import { EventRegister } from 'react-native-event-listeners';
import messaging from '@react-native-firebase/messaging';
import actions from './src/cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Messages/CometChatMessageActions/actions';
const styles = StyleSheet.create({
  defaultFontFamily: {
    fontFamily: theme.fontFamily,
  },
});
const customProps = { style: styles.defaultFontFamily };
function setDefaultFontFamily() {
  const TextRender = Text.render;
  const initialDefaultProps = Text.defaultProps;
  Text.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  Text.render = function render(props) {
    let oldProps = props;
    props = { ...props, style: [customProps.style, props.style] };
    try {
      return TextRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
}
const App = () => {
  const [mode, setMode] = useState(false);
  const [status, setStatus] = useState([]);
  useEffect(() => {
    let eventListener = EventRegister.addEventListener('changeTheme', (data) => {
      setMode(data);
      console.log(data);
    });
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  });

  useEffect(() => {
    let eventListener = EventRegister.addEventListener('changeStatus', (data) => {
      setStatus(data);
      console.log(status, 'status update recieved');
    });
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  });

  useEffect(() => {
    let eventListener = EventRegister.addEventListener('updateStatus', (data) => {
      status.push(data);
      console.log(status, 'status added');
    });
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  });

  useEffect(() => {
    SplashScreen.hide();
    CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting)
      .then(() => {
        if (CometChat.setSource) {
          CometChat.setSource('ui-kit', Platform.OS, 'react-native');
        }
      })
      .catch(() => {
        return null;
      });
    if (Platform.OS === 'android') {
      setDefaultFontFamily();
    }
    const getPermissions = async () => {
      if (Platform.OS === 'android') {
        let granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ]);
        }
      }
    };
    getPermissions();
  }, []);
  const appID = COMETCHAT_CONSTANTS.APP_ID;
  const region = COMETCHAT_CONSTANTS.REGION;
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();
  CometChat.init(appID, appSetting).then(async () => {
    console.log('Initialization completed successfully');
    const FCM_TOKEN = await messaging().getToken();
    console.log(FCM_TOKEN, '_____++++______');
    // Register the token with Enhanced Push Notifications extension
    await CometChat.registerTokenForPushNotification(FCM_TOKEN);
    // You can now call login function.
    //   const authKey = COMETCHAT_CONSTANTS.AUTH_KEY;
    //   const uid = 'user1';
    //   CometChat.login(uid, authKey).then(
    //     (user) => {
    //       console.log('Login Successful:', { user });
    //     },
    //     (error) => {
    //       console.log('Login failed with exception:', { error });
    //     }
    //   );
    // },
    // (error) => {
    //   console.log('Initialization failed with error:', error);
    //   // Check the reason for error and take appropriate action.
  });
  return (
    <statusContext.Provider value={status}>
      <themeContext.Provider value={mode === true ? themee.dark : themee.light}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <StackNavigator />
          </PersistGate>
        </Provider>
      </themeContext.Provider>
    </statusContext.Provider>
  );
};
export default App;
