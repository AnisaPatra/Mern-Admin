import React, { Component } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import SideNavigation from '../../components/sideNavigation';
import axios from 'axios';
import './index.css';
import { MDBIcon } from 'mdbreact';
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
      <Link to={"/edit/" + props.retail._id}>
        <MDBIcon icon="pen" style={{ color: "#00C851" }} />
      </Link>&nbsp;&nbsp; | &nbsp;&nbsp;
        <a href="#" onClick={() => { props.deleteUser(props.retail._id) }}>
        <MDBIcon icon="trash-alt" style={{ color: "#CC0000" }} />
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
    <td> <Link to={"/edit/" + props.sell._id}>
      <MDBIcon icon="pen" style={{ color: "#00C851" }} />
    </Link>&nbsp;&nbsp; | &nbsp;&nbsp;
        <a href="#" onClick={() => { props.deleteUser(props.sell._id) }}>
        <MDBIcon icon="trash-alt" style={{ color: "#CC0000" }} />
      </a>
    </td>
  </tr>
)

export default class Accounts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectValue: "Retailer",
      sort: '',
      susers: [],
      merge3: []
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);

  }

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
    console.log(this.state.selectValue)
  }

  componentDidMount() {
    axios.get('http://localhost:2000/api/retailers/?sort=name')
      .then(response => {
        this.setState({ users: response.data });
        var nusers = {};
        nusers = Object.entries(this.state.users);
        const check = [];
        for (let i = 0; i < nusers.length; i++) {
          for (let j = 1; j < nusers[i].length; j++) {
            check.push(nusers[i][j]);
          }
        }
        const merge3 = check.flat(1);
        this.setState({ merge3: merge3 });
        return axios.get('http://localhost:2000/api/sellers');

      })
      .then(response => {
        this.setState({ susers: response.data });
        console.log(this.state.susers)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleSortChange(e) {
    this.setState({ sort: e.target.value });
    axios.get('http://localhost:2000/api/retailers/?sort=' + this.state.sort)
      .then(response => {
        this.setState({ users: response.data });
        console.log(this.state.users);
      })
  }

  deleteUser(id) {
    axios.delete('http://localhost:2000/api/users/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      merge3: this.state.merge3.filter(el => el._id !== id)
    })

  }


  RetailerList() {
    return this.state.merge3.map(currentuser => {
      return <Retailer retail={currentuser} deleteUser={this.deleteUser.bind(this)} key={currentuser._id} />;
    })
  }

  SellerList() {
    return this.state.susers.map(currentuser => {
      return <Seller Sellers={this.Sellers} sell={currentuser} deleteUser={this.deleteUser.bind(this)} key={currentuser._id} />;
    })
  }

  render() {

    return (

      <div>
        <Layout></Layout>
        <div className="flexible-content">
          <SideNavigation />
          <main id="content" className="p-5" >
            <Container style={{ backgroundColor: "white" }}>
              <h2 class="h2">Accounts
              <button style={{ background: "transparent", border: 0, outline: 0, float: "right", top: '50px' }}>
                  <Link to={'/accounts/add'}><MDBIcon icon="plus-circle" size="1x" style={{ color: "#4285F4" }} /></Link>
                </button></h2>
              <br /><br /><br />
              <div class="btn-group" role="group" aria-label="Basic example" style={{ width: "100%" }}>
                <Button variant="outline-secondary" onClick={this.handleDropdownChange} value="Retailer" size="lg" class="btn" style={{ borderRight: 0 }}>
                  Retailer
                </Button>
                <Button variant="outline-secondary" onClick={this.handleDropdownChange} value="Seller" size="lg" class="btn" style={{ borderLeft: 0 }}>
                  Seller
              </Button></div>
              <br /><br /><br />
              <label class="filter">Sort : &nbsp;&nbsp; </label>
              <select ref="userInput" required className="form-control-boot" onChange={this.handleSortChange}>
                <option value="name" selected={this.state.sort == "name"}>Name</option>
                <option value="email">Email</option>
                <option value="shop_name">Shop Name</option>
                <option value="gstin">GSTIN</option>
                <option value="contactNumber">Contact Number</option>
                <option value="createdAt">Creation Time</option>
              </select>
              <p>{this.state.selectValue}</p>
              {(() => {
                if (this.state.selectValue === 'Retailer') {
                  return (
                    <Table striped bordered hover variant="grey" class="tb">
                      <thead class="thead" >
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
                      <tbody class="tbody">
                        {this.RetailerList()}
                      </tbody>
                    </Table>
                  )
                }

                return (
                  <Table striped bordered hover variant="grey" class="tb">
                    <thead class="thead">
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
                    <tbody class="tbody">
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