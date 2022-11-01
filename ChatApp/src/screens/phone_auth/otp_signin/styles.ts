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
});

export default styles;