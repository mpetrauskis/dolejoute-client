/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
import { NavigationState, NavigationAction, NavigationActionType } from './navigation-types';

const initialState: NavigationState = {
  redirect: null,
};

const navigationReducer: Reducer<NavigationState, NavigationAction> = (state = initialState, action) => {
  switch (action.type) {
    case NavigationActionType.NAVIGATION_CLEAR_REDIRECT: {
      return {
        ...state,
        redirect: null,
      };
    }
    case NavigationActionType.NAVIGATION_SET_REDIRECT: {
      return {
        ...state,
        redirect: action.payload.redirect,
      };
    }
    default: return state;
  }
};

export default navigationReducer;
