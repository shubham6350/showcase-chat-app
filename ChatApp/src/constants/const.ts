import { Dimensions } from 'react-native';

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;

export const heightRatio = deviceHeight / 667;
export const widthRatio = deviceWidth / 375;
export const calc = (x = 100) => {
  return deviceHeight - x * heightRatio;
};
export const ONE_SECOND_IN_MS = 1000;

export const PATTERN = [1 * ONE_SECOND_IN_MS, 2 * ONE_SECOND_IN_MS, 3 * ONE_SECOND_IN_MS];

export const COMETCHAT_CONSTANTS = {
  APP_ID: '22236697e06e6955',
  REGION: 'us',
  AUTH_KEY: 'cc58e5a114d0bdcf97fe3de7e0e3554e2e868649',
};
