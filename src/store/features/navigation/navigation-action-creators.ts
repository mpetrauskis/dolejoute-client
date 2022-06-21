import {
  NavigationClearRedirectAction,
  NavigationSetRedirectAction,
  NavigationActionType,
} from './navigation-types';

export const navigationClearRedirectAction: NavigationClearRedirectAction = {
  type: NavigationActionType.NAVIGATION_CLEAR_REDIRECT,
};

export const createNavigationSetRedirectAction = (redirect: string): NavigationSetRedirectAction => ({
  type: NavigationActionType.NAVIGATION_SET_REDIRECT,
  payload: { redirect },
});
