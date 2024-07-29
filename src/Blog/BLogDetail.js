import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Rate from './Rate'; 

function BlogDetail(props) {
    let params = useParams();

    const [data, setData] = useState({});
    const [comment, setComment] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost/laravel8/public/api/blog/detail/` + params.id)
            .then(response => {
                setData(response.data.data);
                // setComment(response.data.data.comment);
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
    }, [params.id]);

    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                <div className="single-blog-post">
                    <h3>{data.title}</h3>
                    <div className="post-meta">
                        <ul>
                            <li><i className="fa fa-user"></i> Mac Doe</li>
                            <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                            <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                        </ul>
                        <span>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-half-o"></i>
                        </span>
                    </div>
                    <a href="">
					<img src={"http://localhost/laravel8/public/upload/Blog/image/" + data.image } alt=""/>
                    </a>
                    <p>
                        {data.content}
                    </p>
                    
                    <div className="pager-area">
                        <ul className="pager pull-right">
                            <li><a href="#">Pre</a></li>
                            <li><a href="#">Next</a></li>
                        </ul>
                    </div>
                </div>
            </div>
			<div class="rating-area">
            <Rate BlogId={params.id}/>
			</div>
			<div class="socials-share">
				<a href=""><img src="images/blog/socials.png" alt=""/></a>
			</div>
			<div class="response-area">
						<h2>3 RESPONSES</h2>
						<ul class="media-list">
							
							
						</ul>					
			</div>
			<div class="replay-box">
						<div class="row">
							<div class="col-sm-12">
								<h2>Leave a replay</h2>
								
								<div class="text-area">
									<div class="blank-arrow">
										<label>Your Name</label>
									</div>
									<span>*</span>
									<textarea name="message" rows="11"></textarea>
									<a class="btn btn-primary" href="">post comment</a>
								</div>
							</div>
						</div>
			</div>
        </div>
    );
}

export default BlogDetail;
