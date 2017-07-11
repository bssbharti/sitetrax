import React, { PropTypes as T } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, browserHistory} from 'react-router';
import '../styles/styles.scss';
import '../styles/loginSystem.css';
import * as apiActions from '../actions/apiActions';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import ForgetPasswordForm from '../components/ForgetPasswordForm';

import HomeCarousel from '../components/HomeCarousel';

import _ from 'lodash';

class HomePage extends React.Component {

  state = {
    signin: true,
    forgetPassword: false,
    formType: 0
  }

  changeForm(type){
    let formType = this.state.formType
    this.setState({
      formType: type
    })
  }

  render() {

    let formElement, messageBox;
    let formType = this.state.formType

    if (formType === 0) {
      formElement = <LoginForm />
      messageBox = (
        <div className="message-box">
          <p className="message pull-left">
            <a href="#" onClick={() => this.changeForm(1)}>Create an account?</a>
          </p>
          <p className="message pull-right">
            <a href="#" onClick={() => this.changeForm(2)}>Forget Password?</a>
          </p>
       </div>
      )

    }else if (formType === 1) {
      formElement = <RegistrationForm />
      messageBox = (
        <div className="message-box">
          <p className="message pull-left">
            <a href="#" onClick={() => this.changeForm(0)}>Already registered? Sign In</a>
          </p>
          <p className="message pull-right">
            <a href="#" onClick={() => this.changeForm(2)}>Forget Password?</a>
          </p>
       </div>
      )
    }else {
      formElement = <ForgetPasswordForm />
      messageBox = (
        <div className="message-box">
          <p className="message pull-left">
            <a href="#" onClick={() => this.changeForm(0)}>Already registered? Sign In</a>
          </p>
       </div>
      )
    }


    return (
      <div className='home container'>
        <div className='header row'>
          <img src="../assets/logo.png" height="45" />
        </div>
        <div className='home-body row'>
          <div className='col-md-8'>
            <HomeCarousel />
          </div>
          <div className='form-box col-md-4'>
            <div className="login-page">
              <div className="form">
                {formElement}
                {messageBox}
             </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  apiActions: T.object
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    apiActions: bindActionCreators(apiActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
