import axios from 'axios';
import '../App.css'; 
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function AddProduct() {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [sale, setSale] = useState(0);
    const [product, setProduct] = useState({
        name: '',
        price: '',
        category: '',
        brand: '',
        company_profile: '',
        detail: '',
        status: '',
        image: [],
        sale: 0
        
    });

    useEffect(() => {
        axios.get(`http://localhost/laravel8/public/api/category-brand`)
            .then(response => {
                setCategories(response.data.category || []);
                setBrands(response.data.brand || []);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setProduct({
            ...product,
            image: e.target.files
        });
    };

    const handleSaleChange = (e) => {
        const saleValue = Number(e.target.value);
        setSale(saleValue);
        setProduct({
            ...product,
            sale: saleValue
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('category', product.category);
        formData.append('brand', product.brand);
        formData.append('company', product.company_profile);
        formData.append('detail', product.detail);
        formData.append('sale', product.sale);

        Object.keys(product.image).map((item, i)=>{
            formData.append('file[]', product.image[item]);
        });

        const accessToken = localStorage.getItem('accessToken');
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        };

        axios.post('http://localhost/laravel8/public/api/user/product/add', formData, config)
            .then(response => {
                
                console.log('Thêm sản phẩm thành công:', response.data);
                
            })
            .catch(error => {
                console.error('Có lỗi khi thêm sản phẩm:', error.response.data);
            });
    };

    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Create Products</h2>
                <div className="signup-form">
                    <h2>Create Product</h2>
                    <form onSubmit={handleSubmit}>
                        <input name="name" type="text" placeholder="Name" onChange={handleInputChange} />
                        <input name="price" type="text" placeholder="Price" onChange={handleInputChange} />
                        <select name="brand" onChange={handleInputChange}>
                            <option value="" disabled selected>Please choose brand</option>
                            {brands.map(brand => (
                                <option key={brand.id} value={brand.id}>{brand.brand}</option>
                            ))}
                        </select>
                        <select name="category" onChange={handleInputChange}>
                            <option value="" disabled selected>Please choose category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.category}</option>
                            ))}
                        </select>
                        <select name="sale" id="sale" onChange={handleSaleChange}>
                            <option value="0">New</option>
                            <option value="1">Sale</option>
                        </select>
                        {sale === 1 && (
                            <input id="selectsale" name="selectsale" type="text" placeholder="0" onChange={handleInputChange} />
                        )}
                        <input name="company_profile" type="text" placeholder="Company profile" onChange={handleInputChange} />
                        <input type="file" id="files" name="image" multiple onChange={handleFileChange} />
                        <input name="detail" type="text" placeholder="Detail" onChange={handleInputChange} />
                        <button type="submit" className="btn btn-default">Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
