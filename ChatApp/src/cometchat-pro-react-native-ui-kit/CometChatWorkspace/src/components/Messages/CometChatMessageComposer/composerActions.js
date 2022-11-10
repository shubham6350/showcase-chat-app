import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Image
} from 'react-native';

import IonIcon from 'react-native-vector-icons/Ionicons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import style from './styles';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { heightRatio } from '../../../utils/consts';
import { CometChatContext } from '../../../utils/CometChatContext';

export default class ComposerActions extends Component {
  sheetRef = React.createRef(null);
  static contextType = CometChatContext;
  constructor(props) {
    super(props);
    this.state = {
      restrictions: null,
      snapPoints: null,
    };
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      this.sheetRef?.current?.snapTo(0);
    }
  }

  componentDidMount() {
    this.checkRestrictions();
  }
  checkRestrictions = async () => {
    let isPollsEnabled = await this.context.FeatureRestriction.isPollsEnabled();
    let isStickersEnabled =
      await this.context.FeatureRestriction.isStickersEnabled();
    let isFilesEnabled = await this.context.FeatureRestriction.isFilesEnabled();
    let isPhotosVideosEnabled =
      await this.context.FeatureRestriction.isPhotosVideosEnabled();
    let height = 0;
    if (isPollsEnabled) {
      height++;
    }
    if (isStickersEnabled) {
      height++;
    }
    if (isFilesEnabled) {
      height++;
    }
    if (isPhotosVideosEnabled) {
      height += 4;
    }
    this.setState({
      restrictions: {
        isPollsEnabled,
        isStickersEnabled,
        isFilesEnabled,
        isPhotosVideosEnabled,
      },
      snapPoints: [height * 60 * heightRatio, 0],
    });
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
            this.props.close();
            if (response.didCancel) {
              return null;
            }
            let type = null;
            let name = null;
            if (Platform.OS === 'ios' && response.assets[0].fileName !== undefined) {
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
            this.props.sendMediaMessage(
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

  launchLibrary = (mediaType) => {
    try{
    launchImageLibrary(
      {
        mediaType: mediaType,
        includeBase64: false,
        cameraType: 'back',
      },
      (response) => {
        this.sheetRef?.current?.snapTo(1);
        this.props.close();
        if (response.didCancel) {
          return null;
        }
        let type = null;
        let name = null;
        if (Platform.OS === 'ios' && response.assets[0].fileName !== undefined) {
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
          name:name,
          type:
            Platform.OS === 'android' && mediaType != 'video'
              ? response.assets[0].type
              : type,
          uri:
            Platform.OS === 'android'
              ? response.assets[0].uri
              : response.assets[0].uri.replace('file://', ''),
        };
        this.props.sendMediaMessage(
          file,
          mediaType === 'photo'
            ? CometChat.MESSAGE_TYPE.IMAGE
            : CometChat.MESSAGE_TYPE.VIDEO,
        );
      },
    );
    }catch (err) {
      this.sheetRef?.current?.snapTo(1);
      this.props.close();
    }
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
      this.props.sendMediaMessage(file, CometChat.MESSAGE_TYPE.FILE);
      this.sheetRef?.current?.snapTo(1);
      this.props.close();
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  renderContent = () => {
    let takePhotoBtn = (
      <TouchableOpacity
        style={style.actionButtonContainer}
        onPress={() => this.takePhoto()}>
        {/* <View style={{backgroundColor: '#009689', padding: 25,height: 80, borderRadius: 100}}>
        <EvilIcon name="camera" size={36} color={'#fff'} />
        </View> */}
        <Image source={require('../../../../../../../assets/images/camera.png')} style={{width: 68,height: 68}}/>
        <Text style={{fontSize: 15, fontWeight: '500'}}>
          Camera
        </Text>
      </TouchableOpacity>
    );
    let takeVideoBtn = (
      <TouchableOpacity
        style={style.actionButtonContainer}
        onPress={() => this.takePhoto('video')}>
        <IonIcon name="videocam-outline" size={24} />
        <Text
          style={{
            fontSize: 18,
            marginLeft: 10,
            fontWeight: '500',
          }}>
          Take Video
        </Text>
      </TouchableOpacity>
    );
    let avp = (
      <TouchableOpacity
        style={style.actionButtonContainer}
        onPress={() => this.launchLibrary('photo')}>
        {/* <View style={{backgroundColor: '#9D28AC', padding: 25,height: 80, borderRadius: 100}}>
        <IonIcon name="image-outline" size={30} color={'#fff'} />
        </View> */}
        <Image source={require('../../../../../../../assets/images/gallery.png')} style={{width: 68,height: 68}}/>
        <Text
            style={{
            fontSize: 15,
            fontWeight: '500',
          }}>
          Gallery
        </Text>
      </TouchableOpacity>
    );

    let vp = (
      <TouchableOpacity
        style={style.actionButtonContainer}
        onPress={() => this.launchLibrary('video')}>
        <IonIcon name="videocam-outline" size={24} />

        <Text style={{ fontSize: 18, marginLeft: 10, fontWeight: '500' }}>
          Video Library
        </Text>
      </TouchableOpacity>
    );


    let audio = (
      <TouchableOpacity
        style={style.actionButtonContainer}
        onPress={() => this.launchLibrary('audio')}>
        {/* <View style={{backgroundColor: '#FF981F', padding: 25,height: 80, borderRadius: 100}}>
        <IonIcon name="ios-folder-outline" size={30} color={'#fff'} />
        </View> */}
        <Image source={require('../../../../../../../assets/images/audio.png')} style={{width: 68,height: 68}}/>
        <Text style={{ fontSize: 15, fontWeight: '500' }}>
          Audio
        </Text>
      </TouchableOpacity>
    );

    let contact = (
      <TouchableOpacity
        style={style.actionButtonContainer}
        onPress={() => this.launchLibrary('contact')}>
        {/* <View style={{backgroundColor: '#FF981F', padding: 25,height: 80, borderRadius: 100}}>
        <IonIcon name="ios-folder-outline" size={30} color={'#fff'} />
        </View> */}
        <Image source={require('../../../../../../../assets/images/contact.png')} style={{width: 68,height: 68}}/>
        <Text style={{ fontSize: 15, fontWeight: '500' }}>
          Contact
        </Text>
      </TouchableOpacity>
    );
    
    let docs = (
      <TouchableOpacity
        style={style.actionButtonContainer}
        onPress={this.pickDocument}>
        {/* <View style={{backgroundColor: '#FF981F', padding: 25,height: 80, borderRadius: 100}}>
        <IonIcon name="ios-folder-outline" size={30} color={'#fff'} />
        </View> */}
        <Image source={require('../../../../../../../assets/images/document.png')} style={{width: 68,height: 68}}/>
        <Text style={{ fontSize: 15, fontWeight: '500' }}>
          Document
        </Text>
      </TouchableOpacity>
    );

    let location = (
      <TouchableOpacity
        style={style.actionButtonContainer}
        // onPress={this.pickDocument}
        >
        {/* <View style={{backgroundColor: '#FF981F', padding: 25,height: 80, borderRadius: 100}}>
        <IonIcon name="ios-folder-outline" size={30} color={'#fff'} />
        </View> */}
        <Image source={require('../../../../../../../assets/images/location.png')} style={{width: 68,height: 68}}/>
        <Text style={{ fontSize: 15, fontWeight: '500' }}>
          location
        </Text>
      </TouchableOpacity>
    );
    

    let stickerBtn = (
      <TouchableOpacity style={style.actionButtonContainer}>
        <MCIIcon name="sticker-circle-outline" size={24} />

        <Text
          style={{ fontSize: 18, marginLeft: 10, fontWeight: '500' }}
          onPress={() => this.props.toggleStickers()}>
          Send Sticker
        </Text>
      </TouchableOpacity>
    );

    let createPollBtn = (
      <TouchableOpacity
        style={style.actionButtonContainer}
        onPress={() => {
          this.props.toggleCreatePoll();
        }}>
        <MCIIcon name="comment-plus-outline" size={24} />

        <Text style={{ fontSize: 18, marginLeft: 10, fontWeight: '500' }}>
          Create Poll
        </Text>
      </TouchableOpacity>
    );
    if (!this.state.restrictions?.isPollsEnabled) {
      createPollBtn = null;
    }
    if (!this.state.restrictions?.isStickersEnabled) {
      stickerBtn = null;
    }
    if (!this.state.restrictions?.isFilesEnabled) {
      docs = null;
    }
    if (!this.state.restrictions?.isPhotosVideosEnabled) {
      takeVideoBtn = null;
      avp = null;
      takePhotoBtn = null;
      vp = null;
    }
    return (
      <View style={style.reactionDetailsContainer}>
        <View style={{flexDirection: 'row',height: 90,marginTop: 20, justifyContent: 'center'}}>
        {docs}
        {takePhotoBtn}
        {avp}
        </View>
        <View style={{flexDirection: 'row',height: 90,marginTop: 24,marginBottom: 20, justifyContent: 'center'}}>
        {/* {takeVideoBtn} */}
        {/* {vp} */}
        {audio}
        {location}
        {contact}
        {stickerBtn}
        </View>
        {/* <View style={{flexDirection: 'row'}}>
        {createPollBtn}
        </View> */}
      </View>
    );
  };

  renderHeader = () => <View style={style.header} />;

  render() {
    const { visible, close } = this.props;
    return (
      <Modal transparent animated animationType="fade" visible={visible}
          onRequestClose={() => { 
            this.sheetRef?.current?.snapTo(1);
            this.props.close()
          }}>
        <View style={style.bottomSheetContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.sheetRef?.current?.snapTo(1);
              this.props.close();
            }}>
            <View style={style.fullFlex}>
              {this.state.snapPoints ? (
                <BottomSheet
                  ref={this.sheetRef}
                  snapPoints={this.state.snapPoints}
                  borderRadius={30}
                  initialSnap={1}
                  enabledInnerScrolling={false}
                  enabledContentTapInteraction
                  overdragResistanceFactor={10}
                  renderContent={this.renderContent}
                  // renderHeader={this.renderHeader}
                  onCloseEnd={() => {
                    close();
                  }}
                />
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    );
  }
}
