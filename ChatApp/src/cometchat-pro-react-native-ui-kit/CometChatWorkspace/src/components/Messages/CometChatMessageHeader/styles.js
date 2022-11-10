import { StyleSheet } from 'react-native';
import theme from '../../../resources/theme';
import { widthRatio, heightRatio } from '../../../utils/consts';

export default StyleSheet.create({
  callMessageStyle: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    textAlign: 'center',
  },
  callMessageTxtStyle: {
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: '500',
    margin: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    height: 80,
    paddingRight: 12,
    elevation: 5,
    backgroundColor: '#3375FE',
    zIndex: 5,
    alignItems: 'center',
  },
  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  backText: {
    fontSize: 20,
    color: '#fff',
  },
  headerDetailContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  audioCallContainer: {
    paddingHorizontal: 8,
  },
  videoCallContainer: {
    paddingHorizontal: 8,
  },
  callIcon: {
    height: 24,
    width: 24,
  },
  videoIcon: { width: 34, height: 24, resizeMode: 'contain' },
  itemDetailContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemNameText: {
    fontSize: 25,
    fontWeight: '500',
    color: '#fff',
    fontFamily: 'Urbanist-Bold',
  },
  statusText: {
    fontSize: 14,
    color: '#FFF',
    fontFamily: 'Urbanist-Regular',
  },
  avatarContainer: {
    height: 40,
    width: 40,
    borderRadius: 25,
    marginRight: 12,
  },
});
