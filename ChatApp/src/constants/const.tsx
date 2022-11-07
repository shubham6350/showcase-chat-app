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
  APP_ID: '',
  REGION: '',
  AUTH_KEY: '',
};
export const GOOGLE_SIGNIN = {
  WEB_CLIENT_ID: '993010448494-junrsuvh8tq7g3ena1edbb8lnj43e0h5.apps.googleusercontent.com',
};
