import React, { Component, useState } from 'react';
import { Text, TouchableOpacity, View, Image, Modal, TextInput, Keyboard } from 'react-native';
import Styles from './Style';
import SignIn_Button from '../../components/Buttons/SignIn';
import { SafeAreaView } from 'react-native';
import Antdesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
var ImagePicker = require('react-native-image-picker');

const Profile_Screen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
  const [filePath, setFilePath] = useState({
    assets: {
      data: '',
      uri: '',
    },
  });
  const [fileData, setFileData] = useState('');
  const [fileUri, setFileUri] = useState('');

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
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log('response====', JSON.stringify(response.assets[0].uri));
        setFilePath(response);
        setFileData(response.data);
        setFileUri(response.assets[0].uri);
      }
    });
  };

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
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        setFilePath(response);
        setFileData(response.data);
        setFileUri(response.uri);
      }
    });
  };

  const renderFileUri = () => {
    if (fileUri) {
      return <Image source={{ uri: fileUri }} style={Styles.images} />;
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
      Name: name,
      NickName: nickName,
      DateOfBirth: dateOfBirth,
      Email: email,
      About: about,
      Imagerui: fileUri,
    };
    Todoref.add(data)
      .then(() => {
        setName(''),
          setNickName(''),
          setDateOfBirth(''),
          setEmail(''),
          setAbout(''),
          setFileUri(''),
          Keyboard.dismiss();
      })
      .catch((error) => {
        alert(error);
      });
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
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[Styles.button, Styles.buttonClose]}
                onPress={() => chooseImage()}
              >
                <FontAwesome name="photo" size={40} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[Styles.button, Styles.buttonClose]}
                onPress={() => launchCamera()}
              >
                <FontAwesome name="camera" size={40} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[Styles.button, Styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={Styles.textStyle}>cancel</Text>
            </TouchableOpacity>
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
              <TextInput
                style={Styles.Text_Input}
                placeholder="Date of birth"
                value={dateOfBirth}
                onChangeText={(text) => setDateOfBirth(text)}
              />
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
function alert(customButton: any) {
  throw new Error('Function not implemented.');
}
