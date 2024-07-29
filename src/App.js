import React, { useState } from 'react';
import './App.css';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Slider from './Layout/Slider';
import Container from './Layout/Container';
import MenuAccount from './Account/MenuAccount';
import ProductCart from './Product/ProductCart';
import Blog from './Blog/Blog';
import Home from './Layout/Home';
import { useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import UserContext from './UserContext';


function App(props) {
    let params1 = useLocation();
    // console.log(params1)
    const [getTongqty, setTongqty] = useState(0)

    function getQty(data){
        console.log(data)
        setTongqty(data)
    }

    return ( 
        <UserContext.Provider value={{
            getTongqty:getTongqty,
            getQty:getQty
            }}>
            <Header />

                <section>
                    <div className="container">
                        <div className="row">
                            {!params1.pathname.includes("account") && !params1.pathname.includes("product-cart") &&  <Slider /> }
                            {params1.pathname.includes("account") && <MenuAccount />}
                            {/* {params1.pathname.includes("product-cart") && <ProductCart />} */}
                            {!params1.pathname.includes("account") && !params1.pathname.includes("product-cart") && <Container /> }
                            {props.children}
                        </div>
                    </div>
                </section>
            <Footer />
        </UserContext.Provider> 
    );
}

export default App;
