import React, { Component } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import SideNavigation from '../../components/sideNavigation';
import { MDBInput } from "mdbreact";
import { Link } from 'react-router-dom';
import './index.css';
import $ from 'jquery';

export default class EditSubCategory extends Component {
    constructor(props) {
        super(props);

        this.onChangename = this.onChangename.bind(this);
        this.onChangeCategoryImage = this.onChangeCategoryImage.bind(this);
        this.onChangeparentCategory = this.onChangeparentCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: null,
            CategoryImage: null,
            createdAt: null,
            parentCategory: null,
            categories: [],
            parents: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:2000/api/category/getcatbyid/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    CategoryImage: response.data.CategoryImage,
                    parentCategory: response.data.parentCategory,
                    createdAt: response.data.createdAt
                });
                console.log(this.state.CategoryImage);
                return axios.get('http://localhost:2000/api/category/parentCategory')
            })
            .then(response => {
                this.setState({ parents: response.data.map(parent => parent.name) })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangename(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeCategoryImage(e) {
        var fileName = e.target.files[0].name;
        $('.custom-file-label').html(fileName)
        this.setState({
            CategoryImage: e.target.files[0]
        })

    }

    onChangeparentCategory(e) {
        this.setState({
            parentCategory: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("CategoryImage", this.state.CategoryImage);
        formData.append("parentCategory", this.state.parentCategory)
        axios.put('http://localhost:2000/api/category/update/' + this.props.match.params.id, formData,
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            })
            .then(
                response => {
                    this.setState({ categories: response.data });
                    console.log(this.state.categories);
                    console.log(this.state.CategoryImage);
                    window.alert("Category Details Updated Successfully");
                })
            .catch((error) => {
                window.alert("Error " + error);
            });
    }

    render() {
        return (
            <div>
                <Layout></Layout>
                <div className="flexible-content">
                    <SideNavigation />
                    <main id="content" className="p-5" >
                        <Container style={{ backgroundColor: "white" }}>
                            <h2 class="h2">Edit Sub Category</h2>
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
                                                <label>Parent Category </label>
                                            </td>
                                            <td>
                                                <select ref="userInput"
                                                    style={{ width: "250px" }}
                                                    required
                                                    maxlength="40"
                                                    minlength="3"
                                                    className="form-control"
                                                    value={this.state.parentCategory}
                                                    onChange={this.onChangeparentCategory}>
                                                    {
                                                        this.state.parents.map(function (parent) {
                                                            return <option
                                                                key={parent}
                                                                value={parent}>{parent}
                                                            </option>;
                                                        })
                                                    }
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Category Image: </label>
                                            </td>
                                            <td>
                                                <div className="custom-file">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="custom-file-input"
                                                        aria-describedby="inputGroupFileAddon01"
                                                        onChange={this.onChangeCategoryImage}
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
                                                <Link to="/product_category"><Button variant="outline-secondary" class="btn">Back</Button></Link>
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

