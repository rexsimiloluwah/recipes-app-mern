import React,{useState, useEffect} from 'react';
import {v4 as uuid} from 'uuid'
import {connect} from 'react-redux';
import {getRecipes, deleteRecipe} from '../../redux/actions/recipeActions';
import PropTypes from 'prop-types';
import {CircleLoading} from 'react-loadingg';
import './RecipeList.css';

const RecipeList = (props) => {
    
    const {getRecipes} = props;
    
    useEffect( () => {
        getRecipes();
    }, [getRecipes])

    const handleDeleteRecipe = (id) => {
        props.deleteRecipe(id)
    }

    const {recipes, loading} = props.recipe;


    return(
        <>
        <section className = "recipe-list my-5">
            <div className = "container">
                <div className = "row">

                { loading ? <CircleLoading></CircleLoading> : 

            recipes.length === 0 ? <p>No Recipes, Create one to Get started.</p> : 
                                
                recipes.map( (recipe, _id) => (
                        <div className = "col-lg-4 my-2" key = {_id}>
                            <div className = "card">
                                <div className = "card-body">
                                    <div className = "card-title d-flex justify-content-between">
                                        <div><h5>{recipe.name}</h5></div>
                                        <div>
                                            <span onClick = {() => handleDeleteRecipe(recipe._id)} className = "bx bx-trash"></span>
                                        </div>
                                    </div>
                                    <p className = "details"><i className = "bx bx-time"></i> {new Date().toDateString()}    <i className = "bx bx-user"></i> Similoluwa Okunowo</p>
                                    <div className = "card-text">{recipe.description}</div>

                                    <div className = "tags d-inline">
                                        <ul>
                                        <i className = "bx bx-purchase-tag"></i>
                                        { recipe.tags.map( (tag, _id) => (
                                            
                                            <li key = {_id}>
                                                {tag}
                                            </li>
                                        ))}
                                        </ul>
                                        
                                    </div>  

                                    <button className = "btn btn-success">Read more <i className = "bx bx-link-external"></i> </button>

                                    
                                </div>


                            </div>
                        </div>
                ))
                }
                
                </div>
            </div>
        </section>
        </>
    )
}

//PropTypes
RecipeList.propTypes = {
    getRecipes : PropTypes.func.isRequired,
    recipe : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    recipe : state.recipe
}
)

export default connect(mapStateToProps, {getRecipes, deleteRecipe})(RecipeList);