import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const Home = (props) => {

    return(
        <React.Fragment>
            <Navbar></Navbar>

            <div className="jumbotron container my-5">
                <h1 className="display-4">Naija Recipes</h1>
                <p className="success">This is a simple MERN stack app, using Redux for state management and with support for authentication using JWT.</p>
                <hr className="my-4"></hr>
                <p>LOGIN/REGISTER to create a Recipe ! </p>
                <p className="lead">
                    <button className="btn btn-success btn-lg">Learn more</button>
                </p>
            </div>

        </React.Fragment>
    )
}

export default Home;
