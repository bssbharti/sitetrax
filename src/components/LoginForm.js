import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/authActions';
import { browserHistory } from 'react-router';
import axios from 'axios';

class LoginForm extends React.Component {

  state = {
    error: false,
    loading: false
  }

  handleLogin(e){
    console.log("clicked");
    if(this.refs.loginForm.checkValidity()){
      e.preventDefault();
      this.setState({
        loading: true,
      })

      this.props.dispatch(actions.receiveLoginStatus(true))
      let {email, password} = this.refs

      console.log(this.props.loggedIn);
      let _this = this

      axios.post('https://dev1.sitetrax.io/server/public/api/auth/login', {
        email: email.value,
        password: password.value
      }) .then(function (response) {
        //console.log(response.data.token);
        localStorage.setItem('user_token', response.data.token);
        browserHistory.push('/dashboard');
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
        <h4 className="form-heading">SIGN IN</h4>
        { this.state.error ? <p className="bg-danger">Wrong email or password.</p> : "" }
        <input type="email" placeholder="Email" ref="email" required />
        <input type="password" placeholder="Password" ref="password" required />
        <button onClick={this.handleLogin.bind(this)} className={ this.state.loading === false ? "btn" : "btn disabled"}>{ this.state.loading === false ? "login" : "loading.."}</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(LoginForm);
