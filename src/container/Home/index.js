import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Container , Navbar , Nav ,NavDropdown} from 'react-bootstrap';
import Layout from '../../components/Layout';
import SideNavigation from '../../components/sideNavigation';

/**
* @author
* @function Home
**/

const Home = (props) => {
  return(
    <div>
      <Layout></Layout>
      <div className="flexible-content" style={{height: "50vh", backgroundColor: "white"}}>
          <SideNavigation />
          <main id="content" className="p-5" style={{marginLeft: "270px"}}>
            <Jumbotron fluid style={{backgroundColor: "white"}}>
              <Container >
                <h1 class="display-4" style={{fontFamily: "Times New Roman", marginTop: "90px" , fontWeight: "bold"}}>Admin Dashboard</h1>
                <br/>
                <p class="lead" style={{fontFamily: "Cambria"}}>
                  <p style={{fontWeight: "bold", fontSize: "20px"}}>Welcome to Vridhi Admin Dashboard !!!</p>
                  
                  This dashboard can be solely used by Admin only.
                  <br/>
                  This dashboard is used to accomplish Admin related operations.
                  <br /><br/>
                  Click on the <a href="/signout">Sign Out</a> to exit.
                </p>
              </Container>
            </Jumbotron>
          </main>
        </div>
    </div>
   )

 }

export default Home