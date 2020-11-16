import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import UserRecipes from './pages/UserRecipes';

// Redux stuff
import {Provider} from 'react-redux';
import store from './redux/store';

import './App.css';


function App() {
  return (

    <Provider store = {store}>
    <BrowserRouter>
    <Switch>
      <Route exact path = "/" component = {Home}></Route>
      <Route exact path = "/add-recipe" component = {UserRecipes}></Route>
    </Switch>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
