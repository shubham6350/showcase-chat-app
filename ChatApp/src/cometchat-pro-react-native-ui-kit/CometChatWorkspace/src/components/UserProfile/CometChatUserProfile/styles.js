import { StyleSheet } from 'react-native';
import { widthRatio, heightRatio } from '../../../utils/consts';
import theme from '../../../resources/theme';

const styles = StyleSheet.create({
  userInfoScreenStyle: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    color: '#151515',
  },
  headingContainer: {
    height: 62 * heightRatio,
    borderBottomColor: '#eaeaea',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleStyle: {
    marginLeft: 16 * widthRatio,
    fontWeight: '700',
    fontSize: 22 * heightRatio,
  },
  userContainer: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    height: 100 * heightRatio,
    // backgroundColor:'green',
  },
  avatarContainer: {
    alignSelf: 'center',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16 * widthRatio,
    // backgroundColor:'red',
  },
  userDetailsContainer: {
    marginLeft: 16 * widthRatio,
  },
  userName: {
    fontSize: 16 * heightRatio,
    color: theme.color.primary,
    fontWeight: '500',
  },
  status: {
    fontWeight: '500',
    fontSize: 14 * heightRatio,
    color: '#349afe',
  },
  avatarStyle: {
    width: 80,
    height: 80,
    borderColor: 'green',
    marginTop: 10,
    // borderRadius:100,
  },
  infoItemsWrapper: {
    borderColor: 'green',
    width: '100%',
  },
  infoItemHeadingContainer: {
    marginLeft: 16,

    marginTop: 8 * heightRatio,
  },
  infoItemHeadingText: {
    color: theme.color.helpText,
    fontWeight: '500',
    fontSize: 16,
  },
  infoItemsContainer: {
    borderColor: 'orange',
    marginLeft: 16,
    marginTop: 16 * heightRatio,
  },
  infoItem: {
    height: 40 * heightRatio,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor:'red',
  },
  themeItem: {
    height: 40 * heightRatio,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor:'red',
  },
  infoItemText: {
    fontSize: 14,
    color: theme.color.primary,
    marginLeft: 8,
  },
  logout_text: {
    color: 'red',
  },
  Logout: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    width: '83%',
    // justifyContent:'space-evenly',
  },
  Icon: {
    width: '10%',
    alignItems: 'flex-start',
    // backgroundColor:'yellow',
  },
  text: {
    width: '75%',
    // backgroundColor:'green',
  },
  forward_Icon: {
    width: '10%',
    // backgroundColor:'pink'
  },
});

const styles_dark = StyleSheet.create({
  userInfoScreenStyle: {
    flex: 1,
    backgroundColor: '#151515',
    width: '100%',
    color: '#fff',
  },
  headingContainer: {
    height: 62 * heightRatio,
    borderBottomColor: '#eaeaea',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleStyle: {
    marginLeft: 16 * widthRatio,
    fontWeight: '700',
    fontSize: 22 * heightRatio,
  },
  userContainer: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    height: 100 * heightRatio,
    // backgroundColor:'green',
  },
  avatarContainer: {
    alignSelf: 'center',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16 * widthRatio,
    // backgroundColor:'red',
  },
  userDetailsContainer: {
    marginLeft: 16 * widthRatio,
  },
  userName: {
    fontSize: 16 * heightRatio,
    color: '#fff',
    fontWeight: '500',
  },
  status: {
    fontWeight: '500',
    fontSize: 14 * heightRatio,
    color: '#349afe',
  },
  avatarStyle: {
    width: 80,
    height: 80,
    borderColor: 'green',
    marginTop: 10,
    // borderRadius:100,
  },
  infoItemsWrapper: {
    borderColor: 'green',
    width: '100%',
  },
  infoItemHeadingContainer: {
    marginLeft: 16,

    marginTop: 8 * heightRatio,
  },
  infoItemHeadingText: {
    color: theme.color.helpText,
    fontWeight: '500',
    fontSize: 16,
  },
  infoItemsContainer: {
    borderColor: 'orange',
    marginLeft: 16,
    marginTop: 16 * heightRatio,
  },
  infoItem: {
    height: 40 * heightRatio,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor:'red',
  },
  infoItemText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 8,
  },
  logout_text: {
    color: 'red',
  },
  Logout: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    width: '83%',
    // justifyContent:'space-evenly',
  },
  Icon: {
    width: '10%',
    alignItems: 'flex-start',
    // backgroundColor:'yellow',
  },
  text: {
    width: '75%',
    // backgroundColor:'green',
  },
  forward_Icon: {
    width: '10%',
    // backgroundColor:'pink'
  },
});

export default styles;
export { styles_dark };
