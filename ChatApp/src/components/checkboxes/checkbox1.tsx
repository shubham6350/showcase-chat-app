import React,{useState} from "react";
import { Text, View } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import { useColorScheme } from 'react-native';

const CheckBox1 = () => {

    const scheme = useColorScheme();
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    return (
        <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
               <CheckBox
                    disabled={false}
                    boxType='square'
                    lineWidth= {4}
                    tintColors={ scheme === 'dark' ?  { true: '#fff', false: '#fff' } : {true: '#000', false: '#000'}}
                    onAnimationType='fill'
                    offAnimationType='fill'
                    style={{ transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }] ,marginTop: 3,marginLeft: 3}}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}/>
                <Text style={scheme === 'dark' ? {fontFamily: 'Urbanist-Regular',color: '#fff'} : {fontFamily: 'Urbanist-Regular',color: '#000'}}>Remember Me</Text>
        </View>
    );
};

export default CheckBox1;