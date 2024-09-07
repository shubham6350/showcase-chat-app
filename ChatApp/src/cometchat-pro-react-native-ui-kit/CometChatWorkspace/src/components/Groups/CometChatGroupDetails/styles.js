import { Dimensions, StyleSheet } from 'react-native';
import { heightRatio, widthRatio } from '../../../utils/consts';
import theme from '../../../resources/theme';
export default StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' },
  modalWrapper: {
    backgroundColor: 'transparent',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    paddingVertical: 20,
    borderRadius: 30,
    elevation: 1,
  },
  itemLinkStyle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '600',
    color: theme.color.primary,
    fontFamily: 'Urbanist-SemiBold',
  },
  itemLinkStyle1: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '600',
    color: theme.color.primary,
    fontFamily: 'Urbanist-SemiBold',
  },
  fullWidth: { width: '100%' },
  listItemContainer: {
    width: '100%',
    marginVertical: 2,
  },
  sectionHeaderStyle: {
    margin: 0,
    width: '100%',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    textTransform: 'uppercase',
    color: theme.color.helpText,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 25 * heightRatio,
    paddingBottom: 15 * heightRatio,
    paddingHorizontal: 16 * widthRatio,
    borderBottomWidth: 1,
    backgroundColor: '#246BFD',
  },
  closeIcon: { marginRight: 7 },
  detailContainer: { paddingHorizontal: 16 },
  headerTitleStyle: {
    fontWeight: '700',
    fontSize: 20,
  },
  sectionHeaderStyles: {
    margin: 0,
    fontSize: 18,
    lineHeight: 20,
    marginLeft: 10,
    color: '#000',
    paddingLeft: 5,
    fontFamily: 'Urbanist-SemiBold',
  },
  reactionDetailsContainer: {
    backgroundColor: 'white',
    flex: 1,
    overflow: 'hidden',
    minHeight: Dimensions.get('window').height,
  },
  userName: {
    fontSize: 24 * heightRatio,
    color: '#000',
    fontFamily: 'Urbanist-Bold',
  },
  statusText: {
    marginTop: 5,
    fontSize: 16,
    color: '#000',
    fontFamily: 'Urbanist-Regular',
  },
  avatarStyle: {
    width: 140,
    height: 140,
    borderRadius: 80,
    backgroundColor: 'rgba(51,153,255,0.25)',
  },
  groupDetailContainer: {
    // padding: 16,
    // flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor:'red',
    height: '30%',
  },
  groupDetail: {
    paddingLeft: 8,
    justifyContent: 'center',
    height: 48,
  },
});
