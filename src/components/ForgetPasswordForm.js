import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/authActions';
import { browserHistory } from 'react-router';
import axios from 'axios';

class ForgetPasswordForm extends React.Component {

  state = {
    error: false,
    loading: false,
    success: false
  }

  handleForgetPassword(e){
    console.log("clicked");
    if(this.refs.loginForm.checkValidity()){
      e.preventDefault();
      this.setState({
        loading: true,
      })

      let {email} = this.refs

      let _this = this

      axios.post('https://dev1.sitetrax.io/server/public/api/auth/recovery', {
        email: email.value,
      }) .then(function (response) {
        //console.log(response.data.token);
        // localStorage.setItem('user_token', response.data.token);
        // browserHistory.push('/dashboard');
        _this.setState({
          success: true,
          loading: false
        })
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
        <h4 className="form-heading">Forget Password</h4>
        { this.state.error ? <p className="bg-danger">Email does not exist.</p> : "" }
        { this.state.success ? <p className="bg-success">Check email to reset password</p> : "" }
        <input type="email" placeholder="Email" ref="email" required />
        <button onClick={this.handleForgetPassword.bind(this)} className={ this.state.loading === false ? "btn" : "btn disabled"}>{ this.state.loading === false ? "Send Password" : "loading.."}</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ForgetPasswordForm);
