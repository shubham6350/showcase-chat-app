import React from 'react';
import { View, TouchableWithoutFeedback, Image } from 'react-native';
import CometChatThreadedMessageReplyCount from '../CometChatThreadedMessageReplyCount';
import { CometChatMessageReactions } from '../../Messages/Extensions';
import CometChatReadReceipt from '../CometChatReadReceipt';
import style from './styles';
import theme from '../../../resources/theme';
import * as actions from '../../../utils/actions';
import * as enums from '../../../utils/enums';
import AudioControls from './audioControls';

const CometChatSenderAudioMessageBubble = (props) => {
  const message = { ...props.message, messageFrom: enums.MESSAGE_FROM_SENDER };
  // const viewTheme = { ...theme, ...props.theme };
  return (
    <View style={style.container}>
      <View style={style.innerContainer}>
        <TouchableWithoutFeedback
          onLongPress={() =>
            // props.actionGenerated(actions.OPEN_MESSAGE_ACTIONS, message)
            props.messageFunction(true, message)
          }>
          <View
            style={[
              style.messageWrapperStyle,
              { backgroundColor: props.theme.background1 },
            ]}>
            <View style={{ padding: 5 }}>
              {message.data.metadata?.messageStarred ? (
                <Image
                  source={require('../../../../../../../assets/images/star.png')}
                  style={{ width: 15, height: 15 }}
                />
              ) : null}
            </View>
            <View style={{ paddingHorizontal: 5 }}>
              <AudioControls source={props.message.data.url} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={style.messageInfoWrapperStyle}>
        <CometChatThreadedMessageReplyCount {...props} message={message} />
        <CometChatReadReceipt {...props} />
      </View>
      <CometChatMessageReactions
        theme={props.theme}
        {...props}
        message={message}
        showMessage={props?.showMessage}
      />
    </View>
  );
};
export default CometChatSenderAudioMessageBubble;
