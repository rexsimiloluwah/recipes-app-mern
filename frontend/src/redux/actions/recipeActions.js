import {GET_ALL_RECIPES, GET_USER_RECIPES, ADD_RECIPE, DELETE_RECIPE, RECIPES_LOADING} from './types';
import axios from 'axios';
import {tokenConfig} from './authActions';
import {returnErrors} from './errorActions';

// This is the action (They dispatch the reducers)
export const getAllRecipes = () => dispatch => {

    dispatch(setItemsLoading());

    axios.get("/api/recipes")
    .then( res => {

        console.log(res.data)
        dispatch({
            type : GET_ALL_RECIPES,
            payload : res.data["Recipes"]
        })
    })
    .catch(err => {
        console.error(err)
    })

}

// This is the action (They dispatch the reducers)
export const getUserRecipes = () => (dispatch, getState) => {

    dispatch(setItemsLoading());

    axios.get("/api/recipes/user", tokenConfig(getState))
    .then( res => {

        console.log(res.data)
        dispatch({
            type : GET_USER_RECIPES,
            payload : res.data
        })
    })
    .catch(err => {
        console.error(err)
    })

}

export const deleteRecipe = (id) => (dispatch, getState) => { 

    axios.delete(`/api/recipes/${id}`, tokenConfig(getState))
    .then( res => {

        dispatch({
            type : DELETE_RECIPE,
            payload : id
        })
    })
    .catch( err => {
        console.error(err);
        dispatch(returnErrors(err.message, err.status, "DELETE_RECIPE_FAIL"))
    })
}

export const addRecipe = recipe => (dispatch, getState) => {

    axios.post("/api/recipes", recipe, tokenConfig(getState))
    .then( res => {
        dispatch({
            type : ADD_RECIPE,
            payload : res.data
        })
    })
    .catch( err => {
        console.log(err)
        dispatch(returnErrors(err.message, err.status, "ADD_RECIPE_FAIL"))
    })
  
}

export const setItemsLoading = () => {
    return {
        type : RECIPES_LOADING
    }
}