import React, {Component} from 'react';
import Modal from 'react-modal';
import CreateRecipeForm from './CreateRecipeForm';
import './Modal.css';

Modal.setAppElement("#root")

class CreateRecipeFormModal extends Component{

    

    render(){
        return(
        <Modal
            isOpen={this.props.isOpen}
            onRequestClose={this.props.toggleModal}
            contentLabel=""
            className="create-recipe-form-modal"
            overlayClassName="modal-overlay"
            closeTimeoutMS={10}
      >
          <span onClick={this.props.toggleModal} className="close-modal"><i className="bx bx-x"></i></span>
          <br></br>
          <hr></hr>


      <CreateRecipeForm onSubmit = {this.props.handleSubmit}></CreateRecipeForm>
         
      </Modal>
        )
    }
}

export default CreateRecipeFormModal;