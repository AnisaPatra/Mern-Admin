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
* @function AddCatgeory
**/

export default class AddCatgeory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectValue: "Category",
            name: null,
            CategoryImage: null,
            parentCategory: "Food",
            categories: [],
            parents: []
        };

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.onChangename = this.onChangename.bind(this);
        this.onChangeCategoryImage = this.onChangeCategoryImage.bind(this);
        this.onChangeparentCategory = this.onChangeparentCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitCategory = this.onSubmitCategory.bind(this);

    }

    handleDropdownChange(e) {
        this.setState({ selectValue: e.target.value });
        console.log(this.state.selectValue)
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
        console.log(this.state.CategoryImage);
    }

    onChangeparentCategory(e) {
        this.setState({
            parentCategory: e.target.value
        })
    }
    componentDidMount() {
        axios.get('http://localhost:2000/api/category/parentCategory')
            .then(response => {
                this.setState({ parents: response.data.map(parent => parent.name) })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("CategoryImage", this.state.CategoryImage);
        formData.append("parentCategory", this.state.parentCategory)
        axios.post('http://localhost:2000/api/category/create', formData,
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            })
            .then(
                response => {
                    this.setState({ categories: response.data });
                }
            );

        window.alert("Subcategory Created Successfully");
    }

    onSubmitCategory(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("CategoryImage", this.state.CategoryImage);
        axios.post('http://localhost:2000/api/category/create', formData,
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            })
            .then(
                response => {
                    this.setState({ categories: response.data });
                }
            );

        window.alert("Category Created Successfully");
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
                            <label class="filter">Add : &nbsp;&nbsp; </label>
                            <select ref="userInput" required className="form-control-boot" onChange={this.handleDropdownChange} >
                                <option value="Category">Category</option>
                                <option value="Sub Category">Sub Category</option>
                            </select>
                            <br /><br /><br />
                            {(() => {
                                if (this.state.selectValue === 'Category') {
                                    return (
                                        <div>
                                            <form onSubmit={this.onSubmitCategory}>
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
                                                                <label>Category Image: </label>
                                                            </td>
                                                            <td>
                                                                <div className="custom-file">
                                                                    <input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        className="custom-file-input"
                                                                        aria-describedby="inputGroupFileAddon01"
                                                                        required
                                                                        onChange={this.onChangeCategoryImage}
                                                                        style={{ width: "250px" }}
                                                                    />
                                                                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                                        Choose file</label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <br /><br />
                                                        <tr>
                                                            <td>
                                                                <Link to="/product_category"><Button variant="outline-secondary" class="btn">Back</Button></Link>
                                                            </td>
                                                            <td>
                                                                <Button type="submit" variant="outline-success" class="btn">Add</Button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </form>
                                        </div>
                                    )
                                }

                                return (
                                    <div>
                                        <form onSubmit={this.onSubmit}>
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
                                                            <label>Parent Category: </label>
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
                                                                    required
                                                                    onChange={this.onChangeCategoryImage}
                                                                    style={{ width: "250px" }}
                                                                />
                                                                <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                                    Choose file</label>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <br /><br />
                                                    <tr>
                                                        <td>
                                                            <Link to="/product_category"><Button variant="outline-secondary" class="btn">Back</Button></Link>
                                                        </td>
                                                        <td>
                                                            <Button type="submit" variant="outline-success" class="btn">Add</Button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </form>
                                    </div>
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
