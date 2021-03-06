import React from 'react';
import CreateRecipe from '../components/CreateRecipe/CreateRecipe';
import RecipeList from '../components/RecipeList/RecipeList';
import Navbar from '../components/Navbar/Navbar';
import {getUserRecipes} from '../redux/actions/recipeActions';
import {useSelector, useDispatch} from 'react-redux';

const UserRecipes = () => {

    const recipe = useSelector(state => state.recipe);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch()
    
    React.useEffect( () => {
        dispatch(getUserRecipes());
    }, [dispatch])

    return(
        <>
        <Navbar></Navbar>
        <CreateRecipe></CreateRecipe>
        <RecipeList recipe = {recipe} creator = {auth.user.username} delete={true}>
        </RecipeList>
        </>
    )
}

export default UserRecipes;