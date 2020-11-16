//Root reducer (This will be used to combine all reducers in the application)
import {combineReducers} from 'redux';
import recipeReducer from './recipeReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    recipe : recipeReducer,
    error : errorReducer,
    auth : authReducer
})


