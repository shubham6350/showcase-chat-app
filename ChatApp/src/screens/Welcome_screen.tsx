import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Welcome_screen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Welcome to ChatUI</Text>
    </SafeAreaView>
  );
};

export default Welcome_screen;
