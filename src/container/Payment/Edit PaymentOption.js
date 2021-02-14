import React, { Component } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import SideNavigation from '../../components/sideNavigation';
import { MDBInput } from "mdbreact";
import { Link } from 'react-router-dom';
import './index.css';
import $ from 'jquery';

export default class EditPaymentOption extends Component {
  constructor(props) {
    super(props);

    this.onChangename = this.onChangename.bind(this);
    this.onChangepic = this.onChangepic.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: null,
      pic: null,
      createdAt: null,
      options: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:2000/api/payment_options/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          pic: response.data.pic,
          createdAt: response.data.createdAt
        });
        console.log(this.state.pic);
      })
      .catch((error) => {window.alert(error);})
  }

  onChangename(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangepic(e) {
    var fileName = e.target.files[0].name;
    $('.custom-file-label').html(fileName)
    this.setState({
      pic: e.target.files[0]
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name",this.state.name);
    formData.append("pic",this.state.pic);
    axios.put('http://localhost:2000/api/payment_options/' + this.props.match.params.id,formData,
    {
        headers:{
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token') 
        }
    })
      .then(
        response => {
          this.setState({ options: response.data });
          window.alert("Payment Options Updated Successfully");
        })
        .catch((error) => {
          window.alert(error);
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
              <h2 class="h2">Edit Payment Option</h2>
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
                          maxlength="40"
                          minlength="3"
                          value={this.state.name}
                          onChange={this.onChangename}
                          style={{ width: "250px" }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Image: </label>
                      </td>
                      <td>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept="image/*"
                            className="custom-file-input"
                            aria-describedby="inputGroupFileAddon01"
                            onChange={this.onChangepic}
                            style={{ width: "250px" }}
                          />
                          <label className="custom-file-label" htmlFor="inputGroupFile01">
                            Choose file</label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Created At: </label>
                      </td>
                      <td>
                        <MDBInput
                          type="text"
                          required
                          maxlength="50"
                          minlength="3"
                          value={this.state.createdAt}
                          disabled
                          style={{ width: "250px" }}
                        />
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <td>
                        <Link to="/payment_integerations"><Button variant="outline-secondary" class="btn">Back</Button></Link>
                      </td>
                      <td>
                        <Button type="submit" variant="outline-success" class="btn">Update</Button>
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

