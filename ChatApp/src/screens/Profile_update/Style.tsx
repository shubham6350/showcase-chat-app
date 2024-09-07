import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  Header_Container: {
    height: 60,
    width: '100%',
    // backgroundColor: 'red',
    alignItems: 'center',
    flexDirection: 'row',
  },
  Icon_Container: {
    // backgroundColor: 'green',
    width: '10%',
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Heading: {
    // backgroundColor: 'yellow',
    width: '70%',
    alignItems: 'center',
  },
  Heading_Text: {
    fontWeight: '500',
    fontSize: 20,
    color: '#000',
  },
  Content: {
    height: '78%',
    marginTop: 50,
    // backgroundColor: 'yellow',
  },
  Image_Container: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  Image_Box: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginBottom: 40,
  },
  Input_Container: {
    height: 400,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  Button_Box: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button: {
    width: '90%',
  },
  images: {
    height: '100%',
    width: '100%',
    borderRadius: 500,
  },
  Edit_Icon: {
    backgroundColor: '#fff',
    borderRadius: 300,
    marginTop: -60,
    marginLeft: 160,
  },
  Button_Container: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    borderRadius: 10,
  },
  Button_Box1: {
    // backgroundColor: 'blue',
    // justifyContent: 'center',
    // alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    width: '100%',
  },
  Icon_container: {
    // backgroundColor: 'green',
    height: 20,
    width: 20,
  },
  Text_box: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    // backgroundColor: 'yellow',
  },
  Text: {
    fontSize: 12,
    fontWeight: '400',
  },
  Text_Input: {
    width: '100%',
  },

  //modal styling
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 20,
    justifyContent: 'space-evenly',
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
    height: '20%',
    width: '50%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'black',
    // fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  container: {
    padding: 16,
  },
  input: {
    height: 55,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: '100%',
  },
  inputStyle: { fontSize: 16, fontFamily: 'Urbanist-Regular' },
  labelStyle: {
    fontSize: 14,
    position: 'absolute',
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
  },
  placeholderStyle: { fontSize: 16, color: '#DDDDDD', fontFamily: 'Urbanist-Regular' },
  textErrorStyle: { fontSize: 16, fontFamily: 'Urbanist-Regular' },
});

const Styles_dark = StyleSheet.create({
  Header_Container: {
    height: 30,
    width: '100%',
    marginTop: 10,
    // backgroundColor: 'red',
    backgroundColor: '#121122',
    flexDirection: 'row',
  },
  Icon_Container: {
    // backgroundColor: 'green',
    width: '10%',
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  Heading: {
    // backgroundColor: 'yellow',
    width: '60%',
    alignItems: 'center',
    backgroundColor: '#121122',
  },
  Heading_Text: {
    fontWeight: '500',
    fontSize: 20,
    color: '#fff',
  },
  Content: {
    height: '78%',
    marginTop: 50,
    // backgroundColor: 'yellow',
  },
  Image_Container: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  Image_Box: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  Input_Container: {
    height: 350,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  Button_Box: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button: {
    width: '90%',
  },
  images: {
    height: '100%',
    width: '100%',
    borderRadius: 500,
  },
  Edit_Icon: {
    backgroundColor: '#fff',
    borderRadius: 300,
    marginTop: -60,
    marginLeft: 160,
  },

  Button_Container: {
    backgroundColor: '#FAFAFA',
    borderWidth: 2,
    borderColor: '#1F222A',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 15,
  },
  Button_Box1: {
    justifyContent: 'space-between',
    backgroundColor: '#1F222A',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 12,
    width: '100%',
  },
  Icon_container: {
    // backgroundColor: 'green',
    height: 20,
    width: 20,
  },
  Text_box: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    // backgroundColor: 'yellow',
  },
  Text: {
    fontSize: 12,
    fontWeight: '400',
  },
  Text_Input: {
    width: '100%',
    color: '#fff',
  },

  //modal styling
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#000',
    borderRadius: 20,
    // padding: 20,
    justifyContent: 'space-evenly',
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
    height: '20%',
    width: '50%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'black',
    // fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default Styles;
export { Styles_dark };
