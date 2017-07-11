import React, { PropTypes as T } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, browserHistory} from 'react-router';
import '../styles/styles.scss';
import '../styles/loginSystem.css';
import logo from '../assets/logo.png';
import * as apiActions from '../actions/apiActions';
import ResetPasswordForm from '../components/ResetPasswordForm';
import _ from 'lodash';

class ResetPasswordPage extends React.Component {
  render() {
    return (
      <div className='home container'>
        <div className='header row'>
          <img src={logo} height="45" />
        </div>
        <div className='home-body row'>
          <div className='form-box col-md-offset-4 col-md-4' style={{float:'none', margin: '0 auto'}}>
            <div className="login-page">
              <div className="form">
                <ResetPasswordForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
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
)(ResetPasswordPage);
