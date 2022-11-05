import React, { useEffect } from 'react';
import {
  Text,
  TextInput,
  View,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  LogBox,
} from 'react-native';
import WelcomeUI from './src/screens/WelcomeUI';

import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { store, persistor } from './src/store/store';
import StackNavigator from './StackNavigator';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { COMETCHAT_CONSTANTS } from './src/constants/const';
import theme from 'react-native-elements/dist/config/theme';

const styles = StyleSheet.create({
  defaultFontFamily: {
    fontFamily: theme.fontFamily,
  },
});

const customProps = { style: styles.defaultFontFamily };

// To set default font family, avoiding issues with specific android fonts like OnePlus Slate
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
  LogBox.ignoreAllLogs();
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
  CometChat.init(appID, appSetting).then(
    () => {
      console.log('Initialization completed successfully');
      // You can now call login function.

      
      const authKey = COMETCHAT_CONSTANTS.AUTH_KEY;
      const uid = 'user1';

      CometChat.login(uid, authKey).then(
        (user) => {
          console.log('Login Successful:', { user });
        },
        (error) => {
          console.log('Login failed with exception:', { error });
        }
      );
    },
    (error) => {
      console.log('Initialization failed with error:', error);
      // Check the reason for error and take appropriate action.
    }
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
