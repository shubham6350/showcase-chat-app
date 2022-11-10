import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  TextInput,
  Keyboard,
  Alert,
  ActivityIndicator,
  Button,
  Platform,
} from 'react-native';
import Styles from './Style';
import SignIn_Button from '../../components/Buttons/SignIn';
import { SafeAreaView } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
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
var ImagePicker = require('react-native-image-picker');

const Profile_Screen = ({ navigation }: any,props: any) => {
  const data = useSelector(state => state);
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
  }, [])


  const chooseImage = () => {
    let options = {
      title: 'Select Image',
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

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log('response====', JSON.stringify(response.assets[0].uri));
        setFileUri(response.assets[0].uri);
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
  const openModal = () => {
    setModalVisible(true);
  };

  //sending profile details to firestore
  const Todoref = firestore().collection('users');

  const profile_detail = () => {
    let data = {
      name: name,
      nickName: nickName,
      dateOfBirth: dateOfBirth,
      email: email,
      about: about,
      imagerurl: imageUrl,
    };
    Todoref.doc(uid).set(data)
      .then(() => {
        setName(''),
          setNickName(''),
          setDateOfBirth(''),
          setEmail(''),
          setAbout(''),
          setFileUri(''),
          Keyboard.dismiss();
          dispatch(actions.auth(uid, COMETCHAT_CONSTANTS.AUTH_KEY, true))
        user_chat_login();
      })
      .catch((error) => {
        Alert.alert(error);
      });
  };

  useEffect(() => {
    if(data.reducer.isLoggedIn){
      navigation.navigate('Chat');
    }
  })
  // sending file to cloud Storage
  const SubmitImage = async () => {
    const uploadUri = fileUri;
    let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    setUploading(true);
    setTransferred(0);

    const task = storage().ref(fileName).putFile(uploadUri);

    //set transferred state

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

  //Date Picker
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setDateOfBirth(fDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };
  return (
    <SafeAreaView style={{ padding: 15 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
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
                  <Antdesign name="arrowleft" size={25} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  // backgroundColor: 'green',
                  width: '65%',
                }}
              >
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Select</Text>
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
                <FontAwesome name="photo" size={25} />
              </View>
              <View
                style={{
                  // backgroundColor: 'green',
                  width: '50%',
                }}
              >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => chooseImage()}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Gallery</Text>
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
                <Antdesign name="camera" size={30} />
              </View>
              <View
                style={{
                  // backgroundColor: 'green',
                  width: '50%',
                }}
              >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => launchCamera()}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Camera</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{width:'90%',justifyContent:'center',alignItems:'center'}} >
              <Button onPress={() => SubmitImage()} title="Upload Image"  />
            </View>
          </View>
        </View>
      </Modal>

      <View style={Styles.Header_Container}>
        <View style={Styles.Icon_Container}>
          <Antdesign name="arrowleft" size={22} />
        </View>
        <View style={Styles.Heading}>
          <Text style={Styles.Heading_Text}>Fill Your Profile</Text>
        </View>
      </View>
      <View style={Styles.Content}>
        <View style={Styles.Image_Container}>
          <View style={Styles.Image_Box}>
            {uploading ? (
              <View>
                <Text>{transferred} % Completed!</Text>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <View></View>
            )}
            {renderFileUri()}
            <TouchableOpacity onPress={() => openModal()}>
              <View style={Styles.Edit_Icon}>
                <Image source={require('../../../assets/images/Edit.png')} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.Input_Container}>
          <View style={Styles.Button_Container}>
            <View style={Styles.Button_Box1}>
              <TextInput
                style={Styles.Text_Input}
                placeholder="Full Name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
          </View>
          <View style={Styles.Button_Container}>
            <View style={Styles.Button_Box1}>
              <TextInput
                style={Styles.Text_Input}
                placeholder="NickName"
                value={nickName}
                onChangeText={(text) => setNickName(text)}
              />
            </View>
          </View>
          <View style={Styles.Button_Container}>
            <View style={Styles.Button_Box1}>
              <View>
                <TextInput
                  style={Styles.Text_Input}
                  placeholder="Date of birth"
                  value={dateOfBirth}
                  onChangeText={(text) => setDateOfBirth(text)}
                />
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => showMode()}>
                  <Antdesign name="calendar" size={15} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={Styles.Button_Container}>
            <View style={Styles.Button_Box1}>
              <TextInput
                style={Styles.Text_Input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
          </View>
          <View style={Styles.Button_Container}>
            <View style={Styles.Button_Box1}>
              <TextInput
                style={Styles.Text_Input}
                placeholder="About"
                value={about}
                onChangeText={(text) => setAbout(text)}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={Styles.Button_Box}>
        <TouchableOpacity onPress={() => profile_detail()}>
          <View style={Styles.Button}>
            <SignIn_Button title="Continue" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile_Screen;
