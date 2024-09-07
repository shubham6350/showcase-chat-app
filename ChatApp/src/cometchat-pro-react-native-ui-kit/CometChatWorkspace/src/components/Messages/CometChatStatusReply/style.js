import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  // Main_Container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  Body_Content: {
    height: 'auto',
    width: '65%',
    backgroundColor: '#246BFD',
    borderRadius: 20,
    borderBottomEndRadius: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 8,
    marginBottom: 15,
    left: '34%',
  },
  Staus_Detail_Container: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#246BFD',
    borderRadius: 12,
    opacity: 0.8,
  },
  Text_Container: {
    height: '80%',
    width: '70%',
    borderRadius: 12,
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1,
    justifyContent: 'center',
  },
  name_Box: {
    color: '#FFF',
    fontSize: 18,
    left: 10,
    fontWeight: '600',
  },
  caption_box: {
    color: '#FFF',
    fontSize: 18,
    left: 10,
    fontFamily: 'urbanist-Regular',
  },
  Image_Box: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  Image: {
    height: 40,
    width: 40,
  },
  reply_Text: {
    color: '#FAFAFA',
    fontWeight: '600',
    fontSize: 17,
    left: 5,
    fontFamily: 'urbanist-Regular',
    // opacity: 10,
  },
});
export default Styles;
