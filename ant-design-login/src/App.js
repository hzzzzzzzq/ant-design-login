import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Tabs, Form, Input, Button, Checkbox, Row, Col, Spin, message } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
  GithubOutlined,
  CopyrightOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
// import fetchPostData from './dispatch_func/fetchData';
// import fetchVerificationCode from './dispatch_func/verificationData';
import * as createActions from './store/createAction';
import postUrl from './request/postUrl';
import checkLogin from './authentication/checkIsLogin';

class App extends Component {
  fromRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      tips: '获取验证码',
      time: 60,
    };
  }

  handleWithVerifyMobile = (rule, val, callback) => {
    // 验证手机号
    if (!val) {
      callback();
    }
    const myReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    const validateResult = myReg.test(val); // 自定义规则
    if (!validateResult) {
      callback('不合法的手机号!');
      return;
    }
    callback();
  };

  handleWithVerifyCode = (rule, val, callback) => {
    // 验证验证码
    if (!val) {
      callback();
    }
    const myReg = /^[0-9]{6}$/;
    const validateResult = myReg.test(val);
    if (!validateResult) {
      callback('验证码为六位数！');
      return;
    }
    callback();
  };

  handleWithVerificationCode = async () => {
    await this.fromRef.current.validateFields(['mobile']).then((mobile) => {
      this.props.fetchVerificationCode(mobile);
    });
    let ti = 60;
    const timer = setInterval(() => {
      if (ti > 0) {
        ti -= 1;
        this.setState({
          time: ti,
          tips: `${ti} 秒后重新获取`,
          disabled: true,
        });
      } else {
        clearInterval(timer);
        this.setState({
          tips: '获取验证码',
          disabled: false,
        });
      }
    }, 1000);
  };

  render() {
    const { loginMethod } = this.props;
    const menu = (
      <Menu
        onClick={(flag) => {
          if (this.props.selectLanguage) {
            this.props.selectLanguage(flag);
          }
        }}
      >
        <Menu.Item key="1">🇺🇸 English</Menu.Item>
        <Menu.Item key="2">🇮🇩 Bahasa Indonesia</Menu.Item>
        <Menu.Item key="3">🇧🇷 Português</Menu.Item>
        <Menu.Item key="4">🇯🇵 日本語</Menu.Item>
        <Menu.Item key="5">🇨🇳 简体中文</Menu.Item>
        <Menu.Item key="6">🇭🇰 繁体中文</Menu.Item>
      </Menu>
    );
    const { TabPane } = Tabs;

    const onFinish = (values) => {
      this.props.fetchData(values, this.props);
    };

    const antIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;

    return (
      <div>
        {/* todo，loading代码 */}
        {this.props.isLoading && (
          <div
            style={{
              height: '100vh',
              width: '100vw',
              margin: '0 auto',
              textAlign: 'center',
              position: 'fixed',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Spin tips="Loading" indicator={antIcon} />
          </div>
        )}
        <div className="app">
          <div
            style={{
              width: '100%',
              height: '40px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Dropdown overlay={menu}>
              <span
                style={{
                  width: '42px',
                  height: '42px',
                  padding: '12px',
                  marginRight: '24px',
                }}
              >
                <svg viewBox="0 0 24 24" focusable="false" width="18px" height="18px">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "></path>
                </svg>
              </span>
            </Dropdown>
          </div>
          <div
            style={{
              flex: '1',
              height: '100%',
              margin: '0 auto',
              width: '328px',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  paddingTop: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <img
                  src="https://preview.pro.ant.design/static/logo.f0355d39.svg"
                  alt="/"
                  style={{
                    width: '44px',
                    height: '44px',
                    marginRight: '16px',
                    padding: '0px',
                  }}
                ></img>
                <span className="title-span">Ant Design</span>
              </div>
              <div
                style={{
                  margin: '12px 0px 40px 0px',
                  color: 'rgba(0, 0, 0, 0.45)',
                }}
              >
                Ant Design 是西湖区最具影响力的 Web 设计规范
              </div>
            </div>
            <Form
              ref={this.fromRef}
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Tabs
                defaultActiveKey="1"
                centered
                onChange={(e) => {
                  this.props.changeLoginMethod(e);
                }}
              >
                <TabPane tab="账号密码登录" key="1">
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: loginMethod === '1',
                        message: '用户名是必填项!',
                      },
                    ]}
                  >
                    <Input
                      allowClear
                      size="large"
                      prefix={
                        <UserOutlined
                          className="site-form-item-icon"
                          style={{ color: '#1890ff' }}
                        />
                      }
                      placeholder="用户名：admin or user"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: loginMethod === '1',
                        message: '密码是必填项!',
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      prefix={
                        <LockOutlined
                          className="site-form-item-icon"
                          style={{ color: '#1890ff' }}
                        />
                      }
                      type="password"
                      placeholder="密码：ant.design"
                    />
                  </Form.Item>
                </TabPane>
                <TabPane tab="手机号登录" key="2">
                  <Form.Item
                    name="mobile"
                    rules={[
                      {
                        required: loginMethod === '2',
                        message: '手机号是必填项!',
                      },
                      {
                        // validator: this.handleWithVerifyMobile,
                        // message: '不合法的手机号!',
                      },
                    ]}
                  >
                    <Input
                      allowClear
                      size="large"
                      prefix={
                        <MobileOutlined
                          className="site-form-item-icon"
                          style={{ color: '#1890ff' }}
                        />
                      }
                      placeholder="请输入手机号!"
                    />
                  </Form.Item>
                  <Row style={{ width: '100%' }}>
                    <Col flex="2 1" style={{ margin: '0px 8px 0px 0px' }}>
                      <Form.Item
                        name="Verification"
                        rules={[
                          {
                            required: loginMethod === '2',
                            message: '验证码是必填项!',
                          },
                          {
                            validator: this.handleWithVerifyCode,
                            message: '验证码是六位数！',
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          prefix={
                            <MailOutlined
                              className="site-form-item-icon"
                              style={{ color: '#1890ff' }}
                            />
                          }
                          placeholder="请输入验证码!"
                        ></Input>
                      </Form.Item>
                    </Col>
                    <Col flex="1 2" style={{ float: 'right', marginBottom: '24px' }}>
                      <Button
                        disabled={this.state.disabled}
                        size="large"
                        onClick={() =>
                          this
                            .handleWithVerificationCode
                            // this.fromRef.current.getFieldValue('mobile'),
                            ()
                        }
                      >
                        {this.state.tips}
                      </Button>
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
              <div>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>自动登录</Checkbox>
                  </Form.Item>
                  <a className="login-form-forgot" style={{ float: 'right' }} href="/">
                    忘记密码 ？
                  </a>
                </Form.Item>
              </div>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ width: '100%' }}
                  size="large"
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
            <div className="other-way-login">
              其他登录方式:
              <AlipayCircleOutlined />
              <TaobaoCircleOutlined />
              <WeiboCircleOutlined />
            </div>
          </div>
          <div className="footer">
            <div
              className="footer-top"
              style={{ color: 'rgba(0, 0, 0, 0.45)', marginBottom: '8px' }}
            >
              <a
                title="Ant Design Pro"
                target="_blank"
                href="https://pro.ant.design/index-cn"
                rel="noreferrer"
              >
                Ant Design Pro
              </a>
              <a
                title="github"
                target="_blank"
                href="https://github.com/ant-design/ant-design-pro"
                rel="noreferrer"
              >
                <GithubOutlined />
              </a>
              <a
                title="Ant Desgin"
                target="_blank"
                href="https://ant.design/index-cn"
                rel="noreferrer"
              >
                Ant Design
              </a>
            </div>
            <div className="footer-bottom">
              Copyright&nbsp;
              <CopyrightOutlined /> 2019 蚂蚁金服体验技术部出品
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  disabled: PropTypes.bool,
  history: PropTypes.object,
  dispatch: PropTypes.func,
  tips: PropTypes.string,
  loginMethod: PropTypes.string,
  selectLanguage: PropTypes.func,
  timerContinue: PropTypes.func,
  timerOver: PropTypes.func,
  changeLoginMethod: PropTypes.func,
  fetchData: PropTypes.func,
  values: PropTypes.object,
  isLoading: PropTypes.bool,
  result: PropTypes.object,
  errMes: PropTypes.string,
  fetchVerificationCode: PropTypes.func,
  getFormMobile: PropTypes.func,
  mobile: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    loginMethod: state.loginMethod,
    visible: state.visible,
    tips: state.tips,
    disabled: state.disabled,
    values: state.values,
    fetchPostData: state.fetchPostData,
    isLoading: state.isLoading,
    result: state.result,
    errMes: state.errMes,
    mobile: state.mobile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLoginMethod: (flag) => {
      dispatch(createActions.changeLoginMethodAction(flag));
    },
    selectLanguage: (flag) => {
      dispatch(createActions.selectLanguageAction(flag));
    },
    fetchData: (values, props) => {
      const { username, password, mobile, Verification } = values;
      const data =
        props.loginMethod === '1'
          ? {
              userName: username,
              password,
            }
          : {
              userName: mobile,
              password: Verification,
            };
      dispatch(createActions.fetchDataAction(postUrl('system/login', data)))
        .then(
          (res) => {
            if (res.value.result === 'success') {
              window.localStorage.setItem('token', res.value.message.token);
              props.history.replace('/home');
              message.success('登录成功');
              return Promise.resolve(res);
            }
            message.error(res.value.code);
            return Promise.reject(res.value.code);
          },
          () => {
            message.error('网络错误');
          },
        )
        .catch((err) => message.error(err));
    },
    fetchVerificationCode: () => {
      // value
      dispatch(
        createActions.fetchVerificationCodeAction(
          postUrl('system/login', { userName: 'lyc', password: '123456' }),
        ),
      ).then((res) => {
        if (res.value.result === 'success') {
          return Promise.resolve(res);
        }
        message.error(res.value.code);
        return Promise.reject(res.value.code);
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(checkLogin(App));
