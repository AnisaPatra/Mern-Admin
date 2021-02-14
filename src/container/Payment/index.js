import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import Layout from '../../components/Layout';
import SideNavigation from '../../components/sideNavigation';
import axios from 'axios';
import { MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';

/**
* @author
* @function Payment
**/

const Option = props => (
  <tr>
    <td>{props.payment_option.name}</td>
    <td>localhost:2000{props.payment_option.pic}</td>
    <td>{props.payment_option.createdAt.substring(0, 10)}</td>
    <td> <Link to={"/payment_integerations/edit/" + props.payment_option._id}>
      <MDBIcon icon="pen" style={{ color: "#00C851" }} />
    </Link>&nbsp;&nbsp; | &nbsp;&nbsp;
      <a href="#" onClick={() => { props.deleteOption(props.payment_option._id) }}>
        <MDBIcon icon="trash-alt" style={{ color: "#CC0000" }} />
      </a>
    </td>
  </tr>
)

export default class Payment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pay: []
    };
  }
  componentDidMount() {
    axios.get('http://localhost:2000/api/payment_options/')
      .then(response => {
        this.setState({
          pay: response.data,
        })
        console.log(this.state.pay);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteOption(id) {
    axios.delete('http://localhost:2000/api/payment_options/' + id,
      {
        headers: {
          'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        }
      })
      .then(response => { console.log(response.data) })
      .catch((error) => {window.alert(error);})

    this.setState({
      pay: this.state.pay.filter(el => el._id !== id)
    })
  }

  payment_optionList() {
    return this.state.pay.map(currentpayment_option => {
      return <Option payment_option={currentpayment_option} deleteOption={this.deleteOption.bind(this)} key={currentpayment_option._id} />;
    })
  }

  render() {

    return (
      <div>
        <Layout></Layout>
        <div className="flexible-content" style={{ backgroundColor: "white" }}>
          <SideNavigation />
          <main id="content" className="p-5" style={{ height: "100%", marginLeft: "270px" }}>
            <Container >
              <h2 style={{ fontFamily: "Times New Roman", fontWeight: "bold", textAlign: 'left', top: '50px' }}>
                Payment Options
              <button style={{ background: "transparent", border: 0, outline: 0, float: "right", top: '50px' }}>
                  <Link to={'/payment_integerations/add/'}><MDBIcon icon="plus-circle" size="1x" style={{ color: "#4285F4" }} /></Link>
                </button></h2>
              <br /><br /><br />
              <Table striped bordered hover variant="grey" class="tb" >
                <thead style={{ fontFamily: "Georgia", fontWeight: "bolder", fontStretch: "extra-expanded" }}>
                  <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Creation Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody style={{ fontFamily: "Cambria", fontSize: "17px" }}>
                  {this.payment_optionList()}
                </tbody>
              </Table>

            </Container>
          </main>
        </div>
      </div>
    )

  }

}
