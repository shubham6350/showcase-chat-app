import { StyleSheet } from 'react-native';
import { heightRatio, widthRatio, deviceHeight } from '../../../utils/consts';
import theme from '../../../resources/theme';
export default StyleSheet.create({
  avatarContainer: {
    overflow: 'hidden',
    borderStyle: 'solid',
  },
  defaultAvatarContainer: {
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    aspectRatio: 1,
    width: '100%',
    height: undefined,
  },

  groupDetailContainer: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  groupDetail: {
    paddingTop: 5,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18 * heightRatio,
    color: theme.color.primary,
    fontWeight: 'bold',
  },
});
