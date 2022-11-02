import React,{ useState } from "react";
import { View, Text, SafeAreaView, Image, TextInput, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity } from "react-native";
import CountryPicker from "rn-country-picker";
import styles from "./styles";
import Button1 from "../../../components/buttons/button1";
import CheckBox1 from "../../../components/checkboxes/checkbox1";
import auth from '@react-native-firebase/auth';
import AntIcon from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';

const PSAuth = () => {
    const navigation = useNavigation();
    const [text, setText] = useState('');
    const [confirm, setConfirm] = useState<any>(null);
    const [countryCode, setCountryCode] = useState<string>("91");
    const onChangeText = (text: string) => {
        if (+text || text == "") {
          setText(text);
        }
    };

    async function signInWithPhoneNumber(phoneNumber: string) {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
        navigation.navigate('VLotp',{
            'confirm': confirmation,
            'uphone': '+'+countryCode+text,
        });
    }

	const selectedValue = (value: string) => {
		setCountryCode(value);
	};
    return (
        <SafeAreaView style={styles.mainContainer}>
            <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{flex: 1}}
         >
            <View style={styles.container1}>
            <View style={{flex: 1}}>
            <AntIcon name="arrowleft" color="black" size={20} />
            </View>
            <View style={styles.logoc}>
            <Image style={styles.simage} source={require('../../../../assets/images/image21.png')} />
            </View>
            <View style={styles.heads1}>
                <Text style={styles.head1}>Create New Account</Text>
            </View>
            <View style={styles.countp}>
                <CountryPicker
				disable={false}
				animationType={"slide"}
				language="en"
				pickerTitle={"Country Picker"}
				hideCountryFlag={false}
				hideCountryCode={false}
				countryCode={"91"}
				selectedValue={selectedValue}
			    />
                <TextInput
                placeholder={'Enter number here'}
                keyboardType="numeric"
                value={text}
                maxLength={10}
                onChangeText={onChangeText}/>
            </View>
            <View style={styles.remeb}>
            <CheckBox1 />
            </View>
            <View style={styles.but1}>
            <TouchableOpacity onPress={() => signInWithPhoneNumber('+'+countryCode+text)}>
            <Button1 name={'Sign In'}/>
            </TouchableOpacity>
            </View>
            <View style={styles.bott}>
                <Text style={styles.bottxt}>Already have an account?<Text style={{color: '#246BFD'}} onPress={() => navigation.navigate('SignIn')}>Sign In</Text></Text>
            </View>
            </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default PSAuth;