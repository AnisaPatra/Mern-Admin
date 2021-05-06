import React, { Component } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import SideNavigation from '../../components/sideNavigation';
import { MDBInput } from "mdbreact";
import { Link } from 'react-router-dom';
import './index.css';

export default class EditUsers extends Component {
  constructor(props) {
    super(props);

    this.onChangename = this.onChangename.bind(this);
    this.onChangevalue = this.onChangevalue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      email: '',
      shop_name: '',
      gstin: '',
      contactNumber: '',
      role: 'Retailer',
      password: '',
      address: '',
      users: []
    }
  }

  onChangename(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangevalue(e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }


  onSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:2000/api/signup', {
      name: this.state.name,
      contactNumber: this.state.contactNumber,
      password: this.state.password,
      gstin: this.state.gstin,
      email: this.state.email,
      shop_name: this.state.shop_name,
      role: this.state.role,
      address : this.state.address
    })
      .then(
        response => {
          console.log("Success")
          this.setState({ users: response.data });
          window.alert("User Created");
        }
      )
      .catch(err => window.alert(err));

    this.setState({
      name: '',
      email: '',
      shop_name: '',
      gstin: '',
      contactNumber: '',
      role: 'Retailer',
      password: '',
      address:'',
      users: []

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
              <h2 class="h2">Add User</h2>
              <br />
              <form onSubmit={this.onSubmit}>
                <table cellPadding="10" cellSpacing="25">
                  <tbody class="tbody">
                    <tr>
                      <td>
                        <label>Name: </label>
                      </td>
                      <td>
                        <MDBInput type="text"
                          required
                          maxlength="20"
                          minlength="3"
                          value={this.state.name}
                          onChange={this.onChangename}
                          style={{ width: "250px" }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Password: </label>
                      </td>
                      <td>
                        <MDBInput type="password"
                          required
                          maxlength="20"
                          minlength="6"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChangevalue}
                          style={{ width: "250px" }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Email: </label>
                      </td>
                      <td>
                        <MDBInput type="email"
                          pattern = "^[a-zA-Z0-9.!#$%'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                          required
                          name="email"
                          value={this.state.email}
                          onChange={this.onChangevalue}
                          style={{ width: "250px" }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Shop Name: </label>
                      </td>
                      <td>
                        <MDBInput
                          type="text"
                          required
                          maxlength="50"
                          minlength="3"
                          name="shop_name"
                          value={this.state.shop_name}
                          onChange={this.onChangevalue}
                          style={{ width: "250px" }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>GSTIN: </label>
                      </td>
                      <td>
                        <MDBInput
                          type="text"
                          required
                          pattern="^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$"
                          value={this.state.gstin}
                          name="gstin"
                          onChange={this.onChangevalue}
                          autofocus="false"
                          style={{ width: "250px" }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Contact Number: </label>
                      </td>
                      <td>
                        <MDBInput
                          type="text"
                          required
                          pattern="^[789]\d{9}$"
                          value={this.state.contactNumber}
                          onChange={this.onChangevalue}
                          name="contactNumber"
                          style={{ width: "250px" }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Role: </label>
                      </td>
                      <td>
                        <select ref="userInput"
                          required
                          style={{ width: "250px" }}
                          className="form-control"
                          value={this.state.role}
                          name="role"
                          onChange={this.onChangevalue}>
                          <option>Retailer</option>
                          <option>Seller</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Address: </label>
                      </td>
                      <td>
                        <textarea
                          type="text"
                          required
                          maxlength="100000"
                          value={this.state.address}
                          onChange={this.onChangevalue}
                          name="address"
                          className="form-control"
                          style={{ width: "250px" }}
                        />
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <td>
                        <Link to="/accounts"><Button variant="outline-secondary" class="btn">Back</Button></Link>
                      </td>
                      <td>
                        <Button type="submit" variant="outline-success" class="btn">Add</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
              <br />
            </Container>
          </main>
        </div>
      </div >
    )
  }
}

