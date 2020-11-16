import React from 'react';
import CreateRecipe from '../components/CreateRecipe/CreateRecipe';
import RecipeList from '../components/RecipeList/RecipeList';
import Navbar from '../components/Navbar/Navbar';

const UserRecipes = () => {

    return(
        <>
        <Navbar></Navbar>
        <CreateRecipe></CreateRecipe>
        <RecipeList></RecipeList>
        </>
    )
}

export default UserRecipes;