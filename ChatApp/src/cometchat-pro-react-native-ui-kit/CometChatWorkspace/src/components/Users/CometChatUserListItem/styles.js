import { StyleSheet } from 'react-native';
import { widthRatio } from '../../../utils/consts';
import theme from '../../../resources/theme';
export default StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 18,
    // backgroundColor: 'yellow',
    // justifyContent: 'space-evenly',
  },
  avatarStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(51,153,255,0.25)',
    marginRight: 15 * widthRatio,
  },
  userNameStyle: {
    width: '100%',
    justifyContent: 'center',
  },
  userNameText: {
    fontSize: 18,
    fontWeight: '600',
    maxWidth: '80%',
    fontWeight: '700',
    paddingLeft: 20,
    // backgroundColor:'red',
    color: theme.color.primary,
  },
});
