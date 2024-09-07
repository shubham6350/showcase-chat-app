import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  Keyboard,
  Alert,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import ViewShot, { captureScreen } from 'react-native-nj-view-shot';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { TextInput } from 'react-native-element-textinput';
import Styles from './Style';
import SignIn_Button from '../../components/Buttons/SignIn';
import { SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Antdesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { firebase } from '@react-native-firebase/auth';
// import { CometChatManager } from '../../../utils/controller';
import * as actions from '../../store/action';
import { COMETCHAT_CONSTANTS } from '../../CONSTS';
import { CometChat } from '@cometchat-pro/react-native-chat';
import CometChatManager from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/utils/controller';
import { ScrollView } from 'react-native-gesture-handler';
var ImagePicker = require('react-native-image-picker');
import { Styles_dark } from './Style';
import { useColorScheme } from 'react-native';
import themeContext from '../../theme/themeContext';

const Profile_Update = ({ navigation }: any, props: any) => {
  const scheme = useColorScheme();
  const [loading, isLoading] = useState(true);
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [oname, setoName] = useState('');
  const [nickName, setNickName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
  const [uid, setUid] = useState('');
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [oimageUrl, setoImageUrl] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [fileUri, setFileUri] = useState('');
  const [camera, setCamera] = useState(false);
  let [videoborder, setVideoborder] = useState(false);
  const [flash, setFlash] = useState(false);
  const [camView, setCamView] = useState('back');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const devices = useCameraDevices();
  const device = camView === 'back' ? devices.back : devices.front;
  const ref = useRef();
  // const device = devices.back;
  const cameraRef = useRef(Camera);
  let themee = useContext(themeContext);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (datee: any) => {
    // console.warn('A date has been picked: ', date);
    const currentDate = datee || date;
    // console.log(currentDate);
    // setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();

    setDateOfBirth(fDate);
    hideDatePicker();
  };
  let cc: any = '';

  //select image from device

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUid(user.uid);
        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            let cd = uid;
            if (snapshot.data()) {
              cc = snapshot.data();
              console.log(snapshot.data());
              console.log(cc);
              setName(cc.name);
              setoName(cc.name);
              setNickName(cc.nickName);
              setEmail(cc.email);
              setAbout(cc.about);
              setDateOfBirth(cc.dateOfBirth);
              setImageUrl(cc.imagerurl);
              setoImageUrl(cc.imagerurl);
              isLoading(false);
            } else {
            }
          });
      } else {
        // User not logged in or has just logged out.
        navigation.navigate('SignIn_Screen');
      }
    });
  }, []);

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
    ImagePicker.launchImageLibrary(options, (response: any) => {
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

        console.log('response====', JSON.stringify(response.assets[0].uri));
        // setFileUri(response.assets[0].uri);
        SubmitImage(response.assets[0].uri);
      }
    });
  };

  //  capture image from camera

  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
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
        setFileUri(response.uri);
      }
    });
  };

  // rendering image

  const renderFileUri = () => {
    if (imageUrl) {
      return <Image source={{ uri: imageUrl }} style={Styles.images} />;
    } else {
      return <Image source={require('../../../assets/images/dummy.png')} style={Styles.images} />;
    }
  };

  const renderFileUri_dark = () => {
    if (imageUrl) {
      return <Image source={{ uri: imageUrl }} style={Styles.images} />;
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

  const profile_detail = () => {
    isLoading(true);
    if (name.toString() === oname.toString() && imageUrl.toString() === oimageUrl.toString()) {
      console.log('same');
    } else {
      // let authKey = COMETCHAT_CONSTANTS.AUTH_KEY;

      var user = new CometChat.User(uid);

      user.setName(name);
      user.setAvatar(imageUrl);

      CometChat.updateCurrentUserDetails(user).then(
        (user) => {
          console.log('user updated');
        },
        (error) => {
          console.log('error', error);
        }
      );
    }
    let data = {
      name: name,
      nickName: nickName,
      dateOfBirth: dateOfBirth,
      email: email,
      about: about,
      imagerurl: imageUrl,
    };
    Todoref.doc(uid)
      .set(data)
      .then(() => {
        Keyboard.dismiss();
        // dispatch(actions.auth(uid, COMETCHAT_CONSTANTS.AUTH_KEY, name, imageUrl, true));
        isLoading(false);
        navigation.navigate('Chat');
      })
      .catch((error) => {
        Alert.alert(error);
      });
  };

  // sending file to cloud Storage
  const SubmitImage = async (t) => {
    const uploadUri = t;
    let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    console.log(fileUri, '###@$E@#$@#$@#$@#$@$@#$');
    console.log(fileName, '324234234234234234');

    setUploading(true);
    setTransferred(0);

    const task = storage().ref(fileName).putFile(uploadUri);

    const formData = new FormData();
    formData.append('files', {
      uri: fileUri,
      name: fileName,
      type: `image/jpg`,
    });

    task.on('state_changed', (taskSnapshot) => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

      setTransferred(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100);
    });

    try {
      await task;
      const url = await storage().ref(fileName).getDownloadURL();
      setImageUrl(url);
      setUploading(false);
      Alert.alert('Image  Uploaded  Succesfully');
    } catch (e) {
      console.log(e);
    }
    setFileUri('');
    setModalVisible(!modalVisible);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
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
      // setImageUrl(photo.path);
      SubmitImage(photo.path);
    } catch (err) {
      console.log(err);
    }
    setCamera(!camera);
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: themee.backgroundl,
        }}
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
    <SafeAreaView style={{ height: '100%', backgroundColor: themee.backgroundl }}>
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
            <TouchableOpacity
              onPress={() => {
                chooseImage();
              }}
            >
              <Icon name="ios-images-outline" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>

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
            <TouchableOpacity
              onPress={() => {
                camView == 'back' ? setCamView('front') : setCamView('back');
              }}
            >
              <Icon name="camera-reverse-outline" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={Styles.centeredView}>
          <View style={scheme === 'dark' ? Styles_dark.modalView : Styles.modalView}>
            <View
              style={{
                // backgroundColor: 'red',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 10,
              }}
            >
              <View
                style={{
                  width: '15%',
                }}
              >
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                  {scheme === 'dark' ? (
                    <Antdesign name="arrowleft" size={25} color="#fff" />
                  ) : (
                    <Antdesign name="arrowleft" size={25} color="#000" />
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  // backgroundColor: 'green',
                  width: '65%',
                }}
              >
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text
                    style={
                      scheme === 'dark'
                        ? { fontWeight: 'bold', fontSize: 20, color: '#fff' }
                        : { fontWeight: 'bold', fontSize: 20, color: '#000' }
                    }
                  >
                    Select
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                // backgroundColor: 'red',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5,
              }}
            >
              <View
                style={{
                  // backgroundColor: 'yellow',
                  width: '15%',
                }}
              >
                {scheme === 'dark' ? (
                  <FontAwesome name="photo" size={25} color="#fff" />
                ) : (
                  <FontAwesome name="photo" size={25} color="#000" />
                )}
              </View>
              <View
                style={{
                  // backgroundColor: 'green',
                  width: '50%',
                }}
              >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => chooseImage()}>
                    <Text
                      style={
                        scheme === 'dark'
                          ? { fontSize: 15, fontWeight: 'bold', color: '#fff' }
                          : { fontSize: 15, fontWeight: 'bold', color: '#000' }
                      }
                    >
                      Gallery
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                // backgroundColor: 'red',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 5,
              }}
            >
              <View
                style={{
                  // backgroundColor: 'yellow',
                  width: '15%',
                }}
              >
                {scheme === 'dark' ? (
                  <Antdesign name="camera" size={30} color="#fff" />
                ) : (
                  <Antdesign name="camera" size={30} color="#000" />
                )}
              </View>
              <View
                style={{
                  // backgroundColor: 'green',
                  width: '50%',
                }}
              >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => launchCamera()}>
                    <Text
                      style={
                        scheme === 'dark'
                          ? { fontSize: 15, fontWeight: 'bold', color: '#fff' }
                          : { fontSize: 15, fontWeight: 'bold', color: '#000' }
                      }
                    >
                      Camera
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                width: '90%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 20,
              }}
            >
              <Button onPress={() => SubmitImage()} title="Upload Image" />
            </View>
          </View>
        </View>
      </Modal> */}

      <View style={[Styles.Header_Container, { backgroundColor: '#246BFD' }]}>
        <View style={[Styles.Icon_Container, { backgroundColor: '#246BFD' }]}>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Antdesign name="arrowleft" color="#fff" size={22} />
          </TouchableOpacity>
        </View>
        <View style={Styles.Heading}>
          <Text style={[Styles.Heading_Text, { color: '#fff' }]}>Account</Text>
        </View>
      </View>
      <View style={Styles.Content}>
        <View style={Styles.Image_Container}>
          <View style={Styles.Image_Box}>
            {uploading ? (
              <View>
                <Text style={{ color: themee.color }}>{transferred} % Completed!</Text>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <View></View>
            )}
            {scheme === 'dark' ? renderFileUri_dark() : renderFileUri()}
            <View style={Styles.Edit_Icon}>
              <TouchableOpacity onPress={() => setCamera(!camera)}>
                <Image
                  source={require('../../../assets/images/Edit.png')}
                  style={{ backgroundColor: themee.backgroundl, borderRadius: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView style={{ marginBottom: 10, padding: 15 }}>
          <View style={Styles.Input_Container}>
            <View style={{ width: '95%' }}>
              <View
                style={[
                  Styles.Button_Container,
                  { backgroundColor: themee.backgroundl, borderColor: themee.background },
                ]}
              >
                <View style={Styles.Button_Box1}>
                  <TextInput
                    value={nickName}
                    style={Styles.input}
                    inputStyle={[Styles.inputStyle, { color: themee.color }]}
                    labelStyle={Styles.labelStyle}
                    placeholderStyle={[Styles.placeholderStyle, { color: themee.background }]}
                    textErrorStyle={Styles.textErrorStyle}
                    label="USERNAME"
                    placeholder="Placeholder"
                    placeholderTextColor="gray"
                    focusColor="blue"
                    onChangeText={(text) => {
                      setNickName(text);
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{ width: '95%' }}>
              <View
                style={[
                  Styles.Button_Container,
                  { backgroundColor: themee.backgroundl, borderColor: themee.background },
                ]}
              >
                <View style={scheme === 'dark' ? Styles_dark.Button_Box1 : Styles.Button_Box1}>
                  <TextInput
                    value={name}
                    style={Styles.input}
                    inputStyle={[Styles.inputStyle, { color: themee.color }]}
                    labelStyle={Styles.labelStyle}
                    placeholderStyle={[Styles.placeholderStyle, { color: themee.background }]}
                    textErrorStyle={Styles.textErrorStyle}
                    label="FULL NAME"
                    placeholder="Placeholder"
                    placeholderTextColor="gray"
                    focusColor="blue"
                    onChangeText={(text) => {
                      setName(text);
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{ width: '95%' }}>
              <View
                style={[
                  Styles.Button_Container,
                  { backgroundColor: themee.backgroundl, borderColor: themee.background },
                ]}
              >
                <View style={scheme === 'dark' ? Styles_dark.Button_Box1 : Styles.Button_Box1}>
                  <View style={{ width: '90%' }}>
                    <TextInput
                      value={dateOfBirth}
                      style={Styles.input}
                      inputStyle={[Styles.inputStyle, { color: themee.color }]}
                      labelStyle={Styles.labelStyle}
                      placeholderStyle={[Styles.placeholderStyle, { color: themee.background }]}
                      textErrorStyle={Styles.textErrorStyle}
                      label="DATE OF BIRTH"
                      placeholder="Date of birth"
                      placeholderTextColor="gray"
                      focusColor="blue"
                      onChangeText={(text) => {
                        setDateOfBirth(text);
                      }}
                    />
                  </View>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />

                  <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                    <TouchableOpacity onPress={showDatePicker}>
                      {scheme === 'dark' ? (
                        <Antdesign name="calendar" size={15} color="#fff" />
                      ) : (
                        <Antdesign name="calendar" size={15} color="#000" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ width: '95%' }}>
              <View
                style={[
                  Styles.Button_Container,
                  { backgroundColor: themee.backgroundl, borderColor: themee.background },
                ]}
              >
                <View style={scheme === 'dark' ? Styles_dark.Button_Box1 : Styles.Button_Box1}>
                  <TextInput
                    value={email}
                    style={Styles.input}
                    inputStyle={[Styles.inputStyle, { color: themee.color }]}
                    labelStyle={Styles.labelStyle}
                    placeholderStyle={[Styles.placeholderStyle, { color: themee.background }]}
                    textErrorStyle={Styles.textErrorStyle}
                    label="EMAIL"
                    placeholder="Email"
                    placeholderTextColor="gray"
                    focusColor="blue"
                    onChangeText={(text) => {
                      setEmail(text);
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{ width: '95%' }}>
              <View
                style={[
                  Styles.Button_Container,
                  { backgroundColor: themee.backgroundl, borderColor: themee.background },
                ]}
              >
                <View style={scheme === 'dark' ? Styles_dark.Button_Box1 : Styles.Button_Box1}>
                  <TextInput
                    value={about}
                    style={Styles.input}
                    inputStyle={[Styles.inputStyle, { color: themee.color }]}
                    labelStyle={Styles.labelStyle}
                    placeholderStyle={[Styles.placeholderStyle, { color: themee.background }]}
                    textErrorStyle={Styles.textErrorStyle}
                    label="ABOUT"
                    placeholder="About"
                    placeholderTextColor="gray"
                    focusColor="blue"
                    onChangeText={(text) => {
                      setAbout(text);
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={Styles.Button_Box}>
        <TouchableOpacity onPress={() => profile_detail()}>
          <View style={Styles.Button}>
            <SignIn_Button title="Update Profile" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile_Update;
