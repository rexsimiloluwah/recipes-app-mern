//Root reducer (This will be used to combine all reducers in the application)
import {combineReducers} from 'redux';
import recipeReducer from './recipeReducer';

export default combineReducers({
    recipe : recipeReducer
})


