import { StyleSheet } from 'react-native';
import { heightRatio } from '../../../utils/consts';
import theme from '../../../resources/theme';
import { COLORS } from '../../../../../../../assets/colors/colors';

const styles = StyleSheet.create({
  bottomSheetContainer: { flex: 1,padding: 20,marginBottom: -80 },
  mainContainer: { flexDirection: 'row', padding: 10, alignItems: 'center' },
  plusCircleContainer: { marginRight: 10, marginLeft: 10 },
  plusCircleContainerr: {padding: 10,backgroundColor: COLORS.ALERT_INFO ,borderRadius: 50},
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fullFlex: { flex: 1},
  chatComposerStyle: {
    padding: 14,
    backgroundColor: theme.backgroundColor.white,
    zIndex: 1,
    flexDirection: 'row',
  },
  composerInputStyle: {
    padding: 14,
    flex: 1,
    zIndex: 1,
    flexDirection: 'row',
  },
  inputInnerStyle: {
    flex: 1,

    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.borderColor.primary,
    backgroundColor: theme.backgroundColor.white,
    flexDirection: 'column',
    width: '100%',
  },
  messageInputStyle: {
    color: 'black',
    fontSize: 15,
    backgroundColor: '#FAFAFA',
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
    height: 36,
  },
  audioT: {
    width: '100%',
    height: 50,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#FFF'
  },
  audioTp: {
    flex: 1,
    height: 50,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  pAudiol: {
    width: '100%',
    height: 50,
    backgroundColor: '#FAFAFF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  
  inputStickyStyle: {
    padding: 7,
    height: 35,
    borderTopWidth: 1,
    borderColor: theme.borderColor.primary,
    backgroundColor: theme.backgroundColor.grey,
    justifyContent: 'space-between',
  },
  reactionDetailsContainer: {
    backgroundColor: '#FAFAFA',
    paddingVertical: 20,
    borderRadius: 20,
    minHeight: 200,
  },
  actionButtonContainer: {
    flexDirection: 'column',
    height: 50 * heightRatio,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  header: {
    width: '10%',
    height: 5,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
    backgroundColor: theme.color.darkSecondary,
  },
  reactionBtnStyle: {
    marginLeft: 10,
  },
  sendButtonStyle: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockedPreviewContainer: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    opacity: 0.7,
  },
  blockedPreviewText1: { fontSize: 20, fontWeight: '800' },
  blockedPreviewText2: { textAlign: 'center', marginTop: 5 },
  editPreviewContainerStyle: {
    padding: 7,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderColor: 'black',
  },
  previewHeadingContainer: {
    borderLeftWidth: 3,
    paddingLeft: 8,
  },
  previewHeadingStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  previewTextStyle: {
    fontSize: 16,
    fontWeight: '600',
  },
});

const styles_dark = StyleSheet.create({
  bottomSheetContainer: { flex: 1,padding: 20,marginBottom: -80 },
  mainContainer: { flexDirection: 'row', padding: 10, alignItems: 'center' },
  plusCircleContainer: { marginRight: 10, marginLeft: 10 },
  plusCircleContainerr: {padding: 10,backgroundColor: COLORS.ALERT_INFO ,borderRadius: 50},
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  audioT: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#181A20'
  },
  audioTp: {
    flex: 1,
    height: 50,
    backgroundColor: '#23262E',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  fullFlex: { flex: 1},
  chatComposerStyle: {
    padding: 14,
    backgroundColor: theme.backgroundColor.white,
    zIndex: 1,
    flexDirection: 'row',
  },
  composerInputStyle: {
    padding: 14,
    flex: 1,
    zIndex: 1,
    flexDirection: 'row',
  },
  inputInnerStyle: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.borderColor.primary,
    backgroundColor: theme.backgroundColor.white,
    flexDirection: 'column',
    width: '100%',
  },
  messageInputStyle: {
    color: '#fff',
    fontSize: 15,
    backgroundColor: '#23262E',
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
    height: 36,
  },
  inputStickyStyle: {
    padding: 7,
    height: 35,
    borderTopWidth: 1,
    borderColor: theme.borderColor.primary,
    backgroundColor: theme.backgroundColor.grey,
    justifyContent: 'space-between',
  },
  reactionDetailsContainer: {
    backgroundColor: '#000',
    paddingVertical: 20,
    borderRadius: 20,
    minHeight: 200,
  },
  actionButtonContainer: {
    flexDirection: 'column',
    height: 50 * heightRatio,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  header: {
    width: '10%',
    height: 5,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
    backgroundColor: theme.color.darkSecondary,
  },
  reactionBtnStyle: {
    marginLeft: 10,
  },
  sendButtonStyle: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockedPreviewContainer: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    opacity: 0.7,
  },
  blockedPreviewText1: { fontSize: 20, fontWeight: '800' },
  blockedPreviewText2: { textAlign: 'center', marginTop: 5 },
  editPreviewContainerStyle: {
    padding: 7,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderColor: 'black',
  },
  previewHeadingContainer: {
    borderLeftWidth: 3,
    paddingLeft: 8,
  },
  pAudiod: {
    width: ' 100%',
    height: 50,
    backgroundColor: '#23262E',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  previewHeadingStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  previewTextStyle: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;
export {styles_dark};
