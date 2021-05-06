import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const SideNavigation = () => {
    return (
        <div className="sidebar-fixed position-absolute">
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="home" className="mr-3" size="lg"/>
                        Home
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/product_category" activeClassName="activeClass">
                    <MDBListGroupItem>
                    <MDBIcon fab icon="buromobelexperte" className="mr-3" size="lg"/>
                        Product Category
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/payment_integerations" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon fab icon="cc-amazon-pay" className="mr-3" size="lg"/>
                        Payment Integerations
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/accounts" activeClassName="activeClass">
                    <MDBListGroupItem>
                    <MDBIcon icon="user" className="mr-3" size="lg"/>
                        Manage Accounts
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default SideNavigation;