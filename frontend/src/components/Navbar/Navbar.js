import React, {useState} from 'react'
import {Nav, Navbar, NavbarToggler, Collapse, NavItem, NavbarBrand,NavbarText} from 'reactstrap'
import {Link, useHistory} from 'react-router-dom';
import './Navbar.css';
import '../../App.css';

import {useSelector, useDispatch} from 'react-redux';
import {logoutUser} from '../../redux/actions/authActions';

const NavComponent = (props) => {

    const history = useHistory()
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false)

    const toggleNav = () => {
        setIsOpen(!isOpen)
    }

    const logout = () => {
        dispatch(logoutUser())
        history.push("/");
    }

    return(
        <div>
            <Navbar color="light" light expand = "lg" className="shadow">
                <NavbarBrand href="/">Naija Recipes</NavbarBrand>
                <NavbarToggler onClick={toggleNav}></NavbarToggler>
                <Collapse isOpen = {isOpen} navbar>
                    <Nav className = "ml-auto" navbar>
                        <NavItem>
                            <Link to = "/" className="nav-link">Home</Link>
                        </NavItem>

                        <NavItem>
                            <Link to = "/view-recipes" className="nav-link">View Recipes</Link>
                        </NavItem>

                        { auth.isAuthenticated ? 
                        <NavItem>
                            <Link to = "/add-recipe" className="nav-link">Create Recipe</Link>
                        </NavItem> : ""
                        }
                        

                        {
                            auth.isAuthenticated ? "" : 
                        <NavItem>
                            <Link to = "/register" className="nav-link login-register"><i className = "bx bx-user"></i> Login/Register</Link>
                        </NavItem>
                        }

                        {
                            auth.isAuthenticated ? 
                        <NavItem>
                            <span className = "nav-link" onClick = {logout}>Logout</span>
                        </NavItem> : ""
                        }

                        {
                            auth.isAuthenticated ?
                            <NavItem>
                                <span className = "navbar-text">Welcome <strong className = "text-uppercase">{auth.user.username}</strong></span>
                            </NavItem> : ""
                        }
                        

                    </Nav>

                    <NavbarText>
                        <div>
                            <a href="https://www.linkedin.com/in/similoluwa-okunowo-595787179/" target="blank"><i className="bx bxl-twitter bx-lg"></i></a>
                            <a href="https://medium.com/@rexsimiloluwa" target="blank"><i className="bx bxl-instagram bx-lg"></i></a>
                        </div>
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavComponent