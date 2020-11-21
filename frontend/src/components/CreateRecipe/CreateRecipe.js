import React, {useState} from 'react';
import CreateRecipeFormModal from '../Modal/CreateRecipeFormModal';
import {connect} from 'react-redux';
import {addRecipe} from '../../redux/actions/recipeActions';

import './CreateRecipe.css';
import '../../App.css';


const CreateRecipe = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    const handleSubmit = (data) => {
        props.addRecipe(data)
        console.log(data)
        toggleModal()
    }

    return(
        <>
        <section className = "create-recipe py-5">
            <div className = "kite"></div>
            <div className = "container d-flex justify-content-center align-items-center flex-column text-center">
                <div className = "header-text">
                    <h2 className = "my-3">Create a New Recipe</h2>
                    <p>Share your procedure for creating that delicious dish, Let's jaiye !</p>

                    <button className = "btn btn-success" onClick = {toggleModal}>Create a Recipe <i className = "bx bx-plus"></i></button>
                </div>
            </div>

            
        </section>
        
        <CreateRecipeFormModal isOpen = {isOpen} toggleModal = {toggleModal} handleSubmit = {handleSubmit}></CreateRecipeFormModal>
        </>

        
    );
}

const mapStateToProps = (state) => ({
    recipe : state.recipe
}
)

export default connect(mapStateToProps, {addRecipe})(CreateRecipe);

