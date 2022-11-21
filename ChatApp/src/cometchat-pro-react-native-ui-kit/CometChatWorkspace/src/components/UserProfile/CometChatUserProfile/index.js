import React, { useEffect, useState } from 'react';
import { CometChatManager } from '../../../utils/controller';
import { CometChatAvatar } from '../../Shared';
import styles from './styles';
import { View, Text, SafeAreaView, TouchableOpacity ,Image} from 'react-native';
import theme from '../../../resources/theme';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { logger } from '../../../utils/common';
import auth from '@react-native-firebase/auth';

const notificationIcon = (
  <Icon color={theme.color.helpText} name="notifications-none" size={28} />
);
const accountIcon = <Icon1 name="account-outline" size={28} />;
const chatIcon = (
  <Icon1
    color={theme.color.helpText}
    name="chat-processing-outline"
    size={28}
  />
);
const SecurityIcon = (
  <Icon3
    color={theme.color.helpText}
    name="shield-checkmark-outline"
    size={28}
  />
);
const storageIcon = (
  <Icon2 color={theme.color.helpText} name="folder" size={28} />
);
const LogoutIcon = <Icon color="red" size={28} name="logout" />;
const arrowForward = <Icon name="keyboard-arrow-right" size={28} />;

const CometChatUserProfile = (props) => {
  const [user, setUser] = useState({});
  const viewTheme = { ...theme, ...props.theme };

  /**
   * Retrieve logged in user details
   * @param
   */
  const getProfile = () => {
    new CometChatManager()
      .getLoggedInUser()
      .then((loggedInUser) => {
        setUser(loggedInUser);
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
  let avatar = null;
  if (user) {
    avatar = (
      <View style={styles.avatarStyle}>
        {/* <CometChatAvatar
          cornerRadius={60}
          borderColor={viewTheme.color.secondary}
          borderWidth={1}
          image={{ uri: user.avatar }}
          name={user.name}
        /> */}
        <View >
          <Image

          style={{height:80,width:80}}
          source={require('../../../../../../../assets/images/dummy.png')}
          />
        </View>
        
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.userInfoScreenStyle}>
      {/* <View style={styles.headingContainer}>
        <Text style={styles.headerTitleStyle}>More</Text>
      </View> */}
      <View style={styles.userContainer}>
        <View style={styles.avatarContainer}>{avatar}</View>
        {user?.name ? (
          <View style={styles.userDetailsContainer}>
            <View style={styles.userNameWrapper}>
              <Text style={styles.userName} numberOfLines={1}>
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
          <TouchableOpacity style={styles.infoItem}>
            <View style={styles.Icon}>{accountIcon}</View>
            <View style={styles.text}>
              <Text style={styles.infoItemText}>Account</Text>
            </View>
            <View style={styles.forward_Icon}>{arrowForward}</View>
          </TouchableOpacity>

          <View style={styles.infoItem}>
            <View style={styles.Icon}>{chatIcon}</View>
            <View style={styles.text}>
              <Text style={styles.infoItemText}>Chats</Text>
            </View>
            <View style={styles.forward_Icon}>{arrowForward}</View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.Icon}>{notificationIcon}</View>
            <View style={styles.text}>
              <Text style={styles.infoItemText}>Notifications</Text>
            </View>
            <View style={styles.forward_Icon}>{arrowForward}</View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.Icon}>{storageIcon}</View>
            <View style={styles.text}>
              <Text style={styles.infoItemText}>Storage & Data</Text>
            </View>
            <View style={styles.forward_Icon}>{arrowForward}</View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.Icon}>{SecurityIcon}</View>
            <View style={styles.text}>
              <Text style={styles.infoItemText}>Security</Text>
            </View>
            <View style={styles.forward_Icon}>{arrowForward}</View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.Icon}>{LogoutIcon}</View>
            <TouchableOpacity style={styles.Logout}>
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
