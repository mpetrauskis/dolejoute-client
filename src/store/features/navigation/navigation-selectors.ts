/* eslint-disable import/prefer-default-export */
import { RootState } from '../../types';

export const selectRedirect = (state: RootState) => state.navigation.redirect;
