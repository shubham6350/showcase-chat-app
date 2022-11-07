import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SignIn_Button = (props: any) => {
  return (
    <View style={styles.Button_Container}>
      <View style={styles.Title_Box}>
        <Text style={styles.Title}>{props.title}</Text>
      </View>
    </View>
  );
};
export default SignIn_Button;

const styles = StyleSheet.create({
  Button_Container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#246BFD',
    height: 53,
    width: '100%',
  },
  Title_Box: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 348,
    height: 22,
  },
  Title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
