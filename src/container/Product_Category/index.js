import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import Layout from '../../components/Layout';
import SideNavigation from '../../components/sideNavigation';
import add from '../../images/plus.png';
import axios from 'axios';
import './index.css'

/**
* @author
* @function Product_Category
**/
const ParentCategory = props => (
  <tr>
    <td>{props.category.name}</td>
    <td>{props.category.CategoryImage}</td>
    <td>{props.category.createdAt.substring(0, 10)}</td>
  </tr>
)

const SubCategory = props => (
  <tr>
    <td>{props.subcategory.name}</td>
    <td>{props.subcategory.parentCategory}</td>
    <td>{props.subcategory.CategoryImage}</td>
    <td>{props.subcategory.createdAt.substring(0, 10)}</td>
  </tr>
)


export default class Product_Category extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectValue: "Category",
      categories: []
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);

  }

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }

  componentDidMount() {
    axios.get('http://localhost:2000/api/category/parentCategory')
      .then(response => {
        this.setState({ categories: response.data });
        return axios.get('http://localhost:2000/api/category/subcategory');
      })
      .then(response => {
        this.setState({ scategories: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  
  categoryList() {
    return this.state.categories.map(currentcategory => {
      return <ParentCategory category={currentcategory} key={currentcategory._id} />;
    })
  }

  subcategoryList() {
    return this.state.scategories.map(currentcategory => {
      return <SubCategory SubCategories={this.SubCategories} subcategory={currentcategory} key={currentcategory._id} />;
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
                Product Categories</h2>
              <button style={{ background: "transparent", border: 0, outline: 0, float: "right" ,top: '50px'}}>
                <img src={add} alt="ADD" />
              </button>
              <br />
              <p class="lead" style={{ fontFamily: "Cambria" }}>
                <p style={{ fontWeight: "bold", fontSize: "20px" }}></p>
              </p>
              <label class="filter">Filter : &nbsp;&nbsp; </label>
                <select ref="userInput" required className="form-control-boot" onChange={this.handleDropdownChange} >
                <option value="Category">Category</option>
                <option value="Sub Category">Sub Category</option>
              </select>
              <p class="lead" style={{ fontFamily: "Cambria" }}>
                <p style={{ fontWeight: "bold", fontSize: "20px" }}></p>
              </p>
              {(() => {
                if (this.state.selectValue == 'Category') {
                  return (
                    <Table striped bordered hover variant="grey" class="tb">
                      <thead style={{fontFamily:"Georgia", fontWeight:"bolder", fontStretch: "extra-expanded"}}>
                        <tr>
                          <th>Category Name</th>
                          <th>Catgeory Image</th>
                          <th>Creation Time</th>
                        </tr>
                      </thead>
                      <tbody style={{fontFamily:"Cambria" ,fontSize: "17px"}}>
                        {this.categoryList()}
                      </tbody>
                    </Table>
                  )
                }

                return (
                  <Table striped bordered hover variant="grey" class="tb">
                  <thead style={{fontFamily:"Georgia", fontWeight:"bolder"}}>
                    <tr>
                      <th>Category Name</th>
                      <th>Parent Category</th>
                      <th>Catgeory Image</th>
                      <th>Creation Time</th>
                    </tr>
                  </thead>
                  <tbody style={{fontFamily:"Cambria" ,fontSize: "17px" , fontStretch: "extra-expanded"}}>
                    {this.subcategoryList()}
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