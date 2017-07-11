import React, { PropTypes as T } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, browserHistory} from 'react-router';
import '../styles/styles.scss';
import '../styles/dashboard.scss';
import * as apiActions from '../actions/apiActions';
import * as authActions from '../actions/authActions';
import WhatContainer from '../components/WhatContainer';
import HowContainer from '../components/HowContainer';
import WhereContainer from '../components/WhereContainer';
import axios from 'axios';
import _ from 'lodash';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      token: localStorage.getItem("user_token"),
      loading: false,
      error: false
    };
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("user_token");
  }

  componentWillMount(){
    axios.get("https://dev1.sitetrax.io/server/public/api/auth/user-info")
    .then((response)=>{
      this.setState({
        user: response.data.user
      })
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  saveProfile(e){
    console.log("clicked");
    if(this.refs.profileForm.checkValidity()){
      e.preventDefault();
      this.setState({
        loading: true,
      })

      let {name, company} = this.refs

      let _this = this

      axios.post('https://dev1.sitetrax.io/server/public/api/auth/user-info', {
          name: name.value,
          company: company.value,
        }) .then(function (response) {
        _this.setState({
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

  onLogout(){
    authActions.receiveLoginStatus(false);
    localStorage.setItem("user_token", "");
    browserHistory.push('/');
  }

  onDashboard(){
    browserHistory.push('/dashboard');
  }

  onChangeName(e){
    let { user } = this.state
    user.name = e.target.value
    this.setState({
      user: user
    })
  }

  onChangeCompany(e){
    let { user } = this.state
    user.company = e.target.value
    this.setState({
      user: user
    })
  }


  render() {
    return (
      <div className="dashboard-page">
        <div className="sidebar">
          <div className="sidebar-icon-wrapper container-fluid" onClick={this.onDashboard}>
            <i className="fa fa-dashboard sidebar-icon" aria-hidden="true"></i>
            <p className="sidebar-icon-label">Dashboard</p>
          </div>
          <div className="sidebar-icon-wrapper container-fluid" onClick={this.onProfile}>
            <div className="sidebar-profile-image sidebar-icon-image" style={{
              backgroundImage: `url(${"https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"})`
            }} />
            <p className="sidebar-icon-label">{this.state.user.name}</p>
          </div>
          <div className="sidebar-icon-wrapper container-fluid" onClick={this.onLogout}>
            <i className="fa fa-power-off sidebar-icon" aria-hidden="true"></i>
            <p className="sidebar-icon-label">Logout</p>
          </div>
        </div>
        <div className="main-container container-fluid col-xs-11">

          <h2>Profile</h2>

          <div className="col-md-offset-3 col-md-6">

            <form className="form-horizontal" ref="profileForm">
              <div className="form-group">
                <label htmlFor="inputEmail3" className="col-sm-4 control-label">Name</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" placeholder="Name" value={this.state.user.name} onChange={this.onChangeName.bind(this)} ref="name" required />
                  <br/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword3" className="col-sm-4 control-label">Company Name</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" placeholder="Company Name" value={this.state.user.company} onChange={this.onChangeCompany.bind(this)} ref="company" required />
                  <br/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-4 col-sm-8 pull-right">
                  <br/>
                  <button onClick={this.saveProfile.bind(this)} className={ this.state.loading === false ? "btn btn-lg" : "btn btn-lg disabled"}>{ this.state.loading === false ? "Save" : "loading.."}</button>
                </div>
              </div>
            </form>

          </div>

        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
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
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
