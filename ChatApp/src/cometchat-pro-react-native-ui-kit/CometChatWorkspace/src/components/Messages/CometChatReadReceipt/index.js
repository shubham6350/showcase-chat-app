import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Image, Platform } from 'react-native';
import { get as _get, identity } from 'lodash';

import Ionicons from 'react-native-vector-icons/Ionicons';
import blueDoubleTick from './resources/blue-double-tick-icon.png';  //checkmark-done-sharp done
import greyDoubleTick from './resources/grey-double-tick-icon.png';  //checkmark-done-sharp
import greyTick from './resources/grey-tick-icon.png'; //checkmark-sharp
import sendingTick from './resources/sending.png'; //ellipsis-horizontal-circle
import errorTick from './resources/error.png';  //ios-alert-circle
import styles from './styles';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { CometChatContext } from '../../../utils/CometChatContext';

const CometChatReadReceipt = (props) => {
  const context = useContext(CometChatContext);
  const [isDeliveryReceiptsEnabled, setIsDeliveryReceiptsEnabled] = useState(
    true,
  );
  useEffect(() => {
    checkRestrictions();
  });
  const checkRestrictions = async () => {
    let isEnabled = await context.FeatureRestriction.isDeliveryReceiptsEnabled();
    setIsDeliveryReceiptsEnabled(isEnabled);
  };
  let ticks = 0;
  if (props.message.messageFrom === 'sender') {
    if (props.message.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
      if (props.message.hasOwnProperty('error')) {
        ticks = 'ios-alert-circle';
      } else {
        ticks = 'ellipsis-horizontal-circle';

        if (props.message.hasOwnProperty('sentAt')) {
          ticks = 'checkmark-sharp';
        }
      }
    } else {
      if (props.message.hasOwnProperty('error')) {
        ticks = 'ios-alert-circle';
      } else {
        ticks = 'ellipsis-horizontal-circle';

        if (props.message.hasOwnProperty('sentAt')) {
          ticks = 'checkmark-sharp';

          if (props.message.hasOwnProperty('deliveredAt')) {
            ticks = 'checkmark-done-sharp';
            if (props.message.hasOwnProperty('readAt')) {
              ticks = 0;
            }
          }
        }
      }
    }
  }
  if (props.message.messageFrom !== 'sender') {
    ticks = null;
  }

  let timestamp = new Date(
    props.message.sentAt
      ? props.message.sentAt * 1000
      : props.message._composedAt,
  ).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  if (Platform.OS === 'android') {
    let time = timestamp.split(':'); // convert to array

    // fetch
    var hours = Number(time[0]);
    var minutes = Number(time[1]?.split(' ')[0]);

    // calculate
    var timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue = '' + hours;
    } else if (hours > 12) {
      timeValue = '' + (hours - 12);
    } else if (hours == 0) {
      timeValue = '12';
    }

    timeValue += minutes < 10 ? ':0' + minutes : ':' + minutes; // get minutes
    timeValue += hours >= 12 ? ' PM' : ' AM'; // get AM/PM
    timestamp = timeValue;
  }
  if (!isDeliveryReceiptsEnabled) {
    ticks = null;
  }
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.msgTimestampStyle}>{timestamp}</Text>
      {ticks === 0 ? (
        <Ionicons name="checkmark-done-sharp" size={15} color={'#111BAC'} style={{marginLeft: 5}}/>
      ) : <Ionicons name={ticks} color={'#FAFAFA'} size={15} style={{marginLeft: 5}}/> }
    </View>
  );
};

export default CometChatReadReceipt;
