import axios from 'axios'

import { LOGIN_FAIL, LOGIN_SUCCESS, USER_LOADED, USER_LOADING } from './types'

export const login = ({ email, password }) => dispatch => {
    //  this config obj has the headers we have to specifiy them for the backend to understand
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = {
        query: `
        mutation {
            createUser(userInput: {email:"${email}", password:"${password}"}){
                _id
                username
                token
            }
        }
        `
    }
    axios.post(`http://localhost:8000/graphql`, body, config).then(res => {
        dispatch({
            action: LOGIN_SUCCESS,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: LOGIN_FAIL
        })
    })
}