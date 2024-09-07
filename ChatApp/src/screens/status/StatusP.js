import React, { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Platform,
  Alert,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import StoryContainer from '../../stories/StoryContainer';
import statusContext from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Status/statusContext';
import ProgressBar from '../../../src/stories/ProgressView';
import { useNavigation } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import PROFILE from '../../../src/images/smiley.png';
import BACK from '../../../src/images/back.png';
const images = [
  // 'https://firebasestorage.googleapis.com/v0/b/chatapp-7faa8.appspot.com/o/ReactNative-snapshot-image4657102062891924291.jpg?alt=media&token=5cfb3520-b8dd-4cab-84ea-9244ca449ee4',
  // 'https://boostupliving.com/wp-content/uploads/2019/06/best-motivational-quote-mobile-wallpapers-53.jpg',
  // 'https://firebasestorage.googleapis.com/v0/b/chatapp-7faa8.appspot.com/o/97F27184-89C7-4ED8-83C3-B91FF64538CF.jpg?alt=media',
  // 'https://pumpernickelpixie.com/wp-content/uploads/2016/01/15-phone-wallpaper.jpg',
  // 'https://i.pinimg.com/originals/5a/f0/e5/5af0e538f7437fd13a73f7c96601ccb6.jpg',
];
const StatusP = ({ route, navigation }) => {
  let MID_GREEN = '#fff';
  let BLACK = '#000';
  let LIGHT_GREEN = '#fff';
  let BAR_ACTIVE_COLOR = '#fff';
  let BAR_INACTIVE_COLOR = '#000';
  let TINT_GRAY = '#FAFAFA';
  const statusref = firestore().collection('users');
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState('');
  let [stories, setStories] = useState([]);
  let statusRef = firestore().collection('users');
  const [num, setNum] = useState(null);
  const { user_Detail, Stories, user_type } = route.params;
  let cstories = useContext(statusContext);
  console.log(user_type, '=======++++++++++++');

  // const img = JSON.stringify(status);
  // console.log(JSON.stringify(status), '324234234234');
  // console.log(JSON.stringify(status), '33223423423423');
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log(user.uid);
        setUser(user);
        setUid(user.uid);
      } else {
        navigation.navigate('SignIn_Screen');
      }
    });
  }, []);
  useEffect(() => {
    {
      uid.length > 1
        ? statusRef
            .doc(uid)
            .collection('stories')
            .get()
            .then((querySnapshot) => {
              console.log('Total users: ', querySnapshot.size);
              setNum(querySnapshot.size);

              querySnapshot.forEach((documentSnapshot) => {
                stories.push(documentSnapshot.data().imageUrl);
                // images.push(documentSnapshot.data().imageUrl);

                // setPimages([...pimages, documentSnapshot.data().imageUrl]);
              });
            })
        : null;
    }
  }, [uid]);

  // console.log(stories, '================--------');
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      {Platform.OS === 'ios' && (
        <View
          // To set the background color in IOS Status Bar also
          style={{
            backgroundColor: TINT_GRAY,
            height: 45,
          }}
        >
          <StatusBar barStyle="light-content" backgroundColor={LIGHT_GREEN} />
        </View>
      )}
      {Platform.OS === 'android' && (
        <StatusBar barStyle="dark-content" backgroundColor={MID_GREEN} />
      )}
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        {/* Individual Story View component */}
        {/* {console.log(pimages)} */}

        <StoryContainer
          visible={true}
          enableProgress={false}
          images={user_type === 'self' ? cstories : Stories}
          duration={30}
          containerStyle={{
            width: '100%',
            height: '100%',
          }}
          // Inbuilt User Information in header
          userProfile={{
            userImage:
              user_type === 'self'
                ? user_Detail.avatar
                : user_Detail.documentSnapshot._data.imagerurl,
            userName:
              user_type === 'self' ? user_Detail.name : user_Detail.documentSnapshot._data.name,
            userMessage: user_type === 'self' ? user_Detail.status : 'available',
            imageArrow: BACK,
            onImageClick: () => {
              navigation.navigate('Chat');
            },
          }}
          // Custom Header component option
          // Inbuilt Reply option  in Footer
          replyView={{
            isShowReply: true,
            onReplyTextChange: (textReply, progressIndex) => {
              console.log(`Text : ${textReply} , position : ${progressIndex}`);
            },
            onReplyButtonClick: (buttonType, progressIndex) => {
              switch (buttonType) {
                case 'send':
                  console.log(`Send button tapped for position : ${progressIndex}`);
                  break;
                case 'smiley':
                  console.log(`Smiley button tapped for position : ${progressIndex}`);
                  break;
              }
            },
          }}
          // Custom Footer component option
          // footerComponent={<View />}
          // ProgressBar style options
          barStyle={{
            barActiveColor: BAR_ACTIVE_COLOR,
            barInActiveColor: BAR_INACTIVE_COLOR,
            barWidth: 100, // always in number
            barHeight: 4, // always in number
          }}
          // Story Image style options
          imageStyle={{
            width: Dimensions.get('window').width, // always in number
            height: Dimensions.get('window').height, // always in number
          }}
          //Callback when status view completes
          onComplete={() => navigation.navigate('Chat')}
        />
      </SafeAreaView>
    </View>
  );
};
export default StatusP;
