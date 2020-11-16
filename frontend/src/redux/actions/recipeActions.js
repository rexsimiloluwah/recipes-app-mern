import {GET_RECIPES, ADD_RECIPE, DELETE_RECIPE, UPDATE_RECIPES, RECIPES_LOADING} from './types';
import axios from 'axios';

// This is the action (They dispatch the reducers)
export const getRecipes = () => dispatch => {

    dispatch(setItemsLoading());

    axios.get("/api/recipes")
    .then( res => {

        console.log(res.data)
        dispatch({
            type : GET_RECIPES,
            payload : res.data["Recipes"]
        })
    })
    .catch(err => {
        console.error(err)
    })

}

export const deleteRecipe = (id) => dispatch => { 

    axios.delete(`/api/recipes/${id}`)
    .then( res => {

        dispatch({
            type : DELETE_RECIPE,
            payload : id
        })
    })
    .catch( err => {
        console.error(err);
    })
}

export const addRecipe = recipe => dispatch => {

    axios.post("/api/recipes", recipe)
    .then( res => {
        dispatch({
            type : ADD_RECIPE,
            payload : res.data["data"]
        })
    })
    .catch( err => {
        console.log(err)
    })
  
}

export const setItemsLoading = () => {
    return {
        type : RECIPES_LOADING
    }
}