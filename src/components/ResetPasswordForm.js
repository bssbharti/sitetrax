import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/authActions';
import { browserHistory } from 'react-router';
import axios from 'axios';

class ResetPasswordForm extends React.Component {

  state = {
    error: false,
    loading: false
  }

  getParameterByName(name, url) {
      if (!url) {
        url = window.location.href;
      }
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  handleLogin(e){
    console.log("clicked");

    if(this.refs.loginForm.checkValidity()){
      e.preventDefault();
      this.setState({
        loading: true,
      })

      // this.props.location.query.token

      let token = this.getParameterByName("token");
      let email = this.getParameterByName("email")

      let { password, confirm_password } = this.refs

      let _this = this

      axios.post('https://dev1.sitetrax.io/server/public/api/auth/reset', {
        email: email,
        password: password.value,
        password_confirmation: confirm_password.value,
        token: token
      }) .then(function (response) {
        // console.log(response.data.token);
        localStorage.setItem('user_token', response.data);
        browserHistory.push('/');
      }) .catch(function (error) {
        console.log(error);
        _this.setState({
          error: true,
          loading: false
        })
      });
    }
  }

  render() {
    return (
      <form className="login-form" ref="loginForm">
        <h4 className="form-heading">Reset Password</h4>
        <input type="password" placeholder="Password" ref="password" required />
        <input type="password" placeholder="Confirm Password" ref="confirm_password" required />
        <button onClick={this.handleLogin.bind(this)} className={ this.state.loading === false ? "btn" : "btn disabled"}>{ this.state.loading === false ? "Reset Password" : "loading.."}</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ResetPasswordForm);
