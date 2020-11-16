import React, {useState} from 'react'
import {Nav, Navbar, NavbarToggler, Collapse, NavItem, NavLink, NavbarBrand,NavbarText} from 'reactstrap'
import {Link} from 'react-router-dom';
import './Navbar.css';
import '../../App.css';

const NavComponent = (props) => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleNav = () => {
        setIsOpen(!isOpen)
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
                            <Link to = "/add-recipe" className="nav-link">View Recipes</Link>
                        </NavItem>

                        <NavItem>
                            <Link to = "/" className="nav-link">Create Recipe</Link>
                        </NavItem>

                        <NavItem>
                            <Link to = "/" className="nav-link login-register"><i className = "bx bx-user"></i> Login/Register</Link>
                        </NavItem>

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