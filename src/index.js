import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { 
  BrowserRouter as Router,
  Route,
  Routes
 } from 'react-router-dom';
 import Home from './Layout/Home';
 import Blog from './Blog/Blog';
 import BlogDetail from './Blog/BLogDetail';
 import Register from './Member/Register';
 import Login from './Member/Login';
 import Account from './Account/Account';
 import MyProduct from './Account/MyProduct';
 import AddProduct from './Product/AddProduct';
 import UpdateProduct from './Product/UpdateProduct';
 import ProductDetail from './Product/ProductDetail';
 import ProductCart from './Product/ProductCart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App >
        <Routes>
          <Route index path='/' element={<Home />}></Route>
          <Route  path='/blog/list' element={<Blog />}></Route>
          <Route  path='/blog/detail/:id' element={<BlogDetail />}></Route>
          <Route  path='/register' element={<Register />}></Route>
          <Route  path='/login' element={<Login />}></Route>
          <Route  path='/account/update' element={<Account />}></Route>
          <Route  path='/account/my-product' element={<MyProduct />}></Route>
          <Route  path='/account/my-product/add-product' element={<AddProduct />}></Route>
          <Route  path='/account/my-product/update-product/:id' element={<UpdateProduct />}></Route>
          <Route  path='/product-detail/:id' element={<ProductDetail />}></Route>
          <Route  path='/product-cart' element={<ProductCart />}></Route>
        </Routes>

      </App>
    </Router>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
