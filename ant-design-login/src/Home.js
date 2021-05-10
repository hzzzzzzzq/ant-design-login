import React, { Component } from 'react';
import PropTypes from 'prop-types';
import checkToken from './authentication/checkToken';

class Home extends Component {
  render() {
    const HomeComponent = () => (
      <div
        style={{
          width: '400px',
          height: '200px',
          margin: '0 auto',
          backgroundColor: 'red',
          textAlign: 'center',
        }}
      >
        <h2>Home</h2>
        <button
          onClick={() => {
            this.props.history.push('/login');
            window.localStorage.clear();
          }}
          style={{
            backgroundColor: '#1890ff',
            color: 'rgba(0, 0, 0, 0.85)',
            width: '100px',
            height: '40px',
            borderRadius: '4px',
          }}
        >
          退出登录
        </button>
      </div>
    );
    return <HomeComponent />;
  }
}
Home.propTypes = {
  history: PropTypes.object,
};
export default checkToken(Home);
