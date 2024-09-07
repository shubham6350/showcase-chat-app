import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container1: {
        margin: 24,
        height: '95%',
        backgroundColor: '#fff',
    },
    logoc: {
        flex: 1,
        alignItems: 'center',
        padding: 50,
        marginBottom: 100,
    },
    simage: {
        width: 140,
        height: 140,
    },
    heads1: {
        flex: 1,
        alignItems: 'center',
    },
    head1: {
        fontFamily: 'Urbanist-Bold',
        fontSize: 30,
        color: '#000', 
    },
    countp: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#FAFAFA'
    },
    remeb: {
        flex: 1,
        justifyContent: 'center',
    },
    but1: {
        flex: 1
    },
    bott: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
        bottom: 5,
    },
    bottxt: {
        fontFamily: 'Urbanist-Regular',
        color: 'grey',
    },
    mainContainerr: {
        flex: 1,
        backgroundColor: '#fff',
      },
      headd1: {
        fontFamily: 'Urbanist-Bold',
        fontSize: 24,
        color: '#000',
      },
      containerr1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputt1: {
        textAlign: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        fontSize: 24,
        fontFamily: 'Urbanist-Bold',
        backgroundColor: '#FAFAFA',
        borderRadius: 18,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#EEEE',
      },
      rcodee: {
        fontFamily: 'Urbanist-Medium',
        fontSize: 18,
        marginTop: 60,
        color: '#000',
      },
      headd2: {
        fontFamily: 'Urbanist-Medium',
        fontSize: 18,
        marginBottom: 60,
        color: '#000',
      }
});

const styles_dark = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#121122',
    },
    container1: {
        margin: 24,
        height: '95%',
        backgroundColor: '#121122',
    },
    logoc: {
        flex: 1,
        alignItems: 'center',
        padding: 50,
        marginBottom: 100,
    },
    simage: {
        width: 140,
        height: 140,
    },
    heads1: {
        flex: 1,
        alignItems: 'center',
    },
    head1: {
        fontFamily: 'Urbanist-Bold',
        fontSize: 30,
        color: '#FFF', 
    },
    countp: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#1F222A',
        color: '#fff',
    },
    remeb: {
        flex: 1,
        justifyContent: 'center',
    },
    but1: {
        flex: 1
    },
    bott: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
        bottom: 5,
    },
    bottxt: {
        fontFamily: 'Urbanist-Regular',
        color: 'grey',
    },
    mainContainerr: {
        flex: 1,
        backgroundColor: '#121122',
      },
      headd1: {
        fontFamily: 'Urbanist-Bold',
        fontSize: 24,
        color: '#fff',
      },
      headd2: {
        fontFamily: 'Urbanist-Medium',
        fontSize: 18,
        marginBottom: 60,
        color: '#fff',
      },
      containerr1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputt1: {
        textAlign: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        fontSize: 24,
        color: '#fff',
        fontFamily: 'Urbanist-Bold',
        backgroundColor: '#121122',
        borderRadius: 18,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#EEEE',
      },
      rcodee: {
        fontFamily: 'Urbanist-Medium',
        fontSize: 18,
        marginTop: 60,
        color: '#fff',
      }
});

export default styles;
export {styles_dark};