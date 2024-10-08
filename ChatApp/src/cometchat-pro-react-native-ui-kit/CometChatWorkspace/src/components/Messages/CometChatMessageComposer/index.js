/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-fragments */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Keyboard,
  Platform,
  PermissionsAndroid,
  TouchableWithoutFeedback,
  Modal,
  Image,
  Vibration,
  Appearance,
} from 'react-native';
import * as consts from '../../../utils/consts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker from 'react-native-document-picker';
import AntDIcon from 'react-native-vector-icons/AntDesign';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { CometChat } from '@cometchat-pro/react-native-chat';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';

import style from './styles';
import { styles_dark } from './styles';

import {
  CometChatCreatePoll,
  CometChatSmartReplyPreview,
} from '../../Messages/Extensions';
import CometChatStickerKeyboard from '../CometChatStickerKeyboard';
import ComposerActions from './composerActions';
import Feather from 'react-native-vector-icons/Feather';
import { outgoingMessageAlert } from '../../../resources/audio';
import * as enums from '../../../utils/enums';
import * as actions from '../../../utils/actions';
import { heightRatio } from '../../../utils/consts';
import { logger } from '../../../utils/common';
import { CometChatContext } from '../../../utils/CometChatContext';

export default class CometChatMessageComposer extends React.PureComponent {
  static contextType = CometChatContext;
  sheetRef = React.createRef(null);
  sound = null;
  constructor(props) {
    super(props);

    this.imageUploaderRef = React.createRef();
    this.fileUploaderRef = React.createRef();
    this.audioUploaderRef = React.createRef();
    this.videoUploaderRef = React.createRef();
    this.messageInputRef = React.createRef();

    this.node = React.createRef();
    this.isTyping = false;

    this.state = {
      showFilePicker: false,
      messageInput: '',
      messageType: '',
      emojiViewer: false,
      createPoll: false,
      messageToBeEdited: '',
      replyPreview: null,
      stickerViewer: false,
      composerActionsVisible: false,
      user: null,
      snapPoints: null,
      keyboardActivity: false,
      restrictions: null,
      audioFile: '',
      recording: false,
      loaded: false,
      paused: false,
      audToogle: false,
      mobile_theme: Appearance.getColorScheme().toString(),
    };
    Sound.setCategory('Ambient', true);
    this.audio = new Sound(outgoingMessageAlert);
    CometChat.getLoggedinUser()
      .then((user) => (this.loggedInUser = user))
      .catch((error) => {
        const errorCode = error?.message || 'ERROR';
        this.props?.showMessage('error', errorCode);
      });
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
    this.checkRestrictions();

    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav',
    };

    AudioRecord.init(options);

    AudioRecord.on('data', (data) => {
      // console.log(data);
    });
  }

  checkRestrictions = async () => {
    let isLiveReactionsEnabled =
      await this.context.FeatureRestriction.isLiveReactionsEnabled();
    let isTypingIndicatorsEnabled =
      await this.context.FeatureRestriction.isTypingIndicatorsEnabled();
    let isSmartRepliesEnabled =
      await this.context.FeatureRestriction.isSmartRepliesEnabled();
    this.setState({
      restrictions: {
        isLiveReactionsEnabled,
        isTypingIndicatorsEnabled,
        isSmartRepliesEnabled,
      },
    });
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({ keyboardActivity: true });
  };

  _keyboardDidHide = () => {
    this.setState({ keyboardActivity: false });
  };

  componentDidUpdate(prevProps) {
    try {
      if (prevProps.messageToBeEdited !== this.props.messageToBeEdited) {
        const { messageToBeEdited } = this.props;
        this.setState({
          messageInput: messageToBeEdited.text,
          messageToBeEdited,
        });

        const element = this.messageInputRef.current;
        if (messageToBeEdited) {
          element.focus();
        } else {
          this.setState({
            messageInput: '',
          });
        }
      }

      if (prevProps.replyPreview !== this.props.replyPreview) {
        this.setState({ replyPreview: this.props.replyPreview });
      }

      if (prevProps.item !== this.props.item) {
        this.setState({ stickerViewer: false });
      }
    } catch (error) {
      logger(error);
    }
  }

  playAudio = () => {
    this.audio.setCurrentTime(0);
    this.audio.play(() => {});
  };

  start = () => {
    console.log('start record');
    this.setState({ audioFile: '', recording: true, loaded: false });
    AudioRecord.start();
  };

  stop = async () => {
    if (!this.state.recording) {
      return;
    }
    console.log('stop record');
    let audioFile = await AudioRecord.stop();
    console.log('audioFile', audioFile);
    this.setState({ audioFile, audToogle: true, recording: true });
  };

  sendAud = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');

          return;
        }
      } catch (err) {
        console.warn(err);

        return;
      }
    }
    // console.log(this.state.audioFile);
    const recorded = {
      name: 'test.wav',
      type: 'audio/mpeg',
      uri: 'file:///' + this.state.audioFile,
    };
    this.sendMediaMessage(recorded, CometChat.MESSAGE_TYPE.AUDIO);
    this.setState({ audioFile: '', audToogle: false, recording: false });
  };

  delAud = async () => {
    this.setState({ audioFile: '', audToogle: false, recording: false });
  };

  changeHandler = (text) => {
    this.startTyping();
    this.setState({ messageInput: text, messageType: 'text' });
  };

  getReceiverDetails = () => {
    let receiverId;
    let receiverType;

    if (this.props.type === CometChat.RECEIVER_TYPE.USER) {
      receiverId = this.props.item.uid;
      receiverType = CometChat.RECEIVER_TYPE.USER;
    } else if (this.props.type === CometChat.RECEIVER_TYPE.GROUP) {
      receiverId = this.props.item.guid;
      receiverType = CometChat.RECEIVER_TYPE.GROUP;
    }

    return { receiverId, receiverType };
  };

  /**
   * handler for sending and generating media message
   * @param messageInput: object messageInput
   * @param messageType: object messageType
   */

  sendMediaMessage = (messageInput, messageType) => {
    console.log(messageInput, '7777777');
    try {
      const { receiverId, receiverType } = this.getReceiverDetails();
      const conversationId = this.props.getConversationId();
      const mediaMessage = new CometChat.MediaMessage(
        receiverId,
        messageInput,
        messageType,
        receiverType,
      );
      if (this.props.parentMessageId) {
        mediaMessage.setParentMessageId(this.props.parentMessageId);
      }

      this.endTyping();
      // mediaMessage.setSender(this.loggedInUser);
      mediaMessage.setReceiver(receiverType);
      mediaMessage.setConversationId(conversationId);
      mediaMessage.setType(messageType);
      mediaMessage._composedAt = Date.now();
      mediaMessage._id = '_' + Math.random().toString(36).substr(2, 9);
      mediaMessage.setId(mediaMessage._id);
      mediaMessage.setData({
        type: messageType,
        category: CometChat.CATEGORY_MESSAGE,
        name: messageInput['name'],
        file: messageInput,
        url: messageInput['uri'],
        sender: this.loggedInUser,
      });
      this.props.actionGenerated(actions.MESSAGE_COMPOSED, [mediaMessage]);
      CometChat.sendMessage(mediaMessage)
        .then(async (response) => {
          this.playAudio();

          const newMessageObj = {
            ...response,
            _id: mediaMessage._id,
            localFile: messageInput,
          };
          this.props.actionGenerated(actions.MESSAGE_SENT, newMessageObj);
        })
        .catch((error) => {
          const newMessageObj = { ...mediaMessage, error: error };
          const errorCode = error?.message || 'ERROR';
          this.props.actionGenerated(
            actions.ERROR_IN_SEND_MESSAGE,
            newMessageObj,
          );

          this.props?.showMessage('error', errorCode);
          logger('Message sending failed with error: ', newMessageObj);
        });
    } catch (error) {
      logger(error);
    }
  };

  /**
   * handler for sending Text Message
   * @param
   */

  sendLocMessage = (messageInput) => {
    try {
      const { receiverId, receiverType } = this.getReceiverDetails();
      // const messageInput = Location;
      const conversationId = this.props.getConversationId();
      const textMessage = new CometChat.TextMessage(
        receiverId,
        messageInput,
        receiverType,
      );
      if (this.props.parentMessageId) {
        textMessage.setParentMessageId(this.props.parentMessageId);
      }

      textMessage.setSender(this.loggedInUser);
      textMessage.setReceiver(receiverType);
      textMessage.setText(messageInput);
      textMessage.setConversationId(conversationId);
      textMessage._composedAt = Date.now();
      textMessage._id = '_' + Math.random().toString(36).substr(2, 9);
      textMessage.setId(textMessage._id);
      this.props.actionGenerated(actions.MESSAGE_COMPOSED, [textMessage]);
      this.setState({ messageInput: '', replyPreview: false });

      this.messageInputRef.current.textContent = '';
      this.playAudio();
      CometChat.sendMessage(textMessage)
        .then((message) => {
          const newMessageObj = { ...message, _id: textMessage._id };
          this.setState({ messageInput: '' });
          this.messageInputRef.current.textContent = '';
          // this.playAudio();
          this.props.actionGenerated(actions.MESSAGE_SENT, newMessageObj);
        })
        .catch((error) => {
          const newMessageObj = { ...textMessage, error: error };
          this.props.actionGenerated(
            actions.ERROR_IN_SEND_MESSAGE,
            newMessageObj,
          );
          logger('Message sending failed with error:', error);
          const errorCode = error?.message || 'ERROR';
          this.props?.showMessage('error', errorCode);
        });
    } catch (error) {
      logger(error);
    }
  };

  sendTextMessage = () => {
    try {
      if (this.state.emojiViewer) {
        this.setState({ emojiViewer: false });
      }

      if (!this.state.messageInput.trim().length) {
        return false;
      }

      if (this.state.messageToBeEdited) {
        this.editMessage();
        return false;
      }
      this.endTyping();

      const { receiverId, receiverType } = this.getReceiverDetails();
      const messageInput = this.state.messageInput.trim();
      const conversationId = this.props.getConversationId();
      const textMessage = new CometChat.TextMessage(
        receiverId,
        messageInput,
        receiverType,
      );
      if (this.props.parentMessageId) {
        textMessage.setParentMessageId(this.props.parentMessageId);
      }

      textMessage.setSender(this.loggedInUser);
      textMessage.setReceiver(receiverType);
      textMessage.setText(messageInput);
      textMessage.setConversationId(conversationId);
      textMessage._composedAt = Date.now();
      textMessage._id = '_' + Math.random().toString(36).substr(2, 9);
      textMessage.setId(textMessage._id);
      this.props.actionGenerated(actions.MESSAGE_COMPOSED, [textMessage]);
      this.setState({ messageInput: '', replyPreview: false });

      this.messageInputRef.current.textContent = '';
      this.playAudio();
      CometChat.sendMessage(textMessage)
        .then((message) => {
          const newMessageObj = { ...message, _id: textMessage._id };
          this.setState({ messageInput: '' });
          this.messageInputRef.current.textContent = '';
          // this.playAudio();
          this.props.actionGenerated(actions.MESSAGE_SENT, newMessageObj);
        })
        .catch((error) => {
          const newMessageObj = { ...textMessage, error: error };
          this.props.actionGenerated(
            actions.ERROR_IN_SEND_MESSAGE,
            newMessageObj,
          );
          logger('Message sending failed with error:', error);
          const errorCode = error?.message || 'ERROR';
          this.props?.showMessage('error', errorCode);
        });
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Handler for edit message
   * @param
   */

  editMessage = () => {
    try {
      const { messageToBeEdited } = this.props;

      const { receiverId, receiverType } = this.getReceiverDetails();

      const messageText = this.state.messageInput.trim();
      const textMessage = new CometChat.TextMessage(
        receiverId,
        messageText,
        receiverType,
      );
      textMessage.setId(messageToBeEdited.id);

      this.endTyping();

      CometChat.editMessage(textMessage)
        .then((message) => {
          this.setState({ messageInput: '' });
          this.messageInputRef.current.textContent = '';
          this.playAudio();

          this.closeEditPreview();
          this.props.actionGenerated(actions.MESSAGE_EDITED, message);
        })
        .catch((error) => {
          const errorCode = error?.message || 'ERROR';
          this.props?.showMessage('error', errorCode);
          logger('Message editing failed with error:', error);
        });
    } catch (error) {
      logger(error);
    }
  };

  /**
   * handler for action -> CLEAR_EDIT_PREVIEW
   * @param
   */
  closeEditPreview = () => {
    this.props.actionGenerated(actions.CLEAR_EDIT_PREVIEW);
  };

  /**
   * Handler For Generating typing Notification
   * @param timer: typingInterval
   * @param metadata: metadata object
   */

  startTyping = (timer, metadata) => {
    try {
      const typingInterval = timer || 5000;
      if (!this.state.restrictions?.isTypingIndicatorsEnabled) {
        return false;
      }
      if (this.isTyping) {
        return false;
      }

      const { receiverId, receiverType } = this.getReceiverDetails();
      const typingMetadata = metadata || undefined;

      const typingNotification = new CometChat.TypingIndicator(
        receiverId,
        receiverType,
        typingMetadata,
      );
      CometChat.startTyping(typingNotification);

      this.isTyping = setTimeout(() => {
        this.endTyping();
      }, typingInterval);
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Handler to end typing Notification
   * @param metadata: metadata object
   */

  endTyping = (metadata) => {
    try {
      const { receiverId, receiverType } = this.getReceiverDetails();

      const typingMetadata = metadata || undefined;

      const typingNotification = new CometChat.TypingIndicator(
        receiverId,
        receiverType,
        typingMetadata,
      );
      CometChat.endTyping(typingNotification);

      clearTimeout(this.isTyping);
      this.isTyping = null;
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Handler to toggle Sticker Picker screen
   * @param
   */

  toggleStickerPicker = () => {
    const { stickerViewer } = this.state;
    this.setState({
      composerActionsVisible: false,
      stickerViewer: !stickerViewer,
    });
  };

  /**
   * handler to toggle create poll screen
   * @param
   */
  toggleCreatePoll = () => {
    const { createPoll } = this.state;
    this.setState({ composerActionsVisible: false, createPoll: !createPoll });
  };

  /**
   * handler to close create poll screen
   * @param
   */
  closeCreatePoll = () => {
    this.toggleCreatePoll();
  };

  /**
   * handler for various action
   * @param action: action name
   * @param message: message object
   */
  actionHandler = (action, message) => {
    switch (action) {
      case actions.POLL_CREATED:
        this.toggleCreatePoll();
        if (this.props.type === enums.TYPE_USER) {
          this.props.actionGenerated(actions.POLL_CREATED, [message]);
        }
        // temporary check; custom data listener working for sender too\

        break;
      case actions.SEND_STICKER:
        this.sendSticker(message);
        break;
      case actions.CLOSE_STICKER:
        this.toggleStickerPicker();
        break;
      default:
        break;
    }
  };

  /**
   * handler for sending sticker message
   * @param stickerMessage: object stickerMessage
   */
  sendSticker = (stickerMessage) => {
    const { receiverId, receiverType } = this.getReceiverDetails();

    const customData = {
      sticker_url: stickerMessage.stickerUrl,
      sticker_name: stickerMessage.stickerName,
    };
    const customType = enums.CUSTOM_TYPE_STICKER;
    const conversationId = this.props.getConversationId();
    const customMessage = new CometChat.CustomMessage(
      receiverId,
      receiverType,
      customType,
      customData,
    );
    if (this.props.parentMessageId) {
      customMessage.setParentMessageId(this.props.parentMessageId);
    }
    customMessage.setConversationId(conversationId);
    customMessage.setSender(this.loggedInUser);
    customMessage.setReceiver(receiverType);
    customMessage.setConversationId(conversationId);
    customMessage._composedAt = Date.now();
    customMessage._id = '_' + Math.random().toString(36).substr(2, 9);
    this.props.actionGenerated(actions.MESSAGE_COMPOSED, [customMessage]);
    CometChat.sendCustomMessage(customMessage)
      .then((message) => {
        this.playAudio();
        const newMessageObj = { ...message, _id: customMessage._id };

        this.props.actionGenerated(actions.MESSAGE_SENT, newMessageObj);
      })
      .catch((error) => {
        const newMessageObj = { ...customMessage, error: error };
        this.props.actionGenerated(
          actions.ERROR_IN_SEND_MESSAGE,
          newMessageObj,
        );
        const errorCode = error?.message || 'ERROR';

        this.props?.showMessage('error', errorCode);
        logger('custom message sending failed with error', error);
      });
  };

  /**
   * handler for sending reply message
   * @param messageInput: object messageInput
   */

  sendReplyMessage = (messageInput) => {
    try {
      const { receiverId, receiverType } = this.getReceiverDetails();
      const textMessage = new CometChat.TextMessage(
        receiverId,
        messageInput,
        receiverType,
      );
      if (this.props.parentMessageId) {
        textMessage.setParentMessageId(this.props.parentMessageId);
      }

      CometChat.sendMessage(textMessage)
        .then((message) => {
          this.playAudio();
          this.setState({ replyPreview: null });
          this.props.actionGenerated(actions.MESSAGE_COMPOSED, [message]);
        })
        .catch((error) => {
          const errorCode = error?.message || 'ERROR';
          this.props?.showMessage('error', errorCode);
          logger('Message sending failed with error:', error);
        });
    } catch (error) {
      logger(error);
    }
  };

  clearReplyPreview = () => {
    this.setState({ replyPreview: null });
  };

  /**
   * handler for sending reactions
   * @param
   */
  sendReaction = (event) => {
    const typingInterval = 1000;
    try {
      const metadata = {
        type: enums.METADATA_TYPE_LIVEREACTION,
        reaction: this.props.reactionName || 'heart',
      };

      const { receiverId, receiverType } = this.getReceiverDetails();
      let transientMessage = new CometChat.TransientMessage(
        receiverId,
        receiverType,
        metadata,
      );
      CometChat.sendTransientMessage(transientMessage);
    } catch (err) {
      logger(err);
    }
    this.props.actionGenerated(actions.SEND_REACTION);
    event.persist();
    setTimeout(() => {
      this.props.actionGenerated(actions.STOP_REACTION);
    }, typingInterval);
  };

  pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      const file = {
        name: res[0].name,
        type: res[0].type,
        uri: res[0].uri,
      };
      this.sendMediaMessage(file, CometChat.MESSAGE_TYPE.FILE);
      this.sheetRef?.current?.snapTo(1);
      // this.props.close();
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  takePhoto = async (mediaType = 'photo') => {
    try {
      let granted = null;
      if (Platform.OS === 'android') {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'CometChat Camera Permission',
            message: 'CometChat needs access to your camera ',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
      }

      if (
        Platform.OS === 'ios' ||
        granted === PermissionsAndroid.RESULTS.GRANTED
      ) {
        launchCamera(
          {
            mediaType,
            includeBase64: false,
            cameraType: 'back',
          },
          (response) => {
            this.sheetRef?.current?.snapTo(1);
            if (response.didCancel) {
              return null;
            }
            let type = null;
            let name = null;
            if (
              Platform.OS === 'ios' &&
              response.assets[0].fileName !== undefined
            ) {
              name = response.assets[0].fileName;
              type = response.assets[0].type;
            } else {
              type = response.assets[0].type;
              name = 'Camera_001.jpeg';
            }
            if (mediaType == 'video') {
              type = 'video/quicktime';
              name = 'Camera_002.mov';
            }
            const file = {
              name:
                Platform.OS === 'android' && mediaType != 'video'
                  ? response.assets[0].fileName
                  : name,
              type:
                Platform.OS === 'android' && mediaType != 'video'
                  ? response.assets[0].type
                  : type,
              uri:
                Platform.OS === 'android'
                  ? response.assets[0].uri
                  : response.assets[0].uri.replace('file://', ''),
            };
            this.sendMediaMessage(
              file,
              mediaType === 'photo'
                ? CometChat.MESSAGE_TYPE.IMAGE
                : CometChat.MESSAGE_TYPE.VIDEO,
            );
          },
        );
      }
    } catch (err) {
      this.sheetRef?.current?.snapTo(1);
      this.props.close();
    }
  };

  render() {
    let disabled = false;
    if (this.props.item.blockedByMe) {
      disabled = true;
    }

    let stickerViewer = null;
    if (this.state.stickerViewer) {
      stickerViewer = (
        <CometChatStickerKeyboard
          theme={this.props.theme}
          item={this.props.item}
          type={this.props.type}
          actionGenerated={this.actionHandler}
        />
      );
    }

    let liveReactionBtn = null;
    if (
      Object.prototype.hasOwnProperty.call(
        enums.LIVE_REACTIONS,
        this.props.reaction,
      )
    ) {
      const reactionName = this.props.reaction;
      liveReactionBtn = (
        <TouchableOpacity
          style={style.reactionBtnStyle}
          disabled={disabled}
          onPress={this.sendReaction}>
          <Icon name={`${reactionName}`} size={30} color="#de3a39" />
        </TouchableOpacity>
      );
    }

    let sendBtn = (
      <TouchableOpacity
        style={style.sendButtonStyle}
        onPress={() => this.sendTextMessage()}>
        <Icon name="send" size={20} color="#3299ff" />
      </TouchableOpacity>
    );

    let inputVal = (
      <View
        style={[
          {
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            backgroundColor: '#fff',
          },
          { backgroundColor: this.props.themee.background },
        ]}>
        <View
          style={[
            {
              width: '86%',
              height: 50,
              backgroundColor: '#FAFAFA',
              borderRadius: 10,
              marginRight: 10,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 15,
            },
            { backgroundColor: this.props.themee.backgroundl },
          ]}>
          <TouchableOpacity
            style={style.plusCircleContainer}
            disabled={disabled}
            onPress={() => {
              //  this.setState({ composerActionsVisible: true });
              this.toggleStickerPicker();
            }}>
            <Feather size={20} name="smile" color={this.props.themee.color} />
          </TouchableOpacity>
          <TextInput
            style={[
              style.messageInputStyle,
              {
                backgroundColor: this.props.themee.backgroundl,
                color: this.props.themee.color,
              },
            ]}
            editable={!disabled}
            value={this.state.messageInput}
            placeholder="Type a Message..."
            onChangeText={(text) => this.changeHandler(text)}
            onSubmitEditing={() => {
              return this.sendTextMessage();
            }}
            placeholderTextColor={this.props.themee.color}
            onBlur={this.endTyping}
            ref={this.messageInputRef}
          />
          <TouchableOpacity
            style={style.plusCircleContainer}
            disabled={disabled}
            onPress={() => {
              this.setState({ composerActionsVisible: true });
            }}>
            <Entypo
              size={20}
              name="attachment"
              color={this.props.themee.color}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.plusCircleContainer}
            disabled={disabled}
            onPress={() => this.takePhoto()}>
            <Entypo size={20} name="camera" color={this.props.themee.color} />
          </TouchableOpacity>
        </View>
        <View>
          {/* <Text>T</Text> */}
          {this.state.messageInput.length > 0 ? (
            <TouchableOpacity
              style={style.plusCircleContainerr}
              disabled={disabled}
              onPress={() => this.sendTextMessage()}>
              <MaterialCommunityIcons size={20} name="send" color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={style.plusCircleContainerr}
              disabled={disabled}
              onPress={() => this.start()}>
              <MaterialCommunityIcons
                size={20}
                name="microphone"
                color="white"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );

    // let audioCont = (
    //   <View style={this.state.mobile_theme === 'dark' ?  {width: '100%',height: 50,flexDirection: 'row',alignItems: 'center',marginBottom: 10, backgroundColor: '#181A20'} : {width: '100%',height: 50,flexDirection: 'row',alignItems: 'center',marginBottom: 10, backgroundColor: '#fff'}}>
    //   <TouchableOpacity onPress={() => this.stop()}>
    //   <View style={this.state.mobile_theme === 'dark' ? {width: ' 100%' ,height: 50,backgroundColor: '#23262E', borderRadius: 10, flexDirection: 'row',alignItems: 'center',paddingHorizontal: 10, paddingVertical: 15} : {width: '100%' ,height: 50,backgroundColor: '#FAFAFA', borderRadius: 10, flexDirection: 'row',alignItems: 'center',paddingHorizontal: 10, paddingVertical: 15}}>
    //     <Text style={{width: '100%',textAlign: 'center'}}>Pause Recording</Text>
    //   </View>
    //   </TouchableOpacity>
    //   </View>
    // );

    // let sendAudio = (
    //   <View style={this.state.mobile_theme === 'dark' ?  {width: '100%',height: 50,flexDirection: 'row',alignItems: 'center',marginBottom: 10, backgroundColor: '#181A20'} : {width: '100%',height: 50,flex: 2,flexDirection: 'row',justifyContent: 'center',marginBottom: 10, backgroundColor: '#FFF'}}>
    //   <TouchableOpacity onPress={() => this.delAud()}>
    //   <View style={this.state.mobile_theme === 'dark' ? {flex: 1, height: 50,backgroundColor: '#23262E', borderRadius: 10, flexDirection: 'row',alignItems: 'center'} : {flex: 1, height: 50,backgroundColor: '#FAFAFA', borderRadius: 10, flexDirection: 'row',alignItems: 'center'}}>
    //     <Text style={{paddingHorizontal: 50,textAlign: 'center',color: 'red'}}>Delete Audio</Text>
    //   </View>
    //   </TouchableOpacity>
    //   <TouchableOpacity onPress={() => this.sendAud()}>
    //   <View style={this.state.mobile_theme === 'dark' ? {flex: 1, height: 50,backgroundColor: '#23262E', borderRadius: 10, flexDirection: 'row',alignItems: 'center'} : {flex: 1, height: 50,backgroundColor: '#FAFAFA', borderRadius: 10, flexDirection: 'row',alignItems: 'center'}}>
    //     <Text style={{paddingHorizontal: 50,textAlign: 'center',color: 'green'}}>Send Audio</Text>
    //   </View>
    //   </TouchableOpacity>
    //   </View>
    // );

    if (
      !this.state.messageInput.length &&
      this.state.restrictions?.isLiveReactionsEnabled
    ) {
      sendBtn = null;
    } else {
      liveReactionBtn = null;
    }

    let editPreview = null;
    if (this.state.messageToBeEdited) {
      editPreview = (
        <View
          style={[
            style.editPreviewContainerStyle,
            {
              backgroundColor: `${this.props.theme.backgroundColor.white}`,
              borderColor: `${this.props.theme.borderColor.primary}`,
            },
          ]}>
          <View
            style={[
              style.previewHeadingContainer,
              {
                borderLeftColor: this.props.theme.color.secondary,
              },
            ]}>
            <View style={style.previewHeadingStyle}>
              <Text
                style={[
                  style.previewTextStyle,
                  {
                    color: `${this.props.theme.color.black}`,
                  },
                ]}>
                Edit message
              </Text>
              <TouchableOpacity
                style={style.previewCloseStyle}
                onPress={this.closeEditPreview}>
                <Icon
                  name="close"
                  size={23}
                  color={this.props.theme.color.secondary}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  color: `${this.props.theme.color.helpText}`,
                }}>
                {this.state.messageToBeEdited.text}
              </Text>
            </View>
          </View>
        </View>
      );
    }
    let blockedPreview = null;
    if (disabled) {
      blockedPreview = (
        <View
          style={[
            style.blockedPreviewContainer,
            {
              backgroundColor: this.props.theme.backgroundColor.blue,
            },
          ]}>
          <Text
            style={[
              style.blockedPreviewText1,
              {
                color: this.props.theme.color.white,
              },
            ]}>
            You have blocked this user
          </Text>
          <Text
            style={[
              style.blockedPreviewText2,
              {
                color: this.props.theme.color.white,
              },
            ]}>
            To start conversations, click on the user info and unblock the user
          </Text>
        </View>
      );
    }

    let smartReplyPreview = null;
    if (this.state.replyPreview) {
      const message = this.state.replyPreview;
      if (Object.prototype.hasOwnProperty.call(message, 'metadata')) {
        const { metadata } = message;
        if (Object.prototype.hasOwnProperty.call(metadata, '@injected')) {
          const injectedObject = metadata['@injected'];
          if (
            Object.prototype.hasOwnProperty.call(injectedObject, 'extensions')
          ) {
            const extensionsObject = injectedObject.extensions;
            if (
              Object.prototype.hasOwnProperty.call(
                extensionsObject,
                'smart-reply',
              )
            ) {
              const smartReplyObject = extensionsObject['smart-reply'];

              const options = [
                smartReplyObject.reply_positive,
                smartReplyObject.reply_neutral,
                smartReplyObject.reply_negative,
              ];

              smartReplyPreview = (
                <CometChatSmartReplyPreview
                  {...this.props}
                  options={options}
                  clicked={this.sendReplyMessage}
                  close={this.clearReplyPreview}
                />
              );
            }
          }
        }
      }
    }

    if (!this.state.restrictions?.isSmartRepliesEnabled) {
      smartReplyPreview: false;
    }

    // let stickerViewer = null;
    // if (this.state.stickerViewer) {
    //   stickerViewer = (
    //     <CometChatStickerKeyboard
    //       theme={this.props.theme}
    //       item={this.props.item}
    //       type={this.props.type}
    //       actionGenerated={this.actionHandler}
    //     />
    //   );
    // }

    const createPoll = (
      <CometChatCreatePoll
        theme={this.props.theme}
        item={this.props.item}
        type={this.props.type}
        open={this.state.createPoll}
        close={this.closeCreatePoll}
        actionGenerated={this.actionHandler}
      />
    );
    return (
      <View
        style={
          this.state.mobile_theme === 'dark'
            ? Platform.OS === 'android' && this.state.keyboardActivity
              ? {
                  marginBottom: 21 * heightRatio,
                  elevation: 5,
                  backgroundColor: '#181A20',
                }
              : { elevation: 5, backgroundColor: '#181A20' }
            : Platform.OS === 'android' && this.state.keyboardActivity
            ? {
                marginBottom: 21 * heightRatio,
                elevation: 5,
                backgroundColor: '#fff',
              }
            : { elevation: 5, backgroundColor: '#fff' }
        }>
        {blockedPreview}
        {editPreview}
        {createPoll}
        {stickerViewer}
        {smartReplyPreview}
        <ComposerActions
          visible={this.state.composerActionsVisible}
          close={() => {
            this.setState({ composerActionsVisible: false });
          }}
          toggleStickers={this.toggleStickerPicker}
          toggleCreatePoll={this.toggleCreatePoll}
          sendMediaMessage={this.sendMediaMessage}
          sendLocMessage={this.sendLocMessage}
          theme={this.props.themee}
        />
        {!this.state.recording ? (
          <View
            style={[
              style.mainContainer,
              { backgroundColor: this.props.themee.background },
            ]}>
            {inputVal}
          </View>
        ) : (
          <View
            style={[
              style.mainContainer,
              { backgroundColor: this.props.themee.background },
            ]}>
            {this.state.audToogle ? (
              <View
                style={[
                  style.audioT,
                  { backgroundColor: this.props.themee.background },
                ]}>
                <TouchableOpacity onPress={() => this.delAud()}>
                  <View
                    style={[
                      style.audioTp,
                      { backgroundColor: this.props.themee.backgroundl },
                    ]}>
                    <Text
                      style={{
                        paddingHorizontal: 50,
                        textAlign: 'center',
                        color: 'red',
                      }}>
                      Delete Audio
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.sendAud()}>
                  <View
                    style={[
                      style.audioTp,
                      { backgroundColor: this.props.themee.backgroundl },
                    ]}>
                    <Text
                      style={{
                        paddingHorizontal: 50,
                        textAlign: 'center',
                        color: 'green',
                      }}>
                      Send Audio
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={[
                  style.audioT,
                  { backgroundColor: this.props.themee.background },
                ]}>
                <TouchableOpacity onPress={() => this.stop()}>
                  <View
                    style={[
                      style.pAudiol,
                      { backgroundColor: this.props.themee.backgroundl },
                    ]}>
                    <Text
                      style={{
                        width: '100%',
                        textAlign: 'center',
                        color: this.props.themee.color,
                      }}>
                      Pause Recording
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}
