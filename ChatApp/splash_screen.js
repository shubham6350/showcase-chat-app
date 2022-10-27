import React from 'react';
import { View, Image } from 'react-native';

const Splash_Screen = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
      }}
    >
      <View style={{ position: 'absolute', paddingBottom: 100 }}>
        <Image
          style={{ backgroundColor: '#fff', height: 325, width: 320 }}
          source={require('./assets/images/GroupDFGD.png')}
        />
      </View>
      <Image
        style={{ height: 80, width: 150, marginTop: 590 }}
        source={require('./assets/images/ezgif.com-gif-maker.gif')}
      />
    </View>
  );
};
export default Splash_Screen;
