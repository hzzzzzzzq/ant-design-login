import * as types from './constants';

const initialState = {
  loginMethod: '1',
  visible: false,
  tips: '获取验证码',
  disabled: false,
  isLoading: false,
  result: {},
  errMes: '',
  mobile: '',
  resultVerty: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case types.LoginMethod:
      return {
        ...state,
        loginMethod: action.loginMethod,
      };
    case types.LanguageChange:
      return {
        ...state,
        visible: action.visible,
      };
    case `${types.LOGIN}_${types.PENDING}`:
      return {
        ...state,
        isLoading: true,
      };
    case `${types.LOGIN}_${types.FULFILLED}`:
      return {
        ...state,
        isLoading: false,
        result: action.payload,
      };
    case `${types.LOGIN}_${types.REJECTED}`:
      return {
        ...state,
        isLoading: false,
        result: action.payload,
        errMes: action.errMes,
      };

    case `${types.SendVerificationCode}_${types.PENDING}`:
      return {
        ...state,
        isLoading: true,
      };
    case `${types.SendVerificationCode}_${types.FULFILLED}`:
      return {
        ...state,
        isLoading: false,
        resultVerty: action.payload.data,
      };
    case `${types.SendVerificationCode}_${types.REJECTED}`:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
