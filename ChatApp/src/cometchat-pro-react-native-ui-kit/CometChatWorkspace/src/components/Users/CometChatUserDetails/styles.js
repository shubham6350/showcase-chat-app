import { StyleSheet } from 'react-native';
import { heightRatio, widthRatio, deviceHeight } from '../../../utils/consts';
import theme from '../../../resources/theme';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' },
  itemLinkStyle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
  },
  sectionHeaderStyle: {
    margin: 0,
    width: '100%',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    textTransform: 'uppercase',
  },
  sectionHeaderStyles: {
    margin: 0,
    width: '100%',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginLeft: 10,
    textTransform: 'uppercase',
    color: '#000',
  },
  optionsContainer: {padding: 20, flex: 1},
  optionsContainer1: {flex: 1},
  blockContainer: { width: '100%' },
  blockText: {
    width: '100%',
    marginVertical: 6,
    paddingBottom: 8,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 19 * heightRatio,
    paddingHorizontal: 16 * widthRatio,
    borderBottomWidth: 1,
    backgroundColor:'#246BFD',
  },
  headerTitleStyle: {
    fontWeight: '700',
    fontSize: 20,
  },
  reactionDetailsContainer: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
    minHeight: deviceHeight,
  },
  avatarStyle: {
    marginTop: 20,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(51,153,255,0.25)',
  },
  userName: {
    fontSize: 18 * heightRatio,
    color: theme.color.primary,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 14,
    color: theme.color.blue,
  },
  userDetailContainer: {
    // padding: 16,
    // flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
    // backgroundColor:'red',
    height:'30%',

  },
  userDetail: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    height: 48,
    width: '100%',
  },
});

const styles_dark = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' },
  itemLinkStyle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
  },
  sectionHeaderStyle: {
    margin: 0,
    width: '100%',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    textTransform: 'uppercase',
  },
  optionsContainer: {padding: 20, flex: 1},
  blockContainer: { width: '100%' },
  blockText: {
    width: '100%',
    marginVertical: 6,
    paddingBottom: 8,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 19 * heightRatio,
    paddingHorizontal: 16 * widthRatio,
    borderBottomWidth: 1,
    backgroundColor:'#246BFD',
  },
  headerTitleStyle: {
    fontWeight: '700',
    fontSize: 20,
  },
  reactionDetailsContainer: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
    minHeight: deviceHeight,
  },
  avatarStyle: {
    marginTop: 20,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(51,153,255,0.25)',
  },
  userName: {
    fontSize: 18 * heightRatio,
    color: theme.color.primary,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 14,
    color: theme.color.blue,
  },
  userDetailContainer: {
    // padding: 16,
    // flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
    // backgroundColor:'red',
    height:'30%',

  },
  userDetail: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    height: 48,
    width: '100%',
  },
});

export default styles;
export {styles_dark};
