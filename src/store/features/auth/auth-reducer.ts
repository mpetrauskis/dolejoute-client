/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
import { AuthState, AuthAction, AuthActionType } from './auth-types';
import { getLocalStorageItem, setLocalStoreageItem } from '../../../helpers/local-storage-helpers';

const { REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE } = process.env;

if (REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE === undefined) {
  throw new Error('Please define REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE in /.env.local');
}

const initialState: AuthState = {
  token: getLocalStorageItem(REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE),
  user: null,
  error: null,
  loading: false,
};

const authReducer: Reducer<AuthState, AuthAction> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionType.AUTH_LOADING: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case AuthActionType.AUTH_SUCCESS: {
      setLocalStoreageItem(REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE, action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    }
    case AuthActionType.AUTH_FAILURE: {
      localStorage.removeItem(REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE);
      return {
        ...state,
        error: action.payload.error,
        user: null,
        token: null,
        loading: false,
      };
    }
    case AuthActionType.AUTH_LOGOUT: {
      localStorage.removeItem(REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE);
      return {
        ...state,
        user: null,
        token: null,
      };
    }
    case AuthActionType.AUTH_CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    default: return state;
  }
};

export default authReducer;
