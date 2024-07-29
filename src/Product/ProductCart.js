import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductCart() {
    const [cartProducts, setCartProducts] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('cart')) || {};
        axios.post(`http://localhost/laravel8/public/api/product/cart`)
            .then(response => {
                console.log(response.data);
            })
            .catch(errors => {
                console.error(errors);
            });
            setCartProducts(cartData);
            TotalPrice(cartData);
		    // console.log(cartData)
    }, []);

    const TotalPrice = (cartData) => {
        let total=0;
        Object.keys(cartData).forEach(key => {
            total += cartData[key].price * cartData[key].quantity;
        });
        setTotalPrice(total);
    }

    const QuantityUp = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || {};
        if (cart[product.id]) {
            cart[product.id].quantity += 1;
        } 
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartProducts(cart);
        TotalPrice(cart);
    }

    const QuantityDown = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || {};
        if (cart[product.id]) {
            if(cart[product.id].quantity > 1 ){
                cart[product.id].quantity -= 1;
            }else{
                delete cart[product.id];
            }
        } 
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartProducts(cart);
        TotalPrice(cart);
    }

    const handleDeleteProduct = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || {};
        if (cart[product.id]) {
            delete cart[product.id];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartProducts(cart);
        TotalPrice(cart);
    }
    return (
        <div>
            <section id="cart_items">
                <div className="container">
                    <div className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li><a href="#">Home</a></li>
                            <li className="active">Shopping Cart</li>
                        </ol>
                    </div>
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td className="image">Item</td>
                                    <td className="description">Description</td>
                                    <td className="price">Price</td>
                                    <td className="quantity">Quantity</td>
                                    <td className="total">Total</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
							{Object.keys(cartProducts).map(key => {
                                const product = cartProducts[key];
								const firstImage = JSON.parse(product.image)[0];
								return (
                                    <tr key={product.id}>
                                        <td className="cart_product">
                                            <a href="#"><img width="100px" src={`http://localhost/laravel8/public/upload/product/${product.id_user}/${firstImage}`} alt={product.name}/></a>
                                        </td>
                                        <td className="cart_description">
                                            <h4><a href="#">{product.name}</a></h4>
                                            <p>Web ID: {product.id}</p>
                                        </td>
                                        <td className="cart_price">
                                            <p>${product.price}</p>
                                        </td>
                                        <td className="cart_quantity">
                                            <div className="cart_quantity_button">
											<a class="cart_quantity_up" href="" id="quantity_up" onClick={() => QuantityUp(product)}> + </a>
											<input class="cart_quantity_input" type="text" name="quantity" value={product.quantity} autocomplete="off" size="2"/>
											<a class="cart_quantity_down" href="" id="quantity_down" onClick={() => QuantityDown(product)}> - </a>
                                            </div>
                                        </td>
                                        <td className="cart_total">
                                            <p className="cart_total_price">${product.price * product.quantity}</p>
                                        </td>
                                        <td className="cart_delete">
                                            <a className="cart_quantity_delete" onClick={() => handleDeleteProduct(product)}><i className="fa fa-times"></i></a>
                                        </td>
                                    </tr>
								)
								})}
							
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section id="do_action">
                <div className="container">
                    <div className="heading">
                        <h3>What would you like to do next?</h3>
                        <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="chose_area">
                                <ul className="user_option">
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Coupon Code</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Gift Voucher</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Estimate Shipping & Taxes</label>
                                    </li>
                                </ul>
                                <ul className="user_info">
                                    <li className="single_field">
                                        <label>Country:</label>
                                        <select>
                                            <option>United States</option>
                                            <option>Bangladesh</option>
                                            <option>UK</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Ucrane</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                    </li>
                                    <li className="single_field">
                                        <label>Region / State:</label>
                                        <select>
                                            <option>Select</option>
                                            <option>Dhaka</option>
                                            <option>London</option>
                                            <option>Dillih</option>
                                            <option>Lahore</option>
                                            <option>Alaska</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                    </li>
                                    <li className="single_field zip-field">
                                        <label>Zip Code:</label>
                                        <input type="text" />
                                    </li>
                                </ul>
                                <a className="btn btn-default update" href="#">Get Quotes</a>
                                <a className="btn btn-default check_out" href="#">Continue</a>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="total_area">
                                <ul>
                                    <li>Cart Sub Total <span>${totalPrice}</span></li>
                                    <li>Eco Tax <span>$2</span></li>
                                    <li>Shipping Cost <span>Free</span></li>
                                    <li>Total <span>${totalPrice}</span></li>
                                </ul>
                                <a className="btn btn-default update" href="#">Update</a>
                                <a className="btn btn-default check_out" href="#">Check Out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductCart;
