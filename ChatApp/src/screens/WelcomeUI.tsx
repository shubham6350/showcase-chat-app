import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import Icon2 from '../../assets/images/Icon2';
import Icon3 from '../../assets/images/Icon3';
import Icon4 from '../../assets/images/Icon4';
import Icon5 from '../../assets/images/Icon5';
import Icon6 from '../../assets/images/Icon6';
import Icon7 from '../../assets/images/Icon7';
import Icon8 from '../../assets/images/Icon8';
import Icon9 from '../../assets/images/Icon9';
import Iconn from '../../assets/images/Iconn';
import Swiper from 'react-native-swiper';

const WelcomeUI = () => {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.Container4}>
          <Swiper
            activeDot={
              <View
                style={{
                  backgroundColor: '#246BFD',
                  width: 25,
                  height: 8,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            }>
            <>
              <View style={styles.Container1}>
                <View style={styles.sec1}>
                  <View style={styles.sec1p1}>
                    <Icon4 style={{transform: [{rotate: '-14.43deg'}]}} />
                  </View>
                  <View style={styles.sec1p2}>
                    <Iconn style={{transform: [{rotate: '-14.43deg'}]}} />
                  </View>
                  <View style={styles.sec1p3}>
                    <Icon2 style={{transform: [{rotate: '14.43deg'}]}} />
                  </View>
                </View>
                <View style={styles.sec2}>
                  <View style={styles.sec2p1}>
                    <Icon3 style={{transform: [{rotate: '-14.43deg'}]}} />
                  </View>
                  <View style={styles.sec2p2}>
                    <Icon5 style={{transform: [{rotate: '-14.43deg'}]}} />
                  </View>
                  <View style={styles.sec2p3}>
                    <Icon9 style={{transform: [{rotate: '14.43deg'}]}} />
                  </View>
                </View>
                <View style={styles.sec3}>
                  <View style={styles.sec3p1}>
                    <Icon6 style={{transform: [{rotate: '20.43deg'}]}} />
                  </View>
                  <View style={styles.sec3p2}>
                    <Icon7 style={{transform: [{rotate: '14.43deg'}]}} />
                  </View>
                  <View style={styles.sec3p3}>
                    <Icon8 style={{transform: [{rotate: '14.43deg'}]}} />
                  </View>
                </View>
              </View>
              <View style={styles.Container2}>
                <Text style={styles.head1}>Welcome to Logo!</Text>
                <Text style={styles.head2}>
                  The best messenger and chat app of the century to make your day
                  great!
                </Text>
              </View>
            </>
            <>
              <View style={styles.Container1}>
                <View style={styles.sec1}>
                  <View style={styles.sec1p1}>
                    <Icon4 style={{transform: [{rotate: '-14.43deg'}]}} />
                  </View>
                  <View style={styles.sec1p2}>
                    <Iconn style={{transform: [{rotate: '-14.43deg'}]}} />
                  </View>
                  <View style={styles.sec1p3}>
                    <Icon2 style={{transform: [{rotate: '14.43deg'}]}} />
                  </View>
                </View>
                <View style={styles.sec2}>
                  <View style={styles.sec2p1}>
                    <Icon3 style={{transform: [{rotate: '-14.43deg'}]}} />
                  </View>
                  <View style={styles.sec2p2}>
                    <Icon5 style={{transform: [{rotate: '-14.43deg'}]}} />
                  </View>
                  <View style={styles.sec2p3}>
                    <Icon9 style={{transform: [{rotate: '14.43deg'}]}} />
                  </View>
                </View>
                <View style={styles.sec3}>
                  <View style={styles.sec3p1}>
                    <Icon6 style={{transform: [{rotate: '20.43deg'}]}} />
                  </View>
                  <View style={styles.sec3p2}>
                    <Icon7 style={{transform: [{rotate: '14.43deg'}]}} />
                  </View>
                  <View style={styles.sec3p3}>
                    <Icon8 style={{transform: [{rotate: '14.43deg'}]}} />
                  </View>
                </View>
              </View>
              <View style={styles.Container2}>
                <Text style={styles.head1}>Welcome to Logo!</Text>
                <Text style={styles.head2}>
                  The best messenger and chat app of the century to make your day
                  great!
                </Text>
              </View>
            </>
          </Swiper>
        </View>
        <View style={styles.Container3}>
          <View>
            <Text style={styles.getS}>Get Started</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    mainContainer: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    Container1: {
      flex: 6,
      display: 'flex',
      paddingBottom: 60,
    },
    Container2: {
      flex: 2,
      display: 'flex',
      color: '#000',
      marginBottom: 60,
    },
    Container3: {
      flex: 1,
      display: 'flex',
      marginTop: 10,
    },
    Container4: {
      flex: 9,
      display: 'flex',
    },
    sec1: {
      flexDirection: 'row',
      marginTop: 50,
    },
    sec2: {
      flexDirection: 'row',
    },
    sec3: {
      flexDirection: 'row',
    },
    sec1p1: {
      paddingTop: 120,
      marginLeft: -10,
    },
    sec1p2: {
      flexDirection: 'row',
    },
    sec1p3: {
      paddingLeft: 40,
    },
    sec2p1: {
      paddingLeft: 80,
      position: 'absolute',
      marginTop: -75,
    },
    sec2p2: {
      position: 'absolute',
      marginTop: -50,
      marginLeft: 250,
      zIndex: 3,
    },
    sec2p3: {
      marginLeft: 330,
      marginTop: 20,
    },
    sec3p1: {
      marginLeft: -20,
      marginTop: -40,
    },
    sec3p2: {
      marginLeft: 10,
      marginTop: 30,
    },
    sec3p3: {
      marginLeft: 30,
      marginTop: -20,
    },
    getS: {
      padding: 20,
      textAlign: 'center',
      backgroundColor: '#246BFD',
      color: '#fff',
      fontWeight: 'bold',
      marginLeft: 30,
      marginRight: 30,
      borderRadius: 28,
      overflow: 'hidden',
    },
    head1: {
      fontSize: 35,
      fontWeight: 'bold',
      color: '#246BFD',
      textAlign: 'center',
      paddingTop: 35,
      paddingBottom: 18,
    },
    head2: {
      textAlign: 'center',
      paddingLeft: 40,
      paddingRight: 40,
      color: '#212121',
    },
  });
  
  export default WelcomeUI;