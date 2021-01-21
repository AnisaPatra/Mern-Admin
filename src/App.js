import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './container/Home';
import Payment from './container/Payment';
import Languages from './container/Languages';
import Accounts from './container/Accounts';
import Signin from './container/Signin';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, getInitialData } from './actions';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Product_Category from './container/Product_Category';
import {signout} from '../src/actions/auth.actions';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  const logout = () => {
    dispatch(signout());
  }

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    

  }, []);
  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={Home}/>
        <PrivateRoute exact path="/product_category" component={Product_Category}/>
        <PrivateRoute exact path="/payment_integerations" component={Payment}/>
        <PrivateRoute exact path="/languages" component={Languages}/>
        <PrivateRoute exact path="/accounts" component={Accounts}/>
        <Route path="/signin" component={Signin} />
        
      </Switch>
    </div>
  );
}

export default App;

