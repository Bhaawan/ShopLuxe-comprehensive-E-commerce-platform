import React, { useEffect } from 'react';
import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Protected from './features/auth/components/Protected';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin.js';
import PageNotFound from './pages/PageNotFound.js';
import { fetchItemsAddedByUserAsync } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import OrderSuccessPage from './pages/OrderSuccessPage.js';
import UserOrdersPage from './pages/UserOrdersPage.js';
import UserProfile from './features/user/components/UserProfile.js'
import UserProfilePage from './pages/UserProfilePage.js'
import { fetchLoggedInUser } from './features/user/userAPI.js';
import { fetchLoggedInUserAsync } from './features/user/userSlice.js';
import Logout from './features/auth/components/Logout.js';
import ForgotPasswordPage from './pages/ForgotPasswordPage.js';
import AdminHome from './pages/AdminHome.js';
import AdminProductDetailsPage from './pages/AdminProductDetailsPage.js';
import ProductForm from './features/admin/components/ProductForm.js';
import AdminProductFormPage from './pages/AdminProductFormPage.js';
import AdminOrdersPage from './pages/AdminOrdersPage.js';

const router = createBrowserRouter([
  {
    path: "/",
    element:
    <Protected>
      <Home></Home>
    </Protected>
    
  },
  {
    path: "/admin",
    element:
    <ProtectedAdmin>
      <AdminHome></AdminHome>
    </ProtectedAdmin>
    
  },
  {
    path: "/admin/product-form",
    element:
    <ProtectedAdmin>
      <AdminProductFormPage></AdminProductFormPage>
    </ProtectedAdmin>
    
  },
  {
    path: "/admin/orders",
    element:
    <ProtectedAdmin>
      <AdminOrdersPage></AdminOrdersPage>
    </ProtectedAdmin>
    
  },
  {
    path: "/admin/product-form/edit/:id",
    element:
    <ProtectedAdmin>
      <AdminProductFormPage></AdminProductFormPage>
    </ProtectedAdmin>
    
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: 
    <Protected>
      <CartPage></CartPage>,
    </Protected>
  },
  {
    path: "/checkout",
    element: 
    <Protected>
      <CheckoutPage></CheckoutPage>,
    </Protected>
  },
  {
    path: "/product-details/:id",
    element: 
    <Protected>
      <ProductDetailsPage></ProductDetailsPage>,
    </Protected>
  },
  {
    path: "/admin/product-details/:id",
    element: 
    <ProtectedAdmin>
      <AdminProductDetailsPage></AdminProductDetailsPage>,
    </ProtectedAdmin>
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage></OrderSuccessPage>,
  },
  {
    path: "/orders",
    element: <UserOrdersPage></UserOrdersPage>,
  },
  {
    path: "/profile",
    element: <UserProfilePage></UserProfilePage>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
]);

function App() {

  const dispatch=useDispatch();
  const user=useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user)
    {
      dispatch(fetchItemsAddedByUserAsync())
      dispatch(fetchLoggedInUserAsync())
    }
  },[dispatch, user])
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
