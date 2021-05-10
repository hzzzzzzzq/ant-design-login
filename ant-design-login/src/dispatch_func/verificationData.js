// import postUrl from '../request/postUrl';
// import * as types from '../reducer/type';
// import { message } from 'antd';

export default function fetchVerificationCode(mobile) {
  return (dispatch) => {
    // const data = {
    //   mobile: mobile,
    // };
    dispatch({ type: 'Send_Verification_Code_Loading' });
    // 使用 Promise-middleware
    //     try {
    //       dispatch({
    //         type: types.Send_Verification_Code,
    //         payload: postUrl('', data).then(
    //           (res) => {
    //
    //             if (res.result === 'success') {
    //               return Promise.resolve(res);
    //             } else {
    //               message.error(res.code);
    //               return Promise.reject(res.code);
    //             }
    //           },
    //           () => {
    //             message.error('网络错误');
    //           },
    //         ),
    //       });
    //     } catch (error) {
    //       dispatch({ type: types.Send_Verification_Code, errMes: '错误' });
    //     }
    //   };

    // 验证码发送接口

    setTimeout(() => {
      dispatch({
        type: 'Send_Verification_Code_Success',
      });
      let ti = 60;
      const timer = setInterval(() => {
        if (ti > 0) {
          ti--;
          dispatch({
            type: 'TimeMessage',
            time: ti,
            tips: `${ti} 秒后重新获取`,
            disabled: true,
          });
        } else {
          clearInterval(timer);
          dispatch({
            type: 'TimeMessage',
            tips: '获取验证码',
            disabled: false,
          });
        }
      }, 1000);
    }, 3000);
  };
}
