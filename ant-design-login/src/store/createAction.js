import * as types from './constants';

export const changeLoginMethodAction = (flag) => ({
  type: types.LoginMethod,
  loginMethod: flag,
});

export const selectLanguageAction = (flag) => ({
  type: types.LanguageChange,
  visible: flag,
});

export const fetchDataAction = (promise) => ({
  type: types.LOGIN,
  payload: promise,
});

export const fetchVerificationCodeAction = (promise) => ({
  type: types.SendVerificationCode,
  payload: promise,
});
