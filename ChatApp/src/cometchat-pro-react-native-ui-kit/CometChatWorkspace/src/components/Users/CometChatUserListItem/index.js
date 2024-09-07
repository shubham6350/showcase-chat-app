import React, { useContext } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { CometChatUserPresence, CometChatAvatar } from '../../Shared';
import themeContext from '../../../../../../theme/themeContext';

import style from './styles';
import theme from '../../../resources/theme';

const CometChatUserListItem = (props) => {
  const viewTheme = { ...theme, ...props.theme };
  const theme = useContext(themeContext);

  return (
    <TouchableHighlight
      key={props.user.uid}
      onPress={() => props.clickHandler(props.user)}
      underlayColor={viewTheme.backgroundColor.listUnderlayColor}>
      <View style={style.listItem}>
        <View style={[style.avatarStyle, { borderRadius: 30 }]}>
          <CometChatAvatar
            image={{ uri: props.user.avatar }}
            cornerRadius={25}
            borderColor={viewTheme.color.secondary}
            borderWidth={0}
            name={props.user.name}
          />
          <CometChatUserPresence
            status={props.user.status}
            cornerRadius={18}
            style={{ top: 30 }}
            borderColor={viewTheme.color.white}
            borderWidth={2}
          />
        </View>
        <View style={style.userNameStyle}>
          <Text
            numberOfLines={1}
            style={[style.userNameText, { color: theme.color }]}>
            {props.user.name}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default CometChatUserListItem;
