import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  SafeAreaView,
  Keyboard,
  Linking,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import { CometChat } from '@cometchat-pro/react-native-chat';
import Antdesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { EventRegister } from 'react-native-event-listeners';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import CometChatManager from '../../utils/controller';
import themeContext from '../../../../../theme/themeContext';
import statusContext from './statusContext';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import ViewShot, { captureScreen } from 'react-native-nj-view-shot';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { StyleSheet } from 'react-native';
var ImagePicker = require('react-native-image-picker');
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

const Status = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [camView, setCamView] = useState('back');
  let [pimages, setPimages] = useState([]);
  let [newStatus, setNewStatus] = useState(false);
  const [camera, setCamera] = useState(false);
  const [active, setActive] = useState(false);
  const [bg_color, setBg_Color] = useState('#246BFD');
  const [random_font, setRandom_font] = useState('Urbanist-Medium');
  const [flash, setFlash] = useState(false);
  let [typestatus, setTypestatus] = useState('');
  const ref = useRef();
  const [dev, setDev] = useState(null);
  const [fileUri, setFileUri] = useState('');
  const [uid, setUid] = useState('');
  let [stories, setStories] = useState([]);
  let [otherStatus, setOtherStatus] = useState([]);
  var a = new Date();
  a.setDate(a.getDate() - 1);
  let secondsBefore = Math.round(new Date().getTime() / 1000 - 86400);
  var a = new Date();
  a.setDate(a.getDate() - 1);

  // console.log('status opened');

  const color = [
    '#246BFD',
    '#DE3163',
    '#00ffff',
    '#9932cc',
    '#e9967a',
    '#191970',
    '#ff00ff',
    '#006400',
    '#d2b48c',
    '#ff4500',
    '#6a5acd',
  ];

  const font = [
    'DancingScript-VariableFont_wght',
    'Inspiration-Regular',
    'Pacifico-Regular',
    'RubikVinyl-Regular',
    'Urbanist-Bold',
    'Urbanist-Medium',
    'Urbanist-Regular',
    'Urbanist-SemiBold',
  ];

  let statusRef = firestore().collection('users');
  const themee = useContext(themeContext);
  let cstatus = useContext(statusContext);
  const navigation = useNavigation();
  const devices = useCameraDevices();
  const device = camView === 'back' ? devices.back : devices.front;
  // const device = devices.back;
  const cameraRef = useRef(Camera);
  let statusref = firestore().collection('users');
  const cameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') await Linking.openSettings();
    setDev(devices);
  }, [devices]);

  useEffect(() => {
    const get_user_status = navigation.addListener('tabPress', async (e) => {
      let pusersdata = [];
      let puserid = [];
      let pimg = [];
      // console.log(seconds, '24hrs before time in seconds');
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          // console.log('filter');
          await statusref
            .where('lastUpdatedAt', '>', a)
            .get()
            .then((querySnapshot) => {
              // console.log(
              //   'Total filtered users: ',
              //   Math.round(new Date().getTime() / 1000 - 86400 + 19800),
              //   '1',
              // );

              querySnapshot.forEach((documentSnapshot) => {
                if (
                  !puserid.includes(documentSnapshot.id) &&
                  documentSnapshot.id != user.uid
                ) {
                  pusersdata.push({
                    documentSnapshot,
                    user_id: documentSnapshot.id,
                  });
                  puserid.push(documentSnapshot.id);
                }
              });
              setOtherStatus(pusersdata);
              // console.log('users data filtered', pusersdata);
            })
            .catch((error) => {
              console.log('error filtering', error);
            });

          await statusref
            .doc(user.uid)
            .collection('stories')
            .where('createdAt', '>', a)
            .get()
            .then((querySnapshot) => {
              // console.log('Total users auto: ', querySnapshot.size);

              querySnapshot.forEach((documentSnapshot) => {
                // console.log(documentSnapshot.data().createdAt, 'created at');
                if (!pimg.includes(documentSnapshot.data().id)) {
                  pimg.push({
                    id: documentSnapshot.id,
                    data: documentSnapshot.data(),
                  });
                  // stories.push(documentSnapshot.data().imageUrl);
                }
              });

              setPimages(pimg);
              EventRegister.emit('changeStatus', pimg);
            });
        } else {
          // User not logged in or has just logged out.
          navigation.navigate('SignIn_Screen');
        }
      });
      return () => get_user_status();
    });
  }, [navigation]);

  let otherUserStatus = async (values) => {
    console.log(values.user_id);
    let potherstatus = [];

    await statusref
      .doc(values.user_id)
      .collection('stories')
      .where('createdAt', '>', a)
      .get()
      .then((querySnapshot) => {
        console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach((documentSnapshot) => {
          console.log(documentSnapshot.data().createdAt, 'created at');
          if (
            !potherstatus.includes(documentSnapshot.data().id) //bug found
          ) {
            console.log(documentSnapshot.data(), 'sdfsdf123123123');
            potherstatus.push({
              id: documentSnapshot.id,
              data: documentSnapshot.data(),
            });
            // stories.push(documentSnapshot.data().imageUrl);
          }
        });

        // setPimages(pimg);
        // EventRegister.emit('changeStatus', pimg);
        navigation.navigate('StatusNew', {
          user_Detail: values,
          user_type: 'other',
          PROFILE: null,
          loggedInUser: user,
          Stories: potherstatus,
        });
      });
  };

  const renderItem = ({ item }) => {
    // console.log(item, 'item values');
    return (
      <TouchableOpacity onPress={() => otherUserStatus(item)}>
        <View
          style={{
            width: '100%',
            backgroundColor: themee.background,
            padding: 15,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View>
            <Image
              source={{ uri: item.documentSnapshot._data.imagerurl }}
              style={{
                height: 60,
                width: 60,
                borderRadius: 50,
                marginLeft: 5,
              }}
            />
          </View>
          <View>
            <Text
              style={{
                marginLeft: 10,
                color: themee.color,
                fontFamily: 'Urbanist-Bold',
                fontSize: 18,
              }}>
              {item.documentSnapshot._data.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getProfile();
  }, []);
  useEffect(() => {
    cameraPermission();
  }, [devices]);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        setUid(user.uid);
      } else {
        // User not logged in or has just logged out.
        navigation.navigate('SignIn_Screen');
      }
    });
  }, []);

  useEffect(() => {
    let pimg = [];
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await statusref
          .doc(user.uid)
          .collection('stories')
          .where('createdAt', '>', a)
          .get()
          .then((querySnapshot) => {
            console.log('Total users: ', querySnapshot.size);

            querySnapshot.forEach((documentSnapshot) => {
              console.log(documentSnapshot.data().createdAt, 'created at');
              if (!pimg.includes(documentSnapshot.data().id)) {
                pimg.push({
                  id: documentSnapshot.id,
                  data: documentSnapshot.data(),
                });
                // stories.push(documentSnapshot.data().imageUrl);
              }
            });

            setPimages(pimg);
            EventRegister.emit('changeStatus', pimg);
          });
      } else {
        // User not logged in or has just logged out.
        navigation.navigate('SignIn_Screen');
      }
    });
  }, [user]);

  useEffect(() => {
    let pusersdata = [];
    let puserid = [];
    // console.log(seconds, '24hrs before time in seconds');
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log('filter');
        await statusref
          .where('lastUpdatedAt', '>', a)
          .get()
          .then((querySnapshot) => {
            // console.log(
            //   'Total filtered users:',
            //   Math.round(new Date().getTime() / 1000 - 86400),
            //   'acha theek hai',
            // );

            querySnapshot.forEach((documentSnapshot) => {
              if (
                !puserid.includes(documentSnapshot.id) &&
                documentSnapshot.id != user.uid
              ) {
                pusersdata.push({
                  documentSnapshot,
                  user_id: documentSnapshot.id,
                });
                puserid.push(documentSnapshot.id);
              }
            });
            setOtherStatus(pusersdata);
            console.log('users data filtered', pusersdata);
          })
          .catch((error) => {
            console.log('error filtering', error);
          });
      } else {
        // User not logged in or has just logged out.
        navigation.navigate('SignIn_Screen');
      }
    });
  }, [uid]);

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

  const test = () => {};

  const getProfile = () => {
    new CometChatManager()
      .getLoggedInUser()
      .then((loggedInUser) => {
        setUser(loggedInUser);
        console.log(loggedInUser, '***********_______');
      })
      .catch((error) => {
        logger(
          '[CometChatUserProfile] getProfile getLoggedInUser error',
          error,
        );
      });
  };

  const captureScreen = async () => {
    let date = new Date();
    Keyboard.dismiss();
    setTimeout(
      function () {
        ref.current.capture().then(async (uri) => {
          console.log('do something with ', uri);
          // setLoading(true);
          let fileName = uri.substring(uri.lastIndexOf('/') + 1);

          const task = storage().ref(fileName).putFile(uri);

          try {
            await task;
            const url = await storage().ref(fileName).getDownloadURL();
            await statusref
              .doc(uid)
              .collection('stories')
              .doc()
              .set({
                createdAt: date,
                imageUrl: url,
                caption: '',
                type: 'status_text',
                text_value: typestatus,
                viewed_by: [],
              })
              .then(async () => {
                await statusref.doc(uid).update({
                  lastUpdatedAt: date,
                });
                // setLoading(false);
                console.log('Firestore updated');
                // setNewStatus(!newStatus);
                EventRegister.emit('updateStatus', {
                  id: url,
                  data: {
                    caption: '',
                    createdAt: new Date(),
                    imageUrl: url,
                    type: 'status_text',
                    text_value: typestatus,
                    viewed_by: [],
                  },
                });
              })
              .catch((error) => {
                Alert.alert(error);
              });
            setModalVisible(false);
            console.log(url);
          } catch (e) {
            console.log(e);
          }
        });
      }.bind(this),
      1000,
    );
  };

  const renderFileUri = () => {
    if (user) {
      return (
        <View
          style={{
            height: 70,
            width: 70,
            borderRadius: 50,
            borderWidth: 3,
            borderColor: !cstatus.length > 0 ? '#fff' : '#246BFD',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{ uri: user.avatar }}
            style={{ height: 60, width: 60, borderRadius: 50 }}
          />
        </View>
      );
    } else {
      return (
        <Image
          source={require('../../../../../../assets/images/dummy.png')}
          // style={Styles.images}
        />
      );
    }
  };

  const get_Color = () => {
    const c = Math.ceil(Math.random() * 10);
    setBg_Color(color[c]);
  };

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // const get_font = () => {
  //   const c = randomIntFromInterval(0, 4);
  //   console.log(font[c], '=====++');
  //   setFonts(font[c]);
  // };

  const get_Font = () => {
    const c = randomIntFromInterval(0, 7);
    setRandom_font(font[c]);
  };

  const chooseImage = () => {
    let options = {
      title: 'Select Image',
      quality: 0.5,
      maxHeight: 800,
      maxWidth: 600,
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, async (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        Alert.alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        setFileUri(response.assets[0].uri);
        navigation.navigate('Camera', {
          imageUrl: response.assets[0].uri,
        });
      }
    });
  };

  const takePhoto = async () => {
    try {
      if (cameraRef.current == null) throw new Error('Camera Ref is Null');
      console.log('Photo taking ....');
      const photo = await cameraRef.current.takeSnapshot({
        quality: 25,
        skipMetadata: true,
      });
      setFileUri(photo.path);
      navigation.navigate('Camera', {
        imageUrl: photo.path,
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (device === null) {
    return <ActivityIndicator style={{ flex: 1 }} size={50} color="red" />;
  }
  if (loading == true) {
    return <ActivityIndicator style={{ flex: 1 }} size={50} color="#246BFD" />;
  }

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={camera}
        onRequestClose={() => {
          setCamera(!camera);
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
          }}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            video={true}
            enableZoomGesture
            ref={cameraRef}
            photo={true}
          />
          <TouchableOpacity onPress={() => setCamera(!camera)}>
            <Entypo
              style={{ left: 20, top: 10, position: 'absolute' }}
              name="cross"
              size={30}
              color="#FFF"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFlash(!flash)}>
            {flash === true ? (
              <MaterialCommunityIcons
                style={{ right: 10, top: 10, position: 'absolute' }}
                name="flash-off"
                size={30}
                color="#FFF"
              />
            ) : (
              <MaterialIcon
                style={{ right: 10, top: 10, position: 'absolute' }}
                name="flash-on"
                size={30}
                color="#FFF"
              />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 50,
            width: '100%',
            backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          {/* <TouchableOpacity
            onPress={() => {
              chooseImage();
            }}> */}
          <View
            style={{
              height: 60,
              width: 60,
              // borderWidth: 2,
              // borderRadius: 20,
              borderColor: 'white',
              bottom: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                chooseImage();
              }}>
              <Icon name="ios-images-outline" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
          {/* </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={() => {
              takePhoto();
            }}> */}
          <View
            style={{
              height: 60,
              width: 60,
              borderWidth: 2,
              borderRadius: 60,
              borderColor: 'white',
              bottom: 100,
            }}>
            <TouchableOpacity
              onPress={() => {
                takePhoto();
              }}>
              <View
                style={{
                  top: 1,
                  left: 0.75,
                  backgroundColor: 'white',
                  height: 54,
                  width: 54,
                  borderRadius: 55,
                }}
              />
            </TouchableOpacity>
          </View>
          {/* </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={() => {
              camView == 'back' ? setCamView('front') : setCamView('back');
            }}> */}
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 50,
              bottom: 100,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#808080',
            }}>
            <TouchableOpacity
              onPress={() => {
                camView === 'back' ? setCamView('front') : setCamView('back');
              }}>
              <Icon name="camera-reverse-outline" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
          {/* </TouchableOpacity> */}
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <SafeAreaView>
          <View
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: bg_color,
            }}>
            <View
              style={{
                height: '10%',
                width: '100%',
                // backgroundColor: 'red',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                padding: 5,
              }}>
              <View
                style={{
                  width: '10%',
                  height: '50%',
                  // backgroundColor: 'yellow',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Antdesign name="arrowleft" size={24} color="#FFF" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: '10%',
                  height: '50%',
                  // backgroundColor: 'yellow',
                }}>
                <Icon
                  name="ellipsis-horizontal-circle-outline"
                  size={24}
                  color="#FFF"
                />
              </View>
            </View>
            <ViewShot
              ref={ref}
              options={{
                fileName: 'Your-File-Name',
                format: 'jpg',
                quality: 0.9,
              }}
              style={{
                height: '80%',
                width: '100%',
                backgroundColor: bg_color,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                style={{
                  width: '90%',
                  fontSize: 30,
                  fontFamily: random_font,
                  color: '#FFF',
                  // backgroundColor: 'red',
                  textAlign: 'center',
                }}
                placeholder="Type a status"
                placeholderTextColor="#A7C4FE"
                multiline={true}
                onChangeText={(value) => setTypestatus(value)}
              />
            </ViewShot>
            <View
              style={{
                height: '100%',
                width: '100%',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: '10%',
                  width: '70%',
                  paddingLeft: 10,
                  // backgroundColor: 'green',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '15%',
                    height: '45%',
                    // backgroundColor: 'yellow',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity>
                    <Feather name="smile" size={24} color="#FFF" />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: '15%',
                    height: '45%',
                    // backgroundColor: 'yellow',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity onPress={() => get_Font()}>
                    <Image
                      style={{ height: 20, width: 20 }}
                      source={require('../../../../../../assets/images/TextIcon.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: '15%',
                    height: '45%',
                    // backgroundColor: 'yellow',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity onPress={() => get_Color()}>
                    <Icon name="color-palette-outline" size={24} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  height: '10%',
                  width: '30%',
                  // backgroundColor: 'blue',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '100%',
                    height: '45%',
                    paddingRight: 20,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                  }}>
                  <TouchableOpacity onPress={() => captureScreen()}>
                    <Icon name="send-sharp" size={24} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: themee.background,
        }}>
        <TouchableOpacity
          onPress={() =>
            cstatus.length > 0
              ? navigation.navigate('StatusNew', {
                  user_Detail: user,
                  user_type: 'self',
                  PROFILE: user.avatar,
                  Stories: stories,
                  loggedInUser: user,
                })
              : null
          }
          style={{
            height: '13%',
            width: '100%',
            //   backgroundColor: 'green',
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '20%',
              // backgroundColor: 'orange',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View style={{ left: 10 }}>
              {/* {console.log(user)} */}

              {/* <Image
                style={{ height: 60, width: 60 }}
                source={require('../../../../../../assets/images/dummy.png')}
              /> */}
              {renderFileUri()}
            </View>
            <View style={{ backgroundColor: 'transparent', marginTop: 50 }}>
              {/* <Image
                style={{ right: 3, bottom: 4 }}
                source={require('../../../../../../assets/images/Exclude.png')}
              /> */}
            </View>
          </View>
          <View
            style={{
              height: '100%',
              width: '80%',
              justifyContent: 'center',
              alignItems: 'flex-start',
              // flexDirection: 'row',
              // backgroundColor: 'blue',
              padding: 10,
            }}>
            <View
              style={{
                height: '35%',
                width: '90%',
                //   backgroundColor: 'blue',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: themee.color,
                }}>
                My Status
              </Text>
            </View>
            {!cstatus.length > 0 ? (
              <View
                style={{
                  height: '35%',
                  width: '90%',
                  //   backgroundColor: 'grey',
                }}>
                <Text style={{ fontFamily: 'Urbanist', color: themee.color }}>
                  Tap to add status updates
                </Text>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
        {otherStatus.length > 0 ? (
          <View
            style={{
              width: '100%',
              height: '4%',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Urbanist-Bold',
                fontSize: 15,
                marginLeft: 20,
                color: themee.color,
              }}>
              Recent Updates
            </Text>
          </View>
        ) : null}
        {otherStatus.length > 0 ? (
          <View
            style={{
              width: '100%',
              height: '85%',
              // backgroundColor: 'green',
              justifyContent: 'flex-end',
            }}>
            <FlatList
              data={otherStatus}
              renderItem={renderItem}
              keyExtractor={(item) => item.user_id}
            />
          </View>
        ) : null}
      </View>
      <View
        style={{
          width: '100%',
          height: 100,
          backgroundColor: 'transparent',
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            height: 50,
            width: 50,
            // backgroundColor: 'green',
            bottom: 180,
            right: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Image
              style={{ height: 100, width: 100 }}
              source={require('../../../../../../assets/images/typestatus.png')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 50,
            width: 50,
            // backgroundColor: 'yellow',
            bottom: 150,
            right: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => setCamera(!camera)}>
            <Image
              style={{ height: 100, width: 100 }}
              source={require('../../../../../../assets/images/camerastatus.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Status;
