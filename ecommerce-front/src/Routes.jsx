import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';

import Signup from './user/Signup';
import Signin from './user/Signin';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import Profile from './user/Profile';

import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';

import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Orders from './admin/Orders';

const Routes = () => {
    return (
        <BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home}/>
				<Route path="/product/:productId" exact component={Product}/>
				<Route path="/shop" exact component={Shop}/>
				<Route path="/cart" exact component={Cart}/>
				<Route path="/signin" exact component={Signin}/> 
				<Route path="/signup" exact component={Signup}/> 
				
				<PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
				<PrivateRoute path="/profile/:userId" exact component={Profile}/>

				<AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
				<AdminRoute path="/admin/create/category" exact component={AddCategory}/>
				<AdminRoute path="/admin/create/product" exact component={AddProduct}/>
				<AdminRoute path="/admin/orders/" exact component={Orders}/>
			</Switch>
		</BrowserRouter>
    );
};

export default Routes;