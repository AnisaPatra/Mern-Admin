import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import {  Form, Jumbotron, Button } from 'react-bootstrap';
import { login } from '../../actions/auth.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { MDBInput } from "mdbreact";

/**
* @author
* @function Signin
**/

const Signin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();




    const userLogin = (e) => {

        e.preventDefault();

        const user = {
            email, password
        }

        dispatch(login(user));
    }

    if (auth.authenticate) {
        return <Redirect to={`/`} />
    }
    
    return (
        <div>
            <Layout></Layout>
            <center>
                <Jumbotron style={{ backgroundColor: '#343a40', height: '40%', width: '35%', marginTop: '120px' }}>
                    <Form onSubmit={userLogin}>
                        <table cellpadding="20" cellspacing="5" style={{ fontFamily: 'Cambria', color: 'white', fontSize: '20px' }}>
                            <tr>
                                <td>
                                    <label style={{ fontWeight: 'bold' }}>Email</label>
                                </td>
                                <td>
                                     <MDBInput required style={{width:"250px"}} hint="Email" type="email" value={email} 
                                        onChange={(e) => setEmail(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label style={{ fontWeight: 'bold' }}>Password</label>
                                </td>
                                <td>
                                    <MDBInput required style={{width:"250px"}} hint="Password" value={password} type="password" 
                                        onChange={(e) => setPassword(e.target.value)} />
                                </td>
                            </tr><br />
                            <tr>
                                <td colSpan="1">
                                    <Button type="submit" variant="info" style={{width:"130px", color: "white"}}>Sign In</Button>
                                </td>

                            </tr>
                        </table>
                    </Form>
                </Jumbotron>
            </center>
        </div>
    )

}

export default Signin