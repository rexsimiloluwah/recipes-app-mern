import React from 'react';
import RecipeList from '../components/RecipeList/RecipeList';
import Navbar from '../components/Navbar/Navbar';
import {getAllRecipes} from '../redux/actions/recipeActions';
import {useSelector, useDispatch} from 'react-redux';

const UserRecipes = () => {

    const recipe = useSelector(state => state.recipe);
    const dispatch = useDispatch()

    React.useEffect( () => {
        dispatch(getAllRecipes());
    }, [dispatch])

    return(
        <>
        <Navbar></Navbar>
        <h4 className = "display-5 text-center my-4">All Recipes</h4>
        <RecipeList recipe = {recipe}></RecipeList>
        </>
    )
}

export default UserRecipes;