/* eslint-disable import/no-duplicates */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CometChat } from '@cometchat-pro/react-native-chat';
// import CometChatUserList from '../CometChatUserList';
import CometChatUserSearch from '../Users/CometChatUserSearch';
import messaging from '@react-native-firebase/messaging';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from 'react-native';
import { CometChatGroupListWithMessages } from '../Groups';
import { CometChatUserListWithMessages } from '../Users';
import { CometChatConversationListWithMessages } from '../Chats';
import { CometChatContextProvider } from '../../utils/CometChatContext';
import { CometChatUserProfile } from '../UserProfile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MCIIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { firebase } from '@react-native-firebase/auth';
import theme from '../../resources/theme';
import * as enums from '../../utils/enums';
import * as actions from '../../../../../store/action';
import { heightRatio } from '../../utils/consts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import themeContext from '../../../../../theme/themeContext';
import { TextInput } from 'react-native-gesture-handler';
import Status from '../Status/CometChatStatus';

// import { Image } from 'react-native-svg';

const Tab = createMaterialTopTabNavigator();

function CometChatUI() {
  const [tabs, setTabs] = useState(null);
  const [search, setSearch] = useState(false);
  const [sValue, setSValue] = useState(null);
  const [callMessage, setCallMessage] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState();
  const contextRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const themec = useContext(themeContext);

  useEffect(() => {
    checkRestrictions();
  }, []);

  const logoutt = async () => {
    await dispatch(actions.logout());
    await firebase.auth().signOut();
    navigation.navigate('SignIn_Screen');
    setModalVisible(!modalVisible);
  };

  const checkRestrictions = async () => {
    let isChatEnabled =
      await contextRef.current.state.FeatureRestriction.isRecentChatListEnabled();
    let isGroupListEnabled =
      await contextRef.current.state.FeatureRestriction.isGroupListEnabled();
    let isUserSettingsEnabled =
      await contextRef.current.state.FeatureRestriction.isUserSettingsEnabled();
    let isUserListEnabled =
      await contextRef.current.state.FeatureRestriction.isUserListEnabled();
    let isCallListEnabled =
      await contextRef.current.state.FeatureRestriction.isCallListEnabled();
    setTabs({
      isChatEnabled,
      isGroupListEnabled,
      isUserSettingsEnabled,
      isUserListEnabled,
      isCallListEnabled,
    });
  };

  return (
    <SafeAreaView
      style={{ width: '100%', height: '100%', backgroundColor: '' }}>
      <View
        style={{
          height: 60,
          width: '100%',
          backgroundColor: '#246BFD',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: 40,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          {/* <View style={{ paddingTop: 4, marginLeft: 5}}>
            <Image
              style={{ height: 25, width: 25 }}
              source={require('../../../../../../assets/images/logoo.png')}
            />
          </View> */}
          <View
            style={{
              backgroundColor: '#246BFD',
              width: '70%',
              height: 40,
              flexDirection: 'row',
              marginLeft: 10,
              marginTop: -2,
              zIndex: 5,
              alignItems: 'center',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                style={{ height: 25, width: 25, marginRight: 15, marginTop: 2 }}
                source={require('../../../../../../assets/images/logoo.png')}
              />
              <Text
                style={{
                  fontFamily: 'Urbanist-Bold',
                  fontSize: 24,
                  fontWeight: '700',
                  color: '#FFFFFF',
                  marginRight: 10,
                }}>
                Logo
              </Text>
            </View>
          </View>
          <View
            style={{ backgroundColor: '#246BFD', width: '10%', marginTop: -2 }}>
            <TouchableOpacity onPress={() => navigation.navigate('SUsers')}>
              <Ionicons name="search-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          {search ? null : (
            <View
              style={{
                backgroundColor: '#246BFD',
                width: '10%',
                marginTop: -2,
              }}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Ionicons
                  name="ellipsis-horizontal-circle"
                  size={24}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View style={{ height: '95%', width: '100%' }}>
        <CometChatContextProvider ref={contextRef}>
          {tabs ? (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarOptions: {
                  upperCaseLabel: false,
                },
                tabBarStyle: {
                  height: 50,
                  backgroundColor: '#246BFD',
                },
                tabBarLabelStyle: {
                  // marginTop: 10,
                  fontWeight: '600',
                  textTransform: 'none',
                  fontFamily: 'Urbanist-Bold',
                  fontSize: 18,
                  color: '#FFF',
                },
              })}
              tabBarOptions={{
                activeTintColor: theme.color.blue,
                inactiveTintColor: 'rgba(0,0,0,0.5)',
                activeBackgroundColor: theme.color.blue,
                inactiveBackgroundColor: theme.color.blue,
                labelStyle: { fontSize: 12 },
                indicatorStyle: {
                  backgroundColor: '#fff',
                  height: 3,
                  marginLeft: 20,
                  width: '22%',
                },
              }}>
              {tabs.isChatEnabled && (
                <Tab.Screen
                  name="Chats"
                  component={CometChatConversationListWithMessages}
                />
              )}
              {/* {tabs.isUserListEnabled && (
                <Tab.Screen
                  name="Users"
                  component={CometChatUserListWithMessages}
                />
              )} */}
              {tabs.isGroupListEnabled && (
                <Tab.Screen
                  // name="Groups"
                  name="Status"
                  component={Status}
                />
              )}
              {tabs.isUserSettingsEnabled && (
                <Tab.Screen name="Profile" component={CometChatUserProfile} />
              )}
            </Tab.Navigator>
          ) : null}
        </CometChatContextProvider>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={[styles.button]} onPress={() => logoutt()}>
              <Image
                source={require('../../../../../../assets/images/Logoutlogout.png')}
                style={{ width: 20, height: 20, marginRight: 10 }}
              />
              <Text style={styles.textStyle}>Logout</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => (
                setModalVisible(!modalVisible), navigation.navigate('Star')
              )}>
              <Text style={styles.textStyle}>Starred Messages</Text>
            </TouchableOpacity> */}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

export default CometChatUI;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginTop: 22,
    // backgroundColor:'red',
  },
  modalView: {
    margin: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    padding: 10,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Urbanist-Bold',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
