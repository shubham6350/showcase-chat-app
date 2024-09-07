import * as actionTypes from './actionTypes';
import { CometChat } from '@cometchat-pro/react-native-chat';
export const authStart = () => {
  console.log('authStart 1');
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (user) => {
  console.log('authSuccess 2');
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: user,
    isLoggedIn: true,
    theme: 'light',
  };
};
export const themeUpdate = (theme) => {
  console.log('themeUpdate 3');
  return {
    type: actionTypes.THEME_UPDATE,
    theme: theme,
  };
};
export const authFail = (error) => {
  console.log('authfail 4');
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};
export const createNewUser = (uid, name, img, authKey) => {
  console.log('createNewUser 4');
  return (dispatch) => {
    // let apiKey = 'API_KEY';
    // let name = uid;
    console.log(name);
    let user = new CometChat.User(uid);
    user.setName(name);
    user.setAvatar(img);
    CometChat.createUser(user, authKey).then(
      (user) => {
        if (user) {
          dispatch(auth(uid, authKey));
        } else {
          dispatch(authFail(user));
        }
      },
      (error) => {
        dispatch(authFail(error));
      }
    );
  };
};
export const logoutSuccess = () => {
  console.log('logoutSuccess 5');
  return {
    type: actionTypes.AUTH_LOGOUT,
    authRedirectPath: '/login',
  };
};
export const logout = () => {
  console.log('logout 6');
  return (dispatch) => {
    CometChat.logout().then(dispatch(logoutSuccess()));
  };
};
export const auth = (uid, authKey, name, img, createUser) => {
  console.log('auth 7');
  return (dispatch) => {
    dispatch(authStart());
    {
      name.length = 0
        ? CometChat.login(uid, authKey)
            .then((user) => {
              if (user) {
                dispatch(authSuccess(user));
              } else {
                dispatch(authFail(user));
              }
            })
            .catch((error) => {
              if (error.code === 'ERR_UID_NOT_FOUND') {
                dispatch(createNewUser(uid, 'test', img, authKey));
              } else {
                dispatch(authFail(error));
              }
            })
        : CometChat.login(uid, authKey)
            .then((user) => {
              if (user) {
                dispatch(authSuccess(user));
              } else {
                dispatch(authFail(user));
              }
            })
            .catch((error) => {
              if (error.code === 'ERR_UID_NOT_FOUND') {
                dispatch(createNewUser(uid, name, img, authKey));
              } else {
                dispatch(authFail(error));
              }
            });
    }
  };
};
export const authCheckState = () => {
  console.log('authCheckState 7');
  return (dispatch) => {
    CometChat.getLoggedinUser()
      .then((user) => {
        if (user) {
          dispatch(authSuccess(user));
        } else {
          dispatch(authFail(user));
        }
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};
export const setAuthRedirectPath = (path) => {
  console.log('setAuthRedirectPath 8');
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};
