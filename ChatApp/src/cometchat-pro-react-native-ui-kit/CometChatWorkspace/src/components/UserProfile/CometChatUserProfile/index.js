import React, { useEffect, useState, useContext } from 'react';
import { CometChatManager } from '../../../utils/controller';
import { CometChatAvatar } from '../../Shared';
import styles, { styles_dark } from './styles';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Appearance,
  useColorScheme,
  Switch,
} from 'react-native';
import theme from '../../../resources/theme';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../../../../../../theme/themeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { logger } from '../../../utils/common';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { firebase } from '@react-native-firebase/auth';
import * as actions from '../../../../../../store/action';
import { useNavigation } from '@react-navigation/native';

const notificationIcon = (
  <Icon color="#fff" name="notifications-none" size={28} />
);
const accountIcon = <Icon1 name="account-outline" size={28} color="#fff" />;
const chatIcon = (
  <Icon1 name="chat-processing-outline" size={28} color="#fff" />
);
const SecurityIcon = (
  <Icon3 color="#fff" name="shield-checkmark-outline" size={28} />
);
const storageIcon = <Icon2 color="#fff" name="folder" size={28} />;
const LogoutIcon = (
  <Icon color="red" onPress={() => logoutt()} size={28} name="logout" />
);
const arrowForward = (
  <Icon name="keyboard-arrow-right" size={28} color="#fff" />
);

const CometChatUserProfile = (props) => {
  const scheme = useColorScheme();
  const [user, setUser] = useState({});
  const viewTheme = { ...theme, ...props.theme };
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const themee = useContext(themeContext);
  const [mode, setMode] = useState(themee.theme === 'dark' ? true : false);

  /**
   * Retrieve logged in user details
   * @param
   */
  const getProfile = () => {
    new CometChatManager()
      .getLoggedInUser()
      .then((loggedInUser) => {
        setUser(loggedInUser);
        console.log(loggedInUser, 'ttt');
      })
      .catch((error) => {
        logger(
          '[CometChatUserProfile] getProfile getLoggedInUser error',
          error,
        );
      });
  };

  const CometChatLogout = () => {
    CometChat.logout().then(
      () => {
        console.log('Logout completed successfully');
      },
      (error) => {
        console.log('Logout failed with exception:', { error });
      },
    );
  };

  const FirebaseLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const Logout = () => {
    CometChatLogout();
    FirebaseLogout();
    this.props.navigation.navigate('SignIn_Screen');
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    new CometChatManager()
      .getLoggedInUser()
      .then((loggedInUser) => {
        if (
          user.avatar != loggedInUser.avatar ||
          user.name != loggedInUser.name
        ) {
          setUser(loggedInUser);
        }
        // setUser(loggedInUser);
        console.log(loggedInUser, 'ttt');
      })
      .catch((error) => {
        logger(
          '[CometChatUserProfile] getProfile getLoggedInUser error',
          error,
        );
      });
  }, [true]);

  let avatar = null;
  if (user) {
    avatar = (
      <View style={styles.avatarStyle}>
        <CometChatAvatar
          cornerRadius={60}
          borderColor={viewTheme.color.secondary}
          borderWidth={1}
          image={{ uri: user.avatar }}
          name={user.name}
        />
      </View>
    );
  }

  // const logoutt = () => {
  //   dispatch(actions.logout());
  //   firebase.auth().signOut();
  //   navigation.navigate('SignIn_Screen');
  // };

  const logoutt = async () => {
    await dispatch(actions.logout());
    await firebase.auth().signOut();
    navigation.navigate('SignIn_Screen');
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView
      style={[
        styles.userInfoScreenStyle,
        { backgroundColor: themee.background },
      ]}>
      {/* <View style={styles.headingContainer}>
        <Text style={styles.headerTitleStyle}>More</Text>
      </View> */}
      <View style={styles.userContainer}>
        <View style={styles.avatarContainer}>{avatar}</View>
        {user?.name ? (
          <View style={styles.userDetailsContainer}>
            <View style={styles.userNameWrapper}>
              <Text
                style={[styles.userName, { color: themee.color }]}
                numberOfLines={1}>
                {user?.name}
              </Text>
            </View>
            <Text style={styles.status}>Online</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.infoItemsWrapper}>
        {/* <View style={styles.infoItemHeadingContainer}>
          <Text style={styles.infoItemHeadingText}>Preferences</Text>
        </View> */}
        <View style={styles.infoItemsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile_Update')}>
            <View style={styles.infoItem}>
              <View style={styles.Icon}>
                {scheme === 'dark' ? (
                  <Icon1
                    name="account-outline"
                    size={28}
                    color={themee.color}
                  />
                ) : (
                  <Icon1
                    name="account-outline"
                    size={28}
                    color={themee.color}
                  />
                )}
              </View>
              <View style={styles.text}>
                <Text style={[styles.infoItemText, { color: themee.color }]}>
                  Account
                </Text>
              </View>
              <View style={styles.forward_Icon}>
                {scheme === 'dark' ? (
                  <Icon
                    name="keyboard-arrow-right"
                    size={28}
                    color={themee.color}
                  />
                ) : (
                  <Icon
                    name="keyboard-arrow-right"
                    size={28}
                    color={themee.color}
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.infoItem}>
            <View style={styles.Icon}>
              {scheme === 'dark' ? (
                <Icon1
                  name="chat-processing-outline"
                  size={28}
                  color={themee.color}
                />
              ) : (
                <Icon1
                  name="chat-processing-outline"
                  size={28}
                  color={themee.color}
                />
              )}
            </View>
            <View style={styles.text}>
              <Text style={[styles.infoItemText, { color: themee.color }]}>
                Chats
              </Text>
            </View>
            <View style={styles.forward_Icon}>
              {scheme === 'dark' ? (
                <Icon
                  name="keyboard-arrow-right"
                  size={28}
                  color={themee.color}
                />
              ) : (
                <Icon
                  name="keyboard-arrow-right"
                  size={28}
                  color={themee.color}
                />
              )}
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.Icon}>
              {scheme === 'dark' ? (
                <Icon
                  color={themee.color}
                  name="notifications-none"
                  size={28}
                />
              ) : (
                <Icon
                  color={themee.color}
                  name="notifications-none"
                  size={28}
                />
              )}
            </View>
            <View style={styles.text}>
              <Text style={[styles.infoItemText, { color: themee.color }]}>
                Notifications
              </Text>
            </View>
            <View style={styles.forward_Icon}>
              {scheme === 'dark' ? (
                <Icon
                  name="keyboard-arrow-right"
                  size={28}
                  color={themee.color}
                />
              ) : (
                <Icon
                  name="keyboard-arrow-right"
                  size={28}
                  color={themee.color}
                />
              )}
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.Icon}>
              {scheme === 'dark' ? (
                <Icon2 color={themee.color} name="folder" size={28} />
              ) : (
                <Icon2 color={themee.color} name="folder" size={28} />
              )}
            </View>
            <View style={styles.text}>
              <Text
                style={[
                  scheme === 'dark'
                    ? styles_dark.infoItemText
                    : styles.infoItemText,
                  { color: themee.color },
                ]}>
                Storage & Data
              </Text>
            </View>
            <View style={styles.forward_Icon}>
              {scheme === 'dark' ? (
                <Icon
                  name="keyboard-arrow-right"
                  size={28}
                  color={themee.color}
                />
              ) : (
                <Icon
                  name="keyboard-arrow-right"
                  size={28}
                  color={themee.color}
                />
              )}
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.Icon}>
              {scheme === 'dark' ? (
                <Icon3
                  color={themee.color}
                  name="shield-checkmark-outline"
                  size={28}
                />
              ) : (
                <Icon3
                  color={themee.color}
                  name="shield-checkmark-outline"
                  size={28}
                />
              )}
            </View>
            <View style={styles.text}>
              <Text style={[styles.infoItemText, { color: themee.color }]}>
                Security
              </Text>
            </View>
            <View style={styles.forward_Icon}>
              {scheme === 'dark' ? (
                <Icon
                  name="keyboard-arrow-right"
                  size={28}
                  color={themee.color}
                />
              ) : (
                <Icon
                  name="keyboard-arrow-right"
                  size={28}
                  color={themee.color}
                />
              )}
            </View>
          </View>

          <View
            style={[styles.themeItem, { backgroundColor: themee.background }]}>
            <View>
              <TouchableOpacity>
                <Text style={[styles.infoItemText, { color: themee.color }]}>
                  Dark Theme
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ paddingRight: 15 }}>
              <Switch
                value={mode}
                onValueChange={(value) => {
                  {
                    themee.theme === 'dark'
                      ? dispatch(actions.themeUpdate('light'))
                      : dispatch(actions.themeUpdate('dark'));
                  }
                  setMode(value);
                  EventRegister.emit('changeTheme', value);
                }}
              />
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.Icon}>{LogoutIcon}</View>
            <TouchableOpacity onPress={() => logoutt()} style={styles.Logout}>
              <Text style={styles.logout_text}>Logout</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.infoItem}>
            {privacyIcon}
            <Text style={styles.infoItemText}>Privacy and Security</Text>
          </View>
          <View style={styles.infoItem}>
            {chatIcon}
            <Text style={styles.infoItemText}>Chats</Text>
          </View>
        </View>
        <View style={styles.infoItemHeadingContainer}>
          <Text style={styles.infoItemHeadingText}>Other</Text>
        </View>
        <View style={styles.infoItemsContainer}>
          <View style={styles.infoItem}>
            {helpIcon}
            <Text style={styles.infoItemText}>Help</Text>
          </View>
          <View style={styles.infoItem}>
            {problemIcon}
            <Text style={styles.infoItemText}>Report a Problem</Text>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default CometChatUserProfile;
