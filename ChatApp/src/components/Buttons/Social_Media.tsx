import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Social_Media_button = (props: any) => {
  return (
    <View style={styles.Button_Container}>
      <View style={styles.Button_Box}>
        <View style={styles.Icon_container}>{props.Icon}</View>
        <View style={styles.Text_box}>
          <Text style={styles.Text}>{props.text}</Text>
        </View>
      </View>
    </View>
  );
};
export default Social_Media_button;

const styles = StyleSheet.create({
  Button_Container: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%',
    borderRadius: 15,
  },
  Button_Box: {
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
  },
  Icon_container: {
    // backgroundColor: 'green',
    height: 20,
    width: 20,
  },
  Text_box: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    // backgroundColor: 'yellow',
  },
  Text: {
    fontSize: 12,
    fontWeight: '400',
  },
});
