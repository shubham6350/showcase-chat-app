import React, { useState } from 'react';
import theme from '../../../resources/theme';
import CometChatUserPresence from '../../Shared/CometChatUserPresence';
import CometChatAvatar from '../../Shared/CometChatAvatar';

import { Text, View, Image, TouchableOpacity } from 'react-native';
import style from './styles';
import checkboxActive from './resources/checkbox-blue-active.png';
import checkboxInactive from './resources/checkbox-inactive.png';

const CometChatAddGroupMemberListItem = (props) => {
  const viewTheme = { ...theme, ...props.theme };
  // console.log(props.theme, '##############');

  const [checked, setChecked] = useState(() => {
    // console.log(props.test, 'llllllll');
    const found = props.membersToAdd.find(
      (member) => member.uid === props.user.uid,
    );

    const value = !!found;
    return value;
  });

  // console.log(props.membersToAdd,'llll');

  /**
   * handles if the participant has to be added or not in the group.
   * @param
   */

  const handleCheck = () => {
    const value = checked !== true;
    setChecked(value);
    // console.log(value,'uuu');
    props.changed(props.user, value);
  };

  return (
    <View
      style={[style.rowStyle, { backgroundColor: props.theme.backgroundl }]}>
      <View style={[style.nameStyle]}>
        <View style={style.avatarStyle}>
          <CometChatAvatar
            image={{ uri: props.user.avatar }}
            cornerRadius={22}
            borderColor={viewTheme.color.secondary}
            borderWidth={0}
            name={props.user.name}
          />
          <CometChatUserPresence
            status={props.user.status}
            cornerRadius={18}
            borderColor={viewTheme.color.darkSecondary}
            borderWidth={2}
          />
        </View>
        <Text
          numberOfLines={1}
          style={[style.userName, { color: props.theme.color }]}>
          {props.user.name}
        </Text>
      </View>
      <TouchableOpacity onPress={handleCheck}>
        <Image
          source={checked ? checkboxActive : checkboxInactive}
          alt="checkBox"
          style={style.imageStyle}
        />
      </TouchableOpacity>
    </View>
  );
};
export default CometChatAddGroupMemberListItem;
