import React, { Component } from 'react';
import { Container, Table, Button} from 'react-bootstrap';
import Layout from '../../components/Layout';
import SideNavigation from '../../components/sideNavigation';
import axios from 'axios';
import './index.css';
import {MDBIcon} from 'mdbreact';
import { Link } from 'react-router-dom';

/**
* @author
* @function Accounts
**/
const Retailer = props => (
  <tr>
    <td>{props.retail.name}</td>
    <td>{props.retail.email}</td>
    <td>{props.retail.shop_name}</td>
    <td>{props.retail.gstin}</td>
    <td>{props.retail.contactNumber}</td>
    <td>{props.retail.createdAt.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/"+props.retail._id}>
        <MDBIcon icon="pen" style={{color: "#00C851" }}/>
      </Link>&nbsp;&nbsp; | &nbsp;&nbsp;
        <a href="#" onClick={() => { props.deleteUser(props.retail._id) }}>
        <MDBIcon icon="trash-alt" style={{color: "#CC0000"}}/>
        </a>
    </td>
  </tr>
)

const Seller = props => (
  <tr>
    <td>{props.sell.name}</td>
    <td>{props.sell.email}</td>
    <td>{props.sell.shop_name}</td>
    <td>{props.sell.gstin}</td>
    <td>{props.sell.contactNumber}</td>
    <td>{props.sell.createdAt.substring(0, 10)}</td>
    <td><Link to={"http://localhost:2000/api/sellers/update/"+props.sell._id}><MDBIcon icon="pen" style={{color: "#00C851" }}/></Link>&nbsp;&nbsp; | &nbsp;&nbsp;
        <a href="#" onClick={() => { props.deleteUser(props.sell._id) }}>
        <MDBIcon icon="trash-alt" style={{color: "#CC0000"}}/>
        </a>
    </td>
  </tr>
)

export default class Accounts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectValue: "Retailer",
      users: [],
      susers: []
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);

  }

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }

  componentDidMount() {
    axios.get('http://localhost:2000/api/retailers')
      .then(response => {
        this.setState({ users: response.data });
        console.log(this.state.users);
        return axios.get('http://localhost:2000/api/sellers');
        
      })
      .then(response => {
        this.setState({ susers: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }


  deleteUser(id) {
    axios.delete('http://localhost:2000/api/users/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      users: this.state.users.filter(el => el._id !== id)
    })
    
  }

  RetailerList() {
    return this.state.users.map(currentuser => {
      return <Retailer retail={currentuser} deleteUser={this.deleteUser.bind(this)} key={currentuser._id} />;
    })
  }

  SellerList() {
    return this.state.susers.map(currentuser => {
      return <Seller Sellers={this.Sellers} sell={currentuser} key={currentuser._id} />;
    })
  }

  render() {

    return (

      <div>
        <Layout></Layout>
        <div className="flexible-content" style={{backgroundColor: "white"}}>
          <SideNavigation/>
          <main id="content" className="p-5" style={{height: "100%", marginLeft: "270px"}}>
            <Container style={{backgroundColor: "white"}}>
              <h2 style={{ fontFamily: "Times New Roman", fontWeight: "bold", textAlign: 'left', top: '50px'}}>
                Accounts</h2>
              <button style={{ background: "transparent", border: 0, outline: 0, float: "right" ,top: '50px'}}>
                <MDBIcon icon="plus-circle" size="2x" style={{color : "#4285F4"}}/>
              </button>
              <br /><br/><br/>
              <div class="btn-group" role="group" aria-label="Basic example" style={{width: "100%"}}>
              <Button variant="outline-secondary" onClick={this.handleDropdownChange} value="Retailer" size="lg" class="btn" style={{borderRight: 0}}>
                Retailer
                </Button>
              <Button variant="outline-secondary" onClick={this.handleDropdownChange} value="Seller" size="lg" class="btn" style={{borderLeft: 0}}>
                Seller
              </Button></div>
              <br/><br/><br/>
              {(() => {
                if (this.state.selectValue == 'Retailer') {
                  return (
                    <Table striped bordered hover variant="grey" class="tb">
                      <thead style={{fontFamily:"Georgia", fontWeight:"bolder", fontStretch: "extra-expanded"}}>
                        <tr>
                        <th>Name</th>
                          <th>Email</th>
                          <th>Shop Name</th>
                          <th>GSTIN</th>
                          <th>Contact Number</th>
                          <th>Creation Time</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody style={{fontFamily:"Cambria" ,fontSize: "17px"}}>
                        {this.RetailerList()}
                      </tbody>
                    </Table>
                  )
                }

                return (
                  <Table striped bordered hover variant="grey" class="tb">
                  <thead style={{fontFamily:"Georgia", fontWeight:"bolder"}}>
                    <tr>
                    <th>Name</th>
                          <th>Email</th>
                          <th>Shop Name</th>
                          <th>GSTIN</th>
                          <th>Contact Number</th>
                          <th>Creation Time</th>
                    </tr>
                  </thead>
                  <tbody style={{fontFamily:"Cambria" ,fontSize: "17px" , fontStretch: "extra-expanded"}}>
                    {this.SellerList()}
                  </tbody>
                </Table>
                );
              })()}

              <br />
            </Container>
          </main>
        </div>
      </div>
    )
  }


}