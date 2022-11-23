import { StyleSheet } from 'react-native';
import theme from '../../../resources/theme';
import { widthRatio } from '../../../utils/consts';

const styles = StyleSheet.create({
  fullFlex: { flex: 1 },
  bottomSheetContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  actionsContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 30,
    borderRadius: 20,
    minHeight: 650,
  },
  actionsText: { fontSize: 20, marginLeft: 10, color: '#000' },
  action: { paddingVertical: 10, flexDirection: 'row', alignItems: 'center' },
  header: {
    width: '10%',
    height: 5,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
    backgroundColor: theme.color.darkSecondary,
  },
  avatarStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: 36,
    height: 36,
    marginRight: 15 * widthRatio,
  },
});

const styles_dark = StyleSheet.create({
  fullFlex: { flex: 1 },
  bottomSheetContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  actionsContainer: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 30,
    borderRadius: 20,
    minHeight: 650,
  },
  actionsText: { fontSize: 20, marginLeft: 10, color: '#fff' },
  action: { paddingVertical: 10, flexDirection: 'row', alignItems: 'center' },
  header: {
    width: '10%',
    height: 5,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
    backgroundColor: theme.color.darkSecondary,
  },
  avatarStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: 36,
    height: 36,
    marginRight: 15 * widthRatio,
  },
});

export default styles;
export {styles_dark};
