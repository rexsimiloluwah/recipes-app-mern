import React from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from "formik";
import {useSelector} from 'react-redux';
import Loader from '../Loader';
import './auth.css';

const RegisterForm = (props) => {

  const auth = useSelector(state => state.auth);

    // const [showPassword, setShowPassword] = useState(false);

  const registerSchema = Yup.object().shape({
    username: Yup.string()
        .required("Username is required."),

    email: Yup.string()
      .email("Email is invalid.")
      .required("Email is required."),

    password: Yup.string()
      .required("Password is required.")
      .matches(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"), "Password must contain at least one uppercase, lowercase and special character.")
      .min(8, "Password min length is 8."),

    confirmPassword: Yup.string()
        .required("Password is required")
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  return (
    <>

      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={({ username, email, password }) => {
          const fields = {
              username : username,
              email : email,
              password : password
          }

          props.handleRegister(fields)

        }}
      >
        {({ errors, touched, isValid, dirty, onSubmit }) => {
          return (
            <Form>
                <h4 className = "text-center text-success mb-5"> <i className = "bx bx-user"></i> Create a new Account</h4>

            <div className="form-group">
            <label htmlFor="email">Username</label>
            <Field
                type="text"
                name="username"
                id="username"
                placeholder="Enter username i.e Yemi Osinbajo"
                className={
                errors.username && touched.username ? "form-control is-invalid" : "form-control"
                }
            />
            <ErrorMessage name="email" component="span" className="invalid-feedback" />
            </div>

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
                  type="password"
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

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  className={
                    errors.confirmPassword && touched.confirmPassword ? "form-control is-invalid" : "form-control"
                  }
                />
                <ErrorMessage name="confirmPassword" component="span" className="invalid-feedback" />
              </div>

              <button type = "submit" className = "btn btn-success btn-block d-flex flex-direction-row justify-content-center" disabled={!(dirty && isValid)}>Create account {auth.isLoading ? <Loader className = "mx-3"></Loader> : ""}</button>
               
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default RegisterForm;