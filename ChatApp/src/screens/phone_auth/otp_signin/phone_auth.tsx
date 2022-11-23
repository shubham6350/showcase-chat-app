import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CountryPicker from 'rn-country-picker';
import styles from './styles';
import { styles_dark } from './styles';
import Button1 from '../../../components/Buttons/button1';
import CheckBox1 from '../../../components/checkboxes/checkbox1';
import auth from '@react-native-firebase/auth';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const PLAuth = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const scheme = useColorScheme();
  const [confirm, setConfirm] = useState<any>(null);
  const [countryCode, setCountryCode] = useState<string>('91');
  const onChangeText = (text: string) => {
    if (+text || text == '') {
      setText(text);
    }
  };

  async function signInWithPhoneNumber(phoneNumber: string) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    navigation.navigate('VLotp', {
      confirm: confirmation,
      uphone: '+' + countryCode + text,
    });
  }

  const selectedValue = (value: string) => {
    setCountryCode(value);
  };
  return (
    <SafeAreaView style={scheme === 'dark' ? styles_dark.mainContainer : styles.mainContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={scheme === 'dark' ? styles_dark.container1 : styles.container1}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn_Screen')}>
            {scheme === 'dark' ? 
            <AntIcon name="arrowleft" color="#fff" size={20} />
            :
            <AntIcon name="arrowleft" color="black" size={20} />
            }
          </TouchableOpacity>
          <View style={styles.logoc}>
            <Image
              style={styles.simage}
              source={require('../../../../assets/images/image21.png')}
            />
          </View>
          <View style={scheme === 'dark' ? styles_dark.heads1 : styles.heads1}>
            <Text style={scheme === 'dark' ? styles_dark.head1 : styles.head1}>Login to Your Account</Text>
          </View>
          <View style={scheme === 'dark' ? styles_dark.countp : styles.countp}>
            <CountryPicker
              disable={false}
              animationType={'slide'}
              language="en"
              pickerTitle={'Country Picker'}
              hideCountryFlag={false}
              hideCountryCode={false}
              countryCode={'91'}
              selectedCountryTextStyle={scheme === 'dark' ? {color: '#fff'} : {color: '#000'}}
              selectedValue={selectedValue}
            />
            <TextInput
              placeholder={'Enter number here'}
              keyboardType="numeric"
              value={text}
              maxLength={10}
              onChangeText={onChangeText}
              style={scheme === 'dark' ? {color: '#fff'} : {color: '#000'}}
            />
          </View>
          <View style={styles.remeb}>
            <CheckBox1 />
          </View>
          <View style={styles.but1}>
            <TouchableOpacity onPress={() => signInWithPhoneNumber('+' + countryCode + text)}>
              <Button1 name={'Sign In'} />
            </TouchableOpacity>
          </View>
          <View style={styles.bott}>
            <Text style={styles.bottxt}>
              Don't have an Account?
              <Text style={{ color: '#246BFD' }} onPress={() => navigation.navigate('SignUp')}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PLAuth;
