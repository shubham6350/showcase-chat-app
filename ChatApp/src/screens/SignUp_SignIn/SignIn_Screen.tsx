import Styles from './Style';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Antdesign from 'react-native-vector-icons/AntDesign';
import SignIn_Button from '../../components/Buttons/SignIn';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import Social_Media_button from '../../components/Buttons/Social_Media';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const SignIn_Screen = () => {
  const navigation = useNavigation();

  const [userDetail, setUserDetail] = useState({});

  console.log(userDetail);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '993010448494-junrsuvh8tq7g3ena1edbb8lnj43e0h5.apps.googleusercontent.com',
    });
  }, []);

  //Google SignIn function

  const GoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      navigation.navigate('Profile');
      setUserDetail((userDetail) => ({
        ...userDetail,
        ...googleCredential,
      }));

      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  };

  //Facebook login function

  const FacebookLogin = async () => {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    // console.log(data);

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    navigation.navigate('Profile');
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  };

  //SignOut function

  return (
    <SafeAreaView>
      <View style={Styles.icon_container}>
        <TouchableOpacity onPress={() => navigation.navigate('Welcome_Screen')}>
          <Antdesign name="arrowleft" size={20} />
        </TouchableOpacity>
      </View>
      <View style={Styles.Image_Container}>
        <View style={Styles.Image_Box}>
          <Image
            style={{ height: 170, width: 200 }}
            source={require('../../../assets/images/Framebanner.png')}
          />
        </View>
      </View>
      <View style={Styles.Heading}>
        <View style={Styles.Heading_text_Box}>
          <Text style={Styles.Heading_text}>Let's you in</Text>
        </View>
      </View>
      <View style={Styles.Social_Media_SignIn_Container}>
        <TouchableOpacity onPress={() => FacebookLogin()}>
          <Social_Media_button
            Icon={
              <Image
                style={{ height: '100%', width: '100%' }}
                source={require('../../../assets/images/facebook.png')}
              />
            }
            text="Continue with Facebook"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => GoogleLogin()}>
          <Social_Media_button
            Icon={
              <Image
                style={{ height: '100%', width: '100%' }}
                source={require('../../../assets/images/Google_Logo.png')}
              />
            }
            text="Continue with Google"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Signout()}>
          <Social_Media_button
            Icon={
              <Image
                style={{ height: '100%', width: '80%' }}
                source={require('../../../assets/images/apple.png')}
              />
            }
            text="Continue with Apple"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: '5%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <View style={{ borderWidth: 1, width: 140, borderColor: '#EEEEEE' }}></View>
        <View>
          <Text style={{ color: '#616161' }}>or</Text>
        </View>
        <View style={{ borderWidth: 1, width: 130, borderColor: '#EEEEEE' }}></View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <View style={Styles.Button_container}>
          <SignIn_Button title="Sign in with Phone Number" />
        </View>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          marginBottom: 48,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: '#9E9E9E' }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ color: '#246BFD' }}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SignIn_Screen;
