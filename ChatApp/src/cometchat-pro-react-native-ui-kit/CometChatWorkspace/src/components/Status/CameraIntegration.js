import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
import ViewShot, { captureScreen } from 'react-native-nj-view-shot';
import { EventRegister } from 'react-native-event-listeners';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

const CameraIntegration = ({ route, navigation }) => {
  const ref = useRef();
  const { imageUrl } = route.params;
  const [uid, setUid] = useState('');
  const [caption, setCaption] = useState('');
  const [loader, setLoader] = useState(false);
  const [text_Font, setFonts] = useState('Urbanist-Regular');
  console.log(imageUrl, '==============');
  console.log('file://' + imageUrl, '=-==-=--=-=-=-=');
  let statusref = firestore().collection('users');
  const font = [
    'Inspiration-regular',
    'Urbanist-Regular',
    'Pacifico-Regular',
    'DancingScript-VariableFont_wght',
    'RubikVinyl-Regular',
  ];

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

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const get_font = () => {
    const c = randomIntFromInterval(0, 4);
    console.log(font[c], '=====++');
    setFonts(font[c]);
  };

  const send_Image = async () => {
    Keyboard.dismiss();
    let date = new Date();
    setLoader(true);
    let fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    const task = storage().ref(fileName).putFile(imageUrl);

    try {
      await task;
      const url = await storage().ref(fileName).getDownloadURL();

      navigation.goBack();
      await statusref
        .doc(uid)
        .collection('stories')
        .doc()
        .set({
          createdAt: date,
          imageUrl: url,
          caption: caption,
          type: 'status_image',
          viewed_by: [],
        })
        .then(async () => {
          setLoader(false);

          await statusref.doc(uid).update({
            lastUpdatedAt: date,
          });

          console.log('Firestore updated');
          EventRegister.emit('updateStatus', {
            id: url,
            data: {
              caption: caption,
              createdAt: new Date(),
              imageUrl: url,
              type: 'status_image',
              viewed_by: [],
            },
          });
        })
        .catch((error) => {
          Alert.alert(error);
        });
      console.log(url);
    } catch (e) {
      console.log(e);
    }
  };

  if (loader != false) {
    return <ActivityIndicator style={{ flex: 1 }} size={50} color="#246BFD" />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <View style={styles.Image_Container}>
        {/* <View style={styles.header}></View> */}

        <Image style={{ flex: 1 }} source={{ uri: 'file://' + imageUrl }} />
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="cross" size={30} style={styles.cross_Icon} color="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => get_font()}>
        <Image
          style={styles.Text_Icon}
          source={require('../../../../../../assets/images/TextIcon.png')}
        />
      </TouchableOpacity>

      <View style={styles.textInput_Box}>
        <TextInput
          style={[styles.Input_Box, { fontFamily: text_Font }]}
          placeholder="Add a caption"
          onChangeText={(value) => setCaption(value)}
        />
        <TouchableOpacity onPress={() => send_Image()}>
          <Image
            style={{ height: 56, width: 56 }}
            source={require('../../../../../../assets/images/send_Icon.png')}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default CameraIntegration;
const styles = StyleSheet.create({
  Image_Container: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  Text_Icon: {
    height: 20,
    width: 20,
    right: 20,
    position: 'absolute',
    top: 25,
  },
  textInput_Box: {
    height: '10%',
    width: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 25,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  Input_Box: {
    width: '70%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
  },
  cross_Icon: {
    left: 15,
    top: 20,
    position: 'absolute',
  },
});
