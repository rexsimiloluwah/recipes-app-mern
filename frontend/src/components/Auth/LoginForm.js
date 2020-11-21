import React from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from "formik";
import Loader from '../Loader';
import {useSelector} from 'react-redux';


const LoginForm = props => {

    const auth = useSelector(state => state.auth);

    // const [showPassword, setShowPassword] = useState(false);

  const logInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is invalid.")
      .required("Email is required."),

    password: Yup.string()
      .required("Password is required.")
      .min(8, "Incorrect password."),
  });

  const initialValues = {
    email: "",
    password: "",
  };


  return (
    <>

      <Formik
        initialValues={initialValues}
        validationSchema={logInSchema}
        onSubmit={({ email, password }) => {
          const fields = {
            email : email,
            password : password
        }

        props.handleLogin(fields)

        }}
      >
        {({ errors, touched, isValid, dirty, onSubmit }) => {
          return (
            <Form>
                <h4 className = "text-center text-success mb-5"> <i className = "bx bx-user"></i> Welcome, Please Login</h4>
              <div className="form-group">
                <label htmlFor="email">Email address*</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email address"
                  className={
                    errors.email && touched.email ? "form-control is-invalid" : "form-control"
                  }
                />
                <ErrorMessage name="email" component="span" className="invalid-feedback" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Enter Password</label>
                <Field
                  type={"password"}
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  className={
                    errors.password && touched.password ? "form-control is-invalid" : "form-control"
                  }
                />
                {/* <span
                  onClick={togglePasswordVisibility}
                  className="toggle-password"
                >
                  {showPassword ? <span>Hide</span> : <span>Show</span>}
                </span> */}
                <ErrorMessage
                  name="password"
                  component="span"
                  className="invalid-feedback"
                />
              </div>

              <button type = "submit" className = "btn btn-success btn-block d-flex flex-direction-row justify-content-center" disabled={!(dirty && isValid)}>Login to Account {auth.isLoading ? <Loader className = "mx-3"></Loader> : ""}</button>
               
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default LoginForm;