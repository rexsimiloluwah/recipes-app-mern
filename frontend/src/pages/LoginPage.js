import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import "../components/Auth/auth.css";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from "../redux/actions/authActions";
import {clearErrors} from "../redux/actions/errorActions";

const LoginPage = props => {
    const dispatch = useDispatch()
    
    React.useEffect( () => {
        dispatch(clearErrors())
    }, [dispatch])

    // const auth = useSelector(state => state.auth);
    const error = useSelector(state => state.error);

   

    const handleLogin = (formData) => {
        dispatch(loginUser(formData))
        // alert(JSON.stringify(formData))
    }
    return(
    <section className = "auth__container">

    {error.id === "LOGIN_FAIL" ?

    <div className="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>ERROR :-</strong> {error.message.message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    </div> : ""
    }
        <LoginForm handleLogin = {handleLogin} ></LoginForm>

        <Link to = "/register"><p className = "text-gray text-center my-3">Don't have an Account, Register →</p></Link>
    </section>
        
    )
}

export default LoginPage;