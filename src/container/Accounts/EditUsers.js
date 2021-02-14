import React, { Component } from 'react';
import axios from 'axios';
import { Container,Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import SideNavigation from '../../components/sideNavigation';
import { MDBInput} from "mdbreact";
import { Link } from 'react-router-dom';
import './index.css';

export default class EditUsers extends Component {
  constructor(props) {
    super(props);

    this.onChangename = this.onChangename.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangeshop_name = this.onChangeshop_name.bind(this);
    this.onChangegstin = this.onChangegstin.bind(this);
    this.onChangecontactNumber = this.onChangecontactNumber.bind(this);
    this.onChangerole = this.onChangerole.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      email: '',
      shop_name: '',
      gstin: '',
      contactNumber: '',
      role: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:2000/api/users/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name, email: response.data.email, shop_name: response.data.shop_name,
          gstin: response.data.gstin, contactNumber: response.data.contactNumber, role: response.data.role
        });
      })
      .catch((error) => {
        console.log(error);
        console.log(this.props.match.params.id);

      })
  }

  onChangename(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeshop_name(e) {
    this.setState({
      shop_name: e.target.value
    })
  }

  onChangegstin(e) {
    this.setState({
      gstin: e.target.value
    })
  }

  onChangerole(e) {
    this.setState({
      role: e.target.value
    })
  }

  onChangecontactNumber(e) {
    this.setState({
      contactNumber: e.target.value
    })
  }

  onChangeemail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangerole(e) {
    this.setState({
      role: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();
    var patharray = window.location.pathname.split('/');
    console.log(patharray[2]);
    axios.put('http://localhost:2000/api/users/update/' + patharray[2], {
      name: this.state.name,
      contactNumber: this.state.contactNumber,
      gstin: this.state.gstin,
      email: this.state.email,
      shop_name: this.state.shop_name,
      role: this.state.role
    },
    {
      headers:{
        'Authorization' : 'Bearer ' + window.localStorage.getItem('token') 
      }
    })
      .then(
        response => {
          this.setState({ users: response.data });
        }
      );
    
      window.alert("User details Updated Successfully");
  }

  render() {
    return (
      <div>
        <Layout></Layout>
        <div className="flexible-content">
          <SideNavigation />
          <main id="content" className="p-5" >
            <Container style={{ backgroundColor: "white" }}>
              <h2 class="h2">Edit User</h2>
              <br/>
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
                          style={{width:"250px"}}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Email: </label>
                      </td>
                      <td>
                        <MDBInput type="email"
                          required
                          value={this.state.email}
                          onChange={this.onChangeemail}
                          style={{width:"250px"}}
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
                          value={this.state.shop_name}
                          onChange={this.onChangeshop_name}
                          style={{width:"250px"}}
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
                          onChange={this.onChangegstin}
                          autofocus="false"
                          style={{width:"250px"}}
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
                          onChange={this.onChangecontactNumber}
                          style={{width:"250px"}}
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
                          style={{width:"250px", height: "40px" , borderRadius: "4px", borderColor: "#d9d9d9"}}
                          value={this.state.role}
                          onChange={this.onChangerole}>
                          <option>Retailer</option>
                          <option>Seller</option>
                        </select>
                      </td>
                    </tr>
                    <br/>
                    <tr>
                      <td>
                      <Link to = "/accounts"><Button variant="outline-secondary" class="btn">Back</Button></Link>
                      </td>
                      <td>
                      <Button type="submit" variant="outline-success" class="btn">Update</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
              <br/>
            </Container>
          </main>
        </div>
      </div >
    )
  }
}

