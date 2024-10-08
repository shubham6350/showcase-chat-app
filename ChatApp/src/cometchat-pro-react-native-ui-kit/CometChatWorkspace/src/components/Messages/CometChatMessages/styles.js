import { StyleSheet } from 'react-native';
import theme from '../../../resources/theme';
import { deviceHeight } from '../../../utils/consts';

const styles =  StyleSheet.create({
  fullFlex: { flex: 1 },
  bottomSheetOuterContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' },
  chatWrapperStyle: {
    flex: 1,
    fontFamily: `${theme.fontFamily}`,
    backgroundColor: 'white',
  },
  reactionsWrapperStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    right: 0,
    zIndex: 2,
    justifyContent: 'flex-end',
  },
  bottomSheetInnerContainer: {
    backgroundColor: 'white',
    height: deviceHeight - 80,
  },
  //forward messages style

  header: {
    width: '100%',
    height: '9%',
    backgroundColor: '#246BFD',
    justifyContent: 'center',
  },
  container: {
    // backgroundColor: 'yellow',
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor:'green'
  },
  Icon_Container: {
    height: 30,
    width: 30,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading_Container: {
    width: '80%',
    height: 30,
    // backgroundColor: 'green',
    justifyContent: 'center',
  },
  heading_text: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'urbanist',
    color: '#FFF',
  },
  content: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: 15,
  },
  userContainer: {
    width: '100%',
    height: 60,
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
  },
  userProfile: {
    height: 50,
    width: 50,
    backgroundColor: '#FFFFFF',
    // backgroundColor:'green',
    borderRadius: 50,
  },
  userName: {
    width: '60%',
    height: 40,
    justifyContent: 'center',

    // backgroundColor: 'yellow',
  },
  userNameText: {
    fontSize: 20,
    fontWeight: '600',
  },
  groupButtonContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  ImageuploadContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  ImageLoaderConatiner: {
    
  },
});

const styles_dark =  StyleSheet.create({
  fullFlex: { flex: 1 },
  bottomSheetOuterContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' },
  chatWrapperStyle: {
    flex: 1,
    fontFamily: `${theme.fontFamily}`,
    backgroundColor: '#181A20',
  },
  reactionsWrapperStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    right: 0,
    zIndex: 2,
    justifyContent: 'flex-end',
  },
  bottomSheetInnerContainer: {
    backgroundColor: 'white',
    height: deviceHeight - 80,
  },
});

export default styles;
export {styles_dark};
