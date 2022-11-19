import React from 'react';
import { CometChat } from '@cometchat-pro/react-native-chat';
import style from './styles';
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import theme from '../../../resources/theme';

import { CometChatManager } from '../../../utils/controller';
import { AddMembersManager } from '../CometChatAddGroupMemberList/controller';
import CometChatAddGroupMemberListItem from '../CometChatAddGroupMemberListItem';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import * as actions from '../../../utils/actions';
import * as enums from '../../../utils/enums';
import { logger } from '../../../utils/common';
import DropDownAlert from '../../Shared/DropDownAlert';
import { CometChatContext } from '../../../utils/CometChatContext';
import { color } from 'react-native-reanimated';

const closeIcon = <Icon name="close" style={style.modalCloseStyle} />;
class CometChatCreateGroup extends React.Component {
  static contextType = CometChatContext;
  constructor(props) {
    super(props);
    this.state = {
      // callMessage: {},
      error: null,
      passwordInput: false,
      name: '',
      type: 'Select group type',
      password: '',
      restrictions: null,
      users_List: [],
      membersToAdd: [],
    };

    this.sheetRef = React.createRef(null);
  }

  // componentDidMount() {
  //   this.checkRestrictions();
  // }

  componentDidMount() {
    this.checkRestrictions();
    if (this.props?.friendsOnly) {
      this.friendsOnly = this.props.friendsOnly;
    }

    this.AddMembersManager = new AddMembersManager();
    this.AddMembersManager.initializeMembersRequest().then(() => {
      this.getUsers();
      this.AddMembersManager.attachListeners(this.userUpdated);
    });
  }

  checkRestrictions = async () => {
    let isPublicGroupEnabled =
      await this.context.FeatureRestriction.isPublicGroupEnabled();
    let isPasswordGroupEnabled =
      await this.context.FeatureRestriction.isPasswordGroupEnabled();
    let isPrivateGroupEnabled =
      await this.context.FeatureRestriction.isPrivateGroupEnabled();
    this.setState({
      restrictions: {
        isPublicGroupEnabled,
        isPasswordGroupEnabled,
        isPrivateGroupEnabled,
      },
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.open && this.state.open) {
      this.sheetRef.current.snapTo(0);
    }
  }

  actionHandler = (action, item, count, ...otherProps) => {
    switch (action) {
      case actions.BLOCK_USER:
        this.blockUser();
        break;
      case actions.UNBLOCK_USER:
        this.unblockUser();
        break;
      case actions.AUDIO_CALL:
        this.audioCall();
        break;
      case actions.VIDEO_CALL:
        this.setState({ joinDirectCall: false }, () => {
          this.videoCall(true);
        });
        break;
      // eslint-disable-next-line no-lone-blocks
      case actions.MENU_CLICKED: {
        this.toggleSideBar();
        this.setState({ item: {} });
        break;
      }
      case actions.VIEW_DETAIL:
      case actions.CLOSE_DETAIL_CLICKED:
        this.toggleDetailView();
        break;
      case actions.GROUP_UPDATED:
        this.groupUpdated(item, count, ...otherProps);
        break;
      case actions.GROUP_DELETED:
        this.deleteGroup(item);
        break;
      case actions.LEFT_GROUP:
        this.leaveGroup(item, ...otherProps);
        break;
      case actions.MEMBERS_UPDATED:
        this.updateMembersCount(item, count);
        break;
      case actions.VIEW_MESSAGE_THREAD:
        this.viewMessageThread(item);
        break;
      case actions.CLOSE_THREAD_CLICKED:
        this.closeThreadMessages();
        break;
      case actions.THREAD_MESSAGE_COMPOSED:
        this.onThreadMessageComposed(item);
        break;
      case actions.ACCEPT_INCOMING_CALL:
        this.acceptIncomingCall(item);
        break;
      case actions.ACCEPTED_INCOMING_CALL:
        this.callInitiated(item);
        break;
      case actions.REJECTED_INCOMING_CALL:
        this.rejectedIncomingCall(item, count);
        break;
      case actions.OUTGOING_CALL_REJECTED:
      case actions.OUTGOING_CALL_CANCELLED:
      case actions.CALL_ENDED:
        this.outgoingCallEnded(item);
        break;
      case actions.USER_JOINED_CALL:
      case actions.USER_LEFT_CALL:
        this.appendCallMessage(item);
        break;
      case actions.VIEW_ACTUAL_IMAGE:
        this.toggleImageView(item);
        break;
      case actions.MEMBERS_ADDED:
        this.membersAdded(item);
        break;
      case actions.MEMBER_UNBANNED:
        this.memberUnbanned(item);
        break;
      case actions.MEMBER_SCOPE_CHANGED:
        this.memberScopeChanged(item);
        break;
      case actions.UPDATE_THREAD_MESSAGE:
        this.updateThreadMessage(item[0], count);
        break;
      case actions.MESSAGE_COMPOSED:
        this.callInitiated(item);
        break;
      case actions.JOIN_DIRECT_CALL:
        this.setState({ joinDirectCall: true }, () => {
          this.videoCall(true);
        });
        break;
      case actions.DIRECT_CALL_ENDED:
        this.setState({ joinDirectCall: false, ongoingDirectCall: null });
        break;
      case actions.ACCEPT_DIRECT_CALL:
        this.setState({ joinDirectCall: true }, () => {
          this.videoCall(true);
        });

      default:
        break;
    }
  };
  /**
   * handles the change in password TextInput field.
   * @param feedback: TextInput's value
   */

  passwordChangeHandler = (feedback) => {
    this.setState({ password: feedback });
  };

  /**
   * handles the change in groupName TextInputField
   * @param feedback: TextInput's value
   */

  nameChangeHandler = (feedback) => {
    this.setState({ name: feedback });
  };

  /**
   * handles the change in Picker(group-type)
   * @param feedback: picker's selected value
   */

  typeChangeHandler = (feedback) => {
    const type = feedback;
    this.setState({ type });

    if (type === CometChat.GROUP_TYPE.PROTECTED) {
      this.setState({ passwordInput: true });
    } else {
      this.setState({ passwordInput: false });
    }
  };

  /**
   * handles validation of various input fields
   * @param
   * @returns boolean: true if validation is passed else false.
   */
  itemClicked = (item, type) => {
    this.setState({ item: { ...item }, type, viewDetailScreen: false }, () => {
      this.navigateToMessageListScreen(item, type);
    });
  };

  navigateToMessageListScreen = (item, type) => {
    this.props.navigation.navigate(
      enums.NAVIGATION_CONSTANTS.COMET_CHAT_MESSAGES,
      {
        type,
        item: { ...item },
        theme: this.theme,
        tab: this.state.tab,
        loggedInUser: this.loggedInUser,
        callMessage: this.state.callMessage,
        actionGenerated: this.actionHandler,
        composedThreadMessage: this.state.composedThreadMessage,
      },
    );
  };

  handleClick = (group) => {
    //handle click here
    if (!this.itemClicked) return;

    if (group.hasJoined === false) {
      if (this.state.restrictions?.isJoinLeaveGroupsEnabled === false) {
        return false;
      }
      if (group.type === CometChat.GROUP_TYPE.PASSWORD) {
        this.setState({
          showPasswordScreen: true,
          guid: group.guid,
          groupType: group.type,
        });
      }
      if (group.type === CometChat.GROUP_TYPE.PUBLIC) {
        CometChat.joinGroup(group.guid, group.type, '')
          .then((response) => {
            const groups = [...this.state.grouplist];
            if (typeof response === 'object') {
              this.dropDownAlertRef?.showMessage(
                'success',
                'Group Joined Successfully',
              );
            } else {
              this.dropDownAlertRef?.showMessage(
                'error',
                'Failed to join group',
              );
            }
            const groupKey = groups.findIndex((g) => g.guid === group.guid);
            if (groupKey > -1) {
              const groupObj = groups[groupKey];
              const newGroupObj = {
                ...groupObj,
                ...response,
                scope: CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT,
              };

              groups.splice(groupKey, 1, newGroupObj);
              this.setState({ grouplist: groups, selectedGroup: newGroupObj });

              this.itemClicked(newGroupObj, CometChat.RECEIVER_TYPE.GROUP);
            }
          })
          .catch((error) => {
            const errorCode = error?.message || 'ERROR';
            this.dropDownAlertRef?.showMessage('error', errorCode);
            logger('Group joining failed with exception:', error);
          });
      }
    } else {
      this.setState({ selectedGroup: group });
      this.props.onItemClick(group, CometChat.RECEIVER_TYPE.GROUP);
    }
  };

  validate = () => {
    const groupName = this.state.name?.trim();
    const groupType = this.state.type?.trim();

    try {
      if (!groupName) {
        this.dropDownAlertRef?.showMessage(
          'error',
          'Group name cannot be blank.',
        );
        return false;
      }

      if (!groupType || groupType === 'Select group type') {
        this.dropDownAlertRef?.showMessage(
          'error',
          'Group type cannot be blank.',
        );
        return false;
      }

      let password = '';
      if (groupType === CometChat.GROUP_TYPE.PROTECTED) {
        password = this.state.password;

        if (!password.length) {
          this.dropDownAlertRef?.showMessage(
            'error',
            'Group password cannot be blank.',
          );
          return false;
        }
      }
      return true;
    } catch (error) {
      logger(error);
      return false;
    }
  };

  getUsers = () => {
    new CometChatManager().getLoggedInUser().then(() => {
      this.AddMembersManager.fetchNextUsers().then((userList) => {
        // console.log(userList,'kkkkk');

        this.setState({
          users_List: userList,
        });

        // console.log(this.state.users_List,'kjfnsdkjfndsjkfns');

        // const filteredUserList = userList.filter((user) => {
        //   const found = this.context.memberList.find(
        //     (member) => user.uid === member.uid,
        //   );

        //   const foundBanned = this.context.bannedMemberList.find(
        //     (member) => user.uid === member.uid,
        //   );
        //   if (found || foundBanned) {
        //     return false;
        //   }
        //   return true;
        // });

        //   if (filteredUserList.length === 0) {
        //     this.decoratorMessage = 'No users found';
        //   }

        //   this.setState({
        //     userList: [...this.state.userList, ...userList],
        //     filteredList: [...this.state.filteredList, ...filteredUserList],
        //   });

        // })
        // .catch((error) => {
        //   const errorCode = error?.message || 'ERROR';
        //   this.dropDownAlertRef?.showMessage('error', errorCode);
        //   this.decoratorMessage = 'Error';
        //   logger(
        //     '[CometChatAddGroupMemberList] getUsers fetchNext error',
        //     error,
        //   );
      });
    });
    // .catch((error) => {
    //   this.decoratorMessage = 'Error';
    //   logger(
    //     '[CometChatAddGroupMemberList] getUsers getLoggedInUser error',
    //     error,
    //   );
    // });
  };

  membersUpdated = (user, userState) => {
    if (userState) {
      const members = [...this.state.membersToAdd];
      members.push(user);
      this.setState({ membersToAdd: [...members] });
    } else {
      const membersToAdd = [...this.state.membersToAdd];
      const indexFound = membersToAdd.findIndex(
        (member) => member.uid === user.uid,
      );
      if (indexFound > -1) {
        membersToAdd.splice(indexFound, 1);
        this.setState({ membersToAdd: [...membersToAdd] });
      }
    }
  };

  updateMembers = (guid) => {
    try {
      const membersList = [];
      this.state.membersToAdd.forEach((newMember) => {
        const newMemberAdded = new CometChat.GroupMember(
          newMember.uid,
          CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT,
        );

        membersList.push(newMemberAdded);

        // console.log(membersList, 'ashdvsahjvdfkadhsjfvkhdajsfvhdajks');

        newMemberAdded.type = 'add';
      });

      if (membersList.length) {
        const MembersToAdd = [];
        // this.props.close();
        CometChat.addMembersToGroup(guid, membersList, [])
          .then((response) => {
            console.log(response, 'response');
            if (Object.keys(response).length) {
              for (const member in response) {
                if (response[member] === 'success') {
                  const found = this.state.users_List.find(
                    (user) => user.uid === member,
                  );
                  found.scope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
                  MembersToAdd.push(found);
                }
              }
              this.props.actionGenerated('addGroupParticipants', MembersToAdd);
            }
          })
          .catch((error) => {
            const errorCode = error?.message || 'ERROR';
            this.dropDownAlertRef?.showMessage('error', errorCode);
            logger('addMembersToGroup failed with exception:', error);
          });
        // console.log(membersToAdd,'gggggggg');
      }
    } catch (error) {
      const errorCode = error?.message || 'ERROR';
      this.dropDownAlertRef?.showMessage('error', errorCode);
      logger('121', error);
    }
  };

  /**
   * handles the creation of new group based on validations.
   * @param
   */

  createGroup = () => {
    // try {
    //   if (!this.validate()) {
    //     return false;
    //   }

    const groupType = CometChat.GROUP_TYPE.PUBLIC;

    const { password } = this.state;
    const guid = `group_${new Date().getTime()}`;
    const name = this.state.name.trim();
    let type = groupType;

    const group = new CometChat.Group(guid, name, type, password);
    CometChat.createGroup(group).then(() => {
      // this.setState({
      //   error: null,
      //   name: '',
      //   type: '',
      //   password: '',
      //   passwordInput: '',
      this.updateMembers(guid);
      console.log('Group created');
      this.itemClicked(group,groupType);
    });
    // console.log('group created');
    // this.props.actionGenerated(actions.GROUP_CREATED, incomingGroup);
    // this.handleClick(group);
    // this.props.navigation.navigate('Chat');
    //     })
    //     .catch((error) => {
    //       logger('Group creation failed with exception:', error);
    //       this.setState({ error });
    //     });
    // } catch (error) {
    //   logger(error);
    // }
  };

  render() {
    let password = null;
    if (this.state.passwordInput) {
      password = (
        <View>
          <View>
            <TextInput
              autoCompleteType="off"
              style={[
                style.inputStyle,
                {
                  // backgroundColor: this.props.theme.backgroundColor.grey,
                  // color: this.props.theme.color.helpText,
                  // borderColor: this.props.theme.color.grey,
                  backgroundColor: 'grey',
                  color: '#FFF',
                  borderColor: 'grey',
                },
              ]}
              placeholder="Enter group password"
              secureTextEntry // for password
              onChangeText={(value) => {
                this.passwordChangeHandler(value);
              }}
              value={this.state.password}
            />
          </View>
        </View>
      );
    }

    return (
      // <Modal
      //   transparent
      //   animated
      //   animationType="fade"
      //   visible={this.props.open}>
      //   <View style={style.container}>
      //     <View style={style.innerContainer}>
      //       <View style={style.modalWrapperStyle}>
      //         <SafeAreaView>
      //           <TouchableWithoutFeedback
      //             onPress={() => {
      //               Keyboard.dismiss();
      //             }}>
      <SafeAreaView>
        <View style={style.modalBodyStyle}>
          <View style={style.modalTableStyle}>
            <View style={style.modalHeader}>
              <View style={{ width: '10%' }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Chat')}>
                  <Icon name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>

                {/* <Image   style={{height:80,width:80}} source={require('../../../../../../../assets/images/dummy.png')}  /> */}
              </View>
              <View
                style={{
                  width: '70%',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                <Text style={style.tableCaptionStyle}>New Group</Text>
              </View>
              <View style={{ width: '10%' }}>
                <Icon1 name="search1" size={28} color="#fff" />
              </View>
            </View>
            <View style={style.tableBodyStyle}>
              {/* <View>
                <Text style={style.tableErrorStyle}>{this.state.error}</Text>
              </View> */}

              <View
                style={{
                  backgroundColor: '#FAFAFA',
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  padding: 10,
                }}>
                <View
                  style={{
                    width: '15%',
                    height: '100%',
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{ height: 60, width: 60 }}
                    source={require('../../../../../../../assets/images/dummy.png')}
                  />
                  <TouchableOpacity style={{}}>
                    <Image
                      style={{
                        height: 12,
                        width: 12,
                        marginTop: 40,
                        marginRight: 30,
                        marginLeft: -10,
                      }}
                      source={require('../../../../../../../assets/images/Edit.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ width: '80%' }}>
                  <View>
                    <TextInput
                      autoCompleteType="off"
                      style={[
                        style.inputStyle,
                        {
                          // backgroundColor:
                          // this.theme.backgroundColor.grey,
                          // color: this.theme.color.helpText,
                          // borderColor: this.theme.color.grey,
                          backgroundColor: '#E4E8EA',
                          // color: '#FFF',
                          borderColor: '',
                          height: 40,
                          borderRadius: 10,
                        },
                      ]}
                      placeholder="Type group subject here..."
                      type="text"
                      onChangeText={(value) => {
                        this.nameChangeHandler(value);
                      }}
                      value={this.state.name}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  height: '5%',
                  width: '100%',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  backgroundColor: '#FAFAFA',
                }}>
                <View style={{ justifyContent: 'flex-start' }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      color: '#424242',
                      marginLeft: 15,
                    }}>
                    Add Participants
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: 'transparent',
                  width: '100%',
                  height: '100%',
                }}>
                <FlatList
                  keyExtractor={(item, index) => item.uid + '_' + index}
                  data={this.state.users_List}
                  renderItem={({ item }) => {
                    const chr = item.name[0].toUpperCase();
                    let firstLetter = null;
                    // if (chr !== currentLetter) {
                    //   currentLetter = chr;
                    //   firstLetter = currentLetter;
                    // }
                    return (
                      <React.Fragment key={item.uid}>
                        <CometChatAddGroupMemberListItem
                          // theme={this.theme}
                          // firstLetter={firstLetter}
                          // loggedinuser={group.loggedinuser}
                          user={item}
                          membersToAdd={this.state.membersToAdd}
                          // test={this.state.users_List}
                          // members={group.memberList}
                          changed={this.membersUpdated}
                        />
                      </React.Fragment>
                    );
                  }}
                  ListEmptyComponent={this.listEmptyContainer}
                  ItemSeparatorComponent={this.itemSeparatorComponent}
                  onScroll={this.handleScroll}
                  onEndReached={this.endReached}
                  onEndReachedThreshold={0.3}
                  showsVerticalScrollIndicator={false}
                />

                {/* <Text>skjvjksd</Text> */}

                <View
                  style={{
                    height: 70,
                    backgroundColor: 'red',
                    width: '25%',
                    marginLeft: '75%',
                    // marginTop: 50,
                  }}>
                  <View style={style.groupButtonContainer}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#246BFD',
                        height: 60,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 50,
                        marginBottom: 280,
                      }}
                      // style={[
                      //   style.groupButtonWrapper,
                      //   {
                      //     backgroundColor: '#246BFD',
                      //   },
                      // ]}
                      onPress={() => this.createGroup()}>
                      {/* <Text
                    style={[
                      style.btnText,
                      // { color: this.theme.color.white },
                      { color: '#FFF' },
                    ]}>
                    Create
                  </Text> */}
                      <Icon name="check" size={28} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* <View>
                          <Picker
                            style={style.inputPickerStyle}
                            onValueChange={(feedback) => {
                              this.typeChangeHandler(feedback);
                            }}
                            selectedValue={this.state.type}>
                            <Picker.Item
                              style={style.inputOptionStyle}
                              label="Select group type"
                              value="Select group type"
                            />
                            {this.state.restrictions?.isPublicGroupEnabled ? (
                              <Picker.Item
                                style={style.inputOptionStyle}
                                label="Public"
                                value={CometChat.GROUP_TYPE.PUBLIC}
                              />
                            ) : null}
                            {this.state.restrictions?.isPrivateGroupEnabled ? (
                              <Picker.Item
                                style={style.inputOptionStyle}
                                label="Private"
                                value={CometChat.GROUP_TYPE.PRIVATE}
                              />
                            ) : null}
                            {this.state.restrictions?.isPasswordGroupEnabled ? (
                              <Picker.Item
                                style={style.inputOptionStyle}
                                label="Password Protected"
                                value={CometChat.GROUP_TYPE.PROTECTED}
                              />
                            ) : null}
                          </Picker>
                        </View>
                        {password} */}
            </View>
          </View>
        </View>
      </SafeAreaView>

      //         </TouchableWithoutFeedback>
      //       </SafeAreaView>
      //     </View>
      //   </View>
      // </View>
      // <DropDownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
      // </Modal>
    );
  }
}

export default CometChatCreateGroup;
