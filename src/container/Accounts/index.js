import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Container , Navbar , Nav ,NavDropdown} from 'react-bootstrap';
import Layout from '../../components/Layout';
import SideNavigation from '../../components/sideNavigation';

/**
* @author
* @function Accounts

**/

const Accounts = (props) => {
  return(
    <div>
      <Layout></Layout>
      <div className="flexible-content">
          <SideNavigation />
          <main id="content" className="p-5" style={{height: "645px"}}>
            <Jumbotron fluid style={{backgroundColor: "white"}}>
              <Container >
                <h1 class="display-4" style={{fontFamily: "Times New Roman", marginTop: "80px" , fontWeight: "bold"}}>Admin Dashboard</h1>
                <br/>
                <p class="lead" style={{fontFamily: "Cambria"}}>
                  <p style={{fontWeight: "bold", fontSize: "20px"}}>Welcome to Vridhi Admin Dashboard !!!</p>
                  
                  This Manage Accounts Page
                </p>
              </Container>
            </Jumbotron>
          </main>
        </div> 
    </div>
   )

 }

export default Accounts
