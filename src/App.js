import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './container/Home';
import Payment from './container/Payment';
import Languages from './container/Languages';
import Accounts from './container/Accounts';
import Add_Accounts from './container/Accounts/Add_Accounts';
import Signin from './container/Signin';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn} from './actions/auth.actions';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Product_Category from './container/Product_Category';
import { signout } from '../src/actions/auth.actions';
import EditUsers from './container/Accounts/EditUsers';
import EditCategory from './container/Product_Category/Edit Category';
import AddCategory from './container/Product_Category/AddCategory';
import EditSubCategory from './container/Product_Category/Edit SubCategory';
import EditPaymentOption from './container/Payment/Edit PaymentOption';
import AddPaymentOption from './container/Payment/Add PaymentOption';


function App() {
  
  window.onunload = () => {
      // Clear the local storage
      window.localStorage.clear()
   }

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
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/product_category" component={Product_Category} />
        <PrivateRoute path="/account_edit/:id" component={EditUsers} />
        <PrivateRoute path="/category_edit/:id" component={EditCategory} />
        <PrivateRoute path="/subcategory_edit/:id" component={EditSubCategory} />
        <PrivateRoute exact path="/payment_integerations" component={Payment} />
        <PrivateRoute exact path="/languages" component={Languages} />
        <PrivateRoute exact path="/accounts" component={Accounts} />
        <PrivateRoute exact path="/accounts/add" component={Add_Accounts} />
        <PrivateRoute exact path='/category/add' component={AddCategory} />
        <PrivateRoute exact path = '/payment_integerations/add/' component={AddPaymentOption} />
        <PrivateRoute exact path = '/payment_integerations/edit/:id' component={EditPaymentOption}/>
        <Route path="/signin" component={Signin} />
      </Switch>
    </div>
  );
}

export default App;

