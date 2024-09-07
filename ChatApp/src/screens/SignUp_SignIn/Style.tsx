import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    height: '100%',
  },
  icon_container: {
    // borderWidth: 2,
    // backgroundColor: 'red',
    width: 30,
    height:'4%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 20,
  },
  Image_Container: {
    // borderWidth: 2,
    // backgroundColor: 'green',
    height:'25%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  Image_Box: {
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 193,
    width: 240,
  },
  Heading: {
    // borderWidth: 2,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 15,
  },
  Heading_text_Box: {
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 58,
    width: '76%',
  },
  Heading_text: {
    fontSize: 40,
    fontWeight: '600',
    color: '#000'
  },

  Social_Media_SignIn_Container: {
    // marginTop: 30,
    justifyContent: 'space-around',
    // backgroundColor: 'yellow',
    // borderWidth: 2,
    height:'30%',
    padding: 15,
    // marginBottom: 15,
  },

  Button_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    // backgroundColor: 'skyblue',
    padding: 15,
    // borderWidth: 2,
    height: '8%',
  },
});

const Styles_dark = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#121122',
    height: '100%',
  },
  icon_container: {
    // borderWidth: 2,
    // backgroundColor: 'red',
    width: 30,
    height:'4%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 20,
  },
  Image_Container: {
    // borderWidth: 2,
    // backgroundColor: 'green',
    height:'25%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  Image_Box: {
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 193,
    width: 240,
  },
  Heading: {
    // borderWidth: 2,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 15,
  },
  Heading_text_Box: {
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 58,
    width: '76%',
  },
  Heading_text: {
    fontSize: 45,
    fontWeight: '500',
    color: '#fff',
    fontFamily: 'Urbanist-Bold'
  },

  Social_Media_SignIn_Container: {
    // marginTop: 30,
    justifyContent: 'space-around',
    // backgroundColor: 'yellow',
    // borderWidth: 2,
    height:'30%',
    padding: 15,
    color: '#1F222A',
    // marginBottom: 15,
  },

  Button_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    // backgroundColor: 'skyblue',
    padding: 15,
    // borderWidth: 2,
    height: '8%',
  },
});
export default Styles;
export {Styles_dark};
