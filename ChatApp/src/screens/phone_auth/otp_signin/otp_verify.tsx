import React, { useRef, useState, useEffect } from "react";
import { View, Text, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from "react-native";
import Button1 from "../../../components/buttons/button1";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AntIcon from "react-native-vector-icons/AntDesign";
import { LogBox } from 'react-native';

const VLotp = () => {
    const navigation = useNavigation();
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');
    const [text4, setText4] = useState('');
    const [text5, setText5] = useState('');
    const [text6, setText6] = useState('');
    const [user, setUser] = useState();
    const [confirmm, setConfirmm] = useState<any>(null);
    const [timerCount, setTimer] = useState(60);
    const [activator, setActivator] = useState(Math.random());
    const route = useRoute();
    LogBox.ignoreLogs([ 'Non-serializable values were found in the navigation state', ]);
    const { confirm, uphone } = route.params;
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const ref_input5 = useRef();
    const ref_input6 = useRef();
    useEffect(() => {
    if(confirmm === null)
    {
      setConfirmm(confirm);
    }
    let interval: number;
      interval = setInterval(() => {
        if (timerCount > 0) {
          setTimer(lastTimerCount => {
            lastTimerCount <= 1 && clearInterval(interval);
            return lastTimerCount - 1;
          });
        }
      }, 1000);
    }, [activator]);

    async function signInWithPhoneNumber(phoneNumber: string) {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirmm(confirmation);
      setText1('');
      setText2('');
      setText3('');
      setText4('');
      setText5('');
      setText6('');
    }

    const onChangeText1 = (text: string) => {
        if (+text1 || text1 == "") {
          setText1(text);
        }
    };
    const onChangeText2 = (text: string) => {
        if (+text2 || text2 == "") {
          setText2(text);
        }
    };
    const onChangeText3 = (text: string) => {
        if (+text3 || text3 == "") {
          setText3(text);
        }
    };
    const onChangeText4 = (text: string) => {
        if (+text4 || text4 == "") {
          setText4(text);
        }
    };
    const onChangeText5 = (text: string) => {
        if (+text5 || text5 == "") {
          setText5(text);
        }
    };
    const onChangeText6 = (text: string) => {
        if (+text6 || text6 == "") {
          setText6(text);
        }
    };
    async function confirmCode() {
    try {
          let data = await confirmm.confirm(text1+text2+text3+text4+text5+text6).then(
            console.log('login success')
          )
          console.log(data);
          Alert.alert('login success');
        } catch (error) {
          console.log('Invalid code');
          Alert.alert('Invalid code');
        }
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{flex: 1}}>
        <SafeAreaView style={{flex: 1,backgroundColor: '#fff'}}>
            <View style={{flex: 1,padding: 24}}>
            <View>
                <Text style={{fontFamily: 'Urbanist-Bold', fontSize: 24,color: '#000'}}><AntIcon name="arrowleft" color="black" size={20} />  OTP Code Verification</Text> 
            </View>
            <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
            <View>
                <Text style={{fontFamily: 'Urbanist-Medium', fontSize: 18,marginBottom: 60,color: '#000'}}>Code has been sent to {uphone}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <TextInput placeholder="0" value={text1} onChangeText={onChangeText1} keyboardType="number-pad" maxLength={1} onChange={() => {text1.length != 0 ? '' : ref_input2.current.focus()}} style={{textAlign: 'center',paddingVertical: 10,paddingHorizontal: 15,fontSize: 24,fontFamily: 'Urbanist-Bold', backgroundColor: '#FAFAFA', borderRadius: 18,marginHorizontal: 5,borderWidth: 1,borderColor: '#EEEE'}}/>
                <TextInput placeholder="0" value={text2} onChangeText={onChangeText2} ref={ref_input2} onChange={() => {text2.length != 0 ? '' : ref_input3.current.focus()}} keyboardType="number-pad" maxLength={1} style={{textAlign: 'center',paddingVertical: 20,paddingHorizontal: 15,fontSize: 24,fontFamily: 'Urbanist-Bold', backgroundColor: '#FAFAFA', borderRadius: 18,marginHorizontal: 5,borderWidth: 1,borderColor: '#EEEE'}}/>
                <TextInput placeholder="0" value={text3} onChangeText={onChangeText3} ref={ref_input3} onChange={() => {text3.length != 0 ? '' : ref_input4.current.focus()}} keyboardType="number-pad" maxLength={1} style={{textAlign: 'center',paddingVertical: 20,paddingHorizontal: 15,fontSize: 24,fontFamily: 'Urbanist-Bold', backgroundColor: '#FAFAFA', borderRadius: 18,marginHorizontal: 5,borderWidth: 1,borderColor: '#EEEE'}}/>
                <TextInput placeholder="0" value={text4} onChangeText={onChangeText4} ref={ref_input4} onChange={() => {text4.length != 0 ? '' : ref_input5.current.focus()}} keyboardType="number-pad" maxLength={1} style={{textAlign: 'center',paddingVertical: 20,paddingHorizontal: 15,fontSize: 24,fontFamily: 'Urbanist-Bold', backgroundColor: '#FAFAFA', borderRadius: 18,marginHorizontal: 5,borderWidth: 1,borderColor: '#EEEE'}}/>
                <TextInput placeholder="0" value={text5} onChangeText={onChangeText5} ref={ref_input5} onChange={() => {text5.length != 0 ? '' : ref_input6.current.focus()}} keyboardType="number-pad" maxLength={1} style={{textAlign: 'center',paddingVertical: 20,paddingHorizontal: 15,fontSize: 24,fontFamily: 'Urbanist-Bold', backgroundColor: '#FAFAFA', borderRadius: 18,marginHorizontal: 5,borderWidth: 1,borderColor: '#EEEE'}}/>
                <TextInput placeholder="0" value={text6} onChangeText={onChangeText6} ref={ref_input6} keyboardType="number-pad" maxLength={1} style={{textAlign: 'center',paddingVertical: 20,paddingHorizontal: 15,fontSize: 24,fontFamily: 'Urbanist-Bold', backgroundColor: '#FAFAFA', borderRadius: 18,marginHorizontal: 5,borderWidth: 1,borderColor: '#EEEE'}}/>
            </View>
            <View>
                {timerCount ? 
                <Text style={{fontFamily: 'Urbanist-Medium', fontSize: 18,marginTop: 60,color: '#000'}}>Resend Code in {timerCount} sec</Text>
                :
                <Text onPress={() => signInWithPhoneNumber(uphone)} style={{fontFamily: 'Urbanist-Medium', fontSize: 18,marginTop: 60,color: '#000'}}>Resend Code</Text>
                }
            </View>
            </View>
            <TouchableOpacity onPress={() => confirmCode()}>
            <Button1 name={'Sign In'}/>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

export default VLotp;