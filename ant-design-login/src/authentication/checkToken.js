import React from 'react';
import { Redirect } from 'react-router-dom';

export default (WrapperComponent) => {
  return (props) => {
    if (window.localStorage.getItem('token')) {
      return <WrapperComponent {...props} />;
    } 
      return <Redirect from="/home" to="/login" exact />;
    
  };
};
