import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Dimensions,
  Keyboard,
  Modal,
  Alert,
  TextInput,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
// import { ProgressBar } from '@react-native-community/progress-bar-android';
import { CometChat } from '@cometchat-pro/react-native-chat';
import * as Progress from 'react-native-progress';
import statusContext from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Status/statusContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import BottomSheet from 'reanimated-bottom-sheet';

export default function StatusNew({ route }) {
  const timerRef = useRef(null);
  const { user_Detail, Stories, user_type, loggedInUser } = route.params;
  let statusref = firestore().collection('users');
  let [seen, setSeen] = useState([]);
  let navigation = useNavigation();
  let [mvisible, setMVisible] = useState(false);
  const [uid, setUid] = useState('');
  const [duration, setDuration] = useState(0);
  let inputRef = React.createRef();
  let [numb, setNumb] = useState(0);
  let [prog, setProg] = useState(0);
  let [reply, setReply] = useState('');
  let [otherStatus, setOtherStatus] = useState(null);
  let secondsBefore = Math.round(new Date().getTime() / 1000 - 86400);

  let simage = useContext(statusContext);
  let sheetRef = useRef(null);
  let [bsize, setBsize] = useState(0);
  let [viewList, setViewList] = useState(false);
  var t = new Date(1970, 0, 1);
  let image = user_type === 'self' ? simage : Stories;
  let user_image =
    user_type === 'self' ? user_Detail.avatar : user_Detail.documentSnapshot._data.imagerurl;
  let timer = 10;

  //   function toDateTime(secs) {
  //     var t = new Date(1970, 0, 1); // Epoch
  //     t.setSeconds(secs);
  //     return t;
  //   }

  const images = [
    'https://boostupliving.com/wp-content/uploads/2019/06/best-motivational-quote-mobile-wallpapers-53.jpg',
    'https://firebasestorage.googleapis.com/v0/b/chatapp-7faa8.appspot.com/o/ReactNative-snapshot-image4657102062891924291.jpg?alt=media&token=5cfb3520-b8dd-4cab-84ea-9244ca449ee4',
    'https://boostupliving.com/wp-content/uploads/2019/06/best-motivational-quote-mobile-wallpapers-53.jpg',
    'https://pumpernickelpixie.com/wp-content/uploads/2016/01/15-phone-wallpaper.jpg',
    'https://i.pinimg.com/originals/5a/f0/e5/5af0e538f7437fd13a73f7c96601ccb6.jpg',
  ];

  const [itemList, setItemList] = useState([
    {
      title: 'Home',
      icon: () => <Ionicons name="home-outline" />,
    },
    {
      title: 'Home',
      icon: () => <Ionicons name="home-outline" />,
    },
    {
      title: 'Home',
      icon: () => <Ionicons name="home-outline" />,
    },
    {
      title: 'Home',
      icon: () => <Ionicons name="home-outline" />,
    },
    {
      title: 'Home',
      icon: () => <Ionicons name="home-outline" />,
    },
    {
      title: 'Home',
      icon: () => <Ionicons name="home-outline" />,
    },
    {
      title: 'Home',
      icon: () => <Ionicons name="home-outline" />,
    },
    {
      title: 'Home',
      icon: () => <Ionicons name="home-outline" />,
    },
    {
      title: 'Home',
      icon: () => <Ionicons name="home-outline" />,
    },
    {
      title: 'Home',
      icon: () => <Ionicons name="home-outline" />,
    },
  ]);

  //   const image = [
  //     {
  //       imageUrl:
  //         'https://boostupliving.com/wp-content/uploads/2019/06/best-motivational-quote-mobile-wallpapers-53.jpg',
  //       createdAt: 'date',
  //       caption: 'first image',
  //     },
  //     {
  //       imageUrl:
  //         'https://firebasestorage.googleapis.com/v0/b/chatapp-7faa8.appspot.com/o/ReactNative-snapshot-image4657102062891924291.jpg?alt=media&token=5cfb3520-b8dd-4cab-84ea-9244ca449ee4',
  //       createdAt: 'date',
  //       caption: 'second image',
  //     },
  //     {
  //       imageUrl:
  //         'https://boostupliving.com/wp-content/uploads/2019/06/best-motivational-quote-mobile-wallpapers-53.jpg',
  //       createdAt: 'date',
  //       caption: 'third image',
  //     },
  //     {
  //       imageUrl: 'https://pumpernickelpixie.com/wp-content/uploads/2016/01/15-phone-wallpaper.jpg',
  //       createdAt: 'date',
  //       caption: 'fourth image',
  //     },
  //     {
  //       imageUrl: 'https://i.pinimg.com/originals/5a/f0/e5/5af0e538f7437fd13a73f7c96601ccb6.jpg',
  //       createdAt: 'date',
  //       caption: 'fifth image',
  //     },
  //   ];

  let windowWidth = Dimensions.get('window').width - 4 * image.length;
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
    if (prog < 100) {
      timerRef.current = setTimeout(() => {
        setProg((prog) => prog + 1);
        // console.log(prog);
      }, timer);
    }

    if (prog === 1 && numb != null && !seen.includes(numb)) {
      {
        user_type === 'self' ? console.log(prog, numb) : update_count();
      }
      setBsize(image[numb].data.viewed_by.length * 65 + 50);
    }

    if (prog === 100 && numb != image.length - 1) {
      clearTimeout(timerRef.current);
      get_Image();
    }

    if (prog === 100 && numb === image.length - 1) {
      //   Alert.alert('end');
      console.log(image[numb].data.viewed_by, 'viewed by');
      setSeen([]);
      navigation.goBack(null);
    }
    // return () => {
    //   if (prog > 100) {
    //     // console.log('test');

    //     clearTimeout(timerRef.current);
    //     // get_Image();
    //   }
    // };
  }, [prog]);

  const stopload = () => {
    clearTimeout(timerRef.current);
  };

  const resetcount = () => {
    clearTimeout(timerRef.current);
    setProg(0);
  };

  const get_Image = () => {
    sheetRef.current.snapTo(0);
    if (numb < image.length - 1) {
      setNumb((numb) => numb + 1);
      resetcount();
    } else {
      setSeen([]);
      navigation.goBack(null);
    }
    // resetcount();
    // console.log(images.length);
  };

  const prev_Image = () => {
    sheetRef.current.snapTo(0);
    if (numb != 0) {
      setNumb((numb) => numb - 1);
    }
    resetcount();
    // console.log(images.length);
  };

  function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }

  const send_Reply = () => {
    let data = {
      name: 'status.jpg',
      type: 'image/jpeg',
      uri: image[numb].data.imageUrl,
    };
    let receiverID = user_Detail.user_id;
    let messageType = CometChat.MESSAGE_TYPE.IMAGE;
    let receiverType = CometChat.RECEIVER_TYPE.USER;
    let mediaMessage = new CometChat.MediaMessage(receiverID, data, messageType, receiverType);
    mediaMessage.setData({
      replyText: reply,
      captionText: image[numb].data.caption,
      type: 'status-reply',
    });
    console.log(mediaMessage);
    CometChat.sendMediaMessage(mediaMessage).then(
      (message) => {
        console.log('Media message sent successfully', message);
      },
      (error) => {
        console.log('Media message sending failed with error', error);
      }
    );
  };

  const update_count = async () => {
    if (!image[numb].data.viewed_by.some((obj) => obj.user_id === loggedInUser.uid)) {
      // setTheArray(oldArray => [...oldArray, newElement]);
      setSeen((seen) => [...seen, numb]);
      await statusref
        .doc(user_Detail.user_id)
        .collection('stories')
        .doc(image[numb].id)
        .update({
          viewed_by: firestore.FieldValue.arrayUnion({
            user_id: loggedInUser.uid,
            seen_tme: new Date(),
            user_details: {
              user_name: loggedInUser.name,
              user_avatar: loggedInUser.avatar,
            },
          }),
        })
        .then(() => {
          console.log('view updated');
        });
    }
  };

  return (
    <>
      <Modal
        transparent={true}
        visible={mvisible}
        onShow={() => setTimeout(() => inputRef.current.focus(), 100)}
        onRequestClose={() => (setMVisible(!mvisible), resetcount())}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
          }}
        >
          <View style={{ flex: 1, width: '100%' }}>
            <TouchableOpacity onPress={() => (setMVisible(!mvisible), resetcount())}>
              <View style={{ width: '100%', height: '100%' }} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 15,
              paddingVertical: 10,
              flexDirection: 'row',
            }}
          >
            <TextInput
              ref={inputRef}
              style={{
                width: '82%',
                height: 45,
                backgroundColor: '#fff',
                marginBottom: 10,
                marginRight: 15,
                fontFamily: 'Urbanist-SemiBold',
                borderRadius: 15,
                borderColor: '#246BFD',
                fontSize: 20,
                borderWidth: 2,
                paddingHorizontal: 15,
              }}
              onChangeText={(value) => setReply(value)}
            />
            <TouchableOpacity onPress={() => (setMVisible(!mvisible), send_Reply(), resetcount())}>
              <Image
                style={{ height: 45, width: 45, padding: 5 }}
                source={require('../../../assets/images/send_Icon.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={{
            uri: image[numb].data.imageUrl,
          }}
          style={{ flex: 1, zIndex: -1, width: '100%', height: '100%' }}
        >
          <View>
            <View style={{ flexDirection: 'row' }}>
              {image.map((val, index) => (
                <View style={{ marginHorizontal: 2 }}>
                  <Progress.Bar
                    indeterminate={false}
                    color="#fff"
                    borderWidth={0.2}
                    width={windowWidth / image.length}
                    progress={!(index >= numb) ? 1 : index === numb ? prog / 100 : 0}
                  />
                </View>
              ))}
            </View>

            <View
              style={{
                backgroundColor: 'rgba(52, 52, 52, 0.2)',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: 'transparent',
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View style={{ padding: 5 }}>
                  <TouchableOpacity onPress={() => navigation.goBack(null)}>
                    <Icon name="arrow-back-sharp" size={30} color="#FFF" />
                  </TouchableOpacity>
                </View>
                <View style={{ paddingRight: 10 }}>
                  {/* <Icon name="arrow-back-sharp" size={30} color="#FFF" /> */}
                  <Image
                    source={{
                      uri: user_image,
                    }}
                    style={{ width: 45, height: 45, borderRadius: 50 }}
                  />
                </View>
                <View>
                  <Text style={{ fontFamily: 'Urbanist-Bold', fontSize: 18, color: '#fff' }}>
                    {user_type === 'self'
                      ? user_Detail.name
                      : user_Detail.documentSnapshot._data.name}
                  </Text>
                  <Text style={{ fontFamily: 'Urbanist-Regular', fontSize: 12, color: '#fff' }}>
                    {user_type === 'self' ? user_Detail.status : 'available'}
                  </Text>
                </View>
              </View>
              <View style={{ paddingHorizontal: 20 }}>
                <Icon name="ellipsis-horizontal-circle-outline" size={24} color="#FFF" />
              </View>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => prev_Image()}>
                <View style={{ width: '100%', height: '100%' }} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => get_Image()}>
                <View style={{ width: '100%', height: '100%' }} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'rgba(52, 52, 52, 0.2)',
              padding: user_type === 'self' ? null : 5,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={{ alignItems: 'center' }}>
              {image[numb].data.caption ? (
                <Text
                  style={{
                    fontFamily: 'Urbanist-Regular',
                    paddingTop: user_type === 'self' ? 15 : null,
                    paddingBottom: user_type === 'self' ? 30 : 5,
                    color: '#fff',
                  }}
                >
                  {image[numb].data.caption}
                </Text>
              ) : null}
              {user_type === 'self' ? (
                <TouchableOpacity
                  onPress={() =>
                    image[numb].data.viewed_by.length > 0
                      ? (sheetRef.current.snapTo(1), stopload())
                      : null
                  }
                >
                  <Text
                    style={{
                      fontFamily: 'Urbanist-Regular',
                      paddingTop: user_type === 'self' ? 15 : null,
                      paddingBottom: user_type === 'self' ? 30 : 5,
                      color: '#fff',
                    }}
                  >
                    Viewed By: {image[numb].data.viewed_by.length}
                  </Text>
                </TouchableOpacity>
              ) : null}
              {user_type === 'self' ? null : (
                <>
                  <View style={{ paddingBottom: 5, paddingTop: 2 }}>
                    <Icon name="chevron-up" size={25} color="#FFF" />
                  </View>
                  <TouchableOpacity onPress={() => (setMVisible(!mvisible), stopload())}>
                    <Text
                      style={{
                        fontFamily: 'Urbanist-SemiBold',
                        fontSize: 16,
                        color: '#fff',
                        paddingBottom: 15,
                      }}
                    >
                      Reply
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          <BottomSheet
            ref={sheetRef}
            snapPoints={
              image[numb].data.viewed_by.length > 5
                ? [0, 325 + 50]
                : [0, image[numb].data.viewed_by.length * 65 + 50]
            }
            initialSnap={0}
            enabledInnerScrolling={true}
            renderHeader={() => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#FAFAFA',
                    paddingVertical: 10,
                    height: 50,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }}
                >
                  <TouchableOpacity onPress={() => (sheetRef.current.snapTo(0), resetcount())}>
                    {/* <View
                      style={{
                        height: 35,
                        width: 50,
                        backgroundColor: 'white',
                      }}
                    ></View> */}
                    <Text>Viewed By</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            // enabledGestureInteraction={true}
            renderContent={() => {
              return (
                <View style={{ backgroundColor: '#fff' }}>
                  <FlatList
                    data={image[numb].data.viewed_by}
                    keyExtractor={itemList.title}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          backgroundColor: 'white',
                          alignItems: 'center',
                          padding: 15,
                          flexDirection: 'row',
                        }}
                      >
                        <Image
                          source={{
                            uri: item.user_details.user_avatar,
                          }}
                          style={{ width: 35, height: 35, borderRadius: 50 }}
                        />
                        <View style={{ flexDirection: 'column' }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontFamily: 'Urbanist-SemiBold',
                              paddingLeft: 10,
                            }}
                          >
                            {item.user_details.user_name}
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontFamily: 'Urbanist-Regular',
                              paddingLeft: 10,
                            }}
                          >
                            {new Date(item.seen_tme.seconds * 1000).toDateString()}
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                </View>
              );
            }}
            onCloseEnd={() => {}}
          />
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}
