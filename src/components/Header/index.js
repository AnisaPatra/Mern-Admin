import React from 'react'
import { Navbar , Nav ,NavDropdown, Button} from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {signout} from '../../actions/auth.actions';
/**
* @author
* @function Header
**/

const Header = (props) => {
  
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(signout());
  }
  const isUser = () => {
    return(
      <Navbar collapseOnSelect expand="lg" className="navbar">
        <Navbar.Brand href="/">Vridhi Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav className="log">
            <li className="nav-item">
              <NavLink to="/signin" className="nav-link" onClick={logout}>Sign Out</NavLink>
            </li>     
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  const noUser =() => {
    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar">
        <Link to="/" className="navbar-brand">Vridhi Admin</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

  return(
    <div>
      {auth.authenticate ? isUser() : noUser()}
    </div>
    
   );

 }

export default Header