import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import theme from '../../../resources/theme';
import style from '../CometChatDeleteMessageBubble/style';
import Antdesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import CometChatMessageList from '../CometChatMessageList';
// import { JumpingTransition } from 'react-native-reanimated';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { CometChatManager } from '../../../utils/controller';
// import { Image } from 'react-native-svg';
// import { FlatList } from 'react-native-gesture-handler';

const StarMessages = ({ navigation }) => {
  const [saved, setSaved] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  console.log('shu_3');

  useEffect(() => {
    FetchStarMessages();
    console.log('shu_1');
    new CometChatManager()
      .getLoggedInUser()
      .then((user) => {
        setLoggedInUser(user);
      })
      .catch(() => {
        logger('[CometChatMessages] getLoggedInUser error', error);
      });
  }, []);

  const FetchStarMessages = async () => {
    console.log('shu_2');
    const URL = `v1/fetch`;
    await CometChat.callExtension('save-message', 'GET', URL, null)
      .then((response) => {
        setSaved(response);
        // {savedMessages: []}
        // response.savedMessages.map((item) => {
        //   console.log(item.data);
        // });
      })
      .catch((error) => {
        // Error occured
      });
  };

  //   FetchStarMessages();

  console.log(saved.savedMessages, 'sdftfds');

  // const renderItem = ({ item }) => {
  //   return <Text>{item.data.text}</Text>;
  // };

 

  return (
    <SafeAreaView>
      <View style={styles.StarMessagesHeader}>
        <View style={styles.StarMessagesHeaderContainer}>
          <View style={styles.backIconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
              <Antdesign name="arrowleft" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => FetchStarMessages()}
            style={styles.headingContainer}>
            <Text style={styles.headingText}>Starred Messages</Text>
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Antdesign name="search1" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.InfoIconContainer}>
            <Icon name="ellipsis-horizontal-circle" color="#FFFFFF" size={24} />
          </View>
        </View>
      </View>
      <View style={styles.StarMessagesContent}>
        {/* <FlatList
            data={saved.savedMessages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          /> */}

        {saved.savedMessages ? (
          <CometChatMessageList
            theme={theme}
            //   messagefunction={this.messageFunction}
            messages={saved.savedMessages}
            // item={
            //   'user' === CometChat.RECEIVER_TYPE.USER
            //     ? this.state.user
            //     : this.state.item
            // }
            // type="user"
            //   scrollToBottom={this.state.scrollToBottom}
            //   messageConfig={params.messageconfig}
            //   showMessage={(type, message) => {
            //     this.DropDownAlertRef?.showMessage(type, message);
            //   }}
            // widgetsettings={route.params.widgetsettings}
            // widgetconfig={route.params.widgetconfig}
            loggedInUser={loggedInUser}
            //   actionGenerated={this.actionHandler}
            //   starMessages={this.starMessages}
          />
        ) : (
          <View
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: '#FFF',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{ height: 200, width: 200 }}
              source={require('../../../../../../../assets/images/ezgif.com-gif-maker.gif')}
            />
          </View>
        )}

        {/* // <CometChatMessageList
        //   theme={theme}
        //   //   messagefunction={this.messageFunction}
        //   messages={saved.savedMessages}
        //   // item={ 
        //   //   'user' === CometChat.RECEIVER_TYPE.USER
        //   //     ? this.state.user
        //   //     : this.state.item
        //   // }
        //   // type="user"
        //   //   scrollToBottom={this.state.scrollToBottom}
        //   //   messageConfig={params.messageconfig}
        //   //   showMessage={(type, message) => {
        //   //     this.DropDownAlertRef?.showMessage(type, message);
        //   //   }}
        //   // widgetsettings={route.params.widgetsettings}
        //   // widgetconfig={route.params.widgetconfig}
        //   loggedInUser={loggedInUser}
        //   //   actionGenerated={this.actionHandler}
        //   //   starMessages={this.starMessages}
        // /> */}
      </View>
    </SafeAreaView>
  );
};

export default StarMessages;

const styles = StyleSheet.create({
  StarMessagesHeader: {
    width: '100%',
    height: '10%',
    backgroundColor: '#246BFD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  StarMessagesHeaderContainer: {
    height: '50%',
    width: '100%',
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  backIconContainer: {
    width: '10%',
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingContainer: {
    width: '60%',
    // backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headingText: {
    fontFamily: 'urbanist',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 28.8,
    color: '#FFFFFF',
  },
  searchContainer: {
    width: '10%',
    // backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  InfoIconContainer: {
    width: '10%',
    // backgroundColor:'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  StarMessagesContent: {
    height: '90%',
    width: '100%',
    // backgroundColor: 'green',
  },
});
