import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import UserRecipes from './pages/UserRecipes';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AllRecipes from './pages/AllRecipes';

// Redux stuff
import {useDispatch} from 'react-redux';
import {loadUser} from './redux/actions/authActions';

import './App.css';

// HOC for Authentication routes
import AuthRoutes from './AuthRoutes';


function App() {

  const dispatch = useDispatch();

  React.useEffect( () => {
    dispatch(loadUser())
  
  }, [dispatch])

  return (

    <BrowserRouter>
    <Switch>
      <Route exact path = "/" component = {Home} type="guest"></Route>
      <Route exact path = "/add-recipe" component = {UserRecipes}></Route>
      <AuthRoutes exact path = "/login" component = {LoginPage} type="guest"></AuthRoutes>
      <Route exact path = "/register" component = {RegisterPage}></Route>
      <Route exact path =  "/view-recipes" component = {AllRecipes}></Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
