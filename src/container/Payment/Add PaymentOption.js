import React, { Component } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import SideNavigation from '../../components/sideNavigation';
import axios from 'axios';
import './index.css';
import { MDBIcon, MDBInput } from 'mdbreact';
import { Link } from 'react-router-dom';
import $ from 'jquery';

/**
* @author
* @function AddPaymentOption
**/

export default class AddPaymentOption extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            picture: null,
            options: []
        };

        this.onChangename = this.onChangename.bind(this);
        this.onChangepicture = this.onChangepicture.bind(this);
        this.onSubmitOption = this.onSubmitOption.bind(this);

    }

    onChangename(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangepicture(e) {
        var fileName = e.target.files[0].name;
        $('.custom-file-label').html(fileName)
        this.setState({
            picture: e.target.files[0]
        })
    }

    onSubmitOption(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("picture", this.state.picture);
        axios.post('http://localhost:2000/api/payment_options/create', formData,
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            })
            .then(
                response => {
                    this.setState({ options: response.data });
                    console.log(this.state.options)
                }
            )
            .catch((error) => {window.alert(error);})

        window.alert("Payment Option Created Successfully");
    }

    render() {

        return (

            <div>
                <Layout></Layout>
                <div className="flexible-content">
                    <SideNavigation />
                    <main id="content" className="p-5" >
                        <Container style={{ backgroundColor: "white" }}>
                            <br /><br />
                            <h2 style={{ fontFamily: "Times New Roman", fontWeight: "bold", textAlign: 'left', top: '50px' }}>
                                Add Payment Options
                            </h2>
                            <br /><br /><br />
                            <div>
                                <form onSubmit={this.onSubmitOption}>
                                    <table cellPadding="20" cellSpacing="25" style={{ float: "left", marginTop: '30px' }}>
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
                                                        style={{ width: "250px" }}
                                                        value={this.state.name}
                                                        onChange={this.onChangename}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>Payment Icon: </label>
                                                </td>
                                                <td>
                                                    <div className="custom-file">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="custom-file-input"
                                                            aria-describedby="inputGroupFileAddon01"
                                                            required
                                                            onChange={this.onChangepicture}
                                                            style={{ width: "250px" }}
                                                        />
                                                        <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                            Choose file
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <br /><br />
                                            <tr>
                                                <td>
                                                    <Link to="/payment_integerations"><Button variant="outline-secondary" class="btn">Back</Button></Link>
                                                </td>
                                                <td>
                                                    <Button type="submit" variant="outline-success" class="btn">Add</Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                            <br />
                        </Container>
                    </main>
                </div>
            </div>
        )
    }


}
