import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  Header_Container: {
    height: 30,
    width: '100%',
    marginTop: 10,
    // backgroundColor: 'red',
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
    width: '60%',
    alignItems: 'center',
  },
  Heading_Text: {
    fontWeight: '500',
    fontSize: 20,
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
    backgroundColor: '#FAFAFA',
    borderRadius: 300,
    marginTop: -55,
    marginLeft: 140,
  },
  Button_Container: {
    backgroundColor: '#FAFAFA',
    borderWidth: 2,
    borderColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width: '90%',
    borderRadius: 15,
  },
  Button_Box1: {
    // backgroundColor: 'blue',
    // justifyContent: 'center',
    // alignItems: 'center',
    justifyContent: 'space-between',

    flexDirection: 'row',
    padding: 5,
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
    // backgroundColor:'green',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
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
    elevation: 5,
    height: '25%',
    width: '55%',
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
  //******//
  modal_Content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    alignItems: 'center',
  },
  modal_heading: {
    // backgroundColor: 'green',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  modal_Content_Container: {
    // backgroundColor: 'red',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  modal_Content_Text: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '85%',
    // backgroundColor: 'blue',
    height: 30,
  },
  modal_Cancel_Button_Container: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
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
    height: 56,
    width: '90%',

    borderRadius: 15,
  },
  Button_Box1: {
    // backgroundColor: 'blue',
    // justifyContent: 'center',
    // alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1F222A',
    flexDirection: 'row',
    padding: 5,
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
    elevation: 5,
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
  //******//
  modal_Content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    alignItems: 'center',
  },
  modal_heading: {
    // backgroundColor: 'green',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  modal_Content_Container: {
    // backgroundColor: 'red',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  modal_Content_Text: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '85%',
    // backgroundColor: 'blue',
    height: 30,
  },
  modal_Cancel_Button_Container: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
});

export default Styles;
export { Styles_dark };
