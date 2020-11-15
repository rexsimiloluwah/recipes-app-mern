// This is the reducer for managing recipes state. It includes an action that takes in the previous state and determines the next state. 
// A reducer also determines changes in the application state for the recipe data 
import {v4 as uuid} from 'uuid'
import {GET_RECIPES, ADD_RECIPE, DELETE_RECIPE, RECIPES_LOADING, UPDATE_RECIPES} from '../actions/types';

const initialState = {
    recipes : [
        
    ],
    loading : false
}

// REDUCER FUNCTION 
export default function reducers(state = initialState, action){

    switch(action.type){
        case GET_RECIPES:
            return {
                ...state,
                recipes : action.payload,
                loading : false
            }

        case DELETE_RECIPE:
            return {
                ...state,
                recipes : state.recipes.filter( recipe => recipe._id !== action.payload)
            }

        case ADD_RECIPE:
            return {
                ...state,
                recipes : [action.payload, ...state.recipes]
            }

        case RECIPES_LOADING:
            return {
                ...state,
                loading : true
            }

        default:
            return state;
    }
}