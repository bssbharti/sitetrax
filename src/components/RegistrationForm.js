import React from 'react';
import axios from 'axios';
import * as actions from '../actions/authActions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class RegistrationForm extends React.Component {

  state = {
    error: false,
    loading: false
  }

  handleRegistration(e){
    console.log("clicked");
    if(this.refs.registerForm.checkValidity()){
      e.preventDefault();
      this.setState({
        loading: true,
      })

      // this.props.dispatch(actions.receiveLoginStatus(true))
      let {name, company, email, password} = this.refs

      let _this = this

      console.log(name.value, company.value, email.value, password.value);

      axios.post('https://dev1.sitetrax.io/server/public/api/auth/signup', {
        name: name.value,
        company: company.value,
        email: email.value,
        password: password.value
      }) .then(function (response) {
        localStorage.setItem('user_token', response.data.token);
        _this.props.dispatch(actions.receiveLoginStatus(true))
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
      <form className="register-form" ref="registerForm">
        <h4 className="form-heading">SIGN UP</h4>
        <input type="text" placeholder="Name" ref="name" required />
        <input type="text" placeholder="Company name" ref="company" required />
        { this.state.error ? <p className="bg-danger">User with email already exists.</p> : "" }
        <input type="email" placeholder="Email address" ref="email" required />
        <input type="password" pattern=".{6,}" title="Minimum length of password is 6 characters" placeholder="Password" ref="password" required />
        <button onClick={this.handleRegistration.bind(this)} className={ this.state.loading === false ? "btn" : "btn disabled"}>{ this.state.loading === false ? "Create" : "loading.."}</button>
      </form>
    );
  }

}
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(RegistrationForm);
