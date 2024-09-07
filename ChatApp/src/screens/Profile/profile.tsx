import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  TextInput,
  Keyboard,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Button,
  Platform,
  PermissionsAndroid,
} from 'react-native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-picker';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import ViewShot, { captureScreen } from 'react-native-nj-view-shot';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import Styles from './Style';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import SignIn_Button from '../../components/Buttons/SignIn';
import { SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Antdesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firebase } from '@react-native-firebase/auth';
// import { CometChatManager } from '../../../utils/controller';
import * as actions from '../../store/action';
import { COMETCHAT_CONSTANTS } from '../../CONSTS';
import CometChatManager from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/utils/controller';
import { ScrollView } from 'react-native-gesture-handler';
var ImagePicker = require('react-native-image-picker');
// import * as ImagePicker from 'react-native-image-picker';
import { Styles_dark } from './Style';
// import showImagePicker from 'react-native-image-picker';
import { useColorScheme } from 'react-native';
import { CometChat } from '@cometchat-pro/react-native-chat';

const Profile_Screen = ({ navigation }: any, props: any) => {
  const scheme = useColorScheme();
  const [loading, isLoading] = useState(true);
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
  const [uid, setUid] = useState('');
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [fileUri, setFileUri] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  let cc = '';
  const [camera, setCamera] = useState(false);
  let [videoborder, setVideoborder] = useState(false);
  const [flash, setFlash] = useState(false);
  const [camView, setCamView] = useState('back');
  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const devices = useCameraDevices();
  const device = camView === 'back' ? devices.back : devices.front;
  const ref = useRef();
  // const device = devices.back;
  const cameraRef = useRef(Camera);

  //select image from device

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

  // const requestCameraPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
  //         title: 'Camera Permission',
  //         message: 'App needs camera permission',
  //       });
  //       // If CAMERA Permission is granted
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err) {
  //       console.warn(err);
  //       return false;
  //     }
  //   } else return true;
  // };

  // const requestExternalWritePermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'External Storage Write Permission',
  //           message: 'App needs write permission',
  //         }
  //       );
  //       // If WRITE_EXTERNAL_STORAGE Permission is granted
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err) {
  //       console.warn(err);
  //       Alert.alert('Write permission err', err);
  //     }
  //     return false;
  //   } else return true;
  // };

  // const captureImage = async (type: any) => {
  //   let options = {
  //     mediaType: type,
  //     maxWidth: 300,
  //     maxHeight: 550,
  //     quality: 1,
  //     videoQuality: 'low',
  //     durationLimit: 30, //Video max duration in seconds
  //     saveToPhotos: true,
  //   };
  //   let isCameraPermitted = await requestCameraPermission();
  //   let isStoragePermitted = await requestExternalWritePermission();
  //   if (isCameraPermitted && isStoragePermitted) {
  //     launchCamera(options, (response) => {
  //       console.log('Response = ', response);

  //       if (response.didCancel) {
  //         Alert.alert('User cancelled camera picker');
  //         return;
  //       } else if (response.errorCode == 'camera_unavailable') {
  //         Alert.alert('Camera not available on device');
  //         return;
  //       } else if (response.errorCode == 'permission') {
  //         Alert.alert('Permission not satisfied');
  //         return;
  //       } else if (response.errorCode == 'others') {
  //         Alert.alert(response.errorMessage);
  //         return;
  //       }
  //       console.log('base64 -> ', response.base64);
  //       console.log('uri -> ', response.uri);
  //       console.log('width -> ', response.width);
  //       console.log('height -> ', response.height);
  //       console.log('fileSize -> ', response.fileSize);
  //       console.log('type -> ', response.type);
  //       console.log('fileName -> ', response.fileName);
  //       setFileUri(response);
  //     });
  //   }
  // };

  // const chooseFile = (type) => {
  //   let options = {
  //     mediaType: type,
  //     maxWidth: 300,
  //     maxHeight: 550,
  //     quality: 1,
  //   };
  //   launchImageLibrary(options, (response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       Alert.alert('User cancelled camera picker');
  //       return;
  //     } else if (response.errorCode == 'camera_unavailable') {
  //       Alert.alert('Camera not available on device');
  //       return;
  //     } else if (response.errorCode == 'permission') {
  //       Alert.alert('Permission not satisfied');
  //       return;
  //     } else if (response.errorCode == 'others') {
  //       Alert.alert(response.errorMessage);
  //       return;
  //     }
  //     console.log('base64 -> ', response.base64);
  //     console.log('uri -> ', response.uri);
  //     console.log('width -> ', response.width);
  //     console.log('height -> ', response.height);
  //     console.log('fileSize -> ', response.fileSize);
  //     console.log('type -> ', response.type);
  //     console.log('fileName -> ', response.fileName);
  //     setFileUri(response);
  //   });
  // };

  const chooseImage = () => {
    setCamera(!camera);
    let options = {
      title: 'Select Image',
      quality: 0.5,
      maxHeight: 800,
      maxWidth: 600,
      customButtons: [{ name: 'customOptionKey', title: 'Choose Photo from Custom Option' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, async (response: any) => {
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
        // const result = await ImageUpload.compress(response, {
        //   compressionMethod: 'auto',
        // });

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        // console.log('response====', result);
        setFileUri(response.assets[0].uri);
      }
    });
  };

  //  capture image from camera

  const launchCamera = () => {
    setModalVisible(!modalVisible);
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0.5,
      maxHeight: 800,
      maxWidth: 600,
    };
    ImagePicker.launchCamera(options, (response: any) => {
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
        console.log('response', JSON.stringify(response));
        setFileUri(response.assets[0].uri);
      }
    });
  };

  // rendering image

  const renderFileUri = () => {
    if (fileUri) {
      return <Image source={{ uri: fileUri }} style={Styles.images} />;
    } else {
      return <Image source={require('../../../assets/images/dummy.png')} style={Styles.images} />;
    }
  };

  const renderFileUri_dark = () => {
    if (fileUri) {
      return <Image source={{ uri: fileUri }} style={Styles.images} />;
    } else {
      return (
        <Image source={require('../../../assets/images/dummydark.png')} style={Styles.images} />
      );
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  //sending profile details to firestore
  const Todoref = firestore().collection('users');

  const profile_detail = (url: any) => {
    if (name.length > 0 && url.length > 0) {
      let data = {
        name: name,
        nickName: nickName,
        dateOfBirth: dateOfBirth,
        email: email,
        about: about,
        imagerurl: url,
      };
      Todoref.doc(uid)
        .set(data)
        .then(() => {
          setName(''),
            setNickName(''),
            setDateOfBirth(''),
            setEmail(''),
            setAbout(''),
            setFileUri(''),
            Keyboard.dismiss();
          dispatch(actions.auth(uid, COMETCHAT_CONSTANTS.AUTH_KEY, name, url, true));
          isLoading(true);
        })
        .catch((error) => {
          Alert.alert(error);
        });
    } else {
      Alert.alert('Please enter your name and your profile pic');
    }
  };

  useEffect(() => {
    if (data.reducer.isLoggedIn) {
      navigation.navigate('Chat');
    }
  });

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((snapshot) => {
        let cd = uid;
        if (snapshot.data()) {
          cc = snapshot.data()?.name;
          if (cc.length > 0) {
            dispatch(actions.auth(uid, COMETCHAT_CONSTANTS.AUTH_KEY, name, imageUrl, true));
          } else {
            console.log('name not provided');
            if (uid.length > 0) {
              isLoading(false);
            }
          }
        } else {
          if (cd != null) {
            console.log('not found');
            if (uid.length > 0) {
              isLoading(false);
            }
          }
        }
      });
  }, [uid]);

  // sending file to cloud Storage
  const SubmitImage = async () => {
    if (fileUri.length > 0) {
      const uploadUri = fileUri;
      isLoading(true);
      let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
      console.log(fileUri, '###@$E@#$@#$@#$@#$@$@#$');
      console.log(fileName, '324234234234234234');

      setUploading(true);
      setTransferred(0);

      const task = storage().ref(fileName).putFile(uploadUri);

      // CometChat.callExtension('avatar', 'POST', 'v1/upload', {
      //   avatar: 'fileUri:image/jpeg;base64,fileName',
      // })
      //   .then((response) => {
      //     console.log(response, 'avatar extension');
      //   })
      //   .catch((error) => {
      //     console.log(error, 'avatar error extension');
      //   });

      const formData = new FormData();
      formData.append('files', {
        uri: fileUri,
        name: fileName,
        type: `image/jpg`,
      });

      task.on('state_changed', (taskSnapshot) => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
        );

        setTransferred(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100);
      });

      try {
        await task;
        await storage()
          .ref(fileName)
          .getDownloadURL()
          .then((url) => {
            // setImageUrl(url);
            profile_detail(url);
          });

        // setUploading(false);
        // profile_detail();
        // Alert.alert('Image  Uploaded  Succesfully');
      } catch (e) {
        console.log(e);
      }
    } else {
      Alert.alert('Please upload Profile Image');
    }
    // const uploadUri = fileUri;
    // isLoading(true);
    // let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    // console.log(fileUri, '###@$E@#$@#$@#$@#$@$@#$');
    // console.log(fileName, '324234234234234234');

    // setUploading(true);
    // setTransferred(0);

    // const task = storage().ref(fileName).putFile(uploadUri);

    // const formData = new FormData();
    // formData.append('files', {
    //   uri: fileUri,
    //   name: fileName,
    //   type: `image/jpg`,
    // });

    // task.on('state_changed', (taskSnapshot) => {
    //   console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

    //   setTransferred(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100);
    // });

    // try {
    //   await task;
    //   await storage()
    //     .ref(fileName)
    //     .getDownloadURL()
    //     .then((url) => {
    //       // setImageUrl(url);
    //       profile_detail(url);
    //     });

    //   // setUploading(false);
    //   // profile_detail();
    //   // Alert.alert('Image  Uploaded  Succesfully');
    // } catch (e) {
    //   console.log(e);
    // }
    // setFileUri('');
  };

  const showMode = () => {
    setDatePickerVisibility(true);
  };
  const handleCheckInDate = (date: moment.MomentInput) => {
    setDateOfBirth(moment(date).format('DD MMM, YYYY'));
    hideCheckOutDatePicker();
  };
  const hideCheckOutDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const takePhoto = async () => {
    // setLoading(true);
    try {
      //Error Handle better
      if (cameraRef.current == null) throw new Error('Camera Ref is Null');
      console.log('Photo taking ....');
      const photo = await cameraRef.current.takeSnapshot({
        // qualityPrioritization: 'quality',
        quality: 25,
        skipMetadata: true,
        // flash: `${torch}`,
        // enableAutoRedEyeReduction: true,
      });
      console.log(photo.path, '-------------------');
      setFileUri(photo.path);
      // SubmitImage(photo.path);
    } catch (err) {
      console.log(err);
    }
    setCamera(!camera);
  };

  if (loading) {
    return (
      <View
        style={
          scheme === 'dark'
            ? { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }
            : { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }
        }
      >
        {/* <ActivityIndicator size="large" color="#00ff00" /> */}
        <Image
          source={require('../../../assets/images/ezgif.com-gif-maker.gif')}
          style={{ width: 200, height: 200 }}
        />
      </View>
    );
  }
  return (
    <SafeAreaView
      style={
        scheme === 'dark'
          ? { padding: 15, height: '100%', backgroundColor: '#121122' }
          : { padding: 15, height: '100%', backgroundColor: '#fff' }
      }
    >
      <Modal
        animationType="fade"
        transparent={true}
        visible={camera}
        onRequestClose={() => {
          setCamera(!camera);
        }}
      >
        <View
          style={{
            height: '100%',
            width: '100%',
          }}
        >
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
          }}
        >
          <TouchableOpacity
            onPress={() => {
              chooseImage();
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                bottom: 100,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#808080',
              }}
            >
              <Icon name="ios-images-outline" size={20} color="#FFF" />
            </View>
          </TouchableOpacity>

          <View
            style={{
              height: 70,
              width: 70,
              borderWidth: 5,
              borderRadius: 60,
              borderColor: videoborder ? 'red' : '#246BFD',
              bottom: 110,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={() => takePhoto()}>
              <View
                style={{
                  // top: 1,
                  // left: 0.75,
                  backgroundColor: 'white',
                  height: 60,
                  width: 60,
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              camView == 'back' ? setCamView('front') : setCamView('back');
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 60,
                borderColor: 'white',
                bottom: 100,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#808080',
              }}
            >
              <Icon name="camera-reverse-outline" size={20} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableOpacity style={Styles.centeredView} onPress={() => setModalVisible(true)}>
          <View style={scheme === 'dark' ? Styles_dark.modalView : Styles.modalView}>
            <View
              style={{
                // backgroundColor: 'red',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 5,
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  // backgroundColor: 'green',
                  width: '90%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              >
                <Text
                  style={
                    scheme === 'dark'
                      ? { fontWeight: '600', fontSize: 20, color: '#fff' }
                      : { fontWeight: '600', fontSize: 20, color: '#000' }
                  }
                >
                  Select Images
                </Text>
              </View>
            </View>
            <View
              style={{
                // backgroundColor: 'red',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 30,
              }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  width: '85%',
                  // backgroundColor: 'blue',
                  height: 30,
                }}
              >
                <TouchableOpacity onPress={() => launchCamera()}>
                  <Text
                    style={
                      scheme === 'dark'
                        ? { fontSize: 15, fontWeight: '400', color: '#fff' }
                        : { fontSize: 15, fontWeight: '400', color: '#000' }
                    }
                  >
                    Take Photo...
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                // backgroundColor: 'red',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 30,
              }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  width: '85%',
                  // backgroundColor: 'blue',
                  height: 30,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    chooseImage(), setModalVisible(!modalVisible);
                  }}
                >
                  <Text
                    style={
                      scheme === 'dark'
                        ? { fontSize: 15, fontWeight: '400', color: '#fff' }
                        : { fontSize: 15, fontWeight: '400', color: '#000' }
                    }
                  >
                    Choose from Library...
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                width: '90%',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingBottom: 20,
              }}
            >
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{ color: '#246BFD', fontWeight: '500' }}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal> */}

      <View style={scheme === 'dark' ? Styles_dark.Header_Container : Styles.Header_Container}>
        <View style={scheme === 'dark' ? Styles_dark.Icon_Container : Styles.Icon_Container}>
          {scheme === 'dark' ? (
            <Antdesign name="arrowleft" color="#fff" size={22} />
          ) : (
            <Antdesign name="arrowleft" size={22} />
          )}
        </View>
        <View style={scheme === 'dark' ? Styles_dark.Heading : Styles.Heading}>
          <Text style={scheme === 'dark' ? Styles_dark.Heading_Text : Styles.Heading_Text}>
            Fill Your Profile
          </Text>
        </View>
      </View>
      <View style={Styles.Content}>
        <View style={Styles.Image_Container}>
          <View style={Styles.Image_Box}>
            {/* {uploading ? (
              <View>
                <Text style={scheme === 'dark' ? { color: '#fff' } : { color: '#000' }}>
                  {transferred} % Completed!
                </Text>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : null} */}
            {scheme === 'dark' ? renderFileUri_dark() : renderFileUri()}
            <TouchableOpacity onPress={() => setCamera(!camera)}>
              <View style={Styles.Edit_Icon}>
                <Image
                  source={require('../../../assets/images/Edit.png')}
                  style={
                    scheme === 'dark'
                      ? { backgroundColor: '#000' }
                      : { borderRadius: 10, backgroundColor: '#fff' }
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View style={scheme === 'dark' ? Styles_dark.Input_Container : Styles.Input_Container}>
            <View
              style={scheme === 'dark' ? Styles_dark.Button_Container : Styles.Button_Container}
            >
              <View style={scheme === 'dark' ? Styles_dark.Button_Box1 : Styles.Button_Box1}>
                <TextInput
                  style={scheme === 'dark' ? Styles_dark.Text_Input : Styles.Text_Input}
                  placeholder="Full Name"
                  placeholderTextColor="grey"
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
              </View>
            </View>
            <View
              style={scheme === 'dark' ? Styles_dark.Button_Container : Styles.Button_Container}
            >
              <View style={scheme === 'dark' ? Styles_dark.Button_Box1 : Styles.Button_Box1}>
                <TextInput
                  style={scheme === 'dark' ? Styles_dark.Text_Input : Styles.Text_Input}
                  placeholder="NickName"
                  placeholderTextColor="grey"
                  value={nickName}
                  onChangeText={(text) => setNickName(text)}
                />
              </View>
            </View>
            <View
              style={scheme === 'dark' ? Styles_dark.Button_Container : Styles.Button_Container}
            >
              <View style={scheme === 'dark' ? Styles_dark.Button_Box1 : Styles.Button_Box1}>
                <View>
                  <TextInput
                    style={scheme === 'dark' ? Styles_dark.Text_Input : Styles.Text_Input}
                    placeholder="Date of birth"
                    placeholderTextColor="grey"
                    value={dateOfBirth}
                    onChangeText={(text) => setDateOfBirth(text)}
                  />
                </View>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleCheckInDate}
                  onCancel={hideCheckOutDatePicker}
                />

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => showMode()}>
                    {scheme === 'dark' ? (
                      <Antdesign name="calendar" size={15} color="#fff" />
                    ) : (
                      <Antdesign name="calendar" size={15} color="#000" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={scheme === 'dark' ? Styles_dark.Button_Container : Styles.Button_Container}
            >
              <View style={scheme === 'dark' ? Styles_dark.Button_Box1 : Styles.Button_Box1}>
                <TextInput
                  style={scheme === 'dark' ? Styles_dark.Text_Input : Styles.Text_Input}
                  placeholder="Email"
                  placeholderTextColor="grey"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
            </View>
            <View
              style={scheme === 'dark' ? Styles_dark.Button_Container : Styles.Button_Container}
            >
              <View style={scheme === 'dark' ? Styles_dark.Button_Box1 : Styles.Button_Box1}>
                <TextInput
                  style={scheme === 'dark' ? Styles_dark.Text_Input : Styles.Text_Input}
                  placeholder="About"
                  placeholderTextColor="grey"
                  value={about}
                  onChangeText={(text) => setAbout(text)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={Styles.Button_Box}>
        <TouchableOpacity
          onPress={() => {
            // profile_detail();
            SubmitImage();
          }}
        >
          <View style={Styles.Button}>
            <SignIn_Button title="Continue" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile_Screen;
