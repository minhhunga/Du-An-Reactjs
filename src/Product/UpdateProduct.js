import axios from 'axios';
import '../App.css'; 
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function UpdateProduct() {
    let params = useParams();
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [sale, setSale] = useState(0);
    const [product, setProduct] = useState({
        name: '',
        price: '',
        category: '',
        id_brand: '',
        id_company_profile: '',
        detail: '',
        status: '',
        image: [],
        sale: 0
    });

    useEffect(() => {
        // Lấy danh mục và thương hiệu
        const accessToken = localStorage.getItem('accessToken');
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Accept': 'application/json'
            }
        };
        axios.get(`http://localhost/laravel8/public/api/category-brand`, config)
            .then(response => {
                setCategories(response.data.category || []);
                setBrands(response.data.brand || []);
            })
            .catch(error => {
                console.error(error);
            });

        // Lấy dữ liệu sản phẩm từ API
        axios.get(`http://localhost/laravel8/public/api/user/product/` + params.id, config)
            .then(response => {
                const productData = response.data.data;
                if (productData) {
                    setProduct({
                        id: productData.id,
                        name: productData.name,
                        price: productData.price,
                        id_brand: productData.id_brand,
                        id_category: productData.id_category,
                        company_profile: productData.company_profile,
                        detail: productData.detail,
                        sale: productData.sale,
                        image: productData.image,
                        id_user: productData.id_user
                    });
                }
                console.log(productData);
            })
            .catch(error => {
                console.error(error);
            });
    }, [params.id]);

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
            image: Array.from(e.target.files)
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

    const handleImageDeleteChange = (e) => {
        const { value, checked } = e.target;
        console.log(value)
        if (checked) {
            setImagesToDelete(state => [...state, value]);
        } else {
            setImagesToDelete(state => state.filter(item => item !== value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(product)
        let formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('category', product.id_category);
        formData.append('brand', product.id_brand);
        formData.append('company', product.company);
        formData.append('detail', product.detail);
        formData.append('sale', product.sale);

        product.image.map(file => {
            formData.append('file[]', file);
        });

        imagesToDelete.map(value => {
            formData.append('avatarCheckBox[]', value);
        });

        const accessToken = localStorage.getItem('accessToken');
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        };

        axios.post(`http://localhost/laravel8/public/api/user/product/update/` + params.id, formData, config)
            .then(response => {
                console.log('Update sản phẩm thành công:', response.data);
            })
            .catch(errors => {
                console.error('Có lỗi khi update sản phẩm:', errors.response.data);
            });
    };

    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Update Products</h2>
                <div className="signup-form">
                    <h2>Update Product</h2>
                    <form onSubmit={handleSubmit}>
                        <input 
                            name="name" 
                            type="text" 
                            value={product.name} 
                            onChange={handleInputChange}
                        />
                        <input 
                            name="price" 
                            type="text"  
                            value={product.price}
                            onChange={handleInputChange}
                        />
                        <select name="brand" value={product.brand} onChange={handleInputChange}>
                        
                            {brands.map(brand => (
                                <option key={brand.id} value={brand.id}>{brand.brand}</option>
                            ))}
                        </select>
                        <select name="category" value={product.category} onChange={handleInputChange}>
                           
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.category}</option>
                            ))}
                        </select>
                        <select name="sale" value={product.sale} onChange={handleSaleChange}>
                            <option value="0">New</option>
                            <option value="1">Sale</option>
                        </select>
                        {sale === 1 && (
                            <input 
                                id="selectsale" 
                                name="selectsale" 
                                type="text" 
                                value={product.selectsale || ''} 
                                placeholder="0" 
                                onChange={handleInputChange} 
                            />
                        )}
                        <input 
                            name="company_profile" 
                            type="text" 
                            value={product.company_profile}
                            onChange={handleInputChange} 
                        />
                        <input
                            type="file" 
                            id="files" 
                            name="image" 
                            multiple 
                            onChange={handleFileChange}
                        />
                        {product.image && product.image.map((img, index) => (
                            <div key={index}>
                                <img width="50px" src={`http://localhost/laravel8/public/upload/product/${product.id_user}/${img}`} alt={img} />
                                <input 
                                    type="checkbox" 
                                    value={img} 
                                    onChange={handleImageDeleteChange}
                                />
                            </div>
                        ))}
                        
                        <input
                            name="detail" 
                            type="text" 
                            value={product.detail}
                            onChange={handleInputChange} 
                        />
                        <button type="submit" className="btn btn-default">Update Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;
