import StarRatings from "react-star-ratings";
import axios from "axios";
import React, { useState, useEffect } from "react";

function Rate({ BlogId }) {
  const [rating, setRating] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("checkLogin") === "true");
  

  // Lấy điểm đánh giá hiện tại từ API khi component được mount hoặc BlogId thay đổi
  useEffect(() => {
    axios.get(`http://localhost/laravel8/public/api/blog/rate/${BlogId}`)
      .then(response => {
        //  console.log(response.data);
        const rate = response.data.data; 
        let totalRating = 0;

        
        if (rate) {
        // Tính tổng điểm đánh giá
          let numberOfRatings = Object.keys(rate).length; 
          for (let key in rate) {
            totalRating += rate[key].rate; 
          }
          const avgRating = totalRating / numberOfRatings; 
          setRating(avgRating);
        } else {
          setRating(0); 
        }
      })
      .catch(error => {
        console.error("Error fetching ratings:", error);
      });
  }, [BlogId]);

  // Xử lý khi thay đổi điểm đánh giá
  function changeRating(newRating) {
    setRating(newRating);

    if (!isLoggedIn) {
      alert('Vui lòng đăng nhập');
      return;
    }

    const accessToken = localStorage.getItem('accessToken');
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    let config = {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    };

    if (newRating) {
      const formData = new FormData();
      formData.append('blog_id', BlogId);
      formData.append('user_id', userData.id);
      formData.append('rate', newRating);

      axios.post(`http://localhost/laravel8/public/api/blog/rate/${BlogId}`, formData, config)
        .then(response => {
          console.log(response.data);
          // Có thể xử lý thêm sau khi lưu thành công đánh giá
        })
        .catch(error => {
          console.error("Error saving rating:", error);
        });
    }
  }

  return (
    <div>
       <h2>Average Rating: {rating}</h2>
    
    <StarRatings
      rating={rating}
      starRatedColor="blue"
      changeRating={changeRating}
      numberOfStars={5}
      name='rating'
    />
    </div>
  );
}

export default Rate;

