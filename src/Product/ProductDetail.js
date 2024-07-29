import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
    let params = useParams();
    const [product, setProduct] = useState({});
    const firstImage = product.image ? JSON.parse(product.image)[0] : '';
    
    useEffect(() => {
        axios.get(`http://localhost/laravel8/public/api/product/detail/` + params.id)
            .then(response => {
                setProduct(response.data.data);
                console.log(response.data.data);
            })
            .catch(errors => {
                console.log(errors);
            });
    }, [params.id]);

    return (
        <div className="col-sm-9 padding-right">
            <div className="product-details">
                <div className="col-sm-5">
                    <div className="view-product">
                        <img src={`http://localhost/laravel8/public/upload/product/${product.id_user}/${firstImage}`} alt={product.name}/>
                        <a href="images/product-details/1.jpg" rel="prettyPhoto"><h3>ZOOM</h3></a>
                    </div>
                    <div id="similar-product" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="item active">
                                <a href=""><img src="images/product-details/similar1.jpg" alt=""/></a>
                                <a href=""><img src="images/product-details/similar2.jpg" alt=""/></a>
                                <a href=""><img src="images/product-details/similar3.jpg" alt=""/></a>
                            </div>
                            <div className="item">
                                <a href=""><img src="images/product-details/similar1.jpg" alt=""/></a>
                                <a href=""><img src="images/product-details/similar2.jpg" alt=""/></a>
                                <a href=""><img src="images/product-details/similar3.jpg" alt=""/></a>
                            </div>
                            <div className="item">
                                <a href=""><img src="images/product-details/similar1.jpg" alt=""/></a>
                                <a href=""><img src="images/product-details/similar2.jpg" alt=""/></a>
                                <a href=""><img src="images/product-details/similar3.jpg" alt=""/></a>
                            </div>
                        </div>
                        <a className="left item-control" href="#similar-product" data-slide="prev">
                            <i className="fa fa-angle-left"></i>
                        </a>
                        <a className="right item-control" href="#similar-product" data-slide="next">
                            <i className="fa fa-angle-right"></i>
                        </a>
                    </div>
                </div>
                <div className="col-sm-7">
                    <div className="product-information">
                        <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                        <h2>{product.name}</h2>
                        <h2>Web ID: {product.id}</h2>
                        <img src="images/product-details/rating.png" alt="" />
                        <span>
                            <span>US ${product.price}</span>
                            <label>Quantity:</label>
                            <input type="text" value="3" />
                            <button type="button" className="btn btn-fefault cart">
                                <i className="fa fa-shopping-cart"></i>
                                Add to cart
                            </button>
                        </span>
                        <p><b>Availability:</b> In Stock</p>
                        <p><b>Condition:</b> New</p>
                        <p><b>Brand:</b> E-SHOPPER</p>
                        <a href=""><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                    </div>
                </div>
            </div>
            
            <div className="category-tab shop-details-tab">
                <div className="col-sm-12">
                    <ul className="nav nav-tabs">
                        <li><a href="#details" data-toggle="tab">Details</a></li>
                        <li><a href="#companyprofile" data-toggle="tab">Company Profile</a></li>
                        <li><a href="#tag" data-toggle="tab">Tag</a></li>
                        <li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
                    </ul>
                </div>
                <div className="tab-content">
                    <div className="tab-pane fade" id="details">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="tab-pane fade" id="companyprofile">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="tab-pane fade" id="tag">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="tab-pane fade active in" id="reviews">
                        <div className="col-sm-12">
                            <ul>
                                <li><a href=""><i className="fa fa-user"></i>EUGEN</a></li>
                                <li><a href=""><i className="fa fa-clock-o"></i>12:41 PM</a></li>
                                <li><a href=""><i className="fa fa-calendar-o"></i>31 DEC 2014</a></li>
                            </ul>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            <p><b>Write Your Review</b></p>
                            <form action="#">
                                <span>
                                    <input type="text" placeholder="Your Name" />
                                    <input type="email" placeholder="Email Address" />
                                </span>
                                <textarea name=""></textarea>
                                <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                                <button type="button" className="btn btn-default pull-right">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
