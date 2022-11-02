import React,{useState} from "react";
import { Text, View } from "react-native";
import CheckBox from '@react-native-community/checkbox';

const CheckBox1 = () => {

    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    return (
        <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
               <CheckBox
                    disabled={false}
                    boxType='square'
                    lineWidth= {4}
                    tintColor='#452'
                    onAnimationType='fill'
                    offAnimationType='fill'
                    style={{ transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }] ,marginTop: 3,marginLeft: 3}}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}/>
                <Text style={{fontFamily: 'Urbanist-Regular',color: '#000'}}>Remember Me</Text>
        </View>
    );
};

export default CheckBox1;