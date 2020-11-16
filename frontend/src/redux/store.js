import {createStore, applyMiddleware, compose} from 'redux';
//Middleware
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {}

const middleware = [reduxThunk]

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;