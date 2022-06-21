export type NavigationState = {
  redirect: string | null;
};

export enum NavigationActionType {
  NAVIGATION_CLEAR_REDIRECT = 'NAVIGATION_CLEAR_REDIRECT',
  NAVIGATION_SET_REDIRECT = 'NAVIGATION_SET_REDIRECT',
}

export type NavigationClearRedirectAction = {
  type: NavigationActionType.NAVIGATION_CLEAR_REDIRECT,
};

export type NavigationSetRedirectAction = {
  type: NavigationActionType.NAVIGATION_SET_REDIRECT,
  payload: {
    redirect: string
  }
};

export type NavigationAction = NavigationClearRedirectAction | NavigationSetRedirectAction;
