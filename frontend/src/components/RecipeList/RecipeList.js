import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteRecipe} from '../../redux/actions/recipeActions';
import Loader from "react-loader-spinner";
import './RecipeList.css';


const RecipeList = (props) => {

    const dispatch = useDispatch();

    const handleDeleteRecipe = (id) => {
        const yes = window.confirm("Are you sure you want to delete this recipe ?")
        if(yes){
            dispatch(deleteRecipe(id))
        }
        
    }


    return(
        <>
        <section className = "recipe-list my-5">
            <div className = "container">
                <div className = "row">

                { props.recipe.loading ? <div className = "center"><Loader type="Circles" color="#00BFFF" height={120} width={120} style={ {margin:"auto"} }/> </div>: 

            props.recipe.recipes.length === 0 ? <p>No Recipes, Create one to Get started.</p> : 
                                
                props.recipe.recipes.map( (recipe, _id) => (
                        <div className = "col-lg-4 my-2" key = {_id}>
                            <div className = "card">
                                <div className = "card-body">
                                    <div className = "card-title d-flex justify-content-between">
                                        <div><h5>{recipe.name}</h5></div>
                                    {
                                        props.delete ? <div>
                                        <span onClick = {() => handleDeleteRecipe(recipe._id)} className = "bx bx-trash"></span>
                                    </div> : ""
                                    }
                                    
                                    </div>
                                    <p className = "details"><i className = "bx bx-time"></i> {new Date().toDateString()}    <i className = "bx bx-user"></i><strong>{props.creator || recipe.creator.username}</strong></p>
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

export default RecipeList;