import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

function Home() {
    const [products, setProducts] = useState([]);

    const xx = useContext(UserContext);


    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Accept': 'application/json'
            }
        };

        axios.get(`http://localhost/laravel8/public/api/product`, config)
            .then(response => {
                setProducts(response.data.data);
                // console.log(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    

    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || {};
        if (cart[product.id]) {
            cart[product.id].quantity += 1;
        } else {
            cart[product.id] = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            id_user: product.id_user,
            quantity: 1
            };
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        
        const totalQuantity = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
        xx.getQty(totalQuantity);
    };

    return (
        <div className="col-sm-9 padding-right">
            <div className="features_items">
                <h2 className="title text-center">Features Items</h2>
                {/* <buttton onClick={tinhTongQty}>click add to cart</buttton> */}
                {products.map(product => {
                    const firstImage = JSON.parse(product.image)[0];
                    return (
                        <div className="col-sm-4" key={product.id}>
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src={`http://localhost/laravel8/public/upload/product/${product.id_user}/${firstImage}`} alt={product.name} />
                                        <h2>${product.price}</h2>
                                        <p>{product.name}</p>
                                        <button className="btn btn-default add-to-cart" onClick={() => addToCart(product)}>
                                            <i className="fa fa-shopping-cart"></i>Add to cart
                                        </button>
                                    </div>
                                    <div className="product-overlay">
                                        <div className="overlay-content">
                                            <h2>${product.price}</h2>
                                            <p>{product.name}</p>
                                            <Link className="btn btn-default add-to-cart" onClick={() => addToCart(product)}>
                                                <i className="fa fa-shopping-cart"></i>Add to cart
                                            </Link>
                                            <Link to={`/product-detail/${product.id}`} className="btn btn-default add-to-cart">
                                                <i className="fa fa-shopping-cart"></i>Read more
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="choose">
                                    <ul className="nav nav-pills nav-justified">
                                        <li><a href="#"><i className="fa fa-plus-square"></i>Add to wishlist</a></li>
                                        <li><a href="#"><i className="fa fa-plus-square"></i>Add to compare</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Home;
