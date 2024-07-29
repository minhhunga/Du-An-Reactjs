import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../logo.svg';
import '../App.css';
import { Link } from 'react-router-dom';

function MyProduct() {
    const [products, setProducts] = useState({});
    
    useEffect(() => {
        
        const accessToken = localStorage.getItem('accessToken');
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Accept': 'application/json'
            }
        };
        axios.get(`http://localhost/laravel8/public/api/user/my-product`, config)
            .then(response => {
                setProducts(response.data.data);
                console.log(response.data.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const handleDelete = (productId) => {
        const accessToken = localStorage.getItem('accessToken');
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Accept': 'application/json'
            }
        };
        axios.get(`http://localhost/laravel8/public/api/user/product/delete/${productId}`, config)
            .then(response => {
                setProducts(response.data.data);
                console.log(response);  
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <section id="cart_items">
            <div className="col-sm-9">
                <div className="table-responsive cart_info">
                    <table className="table table-condensed">
                        <thead>
                            <tr className="cart_menu">
                                <td className="id">ID</td>
                                <td className="name">Name</td>
                                <td className="img">Image</td>
                                <td className="price">Price</td>
                                <td className="action">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(products).map(key => {
                                const product = products[key];
                                const firstImage = JSON.parse(product.image)[0]; // Lấy hình ảnh đầu tiên

                                return (
                                    <tr key={product.id}>
                                        <td className="id_product">
                                            <p>{product.id}</p>
                                        </td>
                                        <td className="name_product">
                                            <p>{product.name}</p>
                                        </td>
                                        <td className="cart_product">
                                            <img width="100px" src={`http://localhost/laravel8/public/upload/product/${product.id_user}/${firstImage}`} alt={product.name} /> 
                                        </td>
                                        <td className="cart_price">
                                            <p>${product.price}</p>
                                        </td>
                                        <td className="cart_delete">
                                            <button className="cart_quantity_delete" onClick={() => handleDelete(product.id)}>
                                                <i className="fa fa-times"></i>
                                            </button>
                                        </td>
                                        <td className="cart_delete">
                                            <Link to={`/account/my-product/update-product/${product.id}`} className="cart_quantity_delete">
                                            <button class="fa fa">Update</button>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="8">
                                    <Link to={`add-product`}>
                                        <button type="submit" className="btn btn-default get">Add New</button>
                                    </Link>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default MyProduct;
