import { SIGNUP_FAIL, SIGNUP_SUCCESS, USER_LOADED, USER_LOADING } from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    user: null
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

        case SIGNUP_SUCCESS:
            console.log(`SIGNUP SUCCESS __________________-------`)
            console.log(payload, payload.token)
            localStorage.setItem("token", payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                user: payload,
                loading: false
            }

        case SIGNUP_FAIL:
            console.log(`SIGNUP FAIL __________________-------`)

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

