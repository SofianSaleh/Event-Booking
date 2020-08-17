import axios from "axios";

import {
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS
} from "./types";

export const signUp = ({ username, email, password }) => dispatch => {
  //  this config obj has the headers we have to specifiy them for the backend to understand
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = {
    query: `
        mutation {
            createUser(userInput: {username:"${username}", email:"${email}", password:"${password}"}){
                userId
                username
                email
                token 
                tokenExpiration
            }
        }
        `
  };
  axios
    .post(`http://localhost:8000/graphql`, body, config)
    .then(res => {
      console.log(res.data.data);
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data.data.createUser
      });
    })
    .catch(err => {
      alert(`ERRRRRRROR`);
      console.log(err);
      dispatch({
        type: SIGNUP_FAIL
      });
    });
};

export const login = ({ email, password }) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = {
    query: `
        query {
            login( email:"${email}", password:"${password}" ){
                userId
                username
                email
                token 
                tokenExpiration
            }
        }
        `
  };
  axios
    .post(`http://localhost:8000/graphql`, body, config)
    .then(res => {
      console.log(res.data.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.data.login
      });
    })
    .catch(err => {
      alert(`ERRRRRRROR`);
      console.log(err);
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS
  });
};
