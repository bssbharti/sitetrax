import * as types from '../constants/actionTypes';
import { browserHistory } from 'react-router';
import axios from 'axios';

const http = axios.create({
  baseURL: 'http://office.netarus.com:8888',
  // baseURL: 'https://jsonplaceholder.typicode.com/posts',
});

export function receiveLoginStatus(loggedIn) {
  return {
    type: types.RECEIVE_LOGIN_STATUS,
    loggedIn: loggedIn,
  };
}
