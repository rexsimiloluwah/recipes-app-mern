import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import "../components/Auth/auth.css";
import {useSelector, useDispatch} from 'react-redux';
import {registerUser} from '../redux/actions/authActions';
import {clearErrors} from '../redux/actions/errorActions';
import {Link} from 'react-router-dom';

const RegisterPage = () => {

    const dispatch = useDispatch()

    React.useEffect( () => {
        dispatch(clearErrors())
    }, [dispatch])

    const auth = useSelector(state => state.auth);
    const error = useSelector(state => state.error);


    const handleRegister = (formData) => {
        alert(JSON.stringify(formData))

        dispatch(registerUser(formData))
    }
    return(
    <section className = "auth__container">

    {error.id === "REGISTER_FAIL" ?

    <div className="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>ERROR :-</strong> {error.message.message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    </div> : ""
    }

    {auth.user !== null && error.id !== "REGISTER_FAIL" ?

        <div className="alert alert-success alert-dismissible fade show" role="alert">
        <strong>SUCCESS :-</strong> Registration successful, Please login below.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div> : ""
    }
    

        <RegisterForm handleRegister = {handleRegister}></RegisterForm>

        <Link to = "/login"><p className = "text-gray text-center my-3">Already have an Account, Login →</p></Link>
    </section>
        
    )
}

export default RegisterPage;