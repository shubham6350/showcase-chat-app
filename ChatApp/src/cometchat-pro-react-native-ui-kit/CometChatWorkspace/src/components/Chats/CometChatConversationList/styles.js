import { StyleSheet } from 'react-native';
import { widthRatio, heightRatio } from '../../../utils/consts';

const styles = StyleSheet.create({
  conversationWrapperStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFF',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversationHeaderStyle: {
    paddingBottom: 32,
    position: 'relative',
    paddingHorizontal: 22 * widthRatio,
    backgroundColor: '#5089FF',
  },
  contactHeaderCloseStyle: {
    height: 24,
    width: '33%',
  },
  conversationHeaderTitleStyle: {
    margin: 0,
    fontWeight: '700',
    textAlign: 'left',
    fontSize: 28,
  },
  contactSearchInputStyle: {
    flex: 1,
    paddingVertical: 4 * heightRatio,
    marginHorizontal: 8 * widthRatio,
    fontSize: 15,
  },
  contactMsgStyle: {
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#FFF',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 4,
  },
  contactMsgTxtStyle: {
    margin: 0,
    height: 30 * heightRatio,
    fontSize: 24,
    fontWeight: '600',
  },
  itemSeperatorStyle: {
    borderBottomWidth: 1,
    width: '85%',
    alignSelf: 'flex-end',
    paddingHorizontal: 12 * widthRatio,
  },
  headerContainer: {
    alignItems: 'center',
    height: 8,
    width: '100%',
    justifyContent: 'center',
  },
  flexGrow1: { flexGrow: 1 },
  deleteText: { color: '#fff' },
});

const styles_dark = StyleSheet.create({
  conversationWrapperStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: '#000',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversationHeaderStyle: {
    paddingBottom: 32,
    position: 'relative',
    paddingHorizontal: 22 * widthRatio,
    backgroundColor: '#5089FF',
  },
  contactHeaderCloseStyle: {
    height: 24,
    width: '33%',
  },
  conversationHeaderTitleStyle: {
    margin: 0,
    fontWeight: '700',
    textAlign: 'left',
    fontSize: 28,
  },
  contactSearchInputStyle: {
    flex: 1,
    paddingVertical: 4 * heightRatio,
    marginHorizontal: 8 * widthRatio,
    fontSize: 15,
  },
  contactMsgStyle: {
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#000',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 4,
  },
  contactMsgTxtStyle: {
    margin: 0,
    height: 30 * heightRatio,
    fontSize: 24,
    fontWeight: '600',
  },
  itemSeperatorStyle: {
    borderBottomWidth: 1,
    width: '85%',
    alignSelf: 'flex-end',
    paddingHorizontal: 12 * widthRatio,
  },
  headerContainer: {
    alignItems: 'center',
    height: 8,
    width: '100%',
    justifyContent: 'center',
  },
  flexGrow1: { flexGrow: 1 },
  deleteText: { color: '#fff' },
});

export default styles;
export { styles_dark };
