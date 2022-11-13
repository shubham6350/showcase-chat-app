import { StyleSheet } from 'react-native';
import { widthRatio } from '../../../utils/consts';
import theme from '../../../resources/theme';
export default StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    // backgroundColor:'red',
    // justifyContent:'space-around'
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
    width: '60%',
    justifyContent: 'center',
    marginLeft:22,
    // backgroundColor:'green',
  },
  userNameText: {
    fontSize: 18,
    fontWeight: '700',
    maxWidth: '80%',
    color: theme.color.primary,
  },
});
