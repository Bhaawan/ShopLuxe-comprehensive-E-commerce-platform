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
import { fetchItemsAddedByUserAsync } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element:
    <Protected>
      <Home></Home>
    </Protected>
    
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
]);

function App() {

  const dispatch=useDispatch();
  const user=useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user)
    {
      dispatch(fetchItemsAddedByUserAsync(user.id))
    }
  },[dispatch, user])
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
