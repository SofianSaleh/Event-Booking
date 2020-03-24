import { LOGIN_FAIL, LOGIN_SUCCESS, USER_LOADED, USER_LOADING } from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: false
}
//  the action has { type and payload }

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case USER_LOADING:
            return {
                ...state,
                loading: true
            }

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
                loading: false
            }

        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                user: payload,
                loading: false
            }

        case LOGIN_FAIL:
            localStorage.removeItem("token")
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                loading: false
            }

        default:
            return state
    }
}

