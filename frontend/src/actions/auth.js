import axios from 'axios'

import { LOGIN_FAIL, LOGIN_SUCCESS, USER_LOADED, USER_LOADING } from './types'

export const login = ({ email, password }) => {
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
        dispatchEvent({
            action: LOGIN_SUCCESS,
            payload: res.data
        })
    }).catch(err => {
        dispatchEvent({
            type: LOGIN_FAIL
        })
    })
}