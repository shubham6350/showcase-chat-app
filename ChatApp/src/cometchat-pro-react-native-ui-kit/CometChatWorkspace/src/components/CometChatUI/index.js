import React, { useEffect, useRef, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { CometChatGroupListWithMessages } from '../Groups';
import { CometChatUserListWithMessages } from '../Users';
import { CometChatConversationListWithMessages } from '../Chats';
import { CometChatContextProvider } from '../../utils/CometChatContext';
import { CometChatUserProfile } from '../UserProfile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MCIIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../resources/theme';
import { heightRatio } from '../../utils/consts';
// import { SafeAreaView } from 'react-native';
import { SafeAreaView } from 'react-native';
// import { Image } from 'react-native-svg';
const Tab = createMaterialTopTabNavigator();
function CometChatUI({navigation}) {
  const [tabs, setTabs] = useState(null);
  const contextRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    checkRestrictions();
  }, []);
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

  const User_Click=()=>{
    setModalVisible(false);
    navigation.navigate('Users');
  }
  return (
    <SafeAreaView style={{ }}>
      <View
        style={{
          height: '10%',
          width: '100%',
          backgroundColor: '#246BFD',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: '40%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          {/* <View style={{ paddingTop: 4, marginLeft: 5}}>
            <Image
              style={{ height: 25, width: 25 }}
              source={require('../../../../../../assets/images/logoo.png')}
            />
          </View> */}

          <Modal
            animationType="none"
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
                <TouchableOpacity  onPress={() =>User_Click()} >
                  <Text style={styles.modalText}>Users</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Logout</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>

          <View
            style={{
              backgroundColor: '#246BFD',
              width: '70%',
              flexDirection: 'row',
              marginLeft: 20,
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
              }}>
              Logo
            </Text>
          </View>
          <View style={{ backgroundColor: '#246BFD', width: '10%' }}>
            <Ionicons name="search-outline" size={24} color="#FFFFFF" />
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{ backgroundColor: '#246BFD', width: '10%' }}>
            <Ionicons
              name="ellipsis-horizontal-circle"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: '90%', width: '100%' }}>
        <CometChatContextProvider ref={contextRef}>
          {tabs ? (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarStyle: {
                  height: 50,
                  backgroundColor: '#246BFD',
                },
                tabBarLabelStyle: {
                  // marginTop: 10,
                  fontWeight: '600',
                  textTransform: 'lowercase',
                  fontFamily: 'Urbanist-Bold',
                  fontSize: 18,
                  color: '#FFF',
                },
                // tabBarIcon: ({ color }) => {
                //   let iconName;
                //   if (route.name === 'Chats') {
                //     return (
                //       <MCIIcons name="chat" size={25 * heightRatio} color={color} />
                //     );
                //   }
                //   if (route.name === 'More') {
                //     return (
                //       <MaterialIcons
                //         name="more-horiz"
                //         size={25 * heightRatio}
                //         color={color}
                //       />
                //     );
                //   }
                //   if (route.name === 'Users') {
                //     iconName = 'ios-person-circle-sharp';
                //   } else if (route.name === 'Groups') {
                //     iconName = 'people';
                //   }
                //   // You can return any component that you like here!
                //   return (
                //     <Ionicons
                //       name={iconName}
                //       size={24 * heightRatio}
                //       color={color}
                //     />
                //   );
                // },
              })}
              tabBarOptions={{
                activeTintColor: theme.color.blue,
                inactiveTintColor: 'rgba(0,0,0,0.5)',
                activeBackgroundColor: theme.color.blue,
                inactiveBackgroundColor: theme.color.blue,
                labelStyle: { fontSize: 12 },
                indicatorStyle: {
                  backgroundColor: '#fff',
                  height: 5,
                  marginLeft: 12,
                  width: '28%',
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
                  name="Groups"
                  // name="status"
                  component={CometChatGroupListWithMessages}
                />
              )}
              {tabs.isUserSettingsEnabled && (
                <Tab.Screen name="More" component={CometChatUserProfile} />
              )}
            </Tab.Navigator>
          ) : null}
        </CometChatContextProvider>
      </View>
    </SafeAreaView>
  );
}
export default CometChatUI;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    // marginTop: 40,
    // backgroundColor: 'red',
    // paddingHorizontal:-2,
  },
  modalView: {
    // margin: 25,
    backgroundColor: 'white',
    borderRadius: 2,
    // padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    // marginRight: -1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // marginLeft: 150,
    elevation: 5,
    height: '25%',
    width: '40%',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#246BFD',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize:20,
    fontWeight:'700',
  },
});
