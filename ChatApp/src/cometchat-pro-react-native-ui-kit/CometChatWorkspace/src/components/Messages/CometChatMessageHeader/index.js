/* eslint-disable radix */
import React from 'react';
import { MessageHeaderManager } from './controller';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { CometChatUserPresence, CometChatAvatar } from '../../Shared';
import * as enums from '../../../utils/enums';
import * as actions from '../../../utils/actions';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import styles from './styles';
import audioCallIcon from './resources/audioCall.png';
import videoCallIcon from './resources/videoCall.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import detailPaneIcon from './resources/detailpane.png';
import { logger } from '../../../utils/common';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { CometChatContext } from '../../../utils/CometChatContext';
class CometChatMessageHeader extends React.Component {
  static contextType = CometChatContext;
  constructor(props) {
    super(props);

    this.state = {
      status: '',
      presence: 'offline',
    };
  }

  componentDidMount() {
    this.MessageHeaderManager = new MessageHeaderManager();
    this.MessageHeaderManager.attachListeners(this.updateHeader);

    if (this.props.type === CometChat.RECEIVER_TYPE.USER) {
      this.setStatusForUser();
    } else {
      this.setStatusForGroup();
    }
    this.checkRestrictions();
  }

  checkRestrictions = async () => {
    let isGroupVideoCallEnabled =
      await this.context.FeatureRestriction.isGroupVideoCallEnabled();
    let isOneOnOneAudioCallEnabled =
      await this.context.FeatureRestriction.isOneOnOneAudioCallEnabled();
    let isTypingIndicatorsEnabled =
      await this.context.FeatureRestriction.isTypingIndicatorsEnabled();
    let isOneOnOneVideoCallEnabled =
      await this.context.FeatureRestriction.isOneOnOneVideoCallEnabled();
    let isGroupAudioCallEnabled =
      await this.context.FeatureRestriction.isGroupAudioCallEnabled();
    this.setState({
      restrictions: {
        isGroupVideoCallEnabled,
        isOneOnOneAudioCallEnabled,
        isTypingIndicatorsEnabled,
        isOneOnOneVideoCallEnabled,
        isGroupAudioCallEnabled,
      },
    });
  };

  componentDidUpdate(prevProps) {
    try {
      this.MessageHeaderManager.removeListeners();
      this.MessageHeaderManager = new MessageHeaderManager();
      this.MessageHeaderManager.attachListeners(this.updateHeader);

      if (
        this.props.type === CometChat.RECEIVER_TYPE.USER &&
        prevProps.item.uid !== this.props.item.uid
      ) {
        this.setStatusForUser();
      } else if (
        this.props.type === CometChat.RECEIVER_TYPE.GROUP &&
        (prevProps.item.guid !== this.props.item.guid ||
          (prevProps.item.guid === this.props.item.guid &&
            prevProps.item.membersCount !== this.props.item.membersCount))
      ) {
        this.setStatusForGroup();
      }
    } catch (error) {
      logger(error);
    }
  }

  componentWillUnmount() {
    this.MessageHeaderManager.removeListeners();
    this.MessageHeaderManager = null;
  }

  /**
   * handler for set status for user i.e online/offline
   * @param
   */

  setStatusForUser = () => {
    try {
      let { status } = this.props.item;
      const presence =
        this.props.item.status === CometChat.USER_STATUS.ONLINE
          ? CometChat.USER_STATUS.ONLINE
          : CometChat.USER_STATUS.OFFLINE;
      if (
        this.props.item.status === CometChat.USER_STATUS.OFFLINE &&
        this.props.item.lastActiveAt
      ) {
        let messageTimestamp = new Date(this.props.item.lastActiveAt * 1000);
        const currentTimestamp = new Date();

        if (
          messageTimestamp.getUTCFullYear() ==
            currentTimestamp.getUTCFullYear() &&
          messageTimestamp.getUTCMonth() == currentTimestamp.getUTCMonth() &&
          messageTimestamp.getUTCDate() == currentTimestamp.getUTCDate()
        ) {
          let hours = messageTimestamp.getHours();
          let minutes = messageTimestamp.getMinutes();
          let ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12;
          minutes = minutes < 10 ? '0' + minutes : minutes;
          status = hours + ':' + minutes + ' ' + ampm.toUpperCase();
        } else if (
          messageTimestamp.getUTCFullYear() ==
            currentTimestamp.getUTCFullYear() &&
          messageTimestamp.getUTCMonth() == currentTimestamp.getUTCMonth() &&
          messageTimestamp.getUTCDate() == currentTimestamp.getUTCDate() - 1
        ) {
          let hours = messageTimestamp.getHours();
          let minutes = messageTimestamp.getMinutes();
          let ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12;
          minutes = minutes < 10 ? '0' + minutes : minutes;
          status =
            'Yesterday, ' + hours + ':' + minutes + ' ' + ampm.toUpperCase();
        } else {
          const month = String(messageTimestamp.getMonth() + 1).padStart(
            2,
            '0',
          );
          const day = String(messageTimestamp.getDate()).padStart(2, '0');
          const year = messageTimestamp.getFullYear();
          status = day + '/' + month + '/' + year;
        }
      } else if (this.props.item.status === CometChat.USER_STATUS.OFFLINE) {
        status = 'offline';
      }

      this.setState({ status, presence });
    } catch (error) {
      logger(error);
    }
  };

  /**
   * handler for set status for group i.e memberCount
   * @param
   */
  setStatusForGroup = () => {
    try {
      const status = `${this.props.item.membersCount} Members`;
      this.setState({ status });
    } catch (error) {
      logger(error);
    }
  };

  /**
   * handler for updation of header based on key.
   * @param key: action name
   * @param item: item object
   * @param groupUser: groupUser object
   */
  updateHeader = (key, item, groupUser) => {
    try {
      switch (key) {
        case enums.USER_ONLINE:
        case enums.USER_OFFLINE: {
          if (
            this.props.type === CometChat.RECEIVER_TYPE.USER &&
            this.props.item.uid === item.uid
          ) {
            this.setState({ status: item.status, presence: item.status });
          }
          this.props.actionGenerated(actions.STATUS_UPDATED, item.status);
          break;
        }
        case enums.GROUP_MEMBER_KICKED:
        case enums.GROUP_MEMBER_BANNED:
        case enums.GROUP_MEMBER_LEFT:
          if (
            this.props.type === CometChat.RECEIVER_TYPE.GROUP &&
            this.props.item.guid === item.guid &&
            this.props.loggedInUser.uid !== groupUser.uid
          ) {
            const membersCount = parseInt(item.membersCount);
            const status = `${membersCount} Members`;
            this.setState({ status });
          }
          break;
        case enums.GROUP_MEMBER_JOINED:
          if (
            this.props.type === CometChat.RECEIVER_TYPE.GROUP &&
            this.props.item.guid === item.guid
          ) {
            const membersCount = parseInt(item.membersCount);
            const status = `${membersCount} Members`;
            this.setState({ status });
          }
          break;
        case enums.GROUP_MEMBER_ADDED:
          if (
            this.props.type === CometChat.RECEIVER_TYPE.GROUP &&
            this.props.item.guid === item.guid
          ) {
            const membersCount = parseInt(item.membersCount);
            const status = `${membersCount} Members`;
            this.setState({ status });
          }
          break;
        case enums.TYPING_STARTED: {
          if (
            this.props.type === CometChat.RECEIVER_TYPE.GROUP &&
            this.props.type === item.receiverType &&
            this.props.item.guid === item.receiverId
          ) {
            if (this.state.restrictions?.isTypingIndicatorsEnabled) {
              this.setState({ status: `${item.sender.name} is typing...` });
              this.props.actionGenerated(actions.SHOW_REACTION, item);
            }
          } else if (
            this.props.type === CometChat.RECEIVER_TYPE.USER &&
            this.props.type === item.receiverType &&
            this.props.item.uid === item.sender.uid
          ) {
            this.setState({ status: 'typing...' });
            this.props.actionGenerated(actions.SHOW_REACTION, item);
          }
          break;
        }
        case enums.TYPING_ENDED: {
          if (
            this.props.type === CometChat.RECEIVER_TYPE.GROUP &&
            this.props.type === item.receiverType &&
            this.props.item.guid === item.receiverId
          ) {
            this.setStatusForGroup();
            this.props.actionGenerated(actions.STOP_REACTION, item);
          } else if (
            this.props.type === CometChat.RECEIVER_TYPE.USER &&
            this.props.type === item.receiverType &&
            this.props.item.uid === item.sender.uid
          ) {
            this.props.actionGenerated(actions.STOP_REACTION, item);

            if (this.state.presence === 'online') {
              this.setState({ status: 'online', presence: 'online' });
            } else {
              this.setStatusForUser();
            }
          }
          break;
        }
        default:
          break;
      }
    } catch (error) {
      logger(error);
    }
  };

  render() {
    let image;
    let userName;
    let presence;
    if (this.props.type === CometChat.RECEIVER_TYPE.USER) {
      image = this.props.item.avatar;
      userName = this.props.item.name;
      presence = (
        <CometChatUserPresence
          status={this.state.presence}
          style={{ top: 28 }}
          cornerRadius={9}
          borderColor={this.props.theme.borderColor.white}
          borderWidth={2}
        />
      );
    } else {
      if (this.props.item.icon) {
        image = this.props.item.icon;
      }
      userName = this.props.item.name;
    }

    // console.log(this.state.restrictions?.isGroupAudioCallEnabled, 'kkkkkkkkkk');

    let status = (
      <Text style={styles.statusText} numberOfLines={1}>
        {this.state.status}
      </Text>
    );

    let videoCallBtn = (
      <TouchableOpacity
        onPress={() => this.props.actionGenerated(actions.VIDEO_CALL)}
        style={styles.videoCallContainer}>
        {/* <FontAwesome size={22} name="video-camera" color="#fff" /> */}

        <Image
          source={require('../../../../../../../assets/images/Videovideo.png')}
          style={{ width: 28, height: 28 }}
        />
      </TouchableOpacity>
    );

    let audioCallBtn = (
      <TouchableOpacity
        onPress={() => this.props.actionGenerated(actions.AUDIO_CALL)}
        style={styles.audioCallContainer}>
        {/* <Foundation size={30} name="telephone" color="#fff" /> */}
        <Image
          source={require('../../../../../../../assets/images/Callcall.png')}
          style={{ width: 28, height: 28 }}
        />
      </TouchableOpacity>
    );

    if (
      this.props.item.blockedByMe === true ||
      this.props.audioCall === false
      // this.props.type === CometChat.ACTION_TYPE.TYPE_GROUP
    ) {
      audioCallBtn = null;
    }

    if (
      this.props.item.blockedByMe === true ||
      this.props.videoCall === false
    ) {
      videoCallBtn = null;
    }
    if (this.props.item.blockedByMe) {
      status = null;
      presence = null;
    }
    if (
      (this.props.type === CometChat.ACTION_TYPE.TYPE_USER &&
        this.state.restrictions?.isOneOnOneAudioCallEnabled === false) ||
      (this.props.type === CometChat.ACTION_TYPE.TYPE_GROUP &&
        this.state.restrictions?.isGroupAudioCallEnabled === false)
    ) {
      audioCallBtn = null;
    }

    //if videocall feature is disabled
    if (
      (this.props.type === CometChat.ACTION_TYPE.TYPE_USER &&
        this.state.restrictions?.isOneOnOneVideoCallEnabled === false) ||
      (this.props.type === CometChat.ACTION_TYPE.TYPE_GROUP &&
        this.state.restrictions?.isGroupVideoCallEnabled === false)
    ) {
      videoCallBtn = null;
    }

    let info = (
      <TouchableOpacity
        onPress={() => this.props.actionGenerated(actions.VIEW_DETAIL)}
        style={styles.videoCallContainer}>
        <Icon size={25} name="ellipsis-horizontal-circle" color="#fff" />
      </TouchableOpacity>
    );

    // console.log( this.props.LongpressToggle,'uwhbfjkwhbfhjkwbfkjhwebfhjeqw');

    return (
      <View style={styles.headerContainer}>
        {this.props.LongpressToggle ? (
          <View
            style={{
              // backgroundColor: 'blue',
              width: '100%',
              height: 50,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                // backgroundColor: 'red',
                width: '20%',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 40,
                  width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => this.props.messagefunction(false)}>
                  <Icon name="arrow-back-outline" size={28} color="#fff" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 40,
                  width: 35,
                  // backgroundColor: 'grey',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{ fontWeight: '500', fontSize: 23, color: '#fff' }}>
                  5
                </Text>
              </View>
            </View>
            <View
              style={{
                // backgroundColor: 'green',
                width: '75%',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <View style={{ width: '10%', height: 30 }}>
                <TouchableOpacity>
                  <Image
                    source={require('../../../../../../../assets/images/backward.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: '10%', height: 30 }}>
                <TouchableOpacity onPress={() => this.props.starMessages()}>
                  <Image
                    source={require('../../../../../../../assets/images/star.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: '10%', height: 30 }}>
                <Image
                  source={require('../../../../../../../assets/images/copy.png')}
                />
              </View>
              <View style={{ width: '10%', height: 30 }}>
                <TouchableOpacity>
                  <Image
                    source={require('../../../../../../../assets/images/deleteIcon.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: '10%', height: 30 }}>
                <TouchableOpacity
                  onPress={() => {
                    // this.props.navigation.navigate('Forward'),
                      this.props.getforwardList(true);
                  }}>
                  <Image
                    source={require('../../../../../../../assets/images/forward.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: '10%', height: 30 }}>
                <Image
                  source={require('../../../../../../../assets/images/info.png')}
                />
              </View>
            </View>
          </View>
        ) : (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              // onPress={() => this.props.actionGenerated(actions.GO_BACK)}
              onPress={() => this.props.navigation.navigate('Chat')}
              style={styles.backButtonContainer}>
              {/* <MaterialCommunityIcons
          name="arrow-left"
          size={32}
          style={{fontWeight: 1}}
          color={this.props.theme.color.white}
        /> */}
              <Image
                source={require('../../../../../../../assets/images/Leftback.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <View style={styles.headerDetailContainer}>
              {/* <View
           style={[
             styles.avatarContainer,
             {
               backgroundColor: '#fff',
             },
           ]}>
           <CometChatAvatar
             image={{ uri: image }}
             cornerRadius={25}
             borderColor={this.props.theme.borderColor.white}
             borderWidth={0}
             name={userName}
           />
           {presence}
         </View> */}
              <View style={styles.itemDetailContainer}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.actionGenerated(actions.VIEW_DETAIL)
                  }>
                  <Text style={styles.itemNameText} numberOfLines={1}>
                    {this.props.item.name}
                  </Text>
                  {status}
                </TouchableOpacity>
              </View>
              {audioCallBtn}
              {videoCallBtn}
              {info}
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default CometChatMessageHeader;
