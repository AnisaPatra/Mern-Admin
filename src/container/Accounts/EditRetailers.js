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
  <div>
    <Table style={{border:0}}>
      <tr >
        <td><label>Name : </label></td>
        <td><input placeholder={props.retail.name} /></td>
      </tr>
      <tr>
        <td><label>Email : </label></td>
        <td><input placeholder={props.retail.email} /></td>
      </tr>
      <tr>
        <td><label>Shop Name : </label></td>
        <td><input placeholder={props.retail.shop_name} /></td>
      </tr>
      <tr>
        <td><label>GSTIN : </label></td>
        <td><input placeholder={props.retail.gstin} /></td>
      </tr>
      <tr>
        <td><label>Contact Number : </label></td>
        <td><input placeholder={props.retail.contactNumber} /></td>
      </tr>
    </Table>
  </div>
)


export default class EditRetailers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: {}
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);

  }

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }

  componentDidMount() {
    axios.get('http://localhost:2000/api/users/' + this.props.match.params.id)
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.log(error);
      })

  }

  RetailerList() {
    const nusers = Object.entries(this.state.users);
      const constructObject = arr => {
        return arr.reduce((acc, val) => {
           const [key, value] = val;
           acc[key] = value;
           return acc;
        }, {});
     };
     const new_user = constructObject(nusers);
     const try_now = [];
     try_now.push(new_user);
    return try_now.map(currentuser => {
      return <Retailer retail={currentuser} key={currentuser._id} />;
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
                Edit Accounts</h2>
              <button style={{ background: "transparent", border: 0, outline: 0, float: "right" ,top: '50px'}}>
                <MDBIcon icon="plus-circle" size="2x" style={{color : "#4285F4"}}/>
              </button>
              <br /><br/><br/>
              <br/><br/><br/>
              <br />
              {this.RetailerList()}
            </Container>
          </main>
        </div>
      </div>
    )
  }


}