const {USER_LOADING, USER_LOADED, AUTH_TOKEN_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT_SUCCESS} = require('../actions/types');

const initialState = {
    token : localStorage.getItem("token"),
    isAuthenticated : null,
    isLoading : false,
    user : null
}


export default function(state = initialState, action){

    switch(action.type){

        case USER_LOADING:
            return {
                ...state,
                isLoading : true
            }

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated : true,
                isLoading : false,
                user : action.payload.user
            }

        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token)

            return {
                ...state,
                ...action.payload,
                isAuthenticated : true,
                isLoading : false
            }

        case REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.token)

            return {
                ...state,
                ...action.payload,
                isAuthenticated : false,
                isLoading : false
            }

        case LOGIN_FAIL:
        case AUTH_TOKEN_ERROR:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem("token");
            return {
                ...state,
                token : null,
                user : null,
                isAuthenticated : false,
                isLoading : false

            }

        default:
            return state
    }
}