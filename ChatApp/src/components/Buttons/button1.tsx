import React,{FC} from "react";
import { Text, View } from "react-native";

interface props {
    name: string,
}

const Button1 : FC<props> = props => {
    return (
        <View style={{width: '100%',height: 50,justifyContent: 'center',backgroundColor: '#3062C8',borderRadius: 28,overflow: 'hidden'}}>
        <Text style={{fontFamily: 'Urbanist-Bold',textAlign: 'center',color: '#ffff',fontSize: 16}}>
        {props.name}
        </Text>
        </View>
    );
};

export default Button1;