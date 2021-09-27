import { loginPageReducer, LOGIN_PAGE_FEATURE_KEY } from '../slices/app-slices';

export const reducer = () => {
  return {
    [LOGIN_PAGE_FEATURE_KEY]: loginPageReducer,
  };
};