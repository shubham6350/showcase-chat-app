import { StyleSheet } from 'react-native';

import { calc } from '../../../utils/consts';

export default StyleSheet.create({
  contactWrapperStyle: {
    height: '100%',
    // backgroundColor: 'yellow',
  },
  contactHeaderStyle: {
    // padding: 10,
    paddingHorizontal: 16,
  },
  contactHeaderCloseStyle: {
    height: 24,
    width: '33%',
  },
  contactHeaderTitleStyle: {
    margin: 0,
    fontWeight: '700',
    textAlign: 'left',
    fontSize: 28,
  },
  contactSearchStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#246BFD',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  contactSearchInputStyle: {
    flex: 1,
    paddingVertical: 4,
    marginHorizontal: 2,
    fontSize: 17,
  },
  contactMsgStyle: {
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactMsgTxtStyle: {
    margin: 0,

    fontSize: 24,
    fontWeight: '600',
  },
  contactListStyle: {
    height: calc(),
    margin: 0,
    padding: 0,
  },
  contactAlphabetStyle: {
    padding: 0,
    paddingVertical: 8,
    backgroundColor: 'white',
    width: '100%',
    height: '0%',
    paddingHorizontal: 15,
  },
  contactAlphabetTextStyle: {
    fontSize: 13,
    opacity: 0.5,
  },
  itemSeparatorStyle: {
    borderBottomWidth: 1,
    width: '85%',
    alignSelf: 'flex-end',
    marginHorizontal: 16,
  },
  headerContainer: {
    alignItems: 'center',
    height: 85,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
});
