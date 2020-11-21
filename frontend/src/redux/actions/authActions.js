import axios from 'axios';
import {returnErrors} from './errorActions';

const {
    USER_LOADING,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    AUTH_TOKEN_ERROR
} = require('./types');

export const logoutUser = () => (dispatch) => {
    dispatch({
        type : LOGOUT_SUCCESS
    })
}

export const loadUser = () => (dispatch, getState) => {

    dispatch({
        type : USER_LOADING
    })

    axios.get("/api/auth/users", tokenConfig(getState))
    .then( (res) => {
        dispatch({
            type : USER_LOADED,
            payload : res.data
        })
    })
    .catch( err => {
        console.error(err)
        dispatch(returnErrors(err.response.message, err.response.status))
        dispatch({
            type : AUTH_TOKEN_ERROR
        })
    })


}

export const registerUser = (formData) => dispatch => {

    dispatch({
        type : USER_LOADING
    })

    const config = {
        headers : {
            "Content-type" : "application/json"
        }
    }

    const body = JSON.stringify(formData)

    axios.post("/api/users", body, config)
    .then( res => {
        dispatch({
            type : REGISTER_SUCCESS,
            payload : res.data
        })
    })
    .catch( err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
        dispatch({
            type : REGISTER_FAIL
        })
    })
}

export const loginUser = (formData) => dispatch => {
    dispatch({
        type : USER_LOADING
    })

    const config = {
        headers : {
            "Content-type" : "application/json"
        }
    }

    const body = JSON.stringify(formData)

    axios.post("/api/auth/login", body, config)
    .then( res => {
        dispatch({
            type : LOGIN_SUCCESS,
            payload : res.data
        })
    })
    .catch( err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
        dispatch({
            type : LOGIN_FAIL
        })
    })
}

export const tokenConfig = getState => {

    //Get token from local storage
    const token = getState().auth.token;

    const config = {
        headers : {
            "Content-type" : "application/json"
        }
    }

    if(token){
        config.headers["x-auth-token"] = token
    }

    return config;
}