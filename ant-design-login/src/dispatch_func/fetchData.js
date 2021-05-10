import postUrl from '../request/postUrl';
import { message } from 'antd';
import * as types from '../store/constants';

export default function fetchPostData(dispatch, values, props) {
  return () => {
    // 表单验证，添加接口即可

    const { password, username } = values;
    const data = {
      userName: username,
      password,
    };
    try {
      dispatch({
        type: types.LOGIN,
        payload: postUrl('system/login', data).then(
          (res) => {
            if (res.result === 'success') {
              window.localStorage.setItem('token', res.message.token);
              props.history.push('/home');
              message.success('登录成功');
              return Promise.resolve(res);
            }
            message.error(res.code);
            return Promise.reject(res.code);
          },
          () => {
            message.error('网络错误');
          },
        ),
      });
    } catch (error) {
      dispatch({ type: 'LOGIN_REJECTED', errMes: '错误' });
    }
  };
}
