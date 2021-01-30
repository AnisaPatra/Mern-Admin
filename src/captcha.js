import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Container, Form, Jumbotron, Button } from 'react-bootstrap';
import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { MDBInput } from "mdbreact";
import Recaptcha from 'react-recaptcha';

/**
* @author
* @function Signin
**/

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isVerified : false,
        };
        this.handleCaptcha = this.handleCaptcha.bind(this);
        this.reCaptchaLoaded = this.reCaptchaLoaded.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        
    }
    
    handleCaptcha() {
        if (isVerified) {
            if (auth.authenticate) {
                return <Redirect to={`/`} />
            }
        }
        else {
            alert('Please verify that you are a human')
        }
    }

    reCaptchaLoaded(){
        console.log('Captcha Loaded');
        console.log(isVerified);
    }

    verifyCallback(response){
        if(response){
            this.setState({
                isVerified: true
            })
        }
    }
    render(){
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
                                        <MDBInput required style={{ width: "250px" }} hint="Email" type="email" value={email}
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label style={{ fontWeight: 'bold' }}>Password</label>
                                    </td>
                                    <td>
                                        <MDBInput required style={{ width: "250px" }} hint="Password" value={password} type="password"
                                            onChange={(e) => setPassword(e.target.value)} />
                                    </td>
                                </tr><br />
                                <tr>
                                    <td colSpan='1'>
                                        <Recaptcha
                                            sitekey="6LfxqzwaAAAAAKOz5Pd72x1AweiJHxIvUxEtOAuu"
                                            render="explicit"
                                            onloadCallback={this.reCaptchaLoaded}
                                            verifyCallback={this.verifyCallback}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="1">
                                        <Button type="submit" variant="info" style={{ width: "130px", color: "white" }} onClick={this.handleCaptcha}>
                                            Sign In
                                        </Button>
                                    </td>
    
                                </tr>
                            </table>
                        </Form>
                    </Jumbotron>
                </center>
            </div>
        )
    }
}

export default Signin